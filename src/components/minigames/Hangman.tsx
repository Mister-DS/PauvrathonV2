import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HangmanProps {
  onComplete: (success: boolean, score: number) => void;
  onClose: () => void;
}

const WORDS = [
  'JAVASCRIPT', 'STREAMING', 'TWITCH', 'GAMING', 'PAUVRATHON',
  'ORDINATEUR', 'CLAVIER', 'SOURIS', 'ECRAN', 'INTERNET',
  'YOUTUBE', 'DISCORD', 'REACTJS', 'TYPESCRIPT', 'GITHUB'
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const Hangman: React.FC<HangmanProps> = ({ onComplete, onClose }) => {
  const [word, setWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const MAX_WRONG_GUESSES = 6;

  useEffect(() => {
    // Choisir un mot aléatoire
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setWord(randomWord);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isGameOver) {
      setIsGameOver(true);
      setTimeout(() => onComplete(false, 0), 2000);
    }
  }, [timeLeft, isGameOver, onComplete]);

  const displayWord = word
    .split('')
    .map(letter => (guessedLetters.has(letter) ? letter : '_'))
    .join(' ');

  const isWordComplete = word.split('').every(letter => guessedLetters.has(letter));

  useEffect(() => {
    if (isWordComplete && word && !isGameOver) {
      setIsGameOver(true);
      const score = Math.max(100, 1500 - (wrongGuesses * 100) - ((45 - timeLeft) * 10));
      setTimeout(() => onComplete(true, score), 2000);
    }
  }, [isWordComplete, word, isGameOver, wrongGuesses, timeLeft, onComplete]);

  useEffect(() => {
    if (wrongGuesses >= MAX_WRONG_GUESSES && !isGameOver) {
      setIsGameOver(true);
      setTimeout(() => onComplete(false, 0), 2000);
    }
  }, [wrongGuesses, isGameOver, onComplete]);

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.has(letter) || isGameOver) return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const getHangmanDrawing = () => {
    const drawings = [
      '', // 0 erreurs
      '  +---+\n      |\n      |\n      |\n      |\n=========',
      '  +---+\n  |   |\n      |\n      |\n      |\n=========',
      '  +---+\n  |   |\n  O   |\n      |\n      |\n=========',
      '  +---+\n  |   |\n  O   |\n  |   |\n      |\n=========',
      '  +---+\n  |   |\n  O   |\n /|   |\n      |\n=========',
      '  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n========='
    ];
    return drawings[wrongGuesses] || drawings[6];
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-gradient-card border-primary shadow-glow">
        <CardHeader className="text-center">
          <CardTitle className="text-xl bg-gradient-primary bg-clip-text text-transparent">
            🎪 Pendu
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Trouve le mot avant d'être pendu !
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              Erreurs: <span className="text-destructive font-medium">{wrongGuesses}/{MAX_WRONG_GUESSES}</span>
            </div>
            <div className="text-sm">
              Temps: <span className={`font-medium ${timeLeft <= 15 ? 'text-destructive' : 'text-secondary'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Dessin du pendu */}
          <div className="text-center">
            <pre className="text-xs text-muted-foreground font-mono leading-tight">
              {getHangmanDrawing()}
            </pre>
          </div>

          {/* Mot à deviner */}
          <div className="text-center">
            <div className="text-2xl font-mono tracking-wider text-primary">
              {displayWord}
            </div>
          </div>

          {/* Messages de fin */}
          {isGameOver && (
            <div className={`text-center p-3 rounded-lg ${
              isWordComplete ? 'bg-secondary/20 text-secondary' : 'bg-destructive/20 text-destructive'
            }`}>
              {isWordComplete ? 
                '🎉 Bravo ! Mot trouvé !' : 
                wrongGuesses >= MAX_WRONG_GUESSES ? 
                  `😵 Pendu ! C'était "${word}"` : 
                  '⏰ Temps écoulé !'
              }
            </div>
          )}

          {/* Alphabet */}
          <div className="space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              Lettres disponibles
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1">
              {ALPHABET.map(letter => {
                const isGuessed = guessedLetters.has(letter);
                const isCorrect = isGuessed && word.includes(letter);
                const isWrong = isGuessed && !word.includes(letter);
                
                return (
                  <Button
                    key={letter}
                    onClick={() => handleLetterGuess(letter)}
                    disabled={isGuessed || isGameOver}
                    size="sm"
                    variant={isCorrect ? "default" : isWrong ? "destructive" : "outline"}
                    className="h-8 text-xs"
                  >
                    {letter}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={onClose} variant="outline">
              Fermer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};