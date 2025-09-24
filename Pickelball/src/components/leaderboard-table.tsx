import { TrendingUp, TrendingDown, Minus, Crown, Medal, Award, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Player } from "../data/mock-players";

interface LeaderboardTableProps {
  players: Player[];
  onViewProfile: (playerId: string) => void;
}

export function LeaderboardTable({ players, onViewProfile }: LeaderboardTableProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return null;
  };

  const getRankChangeIcon = (change: number | undefined) => {
    if (!change || change === 0) return <Minus className="w-4 h-4 text-muted-foreground" />;
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getRankChangeText = (change: number | undefined) => {
    if (!change || change === 0) return "";
    return change > 0 ? `+${change}` : `${change}`;
  };

  const getWinRate = (wins: number, losses: number) => {
    const total = wins + losses;
    if (total === 0) return 0;
    return Math.round((wins / total) * 100);
  };

  const getRankBackgroundClass = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20";
    if (rank === 2) return "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20";
    if (rank === 3) return "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20";
    return "";
  };

  if (players.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <Crown className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No players found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters to find more players.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Region</TableHead>
              <TableHead className="text-center">Points</TableHead>
              <TableHead className="text-center">Matches</TableHead>
              <TableHead className="text-center">W-L Record</TableHead>
              <TableHead className="text-center">Win Rate</TableHead>
              <TableHead className="text-center">Change</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player) => (
              <TableRow 
                key={player.id} 
                className={`hover:bg-muted/50 transition-colors ${getRankBackgroundClass(player.currentRank)}`}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getRankIcon(player.currentRank)}
                    <span className="font-medium text-lg">#{player.currentRank}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback>
                        {player.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="flex gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">{player.category}</Badge>
                        <Badge variant="secondary" className="text-xs">{player.ageGroup}</Badge>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{player.region}</div>
                    <div className="text-sm text-muted-foreground">{player.city}</div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-medium text-lg">{player.points.toLocaleString()}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-medium">{player.matchesPlayed}</span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="space-y-1">
                    <div className="font-medium">
                      <span className="text-green-600">{player.wins}</span>
                      <span className="text-muted-foreground mx-1">-</span>
                      <span className="text-red-600">{player.losses}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant={getWinRate(player.wins, player.losses) >= 70 ? "default" : "secondary"}
                    className="font-medium"
                  >
                    {getWinRate(player.wins, player.losses)}%
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    {getRankChangeIcon(player.rankChange)}
                    <span className="text-sm font-medium">
                      {getRankChangeText(player.rankChange)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onViewProfile(player.id)}
                    className="gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {players.map((player) => (
          <Card key={player.id} className={`${getRankBackgroundClass(player.currentRank)}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getRankIcon(player.currentRank)}
                    <span className="font-bold text-xl">#{player.currentRank}</span>
                  </div>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={player.avatar} />
                    <AvatarFallback>
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex items-center gap-1">
                  {getRankChangeIcon(player.rankChange)}
                  <span className="text-sm font-medium">
                    {getRankChangeText(player.rankChange)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{player.name}</h3>
                
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">{player.category}</Badge>
                  <Badge variant="secondary" className="text-xs">{player.ageGroup}</Badge>
                  <Badge variant="outline" className="text-xs">{player.gender}</Badge>
                </div>

                <div className="text-sm text-muted-foreground">
                  {player.city}, {player.region}
                </div>

                <div className="grid grid-cols-3 gap-4 py-3">
                  <div className="text-center">
                    <div className="font-bold text-lg">{player.points.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{player.matchesPlayed}</div>
                    <div className="text-xs text-muted-foreground">Matches</div>
                  </div>
                  <div className="text-center">
                    <Badge 
                      variant={getWinRate(player.wins, player.losses) >= 70 ? "default" : "secondary"}
                      className="font-medium"
                    >
                      {getWinRate(player.wins, player.losses)}%
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">Win Rate</div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">{player.wins}W</span>
                    <span className="text-muted-foreground mx-1">-</span>
                    <span className="text-red-600 font-medium">{player.losses}L</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onViewProfile(player.id)}
                    className="gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Points Calculation Info */}
      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          Rankings are calculated based on official tournament results and updated after each event.
          <br />
          Points are awarded based on tournament level, opponent strength, and match results.
        </p>
      </div>
    </div>
  );
}