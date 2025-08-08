import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { CourseCard } from '@/components/course/course-card';
import { useCourses } from '@/hooks/use-courses';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, BookOpen, Star, Users } from 'lucide-react';

export default function Home() {
  const { courses, isLoading, error } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="border-destructive/20 bg-destructive/10">
            <CardContent className="p-6 text-center">
              <p className="text-destructive">Error loading courses: {error}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Unlock Your Learning Potential
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover world-class courses taught by industry experts. 
            Learn at your own pace and advance your career.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <BookOpen className="h-8 w-8 text-primary mx-auto" />
              <h3 className="text-2xl font-bold text-card-foreground">50+ Courses</h3>
              <p className="text-muted-foreground">Expert-designed curriculum</p>
            </div>
            <div className="space-y-2">
              <Users className="h-8 w-8 text-secondary mx-auto" />
              <h3 className="text-2xl font-bold text-card-foreground">10k+ Students</h3>
              <p className="text-muted-foreground">Learning worldwide</p>
            </div>
            <div className="space-y-2">
              <Star className="h-8 w-8 text-accent mx-auto" />
              <h3 className="text-2xl font-bold text-card-foreground">4.8/5 Rating</h3>
              <p className="text-muted-foreground">Student satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Featured Courses
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our extensive catalog of courses designed to help you 
              master new skills and advance your career.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-4 w-20 mb-3" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

          {!isLoading && filteredCourses.length === 0 && (
            <Card className="p-8 text-center">
              <CardContent>
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-card-foreground mb-2">
                  No courses found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}