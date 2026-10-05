# BAIT — বাংলাদেশ অ্যাডভান্সড ইনস্টিটিউট অব টেকনোলজি

বাংলাদেশের প্রতিটি মানুষের কাছে জ্ঞান, দক্ষতা ও তথ্য পৌঁছে দেওয়ার লক্ষ্যে BAIT। বিভাগ, জেলা ও উপজেলা পর্যায়ের সমন্বিত শিক্ষা ও তথ্য নেটওয়ার্ক।

---

## 🚀 প্রযুক্তি সমূহ (Tech Stack)

- **Frontend:** React 19, Vite, React Router, Lucide Icons, Custom CSS
- **Backend:** Node.js, Express, SQLite (`node:sqlite`), JWT, Bcrypt
- **Process Manager:** Concurrently

---

## 🛠️ সেটআপ এবং রান নির্দেশিকা (Getting Started)

### ১. ডিপেন্ডেন্সি ইনস্টল করুন

```bash
# রুট ডিপেন্ডেন্সি ইনস্টল
npm install

# ক্লায়েন্ট ডিপেন্ডেন্সি ইনস্টল
cd client
npm install
cd ..
```

### ২. ডাটাবেজ সীড করুন (Database Seed)

```bash
npm run seed
```

### ৩. ডেভেলপমেন্ট সার্ভার চালু করুন (Run Live Dev Server)

```bash
npm run dev
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## 📂 প্রোজেক্ট স্ট্রাকচার

```
BAIT/
├── client/              # React + Vite ফ্রন্টএন্ড
│   ├── src/
│   │   ├── components/  # শেয়ার্ড কম্পোনেন্টস
│   │   ├── pages/       # পেজসমূহ ও ড্যাশবোর্ড
│   │   └── App.jsx
│   └── package.json
├── server/              # Express ব্যাকএন্ড ও API
│   ├── db.js            # SQLite ডাটাবেজ কানেকশন
│   ├── seed.js          # ডামি ও প্রাথমিক ডাটা সিডার
│   └── index.js         # API রাউটস ও কন্ট্রোলার
├── package.json
└── README.md
```
