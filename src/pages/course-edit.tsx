import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { useCourses } from '@/hooks/use-courses';
import { useAuthStore } from '@/stores/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Lock } from 'lucide-react';

export default function CourseEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { getCourseById, updateCourse } = useCourses();
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced'
  });

  const course = getCourseById(id || '');

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        level: course.level
      });
    }
  }, [course]);

  // Check if user is professor
  useEffect(() => {
    if (user?.role !== 'professor') {
      toast({
        title: 'Access Denied',
        description: 'Only professors can edit courses',
        variant: 'destructive'
      });
      navigate('/');
    }
  }, [user, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;

    setIsLoading(true);
    
    const success = await updateCourse(id, formData);
    
    if (success) {
      toast({
        title: 'Course Updated',
        description: 'Your changes have been saved successfully',
      });
      navigate(`/course/${id}`);
    } else {
      toast({
        title: 'Update Failed',
        description: 'Please try again later',
        variant: 'destructive'
      });
    }
    
    setIsLoading(false);
  };

  if (user?.role !== 'professor') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="border-destructive/20 bg-destructive/10 max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <Lock className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-destructive mb-2">Access Restricted</h2>
              <p className="text-destructive/80 mb-4">
                Only professors can access the course editor.
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

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="border-destructive/20 bg-destructive/10 max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-destructive mb-2">Course Not Found</h2>
              <p className="text-destructive/80 mb-4">
                The course you're trying to edit doesn't exist.
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
          <div className="mb-8">
            <Button
              onClick={() => navigate(`/course/${id}`)}
              variant="ghost"
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Edit Course
              </CardTitle>
              <CardDescription>
                Update course information and content details
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Course Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter course title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Course Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what students will learn"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level" className="text-sm font-medium">
                    Difficulty Level
                  </Label>
                  <Select 
                    value={formData.level} 
                    onValueChange={(value: 'Beginner' | 'Intermediate' | 'Advanced') => 
                      setFormData(prev => ({ ...prev, level: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    variant="professor"
                    size="lg"
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      'Saving...'
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => navigate(`/course/${id}`)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}