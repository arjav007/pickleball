export interface TournamentResult {
  id: string;
  name: string;
  logo?: string;
  tier: string; // Pro, Regional, Local
  location: string;
  startDate: string;
  endDate: string;
  year: number;
  status: 'completed';
  totalPrizeMoney?: number;
  categories: string[];
  organizer: string;
  venue: string;
  matches: MatchResult[];
}

export interface MatchResult {
  id: string;
  tournamentId: string;
  tournamentName: string;
  category: string; // Singles, Doubles, Mixed
  gender: string; // Men, Women, Mixed
  ageGroup: string;
  stage: string; // Qualification, Round 1, Quarterfinal, Semifinal, Final
  player1: {
    id: string;
    name: string;
    avatar?: string;
    seed?: number;
  };
  player2: {
    id: string;
    name: string;
    avatar?: string;
    seed?: number;
  };
  winner: 'player1' | 'player2';
  score: {
    player1Sets: number;
    player2Sets: number;
    sets: Array<{
      player1Score: number;
      player2Score: number;
    }>;
  };
  date: string;
  time: string;
  duration: number; // in minutes
  venue: string;
  court: string;
  referee?: string;
  attendance?: number;
}

export interface WinnerSpotlight {
  playerId: string;
  playerName: string;
  avatar?: string;
  tournamentName: string;
  category: string;
  achievement: string; // "Champion", "Runner-up", "Semifinalist"
  prizeMoney?: number;
  date: string;
  medalType: 'gold' | 'silver' | 'bronze';
}

export const mockTournamentResults: TournamentResult[] = [
  {
    id: "completed-1",
    name: "Summer Championship 2024",
    tier: "Pro",
    location: "Los Angeles, CA",
    startDate: "2024-08-15",
    endDate: "2024-08-18",
    year: 2024,
    status: "completed",
    totalPrizeMoney: 50000,
    categories: ["Singles", "Doubles", "Mixed"],
    organizer: "USA Pickleball",
    venue: "Central Sports Complex",
    matches: []
  },
  {
    id: "completed-2",
    name: "Regional Open Championship",
    tier: "Regional",
    location: "Phoenix, AZ",
    startDate: "2024-07-20",
    endDate: "2024-07-22",
    year: 2024,
    status: "completed",
    totalPrizeMoney: 25000,
    categories: ["Singles", "Doubles", "Mixed"],
    organizer: "Arizona Pickleball Association",
    venue: "Phoenix Sports Center",
    matches: []
  },
  {
    id: "completed-3",
    name: "State Finals 2024",
    tier: "Regional",
    location: "Miami, FL",
    startDate: "2024-06-10",
    endDate: "2024-06-12",
    year: 2024,
    status: "completed",
    totalPrizeMoney: 15000,
    categories: ["Singles", "Doubles"],
    organizer: "Florida Pickleball Federation",
    venue: "Metro Tennis Club",
    matches: []
  },
  {
    id: "completed-4",
    name: "Spring Championship 2024",
    tier: "Pro",
    location: "Denver, CO",
    startDate: "2024-05-05",
    endDate: "2024-05-08",
    year: 2024,
    status: "completed",
    totalPrizeMoney: 40000,
    categories: ["Singles", "Doubles", "Mixed"],
    organizer: "Mountain Pickleball League",
    venue: "Rocky Mountain Sports Complex",
    matches: []
  },
  // 2023 Results
  {
    id: "completed-5",
    name: "National Championships 2023",
    tier: "Pro",
    location: "Austin, TX",
    startDate: "2023-11-15",
    endDate: "2023-11-18",
    year: 2023,
    status: "completed",
    totalPrizeMoney: 75000,
    categories: ["Singles", "Doubles", "Mixed"],
    organizer: "USA Pickleball",
    venue: "Austin Convention Center",
    matches: []
  },
  {
    id: "completed-6",
    name: "West Coast Open 2023",
    tier: "Regional",
    location: "Seattle, WA",
    startDate: "2023-09-10",
    endDate: "2023-09-12",
    year: 2023,
    status: "completed",
    totalPrizeMoney: 20000,
    categories: ["Singles", "Doubles"],
    organizer: "Pacific Northwest Pickleball",
    venue: "Seattle Sports Arena",
    matches: []
  }
];

export const mockMatchResults: MatchResult[] = [
  // Summer Championship 2024 Results
  {
    id: "result-1",
    tournamentId: "completed-1",
    tournamentName: "Summer Championship 2024",
    category: "Singles",
    gender: "Women",
    ageGroup: "19+",
    stage: "Final",
    player1: {
      id: "p1",
      name: "Sarah Johnson",
      seed: 1
    },
    player2: {
      id: "p2",
      name: "Jennifer Chen",
      seed: 3
    },
    winner: "player1",
    score: {
      player1Sets: 2,
      player2Sets: 1,
      sets: [
        { player1Score: 11, player2Score: 7 },
        { player1Score: 9, player2Score: 11 },
        { player1Score: 11, player2Score: 6 }
      ]
    },
    date: "2024-08-18",
    time: "15:00",
    duration: 85,
    venue: "Central Sports Complex",
    court: "Center Court",
    referee: "Mike Thompson",
    attendance: 1200
  },
  {
    id: "result-2",
    tournamentId: "completed-1",
    tournamentName: "Summer Championship 2024",
    category: "Singles",
    gender: "Men",
    ageGroup: "19+",
    stage: "Final",
    player1: {
      id: "p3",
      name: "Mike Rodriguez",
      seed: 2
    },
    player2: {
      id: "p4",
      name: "David Kim",
      seed: 1
    },
    winner: "player2",
    score: {
      player1Sets: 1,
      player2Sets: 2,
      sets: [
        { player1Score: 11, player2Score: 9 },
        { player1Score: 8, player2Score: 11 },
        { player1Score: 7, player2Score: 11 }
      ]
    },
    date: "2024-08-18",
    time: "16:30",
    duration: 92,
    venue: "Central Sports Complex",
    court: "Center Court",
    referee: "Lisa Martinez"
  },
  {
    id: "result-3",
    tournamentId: "completed-1",
    tournamentName: "Summer Championship 2024",
    category: "Doubles",
    gender: "Mixed",
    ageGroup: "19+",
    stage: "Final",
    player1: {
      id: "p5",
      name: "Maria & Carlos Gonzalez",
      seed: 1
    },
    player2: {
      id: "p6",
      name: "Rachel & Steve Miller",
      seed: 2
    },
    winner: "player1",
    score: {
      player1Sets: 2,
      player2Sets: 0,
      sets: [
        { player1Score: 11, player2Score: 8 },
        { player1Score: 11, player2Score: 9 }
      ]
    },
    date: "2024-08-18",
    time: "14:00",
    duration: 68,
    venue: "Central Sports Complex",
    court: "Court 1",
    referee: "John Wilson"
  },
  // Semifinals
  {
    id: "result-4",
    tournamentId: "completed-1",
    tournamentName: "Summer Championship 2024",
    category: "Singles",
    gender: "Women",
    ageGroup: "19+",
    stage: "Semifinal",
    player1: {
      id: "p1",
      name: "Sarah Johnson",
      seed: 1
    },
    player2: {
      id: "p7",
      name: "Lisa Martinez",
      seed: 4
    },
    winner: "player1",
    score: {
      player1Sets: 2,
      player2Sets: 0,
      sets: [
        { player1Score: 11, player2Score: 6 },
        { player1Score: 11, player2Score: 8 }
      ]
    },
    date: "2024-08-17",
    time: "15:00",
    duration: 55,
    venue: "Central Sports Complex",
    court: "Court 2"
  },
  {
    id: "result-5",
    tournamentId: "completed-1",
    tournamentName: "Summer Championship 2024",
    category: "Singles",
    gender: "Women",
    ageGroup: "19+",
    stage: "Semifinal",
    player1: {
      id: "p2",
      name: "Jennifer Chen",
      seed: 3
    },
    player2: {
      id: "p8",
      name: "Amanda Wilson",
      seed: 2
    },
    winner: "player1",
    score: {
      player1Sets: 2,
      player2Sets: 1,
      sets: [
        { player1Score: 8, player2Score: 11 },
        { player1Score: 11, player2Score: 7 },
        { player1Score: 11, player2Score: 9 }
      ]
    },
    date: "2024-08-17",
    time: "16:30",
    duration: 78,
    venue: "Central Sports Complex",
    court: "Court 2"
  },
  // Regional Open Championship Results
  {
    id: "result-6",
    tournamentId: "completed-2",
    tournamentName: "Regional Open Championship",
    category: "Doubles",
    gender: "Men",
    ageGroup: "35+",
    stage: "Final",
    player1: {
      id: "p9",
      name: "Paul & Gary Moore",
      seed: 1
    },
    player2: {
      id: "p10",
      name: "Tom & Mark Anderson",
      seed: 3
    },
    winner: "player1",
    score: {
      player1Sets: 2,
      player2Sets: 1,
      sets: [
        { player1Score: 11, player2Score: 9 },
        { player1Score: 9, player2Score: 11 },
        { player1Score: 11, player2Score: 7 }
      ]
    },
    date: "2024-07-22",
    time: "17:00",
    duration: 95,
    venue: "Phoenix Sports Center",
    court: "Championship Court",
    referee: "Robert Davis"
  },
  // State Finals 2024 Results
  {
    id: "result-7",
    tournamentId: "completed-3",
    tournamentName: "State Finals 2024",
    category: "Singles",
    gender: "Men",
    ageGroup: "50+",
    stage: "Final",
    player1: {
      id: "p11",
      name: "Frank Harrison",
      seed: 2
    },
    player2: {
      id: "p12",
      name: "William Brown",
      seed: 1
    },
    winner: "player1",
    score: {
      player1Sets: 2,
      player2Sets: 0,
      sets: [
        { player1Score: 11, player2Score: 8 },
        { player1Score: 11, player2Score: 9 }
      ]
    },
    date: "2024-06-12",
    time: "16:00",
    duration: 72,
    venue: "Metro Tennis Club",
    court: "Center Court"
  },
  // 2023 Results
  {
    id: "result-8",
    tournamentId: "completed-5",
    tournamentName: "National Championships 2023",
    category: "Singles",
    gender: "Women",
    ageGroup: "19+",
    stage: "Final",
    player1: {
      id: "p13",
      name: "Emma Davis",
      seed: 1
    },
    player2: {
      id: "p14",
      name: "Jessica Brown",
      seed: 2
    },
    winner: "player1",
    score: {
      player1Sets: 2,
      player2Sets: 1,
      sets: [
        { player1Score: 11, player2Score: 6 },
        { player1Score: 9, player2Score: 11 },
        { player1Score: 11, player2Score: 8 }
      ]
    },
    date: "2023-11-18",
    time: "15:30",
    duration: 88,
    venue: "Austin Convention Center",
    court: "Championship Court",
    referee: "Sarah Thompson"
  }
];

export const winnerSpotlights: WinnerSpotlight[] = [
  {
    playerId: "p1",
    playerName: "Sarah Johnson",
    tournamentName: "Summer Championship 2024",
    category: "Women's Singles",
    achievement: "Champion",
    prizeMoney: 12000,
    date: "2024-08-18",
    medalType: "gold"
  },
  {
    playerId: "p4",
    playerName: "David Kim",
    tournamentName: "Summer Championship 2024",
    category: "Men's Singles",
    achievement: "Champion",
    prizeMoney: 12000,
    date: "2024-08-18",
    medalType: "gold"
  },
  {
    playerId: "p5",
    playerName: "Maria & Carlos Gonzalez",
    tournamentName: "Summer Championship 2024",
    category: "Mixed Doubles",
    achievement: "Champion",
    prizeMoney: 8000,
    date: "2024-08-18",
    medalType: "gold"
  },
  {
    playerId: "p9",
    playerName: "Paul & Gary Moore",
    tournamentName: "Regional Open Championship",
    category: "Men's Doubles 35+",
    achievement: "Champion",
    prizeMoney: 5000,
    date: "2024-07-22",
    medalType: "gold"
  },
  {
    playerId: "p11",
    playerName: "Frank Harrison",
    tournamentName: "State Finals 2024",
    category: "Men's Singles 50+",
    achievement: "Champion",
    prizeMoney: 3000,
    date: "2024-06-12",
    medalType: "gold"
  },
  {
    playerId: "p13",
    playerName: "Emma Davis",
    tournamentName: "National Championships 2023",
    category: "Women's Singles",
    achievement: "Champion",
    prizeMoney: 15000,
    date: "2023-11-18",
    medalType: "gold"
  }
];

// Helper function to get matches for a tournament
export const getMatchesForTournament = (tournamentId: string): MatchResult[] => {
  return mockMatchResults.filter(match => match.tournamentId === tournamentId);
};

// Helper function to get tournament results with matches
export const getTournamentResultsWithMatches = (): TournamentResult[] => {
  return mockTournamentResults.map(tournament => ({
    ...tournament,
    matches: getMatchesForTournament(tournament.id)
  }));
};