import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GuessNumberProps {
  onComplete: (success: boolean, score: number) => void;
  onClose: () => void;
}

export const GuessNumber: React.FC<GuessNumberProps> = ({ onComplete, onClose }) => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    // Générer un nombre aléatoire entre 1 et 100
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isGameOver) {
      setIsGameOver(true);
      setFeedback('Temps écoulé ! 😢');
      setTimeout(() => onComplete(false, 0), 2000);
    }
  }, [timeLeft, isGameOver, onComplete]);

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      setFeedback('Entrez un nombre entre 1 et 100');
      return;
    }

    setAttempts(attempts + 1);

    if (guessNum === targetNumber) {
      setIsGameOver(true);
      setFeedback('🎉 Bravo ! Nombre trouvé !');
      const score = Math.max(100, 1000 - (attempts * 50) - ((30 - timeLeft) * 10));
      setTimeout(() => onComplete(true, score), 2000);
    } else if (guessNum < targetNumber) {
      setFeedback('📈 Plus grand !');
    } else {
      setFeedback('📉 Plus petit !');
    }

    if (attempts >= 9 && guessNum !== targetNumber) {
      setIsGameOver(true);
      setFeedback(`😢 Perdu ! C'était ${targetNumber}`);
      setTimeout(() => onComplete(false, 0), 2000);
    }

    setGuess('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isGameOver) {
      handleGuess();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <Card className="w-full max-w-md bg-gradient-card border-primary shadow-glow">
        <CardHeader className="text-center">
          <CardTitle className="text-xl bg-gradient-primary bg-clip-text text-transparent">
            🎯 Devine le Chiffre
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Trouve le nombre entre 1 et 100
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              Tentatives: <span className="text-primary font-medium">{attempts}/10</span>
            </div>
            <div className="text-sm">
              Temps: <span className={`font-medium ${timeLeft <= 10 ? 'text-destructive' : 'text-secondary'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {feedback && (
            <div className={`text-center p-3 rounded-lg ${
              feedback.includes('Bravo') ? 'bg-secondary/20 text-secondary' :
              feedback.includes('Perdu') || feedback.includes('Temps') ? 'bg-destructive/20 text-destructive' :
              'bg-accent/20 text-accent'
            }`}>
              {feedback}
            </div>
          )}

          <div className="space-y-3">
            <Input
              type="number"
              min="1"
              max="100"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Votre nombre..."
              disabled={isGameOver}
              className="text-center text-lg"
            />
            
            <div className="flex gap-2">
              <Button 
                onClick={handleGuess}
                disabled={isGameOver || !guess}
                className="flex-1"
                variant="default"
              >
                Valider
              </Button>
              <Button 
                onClick={onClose}
                variant="outline"
              >
                Annuler
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};