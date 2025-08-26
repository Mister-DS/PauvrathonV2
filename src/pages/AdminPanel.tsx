import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockStreamerRequests, mockStreamers } from '@/data/mockData';
import { 
  Shield, 
  Users, 
  UserCheck, 
  UserX, 
  Plus, 
  BarChart3,
  AlertCircle,
  Crown,
  Settings
} from 'lucide-react';

const AdminPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState(mockStreamerRequests);
  const [streamers, setStreamers] = useState(mockStreamers);
  const [newGameForm, setNewGameForm] = useState({ name: '', description: '' });

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gradient-card border-destructive/20">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Accès restreint
            </h3>
            <p className="text-muted-foreground">
              Seuls les administrateurs peuvent accéder à ce panneau.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleRequestAction = (requestId: string, action: 'approved' | 'rejected') => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: action } : req
    ));
    
    toast({
      title: action === 'approved' ? "Demande acceptée" : "Demande refusée",
      description: `La demande a été ${action === 'approved' ? 'approuvée' : 'refusée'} avec succès`,
      variant: "default"
    });
  };

  const handleRemoveStreamer = (streamerId: string) => {
    setStreamers(prev => prev.filter(s => s.id !== streamerId));
    toast({
      title: "Streamer retiré",
      description: "Le streamer a été retiré de la plateforme",
      variant: "default"
    });
  };

  const handleAddGame = () => {
    if (!newGameForm.name || !newGameForm.description) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    console.log('Nouveau mini-jeu:', newGameForm);
    toast({
      title: "Mini-jeu ajouté",
      description: `${newGameForm.name} a été ajouté à la liste des mini-jeux`,
      variant: "default"
    });
    setNewGameForm({ name: '', description: '' });
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const approvedRequests = requests.filter(r => r.status === 'approved');
  const rejectedRequests = requests.filter(r => r.status === 'rejected');
  const liveStreamers = streamers.filter(s => s.isLive);

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
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Panneau Administrateur
          </h1>
          <p className="text-lg text-muted-foreground">
            Gérez la plateforme Pauvrathon et supervisez la communauté
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-primary/20">
            <CardContent className="p-6 text-center space-y-2">
              <Users className="h-8 w-8 text-primary mx-auto" />
              <div className="text-2xl font-bold text-primary">{streamers.length}</div>
              <div className="text-sm text-muted-foreground">Streamers totaux</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-secondary/20">
            <CardContent className="p-6 text-center space-y-2">
              <UserCheck className="h-8 w-8 text-secondary mx-auto" />
              <div className="text-2xl font-bold text-secondary">{liveStreamers.length}</div>
              <div className="text-sm text-muted-foreground">En live</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-accent/20">
            <CardContent className="p-6 text-center space-y-2">
              <Crown className="h-8 w-8 text-accent mx-auto" />
              <div className="text-2xl font-bold text-accent">{pendingRequests.length}</div>
              <div className="text-sm text-muted-foreground">Demandes en attente</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-muted/20">
            <CardContent className="p-6 text-center space-y-2">
              <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto" />
              <div className="text-2xl font-bold text-foreground">1,247</div>
              <div className="text-sm text-muted-foreground">Users totaux</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Demandes
            </TabsTrigger>
            <TabsTrigger value="streamers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Streamers
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Mini-jeux
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Statistiques
            </TabsTrigger>
          </TabsList>

          {/* Streamer Requests */}
          <TabsContent value="requests" className="space-y-6">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Demandes de Streamers ({pendingRequests.length} en attente)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="p-4 bg-muted/20 rounded-lg border border-border">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-foreground">{request.username}</h3>
                            <Badge variant={
                              request.status === 'pending' ? 'secondary' :
                              request.status === 'approved' ? 'default' : 'destructive'
                            }>
                              {request.status === 'pending' ? 'En attente' :
                               request.status === 'approved' ? 'Approuvé' : 'Refusé'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong>Stream:</strong> {request.streamUrl}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Date:</strong> {formatDate(request.createdAt)}
                          </p>
                          <p className="text-sm text-foreground">
                            <strong>Motivation:</strong> {request.motivation}
                          </p>
                        </div>
                        
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="default"
                              onClick={() => handleRequestAction(request.id, 'approved')}
                            >
                              <UserCheck className="h-4 w-4 mr-1" />
                              Accepter
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleRequestAction(request.id, 'rejected')}
                            >
                              <UserX className="h-4 w-4 mr-1" />
                              Refuser
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {requests.length === 0 && (
                    <div className="text-center py-8">
                      <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Aucune demande de streamer</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Streamers Management */}
          <TabsContent value="streamers" className="space-y-6">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Gestion des Streamers ({streamers.length} total)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {streamers.map((streamer) => (
                    <div key={streamer.id} className="p-4 bg-muted/20 rounded-lg border border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img 
                            src={streamer.avatar} 
                            alt={streamer.displayName}
                            className="w-12 h-12 rounded-full border-2 border-primary/20"
                          />
                          <div>
                            <div className="font-semibold text-foreground">{streamer.displayName}</div>
                            <div className="text-sm text-muted-foreground">@{streamer.username}</div>
                            <div className="flex gap-2 mt-1">
                              <Badge variant={streamer.isLive ? "default" : "secondary"}>
                                {streamer.isLive ? 'Live' : 'Hors ligne'}
                              </Badge>
                              <Badge variant="outline">{streamer.category}</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-1" />
                            Configurer
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRemoveStreamer(streamer.id)}
                          >
                            <UserX className="h-4 w-4 mr-1" />
                            Retirer
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mini-games Management */}
          <TabsContent value="games" className="space-y-6">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Ajouter un nouveau mini-jeu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <Input
                      placeholder="Nom du mini-jeu"
                      value={newGameForm.name}
                      onChange={(e) => setNewGameForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      placeholder="Description du jeu"
                      value={newGameForm.description}
                      onChange={(e) => setNewGameForm(prev => ({ ...prev, description: e.target.value }))}
                    />
                    <Button onClick={handleAddGame} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter le mini-jeu
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Mini-jeux actuels</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded">
                        <span className="text-foreground">🎯 Devine le Chiffre</span>
                        <Badge variant="default">Actif</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded">
                        <span className="text-foreground">🎪 Pendu</span>
                        <Badge variant="default">Actif</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Global Statistics */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Statistiques Globales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Parties totales jouées</span>
                    <span className="font-semibold text-foreground">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temps total ajouté</span>
                    <span className="font-semibold text-foreground">156h 23m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taux de réussite moyen</span>
                    <span className="font-semibold text-foreground">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Utilisateurs actifs</span>
                    <span className="font-semibold text-foreground">1,247</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Top Streamers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {streamers.slice(0, 4).map((streamer, index) => (
                    <div key={streamer.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-accent">#{index + 1}</div>
                        <div>
                          <div className="font-medium text-foreground">{streamer.displayName}</div>
                          <div className="text-xs text-muted-foreground">{streamer.viewerCount} viewers</div>
                        </div>
                      </div>
                      <Badge variant={index === 0 ? "default" : "secondary"}>
                        {index === 0 && <Crown className="h-3 w-3 mr-1" />}
                        {Math.floor(Math.random() * 50) + 20} parties
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;