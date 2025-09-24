import { useState, useMemo } from "react";
import { Users, Star, Award, ChevronUp, ChevronDown, Eye, Verified } from "lucide-react";
import { PlayerFilters, PlayerFilters as FilterType } from "./player-filters";
import { PlayerCard } from "./player-card";
import { PlayerProfile } from "./player-profile";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { mockPlayers, Player } from "../data/mock-players";
import { toast } from "sonner@2.0.3";

interface PlayersPageProps {
  onBack: () => void;
}

export function PlayersPage({ onBack }: PlayersPageProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'points' | 'winRate' | 'matchesPlayed' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState<FilterType>({
    category: "All",
    gender: "All",
    ageGroup: "All",
    region: "All",
    rankTier: "All",
    searchQuery: "",
  });

  // Helper function to add default fields to players without complete data
  const getPlayerWithDefaults = (player: Player): Player => ({
    ...player,
    bio: player.bio || "Dedicated pickleball player competing at the highest level.",
    age: player.age || 30,
    isVerified: player.isVerified ?? (player.currentRank <= 10),
    recentHighlight: player.recentHighlight || "Active competitor",
    achievements: player.achievements || ["Tournament Participant", "Ranked Player"],
    tournamentHistory: player.tournamentHistory || [
      { 
        id: "default", 
        tournamentName: "Recent Tournament", 
        date: "2024-06-01", 
        result: "Participant", 
        category: player.category, 
        location: `${player.city}, ${player.region}` 
      }
    ],
    socialMedia: player.socialMedia || {},
    playingSince: player.playingSince || 2020
  });

  const players = mockPlayers.map(getPlayerWithDefaults);
  const selectedPlayer = selectedPlayerId ? players.find(p => p.id === selectedPlayerId) : null;

  const filteredPlayers = useMemo(() => {
    let filtered = [...players];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(query) ||
        player.city.toLowerCase().includes(query) ||
        player.region.toLowerCase().includes(query) ||
        player.id.includes(query)
      );
    }

    // Category filter
    if (filters.category && filters.category !== "All") {
      filtered = filtered.filter(player => player.category === filters.category);
    }

    // Gender filter
    if (filters.gender && filters.gender !== "All") {
      filtered = filtered.filter(player => player.gender === filters.gender);
    }

    // Age Group filter
    if (filters.ageGroup && filters.ageGroup !== "All") {
      filtered = filtered.filter(player => player.ageGroup === filters.ageGroup);
    }

    // Region filter
    if (filters.region && filters.region !== "All") {
      filtered = filtered.filter(player => player.region === filters.region);
    }

    // Rank Tier filter
    if (filters.rankTier && filters.rankTier !== "All") {
      switch (filters.rankTier) {
        case "Top 10":
          filtered = filtered.filter(player => player.currentRank <= 10);
          break;
        case "Top 25":
          filtered = filtered.filter(player => player.currentRank <= 25);
          break;
        case "Top 50":
          filtered = filtered.filter(player => player.currentRank <= 50);
          break;
        case "Top 100":
          filtered = filtered.filter(player => player.currentRank <= 100);
          break;
        case "Unranked":
          filtered = filtered.filter(player => player.currentRank > 100);
          break;
      }
    }

    // Sort by current rank
    if (sortField) {
      filtered = filtered.sort((a, b) => {
        if (sortField === 'points') {
          return sortDirection === 'asc' ? a.points - b.points : b.points - a.points;
        } else if (sortField === 'winRate') {
          const winRateA = a.matchesPlayed > 0 ? (a.wins / a.matchesPlayed) * 100 : 0;
          const winRateB = b.matchesPlayed > 0 ? (b.wins / b.matchesPlayed) * 100 : 0;
          return sortDirection === 'asc' ? winRateA - winRateB : winRateB - winRateA;
        } else if (sortField === 'matchesPlayed') {
          return sortDirection === 'asc' ? a.matchesPlayed - b.matchesPlayed : b.matchesPlayed - a.matchesPlayed;
        }
        return a.currentRank - b.currentRank;
      });
    }

    return filtered;
  }, [players, filters, sortField, sortDirection]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category && filters.category !== "All") count++;
    if (filters.gender && filters.gender !== "All") count++;
    if (filters.ageGroup && filters.ageGroup !== "All") count++;
    if (filters.region && filters.region !== "All") count++;
    if (filters.rankTier && filters.rankTier !== "All") count++;
    return count;
  }, [filters]);

  const handleViewProfile = (playerId: string) => {
    setSelectedPlayerId(playerId);
  };

  const handleBackToDirectory = () => {
    setSelectedPlayerId(null);
  };

  const getTopPlayers = () => {
    return players.filter(p => p.currentRank <= 3).sort((a, b) => a.currentRank - b.currentRank);
  };

  const getVerifiedCount = () => {
    return players.filter(p => p.isVerified).length;
  };

  const getActivePlayers = () => {
    // Mock calculation for active players in last 30 days - in real app would use actual activity data
    return Math.floor(players.length * 0.7); // Assume 70% of players are active in last 30 days
  };

  const getAverageWinRate = () => {
    const totalWinRate = players.reduce((sum, player) => {
      const winRate = player.matchesPlayed > 0 ? (player.wins / player.matchesPlayed) * 100 : 0;
      return sum + winRate;
    }, 0);
    return Math.round(totalWinRate / players.length);
  };

  const getTotalMatches = () => {
    return players.reduce((sum, p) => sum + p.matchesPlayed, 0);
  };

  const handleSort = (field: 'points' | 'winRate' | 'matchesPlayed') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getWinRateColor = (winRate: number) => {
    if (winRate >= 70) return 'text-green-600';
    if (winRate >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRankBackground = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20';
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20';
    if (rank === 3) return 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20';
    return '';
  };

  // Show player profile if one is selected
  if (selectedPlayer) {
    return (
      <PlayerProfile
        player={selectedPlayer}
        onBack={handleBackToDirectory}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-background to-muted/20 border-b border-border/50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Players
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse pickleball players, check their stats, and explore their journey. Discover the community of passionate competitors.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{players.length}</div>
                <div className="text-sm text-muted-foreground">Total Players</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{getActivePlayers()}</div>
                <div className="text-sm text-muted-foreground">Active Players (Last 30 Days)</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{getAverageWinRate()}%</div>
                <div className="text-sm text-muted-foreground">Average Win Rate (Community)</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {getTotalMatches()}
                </div>
                <div className="text-sm text-muted-foreground">Total Matches Played</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <PlayerFilters
            filters={filters}
            onFiltersChange={setFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Top Players Spotlight */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold">Top 3 Players</h2>
            <Badge variant="secondary" className="text-xs">
              Current Rankings
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {getTopPlayers().map((player, index) => (
              <Card 
                key={player.id}
                className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-l-4 ${
                  index === 0 
                    ? 'border-l-yellow-500 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 dark:from-yellow-950/10 dark:to-amber-950/10'
                    : index === 1
                    ? 'border-l-gray-400 bg-gradient-to-br from-gray-50/50 to-slate-50/50 dark:from-gray-950/10 dark:to-slate-950/10'
                    : 'border-l-amber-500 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/10 dark:to-orange-950/10'
                }`}
                onClick={() => handleViewProfile(player.id)}
              >
                <CardContent className="p-6">
                  {/* Rank Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className={`${
                      index === 0 
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900'
                        : index === 1
                        ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900'
                        : 'bg-gradient-to-r from-amber-400 to-amber-600 text-amber-900'
                    } border-0 text-lg font-bold px-3 py-1`}>
                      #{player.currentRank}
                    </Badge>
                  </div>

                  {/* Player Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                        index === 0 ? 'from-yellow-200 to-yellow-300' : 
                        index === 1 ? 'from-gray-200 to-gray-300' : 
                        'from-amber-200 to-amber-300'
                      } flex items-center justify-center text-2xl font-bold`}>
                        {player.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {index === 0 && (
                        <div className="absolute -top-2 -right-2">
                          <Award className="w-6 h-6 text-yellow-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg truncate">{player.name}</h3>
                      <p className="text-sm text-muted-foreground">{player.city}, {player.region}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {player.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {player.ageGroup}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">{player.points}</div>
                      <div className="text-xs text-muted-foreground">Points</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">
                        {Math.round((player.wins / player.matchesPlayed) * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Win Rate</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{player.matchesPlayed}</div>
                      <div className="text-xs text-muted-foreground">Matches</div>
                    </div>
                  </div>

                  {/* Recent Highlight */}
                  {player.recentHighlight && (
                    <div className="mt-4 p-2 bg-background/50 rounded text-center">
                      <div className="text-xs font-medium">{player.recentHighlight}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />
        </div>

        {/* Player Directory */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">
              {filteredPlayers.length} Player{filteredPlayers.length !== 1 ? 's' : ''} Found
            </h2>
            {(filters.searchQuery || activeFilterCount > 0) && (
              <span className="text-sm text-muted-foreground">
                {filters.searchQuery && `for "${filters.searchQuery}"`}
                {activeFilterCount > 0 && ` with ${activeFilterCount} filter${activeFilterCount !== 1 ? 's' : ''}`}
              </span>
            )}
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{filteredPlayers.length} Total</span>
            </div>
          </div>
        </div>

        {/* Players Table */}
        {filteredPlayers.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Users className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No players found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to find more players.
            </p>
            <Button variant="outline" onClick={() => setFilters({
              category: "All",
              gender: "All",
              ageGroup: "All",
              region: "All",
              rankTier: "All",
              searchQuery: "",
            })}>
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="rounded-lg border bg-card">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 select-none"
                      onClick={() => handleSort('points')}
                    >
                      <div className="flex items-center gap-1">
                        Points
                        {sortField === 'points' && (
                          sortDirection === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 select-none"
                      onClick={() => handleSort('winRate')}
                    >
                      <div className="flex items-center gap-1">
                        Win Rate
                        {sortField === 'winRate' && (
                          sortDirection === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 select-none"
                      onClick={() => handleSort('matchesPlayed')}
                    >
                      <div className="flex items-center gap-1">
                        Matches
                        {sortField === 'matchesPlayed' && (
                          sortDirection === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Recent Highlight</TableHead>
                    <TableHead className="w-32">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlayers.map((player) => {
                    const winRate = player.matchesPlayed > 0 ? Math.round((player.wins / player.matchesPlayed) * 100) : 0;
                    const rankBg = getRankBackground(player.currentRank);
                    
                    return (
                      <TableRow 
                        key={player.id} 
                        className={`hover:bg-muted/50 transition-colors ${rankBg}`}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">#{player.currentRank}</span>
                            {player.currentRank <= 3 && (
                              <Award className={`w-4 h-4 ${
                                player.currentRank === 1 ? 'text-yellow-500' : 
                                player.currentRank === 2 ? 'text-gray-400' : 'text-amber-500'
                              }`} />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center text-sm font-medium">
                              {player.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{player.name}</span>
                                {player.isVerified && <Verified className="w-4 h-4 text-blue-500" />}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">{player.city}, {player.region}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {player.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {player.ageGroup}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{player.points}</span>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${getWinRateColor(winRate)}`}>
                            {winRate}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{player.matchesPlayed}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {player.recentHighlight || 'Active Competitor'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewProfile(player.id)}
                            className="gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {filteredPlayers.map((player) => {
                const winRate = player.matchesPlayed > 0 ? Math.round((player.wins / player.matchesPlayed) * 100) : 0;
                const rankBg = getRankBackground(player.currentRank);
                
                return (
                  <Card key={player.id} className={`${rankBg}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center font-medium">
                            {player.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{player.name}</h3>
                              {player.isVerified && <Verified className="w-4 h-4 text-blue-500" />}
                            </div>
                            <p className="text-sm text-muted-foreground">{player.city}, {player.region}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">#{player.currentRank}</span>
                          {player.currentRank <= 3 && (
                            <Award className={`w-4 h-4 ${
                              player.currentRank === 1 ? 'text-yellow-500' : 
                              player.currentRank === 2 ? 'text-gray-400' : 'text-amber-500'
                            }`} />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">{player.category}</Badge>
                        <Badge variant="outline" className="text-xs">{player.ageGroup}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3 text-center">
                        <div>
                          <div className="font-medium">{player.points}</div>
                          <div className="text-xs text-muted-foreground">Points</div>
                        </div>
                        <div>
                          <div className={`font-medium ${getWinRateColor(winRate)}`}>{winRate}%</div>
                          <div className="text-xs text-muted-foreground">Win Rate</div>
                        </div>
                        <div>
                          <div className="font-medium">{player.matchesPlayed}</div>
                          <div className="text-xs text-muted-foreground">Matches</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-3">
                        {player.recentHighlight || 'Active Competitor'}
                      </div>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewProfile(player.id)}
                        className="w-full gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}