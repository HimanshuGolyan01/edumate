import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { useCourses } from '@/hooks/use-courses';
import { useEnrollments } from '@/hooks/use-enrollments';
import { useAuthStore } from '@/stores/auth-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  Edit3,
  ArrowLeft,
  Play
} from 'lucide-react';

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuthStore();
  const { courses, isLoading: coursesLoading, getCourseById } = useCourses();
  const { enrollInCourse, isEnrolled, isLoading: enrollLoading } = useEnrollments();
  
  const [isEnrolling, setIsEnrolling] = useState(false);
  
  const course = getCourseById(id || '');
  const enrolled = isEnrolled(id || '');

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!id) return;

    setIsEnrolling(true);
    const success = await enrollInCourse(id);
    
    if (success) {
      toast({
        title: 'Successfully Enrolled!',
        description: `You are now enrolled in ${course?.title}`,
      });
      navigate(`/enrolled/${id}`);
    } else {
      toast({
        title: 'Enrollment Failed',
        description: 'Please try again later',
        variant: 'destructive'
      });
    }
    setIsEnrolling(false);
  };

  const handleEdit = () => {
    navigate(`/course/edit/${id}`);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-secondary/20 text-secondary hover:bg-secondary/30';
      case 'Intermediate':
        return 'bg-primary/20 text-primary hover:bg-primary/30';
      case 'Advanced':
        return 'bg-accent/20 text-accent hover:bg-accent/30';
      default:
        return 'bg-muted/20 text-muted-foreground hover:bg-muted/30';
    }
  };

  if (coursesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div>
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="border-destructive/20 bg-destructive/10">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-destructive mb-2">Course Not Found</h2>
              <p className="text-destructive/80 mb-4">
                The course you're looking for doesn't exist or may have been removed.
              </p>
              <Button onClick={() => navigate('/')} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                    <CardTitle className="text-3xl font-bold text-card-foreground">
                      {course.title}
                    </CardTitle>
                  </div>
                  {user?.role === 'professor' && (
                    <Button
                      onClick={handleEdit}
                      variant="professor"
                      size="sm"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Course
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <CardDescription className="text-base leading-relaxed">
                  {course.description}
                </CardDescription>

                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Self-paced learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Open enrollment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content Preview */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  Course Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    'Introduction and Setup',
                    'Core Concepts',
                    'Hands-on Practice',
                    'Advanced Techniques',
                    'Real-world Projects',
                    'Final Assessment'
                  ].map((topic, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="text-card-foreground">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-card sticky top-8">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                      Ready to Start Learning?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Join thousands of students mastering new skills
                    </p>
                  </div>

                  {enrolled ? (
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-2 text-secondary">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Already Enrolled</span>
                      </div>
                      <Button variant="enroll" size="lg" className="w-full">
                        Continue Learning
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={handleEnroll}
                      variant="enroll"
                      size="lg"
                      className="w-full"
                      disabled={isEnrolling || enrollLoading}
                    >
                      {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
                    </Button>
                  )}

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Level:</span>
                      <span className="font-medium text-card-foreground">{course.level}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium text-card-foreground">Self-paced</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Access:</span>
                      <span className="font-medium text-card-foreground">Lifetime</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Certificate:</span>
                      <span className="font-medium text-card-foreground">Included</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}