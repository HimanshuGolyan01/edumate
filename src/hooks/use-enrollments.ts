import { useState, useEffect } from 'react';
import { Enrollment } from '@/types/course';
import { useAuthStore } from '@/stores/auth-store';

export const useEnrollments = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const enrollInCourse = async (courseId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      setIsLoading(true);
      
      // Check if already enrolled
      const existingEnrollment = enrollments.find(
        e => e.course_id === courseId && e.user_id === user.id
      );
      
      if (existingEnrollment) {
        setError('Already enrolled in this course');
        return false;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newEnrollment: Enrollment = {
        id: Math.random().toString(36).substr(2, 9),
        user_id: user.id,
        course_id: courseId,
        enrolled_at: new Date().toISOString()
      };

      setEnrollments(prev => [...prev, newEnrollment]);
      return true;
    } catch (err) {
      setError('Failed to enroll in course');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const isEnrolled = (courseId: string): boolean => {
    if (!user) return false;
    return enrollments.some(
      e => e.course_id === courseId && e.user_id === user.id
    );
  };

  const getUserEnrollments = (): Enrollment[] => {
    if (!user) return [];
    return enrollments.filter(e => e.user_id === user.id);
  };

  return {
    enrollments,
    isLoading,
    error,
    enrollInCourse,
    isEnrolled,
    getUserEnrollments
  };
};