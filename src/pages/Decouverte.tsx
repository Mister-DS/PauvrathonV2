import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockStreamers } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Eye, Clock, Users } from 'lucide-react';

const Decouverte = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredStreamers = mockStreamers.filter(streamer => {
    const matchesSearch = streamer.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         streamer.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = languageFilter === 'all' || streamer.language === languageFilter;
    const matchesCategory = categoryFilter === 'all' || streamer.category === categoryFilter;
    
    return matchesSearch && matchesLanguage && matchesCategory;
  });

  const liveStreamers = filteredStreamers.filter(s => s.isLive);
  const offlineStreamers = filteredStreamers.filter(s => !s.isLive);

  const categories = [...new Set(mockStreamers.map(s => s.category))];
  const languages = [...new Set(mockStreamers.map(s => s.language))];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const StreamerCard = ({ streamer }: { streamer: typeof mockStreamers[0] }) => (
    <Card className={`bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 ${
      streamer.isLive ? 'shadow-glow' : 'opacity-75'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src={streamer.avatar} 
                alt={streamer.displayName}
                className="w-12 h-12 rounded-full border-2 border-primary/20"
              />
              {streamer.isLive && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-background animate-pulse" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg text-foreground">{streamer.displayName}</CardTitle>
              <p className="text-sm text-muted-foreground">@{streamer.username}</p>
            </div>
          </div>
          <Badge variant={streamer.isLive ? "default" : "secondary"}>
            {streamer.isLive ? 'Live' : 'Hors ligne'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{streamer.description}</p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{streamer.category}</Badge>
          <Badge variant="outline">{streamer.language}</Badge>
        </div>

        {streamer.isLive && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{streamer.viewerCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{formatTime(streamer.timeAdded)}</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {streamer.isLive && (
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Progression des clics</span>
                <span className="text-primary font-medium">
                  {streamer.currentClicks}/{streamer.clicksNeeded}
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(streamer.currentClicks / streamer.clicksNeeded) * 100}%` }}
                />
              </div>
            </div>
          )}
          
          <Link to={`/streamer/${streamer.id}`}>
            <Button 
              className="w-full"
              variant={streamer.isLive ? "default" : "outline"}
              disabled={!streamer.isLive}
            >
              {streamer.isLive ? 'Participer au subathon' : 'Streamer hors ligne'}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Découverte des Streamers
          </h1>
          <p className="text-lg text-muted-foreground">
            Trouvez vos streamers préférés et participez à leurs subathons !
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Rechercher
                </label>
                <Input
                  placeholder="Nom du streamer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Langue
                </label>
                <Select value={languageFilter} onValueChange={setLanguageFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les langues" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les langues</SelectItem>
                    {languages.map(lang => (
                      <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Catégorie
                </label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm('');
                    setLanguageFilter('all');
                    setCategoryFilter('all');
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Streamers */}
        {liveStreamers.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground">Streamers en Live</h2>
              <Badge variant="default" className="animate-pulse">
                {liveStreamers.length} en ligne
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveStreamers.map(streamer => (
                <StreamerCard key={streamer.id} streamer={streamer} />
              ))}
            </div>
          </div>
        )}

        {/* Offline Streamers */}
        {offlineStreamers.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Streamers Hors Ligne</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offlineStreamers.map(streamer => (
                <StreamerCard key={streamer.id} streamer={streamer} />
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {filteredStreamers.length === 0 && (
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-8 text-center">
              <Eye className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Aucun streamer trouvé
              </h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos critères de recherche.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Decouverte;