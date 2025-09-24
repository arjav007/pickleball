export interface Match {
  id: string;
  tournamentId: string;
  tournamentName: string;
  player1: {
    id: string;
    name: string;
    avatar?: string;
  };
  player2: {
    id: string;
    name: string;
    avatar?: string;
  };
  category: string; // Singles, Doubles, Mixed
  gender: string; // Men, Women, Mixed
  ageGroup: string;
  stage: string; // Qualification, Round 1, Quarterfinal, Semifinal, Final
  venue: string;
  court: string;
  date: string; // ISO date string
  time: string; // HH:MM format
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  score?: {
    player1Sets: number;
    player2Sets: number;
    sets: Array<{
      player1Score: number;
      player2Score: number;
    }>;
  };
  winner?: string; // player1 or player2
  duration?: number; // in minutes
  liveScore?: {
    currentSet: number;
    player1Score: number;
    player2Score: number;
    server: 'player1' | 'player2';
  };
}

export const mockMatches: Match[] = [
  // Live Matches
  {
    id: "live-1",
    tournamentId: "1",
    tournamentName: "Summer Championship 2024",
    player1: { id: "p1", name: "Sarah Johnson" },
    player2: { id: "p2", name: "Jennifer Chen" },
    category: "Singles",
    gender: "Women",
    ageGroup: "19+",
    stage: "Semifinal",
    venue: "Central Sports Complex",
    court: "Court 1",
    date: "2024-09-20",
    time: "14:30",
    status: "live",
    liveScore: {
      currentSet: 2,
      player1Score: 8,
      player2Score: 10,
      server: "player2"
    },
    score: {
      player1Sets: 1,
      player2Sets: 0,
      sets: [
        { player1Score: 11, player2Score: 7 },
        { player1Score: 8, player2Score: 10 }
      ]
    }
  },
  {
    id: "live-2",
    tournamentId: "1",
    tournamentName: "Summer Championship 2024",
    player1: { id: "p3", name: "Mike Rodriguez & David Kim" },
    player2: { id: "p4", name: "Tom Anderson & Mark Johnson" },
    category: "Doubles",
    gender: "Men",
    ageGroup: "19+",
    stage: "Final",
    venue: "Central Sports Complex",
    court: "Court 2",
    date: "2024-09-20",
    time: "16:00",
    status: "live",
    liveScore: {
      currentSet: 1,
      player1Score: 5,
      player2Score: 3,
      server: "player1"
    },
    score: {
      player1Sets: 0,
      player2Sets: 0,
      sets: [
        { player1Score: 5, player2Score: 3 }
      ]
    }
  },

  // Today's Scheduled Matches
  {
    id: "today-1",
    tournamentId: "1",
    tournamentName: "Summer Championship 2024",
    player1: { id: "p5", name: "Lisa Martinez" },
    player2: { id: "p6", name: "Amanda Wilson" },
    category: "Singles",
    gender: "Women",
    ageGroup: "35+",
    stage: "Quarterfinal",
    venue: "Central Sports Complex",
    court: "Court 3",
    date: "2024-09-20",
    time: "18:00",
    status: "scheduled"
  },
  {
    id: "today-2",
    tournamentId: "2",
    tournamentName: "Regional Open",
    player1: { id: "p7", name: "Maria & Carlos Gonzalez" },
    player2: { id: "p8", name: "Rachel & Steve Miller" },
    category: "Doubles",
    gender: "Mixed",
    ageGroup: "19+",
    stage: "Semifinal",
    venue: "Phoenix Sports Center",
    court: "Court 1",
    date: "2024-09-20",
    time: "19:30",
    status: "scheduled"
  },

  // Tomorrow's Matches
  {
    id: "tomorrow-1",
    tournamentId: "1",
    tournamentName: "Summer Championship 2024",
    player1: { id: "p9", name: "Robert Thompson" },
    player2: { id: "p10", name: "James Parker" },
    category: "Singles",
    gender: "Men",
    ageGroup: "35+",
    stage: "Final",
    venue: "Central Sports Complex",
    court: "Court 1",
    date: "2024-09-21",
    time: "10:00",
    status: "scheduled"
  },
  {
    id: "tomorrow-2",
    tournamentId: "2",
    tournamentName: "Regional Open",
    player1: { id: "p11", name: "Kate & Michelle Taylor" },
    player2: { id: "p12", name: "Anna & Linda White" },
    category: "Doubles",
    gender: "Women",
    ageGroup: "19+",
    stage: "Final",
    venue: "Phoenix Sports Center",
    court: "Court 2",
    date: "2024-09-21",
    time: "14:00",
    status: "scheduled"
  },
  {
    id: "tomorrow-3",
    tournamentId: "3",
    tournamentName: "State Finals",
    player1: { id: "p13", name: "Frank Harrison" },
    player2: { id: "p14", name: "William Brown" },
    category: "Singles",
    gender: "Men",
    ageGroup: "50+",
    stage: "Semifinal",
    venue: "Metro Tennis Club",
    court: "Court 1",
    date: "2024-09-21",
    time: "16:30",
    status: "scheduled"
  },

  // Future Matches
  {
    id: "future-1",
    tournamentId: "3",
    tournamentName: "State Finals",
    player1: { id: "p15", name: "Susan Williams" },
    player2: { id: "p16", name: "Helen Jackson" },
    category: "Singles",
    gender: "Women",
    ageGroup: "50+",
    stage: "Final",
    venue: "Metro Tennis Club",
    court: "Court 1",
    date: "2024-09-22",
    time: "11:00",
    status: "scheduled"
  },
  {
    id: "future-2",
    tournamentId: "4",
    tournamentName: "City Championship",
    player1: { id: "p17", name: "John Smith" },
    player2: { id: "p18", name: "Alex Johnson" },
    category: "Singles",
    gender: "Men",
    ageGroup: "19+",
    stage: "Round 1",
    venue: "Community Sports Center",
    court: "Court 4",
    date: "2024-09-23",
    time: "09:00",
    status: "scheduled"
  },

  // Completed Matches (Yesterday)
  {
    id: "completed-1",
    tournamentId: "1",
    tournamentName: "Summer Championship 2024",
    player1: { id: "p19", name: "Emma Davis" },
    player2: { id: "p20", name: "Jessica Brown" },
    category: "Singles",
    gender: "Women",
    ageGroup: "35+",
    stage: "Quarterfinal",
    venue: "Central Sports Complex",
    court: "Court 2",
    date: "2024-09-19",
    time: "15:00",
    status: "completed",
    winner: "player1",
    duration: 75,
    score: {
      player1Sets: 2,
      player2Sets: 1,
      sets: [
        { player1Score: 11, player2Score: 8 },
        { player1Score: 9, player2Score: 11 },
        { player1Score: 11, player2Score: 6 }
      ]
    }
  },
  {
    id: "completed-2",
    tournamentId: "2",
    tournamentName: "Regional Open",
    player1: { id: "p21", name: "Paul & Gary Moore" },
    player2: { id: "p22", name: "Steve & Mark Davis" },
    category: "Doubles",
    gender: "Men",
    ageGroup: "35+",
    stage: "Quarterfinal",
    venue: "Phoenix Sports Center",
    court: "Court 3",
    date: "2024-09-19",
    time: "17:30",
    status: "completed",
    winner: "player1",
    duration: 90,
    score: {
      player1Sets: 2,
      player2Sets: 0,
      sets: [
        { player1Score: 11, player2Score: 9 },
        { player1Score: 11, player2Score: 7 }
      ]
    }
  },
  {
    id: "completed-3",
    tournamentId: "1",
    tournamentName: "Summer Championship 2024",
    player1: { id: "p23", name: "Mixed Team Alpha" },
    player2: { id: "p24", name: "Mixed Team Beta" },
    category: "Mixed",
    gender: "Mixed",
    ageGroup: "19+",
    stage: "Semifinal",
    venue: "Central Sports Complex",
    court: "Court 1",
    date: "2024-09-19",
    time: "20:00",
    status: "completed",
    winner: "player2",
    duration: 105,
    score: {
      player1Sets: 1,
      player2Sets: 2,
      sets: [
        { player1Score: 11, player2Score: 4 },
        { player1Score: 8, player2Score: 11 },
        { player1Score: 9, player2Score: 11 }
      ]
    }
  },

  // More completed matches from earlier dates
  {
    id: "completed-4",
    tournamentId: "3",
    tournamentName: "State Finals",
    player1: { id: "p25", name: "Nancy Clark" },
    player2: { id: "p26", name: "Dorothy Lewis" },
    category: "Singles",
    gender: "Women",
    ageGroup: "50+",
    stage: "Quarterfinal",
    venue: "Metro Tennis Club",
    court: "Court 2",
    date: "2024-09-18",
    time: "10:30",
    status: "completed",
    winner: "player1",
    duration: 65,
    score: {
      player1Sets: 2,
      player2Sets: 0,
      sets: [
        { player1Score: 11, player2Score: 5 },
        { player1Score: 11, player2Score: 8 }
      ]
    }
  },
  {
    id: "completed-5",
    tournamentId: "3",
    tournamentName: "State Finals",
    player1: { id: "p27", name: "Richard & Charles Wilson" },
    player2: { id: "p28", name: "George & Edward Taylor" },
    category: "Doubles",
    gender: "Men",
    ageGroup: "50+",
    stage: "Semifinals",
    venue: "Metro Tennis Club",
    court: "Court 1",
    date: "2024-09-18",
    time: "14:00",
    status: "completed",
    winner: "player2",
    duration: 95,
    score: {
      player1Sets: 0,
      player2Sets: 2,
      sets: [
        { player1Score: 7, player2Score: 11 },
        { player1Score: 9, player2Score: 11 }
      ]
    }
  }
];