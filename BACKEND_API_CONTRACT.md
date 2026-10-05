# BAIT — Frontend-Backend API Contract & Integration Guide

> **Note for Backend Developer**: The BAIT frontend is built with React + Vite. All frontend API communications route through `/api/*` or the configurable environment variable `VITE_API_BASE_URL`.

---

## 1. Quick Connection Setup

### Frontend Environment Variable
In the `client/` directory, set the backend URL in `.env`:
```env
# Local backend server running on port 5000:
VITE_API_BASE_URL=http://localhost:5000

# Or when deployed to production:
# VITE_API_BASE_URL=https://api.yourdomain.com
```
*(If left empty, Vite automatically proxies `/api` to `http://localhost:5000` during local development).*

### Required Backend CORS Headers
The backend **must** enable CORS to allow requests from the frontend client origin (`http://localhost:3000` or production domain):
```http
Access-Control-Allow-Origin: * (or http://localhost:3000)
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## 2. Authentication & Authorization Standard

1. **Token Standard**: JSON Web Token (JWT).
2. **Authorization Header**: All protected requests will send:
   ```http
   Authorization: Bearer <jwt_token>
   ```
3. **Frontend LocalStorage Keys**:
   - `bait_admin_token`: Raw JWT token string.
   - `bait_admin_user`: JSON string representing the logged-in user profile.

---

## 3. Full List of Required Endpoints

### 3.1. Courses

#### `GET /api/courses`
- **Description**: Returns all available courses.
- **Response `200 OK`**:
  ```json
  [
    {
      "id": 1,
      "title_bn": "ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট (MERN)",
      "slug": "full-stack-web-development-mern",
      "duration": "৬ মাস",
      "level": "বিগিনার হতে অ্যাডভান্সড",
      "description": "কোর্স বিবরণ...",
      "batch_info": "নতুন ব্যাচ শুরু: ১৫ই নভেম্বর",
      "price": 12000,
      "discount_price": 6500,
      "lessons_count": 72,
      "projects_count": 10
    }
  ]
  ```

#### `GET /api/courses/:slug`
- **Description**: Returns details for a specific course by slug.
- **Response `200 OK`**:
  ```json
  {
    "course": {
      "id": 1,
      "title_bn": "ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট (MERN)",
      "slug": "full-stack-web-development-mern",
      "duration": "৬ মাস",
      "level": "বিগিনার হতে অ্যাডভান্সড",
      "description": "বিস্তারিত বিবরণ...",
      "batch_info": "নতুন ব্যাচ শুরু: ১৫ই নভেম্বর",
      "price": 12000,
      "discount_price": 6500,
      "lessons_count": 72,
      "projects_count": 10,
      "division_name": "ঢাকা",
      "district_name": "ঢাকা",
      "upazila_name": "পল্টন",
      "curriculum": [
        { "title": "মডিউল ১: জাভাস্ক্রিপ্ট ফান্ডামেন্টালস" }
      ]
    },
    "instructor": {
      "id": 1,
      "name_bn": "প্রশিক্ষকের নাম",
      "slug": "trainer-slug",
      "photo_url": "https://..."
    },
    "reviews": []
  }
  ```

---

### 3.2. People & Directories

#### `GET /api/people?category=<category>`
- **Query Parameter**:
  - `category`: `'employee'` | `'instructor'` | `'student'` | `'journalist'`
- **Response `200 OK`**:
  ```json
  [
    {
      "id": 1,
      "name_bn": "শারমিন সুলতানা",
      "slug": "sharmin-sultana",
      "category": "employee",
      "designation": "সিনিয়র জনসংযোগ ও মিডিয়া কর্মকর্তা",
      "department": "জনসংযোগ ও যোগাযোগ শাখা",
      "photo_url": "https://...",
      "bio": "কর্মকর্তার পরিচিতি..."
    }
  ]
  ```

#### `GET /api/people/:category/:slug`
- **Description**: Returns single person profile details by category and slug.
- **Response `200 OK`**:
  ```json
  {
    "person": {
      "id": 1,
      "name_bn": "ব্যক্তির নাম",
      "slug": "person-slug",
      "category": "instructor",
      "designation": "সিনিয়র ইন্সট্রাক্টর",
      "photo_url": "https://...",
      "bio": "বিস্তারিত জীবনবৃত্তান্ত...",
      "phone": "017XXXXXXXX",
      "email": "trainer@gmail.com",
      "division_name": "ঢাকা",
      "district_name": "ঢাকা",
      "upazila_name": "পল্টন"
    },
    "courses": []
  }
  ```

---

### 3.3. Student Authentication & Profile

#### `POST /api/auth/register`
- **Description**: Student Registration / Enrollment.
- **Request Body**:
  ```json
  {
    "name_bn": "তানভীর হোসেন",
    "email": "student@example.com",
    "phone": "01711000000",
    "password": "secure_password",
    "course_id": 1,
    "division_id": 1,
    "district_id": 1,
    "upazila_id": 1,
    "gender": "male"
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "message": "নিবন্ধন সফল হয়েছে।",
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "id": 1,
      "name_bn": "তানভীর হোসেন",
      "email": "student@example.com",
      "phone": "01711000000",
      "category": "student"
    }
  }
  ```

#### `POST /api/auth/login`
- **Description**: Student Login.
- **Request Body**:
  ```json
  {
    "username": "student@example.com", // or phone number
    "password": "secure_password"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "message": "লগইন সফল হয়েছে।",
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "id": 1,
      "name_bn": "তানভীর হোসেন",
      "email": "student@example.com",
      "phone": "01711000000",
      "category": "student"
    }
  }
  ```
- **Response `401 Unauthorized`**:
  ```json
  { "error": "ভুল ইমেইল বা পাসওয়ার্ড প্রদান করা হয়েছে।" }
  ```

#### `GET /api/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response `200 OK`**:
  ```json
  {
    "user": {
      "id": 1,
      "name_bn": "তানভীর হোসেন",
      "email": "student@example.com",
      "phone": "01711000000",
      "category": "student",
      "course_name": "ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট"
    },
    "courses": []
  }
  ```

---

### 3.4. Contact Message Submission

#### `POST /api/contact`
- **Description**: Submits contact message from `/jogajog` page.
- **Request Body**:
  ```json
  {
    "name": "আব্দুল করিম",
    "email": "karim@gmail.com",
    "phone": "01711223344",
    "subject": "কোর্স সংক্রান্ত তথ্য",
    "message": "আমি আসন্ন ফুল-স্ট্যাক কোর্সে ভর্তি হতে আগ্রহী..."
  }
  ```
- **Response `200 OK`**:
  ```json
  { "success": true, "message": "আপনার বার্তা সফলভাবে গৃহীত হয়েছে।" }
  ```

---

### 3.5. Global Search

#### `GET /api/search?q=<query>`
- **Description**: Searches courses and people across the platform.
- **Query Parameter**: `q=পাইথন`
- **Response `200 OK`**:
  ```json
  {
    "courses": [
      {
        "id": 3,
        "title_bn": "পাইথন, ডেটা অ্যানালিটিক্স",
        "slug": "python-data-analytics-machine-learning",
        "duration": "৬ মাস"
      }
    ],
    "people": [
      {
        "id": 2,
        "name_bn": "ইঞ্জিনিয়ার তানভীর আহমেদ",
        "slug": "engr-tanvir-ahmed",
        "category": "employee",
        "designation": "প্রধান প্রযুক্তি কর্মকর্তা (CTO)"
      }
    ]
  }
  ```

---

### 3.6. Registration Dropdown Data (Geographic)

#### `GET /api/dropdown-data`
- **Description**: Provides divisions, districts, upazilas for the student registration dropdown menus.
- **Response `200 OK`**:
  ```json
  {
    "divisions": [
      { "id": 1, "name_bn": "ঢাকা", "name_en": "Dhaka", "slug": "dhaka" }
    ],
    "districts": [
      { "id": 1, "division_id": 1, "name_bn": "ঢাকা", "name_en": "Dhaka", "slug": "dhaka" }
    ],
    "upazilas": [
      { "id": 1, "district_id": 1, "name_bn": "পল্টন", "slug": "paltan" }
    ]
  }
  ```

---

## 4. Frontend Code Reference

All frontend API calls are centralized in:
📂 `client/src/services/api.js`

You can test any endpoint directly using curl, Postman, or by running the backend on port 5000.
