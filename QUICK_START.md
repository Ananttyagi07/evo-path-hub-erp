# 🚀 Quick Start Guide

## Backend is Live! ✅

Your EvoPath Hub backend is running with a complete SQLite database.

### What You Have Now:

✅ **Backend Server:** Running on `http://localhost:5001`
✅ **SQLite Database:** `backend/database.sqlite`
✅ **55 Students** including:
   - 🏆 **Ayush Kumar** (Rank 1, GPA: 9.24, ID: 1)
   - 🏆 **Piyush Sharma** (Rank 5, GPA: 8.54, ID: 5)
   - **Ritik Singh** (Rank 50, GPA: 8.19, ID: 50)
   - 🏆 **Anant Sir** (Also a teacher)
   - **Yash Verma** (Rank 22, GPA: 7.95, ID: 22) - with stammer
   - 50 more students with complete details

✅ **5 Teachers** including Anant Sir
✅ **1 Admin** account
✅ **30 days** of attendance data
✅ **Complete marks** for all students
✅ **RESTful API** with full CRUD operations

## Test It Right Now!

### 1. Open in Browser
Visit: http://localhost:5001/api/students/leaderboard?limit=5

You should see the top 5 students including Ayush!

### 2. Quick API Tests

```bash
# Get Ayush (Rank 1)
curl http://localhost:5001/api/students/1

# Get Yash (the student with stammer)
curl http://localhost:5001/api/students/22

# Search for any student
curl http://localhost:5001/api/students/search?q=Piyush

# Get all teachers
curl http://localhost:5001/api/teachers
```

## Integrate with Frontend

### Step 1: Install Axios (if not already)
```bash
npm install axios
```

### Step 2: Use the API Service
The API service is already created at `src/services/api.ts`

```typescript
import { studentsAPI } from '../services/api';

// In your component:
const fetchStudents = async () => {
  const response = await studentsAPI.getLeaderboard(10);
  console.log('Top students:', response.data.data);
};
```

## Key API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/students` | Get all 55 students |
| `GET /api/students/leaderboard?limit=10` | Top students |
| `GET /api/students/:id` | Get specific student |
| `PUT /api/students/:id` | Update student (auto-saves!) |
| `GET /api/teachers` | Get all teachers |
| `POST /api/attendance` | Mark attendance |
| `POST /api/marks` | Add marks (auto-updates GPA!) |

## Student IDs (Quick Reference)

- **Ayush Kumar:** ID = 1
- **Piyush Sharma:** ID = 5
- **Ritik Singh:** ID = 50
- **Yash Verma:** ID = 22

## Example: Update Yash's Data

```typescript
import { studentsAPI } from '../services/api';

const updateYash = async () => {
  const response = await studentsAPI.update(22, {
    gpa: 8.5,
    total_marks: 850
  });

  // Database updated instantly!
  console.log('Updated:', response.data);
};
```

## Important Features

### Auto-Calculations
- ✅ Update marks → GPA recalculates automatically
- ✅ Add marks → Student rank updates automatically
- ✅ Mark attendance → Attendance % updates automatically

### Real-Time Updates
- ✅ All changes through API → Instant database updates
- ✅ No manual database operations needed
- ✅ Foreign keys maintained automatically

## Managing the Backend

### View Current Status
```bash
curl http://localhost:5001/api/health
```

### Restart Backend
```bash
cd backend
npm start
```

### Reset Database (Fresh Data)
```bash
cd backend
npm run init-db
```

## Login Credentials (For Auth)

**Student (Ayush):**
- Email: `ayush.kumar@student.evopathhub.com`
- Password: `student123`

**Teacher (Anant Sir):**
- Email: `anant.sir@evopathhub.com`
- Password: `anant123`

**Admin:**
- Email: `admin@evopathhub.com`
- Password: `admin123`

## Need Help?

- **Full API Documentation:** See `backend/API_USAGE_GUIDE.md`
- **Complete Setup Guide:** See `BACKEND_SETUP_COMPLETE.md`
- **Backend README:** See `backend/README.md`

## Next Steps

1. ✅ Backend is running ← **YOU ARE HERE**
2. Install axios: `npm install axios`
3. Import API service in your components
4. Fetch and display data
5. All changes automatically sync to database!

---

**Everything is ready! Start integrating the API into your frontend components now!** 🎉
