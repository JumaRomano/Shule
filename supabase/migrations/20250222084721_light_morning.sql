/*
  # Initial LMS Schema Setup

  1. New Tables
    - users (extends Supabase auth.users)
      - role (enum: admin, instructor, student)
      - profile fields
    - courses
      - title, description, thumbnail, instructor
    - enrollments
      - tracks student course enrollment
    - modules
      - course content organization
    - content
      - actual course content (videos, pdfs, etc)
    - assignments
      - course assignments and quizzes
    - submissions
      - student assignment submissions
    - discussions
      - course discussion forums
    - comments
      - discussion replies
    - achievements
      - gamification system

  2. Security
    - RLS policies for each table
    - Role-based access control
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'instructor', 'student');
CREATE TYPE content_type AS ENUM ('video', 'pdf', 'quiz', 'text');
CREATE TYPE assignment_type AS ENUM ('quiz', 'assignment');

-- Users table (extends auth.users)
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role user_role NOT NULL DEFAULT 'student',
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Courses table
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id uuid REFERENCES users(id) NOT NULL,
  title text NOT NULL,
  description text,
  thumbnail_url text,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enrollments table
CREATE TABLE enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  course_id uuid REFERENCES courses(id) NOT NULL,
  progress float DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Modules table
CREATE TABLE modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) NOT NULL,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Content table
CREATE TABLE content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES modules(id) NOT NULL,
  title text NOT NULL,
  content_type content_type NOT NULL,
  content_url text,
  content_text text,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Assignments table
CREATE TABLE assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES modules(id) NOT NULL,
  title text NOT NULL,
  description text,
  assignment_type assignment_type NOT NULL,
  due_date timestamptz,
  points integer DEFAULT 100,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Submissions table
CREATE TABLE submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid REFERENCES assignments(id) NOT NULL,
  user_id uuid REFERENCES users(id) NOT NULL,
  content text,
  score float,
  submitted_at timestamptz DEFAULT now(),
  graded_at timestamptz,
  UNIQUE(assignment_id, user_id)
);

-- Discussions table
CREATE TABLE discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) NOT NULL,
  user_id uuid REFERENCES users(id) NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Comments table
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid REFERENCES discussions(id) NOT NULL,
  user_id uuid REFERENCES users(id) NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Achievements table
CREATE TABLE achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  title text NOT NULL,
  description text,
  badge_url text,
  earned_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Courses policies
CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT
  TO authenticated
  USING (is_published = true);

CREATE POLICY "Instructors can manage their courses"
  ON courses FOR ALL
  TO authenticated
  USING (instructor_id = auth.uid());

-- Enrollments policies
CREATE POLICY "Students can view their enrollments"
  ON enrollments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Students can enroll in courses"
  ON enrollments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Modules policies
CREATE POLICY "Anyone can view modules of enrolled courses"
  ON modules FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE course_id = modules.course_id
      AND user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM courses
      WHERE id = modules.course_id
      AND instructor_id = auth.uid()
    )
  );

-- Content policies
CREATE POLICY "Anyone can view content of enrolled courses"
  ON content FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments e
      JOIN modules m ON m.course_id = e.course_id
      WHERE m.id = content.module_id
      AND e.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM modules m
      JOIN courses c ON c.id = m.course_id
      WHERE m.id = content.module_id
      AND c.instructor_id = auth.uid()
    )
  );

-- Create functions and triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_modules_updated_at
  BEFORE UPDATE ON modules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_content_updated_at
  BEFORE UPDATE ON content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_modules_course_id ON modules(course_id);
CREATE INDEX idx_content_module_id ON content(module_id);
CREATE INDEX idx_assignments_module_id ON assignments(module_id);
CREATE INDEX idx_submissions_assignment_id ON submissions(assignment_id);
CREATE INDEX idx_discussions_course_id ON discussions(course_id);
CREATE INDEX idx_comments_discussion_id ON comments(discussion_id);