# EvoPath Hub Backend API

Backend server for EvoPath Hub ERP System using Node.js, Express, and SQLite.

## Features

- SQLite database with 55 students (including Ayush, Piyush, Ritik, Anant Sir, Yash)
- RESTful API endpoints for CRUD operations
- Real-time data synchronization with frontend
- Attendance tracking and management
- Marks/grades management
- Student and teacher management
- Leaderboard functionality

## Installation

```bash
# Install dependencies
npm install

# Initialize database with sample data
npm run init-db

# Start development server
npm run dev

# Or start production server
npm start
```

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `GET /api/students/leaderboard` - Get top students
- `GET /api/students/search?q=name` - Search students
- `GET /api/students/:id/attendance` - Get student attendance
- `GET /api/students/:id/marks` - Get student marks
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get teacher by ID
- `GET /api/teachers/search?q=name` - Search teachers
- `GET /api/teachers/department/:dept` - Get teachers by department
- `POST /api/teachers` - Create new teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/date/:date` - Get attendance by date
- `GET /api/attendance/student/:id/stats` - Get attendance statistics
- `POST /api/attendance` - Mark attendance (single or bulk)

### Marks
- `GET /api/marks` - Get all marks
- `GET /api/marks/subject/:subject` - Get marks by subject
- `POST /api/marks` - Create new marks entry
- `PUT /api/marks/:id` - Update marks
- `DELETE /api/marks/:id` - Delete marks

## Database Schema

The database includes the following tables:
- `students` - Student information and performance data
- `teachers` - Teacher information
- `admins` - Admin accounts
- `attendance` - Attendance records
- `marks` - Marks/grades
- `assignments` - Assignment information
- `assignment_submissions` - Student assignment submissions

## Default Login Credentials

**Admin:**
- Email: admin@evopathhub.com
- Password: admin123

**Teacher (Anant Sir):**
- Email: anant.sir@evopathhub.com
- Password: anant123

**Student:**
- Email: ayush.kumar@student.evopathhub.com
- Password: student123

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
DATABASE_PATH=./database.sqlite
NODE_ENV=development
```

## Sample Data

The database is pre-populated with:
- 1 Admin account
- 5 Teachers (including Anant Sir)
- 55 Students (including specific students: Ayush, Piyush, Ritik, Anant Sir, Yash)
- 30 days of attendance records
- Sample marks for multiple subjects
- Sample assignments

## Usage

1. Install dependencies: `npm install`
2. Initialize database: `npm run init-db`
3. Start server: `npm run dev`
4. Access API at `http://localhost:5000`
5. Connect your frontend to use the API endpoints

## Notes

- All changes made through the API are immediately reflected in the database
- Student ranks are automatically updated when marks change
- Attendance percentages are automatically calculated
- The database supports full CRUD operations for all entities
