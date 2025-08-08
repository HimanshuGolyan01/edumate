import { useState, useEffect } from 'react';
import { Course } from '@/types/course';

// Mock data for demonstration
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Programming',
    description: 'Learn the fundamentals of programming with hands-on examples and projects. Perfect for beginners who want to start their coding journey.',
    level: 'Beginner'
  },
  {
    id: '2', 
    title: 'Advanced Web Development',
    description: 'Master modern web development techniques with React, Node.js, and databases. Build full-stack applications from scratch.',
    level: 'Advanced'
  },
  {
    id: '3',
    title: 'Data Science Fundamentals', 
    description: 'Explore data analysis, visualization, and machine learning concepts. Learn to extract insights from complex datasets.',
    level: 'Intermediate'
  },
  {
    id: '4',
    title: 'Mobile App Development',
    description: 'Build mobile applications for iOS and Android using React Native. Create cross-platform apps with native performance.',
    level: 'Intermediate'
  },
  {
    id: '5',
    title: 'Digital Marketing Strategy',
    description: 'Learn effective digital marketing techniques and campaign management. Master social media, SEO, and content marketing.',
    level: 'Beginner'
  },
  {
    id: '6',
    title: 'Machine Learning with Python',
    description: 'Deep dive into machine learning algorithms and implementation. Build predictive models and AI applications.',
    level: 'Advanced'
  }
];

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setCourses(mockCourses);
      } catch (err) {
        setError('Failed to fetch courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getCourseById = (id: string): Course | undefined => {
    return courses.find(course => course.id === id);
  };

  const updateCourse = async (id: string, updates: Partial<Course>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCourses(prev => 
        prev.map(course => 
          course.id === id ? { ...course, ...updates } : course
        )
      );
      return true;
    } catch (err) {
      setError('Failed to update course');
      return false;
    }
  };

  return {
    courses,
    isLoading,
    error,
    getCourseById,
    updateCourse
  };
};