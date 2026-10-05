const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const fs = require('node:fs');

const dbPath = path.resolve(__dirname, '..', 'bait.db');
const db = new DatabaseSync(dbPath);

// Enable foreign keys
db.exec('PRAGMA foreign_keys = ON;');

// Initialize Tables
function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS divisions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_bn TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      established_year TEXT,
      area_sq_km TEXT,
      headquarters TEXT,
      image_url TEXT
    );

    CREATE TABLE IF NOT EXISTS districts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      division_id INTEGER NOT NULL,
      name_bn TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      image_url TEXT,
      FOREIGN KEY (division_id) REFERENCES divisions(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS upazilas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district_id INTEGER NOT NULL,
      name_bn TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      postal_code TEXT,
      image_url TEXT,
      FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS users_admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS people (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL CHECK(category IN ('employee', 'instructor', 'student', 'journalist')),
      name_bn TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      designation TEXT NOT NULL,
      photo_url TEXT,
      phone TEXT,
      email TEXT,
      bio TEXT,
      division_id INTEGER,
      district_id INTEGER,
      upazila_id INTEGER,
      education TEXT,
      experience TEXT,
      expertise TEXT,
      courses_taught TEXT,
      course_name TEXT,
      batch TEXT,
      achievements TEXT,
      workplace_media TEXT,
      published_works TEXT,
      department TEXT,
      responsibilities TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (division_id) REFERENCES divisions(id) ON DELETE SET NULL,
      FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE SET NULL,
      FOREIGN KEY (upazila_id) REFERENCES upazilas(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_bn TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      duration TEXT,
      batch_info TEXT,
      instructor_id INTEGER,
      division_id INTEGER,
      district_id INTEGER,
      upazila_id INTEGER,
      syllabus TEXT,
      fee TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (instructor_id) REFERENCES people(id) ON DELETE SET NULL,
      FOREIGN KEY (division_id) REFERENCES divisions(id) ON DELETE SET NULL,
      FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE SET NULL,
      FOREIGN KEY (upazila_id) REFERENCES upazilas(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'unread',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);
}

initSchema();

module.exports = { db, initSchema };
