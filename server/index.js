const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('node:path');
const { db } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'bait_super_secure_jwt_secret_2026';

app.use(cors());
app.use(express.json());

// Helper for JWT Auth Middleware
function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'প্রবেশাধিকার নেই। অনুগ্রহ করে লগইন করুন।' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'টোকেনের মেয়াদ শেষ বা অকার্যকর।' });
  }
}

// -------------------------------------------------------------
// PUBLIC API ROUTES
// -------------------------------------------------------------

// 1. Overall Stats
app.get('/api/stats', (req, res) => {
  try {
    const totalDivisions = db.prepare('SELECT COUNT(*) as count FROM divisions').get().count;
    const totalDistricts = db.prepare('SELECT COUNT(*) as count FROM districts').get().count;
    const totalUpazilas = db.prepare('SELECT COUNT(*) as count FROM upazilas').get().count;
    const totalEmployees = db.prepare("SELECT COUNT(*) as count FROM people WHERE category = 'employee'").get().count;
    const totalInstructors = db.prepare("SELECT COUNT(*) as count FROM people WHERE category = 'instructor'").get().count;
    const totalStudents = db.prepare("SELECT COUNT(*) as count FROM people WHERE category = 'student'").get().count;
    const totalJournalists = db.prepare("SELECT COUNT(*) as count FROM people WHERE category = 'journalist'").get().count;
    const totalCourses = db.prepare('SELECT COUNT(*) as count FROM courses').get().count;

    res.json({
      divisions: totalDivisions,
      districts: totalDistricts,
      upazilas: totalUpazilas,
      employees: totalEmployees,
      instructors: totalInstructors,
      students: totalStudents,
      journalists: totalJournalists,
      courses: totalCourses
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Dropdown Data (for fast navbar searchable dropdowns)
app.get('/api/dropdown-data', (req, res) => {
  try {
    const divisions = db.prepare('SELECT id, name_bn, slug FROM divisions ORDER BY name_bn').all();
    const districts = db.prepare('SELECT id, division_id, name_bn, slug FROM districts ORDER BY name_bn').all();
    const upazilas = db.prepare('SELECT id, district_id, name_bn, slug FROM upazilas ORDER BY name_bn').all();
    res.json({ divisions, districts, upazilas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Divisions
app.get('/api/divisions', (req, res) => {
  try {
    const divisions = db.prepare(`
      SELECT d.*, 
        (SELECT COUNT(*) FROM districts WHERE division_id = d.id) as total_districts,
        (SELECT COUNT(*) FROM upazilas u JOIN districts dist ON u.district_id = dist.id WHERE dist.division_id = d.id) as total_upazilas
      FROM divisions d
      ORDER BY d.id ASC
    `).all();
    res.json(divisions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/divisions/:slug', (req, res) => {
  try {
    const division = db.prepare('SELECT * FROM divisions WHERE slug = ?').get(req.params.slug);
    if (!division) return res.status(404).json({ error: 'বিভাগ পাওয়া যায়নি।' });

    const districts = db.prepare(`
      SELECT d.*, 
        (SELECT COUNT(*) FROM upazilas WHERE district_id = d.id) as total_upazilas
      FROM districts d
      WHERE d.division_id = ?
      ORDER BY d.name_bn
    `).all(division.id);

    const instructors = db.prepare("SELECT * FROM people WHERE category = 'instructor' AND division_id = ?").all(division.id);
    const students = db.prepare("SELECT * FROM people WHERE category = 'student' AND division_id = ?").all(division.id);
    const journalists = db.prepare("SELECT * FROM people WHERE category = 'journalist' AND division_id = ?").all(division.id);
    const courses = db.prepare('SELECT * FROM courses WHERE division_id = ?').all(division.id);

    res.json({
      division,
      districts,
      instructors,
      students,
      journalists,
      courses
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Districts
app.get('/api/districts', (req, res) => {
  try {
    const { division_id } = req.query;
    let query = `
      SELECT dist.*, div.name_bn as division_name, div.slug as division_slug,
        (SELECT COUNT(*) FROM upazilas WHERE district_id = dist.id) as total_upazilas
      FROM districts dist
      JOIN divisions div ON dist.division_id = div.id
    `;
    const params = [];
    if (division_id) {
      query += ' WHERE dist.division_id = ?';
      params.push(division_id);
    }
    query += ' ORDER BY dist.name_bn';
    const districts = db.prepare(query).all(...params);
    res.json(districts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/districts/:slug', (req, res) => {
  try {
    const district = db.prepare(`
      SELECT dist.*, div.name_bn as division_name, div.slug as division_slug
      FROM districts dist
      JOIN divisions div ON dist.division_id = div.id
      WHERE dist.slug = ?
    `).get(req.params.slug);

    if (!district) return res.status(404).json({ error: 'জেলা পাওয়া যায়নি।' });

    const upazilas = db.prepare('SELECT * FROM upazilas WHERE district_id = ? ORDER BY name_bn').all(district.id);
    const instructors = db.prepare("SELECT * FROM people WHERE category = 'instructor' AND district_id = ?").all(district.id);
    const students = db.prepare("SELECT * FROM people WHERE category = 'student' AND district_id = ?").all(district.id);
    const journalists = db.prepare("SELECT * FROM people WHERE category = 'journalist' AND district_id = ?").all(district.id);
    const courses = db.prepare('SELECT * FROM courses WHERE district_id = ?').all(district.id);

    res.json({
      district,
      upazilas,
      instructors,
      students,
      journalists,
      courses
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Upazilas
app.get('/api/upazilas', (req, res) => {
  try {
    const { district_id, division_id } = req.query;
    let query = `
      SELECT u.*, dist.name_bn as district_name, dist.slug as district_slug,
             div.name_bn as division_name, div.slug as division_slug
      FROM upazilas u
      JOIN districts dist ON u.district_id = dist.id
      JOIN divisions div ON dist.division_id = div.id
    `;
    const conditions = [];
    const params = [];
    if (district_id) {
      conditions.push('u.district_id = ?');
      params.push(district_id);
    }
    if (division_id) {
      conditions.push('dist.division_id = ?');
      params.push(division_id);
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY u.name_bn';
    const upazilas = db.prepare(query).all(...params);
    res.json(upazilas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/upazilas/:slug', (req, res) => {
  try {
    const upazila = db.prepare(`
      SELECT u.*, dist.name_bn as district_name, dist.slug as district_slug,
             div.name_bn as division_name, div.slug as division_slug
      FROM upazilas u
      JOIN districts dist ON u.district_id = dist.id
      JOIN divisions div ON dist.division_id = div.id
      WHERE u.slug = ?
    `).get(req.params.slug);

    if (!upazila) return res.status(404).json({ error: 'উপজেলা পাওয়া যায়নি।' });

    const instructors = db.prepare("SELECT * FROM people WHERE category = 'instructor' AND upazila_id = ?").all(upazila.id);
    const students = db.prepare("SELECT * FROM people WHERE category = 'student' AND upazila_id = ?").all(upazila.id);
    const journalists = db.prepare("SELECT * FROM people WHERE category = 'journalist' AND upazila_id = ?").all(upazila.id);
    const courses = db.prepare('SELECT * FROM courses WHERE upazila_id = ?').all(upazila.id);

    res.json({
      upazila,
      instructors,
      students,
      journalists,
      courses
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. People (employee, instructor, student, journalist)
app.get('/api/people', (req, res) => {
  try {
    const { category, division_id, district_id, upazila_id } = req.query;
    let query = `
      SELECT p.*,
        div.name_bn as division_name, div.slug as division_slug,
        dist.name_bn as district_name, dist.slug as district_slug,
        u.name_bn as upazila_name, u.slug as upazila_slug
      FROM people p
      LEFT JOIN divisions div ON p.division_id = div.id
      LEFT JOIN districts dist ON p.district_id = dist.id
      LEFT JOIN upazilas u ON p.upazila_id = u.id
      WHERE 1=1
    `;
    const params = [];
    if (category) {
      query += ' AND p.category = ?';
      params.push(category);
    }
    if (division_id) {
      query += ' AND p.division_id = ?';
      params.push(division_id);
    }
    if (district_id) {
      query += ' AND p.district_id = ?';
      params.push(district_id);
    }
    if (upazila_id) {
      query += ' AND p.upazila_id = ?';
      params.push(upazila_id);
    }
    query += ' ORDER BY p.id DESC';
    const people = db.prepare(query).all(...params);
    res.json(people);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/people/:category/:slug', (req, res) => {
  try {
    const { category, slug } = req.params;
    const person = db.prepare(`
      SELECT p.*,
        div.name_bn as division_name, div.slug as division_slug,
        dist.name_bn as district_name, dist.slug as district_slug,
        u.name_bn as upazila_name, u.slug as upazila_slug
      FROM people p
      LEFT JOIN divisions div ON p.division_id = div.id
      LEFT JOIN districts dist ON p.district_id = dist.id
      LEFT JOIN upazilas u ON p.upazila_id = u.id
      WHERE p.category = ? AND (p.slug = ? OR p.slug LIKE ?)
    `).get(category, slug, `${slug}%`);

    if (!person) return res.status(404).json({ error: 'তথ্য পাওয়া যায়নি।' });

    let associatedCourses = [];
    if (category === 'instructor') {
      associatedCourses = db.prepare('SELECT * FROM courses WHERE instructor_id = ?').all(person.id);
    }

    res.json({ person, courses: associatedCourses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Courses
app.get('/api/courses', (req, res) => {
  try {
    const courses = db.prepare(`
      SELECT c.*,
        p.name_bn as instructor_name, p.slug as instructor_slug, p.designation as instructor_designation, p.photo_url as instructor_photo,
        div.name_bn as division_name, dist.name_bn as district_name, u.name_bn as upazila_name
      FROM courses c
      LEFT JOIN people p ON c.instructor_id = p.id
      LEFT JOIN divisions div ON c.division_id = div.id
      LEFT JOIN districts dist ON c.district_id = dist.id
      LEFT JOIN upazilas u ON c.upazila_id = u.id
      ORDER BY c.id ASC
    `).all();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/courses/:slug', (req, res) => {
  try {
    const course = db.prepare(`
      SELECT c.*,
        p.name_bn as instructor_name, p.slug as instructor_slug, p.designation as instructor_designation, p.photo_url as instructor_photo, p.bio as instructor_bio,
        div.name_bn as division_name, div.slug as division_slug,
        dist.name_bn as district_name, dist.slug as district_slug,
        u.name_bn as upazila_name, u.slug as upazila_slug
      FROM courses c
      LEFT JOIN people p ON c.instructor_id = p.id
      LEFT JOIN divisions div ON c.division_id = div.id
      LEFT JOIN districts dist ON c.district_id = dist.id
      LEFT JOIN upazilas u ON c.upazila_id = u.id
      WHERE c.slug = ?
    `).get(req.params.slug);

    if (!course) return res.status(404).json({ error: 'কোর্স পাওয়া যায়নি।' });

    const students = db.prepare("SELECT * FROM people WHERE category = 'student' AND (course_name LIKE ? OR upazila_id = ?)").all(`%${course.title_bn.slice(0, 10)}%`, course.upazila_id);

    res.json({ course, students });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Global Search
app.get('/api/search', (req, res) => {
  try {
    const q = req.query.q ? req.query.q.trim() : '';
    if (!q) {
      return res.json({ divisions: [], districts: [], upazilas: [], people: [], courses: [] });
    }

    const likeQuery = `%${q}%`;

    const divisions = db.prepare(`
      SELECT id, name_bn, slug, description FROM divisions
      WHERE name_bn LIKE ? OR slug LIKE ?
    `).all(likeQuery, likeQuery);

    const districts = db.prepare(`
      SELECT dist.id, dist.name_bn, dist.slug, dist.description, div.name_bn as division_name, div.slug as division_slug
      FROM districts dist
      JOIN divisions div ON dist.division_id = div.id
      WHERE dist.name_bn LIKE ? OR dist.slug LIKE ?
    `).all(likeQuery, likeQuery);

    const upazilas = db.prepare(`
      SELECT u.id, u.name_bn, u.slug, u.description, dist.name_bn as district_name, dist.slug as district_slug, div.name_bn as division_name, div.slug as division_slug
      FROM upazilas u
      JOIN districts dist ON u.district_id = dist.id
      JOIN divisions div ON dist.division_id = div.id
      WHERE u.name_bn LIKE ? OR u.slug LIKE ?
    `).all(likeQuery, likeQuery);

    const people = db.prepare(`
      SELECT p.id, p.name_bn, p.slug, p.category, p.designation, p.photo_url,
             div.name_bn as division_name, dist.name_bn as district_name, u.name_bn as upazila_name
      FROM people p
      LEFT JOIN divisions div ON p.division_id = div.id
      LEFT JOIN districts dist ON p.district_id = dist.id
      LEFT JOIN upazilas u ON p.upazila_id = u.id
      WHERE p.name_bn LIKE ? OR p.designation LIKE ? OR p.bio LIKE ? OR p.workplace_media LIKE ? OR p.course_name LIKE ?
    `).all(likeQuery, likeQuery, likeQuery, likeQuery, likeQuery);

    const courses = db.prepare(`
      SELECT c.id, c.title_bn, c.slug, c.description, c.duration, c.batch_info
      FROM courses c
      WHERE c.title_bn LIKE ? OR c.description LIKE ?
    `).all(likeQuery, likeQuery);

    res.json({
      query: q,
      divisions,
      districts,
      upazilas,
      people,
      courses
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Contact Submission
app.post('/api/contact', (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: 'নাম এবং বার্তা আবশ্যক।' });
    }
    const result = db.prepare(`
      INSERT INTO contacts (name, phone, email, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, phone || '', email || '', subject || '', message);

    res.json({ success: true, message: 'আপনার বার্তাটি সফলভাবে পৌঁছানো হয়েছে। ধন্যবাদ!', id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. Site Settings
app.get('/api/settings', (req, res) => {
  try {
    const rows = db.prepare('SELECT key, value FROM site_settings').all();
    const settings = {};
    for (const r of rows) {
      settings[r.key] = r.value;
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// ADMIN AUTH & MANAGEMENT APIS
// -------------------------------------------------------------

// Student Registration API
app.post('/api/auth/register', (req, res) => {
  try {
    const { 
      name_bn, email, phone, password, course_name, 
      division_id, district_id, upazila_id, education, bio 
    } = req.body;

    if (!name_bn || !password || (!email && !phone)) {
      return res.status(400).json({ error: 'নাম, পাসওয়ার্ড এবং ইমেইল অথবা মোবাইল নম্বর প্রদান করা আবশ্যক।' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' });
    }

    // Check if email or phone already registered
    const existing = db.prepare(`
      SELECT id FROM people 
      WHERE (email = ? AND email != '') OR (phone = ? AND phone != '')
    `).get(email || '', phone || '');

    if (existing) {
      return res.status(400).json({ error: 'এই ই-মেইল অথবা মোবাইল নম্বর দিয়ে ইতিমধ্যে অ্যাকাউন্ট খোলা হয়েছে।' });
    }

    const password_hash = bcrypt.hashSync(password, 10);
    const slug = 'student-' + Date.now().toString().slice(-6) + '-' + Math.floor(Math.random() * 1000);

    const result = db.prepare(`
      INSERT INTO people (
        category, name_bn, slug, designation, photo_url,
        phone, email, bio, division_id, district_id, upazila_id,
        education, course_name, batch, achievements, password_hash
      ) VALUES (
        'student', ?, ?, 'প্রশিক্ষণার্থী', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        ?, ?, ?, ?, ?, ?,
        ?, ?, 'ব্যাচ-০১ (২০২৬)', 'কোর্স সফলভাবে চলমান', ?
      )
    `).run(
      name_bn,
      slug,
      phone || '',
      email || '',
      bio || 'BAIT-এর প্রশিক্ষণার্থী শিক্ষার্থী।',
      division_id ? parseInt(division_id) : null,
      district_id ? parseInt(district_id) : null,
      upazila_id ? parseInt(upazila_id) : null,
      education || '',
      course_name || 'তথ্য ও যোগাযোগ প্রযুক্তি প্রশিক্ষণ',
      password_hash
    );

    const newId = result.lastInsertRowid;

    // Fetch newly created person with location names
    const newStudent = db.prepare(`
      SELECT p.*,
        div.name_bn as division_name, dist.name_bn as district_name, u.name_bn as upazila_name
      FROM people p
      LEFT JOIN divisions div ON p.division_id = div.id
      LEFT JOIN districts dist ON p.district_id = dist.id
      LEFT JOIN upazilas u ON p.upazila_id = u.id
      WHERE p.id = ?
    `).get(newId);

    const token = jwt.sign(
      { id: newStudent.id, name: newStudent.name_bn, role: 'student', category: 'student', slug: newStudent.slug, email: newStudent.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'অভিনন্দন! আপনার শিক্ষার্থী অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।',
      token,
      user: {
        id: newStudent.id,
        name: newStudent.name_bn,
        role: 'student',
        category: 'student',
        slug: newStudent.slug,
        email: newStudent.email,
        phone: newStudent.phone,
        photo_url: newStudent.photo_url,
        designation: newStudent.designation,
        course_name: newStudent.course_name,
        batch: newStudent.batch,
        division_name: newStudent.division_name,
        district_name: newStudent.district_name,
        upazila_name: newStudent.upazila_name
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'নিবন্ধন সম্পন্ন করতে সমস্যা হয়েছে: ' + err.message });
  }
});

// Student & User Auth Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'ই-মেইল / মোবাইল নম্বর এবং পাসওয়ার্ড প্রদান করুন।' });
    }

    // Find person by email, phone, or slug
    const person = db.prepare(`
      SELECT p.*,
        div.name_bn as division_name, dist.name_bn as district_name, u.name_bn as upazila_name
      FROM people p
      LEFT JOIN divisions div ON p.division_id = div.id
      LEFT JOIN districts dist ON p.district_id = dist.id
      LEFT JOIN upazilas u ON p.upazila_id = u.id
      WHERE p.email = ? OR p.phone = ? OR p.slug = ?
    `).get(username, username, username);

    if (person) {
      let isMatch = false;
      if (person.password_hash) {
        isMatch = bcrypt.compareSync(password, person.password_hash);
      } else {
        // Fallback for seeded users
        isMatch = password === 'bait@2026' || password === '123456';
      }

      if (isMatch) {
        const token = jwt.sign(
          { id: person.id, name: person.name_bn, role: person.category, category: person.category, slug: person.slug, email: person.email },
          JWT_SECRET,
          { expiresIn: '7d' }
        );
        return res.json({
          success: true,
          token,
          user: {
            id: person.id,
            name: person.name_bn,
            role: person.category,
            category: person.category,
            slug: person.slug,
            email: person.email,
            phone: person.phone,
            photo_url: person.photo_url,
            designation: person.designation,
            course_name: person.course_name,
            batch: person.batch,
            division_name: person.division_name,
            district_name: person.district_name,
            upazila_name: person.upazila_name
          }
        });
      }
    }

    return res.status(401).json({ error: 'ভুল ই-মেইল / মোবাইল নম্বর বা পাসওয়ার্ড।' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Backward compatible Admin Login
app.post('/api/admin/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'ইউজারনেম এবং পাসওয়ার্ড প্রদান করুন।' });
    }

    const user = db.prepare('SELECT * FROM users_admin WHERE username = ?').get(username);
    if (!user) {
      return res.status(401).json({ error: 'ভুল ইউজারনেম বা পাসওয়ার্ড।' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'ভুল ইউজারনেম বা পাসওয়ার্ড।' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role, name: user.name, category: 'admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      admin: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Current User Profile Me
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'লগইন করা নেই।' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.category === 'admin') {
      return res.json({ user: decoded });
    }
    // Fetch fresh person details
    const person = db.prepare(`
      SELECT p.*,
        div.name_bn as division_name, dist.name_bn as district_name, u.name_bn as upazila_name
      FROM people p
      LEFT JOIN divisions div ON p.division_id = div.id
      LEFT JOIN districts dist ON p.district_id = dist.id
      LEFT JOIN upazilas u ON p.upazila_id = u.id
      WHERE p.id = ?
    `).get(decoded.id);

    res.json({ user: person || decoded });
  } catch (err) {
    res.status(403).json({ error: 'টোকেন অকার্যকর।' });
  }
});

// Admin Profile Me
app.get('/api/admin/me', authenticateAdmin, (req, res) => {
  res.json({ admin: req.admin });
});

// Admin Dashboard Summary
app.get('/api/admin/stats', authenticateAdmin, (req, res) => {
  try {
    const totalDivisions = db.prepare('SELECT COUNT(*) as count FROM divisions').get().count;
    const totalDistricts = db.prepare('SELECT COUNT(*) as count FROM districts').get().count;
    const totalUpazilas = db.prepare('SELECT COUNT(*) as count FROM upazilas').get().count;
    const totalEmployees = db.prepare("SELECT COUNT(*) as count FROM people WHERE category = 'employee'").get().count;
    const totalInstructors = db.prepare("SELECT COUNT(*) as count FROM people WHERE category = 'instructor'").get().count;
    const totalStudents = db.prepare("SELECT COUNT(*) as count FROM people WHERE category = 'student'").get().count;
    const totalJournalists = db.prepare("SELECT COUNT(*) as count FROM people WHERE category = 'journalist'").get().count;
    const totalCourses = db.prepare('SELECT COUNT(*) as count FROM courses').get().count;
    const totalContacts = db.prepare('SELECT COUNT(*) as count FROM contacts').get().count;

    const recentContacts = db.prepare('SELECT * FROM contacts ORDER BY id DESC LIMIT 5').all();
    const recentPeople = db.prepare('SELECT id, name_bn, category, designation, created_at FROM people ORDER BY id DESC LIMIT 5').all();

    res.json({
      counts: {
        divisions: totalDivisions,
        districts: totalDistricts,
        upazilas: totalUpazilas,
        employees: totalEmployees,
        instructors: totalInstructors,
        students: totalStudents,
        journalists: totalJournalists,
        courses: totalCourses,
        contacts: totalContacts
      },
      recentContacts,
      recentPeople
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Location Management
app.post('/api/admin/divisions', authenticateAdmin, (req, res) => {
  try {
    const { name_bn, slug, description, established_year, area_sq_km, headquarters } = req.body;
    const result = db.prepare(`
      INSERT INTO divisions (name_bn, slug, description, established_year, area_sq_km, headquarters)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name_bn, slug, description || '', established_year || '', area_sq_km || '', headquarters || '');
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/districts', authenticateAdmin, (req, res) => {
  try {
    const { division_id, name_bn, slug, description } = req.body;
    const result = db.prepare(`
      INSERT INTO districts (division_id, name_bn, slug, description)
      VALUES (?, ?, ?, ?)
    `).run(division_id, name_bn, slug, description || '');
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/upazilas', authenticateAdmin, (req, res) => {
  try {
    const { district_id, name_bn, slug, description, postal_code } = req.body;
    const result = db.prepare(`
      INSERT INTO upazilas (district_id, name_bn, slug, description, postal_code)
      VALUES (?, ?, ?, ?, ?)
    `).run(district_id, name_bn, slug, description || '', postal_code || '');
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin People Management (Add / Update / Delete)
app.post('/api/admin/people', authenticateAdmin, (req, res) => {
  try {
    const {
      category, name_bn, slug, designation, photo_url, phone, email, bio,
      division_id, district_id, upazila_id, education, experience, expertise,
      courses_taught, course_name, batch, achievements, workplace_media, published_works,
      department, responsibilities
    } = req.body;

    const result = db.prepare(`
      INSERT INTO people (
        category, name_bn, slug, designation, photo_url, phone, email, bio,
        division_id, district_id, upazila_id, education, experience, expertise,
        courses_taught, course_name, batch, achievements, workplace_media, published_works,
        department, responsibilities
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      category, name_bn, slug, designation, photo_url || '', phone || '', email || '', bio || '',
      division_id || null, district_id || null, upazila_id || null,
      education || '', experience || '', expertise || '',
      courses_taught || '', course_name || '', batch || '', achievements || '',
      workplace_media || '', published_works || '',
      department || '', responsibilities || ''
    );

    res.json({ success: true, id: result.lastInsertRowid, message: 'সফলভাবে তৈরি করা হয়েছে!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/people/:id', authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const {
      category, name_bn, slug, designation, photo_url, phone, email, bio,
      division_id, district_id, upazila_id, education, experience, expertise,
      courses_taught, course_name, batch, achievements, workplace_media, published_works,
      department, responsibilities
    } = req.body;

    db.prepare(`
      UPDATE people SET
        category = ?, name_bn = ?, slug = ?, designation = ?, photo_url = ?, phone = ?, email = ?, bio = ?,
        division_id = ?, district_id = ?, upazila_id = ?, education = ?, experience = ?, expertise = ?,
        courses_taught = ?, course_name = ?, batch = ?, achievements = ?, workplace_media = ?, published_works = ?,
        department = ?, responsibilities = ?
      WHERE id = ?
    `).run(
      category, name_bn, slug, designation, photo_url || '', phone || '', email || '', bio || '',
      division_id || null, district_id || null, upazila_id || null,
      education || '', experience || '', expertise || '',
      courses_taught || '', course_name || '', batch || '', achievements || '',
      workplace_media || '', published_works || '',
      department || '', responsibilities || '',
      id
    );

    res.json({ success: true, message: 'সফলভাবে আপডেট করা হয়েছে!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/people/:id', authenticateAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM people WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'সফলভাবে মুছে ফেলা হয়েছে।' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Courses Management
app.post('/api/admin/courses', authenticateAdmin, (req, res) => {
  try {
    const { title_bn, slug, description, duration, batch_info, instructor_id, division_id, district_id, upazila_id, syllabus, fee, image_url } = req.body;
    const result = db.prepare(`
      INSERT INTO courses (title_bn, slug, description, duration, batch_info, instructor_id, division_id, district_id, upazila_id, syllabus, fee, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title_bn, slug, description || '', duration || '', batch_info || '',
      instructor_id || null, division_id || null, district_id || null, upazila_id || null,
      syllabus || '', fee || 'বিনামূল্যে', image_url || ''
    );
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/courses/:id', authenticateAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM courses WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Contacts Management
app.get('/api/admin/contacts', authenticateAdmin, (req, res) => {
  try {
    const contacts = db.prepare('SELECT * FROM contacts ORDER BY id DESC').all();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/contacts/:id/read', authenticateAdmin, (req, res) => {
  try {
    db.prepare("UPDATE contacts SET status = 'read' WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/contacts/:id', authenticateAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM contacts WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend build if exists
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use((req, res) => {
  const indexPath = path.join(__dirname, '..', 'client', 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.json({ status: 'BAIT API Server running on port ' + PORT });
    }
  });
});

app.listen(PORT, () => {
  console.log(`BAIT Server is running on http://localhost:${PORT}`);
});
