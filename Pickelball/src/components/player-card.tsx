import { useState } from "react";
import { MapPin, TrendingUp, TrendingDown, Minus, Eye, Verified, Trophy, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Player } from "../data/mock-players";

interface PlayerCardProps {
  player: Player;
  onViewProfile: (playerId: string) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export function PlayerCard({ player, onViewProfile, isExpanded, onToggleExpand }: PlayerCardProps) {
  const [localExpanded, setLocalExpanded] = useState(false);
  const expanded = isExpanded !== undefined ? isExpanded : localExpanded;
  const toggleExpand = onToggleExpand || (() => setLocalExpanded(!localExpanded));

  const getRankChangeIcon = () => {
    if (!player.rankChange || player.rankChange === 0) {
      return <Minus className="w-3 h-3 text-muted-foreground" />;
    }
    return player.rankChange > 0 
      ? <TrendingUp className="w-3 h-3 text-green-500" />
      : <TrendingDown className="w-3 h-3 text-red-500" />;
  };

  const getRankChangeText = () => {
    if (!player.rankChange || player.rankChange === 0) return "No change";
    return player.rankChange > 0 
      ? `+${player.rankChange} positions`
      : `${player.rankChange} positions`;
  };

  const getRankChangeColor = () => {
    if (!player.rankChange || player.rankChange === 0) return "text-muted-foreground";
    return player.rankChange > 0 ? "text-green-600" : "text-red-600";
  };

  const getWinPercentage = () => {
    if (player.matchesPlayed === 0) return 0;
    return Math.round((player.wins / player.matchesPlayed) * 100);
  };

  const getRankBadgeColor = () => {
    if (player.currentRank <= 3) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900";
    if (player.currentRank <= 10) return "bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900";
    if (player.currentRank <= 25) return "bg-gradient-to-r from-amber-400 to-amber-600 text-amber-900";
    return "bg-gradient-to-r from-blue-400 to-blue-600 text-blue-900";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group border-l-4 border-l-primary/50">
      <CardContent className="p-4 md:p-6">
        {/* Main Card Content */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <Avatar className="w-16 h-16 md:w-20 md:h-20">
              <AvatarImage src={player.avatar} />
              <AvatarFallback className="text-lg font-semibold">
                {player.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            {/* Player Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg truncate">{player.name}</h3>
                    {player.isVerified && (
                      <Verified className="w-5 h-5 text-blue-500 shrink-0" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{player.city}, {player.region}</span>
                  </div>
                </div>

                {/* Rank Badge */}
                <Badge className={`${getRankBadgeColor()} border-0 text-sm font-bold px-3 py-1`}>
                  #{player.currentRank}
                </Badge>
              </div>

              {/* Category & Stats */}
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="text-xs">
                  {player.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {player.gender}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {player.ageGroup}
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">{player.points}</div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">{getWinPercentage()}%</div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
            </div>
            <div>
              <div className="text-lg font-bold">{player.matchesPlayed}</div>
              <div className="text-xs text-muted-foreground">Matches</div>
            </div>
          </div>

          {/* Recent Highlight */}
          {player.recentHighlight && (
            <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
              <Trophy className="w-4 h-4 text-yellow-500 shrink-0" />
              <span className="text-sm font-medium truncate">{player.recentHighlight}</span>
            </div>
          )}

          {/* Rank Change */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getRankChangeIcon()}
              <span className={`text-sm ${getRankChangeColor()}`}>
                {getRankChangeText()}
              </span>
            </div>

            <div className="flex gap-2">
              {/* Mobile Expand Button */}
              <Collapsible open={expanded} onOpenChange={toggleExpand}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    {expanded ? "Less" : "More"}
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>

              {/* View Profile Button */}
              <Button 
                onClick={() => onViewProfile(player.id)}
                size="sm" 
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">View Profile</span>
                <span className="sm:hidden">Profile</span>
              </Button>
            </div>
          </div>

          {/* Expandable Quick Stats (Mobile) */}
          <Collapsible open={expanded} onOpenChange={toggleExpand}>
            <CollapsibleContent className="lg:hidden">
              <div className="mt-4 pt-4 border-t space-y-4">
                {/* Detailed Stats */}
                <div>
                  <h4 className="font-medium mb-2">Match Record</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wins:</span>
                      <span className="font-medium text-green-600">{player.wins}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Losses:</span>
                      <span className="font-medium text-red-600">{player.losses}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Tournament */}
                {player.tournamentHistory && player.tournamentHistory[0] && (
                  <div>
                    <h4 className="font-medium mb-2">Recent Tournament</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{player.tournamentHistory[0].tournamentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Result:</span>
                        <span className="font-medium">{player.tournamentHistory[0].result}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{formatDate(player.tournamentHistory[0].date)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Achievements Preview */}
                {player.achievements && player.achievements.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Top Achievements</h4>
                    <div className="space-y-1">
                      {player.achievements.slice(0, 2).map((achievement, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          • {achievement}
                        </div>
                      ))}
                      {player.achievements.length > 2 && (
                        <div className="text-sm text-muted-foreground">
                          • +{player.achievements.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Desktop Hover Content */}
        <div className="hidden lg:block absolute inset-0 bg-background/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-lg p-6">
          <div className="h-full flex flex-col justify-center space-y-4">
            {/* Player Summary */}
            <div className="text-center">
              <h3 className="font-bold text-xl mb-2">{player.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {player.bio || "Professional pickleball player"}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">{player.points}</div>
                <div className="text-sm text-muted-foreground">Ranking Points</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{getWinPercentage()}%</div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
              </div>
            </div>

            {/* CTA */}
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onViewProfile(player.id);
              }}
              className="w-full gap-2"
            >
              <Eye className="w-4 h-4" />
              View Full Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}