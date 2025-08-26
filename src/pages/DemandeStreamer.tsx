import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Send, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const DemandeStreamer = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    streamUrl: '',
    motivation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user || user.role !== 'viewer') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gradient-card border-destructive/20">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Accès restreint
            </h3>
            <p className="text-muted-foreground">
              Seuls les viewers peuvent faire une demande pour devenir streamer.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.streamUrl || !formData.motivation) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    if (formData.motivation.length < 50) {
      toast({
        title: "Motivation insuffisante",
        description: "Votre motivation doit contenir au moins 50 caractères",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulation d'une soumission de demande
    setTimeout(() => {
      console.log('Demande soumise:', formData);
      toast({
        title: "Demande envoyée !",
        description: "Votre demande a été transmise aux administrateurs",
        variant: "default"
      });
      
      // Reset form
      setFormData({
        username: '',
        streamUrl: '',
        motivation: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Devenir Streamer Pauvrathon
          </h1>
          <p className="text-lg text-muted-foreground">
            Rejoignez la communauté des streamers et participez à l'aventure subathon !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card className="bg-gradient-card border-primary/20 shadow-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <UserPlus className="h-5 w-5 text-primary" />
                Formulaire de Candidature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Pseudo Twitch *
                  </label>
                  <Input
                    placeholder="votre_pseudo_twitch"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Votre nom d'utilisateur exact sur Twitch
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Lien de votre stream *
                  </label>
                  <Input
                    type="url"
                    placeholder="https://twitch.tv/votre_pseudo"
                    value={formData.streamUrl}
                    onChange={(e) => handleInputChange('streamUrl', e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Lien direct vers votre chaîne Twitch
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Motivation *
                  </label>
                  <Textarea
                    placeholder="Expliquez pourquoi vous souhaitez participer au Pauvrathon, votre expérience en streaming, votre communauté..."
                    rows={6}
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    required
                  />
                  <div className="flex justify-between text-xs">
                    <span className={`${formData.motivation.length >= 50 ? 'text-secondary' : 'text-destructive'}`}>
                      {formData.motivation.length}/50 caractères minimum
                    </span>
                    <span className="text-muted-foreground">
                      {formData.motivation.length}/500 caractères
                    </span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer la demande
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Requirements */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Critères de sélection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Chaîne Twitch active</div>
                      <div className="text-sm text-muted-foreground">
                        Au moins 10 streams dans les 3 derniers mois
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Communauté engagée</div>
                      <div className="text-sm text-muted-foreground">
                        Interaction régulière avec vos viewers
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Motivation claire</div>
                      <div className="text-sm text-muted-foreground">
                        Expliquer pourquoi participer au Pauvrathon
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Disponibilité</div>
                      <div className="text-sm text-muted-foreground">
                        Capacité à organiser un subathon
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="bg-gradient-card border-accent/20">
              <CardHeader>
                <CardTitle className="text-foreground">Avantages Streamers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="default">🎮</Badge>
                  <span className="text-foreground">Panneau de contrôle personnalisé</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant="default">📊</Badge>
                  <span className="text-foreground">Statistiques détaillées</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant="default">⚡</Badge>
                  <span className="text-foreground">Configuration des mini-jeux</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant="default">💰</Badge>
                  <span className="text-foreground">Mécaniques de don intégrées</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant="default">🏆</Badge>
                  <span className="text-foreground">Classements et achievements</span>
                </div>
              </CardContent>
            </Card>

            {/* Process */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Processus de validation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                      1
                    </div>
                    <span className="text-foreground">Soumission de votre candidature</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center font-bold">
                      2
                    </div>
                    <span className="text-foreground">Vérification par notre équipe (24-48h)</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                      3
                    </div>
                    <span className="text-foreground">Notification par email</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center font-bold">
                      4
                    </div>
                    <span className="text-foreground">Accès au panneau streamer</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandeStreamer;