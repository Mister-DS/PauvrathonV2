import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { PlayCircle, Users, Trophy, Star, Zap, GamepadIcon, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-gaming flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary/30 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/30 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-accent/30 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>

        <Card className="w-full max-w-lg bg-gradient-card border-primary shadow-gaming relative z-10 animate-scale-in">
          <CardHeader className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <GamepadIcon className="h-16 w-16 text-primary animate-pulse" />
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur animate-pulse" />
              </div>
            </div>
            <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
              Pauvrathon
            </div>
            <CardTitle className="text-xl text-foreground">
              🎮 Plateforme de Subathon Interactive
            </CardTitle>
            <p className="text-muted-foreground leading-relaxed">
              Rejoignez la révolution du streaming ! Participez aux mini-jeux, 
              prolongez les subathons et soutenez vos créateurs préférés ! ⚡
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Quick stats preview */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-xs text-muted-foreground">Streamers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">1.2K</div>
                <div className="text-xs text-muted-foreground">Joueurs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">15K</div>
                <div className="text-xs text-muted-foreground">Heures</div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground text-center font-medium">
                🚀 Choisissez votre mode de connexion :
              </p>
              <div className="grid gap-3">
                <Button 
                  onClick={() => login('viewer')}
                  className="w-full group relative overflow-hidden"
                  variant="default"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Viewer - Explorer & Jouer
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={() => login('streamer')}
                  className="w-full group relative overflow-hidden"
                  variant="secondary"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Streamer - Créer & Configurer
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={() => login('admin')}
                  className="w-full group relative overflow-hidden"
                  variant="outline"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Admin - Gérer la Plateforme
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-muted-foreground">
                ✨ Mode démo - Données mockées pour la présentation
              </p>
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
        <div className="text-center py-16 space-y-8 relative">
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" />
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <h1 className="text-6xl font-bold bg-gradient-gaming bg-clip-text text-transparent animate-fade-in">
                  Pauvrathon
                </h1>
                <div className="absolute -inset-4 bg-primary/10 rounded-lg blur-xl animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-2xl text-foreground font-semibold">
                🎮 L'avenir du streaming interactif est arrivé !
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Transformez chaque subathon en aventure collective. Relevez des défis,
                gagnez du temps pour vos créateurs favoris et vivez une expérience 
                gaming unique en temps réel ! ⚡
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/20 rounded-full">
                  <Zap className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">Temps réel</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/20 rounded-full">
                  <GamepadIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Mini-jeux</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/20 rounded-full">
                  <TrendingUp className="h-4 w-4 text-secondary" />
                  <span className="text-sm text-muted-foreground">Progression</span>
                </div>
              </div>
            </div>
          </div>
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
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            🚀 Commencez votre aventure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 group cursor-pointer" onClick={() => navigate('/decouverte')}>
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/30 transition-colors">
                  <PlayCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Explorer</h3>
                <p className="text-sm text-muted-foreground">Découvrez les streamers en subathon</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:scale-105 group cursor-pointer" onClick={() => navigate('/suivis')}>
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-secondary/30 transition-colors">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Suivre</h3>
                <p className="text-sm text-muted-foreground">Gérez vos streamers favoris</p>
              </CardContent>
            </Card>

            {user.role === 'viewer' ? (
              <Card className="bg-gradient-card border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105 group cursor-pointer" onClick={() => navigate('/demande-streamer')}>
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-accent/30 transition-colors">
                    <Star className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Devenir Streamer</h3>
                  <p className="text-sm text-muted-foreground">Rejoignez la plateforme</p>
                </CardContent>
              </Card>
            ) : user.role === 'streamer' ? (
              <Card className="bg-gradient-card border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105 group cursor-pointer" onClick={() => navigate('/streamer')}>
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-accent/30 transition-colors">
                    <Trophy className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Mon Panel</h3>
                  <p className="text-sm text-muted-foreground">Configurez votre subathon</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-card border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105 group cursor-pointer" onClick={() => navigate('/admin')}>
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-accent/30 transition-colors">
                    <Trophy className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Administration</h3>
                  <p className="text-sm text-muted-foreground">Gérez la plateforme</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
