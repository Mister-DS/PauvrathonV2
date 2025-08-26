import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { PlayCircle, Users, Trophy } from 'lucide-react';

const Index = () => {
  const { user, login } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-gaming flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gradient-card border-primary shadow-gaming">
          <CardHeader className="text-center space-y-4">
            <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Pauvrathon
            </div>
            <CardTitle className="text-xl text-foreground">
              Bienvenue sur la plateforme de subathon interactive !
            </CardTitle>
            <p className="text-muted-foreground">
              Participez aux défis, aidez vos streamers préférés à prolonger leurs subathons !
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground text-center">
                Connexion mock pour tester l'application :
              </p>
              <div className="grid gap-2">
                <Button 
                  onClick={() => login('viewer')}
                  className="w-full"
                  variant="default"
                >
                  Se connecter en tant que Viewer
                </Button>
                <Button 
                  onClick={() => login('streamer')}
                  className="w-full"
                  variant="secondary"
                >
                  Se connecter en tant que Streamer
                </Button>
                <Button 
                  onClick={() => login('admin')}
                  className="w-full"
                  variant="outline"
                >
                  Se connecter en tant qu'Admin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center py-12 space-y-6">
          <h1 className="text-5xl font-bold bg-gradient-gaming bg-clip-text text-transparent">
            Pauvrathon
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La plateforme interactive pour prolonger les subathons de vos streamers préférés !
            Participez aux mini-jeux et aidez-les à gagner du temps de stream.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card border-primary/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center space-y-2">
              <PlayCircle className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-2xl font-bold text-primary">24</h3>
              <p className="text-muted-foreground">Streamers actifs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-secondary/20 hover:shadow-accent transition-all duration-300">
            <CardContent className="p-6 text-center space-y-2">
              <Users className="h-12 w-12 text-secondary mx-auto" />
              <h3 className="text-2xl font-bold text-secondary">1,247</h3>
              <p className="text-muted-foreground">Joueurs actifs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-accent/20 hover:shadow-gaming transition-all duration-300">
            <CardContent className="p-6 text-center space-y-2">
              <Trophy className="h-12 w-12 text-accent mx-auto" />
              <h3 className="text-2xl font-bold text-accent">15,892</h3>
              <p className="text-muted-foreground">Heures ajoutées</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Que voulez-vous faire ?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="shadow-glow hover:shadow-accent transition-all duration-300">
              Découvrir les streamers
            </Button>
            <Button size="lg" variant="secondary" className="shadow-accent hover:shadow-glow transition-all duration-300">
              Voir mes suivis
            </Button>
            {user.role === 'viewer' && (
              <Button size="lg" variant="outline">
                Devenir streamer
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
