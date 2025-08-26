import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Timer, 
  MousePointer, 
  Gamepad2, 
  Crown, 
  Save,
  AlertCircle,
  Play,
  Pause,
  Square,
  Shuffle
} from 'lucide-react';

const StreamerPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Mock settings state
  const [settings, setSettings] = useState({
    timePerClick: 15, // secondes ajoutées par réussite
    maxTimePerClick: 30, // temps maximum pour mode aléatoire
    timeMode: 'fixed', // 'fixed' ou 'random'
    clicksForMinigame: 100, // nombre de clics avant mini-jeu
    cooldown: 30, // cooldown entre les tentatives en secondes
    activeGames: {
      guessNumber: true,
      hangman: true,
      memoryGame: false, // désactivé pour l'instant
      wordGame: false // désactivé pour l'instant
    }
  });

  // État du subathon
  const [subathonState, setSubathonState] = useState({
    isRunning: false,
    isPaused: false,
    totalTimeAdded: 0,
    currentClicks: 45,
    targetClicks: 100
  });

  // Mock best player data
  const bestPlayer = {
    username: 'SuperGamer2024',
    score: 2450,
    gamesWon: 12,
    timeAdded: 720 // secondes
  };

  if (!user || (user.role !== 'streamer' && user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gradient-card border-destructive/20">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Accès restreint
            </h3>
            <p className="text-muted-foreground">
              Seuls les streamers peuvent accéder à ce panneau.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSettingChange = (key: string, value: number | boolean | string) => {
    if (typeof value === 'number') {
      setSettings(prev => ({
        ...prev,
        [key]: Math.max(0, value)
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleGameToggle = (game: string, enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      activeGames: {
        ...prev.activeGames,
        [game]: enabled
      }
    }));
  };

  const handleSaveSettings = () => {
    console.log('Sauvegarde des paramètres:', settings);
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos configurations ont été mises à jour",
      variant: "default"
    });
  };

  const handleSubathonControl = (action: 'start' | 'pause' | 'stop') => {
    switch (action) {
      case 'start':
        setSubathonState(prev => ({ ...prev, isRunning: true, isPaused: false }));
        toast({
          title: "Subathon lancé !",
          description: "Votre subathon est maintenant en cours",
          variant: "default"
        });
        break;
      case 'pause':
        setSubathonState(prev => ({ ...prev, isPaused: !prev.isPaused }));
        toast({
          title: subathonState.isPaused ? "Subathon repris" : "Subathon en pause",
          description: subathonState.isPaused ? "Le subathon continue" : "Le subathon est maintenant en pause",
          variant: "default"
        });
        break;
      case 'stop':
        setSubathonState({ isRunning: false, isPaused: false, totalTimeAdded: 0, currentClicks: 0, targetClicks: settings.clicksForMinigame });
        toast({
          title: "Subathon arrêté",
          description: "Le subathon a été arrêté et remis à zéro",
          variant: "destructive"
        });
        break;
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const activeGamesCount = Object.values(settings.activeGames).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Panneau Streamer
          </h1>
          <p className="text-lg text-muted-foreground">
            Configurez votre subathon et gérez l'expérience de vos viewers
          </p>
        </div>

        {/* Subathon Controls */}
        <Card className="bg-gradient-card border-accent/20 shadow-gaming">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Crown className="h-5 w-5 text-accent" />
              Contrôles du Subathon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* État actuel */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div>
                    <div className="font-semibold text-foreground">État actuel</div>
                    <div className="text-sm text-muted-foreground">
                      {!subathonState.isRunning ? 'Arrêté' : 
                       subathonState.isPaused ? 'En pause' : 'En cours'}
                    </div>
                  </div>
                  <Badge variant={
                    !subathonState.isRunning ? 'destructive' : 
                    subathonState.isPaused ? 'secondary' : 'default'
                  }>
                    {!subathonState.isRunning ? '⭕ Arrêté' : 
                     subathonState.isPaused ? '⏸️ Pause' : '▶️ Live'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <div className="text-lg font-bold text-primary">{subathonState.currentClicks}/{subathonState.targetClicks}</div>
                    <div className="text-xs text-muted-foreground">Clics</div>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <div className="text-lg font-bold text-secondary">{formatTime(subathonState.totalTimeAdded)}</div>
                    <div className="text-xs text-muted-foreground">Temps ajouté</div>
                  </div>
                </div>
              </div>

              {/* Contrôles */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-foreground">Actions rapides</div>
                <div className="grid grid-cols-2 gap-3">
                  {!subathonState.isRunning ? (
                    <Button 
                      onClick={() => handleSubathonControl('start')}
                      className="w-full"
                      variant="default"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Lancer
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleSubathonControl('pause')}
                      className="w-full"
                      variant="secondary"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      {subathonState.isPaused ? 'Reprendre' : 'Pause'}
                    </Button>
                  )}
                  
                  <Button 
                    onClick={() => handleSubathonControl('stop')}
                    className="w-full"
                    variant="destructive"
                    disabled={!subathonState.isRunning}
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Arrêter
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Best Player */}
        <Card className="bg-gradient-card border-primary/20 shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Crown className="h-5 w-5 text-primary" />
              Meilleur Joueur Actuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{bestPlayer.username}</div>
                <div className="text-sm text-muted-foreground">Champion</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{bestPlayer.score}</div>
                <div className="text-sm text-muted-foreground">Score Total</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{bestPlayer.gamesWon}</div>
                <div className="text-sm text-muted-foreground">Parties Gagnées</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{formatTime(bestPlayer.timeAdded)}</div>
                <div className="text-sm text-muted-foreground">Temps Ajouté</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Game Settings */}
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Settings className="h-5 w-5 text-primary" />
                Paramètres du Subathon
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-foreground">Mode de temps ajouté</Label>
                  <Select value={settings.timeMode} onValueChange={(value) => handleSettingChange('timeMode', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">
                        <div className="flex items-center gap-2">
                          <Timer className="h-4 w-4" />
                          Temps fixe
                        </div>
                      </SelectItem>
                      <SelectItem value="random">
                        <div className="flex items-center gap-2">
                          <Shuffle className="h-4 w-4" />
                          Temps aléatoire
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {settings.timeMode === 'fixed' ? (
                  <div>
                    <Label className="text-foreground">Temps ajouté par réussite (secondes)</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        min="1"
                        max="60"
                        value={settings.timePerClick}
                        onChange={(e) => handleSettingChange('timePerClick', parseInt(e.target.value))}
                        className="max-w-24"
                      />
                      <span className="text-sm text-muted-foreground">
                        secondes par victoire
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground">Temps minimum</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <Timer className="h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          min="1"
                          max="60"
                          value={settings.timePerClick}
                          onChange={(e) => handleSettingChange('timePerClick', parseInt(e.target.value))}
                          className="max-w-20"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-foreground">Temps maximum</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <Shuffle className="h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          min={settings.timePerClick + 1}
                          max="120"
                          value={settings.maxTimePerClick}
                          onChange={(e) => handleSettingChange('maxTimePerClick', parseInt(e.target.value))}
                          className="max-w-20"
                        />
                      </div>
                    </div>
                    <div className="col-span-2 text-xs text-muted-foreground bg-muted/20 p-2 rounded">
                      💡 Mode aléatoire : Entre {settings.timePerClick}s et {settings.maxTimePerClick}s par victoire
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-foreground">Clics nécessaires avant mini-jeu</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <MousePointer className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      min="10"
                      max="500"
                      value={settings.clicksForMinigame}
                      onChange={(e) => handleSettingChange('clicksForMinigame', parseInt(e.target.value))}
                      className="max-w-24"
                    />
                    <span className="text-sm text-muted-foreground">
                      clics requis
                    </span>
                  </div>
                </div>

                <div>
                  <Label className="text-foreground">Cooldown entre tentatives (secondes)</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      min="0"
                      max="300"
                      value={settings.cooldown}
                      onChange={(e) => handleSettingChange('cooldown', parseInt(e.target.value))}
                      className="max-w-24"
                    />
                    <span className="text-sm text-muted-foreground">
                      secondes de pause
                    </span>
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveSettings} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder les paramètres
              </Button>
            </CardContent>
          </Card>

          {/* Active Games */}
          <Card className="bg-gradient-card border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Gamepad2 className="h-5 w-5 text-secondary" />
                Mini-Jeux Actifs
                <Badge variant="secondary">{activeGamesCount} activé{activeGamesCount > 1 ? 's' : ''}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">🎯 Devine le Chiffre</div>
                    <div className="text-sm text-muted-foreground">
                      Trouver un nombre entre 1 et 100
                    </div>
                  </div>
                  <Switch
                    checked={settings.activeGames.guessNumber}
                    onCheckedChange={(checked) => handleGameToggle('guessNumber', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">🎪 Pendu</div>
                    <div className="text-sm text-muted-foreground">
                      Deviner le mot avant d'être pendu
                    </div>
                  </div>
                  <Switch
                    checked={settings.activeGames.hangman}
                    onCheckedChange={(checked) => handleGameToggle('hangman', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg opacity-50">
                  <div>
                    <div className="font-medium text-muted-foreground">🧠 Jeu de Mémoire</div>
                    <div className="text-sm text-muted-foreground">
                      À venir prochainement...
                    </div>
                  </div>
                  <Switch
                    checked={settings.activeGames.memoryGame}
                    onCheckedChange={(checked) => handleGameToggle('memoryGame', checked)}
                    disabled
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg opacity-50">
                  <div>
                    <div className="font-medium text-muted-foreground">📝 Jeu de Mots</div>
                    <div className="text-sm text-muted-foreground">
                      À venir prochainement...
                    </div>
                  </div>
                  <Switch
                    checked={settings.activeGames.wordGame}
                    onCheckedChange={(checked) => handleGameToggle('wordGame', checked)}
                    disabled
                  />
                </div>
              </div>

              {activeGamesCount === 0 && (
                <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
                  <div className="text-sm text-destructive font-medium">
                    Aucun mini-jeu actif !
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Activez au moins un jeu pour que vos viewers puissent participer
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Clics aujourd'hui</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-secondary">47</div>
              <div className="text-sm text-muted-foreground">Parties jouées</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-accent">23</div>
              <div className="text-sm text-muted-foreground">Victoires</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">{formatTime(settings.timePerClick * 23)}</div>
              <div className="text-sm text-muted-foreground">Temps ajouté</div>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">💡 Conseils pour optimiser votre subathon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="font-medium text-foreground">⚡ Engagement optimal</div>
                <div className="text-sm text-muted-foreground">
                  Configurez 50-150 clics par mini-jeu selon votre audience pour maintenir l'engagement
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="font-medium text-foreground">⏱️ Timing parfait</div>
                <div className="text-sm text-muted-foreground">
                  Un cooldown de 15-30 secondes évite le spam tout en gardant le rythme
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="font-medium text-foreground">🎯 Récompenses équilibrées</div>
                <div className="text-sm text-muted-foreground">
                  10-20 secondes par victoire créent une progression satisfaisante
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="font-medium text-foreground">🎮 Variété des jeux</div>
                <div className="text-sm text-muted-foreground">
                  Activez plusieurs mini-jeux pour offrir plus de diversité à votre audience
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StreamerPanel;