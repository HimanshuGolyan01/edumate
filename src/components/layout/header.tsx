import { useAuthStore } from '@/stores/auth-store';
import { Button } from '@/components/ui/button';
import { BookOpen, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header className="bg-card shadow-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <BookOpen className="h-8 w-8" />
            EduPlatform
          </Link>
          
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {user.role}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};