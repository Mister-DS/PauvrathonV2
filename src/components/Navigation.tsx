import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Search, 
  Heart, 
  User, 
  UserPlus, 
  Settings, 
  Shield,
  LogOut
} from 'lucide-react';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = [
    { path: '/', label: 'Accueil', icon: Home, roles: ['viewer', 'streamer', 'admin'] },
    { path: '/decouverte', label: 'Découverte', icon: Search, roles: ['viewer', 'streamer', 'admin'] },
    { path: '/suivis', label: 'Suivis', icon: Heart, roles: ['viewer', 'streamer', 'admin'] },
    { path: '/profil', label: 'Profil', icon: User, roles: ['viewer', 'streamer', 'admin'] },
    { path: '/demande-streamer', label: 'Demande Streamer', icon: UserPlus, roles: ['viewer'] },
    { path: '/streamer', label: 'Panneau Streamer', icon: Settings, roles: ['streamer', 'admin'] },
    { path: '/admin', label: 'Admin', icon: Shield, roles: ['admin'] }
  ];

  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Pauvrathon
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="text-sm text-muted-foreground">
                Connecté en tant que
              </div>
              <div className="text-sm font-medium text-primary">
                {user.username} ({user.role})
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};