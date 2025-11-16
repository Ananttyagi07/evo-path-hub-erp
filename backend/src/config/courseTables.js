const { dbRun } = require('./database');

// Create additional tables for course system
const createCourseTables = async () => {
  try {
    // Domains/Courses table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS domains (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        icon TEXT,
        category TEXT,
        difficulty_level TEXT,
        created_by INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES teachers(id)
      )
    `);

    // Student enrollments
    await dbRun(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        domain_id INTEGER NOT NULL,
        enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        progress INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
        FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE CASCADE,
        UNIQUE(student_id, domain_id)
      )
    `);

    // Roadmaps table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS roadmaps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        domain_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        type TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        timeline_weeks INTEGER,
        created_by INTEGER,
        is_ai_generated BOOLEAN DEFAULT 0,
        roadmap_data TEXT,
        uploaded_by_name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE CASCADE,
        FOREIGN KEY (created_by) REFERENCES teachers(id)
      )
    `);

    // Roadmap milestones
    await dbRun(`
      CREATE TABLE IF NOT EXISTS roadmap_milestones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        roadmap_id INTEGER NOT NULL,
        week_number INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        tasks TEXT,
        completed BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (roadmap_id) REFERENCES roadmaps(id) ON DELETE CASCADE
      )
    `);

    // Resources table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS resources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        domain_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        type TEXT NOT NULL,
        file_path TEXT,
        url TEXT,
        uploaded_by INTEGER,
        uploaded_by_name TEXT,
        views INTEGER DEFAULT 0,
        downloads INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE CASCADE,
        FOREIGN KEY (uploaded_by) REFERENCES teachers(id)
      )
    `);

    // Tests table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS tests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        domain_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        type TEXT NOT NULL,
        difficulty TEXT,
        duration_minutes INTEGER,
        total_marks INTEGER,
        passing_marks INTEGER,
        created_by INTEGER,
        created_by_name TEXT,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE CASCADE,
        FOREIGN KEY (created_by) REFERENCES teachers(id)
      )
    `);

    // Test questions table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS test_questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        test_id INTEGER NOT NULL,
        question_text TEXT NOT NULL,
        question_type TEXT NOT NULL,
        options TEXT,
        correct_answer TEXT,
        marks INTEGER DEFAULT 1,
        code_template TEXT,
        test_cases TEXT,
        explanation TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
      )
    `);

    // Test submissions table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS test_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        test_id INTEGER NOT NULL,
        student_id INTEGER NOT NULL,
        answers TEXT,
        score INTEGER,
        total_marks INTEGER,
        percentage REAL,
        time_taken_minutes INTEGER,
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE,
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
      )
    `);

    // AI Roadmap requests (for OCR and generation tracking)
    await dbRun(`
      CREATE TABLE IF NOT EXISTS ai_roadmap_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        domain_id INTEGER NOT NULL,
        timetable_image_path TEXT,
        difficulty TEXT NOT NULL,
        ocr_text TEXT,
        generated_roadmap TEXT,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
        FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE CASCADE
      )
    `);

    // Student progress tracking
    await dbRun(`
      CREATE TABLE IF NOT EXISTS student_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        roadmap_id INTEGER NOT NULL,
        milestone_id INTEGER,
        completed BOOLEAN DEFAULT 0,
        completion_date DATETIME,
        notes TEXT,
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
        FOREIGN KEY (roadmap_id) REFERENCES roadmaps(id) ON DELETE CASCADE,
        FOREIGN KEY (milestone_id) REFERENCES roadmap_milestones(id) ON DELETE CASCADE,
        UNIQUE(student_id, roadmap_id, milestone_id)
      )
    `);

    console.log('✅ Course system tables created successfully');
  } catch (error) {
    console.error('Error creating course tables:', error);
    throw error;
  }
};

module.exports = { createCourseTables };
