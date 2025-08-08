import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { useCourses } from '@/hooks/use-courses';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowLeft, Play, BookOpen } from 'lucide-react';

export default function Enrolled() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCourseById } = useCourses();
  
  const course = getCourseById(id || '');

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="border-destructive/20 bg-destructive/10 max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-destructive mb-2">Course Not Found</h2>
              <p className="text-destructive/80 mb-4">
                The course you're looking for doesn't exist.
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
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-glow bg-gradient-to-br from-card via-card to-primary/5">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-10 w-10 text-secondary" />
                  </div>
                  
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      Enrollment Successful!
                    </h1>
                    <p className="text-muted-foreground">
                      Welcome to your new learning journey
                    </p>
                  </div>
                </div>

                <Card className="bg-muted/30 border-0">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-left">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                </Card>

                <div className="space-y-3">
                  <Button 
                    variant="enroll" 
                    size="lg" 
                    className="w-full"
                    onClick={() => {
                      // In a real app, this would navigate to the course content
                      console.log('Starting course:', course.id);
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Learning Now
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/')}
                    className="w-full"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Browse More Courses
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>🎉 You now have lifetime access to this course</p>
                  <p>📚 All course materials are available immediately</p>
                  <p>🏆 Complete the course to earn your certificate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}