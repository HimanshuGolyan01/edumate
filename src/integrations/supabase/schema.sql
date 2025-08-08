-- Create database schema for EdTech platform

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  level text CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')) NOT NULL DEFAULT 'Beginner',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  role text CHECK (role IN ('student', 'professor')) NOT NULL DEFAULT 'student',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  enrolled_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, course_id)
);

-- RLS Policies
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Courses policies
CREATE POLICY "Anyone can view courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Professors can update courses" ON courses FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'professor'
  )
);

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Enrollments policies
CREATE POLICY "Users can view their own enrollments" ON enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own enrollments" ON enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert sample data
INSERT INTO courses (title, description, level) VALUES 
  ('Introduction to Programming', 'Learn the fundamentals of programming with hands-on examples and projects.', 'Beginner'),
  ('Advanced Web Development', 'Master modern web development techniques with React, Node.js, and databases.', 'Advanced'),
  ('Data Science Fundamentals', 'Explore data analysis, visualization, and machine learning concepts.', 'Intermediate'),
  ('Mobile App Development', 'Build mobile applications for iOS and Android using React Native.', 'Intermediate'),
  ('Digital Marketing Strategy', 'Learn effective digital marketing techniques and campaign management.', 'Beginner'),
  ('Machine Learning with Python', 'Deep dive into machine learning algorithms and implementation.', 'Advanced');