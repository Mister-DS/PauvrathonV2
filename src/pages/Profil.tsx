import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { mockViewerStats, mockGameSessions } from '@/data/mockData';
import { Trophy, Clock, Target, TrendingUp, LogOut, User } from 'lucide-react';

const Profil = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const userGameSessions = mockGameSessions.slice(0, 5); // 5 dernières parties

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Mon Profil
          </h1>
          <p className="text-lg text-muted-foreground">
            Retrouvez vos statistiques et votre historique de jeu
          </p>
        </div>

        {/* User Info */}
        <Card className="bg-gradient-card border-primary/20 shadow-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{user.username}</h2>
                  <div className="flex items-center gap-3">
                    <Badge variant="default">Niveau {mockViewerStats.level}</Badge>
                    <Badge variant="secondary">{user.role}</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={logout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Se déconnecter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-primary/20">
            <CardContent className="p-6 text-center space-y-2">
              <Target className="h-8 w-8 text-primary mx-auto" />
              <div className="text-2xl font-bold text-primary">{mockViewerStats.totalGamesPlayed}</div>
              <div className="text-sm text-muted-foreground">Parties jouées</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-secondary/20">
            <CardContent className="p-6 text-center space-y-2">
              <Clock className="h-8 w-8 text-secondary mx-auto" />
              <div className="text-2xl font-bold text-secondary">{formatTime(mockViewerStats.totalTimeAdded)}</div>
              <div className="text-sm text-muted-foreground">Temps ajouté</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-accent/20">
            <CardContent className="p-6 text-center space-y-2">
              <TrendingUp className="h-8 w-8 text-accent mx-auto" />
              <div className="text-2xl font-bold text-accent">{mockViewerStats.streak}</div>
              <div className="text-sm text-muted-foreground">Série actuelle</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-destructive/20">
            <CardContent className="p-6 text-center space-y-2">
              <Trophy className="h-8 w-8 text-destructive mx-auto" />
              <div className="text-2xl font-bold text-destructive">{mockViewerStats.level}</div>
              <div className="text-sm text-muted-foreground">Niveau</div>
            </CardContent>
          </Card>
        </div>

        {/* Favorite Game */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Trophy className="h-5 w-5 text-accent" />
              Jeu Favori
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold text-foreground">{mockViewerStats.favoriteGame}</div>
                <div className="text-sm text-muted-foreground">
                  Vous excellez dans ce mini-jeu !
                </div>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                ⭐ Favori
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Games History */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Historique des 5 dernières parties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userGameSessions.map((session, index) => {
                const isWin = session.score > 500;
                return (
                  <div 
                    key={session.id} 
                    className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${isWin ? 'bg-secondary' : 'bg-destructive'}`} />
                      <div>
                        <div className="font-medium text-foreground">{session.gameType}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(session.completedAt)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-lg font-bold ${isWin ? 'text-secondary' : 'text-destructive'}`}>
                        {session.score} pts
                      </div>
                      <Badge variant={isWin ? "default" : "destructive"} className="text-xs">
                        {isWin ? 'Réussi' : 'Échec'}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>

            {userGameSessions.length === 0 && (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="text-lg font-medium text-foreground mb-2">
                  Aucune partie jouée
                </div>
                <div className="text-muted-foreground">
                  Participez aux subathons pour voir votre historique apparaître ici !
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress Section */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Progression du Niveau</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Niveau {mockViewerStats.level}</span>
                <span>Prochain niveau: {mockViewerStats.level + 1}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-gradient-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: '65%' }} // Mock progression
                />
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Jouez plus de parties pour gagner de l'expérience !
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Succès Récents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                <Trophy className="h-8 w-8 text-accent" />
                <div>
                  <div className="font-medium text-foreground">Première victoire</div>
                  <div className="text-xs text-muted-foreground">Gagner votre premier mini-jeu</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                <Target className="h-8 w-8 text-secondary" />
                <div>
                  <div className="font-medium text-foreground">Série de 3</div>
                  <div className="text-xs text-muted-foreground">3 victoires consécutives</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg opacity-50">
                <Clock className="h-8 w-8 text-muted-foreground" />
                <div>
                  <div className="font-medium text-muted-foreground">Speed Runner</div>
                  <div className="text-xs text-muted-foreground">À débloquer...</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profil;