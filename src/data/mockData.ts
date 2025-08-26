export interface Streamer {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isLive: boolean;
  category: string;
  language: string;
  viewerCount: number;
  clicksNeeded: number;
  currentClicks: number;
  timeAdded: number; // en secondes
  cooldown: number; // en secondes
  description: string;
}

export interface StreamerRequest {
  id: string;
  username: string;
  streamUrl: string;
  motivation: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface GameSession {
  id: string;
  streamerId: string;
  playerName: string;
  gameType: string;
  score: number;
  completedAt: string;
}

export interface ViewerStats {
  totalGamesPlayed: number;
  totalTimeAdded: number;
  favoriteGame: string;
  streak: number;
  level: number;
}

export const mockStreamers: Streamer[] = [
  {
    id: '1',
    username: 'zerator',
    displayName: 'Zerator',
    avatar: '/placeholder.svg',
    isLive: true,
    category: 'Just Chatting',
    language: 'FR',
    viewerCount: 15000,
    clicksNeeded: 100,
    currentClicks: 45,
    timeAdded: 3600,
    cooldown: 30,
    description: 'Subathon en cours ! Aidez-moi à continuer !'
  },
  {
    id: '2',
    username: 'gotaga',
    displayName: 'Gotaga',
    avatar: '/placeholder.svg',
    isLive: true,
    category: 'Valorant',
    language: 'FR',
    viewerCount: 8500,
    clicksNeeded: 75,
    currentClicks: 20,
    timeAdded: 2400,
    cooldown: 45,
    description: 'Rank push + subathon challenge !'
  },
  {
    id: '3',
    username: 'domingo',
    displayName: 'Domingo',
    avatar: '/placeholder.svg',
    isLive: false,
    category: 'League of Legends',
    language: 'FR',
    viewerCount: 0,
    clicksNeeded: 50,
    currentClicks: 0,
    timeAdded: 1800,
    cooldown: 20,
    description: 'Prochaine session bientôt !'
  },
  {
    id: '4',
    username: 'ponce',
    displayName: 'Ponce',
    avatar: '/placeholder.svg',
    isLive: true,
    category: 'Minecraft',
    language: 'FR',
    viewerCount: 12000,
    clicksNeeded: 150,
    currentClicks: 89,
    timeAdded: 5400,
    cooldown: 60,
    description: 'Construction épique en cours !'
  }
];

export const mockStreamerRequests: StreamerRequest[] = [
  {
    id: '1',
    username: 'nouveau_streamer',
    streamUrl: 'https://twitch.tv/nouveau_streamer',
    motivation: 'Je fais du contenu gaming depuis 2 ans et j\'aimerais participer au Pauvrathon !',
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    username: 'gaming_master',
    streamUrl: 'https://twitch.tv/gaming_master',
    motivation: 'Streamer expérimenté avec une communauté active, prêt pour le défi !',
    status: 'approved',
    createdAt: '2024-01-14T15:20:00Z'
  },
  {
    id: '3',
    username: 'test_user',
    streamUrl: 'https://twitch.tv/test_user',
    motivation: 'Test de motivation insuffisante...',
    status: 'rejected',
    createdAt: '2024-01-13T09:45:00Z'
  }
];

export const mockGameSessions: GameSession[] = [
  {
    id: '1',
    streamerId: '1',
    playerName: 'ViewerMock',
    gameType: 'Devine le chiffre',
    score: 850,
    completedAt: '2024-01-15T14:30:00Z'
  },
  {
    id: '2',
    streamerId: '1',
    playerName: 'ViewerMock',
    gameType: 'Pendu',
    score: 650,
    completedAt: '2024-01-15T13:15:00Z'
  },
  {
    id: '3',
    streamerId: '2',
    playerName: 'ViewerMock',
    gameType: 'Devine le chiffre',
    score: 920,
    completedAt: '2024-01-15T12:00:00Z'
  },
  {
    id: '4',
    streamerId: '4',
    playerName: 'ViewerMock',
    gameType: 'Pendu',
    score: 1200,
    completedAt: '2024-01-15T11:30:00Z'
  },
  {
    id: '5',
    streamerId: '1',
    playerName: 'ViewerMock',
    gameType: 'Devine le chiffre',
    score: 450,
    completedAt: '2024-01-14T16:45:00Z'
  }
];

export const mockViewerStats: ViewerStats = {
  totalGamesPlayed: 23,
  totalTimeAdded: 1840, // secondes
  favoriteGame: 'Devine le chiffre',
  streak: 3,
  level: 8
};