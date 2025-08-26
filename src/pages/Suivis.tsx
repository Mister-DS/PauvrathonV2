import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockStreamers } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Heart, Users, Clock, Bell } from 'lucide-react';

const Suivis = () => {
  // Mock: supposons que l'utilisateur suit les streamers avec des IDs spécifiques
  const followedStreamerIds = ['1', '2', '4']; // Mock des streamers suivis
  const followedStreamers = mockStreamers.filter(s => followedStreamerIds.includes(s.id));
  
  const liveFollowed = followedStreamers.filter(s => s.isLive);
  const offlineFollowed = followedStreamers.filter(s => !s.isLive);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const StreamerCard = ({ streamer, isLive }: { streamer: typeof mockStreamers[0]; isLive: boolean }) => (
    <Card className={`bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 ${
      isLive ? 'shadow-glow' : 'opacity-75'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src={streamer.avatar} 
                alt={streamer.displayName}
                className="w-16 h-16 rounded-full border-2 border-primary/20"
              />
              {isLive && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary rounded-full border-2 border-background animate-pulse" />
              )}
            </div>
            <div>
              <CardTitle className="text-xl text-foreground">{streamer.displayName}</CardTitle>
              <p className="text-sm text-muted-foreground">@{streamer.username}</p>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline" className="text-xs">{streamer.category}</Badge>
                <Badge variant="outline" className="text-xs">{streamer.language}</Badge>
              </div>
            </div>
          </div>
          <div className="text-right space-y-2">
            <Badge variant={isLive ? "default" : "secondary"}>
              {isLive ? 'En Live' : 'Hors ligne'}
            </Badge>
            <Button variant="outline" size="sm" className="w-full">
              <Bell className="h-4 w-4 mr-1" />
              Notifier
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{streamer.description}</p>

        {isLive && (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{streamer.viewerCount.toLocaleString()} viewers</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>+{formatTime(streamer.timeAdded)}</span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Progression du subathon</span>
                <span className="text-primary font-medium">
                  {streamer.currentClicks}/{streamer.clicksNeeded}
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-3">
                <div 
                  className="bg-gradient-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(streamer.currentClicks / streamer.clicksNeeded) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Prochain mini-jeu dans {streamer.clicksNeeded - streamer.currentClicks} clics
              </p>
            </div>
          </>
        )}
        
        <Link to={`/streamer/${streamer.id}`}>
          <Button 
            className="w-full"
            variant={isLive ? "default" : "outline"}
            disabled={!isLive}
          >
            {isLive ? 'Rejoindre le subathon' : 'Voir le profil'}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Mes Suivis
          </h1>
          <p className="text-lg text-muted-foreground">
            Retrouvez tous vos streamers préférés et ne manquez aucun subathon !
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card border-secondary/20">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-secondary">{followedStreamers.length}</div>
              <div className="text-sm text-muted-foreground">Streamers suivis</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-primary/20">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{liveFollowed.length}</div>
              <div className="text-sm text-muted-foreground">En live maintenant</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-accent/20">
            <CardContent className="p-6 text-center">
              <Bell className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-accent">3</div>
              <div className="text-sm text-muted-foreground">Notifications actives</div>
            </CardContent>
          </Card>
        </div>

        {/* Live Followed Streamers */}
        {liveFollowed.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground">🔴 En Live Maintenant</h2>
              <Badge variant="default" className="animate-pulse">
                {liveFollowed.length} streamer{liveFollowed.length > 1 ? 's' : ''}
              </Badge>
            </div>
            <div className="grid gap-6">
              {liveFollowed.map(streamer => (
                <StreamerCard key={streamer.id} streamer={streamer} isLive={true} />
              ))}
            </div>
          </div>
        )}

        {/* Offline Followed Streamers */}
        {offlineFollowed.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">⭕ Hors Ligne</h2>
            <div className="grid gap-4">
              {offlineFollowed.map(streamer => (
                <StreamerCard key={streamer.id} streamer={streamer} isLive={false} />
              ))}
            </div>
          </div>
        )}

        {/* No followed streamers */}
        {followedStreamers.length === 0 && (
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-8 text-center space-y-4">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Aucun streamer suivi
                </h3>
                <p className="text-muted-foreground mb-4">
                  Commencez à suivre des streamers pour ne manquer aucun de leurs subathons !
                </p>
                <Link to="/decouverte">
                  <Button>
                    Découvrir des streamers
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        {followedStreamers.length > 0 && (
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Actions rapides</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">
                  <Bell className="h-4 w-4 mr-2" />
                  Gérer les notifications
                </Button>
                <Button variant="outline">
                  Exporter ma liste
                </Button>
                <Link to="/decouverte">
                  <Button variant="outline">
                    Découvrir plus de streamers
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Suivis;