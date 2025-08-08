import { Course } from '@/types/course';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
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

  return (
    <Card className="group hover:shadow-card transform hover:-translate-y-1 transition-smooth bg-card/50 backdrop-blur border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 text-primary">
            <BookOpen className="h-5 w-5" />
            <Badge variant="secondary" className={getLevelColor(course.level)}>
              {course.level}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-card-foreground group-hover:text-primary transition-smooth">
          {course.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <CardDescription className="text-muted-foreground leading-relaxed">
          {course.description}
        </CardDescription>
        
        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Self-paced</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Open enrollment</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Link to={`/course/${course.id}`} className="w-full">
          <Button 
            variant="hero" 
            className="w-full"
            size="lg"
          >
            View Course
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};