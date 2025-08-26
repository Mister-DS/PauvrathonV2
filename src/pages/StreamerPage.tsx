import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockStreamers } from '@/data/mockData';
import { GuessNumber } from '@/components/minigames/GuessNumber';
import { Hangman } from '@/components/minigames/Hangman';
import { 
  MousePointer, 
  Clock, 
  Trophy, 
  Users, 
  Heart,
  AlertCircle,
  Target,
  Gamepad2
} from 'lucide-react';

const StreamerPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [streamer, setStreamer] = useState(mockStreamers.find(s => s.id === id));
  const [clicks, setClicks] = useState(0);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [currentMinigame, setCurrentMinigame] = useState<'guess' | 'hangman' | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false); // Mock follow status

  useEffect(() => {
    if (streamer) {
      setClicks(streamer.currentClicks);
    }
  }, [streamer]);

  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => setCooldownTime(cooldownTime - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsOnCooldown(false);
    }
  }, [cooldownTime]);

  if (!streamer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gradient-card border-destructive/20">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Streamer introuvable
            </h3>
            <p className="text-muted-foreground">
              Ce streamer n'existe pas ou n'est plus disponible.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gradient-card border-destructive/20">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Connexion requise
            </h3>
            <p className="text-muted-foreground">
              Vous devez être connecté pour participer au subathon.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleClick = () => {
    if (isOnCooldown || !streamer.isLive) return;
    
    const newClicks = clicks + 1;
    setClicks(newClicks);
    
    // Update streamer state
    setStreamer(prev => prev ? { ...prev, currentClicks: newClicks } : null);
    
    if (newClicks >= streamer.clicksNeeded) {
      // Reset clicks and launch minigame
      setClicks(0);
      setStreamer(prev => prev ? { ...prev, currentClicks: 0 } : null);
      launchRandomMinigame();
    }

    toast({
      title: "Clic enregistré !",
      description: `${streamer.clicksNeeded - newClicks} clics restants avant le mini-jeu`,
      variant: "default"
    });
  };

  const launchRandomMinigame = () => {
    const games = ['guess', 'hangman'];
    const randomGame = games[Math.floor(Math.random() * games.length)] as 'guess' | 'hangman';
    setCurrentMinigame(randomGame);
  };

  const handleMinigameComplete = (success: boolean, score: number) => {
    if (success) {
      setStreamer(prev => {
        if (!prev) return null;
        const newTimeAdded = prev.timeAdded + 15; // 15 secondes ajoutées
        return { ...prev, timeAdded: newTimeAdded };
      });
      
      toast({
        title: "🎉 Bravo !",
        description: `Vous avez gagné ! +15 secondes ajoutées au subathon (Score: ${score})`,
        variant: "default"
      });
      
      setFailedAttempts(0);
      setIsOnCooldown(true);
      setCooldownTime(streamer.cooldown);
    } else {
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);
      
      if (newFailedAttempts >= 3) {
        toast({
          title: "😢 Trop d'échecs",
          description: "3 échecs consécutifs ! Les clics ont été remis à zéro.",
          variant: "destructive"
        });
        setFailedAttempts(0);
        setIsOnCooldown(true);
        setCooldownTime(streamer.cooldown * 2); // Cooldown double après 3 échecs
      } else {
        toast({
          title: "Échec",
          description: `Essayez encore ! ${3 - newFailedAttempts} tentative(s) restante(s)`,
          variant: "destructive"
        });
      }
    }
    
    setCurrentMinigame(null);
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Suivi retiré" : "Suivi ajouté",
      description: isFollowing ? 
        `Vous ne suivez plus ${streamer.displayName}` : 
        `Vous suivez maintenant ${streamer.displayName}`,
      variant: "default"
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const progressPercentage = (clicks / streamer.clicksNeeded) * 100;

  return (
    <div className="min-h-screen bg-background">
      {currentMinigame && (
        <>
          {currentMinigame === 'guess' && (
            <GuessNumber 
              onComplete={handleMinigameComplete}
              onClose={() => setCurrentMinigame(null)}
            />
          )}
          {currentMinigame === 'hangman' && (
            <Hangman 
              onComplete={handleMinigameComplete}
              onClose={() => setCurrentMinigame(null)}
            />
          )}
        </>
      )}

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Streamer Header */}
        <Card className="bg-gradient-card border-primary/20 shadow-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img 
                    src={streamer.avatar} 
                    alt={streamer.displayName}
                    className="w-20 h-20 rounded-full border-4 border-primary/30"
                  />
                  {streamer.isLive && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-secondary rounded-full border-3 border-background animate-pulse" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {streamer.displayName}
                  </h1>
                  <p className="text-lg text-muted-foreground">@{streamer.username}</p>
                  <div className="flex gap-2">
                    <Badge variant={streamer.isLive ? "default" : "secondary"}>
                      {streamer.isLive ? '🔴 En Live' : '⭕ Hors ligne'}
                    </Badge>
                    <Badge variant="outline">{streamer.category}</Badge>
                    <Badge variant="outline">{streamer.language}</Badge>
                  </div>
                </div>
              </div>

              <div className="text-right space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{streamer.viewerCount.toLocaleString()} viewers</span>
                </div>
                <Button 
                  variant={isFollowing ? "secondary" : "default"}
                  onClick={toggleFollow}
                  className="flex items-center gap-2"
                >
                  <Heart className={`h-4 w-4 ${isFollowing ? 'fill-current' : ''}`} />
                  {isFollowing ? 'Suivi' : 'Suivre'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {!streamer.isLive ? (
          <Card className="bg-gradient-card border-destructive/20">
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Stream hors ligne
              </h2>
              <p className="text-muted-foreground mb-4">
                {streamer.displayName} n'est pas en live actuellement.
              </p>
              <p className="text-sm text-muted-foreground">
                {streamer.description}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Click Section */}
            <Card className="bg-gradient-card border-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <MousePointer className="h-5 w-5 text-secondary" />
                  Participation au Subathon
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{streamer.description}</p>
                
                {/* Progress Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progression vers le mini-jeu</span>
                    <span className="text-primary font-medium">
                      {clicks}/{streamer.clicksNeeded} clics
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-4" />
                  {clicks > 0 && (
                    <p className="text-xs text-center text-muted-foreground">
                      Encore {streamer.clicksNeeded - clicks} clics pour déclencher un mini-jeu !
                    </p>
                  )}
                </div>

                {/* Click Button */}
                <div className="text-center space-y-4">
                  <Button
                    size="lg"
                    className="w-full h-16 text-xl animate-pulse-glow"
                    onClick={handleClick}
                    disabled={isOnCooldown}
                  >
                    {isOnCooldown ? (
                      <>
                        <Clock className="h-6 w-6 mr-2" />
                        Cooldown ({cooldownTime}s)
                      </>
                    ) : (
                      <>
                        <Target className="h-6 w-6 mr-2" />
                        Cliquer pour participer !
                      </>
                    )}
                  </Button>
                  
                  {failedAttempts > 0 && (
                    <div className="text-center text-sm">
                      <Badge variant="destructive">
                        {failedAttempts}/3 échecs - Attention !
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Stats & Info */}
            <div className="space-y-6">
              {/* Time Added */}
              <Card className="bg-gradient-card border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Clock className="h-5 w-5 text-accent" />
                    Temps de Stream
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-accent">
                      {formatTime(streamer.timeAdded)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Temps ajouté par la communauté
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Mini-games Info */}
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Gamepad2 className="h-5 w-5 text-primary" />
                    Mini-jeux Disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <div className="font-medium text-foreground">Devine le Chiffre</div>
                        <div className="text-xs text-muted-foreground">Trouvez le nombre mystère</div>
                      </div>
                    </div>
                    <Badge variant="default">Actif</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎪</span>
                      <div>
                        <div className="font-medium text-foreground">Pendu</div>
                        <div className="text-xs text-muted-foreground">Devinez le mot caché</div>
                      </div>
                    </div>
                    <Badge variant="default">Actif</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Rules */}
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Trophy className="h-5 w-5 text-accent" />
                    Règles du Jeu
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <div>• Cliquez {streamer.clicksNeeded} fois pour déclencher un mini-jeu</div>
                  <div>• Réussir un mini-jeu ajoute du temps au stream</div>
                  <div>• 3 échecs consécutifs remettent les clics à zéro</div>
                  <div>• Cooldown de {streamer.cooldown}s après chaque tentative</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamerPage;