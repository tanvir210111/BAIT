const bcrypt = require('bcryptjs');
const { db, initSchema } = require('./db');

function seedDatabase() {
  initSchema();

  console.log('Seeding BAIT database with authentic Bangladesh administrative structure and BAIT data...');

  // Clear existing data in correct order
  db.exec(`
    DELETE FROM contacts;
    DELETE FROM courses;
    DELETE FROM people;
    DELETE FROM upazilas;
    DELETE FROM districts;
    DELETE FROM divisions;
    DELETE FROM users_admin;
    DELETE FROM site_settings;
  `);

  // 1. Admin User
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync('bait@2026', salt);
  db.prepare(`
    INSERT INTO users_admin (username, password_hash, name, role)
    VALUES (?, ?, ?, ?)
  `).run('admin', passwordHash, 'প্রধান প্রশাসক (Admin)', 'superadmin');

  // 2. Divisions (৮টি বিভাগ)
  const divisions = [
    { name_bn: 'ঢাকা বিভাগ', slug: 'dhaka', description: 'বাংলাদেশের মধ্যভাগে অবস্থিত প্রধান প্রশাসনিক ও অর্থনৈতিক কেন্দ্র।', established_year: '১৮২৯', area_sq_km: '২০,৫০৯', headquarters: 'ঢাকা' },
    { name_bn: 'চট্টগ্রাম বিভাগ', slug: 'chittagong', description: 'বাংলাদেশের দক্ষিণ-পূর্বাঞ্চলে অবস্থিত প্রধান বাণিজ্যিক ও বন্দর এলাকা।', established_year: '১৮২৯', area_sq_km: '৩৩,৯০৮', headquarters: 'চট্টগ্রাম' },
    { name_bn: 'রাজশাহী বিভাগ', slug: 'rajshahi', description: 'উত্তরবঙ্গের ঐতিহ্যবাহী শিক্ষা ও রেশম নগরী সংবলিত বিভাগ।', established_year: '১৮২৯', area_sq_km: '১৮,১৫৩', headquarters: 'রাজশাহী' },
    { name_bn: 'খুলনা বিভাগ', slug: 'khulna', description: 'দক্ষিণ-পশ্চিমাঞ্চলে অবস্থিত শিল্প ও সুন্দরবন বেষ্টিত বিভাগ।', established_year: '১৯৬০', area_sq_km: '২২,২৮৫', headquarters: 'খুলনা' },
    { name_bn: 'বরিশাল বিভাগ', slug: 'barishal', description: 'দক্ষিণাঞ্চলের নদীমাতৃক শস্যভাণ্ডার হিসেবে পরিচিত বিভাগ।', established_year: '১৯৯৩', area_sq_km: '১৩,২২৫', headquarters: 'বরিশাল' },
    { name_bn: 'সিলেট বিভাগ', slug: 'sylhet', description: 'উত্তর-পূর্বাঞ্চলের প্রাকৃতিক সৌন্দর্য, চা বাগান ও প্রবাসী অধ্যুষিত বিভাগ।', established_year: '১৯৯৫', area_sq_km: '১২,৫৯৬', headquarters: 'সিলেট' },
    { name_bn: 'রংপুর বিভাগ', slug: 'rangpur', description: 'উত্তরাঞ্চলের কৃষিভিত্তিক ও ঐতিহাসিক গুরুত্বসম্পন্ন বিভাগ।', established_year: '২০১০', area_sq_km: '১৬,১৮৪', headquarters: 'রংপুর' },
    { name_bn: 'ময়মনসিংহ বিভাগ', slug: 'mymensingh', description: 'গারো পাহাড়ের পাদদেশে সমৃদ্ধ কৃষি, লোকসংস্কৃতি ও শিক্ষা কেন্দ্রিক বিভাগ।', established_year: '২০১৫', area_sq_km: '১০,৫৮৪', headquarters: 'ময়মনসিংহ' },
  ];

  const divInsert = db.prepare(`
    INSERT INTO divisions (name_bn, slug, description, established_year, area_sq_km, headquarters)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const divMap = {};
  for (const div of divisions) {
    const info = divInsert.run(div.name_bn, div.slug, div.description, div.established_year, div.area_sq_km, div.headquarters);
    divMap[div.slug] = info.lastInsertRowid;
  }

  // 3. All 64 Districts (৬৪টি জেলা সঠিকভাবে ৮ বিভাগে অন্তর্ভুক্ত)
  const districtData = [
    // Dhaka Division (13)
    { div: 'dhaka', name_bn: 'ঢাকা', slug: 'dhaka-dist', desc: 'বাংলাদেশের রাজধানী ও প্রধান প্রশাসনিক জেলা।' },
    { div: 'dhaka', name_bn: 'গাজীপুর', slug: 'gazipur', desc: 'শিল্প ও প্রযুক্তির অন্যতম প্রধান কেন্দ্র এবং ভাওয়াল গড়ের ঐতিহাসিক ভূমি।' },
    { div: 'dhaka', name_bn: 'নারায়ণগঞ্জ', slug: 'narayanganj', desc: 'প্রাচ্যের ড্যান্ডি খ্যাত প্রাচীন বন্দর ও বাণিজ্য নগরী।' },
    { div: 'dhaka', name_bn: 'নরসিংদী', slug: 'narsingdi', desc: 'তাঁত শিল্প ও উয়ারী-বটেশ্বর প্রত্নতাত্ত্বিক ঐতিহ্যের জেলা।' },
    { div: 'dhaka', name_bn: 'মানিকগঞ্জ', slug: 'manikganj', desc: 'পদ্মা-যমুনা নদী বিধৌত কৃষি ও লোকশিল্পের জেলা।' },
    { div: 'dhaka', name_bn: 'মুন্সীগঞ্জ', slug: 'munshiganj', desc: 'প্রাচীন বিক্রমপুরের ঐতিহাসিক ও আলু উৎপাদনকারী জেলা।' },
    { div: 'dhaka', name_bn: 'টাঙ্গাইল', slug: 'tangail', desc: 'ঐতিহ্যবাহী তাঁতের শাড়ি ও মিষ্টির জেলা।' },
    { div: 'dhaka', name_bn: 'কিশোরগঞ্জ', slug: 'kishoreganj', desc: 'হাওর অঞ্চল ও লোকসংস্কৃতির উর্বর জেলা।' },
    { div: 'dhaka', name_bn: 'ফরিদপুর', slug: 'faridpur', desc: 'পদ্মার তীরবর্তী প্রাচীন ঐতিহাসিক ও পাট সমৃদ্ধ জেলা।' },
    { div: 'dhaka', name_bn: 'গোপালগঞ্জ', slug: 'gopalganj', desc: 'মধুমতী নদীর তীরবর্তী জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমানের জন্মভূমি।' },
    { div: 'dhaka', name_bn: 'মাদারীপুর', slug: 'madaripur', desc: 'আড়িয়াল খাঁ নদীর অববাহিকায় অবস্থিত ঐতিহাসিক জনপদ।' },
    { div: 'dhaka', name_bn: 'রাজবাড়ী', slug: 'rajbari', desc: 'পদ্মার তীরবর্তী প্রাচীন গোয়ালন্দ ঘাট সংবলিত জেলা।' },
    { div: 'dhaka', name_bn: 'শরীয়তপুর', slug: 'shariatpur', desc: 'পদ্মা ও মেঘনা বিধৌত সম্ভাবনাময় দক্ষিণ-মধ্যাঞ্চলীয় জেলা।' },

    // Chittagong Division (11)
    { div: 'chittagong', name_bn: 'চট্টগ্রাম', slug: 'chittagong-dist', desc: 'দেশের প্রধান সমুদ্রবন্দর ও বাণিজ্য নগরী।' },
    { div: 'chittagong', name_bn: 'কক্সবাজার', slug: 'coxsbazar', desc: 'বিশ্বের দীর্ঘতম প্রাকৃতিক বালুকাময় সমুদ্রসৈকতের জেলা।' },
    { div: 'chittagong', name_bn: 'কুমিল্লা', slug: 'cumilla', desc: 'শালবন বৌদ্ধ বিহার ও ময়নামতির প্রত্নতাত্ত্বিক জেলা।' },
    { div: 'chittagong', name_bn: 'ব্রাহ্মণবাড়িয়া', slug: 'brahmanbaria', desc: 'তিতাস নদীর অববাহিকায় শিল্প, সাহিত্য ও সংস্কৃতির রাজধানী।' },
    { div: 'chittagong', name_bn: 'চাঁদপুর', slug: 'chandpur', desc: 'পদ্মা-মেঘনা-ডাকাতিয়ার মোহনায় অবস্থিত ইলিশের জেলা।' },
    { div: 'chittagong', name_bn: 'নোয়াখালী', slug: 'noakhali', desc: 'উপকূলীয় অঞ্চলের সাহসী ও পরিশ্রমী মানুষের জেলা।' },
    { div: 'chittagong', name_bn: 'ফেনী', slug: 'feni', desc: 'ঢাকা-চট্টগ্রাম মহাসড়কের প্রবেশদ্বার ও সমৃদ্ধ জেলা।' },
    { div: 'chittagong', name_bn: 'লক্ষ্মীপুর', slug: 'lakshmipur', desc: 'মেঘনার তীরবর্তী সয়াবিন ও সুপারির প্রাচুর্যের জেলা।' },
    { div: 'chittagong', name_bn: 'রাঙ্গামাটি', slug: 'rangamati', desc: 'কাপ্তাই হ্রদ ও নৈসর্গিক পাহাড়ের রানী।' },
    { div: 'chittagong', name_bn: 'বান্দরবান', slug: 'bandarban', desc: 'দেশের সর্বোচ্চ পর্বতশৃঙ্গ ও পাহাড়ি সৌন্দর্যের তীর্থভূমি।' },
    { div: 'chittagong', name_bn: 'খাগড়াছড়ি', slug: 'khagrachhari', desc: 'সবুজ পাহাড় ও আলুটিলা গুহার রহস্যময় জেলা।' },

    // Rajshahi Division (8)
    { div: 'rajshahi', name_bn: 'রাজশাহী', slug: 'rajshahi-dist', desc: 'পদ্মাপাড়ের রেশম নগরী ও শীর্ষ শিক্ষানগরী।' },
    { div: 'rajshahi', name_bn: 'বগুড়া', slug: 'bogura', desc: 'প্রাচীন পুণ্ড্রবর্ধন মহাস্থানগড় ও উত্তরবঙ্গের প্রবেশদ্বার।' },
    { div: 'rajshahi', name_bn: 'পাবনা', slug: 'pabna', desc: 'ইছামতী নদীর তীরে হার্ডিঞ্জ ব্রিজ ও রূপপুর পারমাণবিক প্রকল্পের জেলা।' },
    { div: 'rajshahi', name_bn: 'সিরাজগঞ্জ', slug: 'sirajganj', desc: 'যমুনা সেতুর পশ্চিম পাড়ে তাঁত শিল্পের অন্যতম প্রধান কেন্দ্র।' },
    { div: 'rajshahi', name_bn: 'নওগাঁ', slug: 'naogaon', desc: 'পাহাড়পুর বৌদ্ধবিহারের বিশ্ব ঐতিহ্য ও শস্যভাণ্ডার।' },
    { div: 'rajshahi', name_bn: 'নাটোর', slug: 'natore', desc: 'কাঁচাগোল্লা, রানি ভবানী ও চলনবিলের স্মৃতিবিজড়িত জেলা।' },
    { div: 'rajshahi', name_bn: 'জয়পুরহাট', slug: 'joypurhat', desc: 'খনিজ পদার্থ ও চিনি শিল্পের ঐতিহ্যবাহী জেলা।' },
    { div: 'rajshahi', name_bn: 'চাঁপাইনবাবগঞ্জ', slug: 'chapainawabganj', desc: 'আমের রাজধানী ও কাঁসা-পিতল শিল্পের জেলা।' },

    // Khulna Division (10)
    { div: 'khulna', name_bn: 'খুলনা', slug: 'khulna-dist', desc: 'ভৈরব-রূপসার মোহনা ও শিল্পাঞ্চলের জেলা।' },
    { div: 'khulna', name_bn: 'যশোর', slug: 'jashore', desc: 'দেশের প্রথম ডিজিটাল জেলা ও প্রাচীনতম জনপদ।' },
    { div: 'khulna', name_bn: 'সাতক্ষীরা', slug: 'satkhira', desc: 'সুন্দরবনের কোল ঘেঁষে অবস্থিত চিংড়ি ও খাঁটি মধুর জেলা।' },
    { div: 'khulna', name_bn: 'ঝিনাইদহ', slug: 'jhenaidah', desc: 'কপোতাক্ষ ও বেগবতী বিধৌত ইতিহাস সমৃদ্ধ জেলা।' },
    { div: 'khulna', name_bn: 'বাগেরহাট', slug: 'bagerhat', desc: 'খাঁন জাহান আলীর ষাটগম্বুজ মসজিদ সংবলিত বিশ্ব ঐতিহ্যবাহী জেলা।' },
    { div: 'khulna', name_bn: 'কুষ্টিয়া', slug: 'kushtia', desc: 'বাউলসম্রাট লালন সাঁই ও বিশ্বকবি রবীন্দ্রনাথের স্মৃতিধন্য সাংস্কৃতিক রাজধানী।' },
    { div: 'khulna', name_bn: 'চুয়াডাঙ্গা', slug: 'chuadanga', desc: 'মাথাভাঙ্গা নদীর তীরবর্তী দেশের প্রথম স্বাধীন রাজধানী ঘোষণার স্থান।' },
    { div: 'khulna', name_bn: 'মেহেরপুর', slug: 'meherpur', desc: 'মুজিবনগর স্মৃতিসৌধ ও স্বাধীন বাংলাদেশের প্রথম সরকারের শপথভূমি।' },
    { div: 'khulna', name_bn: 'মাগুরা', slug: 'magura', desc: 'নবগঙ্গা নদীর তীরবর্তী কবি ফররুখ আহমদের জন্মভূমি।' },
    { div: 'khulna', name_bn: 'নড়াইল', slug: 'narail', desc: 'চিত্রশিল্পী এস এম সুলতান ও চিত্রা নদীর শান্ত জেলা।' },

    // Barishal Division (6)
    { div: 'barishal', name_bn: 'বরিশাল', slug: 'barishal-dist', desc: 'কীর্তনখোলা নদীর তীরে বাংলার ভেনিস ও শস্য-বাণিজ্যের শহর।' },
    { div: 'barishal', name_bn: 'পটুয়াখালী', slug: 'patuakhali', desc: 'সাগরকন্যা কুয়াকাটা সমুদ্র সৈকতের অনন্য জেলা।' },
    { div: 'barishal', name_bn: 'ভোলা', slug: 'bhola', desc: 'বাংলাদেশের বৃহত্তম দ্বীপ জেলা ও ইলিশের প্রধান উৎস।' },
    { div: 'barishal', name_bn: 'পিরোজপুর', slug: 'pirojpur', desc: 'বলেশ্বর নদীর তীরে পেয়ারা ও সুপারি সমৃদ্ধ জেলা।' },
    { div: 'barishal', name_bn: 'বরগুনা', slug: 'barguna', desc: 'বিষখালী ও পায়রা বিধৌত প্রাকৃতিক দুর্যোগ সহনশীল জেলা।' },
    { div: 'barishal', name_bn: 'ঝালকাঠি', slug: 'jhalokati', desc: 'সুগন্ধা নদীর তীরে ঐতিহ্যবাহী ভাসমান পেয়ারার বাজার সংবলিত জেলা।' },

    // Sylhet Division (4)
    { div: 'sylhet', name_bn: 'সিলেট', slug: 'sylhet-dist', desc: 'হযরত শাহজালাল (রহ.) ও শাহপরাণ (রহ.)-এর পুণ্যভূমি, সুরমার কোল ও চা বাগান।' },
    { div: 'sylhet', name_bn: 'মৌলভীবাজার', slug: 'moulvibazar', desc: 'শ্রীমঙ্গলের চা বাগান ও মাধবকুণ্ড জলপ্রপাতের নৈসর্গিক জেলা।' },
    { div: 'sylhet', name_bn: 'হবিগঞ্জ', slug: 'habiganj', desc: 'চা বাগান, গ্যাসক্ষেত্র ও রাবার বাগানের প্রাকৃতিক সম্পদ সমৃদ্ধ জেলা।' },
    { div: 'sylhet', name_bn: 'সুনামগঞ্জ', slug: 'sunamganj', desc: 'হাছন রাজা ও বাউল শাহ আব্দুল করিমের সাধনার হাওরভূমি।' },

    // Rangpur Division (8)
    { div: 'rangpur', name_bn: 'রংপুর', slug: 'rangpur-dist', desc: 'ঘাঘট নদীর তীরে তামাক, আলু ও ঐতিহ্যের তাজহাট জমিদার বাড়ি সংবলিত জেলা।' },
    { div: 'rangpur', name_bn: 'দিনাজপুর', slug: 'dinajpur', desc: 'কান্তজীউ মন্দির, রামসাগর ও সুস্বাদু লিচু-কাটারিভোগের জেলা।' },
    { div: 'rangpur', name_bn: 'গাইবান্ধা', slug: 'gaibandha', desc: 'তিস্তা ও যমুনার চর সংবলিত রসমঞ্জরীর জেলা।' },
    { div: 'rangpur', name_bn: 'কুড়িগ্রাম', slug: 'kurigram', desc: '১৬টি নদ-নদী বিধৌত ধরলা ও ব্রহ্মপুত্রের অববাহিকার জেলা।' },
    { div: 'rangpur', name_bn: 'নীলফামারী', slug: 'nilphamari', desc: 'নীল চাষের প্রাচীন ইতিহাস ও সৈয়দপুর রেলওয়ে কারখানার জেলা।' },
    { div: 'rangpur', name_bn: 'লালমনিরহাট', slug: 'lalmonirhat', desc: 'তিস্তা ব্যারেজ ও তিনবিঘা করিডোরের সীমান্তবর্তী জেলা।' },
    { div: 'rangpur', name_bn: 'পঞ্চগড়', slug: 'panchagarh', desc: 'হিমালয়ের কোলঘেঁষা সমতল ভূমির চা বাগান ও তেঁতুলিয়ার রূপসী জেলা।' },
    { div: 'rangpur', name_bn: 'ঠাকুরগাঁও', slug: 'thakurgaon', desc: 'টাঙ্গন নদীর তীরে ঐতিহাসিক লোকসংস্কৃতি ও প্রাকৃতিক স্নিগ্ধতার জেলা।' },

    // Mymensingh Division (4)
    { div: 'mymensingh', name_bn: 'ময়মনসিংহ', slug: 'mymensingh-dist', desc: 'ব্রহ্মপুত্রের তীরে আনন্দমোহন কলেজ, কৃষি বিশ্ববিদ্যালয় ও গীতিকার ঐতিহ্যের জেলা।' },
    { div: 'mymensingh', name_bn: 'জামালপুর', slug: 'jamalpur', desc: 'নকশিকাঁথা ও মৃৎশিল্পের প্রসিদ্ধি সংবলিত যমুনার তীরবর্তী জেলা।' },
    { div: 'mymensingh', name_bn: 'নেত্রকোণা', slug: 'netrokona', desc: 'সুসং দুর্গাপুরের সাদামাটি পাহাড় ও হাওর বাউল গানের জেলা।' },
    { div: 'mymensingh', name_bn: 'শেরপুর', slug: 'sherpur', desc: 'গারো পাহাড়ের পাদদেশে সমৃদ্ধ নৃগোষ্ঠী ও বনাঞ্চলের জেলা।' },
  ];

  const distInsert = db.prepare(`
    INSERT INTO districts (division_id, name_bn, slug, description)
    VALUES (?, ?, ?, ?)
  `);

  const distMap = {};
  for (const dist of districtData) {
    const divId = divMap[dist.div];
    const info = distInsert.run(divId, dist.name_bn, dist.slug, dist.desc);
    distMap[dist.slug] = info.lastInsertRowid;
  }

  // 4. Complete Upazilas for all 64 Districts
  const upazilaData = require('./all_upazilas_data');

  const upaInsert = db.prepare(`
    INSERT INTO upazilas (district_id, name_bn, slug, description, postal_code)
    VALUES (?, ?, ?, ?, ?)
  `);

  const upaMap = {};
  for (const upa of upazilaData) {
    const distId = distMap[upa.dist];
    if (distId) {
      const info = upaInsert.run(distId, upa.name_bn, upa.slug, upa.desc, upa.postal);
      upaMap[upa.slug] = info.lastInsertRowid;
    }
  }

  // 5. Headquarters Employees (BAIT সদর দপ্তর)
  const peopleInsert = db.prepare(`
    INSERT INTO people (
      category, name_bn, slug, designation, photo_url, phone, email, bio,
      division_id, district_id, upazila_id, education, experience, expertise,
      courses_taught, course_name, batch, achievements, workplace_media, published_works,
      department, responsibilities
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const dhakaDivId = divMap['dhaka'];
  const dhakaDistId = distMap['dhaka-dist'];
  const gazipurDistId = distMap['gazipur'];
  const kapasiaUpaId = upaMap['kapasia'];
  const mirpurUpaId = upaMap['mirpur'];
  const savarUpaId = upaMap['savar'];
  const hathazariUpaId = upaMap['hathazari'];
  const ctgDivId = divMap['chittagong'];
  const ctgDistId = distMap['chittagong-dist'];

  // Regional IDs for Khulna, Rajshahi, Sylhet, Barishal, Rangpur, Mymensingh
  const khulnaDivId = divMap['khulna'];
  const kushtiaDistId = distMap['kushtia'];
  const kushtiaSadarUpaId = upaMap['kushtia-sadar'];
  const kumarkhaliUpaId = upaMap['kumarkhali'];

  const rajshahiDivId = divMap['rajshahi'];
  const boguraDistId = distMap['bogura'];
  const boguraSadarUpaId = upaMap['bogura-sadar'];

  const sylhetDivId = divMap['sylhet'];
  const sylhetDistId = distMap['sylhet-dist'];
  const sylhetSadarUpaId = upaMap['sylhet-sadar'];

  const barishalDivId = divMap['barishal'];
  const barishalDistId = distMap['barishal-dist'];
  const barishalSadarUpaId = upaMap['barishal-sadar'];

  const rangpurDivId = divMap['rangpur'];
  const rangpurDistId = distMap['rangpur-dist'];
  const rangpurSadarUpaId = upaMap['rangpur-sadar'];

  const mymensinghDivId = divMap['mymensingh'];
  const mymensinghDistId = distMap['mymensingh-dist'];
  const mymensinghSadarUpaId = upaMap['mymensingh-sadar'];

  // HQ Employees
  const employees = [
    {
      name_bn: 'অধ্যাপক মোঃ জহিরুল হক',
      slug: 'prof-zahirul-haque',
      designation: 'নির্বাহী পরিচালক (Executive Director)',
      photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭০০ ০০১১২২',
      email: 'ed@bait.org.bd',
      bio: 'বিগত ২৫ বছর ধরে তথ্যপ্রযুক্তি শিক্ষা ও প্রশাসনিক নেতৃত্বে যুক্ত আছেন। BAIT-এর সকল তৃণমূল কার্যক্রমের রূপকার ও প্রধান নীতি নির্ধারক।',
      division_id: dhakaDivId,
      district_id: dhakaDistId,
      upazila_id: mirpurUpaId,
      education: 'এম.এসসি ও পিএইচ.ডি (কম্পিউটার সায়েন্স), ঢাকা বিশ্ববিদ্যালয়',
      experience: '২৫+ বছর একাডেমিয়া ও তথ্যপ্রযুক্তি গবেষণা পরিচালনায় অভিজ্ঞতা',
      expertise: 'প্রাতিষ্ঠানিক পলিসি মেকিং, ডিজিটাল শিক্ষা বিস্তার, জাতীয় কারিকুলাম উন্নয়ন',
      department: 'নির্বাহী পরিচালনা ও নীতি নির্ধারণ',
      responsibilities: 'BAIT-এর সামগ্রিক প্রশাসনিক তদারকি, বিভাগীয় নেটওয়ার্ক সমন্বয় এবং ভবিষ্যৎ কর্মপরিকল্পনা বাস্তবায়ন।'
    },
    {
      name_bn: 'ড. ফারহানা জামান',
      slug: 'dr-farhana-zaman',
      designation: 'পরিচালক, শিক্ষা ও কারিকুলাম',
      photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭০০ ০০১১৩৩',
      email: 'academic@bait.org.bd',
      bio: 'আধুনিক কারিগরি শিক্ষা ও তৃণমূল পর্যায়ে দক্ষতা উন্নয়ন কারিকুলাম প্রণয়নে বিশেষজ্ঞ।',
      division_id: dhakaDivId,
      district_id: dhakaDistId,
      upazila_id: mirpurUpaId,
      education: 'পিএইচ.ডি (এডুকেশনাল টেকনোলজি), বুয়েট',
      experience: '১৫ বছর জাতীয় ও আন্তর্জাতিক শিক্ষা কার্যক্রমে নেতৃত্ব',
      expertise: 'আইসিটি কারিকুলাম, ইনস্ট্রাক্টর ট্রেনিং, মূল্যায়ন পদ্ধতি',
      department: 'শিক্ষা ও গবেষণা বিভাগ',
      responsibilities: 'কোর্সের মান নিয়ন্ত্রণ, ইনস্ট্রাক্টর নিয়োগ ও উন্নয়ন এবং নতুন প্রযুক্তির সংযোজন।'
    },
    {
      name_bn: 'ইঞ্জিনিয়ার তানভীর আহমেদ',
      slug: 'engr-tanvir-ahmed',
      designation: 'প্রধান প্রযুক্তি কর্মকর্তা (CTO)',
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭০০ ০০১১৪৪',
      email: 'cto@bait.org.bd',
      bio: 'জাতীয় ডিজিটাল প্লাটফর্ম এবং ক্লাউড আর্কিটেকচার বিশেষজ্ঞ। BAIT-এর সমগ্র তথ্যপ্রযুক্তি অবকাঠামো পরিচালনাকারী।',
      division_id: dhakaDivId,
      district_id: dhakaDistId,
      upazila_id: mirpurUpaId,
      education: 'বি.এসসি ইন সিএসই, বুয়েট',
      experience: '১২ বছর সফটওয়্যার আর্কিটেকচার ও ক্লাউড কম্পিউটিং',
      expertise: 'সফটওয়্যার সিস্টেম, সাইবার সিকিউরিটি, ডেটাবেস ইঞ্জিনিয়ারিং',
      department: 'আইসিটি ও প্রযুক্তি বিভাগ',
      responsibilities: 'ওয়েবসাইট ও ডাটাবেস সিকিউরিটি, সার্ভার অপটিমাইজেশন ও অটোমেশন পরিচালনা।'
    },
    {
      name_bn: 'শারমিন সুলতানা',
      slug: 'sharmin-sultana',
      designation: 'সিনিয়র জনসংযোগ ও মিডিয়া কর্মকর্তা',
      photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭০০ ০০১১৫৫',
      email: 'media@bait.org.bd',
      bio: 'বাংলাদেশের ৬৪ জেলার মাঠপর্যায়ের সাংবাদিক ও প্রতিনিধিদের সাথে সার্বক্ষণিক যোগাযোগ ও মিডিয়া ব্রিফিং পরিচালনা করেন।',
      division_id: dhakaDivId,
      district_id: dhakaDistId,
      upazila_id: mirpurUpaId,
      education: 'এম.এ (গণযোগাযোগ ও সাংবাদিকতা), ঢাকা বিশ্ববিদ্যালয়',
      experience: '১০ বছর গণমাধ্যম ও জনসংযোগ অভিজ্ঞতা',
      expertise: 'মিডিয়া রিলেশনস, প্রেস রিলিজ, উপজেলা পর্যায়ের রিপোর্ট মনিটরিং',
      department: 'জনসংযোগ ও গণমাধ্যম শাখা',
      responsibilities: 'উপজেলা ও জেলা পর্যায়ের সাংবাদিকদের নেটওয়ার্ক নিয়ন্ত্রণ এবং প্রেস বিজ্ঞপ্তি তৈরি।'
    }
  ];

  for (const emp of employees) {
    peopleInsert.run(
      'employee', emp.name_bn, emp.slug, emp.designation, emp.photo_url, emp.phone, emp.email, emp.bio,
      emp.division_id, emp.district_id, emp.upazila_id, emp.education, emp.experience, emp.expertise,
      null, null, null, null, null, null,
      emp.department, emp.responsibilities
    );
  }

  // 6. Instructors (প্রশিক্ষকগণ — এলাকা ও উপজেলার সাথে সম্পর্কিত)
  const instructors = [
    {
      name_bn: 'মোঃ আব্দুর রহিম',
      slug: 'rahim-ahmed',
      designation: 'সিনিয়র প্রশিক্ষক (ওয়েব ডেভেলপমেন্ট)',
      photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১১ ২২৩৩৪১',
      email: 'rahim.ahmed@bait.org.bd',
      bio: 'ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট এবং আধুনিক জাভাস্ক্রিপ্ট ফ্রেমওয়ার্কের অভিজ্ঞ প্রশিক্ষক। কাপাসিয়া উপজেলায় গত ৪ বছর ধরে তৃণমূলের তরুণদের কারিগরি দক্ষতা উন্নয়ন করছেন।',
      division_id: dhakaDivId,
      district_id: gazipurDistId,
      upazila_id: kapasiaUpaId,
      education: 'বি.এসসি (সিএসই), জাহাঙ্গীরনগর বিশ্ববিদ্যালয়',
      experience: '৮ বছর সফটওয়্যার শিল্প ও প্রশিক্ষণ পরিচালনা',
      expertise: 'React, Node.js, Express, PostgreSQL, Tailwind, REST API',
      courses_taught: 'আধুনিক ওয়েব ডেভেলপমেন্ট ও রিয়্যাক্ট মাস্টারক্লাস, ফুলস্ট্যাক অ্যাপ্লিকেশন ডিজাইন'
    },
    {
      name_bn: 'নাজনীন আক্তার',
      slug: 'nazneen-akter',
      designation: 'প্রধান প্রশিক্ষক (গ্রাফিক ডিজাইন ও ইউআই/ইউএক্স)',
      photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১১ ২২৩৩৪২',
      email: 'nazneen@bait.org.bd',
      bio: 'আন্তর্জাতিক ফ্রিল্যান্সিং ও ডিজাইন ইন্ডাস্ট্রিতে স্বনামধন্য ইউআই ডিজাইনার। সাভার এবং গাজীপুর অঞ্চলে সক্রিয় প্রশিক্ষক।',
      division_id: dhakaDivId,
      district_id: dhakaDistId,
      upazila_id: savarUpaId,
      education: 'বি.এফ.এ (গ্রাফিক ডিজাইন), চারুকলা অনুষদ',
      experience: '৭ বছর ইউএক্স রিসার্চ ও ভিজ্যুয়াল ব্র্যান্ডিং',
      expertise: 'Figma, Adobe Illustrator, Photoshop, Design Systems, Typography',
      courses_taught: 'প্রফেশনাল গ্রাফিক ডিজাইন ও আধুনিক ইউআই/ইউএক্স কোর্স'
    },
    {
      name_bn: 'আরিফুল ইসলাম',
      slug: 'ariful-islam',
      designation: 'প্রশিক্ষক (সাইবার সিকিউরিটি ও নেটওয়ার্কিং)',
      photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১১ ২২৩৩৪৩',
      email: 'ariful.ctg@bait.org.bd',
      bio: 'নেটওয়ার্ক পেনিট্রেশন টেস্টিং ও সাইবার ডিফেন্স বিশেষজ্ঞ। চট্টগ্রাম বিভাগের বিভিন্ন উপজেলায় তথ্য নিরাপত্তা কর্মশালা পরিচালনা করেন।',
      division_id: ctgDivId,
      district_id: ctgDistId,
      upazila_id: hathazariUpaId,
      education: 'এম.এসসি ইন নেটওয়ার্ক সিকিউরিটি, চট্টগ্রাম বিশ্ববিদ্যালয়',
      experience: '৬ বছর নেটওয়ার্ক সিকিউরিটি অ্যানালিস্ট হিসেবে কাজের অভিজ্ঞতা',
      expertise: 'Ethical Hacking, Linux Administration, Network Security, Cisco',
      courses_taught: 'সাইবার সিকিউরিটি ফান্ডামেন্টালস ও এথিক্যাল হ্যাকিং'
    },
    {
      name_bn: 'মোস্তফা কামাল',
      slug: 'mostafa-kamal',
      designation: 'প্রশিক্ষক (মোবাইল অ্যাপ ডেভেলপমেন্ট)',
      photo_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১১ ২২৩৩৪৪',
      email: 'mostafa.app@bait.org.bd',
      bio: 'ফ্লাটার ও অ্যান্ড্রয়েড মোবাইল অ্যাপ্লিকেশন বিশেষজ্ঞ। তরুণ শিক্ষার্থীদের মোবাইল অ্যাপ তৈরিতে উৎসাহিত করতে নিবেদিত।',
      division_id: dhakaDivId,
      district_id: dhakaDistId,
      upazila_id: mirpurUpaId,
      education: 'বি.এসসি (সিএসই), আহসানউল্লাহ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়',
      experience: '৫ বছর ক্রস-প্ল্যাটফর্ম মোবাইল অ্যাপ ডেভেলপমেন্ট',
      expertise: 'Flutter, Dart, Firebase, Android Native, State Management',
      courses_taught: 'ফ্লাটার ও ক্রস-প্ল্যাটফর্ম মোবাইল অ্যাপ ডেভেলপমেন্ট'
    },
    {
      name_bn: 'ইঞ্জিনিয়ার হাসান ইমাম',
      slug: 'hasan-imam',
      designation: 'সিনিয়র প্রশিক্ষক (কম্পিউটার নেটওয়ার্কিং ও আইটি)',
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১২ ৫৫০৬০১',
      email: 'hasan.kushtia@bait.org.bd',
      bio: 'কুষ্টিয়া ও খুলনা অঞ্চলে তরুণদের আধুনিক আইটি নেটওয়ার্কিং ও ওয়েব প্রযুক্তিতে দক্ষ করে তুলতে নিবেদিত প্রশিক্ষক।',
      division_id: khulnaDivId,
      district_id: kushtiaDistId,
      upazila_id: kushtiaSadarUpaId,
      education: 'বি.এসসি ইন সিএসই, ইসলামী বিশ্ববিদ্যালয় (কুষ্টিয়া)',
      experience: '৭ বছর আইটি অবকাঠামো ও প্রশিক্ষণ পরিচালনা',
      expertise: 'Web Development, Linux System, Network Routing, Cybersecurity',
      courses_taught: 'ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট ও ফ্রিল্যান্সিং ক্যারিয়ার'
    },
    {
      name_bn: 'নাজমুল হক',
      slug: 'nazmul-haque',
      designation: 'প্রশিক্ষক (পাইথন ও ডেটা সায়েন্স)',
      photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১২ ৫৫০৬০২',
      email: 'nazmul.bogura@bait.org.bd',
      bio: 'উত্তরবঙ্গের প্রাণকেন্দ্র বগুড়ায় আধুনিক ডেটা সায়েন্স ও প্রোগ্রামিং ল্যাব পরিচালনা করেন।',
      division_id: rajshahiDivId,
      district_id: boguraDistId,
      upazila_id: boguraSadarUpaId,
      education: 'এম.এসসি ইন সিএসই, রাজশাহী বিশ্ববিদ্যালয়',
      experience: '৬ বছর ডেটা অ্যানালিটিক্স ও মেশিন লার্নিং',
      expertise: 'Python, SQL, Machine Learning, Data Visualization, Django',
      courses_taught: 'ব্যবহারিক পাইথন ও ডেটা অ্যানালিটিক্স ফান্ডামেন্টালস'
    },
    {
      name_bn: 'সৈয়দ মাহমুদ হাসান',
      slug: 'syed-mahmud',
      designation: 'প্রশিক্ষক (সাইবার সিকিউরিটি ও লিনাক্স)',
      photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১২ ৫৫০৬০৩',
      email: 'mahmud.sylhet@bait.org.bd',
      bio: 'সিলেট অঞ্চলের শিক্ষার্থীদের সাইবার সুরক্ষা ও ক্লাউড সিস্টেম ডিজাইনের প্রশিক্ষণ দেন।',
      division_id: sylhetDivId,
      district_id: sylhetDistId,
      upazila_id: sylhetSadarUpaId,
      education: 'বি.এসসি (সিএসই), শাবিপ্রবি (শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়)',
      experience: '৫ বছর সাইবার নিরাপত্তা অডিট',
      expertise: 'Cyber Security, Ethical Hacking, Cloud Architecture',
      courses_taught: 'সাইবার ডিফেন্স ও ক্লাউড সিস্টেম সিকিউরিটি'
    },
    {
      name_bn: 'তানিয়া সুলতানা',
      slug: 'tania-sultana',
      designation: 'প্রশিক্ষক (ইউআই/ইউএক্স ও গ্রাফিক ডিজাইন)',
      photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১২ ৫৫০৬০৪',
      email: 'tania.barishal@bait.org.bd',
      bio: 'বরিশাল বিভাগের নারী ও তরুণ শিক্ষার্থীদের ডিজিটাল ডিজাইন ও ফ্রিল্যান্সিংয়ে দক্ষ করে তুলছেন।',
      division_id: barishalDivId,
      district_id: barishalDistId,
      upazila_id: barishalSadarUpaId,
      education: 'বি.এফ.এ, চারুকলা অনুষদ',
      experience: '৫ বছর প্রোডাক্ট ডিজাইন ও ইউএক্স গবেষণা',
      expertise: 'Figma, Illustrator, Brand Identity, UI Design',
      courses_taught: 'প্রফেশনাল গ্রাফিক ডিজাইন ও ডিজিটাল আর্ট'
    },
    {
      name_bn: 'শফিকুল ইসলাম',
      slug: 'shafiqul-islam-rangpur',
      designation: 'প্রশিক্ষক (অ্যাপ্লিকেশন ডেভেলপমেন্ট)',
      photo_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১২ ৫৫০৬০৫',
      email: 'shafiq.rangpur@bait.org.bd',
      bio: 'রংপুর অঞ্চলে মোবাইল অ্যাপ্লিকেশন ও আধুনিক জাভাস্ক্রিপ্ট প্রশিক্ষণ পরিচালনা করছেন।',
      division_id: rangpurDivId,
      district_id: rangpurDistId,
      upazila_id: rangpurSadarUpaId,
      education: 'বি.এসসি (সিএসই), বেগম রোকেয়া বিশ্ববিদ্যালয়',
      experience: '৫ বছর সফটওয়্যার ডেভেলপমেন্ট',
      expertise: 'React, Node.js, Flutter, API Engineering',
      courses_taught: 'আধুনিক ফ্রন্টএন্ড ওয়েব ও অ্যাপ ডেভেলপমেন্ট'
    },
    {
      name_bn: 'ইমরান নাজির',
      slug: 'imran-nazir',
      designation: 'প্রশিক্ষক (ডিজিটাল মিডিয়া ও এসইও)',
      photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১২ ৫৫০৬০৬',
      email: 'imran.mymensingh@bait.org.bd',
      bio: 'ময়মনসিংহ বিভাগে তরুণ শিক্ষার্থীদের ডিজিটাল মার্কেটিং ও কনটেন্ট স্ট্র্যাটেজি শেখাচ্ছেন।',
      division_id: mymensinghDivId,
      district_id: mymensinghDistId,
      upazila_id: mymensinghSadarUpaId,
      education: 'এম.বি.এ (মার্কেটিং), আনন্দমোহন কলেজ',
      experience: '৬ বছর ডিজিটাল মার্কেটিং ও কনসালটেন্সি',
      expertise: 'SEO, Content Strategy, Social Media Marketing, Analytics',
      courses_taught: 'প্রফেশনাল ডিজিটাল মার্কেটিং ও এসইও স্পেশালাইজেশন'
    }
  ];

  const instructorIds = {};
  for (const inst of instructors) {
    const info = peopleInsert.run(
      'instructor', inst.name_bn, inst.slug, inst.designation, inst.photo_url, inst.phone, inst.email, inst.bio,
      inst.division_id, inst.district_id, inst.upazila_id, inst.education, inst.experience, inst.expertise,
      inst.courses_taught, null, null, null, null, null,
      null, null
    );
    instructorIds[inst.slug] = info.lastInsertRowid;
  }

  // 7. Students (শিক্ষার্থীগণ — বিভাগ, জেলা ও উপজেলা অনুযায়ী)
  const students = [
    {
      name_bn: 'তানভীর হোসেন',
      slug: 'tanvir-hossain',
      designation: 'প্রশিক্ষণার্থী (ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট)',
      photo_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৮১২ ১১২২৩৩',
      email: 'tanvir.kapasia@gmail.com',
      bio: 'কাপাসিয়া উপজেলার একজন উদ্যমী তরুণ যিনি আধুনিক জাভাস্ক্রিপ্ট ফ্রেমওয়ার্ক শিখে স্থানীয় পর্যায়ে ডিজিটাল সমাধান তৈরি করছেন।',
      division_id: dhakaDivId,
      district_id: gazipurDistId,
      upazila_id: kapasiaUpaId,
      education: 'স্নাতক (চলমান), কাপাসিয়া ডিগ্রি কলেজ',
      course_name: 'আধুনিক ওয়েব ডেভেলপমেন্ট ও রিয়্যাক্ট মাস্টারক্লাস',
      batch: 'ব্যাচ-০১ (২০২৬)',
      achievements: 'BAIT তৃণমূল হ্যাকাথন ২০২৬-এ প্রথম রানার-আপ; কাপাসিয়া ই-কমার্স পোর্টাল প্রজেক্ট সফল বাস্তবায়ন।'
    },
    {
      name_bn: 'সাদিয়া আফরিন',
      slug: 'sadia-afrin',
      designation: 'প্রশিক্ষণার্থী (ইউআই/ইউএক্স ডিজাইন)',
      photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৮১২ ১১২২৩৪',
      email: 'sadia.gazipur@gmail.com',
      bio: 'গাজীপুর সদরের শিক্ষার্থী যিনি ব্যবহারকারী বান্ধব ইন্টারফেস ও মোবাইল অ্যাপ ডিজাইন তৈরিতে পারদর্শী।',
      division_id: dhakaDivId,
      district_id: gazipurDistId,
      upazila_id: upaMap['gazipur-sadar'] || kapasiaUpaId,
      education: 'এইচএসসি উত্তীর্ণ',
      course_name: 'প্রফেশনাল গ্রাফিক ডিজাইন ও আধুনিক ইউআই/ইউএক্স',
      batch: 'ব্যাচ-০২ (২০২৬)',
      achievements: '১০+ মোবাইল অ্যাপ ইন্টারফেস ডিজাইন সম্পন্ন ও ফ্রিল্যান্স প্রজেক্ট ডেলিভারি।'
    },
    {
      name_bn: 'ফারহান আহমেদ',
      slug: 'farhan-ahmed',
      designation: 'প্রশিক্ষণার্থী (সাইবার সিকিউরিটি)',
      photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৮১২ ১১২২৩৫',
      email: 'farhan.savar@gmail.com',
      bio: 'সাভার উপজেলার প্রযুক্তি অনুরাগী ছাত্র যিনি তথ্য নিরাপত্তা ও নেটওয়ার্কিং নিয়ে গভীরভাবে শিখছেন।',
      division_id: dhakaDivId,
      district_id: dhakaDistId,
      upazila_id: savarUpaId,
      education: 'ডিপ্লোমা ইন কম্পিউটার ইঞ্জিনিয়ারিং',
      course_name: 'সাইবার সিকিউরিটি ফান্ডামেন্টালস ও এথিক্যাল হ্যাকিং',
      batch: 'ব্যাচ-০১ (২০২৬)',
      achievements: 'লোকাল ল্যাব সিকিউরিটি অডিটিং সম্পন্ন।'
    },
    {
      name_bn: 'আফরোজা সুলতানা',
      slug: 'afroza-sultana',
      designation: 'প্রশিক্ষণার্থী (ওয়েব ডেভেলপমেন্ট)',
      photo_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৮১২ ১১২২৩৬',
      email: 'afroza.hathazari@gmail.com',
      bio: 'চট্টগ্রামের হাটহাজারী এলাকার নিবেদিত শিক্ষার্থী, নারী শিক্ষায় আইসিটি বিস্তারে উৎসাহী।',
      division_id: ctgDivId,
      district_id: ctgDistId,
      upazila_id: hathazariUpaId,
      education: 'বি.এ অনার্স (ইংরেজি), চট্টগ্রাম বিশ্ববিদ্যালয়',
      course_name: 'আধুনিক ওয়েব ডেভেলপমেন্ট ও রিয়্যাক্ট মাস্টারক্লাস',
      batch: 'ব্যাচ-০১ (২০২৬)',
      achievements: 'হাটহাজারী নারী উদ্যোক্তা ডিরেক্টরি পোর্টাল তৈরি।'
    },
    {
      name_bn: 'মেহেদী হাসান',
      slug: 'mehedi-hasan-kushtia',
      designation: 'প্রশিক্ষণার্থী (ফুলস্ট্যাক ডেভেলপমেন্ট)',
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৮১২ ১১২২৩৭',
      email: 'mehedi.kushtia@gmail.com',
      bio: 'কুষ্টিয়া সদর উপজেলার তরুণ ডেভেলপার, যিনি স্থানীয় ব্যবসায়ীদের জন্য ডিজিটাল ইনভেন্টরি সফটওয়্যার তৈরি করছেন।',
      division_id: khulnaDivId,
      district_id: kushtiaDistId,
      upazila_id: kushtiaSadarUpaId,
      education: 'বি.এসসি (সিএসই অধ্যায়নরত), ইসলামী বিশ্ববিদ্যালয়',
      course_name: 'ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট ও ফ্রিল্যান্সিং ক্যারিয়ার',
      batch: 'ব্যাচ-০১ (২০২৬)',
      achievements: 'কুষ্টিয়া হস্তশিল্প অনলাইন স্টোর তৈরি।'
    },
    {
      name_bn: 'আহমেদ জুবায়ের',
      slug: 'ahmed-zubair-bogura',
      designation: 'প্রশিক্ষণার্থী (পাইথন ও ডেটা সায়েন্স)',
      photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৮১২ ১১২২৩৮',
      email: 'zubair.bogura@gmail.com',
      bio: 'বগুড়া সদরের শিক্ষার্থী, যিনি কৃষি ও আবহাওয়া ডেটা অ্যানালাইসিস নিয়ে কাজ করছেন।',
      division_id: rajshahiDivId,
      district_id: boguraDistId,
      upazila_id: boguraSadarUpaId,
      education: 'স্নাতক (পরিসংখ্যান), সরকারি আজিজুল হক কলেজ',
      course_name: 'ব্যবহারিক পাইথন ও ডেটা অ্যানালিটিক্স ফান্ডামেন্টালস',
      batch: 'ব্যাচ-০১ (২০২৬)',
      achievements: 'উত্তরবঙ্গ ফসল উৎপাদন প্রেডিকশন মডেল।'
    },
    {
      name_bn: 'সাদিকুর রহমান',
      slug: 'sadikur-rahman-sylhet',
      designation: 'প্রশিক্ষণার্থী (সাইবার সিকিউরিটি)',
      photo_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৮১২ ১১২২৩৯',
      email: 'sadik.sylhet@gmail.com',
      bio: 'সিলেট সদরের শিক্ষার্থী যিনি ক্লাউড সিকিউরিটি ও আইটি অবকাঠামো সুরক্ষায় দক্ষ।',
      division_id: sylhetDivId,
      district_id: sylhetDistId,
      upazila_id: sylhetSadarUpaId,
      education: 'বি.এসসি (সিএসই), শাবিপ্রবি',
      course_name: 'সাইবার ডিফেন্স ও ক্লাউড সিস্টেম সিকিউরিটি',
      batch: 'ব্যাচ-০১ (২০২৬)',
      achievements: 'সিলেট সিটি ওয়াইফাই নেটওয়ার্ক ভলনারেবিলিটি রিপোর্ট।'
    },
    {
      name_bn: 'মরিয়ম আক্তার',
      slug: 'morium-akter-barishal',
      designation: 'প্রশিক্ষণার্থী (ইউআই/ইউএক্স ডিজাইন)',
      photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৮১২ ১১২২৪০',
      email: 'morium.barishal@gmail.com',
      bio: 'বরিশাল সদরের শিক্ষার্থী যিনি মোবাইল অ্যাপ্লিকেশন ও ল্যান্ডিং পেজ ডিজাইনে পারদর্শী।',
      division_id: barishalDivId,
      district_id: barishalDistId,
      upazila_id: barishalSadarUpaId,
      education: 'এইচএসসি উত্তীর্ণ, সরকারি বিএম কলেজ',
      course_name: 'প্রফেশনাল গ্রাফিক ডিজাইন ও ডিজিটাল আর্ট',
      batch: 'ব্যাচ-০১ (২০২৬)',
      achievements: '১৫টি সফল ফ্রিল্যান্স ডিজাইন কনটেস্ট বিজয়ী।'
    },
    {
      name_bn: 'রাকিবুল হাসান',
      slug: 'rakibul-hasan-rangpur',
      designation: 'প্রশিক্ষণার্থী (অ্যাপ্লিকেশন ডেভেলপমেন্ট)',
      photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৮১২ ১১২২৪১',
      email: 'rakibul.rangpur@gmail.com',
      bio: 'রংপুর সদরের প্রযুক্তি শিক্ষার্থী যিনি স্থানীয় কৃষকদের জন্য মোবাইল অ্যাপ বানাচ্ছেন।',
      division_id: rangpurDivId,
      district_id: rangpurDistId,
      upazila_id: rangpurSadarUpaId,
      education: 'ডিপ্লোমা ইন কম্পিউটার ইঞ্জিনিয়ারিং',
      course_name: 'আধুনিক ফ্রন্টএন্ড ওয়েব ও অ্যাপ ডেভেলপমেন্ট',
      batch: 'ব্যাচ-০১ (২০২৬)',
      achievements: 'রংপুর ডিজিটাল কৃষক সেবা অ্যাপ প্রোটোটাইপ।'
    },
    {
      name_bn: 'তানজিলা নাসরিন',
      slug: 'tanjila-nasrin-mymensingh',
      designation: 'প্রশিক্ষণার্থী (ডিজিটাল মার্কেটিং)',
      photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৮১২ ১১২২৪২',
      email: 'tanjila.mymensingh@gmail.com',
      bio: 'ময়মনসিংহ সদরের তরুণ উদ্যোক্তা ও ডিজিটাল মার্কেটার।',
      division_id: mymensinghDivId,
      district_id: mymensinghDistId,
      upazila_id: mymensinghSadarUpaId,
      education: 'স্নাতক (মার্কেটিং), আনন্দমোহন কলেজ',
      course_name: 'প্রফেশনাল ডিজিটাল মার্কেটিং ও এসইও স্পেশালাইজেশন',
      batch: 'ব্যাচ-০১ (২০২৬)',
      achievements: 'ময়মনসিংহ হস্তশিল্প ব্র্যান্ডিং ও এসইও ক্যাম্পেইন সফল পরিচালনা।'
    }
  ];

  for (const st of students) {
    peopleInsert.run(
      'student', st.name_bn, st.slug, st.designation, st.photo_url, st.phone, st.email, st.bio,
      st.division_id, st.district_id, st.upazila_id, st.education, 'প্রশিক্ষণাধীন', null,
      null, st.course_name, st.batch, st.achievements, null, null,
      null, null
    );
  }

  // 8. Journalists (সাংবাদিকগণ — বিভাগ, জেলা ও উপজেলা অনুযায়ী)
  const journalists = [
    {
      name_bn: 'করিম আহমেদ',
      slug: 'karim-ahmed',
      designation: 'উপজেলা বিশেষ প্রতিনিধি (কাপাসিয়া)',
      photo_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১৪ ৩৩৪৪৫৫',
      email: 'karim.news@bait.org.bd',
      bio: 'কাপাসিয়া উপজেলার মাটি ও মানুষের কথা, শিক্ষা, স্থানীয় উদ্ভাবন ও উন্নয়ন সংক্রান্ত প্রতিবেদন তৈরিতে নিবেদিত নিষ্ঠাবান সাংবাদিক।',
      division_id: dhakaDivId,
      district_id: gazipurDistId,
      upazila_id: kapasiaUpaId,
      education: 'স্নাতকোত্তর (রাষ্ট্রবিজ্ঞান), জাতীয় বিশ্ববিদ্যালয়',
      experience: '৮ বছর আঞ্চলিক ও জাতীয় দৈনিক পত্রিকায় সাংবাদিকতা',
      expertise: 'ইনভেস্টিগেটিভ জার্নালিজম, গ্রামীণ শিক্ষা ও তথ্যপ্রযুক্তি রিপোর্টিং',
      workplace_media: 'দৈনিক প্রথম আলো ও BAIT নিউজ নেটওয়ার্ক',
      published_works: 'কাপাসিয়ায় তরুণদের আইসিটি বিপ্লব (২০২৫), শীতলক্ষ্যা তীরের কৃষিতে আধুনিক ড্রোন প্রযুক্তি, গ্রামীণ পাঠাগার আন্দোলন।'
    },
    {
      name_bn: 'রফিকুল ইসলাম',
      slug: 'rafiqul-islam',
      designation: 'জেলা ব্যুরো প্রধান (গাজীপুর)',
      photo_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১৪ ৩৩৪৪৫৬',
      email: 'rafiq.gazipur@bait.org.bd',
      bio: 'গাজীপুরের শিল্পাঞ্চল, প্রযুক্তি পার্ক ও জনস্বার্থ বিষয়ে বিগত এক দশক ধরে নির্ভরযোগ্য খবর তুলে ধরছেন।',
      division_id: dhakaDivId,
      district_id: gazipurDistId,
      upazila_id: upaMap['gazipur-sadar'] || kapasiaUpaId,
      education: 'স্নাতকোত্তর (গণযোগাযোগ ও সাংবাদিকতা)',
      experience: '১২ বছর টেলিভিশন ও অনলাইন নিউজ মিডিয়া',
      expertise: 'শিল্প-বাণিজ্য রিপোর্টিং, পরিবেশ ও জলবায়ু সাংবাদিকতা',
      workplace_media: 'সময় টেলিভিশন ও BAIT মিডিয়া সেল',
      published_works: 'কালিয়াকৈর হাই-টেক সিটিতে স্থানীয় যুবকদের কর্মসংস্থান, গাজীপুরের টেক্সটাইল খাতে অটোমেশন ও শ্রমিক দক্ষতা।'
    },
    {
      name_bn: 'নুসরাত জাহান মিলি',
      slug: 'nusrat-jahan',
      designation: 'বিশেষ প্রতিবেদক (শিক্ষা ও প্রযুক্তি)',
      photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১৪ ৩৩৪৪৫৭',
      email: 'nusrat.media@bait.org.bd',
      bio: 'ঢাকা ও চট্টগ্রাম অঞ্চলের আইসিটি শিক্ষা এবং নারী ক্ষমতায়ন নিয়ে গবেষণাধর্মী প্রতিবেদন লিখে থাকেন।',
      division_id: dhakaDivId,
      district_id: dhakaDistId,
      upazila_id: mirpurUpaId,
      education: 'এম.এ (সাংবাদিকতা), ঢাকা বিশ্ববিদ্যালয়',
      experience: '৭ বছর বিশেষায়িত প্রযুক্তি সাংবাদিকতা',
      expertise: 'ডিজিটাল লিটারেসি, সাইবার বুলিং প্রতিরোধ ও ডেটা জার্নালিজম',
      workplace_media: 'দ্য ডেইলি স্টার ও BAIT রিসার্চ জার্নাল',
      published_works: '৬৪ জেলায় তথ্যপ্রযুক্তি শিক্ষার প্রসার: একটি মাঠ সমীক্ষা, নারী ফ্রিল্যান্সারদের অর্থনৈতিক ক্ষমতায়ন।'
    },
    {
      name_bn: 'মতিউর রহমান',
      slug: 'motiur-rahman-kushtia',
      designation: 'জেলা প্রতিনিধি (কুষ্টিয়া)',
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১৪ ৩৩৪৪৫৮',
      email: 'motiur.kushtia@bait.org.bd',
      bio: 'কুষ্টিয়া জেলার গ্রামীণ সংস্কৃতি, শিক্ষা ও যুব সমাজের প্রযুক্তিগত অগ্রগতি সংক্রান্ত অনুসন্ধানী প্রতিবেদন প্রস্তুতকারী।',
      division_id: khulnaDivId,
      district_id: kushtiaDistId,
      upazila_id: kushtiaSadarUpaId,
      education: 'এম.এ (বাংলা), ইসলামী বিশ্ববিদ্যালয়',
      experience: '৯ বছর জেলা সাংবাদিকতা',
      expertise: 'গ্রামীণ অর্থনীতি, কারিগরি শিক্ষা ও কালচারাল রিপোর্টিং',
      workplace_media: 'দৈনিক জনকণ্ঠ ও BAIT নিউজ নেটওয়ার্ক',
      published_works: 'কুষ্টিয়ায় ফ্রিল্যান্সিংয়ে গ্রামীণ তরুণীদের সাফল্য, লালনের ভূমিতে ডিজিটাল রূপান্তর।'
    },
    {
      name_bn: 'আমিনুল ইসলাম',
      slug: 'aminul-islam-bogura',
      designation: 'উত্তরবঙ্গ ব্যুরো প্রধান (বগুড়া)',
      photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১৪ ৩৩৪৪৫৯',
      email: 'aminul.bogura@bait.org.bd',
      bio: 'বগুড়া ও রাজশাহী অঞ্চলের কৃষি-প্রযুক্তি এবং তরুণ উদ্যোক্তাদের উদ্ভাবনী উদ্যোগ তুলে ধরেন।',
      division_id: rajshahiDivId,
      district_id: boguraDistId,
      upazila_id: boguraSadarUpaId,
      education: 'স্নাতকোত্তর (গণযোগাযোগ), রাজশাহী বিশ্ববিদ্যালয়',
      experience: '১১ বছর সাংবাদিকতা',
      expertise: 'কৃষি প্রযুক্তি, আঞ্চলিক উন্নয়ন ও ই-কমার্স',
      workplace_media: 'বাংলাদেশ টেলিভিশন (বিটিভি) ও BAIT মিডিয়া',
      published_works: 'বগুড়ার চরাঞ্চলে সৌরশক্তি ও ডিজিটাল পাঠশালা, তরুণদের উদ্ভাবনী কৃষি গ্যাজেট।'
    },
    {
      name_bn: 'ফয়সাল আহমেদ',
      slug: 'faysal-ahmed-sylhet',
      designation: 'বিভাগীয় প্রতিনিধি (সিলেট)',
      photo_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
      phone: '+৮৮০ ১৭১৪ ৩৩৪৪৬০',
      email: 'faysal.sylhet@bait.org.bd',
      bio: 'সিলেট অঞ্চলের হাওর এলাকার শিক্ষা এবং রেমিট্যান্স ভিত্তিক ডিজিটাল বিনিয়োগ নিয়ে কাজ করেন।',
      division_id: sylhetDivId,
      district_id: sylhetDistId,
      upazila_id: sylhetSadarUpaId,
      education: 'স্নাতকোত্তর, শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়',
      experience: '৮ বছর মিডিয়া অভিজ্ঞতা',
      expertise: 'প্রবাসী বিনিয়োগ, হাওর অঞ্চলের তথ্যপ্রযুক্তি',
      workplace_media: 'যমুনা টেলিভিশন ও BAIT নেটওয়ার্ক',
      published_works: 'হাওরবাসীর প্রযুক্তি সংযোগ, সিলেটের ডিজিটাল উদ্যোক্তাদের গল্প।'
    }
  ];

  for (const j of journalists) {
    peopleInsert.run(
      'journalist', j.name_bn, j.slug, j.designation, j.photo_url, j.phone, j.email, j.bio,
      j.division_id, j.district_id, j.upazila_id, j.education, j.experience, j.expertise,
      null, null, null, null, j.workplace_media, j.published_works,
      null, null
    );
  }

  // 9. Courses (কোর্সসমূহ)
  const courses = [
    {
      title_bn: 'আধুনিক ওয়েব ডেভেলপমেন্ট ও রিয়্যাক্ট মাস্টারক্লাস',
      slug: 'web-development',
      description: 'শূন্য থেকে পূর্ণাঙ্গ ফ্রন্টএন্ড ও ফুলস্ট্যাক ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট শেখার কোর্স। HTML, CSS, JavaScript, React, Node.js এবং ডাটাবেস অন্তর্ভুক্ত।',
      duration: '৬ মাস (২৪ সপ্তাহ)',
      batch_info: 'ব্যাচ-০১ (সপ্তাহে ৩ দিন)',
      instructor_id: instructorIds['rahim-ahmed'],
      division_id: dhakaDivId,
      district_id: gazipurDistId,
      upazila_id: kapasiaUpaId,
      syllabus: 'মডিউল ১: ওয়েব ফান্ডামেন্টালস | মডিউল ২: আধুনিক জাভাস্ক্রিপ্ট ES6+ | মডিউল ৩: React ফ্রন্টএন্ড আর্কিটেকচার | মডিউল ৪: Node.js ও Express এপিআই | মডিউল ৫: ডাটাবেস ডিজাইন ও ডিপ্লয়মেন্ট।',
      fee: 'বিনামূল্যে (বৃত্তিপ্রাপ্ত)',
      image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80'
    },
    {
      title_bn: 'প্রফেশনাল গ্রাফিক ডিজাইন ও আধুনিক ইউআই/ইউএক্স',
      slug: 'graphic-design-ui-ux',
      description: 'ব্র্যান্ডিং, সোশ্যাল মিডিয়া গ্রাফিক্স এবং আধুনিক ওয়েব ও মোবাইল ইন্টারফেস ডিজাইনের আন্তর্জাতিক মানসম্পন্ন প্রশিক্ষণ।',
      duration: '৪ মাস (১৬ সপ্তাহ)',
      batch_info: 'ব্যাচ-০২ (সপ্তাহে ৩ দিন)',
      instructor_id: instructorIds['nazneen-akter'],
      division_id: dhakaDivId,
      district_id: dhakaDistId,
      upazila_id: savarUpaId,
      syllabus: 'মডিউল ১: ডিজাইনের মূলনীতি ও রঙ তত্ত্ব | মডিউল ২: Adobe Illustrator ও ভেক্টর আর্ট | মডিউল ৩: Photoshop ফটো ম্যানিপুলেশন | মডিউল ৪: Figma UI/UX প্রোটোটাইপিং ও ইউজার টেস্ট।',
      fee: 'বিনামূল্যে (বৃত্তিপ্রাপ্ত)',
      image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80'
    },
    {
      title_bn: 'সাইবার সিকিউরিটি ফান্ডামেন্টালস ও এথিক্যাল হ্যাকিং',
      slug: 'cyber-security',
      description: 'নেটওয়ার্ক সুরক্ষা, সাইবার আক্রমণ প্রতিরোধ, ডিজিটাল নিরাপত্তা অডিট এবং এথিক্যাল হ্যাকিংয়ের হ্যান্ডস-অন প্র্যাকটিক্যাল ল্যাব।',
      duration: '৬ মাস (২৪ সপ্তাহ)',
      batch_info: 'ব্যাচ-০১ (শনি ও বুধবার)',
      instructor_id: instructorIds['ariful-islam'],
      division_id: ctgDivId,
      district_id: ctgDistId,
      upazila_id: hathazariUpaId,
      syllabus: 'মডিউল ১: নেটওয়ার্ক আর্কিটেকচার | মডিউল ২: লিনাক্স সিকিউরিটি ও কমান্ড লাইন | মডিউল ৩: ভলনারেবিলিটি অ্যাসেসমেন্ট | মডিউল ৪: ওয়েব অ্যাপ্লিকেশন সিকিউরিটি ও ডিফেন্স।',
      fee: 'বিনামূল্যে (বৃত্তিপ্রাপ্ত)',
      image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80'
    },
    {
      title_bn: 'ক্রস-প্ল্যাটফর্ম মোবাইল অ্যাপ ডেভেলপমেন্ট (Flutter)',
      slug: 'mobile-app-development',
      description: 'একটি কোডবেস দিয়ে একইসাথে অ্যান্ড্রয়েড এবং আইওএস অ্যাপ্লিকেশন তৈরির পূর্ণাঙ্গ প্রশিক্ষণ। স্টেট ম্যানেজমেন্ট ও ক্লাউড ইন্টিগ্রেশন।',
      duration: '৫ মাস (২০ সপ্তাহ)',
      batch_info: 'ব্যাচ-০১ (রবি ও মঙ্গলবার)',
      instructor_id: instructorIds['mostafa-kamal'],
      division_id: dhakaDivId,
      district_id: dhakaDistId,
      upazila_id: mirpurUpaId,
      syllabus: 'মডিউল ১: Dart প্রোগ্রামিং ল্যাঙ্গুয়েজ | মডিউল ২: Flutter উইজেট ও লেআউট | মডিউল ৩: REST API ইন্টিগ্রেশন | মডিউল ৪: স্টেট ম্যানেজমেন্ট (Provider/Bloc) | মডিউল ৫: প্লে স্টোরে পাবলিশ।',
      fee: 'বিনামূল্যে (বৃত্তিপ্রাপ্ত)',
      image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80'
    },
    {
      title_bn: 'ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট ও ফ্রিল্যান্সিং ক্যারিয়ার',
      slug: 'fullstack-freelancing-kushtia',
      description: 'কুষ্টিয়া ও দক্ষিণ-পশ্চিমাঞ্চলের তরুণদের জন্য বিশেষায়িত পূর্ণাঙ্গ ওয়েব ডেভেলপমেন্ট ও আন্তর্জাতিক ফ্রিল্যান্সিং প্রশিক্ষণ।',
      duration: '৬ মাস (২৪ সপ্তাহ)',
      batch_info: 'ব্যাচ-০১ (সোম ও বৃহস্পতিবার)',
      instructor_id: instructorIds['hasan-imam'],
      division_id: khulnaDivId,
      district_id: kushtiaDistId,
      upazila_id: kushtiaSadarUpaId,
      syllabus: 'মডিউল ১: এইচটিএমএল, সিএসএস ও আধুনিক জাভাস্ক্রিপ্ট | মডিউল ২: রিয়্যাক্ট ফ্রন্টএন্ড | মডিউল ৩: ব্যাকএন্ড এপিআই ও ডেটাবেস | মডিউল ৪: আন্তর্জাতিক মার্কেটপ্লেস ও ক্যারিয়ার গাইডলাইন।',
      fee: 'বিনামূল্যে (বৃত্তিপ্রাপ্ত)',
      image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop&q=80'
    },
    {
      title_bn: 'ব্যবহারিক পাইথন ও ডেটা অ্যানালিটিক্স ফান্ডামেন্টালস',
      slug: 'python-data-analytics-bogura',
      description: 'বগুড়া ও উত্তরবঙ্গের তরুণদের জন্য ডেটা বিশ্লেষণ, ব্যবসায়িক ইনসাইট ও স্বয়ংক্রিয় ডেটা প্রসেসিং প্রশিক্ষণ।',
      duration: '৫ মাস (২০ সপ্তাহ)',
      batch_info: 'ব্যাচ-০১ (শনি ও সোমবার)',
      instructor_id: instructorIds['nazmul-haque'],
      division_id: rajshahiDivId,
      district_id: boguraDistId,
      upazila_id: boguraSadarUpaId,
      syllabus: 'মডিউল ১: পাইথন প্রোগ্রামিং কোর | মডিউল ২: পান্ডাস ও নামপাই ডেটা র‍্যাংলিং | মডিউল ৩: ডেটা ভিজ্যুয়ালাইজেশন | মডিউল ৪: প্রাথমিক মেশিন লার্নিং ও প্রজেক্ট।',
      fee: 'বিনামূল্যে (বৃত্তিপ্রাপ্ত)',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80'
    },
    {
      title_bn: 'সাইবার ডিফেন্স ও ক্লাউড সিস্টেম সিকিউরিটি',
      slug: 'cloud-security-sylhet',
      description: 'সিলেট অঞ্চলের শিক্ষার্থীদের সাইবার ক্রাইম প্রতিরোধ, ক্লাউড আর্কিটেকচার সুরক্ষা ও সিকিউর কোডিং প্রশিক্ষণ।',
      duration: '৬ মাস (২৪ সপ্তাহ)',
      batch_info: 'ব্যাচ-০১ (রবি ও বুধবার)',
      instructor_id: instructorIds['syed-mahmud'],
      division_id: sylhetDivId,
      district_id: sylhetDistId,
      upazila_id: sylhetSadarUpaId,
      syllabus: 'মডিউল ১: নেটওয়ার্ক সিকিউরিটি বেসিকস | মডিউল ২: লিনাক্স হার্ডেনিং | মডিউল ৩: ক্লাউড সুরক্ষা নীতি | মডিউল ৪: সিকিউরিটি অপারেশনস ও ইনসিডেন্ট রেসপন্স।',
      fee: 'বিনামূল্যে (বৃত্তিপ্রাপ্ত)',
      image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80'
    },
    {
      title_bn: 'প্রফেশনাল গ্রাফিক ডিজাইন ও ডিজিটাল আর্ট',
      slug: 'graphic-digital-art-barishal',
      description: 'বরিশাল বিভাগের শিক্ষার্থীদের ক্রিয়েটিভ ব্র্যান্ডিং, লোগো ডিজাইন ও আন্তর্জাতিক ভিজ্যুয়াল কনটেন্ট নির্মাণ কোর্স।',
      duration: '৪ মাস (১৬ সপ্তাহ)',
      batch_info: 'ব্যাচ-০১ (মঙ্গল ও শনিবার)',
      instructor_id: instructorIds['tania-sultana'],
      division_id: barishalDivId,
      district_id: barishalDistId,
      upazila_id: barishalSadarUpaId,
      syllabus: 'মডিউল ১: কালার থিওরি ও টাইপোগ্রাফি | মডিউল ২: ইলাস্ট্রেটর ও ফটোশপ মাস্টারক্লাস | মডিউল ৩: ব্র্যান্ড গাইডলাইন ডিজাইন | মডিউল ৪: ফ্রিল্যান্স পোর্টফোলিও।',
      fee: 'বিনামূল্যে (বৃত্তিপ্রাপ্ত)',
      image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=80'
    },
    {
      title_bn: 'আধুনিক ফ্রন্টএন্ড ওয়েব ও অ্যাপ ডেভেলপমেন্ট',
      slug: 'frontend-app-dev-rangpur',
      description: 'রংপুর অঞ্চলের শিক্ষার্থীদের জন্য আধুনিক ফ্রন্টএন্ড ওয়েব ও রিঅ্যাক্ট নেটিভ অ্যাপ্লিকেশন ডেভেলপমেন্ট।',
      duration: '৫ মাস (২০ সপ্তাহ)',
      batch_info: 'ব্যাচ-০১ (সোম ও বুধবার)',
      instructor_id: instructorIds['shafiqul-islam-rangpur'],
      division_id: rangpurDivId,
      district_id: rangpurDistId,
      upazila_id: rangpurSadarUpaId,
      syllabus: 'মডিউল ১: আধুনিক জাভাস্ক্রিপ্ট ও রিয়্যাক্ট | মডিউল ২: স্টেট ম্যানেজমেন্ট | মডিউল ৩: মোবাইল রেসপন্সিভনেস | মডিউল ৪: এপিআই আর্কিটেকচার।',
      fee: 'বিনামূল্যে (বৃত্তিপ্রাপ্ত)',
      image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80'
    },
    {
      title_bn: 'প্রফেশনাল ডিজিটাল মার্কেটিং ও এসইও স্পেশালাইজেশন',
      slug: 'digital-marketing-seo-mymensingh',
      description: 'ময়মনসিংহ বিভাগে স্থানীয় ও বৈশ্বিক ব্যবসার অনলাইন প্রসার, এসইও এবং সার্চ ইঞ্জিন মার্কেটিং প্রশিক্ষণ।',
      duration: '৪ মাস (১৬ সপ্তাহ)',
      batch_info: 'ব্যাচ-০১ (শনি ও মঙ্গলবার)',
      instructor_id: instructorIds['imran-nazir'],
      division_id: mymensinghDivId,
      district_id: mymensinghDistId,
      upazila_id: mymensinghSadarUpaId,
      syllabus: 'মডিউল ১: অন-পেজ ও অফ-পেজ এসইও | মডিউল ২: কিওয়ার্ড রিসার্চ ও কনটেন্ট স্ট্র্যাটেজি | মডিউল ৩: গুগল অ্যাডস ও অ্যানালিটিক্স | মডিউল ৪: সোশ্যাল মিডিয়া অ্যাড ক্যাম্পেইন।',
      fee: 'বিনামূল্যে (বৃত্তিপ্রাপ্ত)',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80'
    }
  ];

  const courseInsert = db.prepare(`
    INSERT INTO courses (title_bn, slug, description, duration, batch_info, instructor_id, division_id, district_id, upazila_id, syllabus, fee, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const c of courses) {
    courseInsert.run(c.title_bn, c.slug, c.description, c.duration, c.batch_info, c.instructor_id, c.division_id, c.district_id, c.upazila_id, c.syllabus, c.fee, c.image_url);
  }

  // 10. Sample Contact Message
  db.prepare(`
    INSERT INTO contacts (name, phone, email, subject, message, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    'মোঃ আবুল কালাম',
    '+৮৮০ ১৭১১ ১২৩৪৫৬',
    'kalam.kapasia@gmail.com',
    'কাপাসিয়া উপজেলায় নতুন আইসিটি ব্যাচ চালু করার আবেদন',
    'শ্রদ্ধেয় পরিচালক মহোদয়, কাপাসিয়া উপজেলায় BAIT-এর ওয়েব ডেভেলপমেন্ট কোর্সের মাধ্যমে বহু তরুণ উপকৃত হচ্ছে। আগামী মাসে নতুন সাইবার সিকিউরিটি ব্যাচ চালু করলে আমরা আরও তরুণ অংশ নিতে পারব। ধন্যবাদ।',
    'unread'
  );

  // 11. Site Settings
  const settings = [
    { key: 'site_name', value: 'BAIT' },
    { key: 'site_tagline', value: 'বাংলাদেশের প্রতিটি মানুষের কাছে জ্ঞান, দক্ষতা ও তথ্য পৌঁছে দেওয়ার লক্ষ্যে BAIT' },
    { key: 'site_phone', value: '+৮৮০ ২-৯৮৭৬৫৪৩, +৮৮০ ১৭০০ ০০১১২২' },
    { key: 'site_email', value: 'info@bait.org.bd' },
    { key: 'site_address', value: 'BAIT টাওয়ার, প্লট-৭/এ, মিরপুর-১০, ঢাকা-১২১৬, বাংলাদেশ' },
    { key: 'office_hours', value: 'রবিবার হতে বৃহস্পতিবার: সকাল ৯:০০ টা – বিকাল ৫:০০ টা (শুক্রবার ও শনিবার বন্ধ)' },
    { key: 'about_mission', value: 'বাংলাদেশের প্রতিটি বিভাগ, জেলা ও উপজেলার প্রান্তিক পর্যায় পর্যন্ত মানসম্মত প্রযুক্তি শিক্ষা, কারিগরি দক্ষতা ও তথ্য অধিকার নিশ্চিত করা।' },
    { key: 'about_vision', value: 'একটি স্বাবলম্বী, দক্ষ এবং তথ্যপ্রযুক্তিতে অগ্রগামী ডিজিটাল বাংলাদেশ বিনির্মাণে তৃণমূল নেতৃত্ব তৈরি।' }
  ];

  const setInsert = db.prepare(`INSERT INTO site_settings (key, value) VALUES (?, ?)`);
  for (const s of settings) {
    setInsert.run(s.key, s.value);
  }

  console.log('Seeding completed successfully!');
}

seedDatabase();

module.exports = { seedDatabase };
