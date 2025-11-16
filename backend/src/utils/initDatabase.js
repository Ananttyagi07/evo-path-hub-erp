const { db, dbRun, dbGet, dbAll, createTables } = require('../config/database');

// Helper functions
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const classes = ['6th', '7th', '8th', '9th', '10th', '11th', '12th'];
const sections = ['A', 'B', 'C', 'D'];
const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
const departments = ['Science', 'Mathematics', 'Languages', 'Social Studies', 'Computer Science'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genders = ['Male', 'Female'];

// Specified students with special characteristics
const specialStudents = [
  { name: 'Ayush Kumar', isTopper: true },
  { name: 'Piyush Sharma', isTopper: true },
  { name: 'Ritik Singh', isTopper: false },
  { name: 'Anant Sir', isTopper: true, isTeacher: true },
  { name: 'Yash Verma', hasStammer: true }
];

// Additional names to complete 55 students
const additionalNames = [
  'Rahul Gupta', 'Priya Patel', 'Amit Shah', 'Sneha Reddy', 'Vikram Malhotra',
  'Neha Kapoor', 'Rohan Desai', 'Pooja Joshi', 'Arjun Mehta', 'Divya Iyer',
  'Karan Bhatia', 'Simran Kaur', 'Aditya Rao', 'Kavya Nair', 'Siddharth Pillai',
  'Anjali Saxena', 'Nikhil Agarwal', 'Shruti Jain', 'Varun Khanna', 'Isha Bansal',
  'Manish Kumar', 'Riya Singh', 'Harsh Chawla', 'Tanvi Goyal', 'Deepak Mishra',
  'Sakshi Yadav', 'Gaurav Tiwari', 'Nidhi Pandey', 'Vivek Dubey', 'Megha Sinha',
  'Akash Verma', 'Preeti Sharma', 'Rajesh Kumar', 'Swati Tripathi', 'Mohit Gupta',
  'Pallavi Chauhan', 'Sanjay Rana', 'Kriti Arora', 'Abhishek Jha', 'Poornima Das',
  'Naveen Kumar', 'Shweta Singh', 'Vishal Patel', 'Ananya Reddy', 'Suresh Malhotra',
  'Madhuri Kapoor', 'Ajay Desai', 'Ritu Joshi', 'Manoj Mehta', 'Sunita Iyer'
];

const initDatabase = async () => {
  console.log('🚀 Initializing database...');

  try {
    // Create tables
    await createTables();

    // Clear existing data
    await dbRun('DELETE FROM assignment_submissions');
    await dbRun('DELETE FROM assignments');
    await dbRun('DELETE FROM marks');
    await dbRun('DELETE FROM attendance');
    await dbRun('DELETE FROM students');
    await dbRun('DELETE FROM teachers');
    await dbRun('DELETE FROM admins');

    // Insert Admin
    await dbRun(`
      INSERT INTO admins (username, email, password, full_name, phone)
      VALUES (?, ?, ?, ?, ?)
    `, ['admin', 'admin@evopathhub.com', 'admin123', 'System Administrator', '+91-9876543210']);
    console.log('✅ Admin created');

    // Insert Teachers
    const teachers = [
      {
        teacher_id: 'T001',
        email: 'anant.sir@evopathhub.com',
        password: 'anant123',
        full_name: 'Anant Sir',
        phone: '+91-9876543201',
        department: 'Computer Science',
        subject: 'Programming',
        qualification: 'M.Tech Computer Science',
        date_of_joining: '2020-01-15',
        address: 'New Delhi, India'
      },
      {
        teacher_id: 'T002',
        email: 'rajesh.kumar@evopathhub.com',
        password: 'teacher123',
        full_name: 'Dr. Rajesh Kumar',
        phone: '+91-9876543202',
        department: 'Mathematics',
        subject: 'Mathematics',
        qualification: 'Ph.D Mathematics',
        date_of_joining: '2019-06-10',
        address: 'Mumbai, India'
      },
      {
        teacher_id: 'T003',
        email: 'priya.sharma@evopathhub.com',
        password: 'teacher123',
        full_name: 'Dr. Priya Sharma',
        phone: '+91-9876543203',
        department: 'Science',
        subject: 'Physics',
        qualification: 'Ph.D Physics',
        date_of_joining: '2020-03-20',
        address: 'Bangalore, India'
      },
      {
        teacher_id: 'T004',
        email: 'amit.verma@evopathhub.com',
        password: 'teacher123',
        full_name: 'Amit Verma',
        phone: '+91-9876543204',
        department: 'Languages',
        subject: 'English',
        qualification: 'M.A English',
        date_of_joining: '2021-01-05',
        address: 'Pune, India'
      },
      {
        teacher_id: 'T005',
        email: 'sneha.patel@evopathhub.com',
        password: 'teacher123',
        full_name: 'Sneha Patel',
        phone: '+91-9876543205',
        department: 'Science',
        subject: 'Chemistry',
        qualification: 'M.Sc Chemistry',
        date_of_joining: '2021-07-15',
        address: 'Ahmedabad, India'
      }
    ];

    for (const teacher of teachers) {
      await dbRun(`
        INSERT INTO teachers (teacher_id, email, password, full_name, phone, department, subject, qualification, date_of_joining, address, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [teacher.teacher_id, teacher.email, teacher.password, teacher.full_name, teacher.phone, teacher.department, teacher.subject, teacher.qualification, teacher.date_of_joining, teacher.address, 'active']);
    }
    console.log(`✅ ${teachers.length} teachers created`);

    // Generate student data
    const allStudentNames = [...specialStudents.map(s => s.name), ...additionalNames];
    const students = allStudentNames.slice(0, 55).map((name, index) => {
      const studentId = `STU${String(index + 1).padStart(4, '0')}`;
      const email = `${name.toLowerCase().replace(/\s+/g, '.')}@student.evopathhub.com`;
      const classLevel = getRandomElement(classes);
      const section = getRandomElement(sections);
      const rollNumber = `${classLevel}-${section}-${String(index + 1).padStart(3, '0')}`;

      const specialStudent = specialStudents.find(s => s.name === name);
      let gpa, totalMarks, attendancePercentage;

      if (specialStudent?.isTopper) {
        gpa = (8.5 + Math.random() * 1.5).toFixed(2);
        totalMarks = getRandomNumber(850, 1000);
        attendancePercentage = getRandomNumber(90, 100);
      } else if (specialStudent?.hasStammer) {
        gpa = (7.0 + Math.random() * 1.5).toFixed(2);
        totalMarks = getRandomNumber(700, 850);
        attendancePercentage = getRandomNumber(85, 95);
      } else {
        gpa = (5.0 + Math.random() * 3.5).toFixed(2);
        totalMarks = getRandomNumber(500, 900);
        attendancePercentage = getRandomNumber(70, 100);
      }

      return {
        student_id: studentId,
        email: email,
        password: 'student123',
        full_name: name,
        phone: `+91-98765${String(43300 + index).padStart(5, '0')}`,
        date_of_birth: `200${getRandomNumber(5, 9)}-${String(getRandomNumber(1, 12)).padStart(2, '0')}-${String(getRandomNumber(1, 28)).padStart(2, '0')}`,
        gender: getRandomElement(genders),
        blood_group: getRandomElement(bloodGroups),
        class: classLevel,
        section: section,
        roll_number: rollNumber,
        admission_date: `202${getRandomNumber(0, 3)}-04-01`,
        address: `${getRandomNumber(1, 999)} Street, ${getRandomElement(['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad'])}, India`,
        parent_name: `Mr. ${name.split(' ')[1] || 'Parent'}`,
        parent_phone: `+91-98765${String(44000 + index).padStart(5, '0')}`,
        parent_email: `parent.${name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
        status: 'active',
        attendance_percentage: attendancePercentage,
        gpa: parseFloat(gpa),
        total_marks: totalMarks,
        rank: 0
      };
    });

    // Sort by total marks to assign ranks
    students.sort((a, b) => b.total_marks - a.total_marks);
    students.forEach((student, index) => {
      student.rank = index + 1;
    });

    // Insert all students
    for (const student of students) {
      await dbRun(`
        INSERT INTO students (
          student_id, email, password, full_name, phone, date_of_birth, gender, blood_group,
          class, section, roll_number, admission_date, address, parent_name, parent_phone,
          parent_email, status, attendance_percentage, gpa, total_marks, rank
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        student.student_id, student.email, student.password, student.full_name, student.phone,
        student.date_of_birth, student.gender, student.blood_group, student.class, student.section,
        student.roll_number, student.admission_date, student.address, student.parent_name,
        student.parent_phone, student.parent_email, student.status, student.attendance_percentage,
        student.gpa, student.total_marks, student.rank
      ]);
    }

    console.log(`✅ ${students.length} students created`);

    // Insert sample attendance records
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      for (let studentId = 1; studentId <= 55; studentId++) {
        const status = Math.random() > 0.15 ? 'present' : 'absent';
        const subject = getRandomElement(subjects);

        try {
          await dbRun(`
            INSERT INTO attendance (student_id, date, status, subject, remarks)
            VALUES (?, ?, ?, ?, ?)
          `, [studentId, dateStr, status, subject, status === 'absent' ? 'Not specified' : '']);
        } catch (err) {
          // Skip duplicates
        }
      }
    }

    console.log('✅ Attendance records created');

    // Insert sample marks
    const examTypes = ['Mid-term', 'Final', 'Unit Test 1', 'Unit Test 2'];

    for (let studentId = 1; studentId <= 55; studentId++) {
      for (const subject of subjects.slice(0, 5)) {
        for (const examType of examTypes) {
          const totalMarks = 100;
          const marksObtained = getRandomNumber(40, 100);
          let grade = 'F';
          if (marksObtained >= 90) grade = 'A+';
          else if (marksObtained >= 80) grade = 'A';
          else if (marksObtained >= 70) grade = 'B';
          else if (marksObtained >= 60) grade = 'C';
          else if (marksObtained >= 50) grade = 'D';

          await dbRun(`
            INSERT INTO marks (student_id, subject, exam_type, marks_obtained, total_marks, grade, exam_date)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `, [studentId, subject, examType, marksObtained, totalMarks, grade, `2024-${String(getRandomNumber(1, 12)).padStart(2, '0')}-15`]);
        }
      }
    }

    console.log('✅ Marks records created');

    // Insert sample assignments
    const assignments = [
      { title: 'Algebra Problem Set', description: 'Solve quadratic equations', subject: 'Mathematics', class: '10th', total_marks: 50 },
      { title: 'Physics Lab Report', description: 'Newton\'s Laws experiment', subject: 'Physics', class: '11th', total_marks: 100 },
      { title: 'Essay Writing', description: 'Write about climate change', subject: 'English', class: '9th', total_marks: 50 },
      { title: 'Programming Assignment', description: 'Create a calculator in Python', subject: 'Computer Science', class: '12th', total_marks: 100 },
      { title: 'Chemistry Project', description: 'Chemical reactions analysis', subject: 'Chemistry', class: '11th', total_marks: 75 }
    ];

    for (const assignment of assignments) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + getRandomNumber(7, 30));

      await dbRun(`
        INSERT INTO assignments (title, description, subject, class, due_date, total_marks, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [assignment.title, assignment.description, assignment.subject, assignment.class, dueDate.toISOString().split('T')[0], assignment.total_marks, 1]);
    }

    console.log('✅ Assignments created');

    console.log('\n🎉 Database initialized successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - 1 Admin account`);
    console.log(`   - ${teachers.length} Teachers`);
    console.log(`   - ${students.length} Students (including Ayush, Piyush, Ritik, Anant Sir, Yash)`);
    console.log(`   - Attendance records for last 30 days`);
    console.log(`   - Sample marks and assignments`);
    console.log('\n🔐 Login Credentials:');
    console.log('   Admin: admin@evopathhub.com / admin123');
    console.log('   Teacher: anant.sir@evopathhub.com / anant123');
    console.log('   Student: ayush.kumar@student.evopathhub.com / student123');

  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  initDatabase()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { initDatabase };
