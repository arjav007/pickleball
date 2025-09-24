import { Clock, MapPin, Eye, Trophy, Play } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Match } from "../data/mock-matches";
import { useState } from "react";

interface MatchCardProps {
  match: Match;
  onViewDetails: (matchId: string) => void;
}

export function MatchCard({ match, onViewDetails }: MatchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return (
          <Badge className="bg-red-600 text-white animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
            LIVE
          </Badge>
        );
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Scheduled</Badge>;
    }
  };

  const getScoreDisplay = () => {
    if (match.status === 'live' && match.liveScore) {
      return (
        <div className="text-center">
          <div className="text-lg font-bold mb-1">
            Set {match.liveScore.currentSet}: {match.liveScore.player1Score} - {match.liveScore.player2Score}
          </div>
          {match.score && match.score.sets.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Sets: {match.score.player1Sets} - {match.score.player2Sets}
            </div>
          )}
        </div>
      );
    }

    if (match.status === 'completed' && match.score && match.winner) {
      const winnerName = match.winner === 'player1' ? match.player1.name : match.player2.name;
      const loserName = match.winner === 'player1' ? match.player2.name : match.player1.name;
      
      return (
        <div className="text-center">
          <div className="text-sm font-medium mb-1">
            <span className="text-green-600">{winnerName}</span> def. <span className="text-muted-foreground">{loserName}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {match.score.sets.map((set, index) => 
              `${set.player1Score}-${set.player2Score}`
            ).join(', ')}
          </div>
        </div>
      );
    }

    return null;
  };

  const getTimeUntilMatch = () => {
    if (match.status !== 'scheduled') return null;
    
    const matchDateTime = new Date(`${match.date}T${match.time}`);
    const now = new Date();
    const diffInMinutes = Math.floor((matchDateTime.getTime() - now.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 0) return null;
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ${diffInMinutes % 60}m`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const timeUntil = getTimeUntilMatch();

  return (
    <Card className={`hover:shadow-md transition-all duration-200 border-l-4 ${
      match.status === 'live' 
        ? 'border-l-red-500 bg-red-50/50 dark:bg-red-950/10' 
        : match.status === 'completed'
        ? 'border-l-green-500'
        : 'border-l-blue-500'
    }`}>
      <CardContent className="p-4">
        {/* Tournament Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">{match.tournamentName}</span>
              <Badge variant="outline" className="text-xs">{match.stage}</Badge>
            </div>
            {getStatusBadge(match.status)}
          </div>
          
          {/* Match Category - Made More Prominent */}
          <div className="mb-3">
            <Badge variant="outline" className="text-sm font-medium px-3 py-1 bg-primary/5 border-primary/20">
              {match.category} {match.gender} {match.ageGroup}
            </Badge>
          </div>
        </div>

        {/* Players */}
        <div className="space-y-3 mb-4">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="w-10 h-10">
                <AvatarImage src={match.player1.avatar} />
                <AvatarFallback>
                  {match.player1.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{match.player1.name}</span>
            </div>

            <div className="px-4">
              {match.status === 'live' && (
                <Play className="w-6 h-6 text-red-500 animate-pulse" />
              )}
              {match.status === 'completed' && match.winner && (
                <div className="text-2xl font-bold">VS</div>
              )}
              {match.status === 'scheduled' && (
                <div className="text-2xl font-bold text-muted-foreground">VS</div>
              )}
            </div>

            <div className="flex items-center gap-3 flex-1 justify-end">
              <span className="font-medium">{match.player2.name}</span>
              <Avatar className="w-10 h-10">
                <AvatarImage src={match.player2.avatar} />
                <AvatarFallback>
                  {match.player2.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-2">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={match.player1.avatar} />
                <AvatarFallback className="text-xs">
                  {match.player1.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{match.player1.name}</span>
              {match.status === 'completed' && match.winner === 'player1' && (
                <Trophy className="w-4 h-4 text-yellow-500" />
              )}
            </div>
            <div className="text-center text-muted-foreground text-sm">vs</div>
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={match.player2.avatar} />
                <AvatarFallback className="text-xs">
                  {match.player2.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{match.player2.name}</span>
              {match.status === 'completed' && match.winner === 'player2' && (
                <Trophy className="w-4 h-4 text-yellow-500" />
              )}
            </div>
          </div>
        </div>

        {/* Score Display */}
        {getScoreDisplay() && (
          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
            {getScoreDisplay()}
          </div>
        )}

        {/* Match Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0" />
            <span>{formatTime(match.time)}</span>
            {timeUntil && (
              <Badge variant="secondary" className="text-xs ml-2">
                in {timeUntil}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{match.court} - {match.venue}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {match.status === 'live' && (
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white gap-2">
                <Play className="w-4 h-4" />
                Watch Live
              </Button>
            )}
            {match.status === 'completed' && match.score && match.score.sets.length > 2 && (
              <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm">
                    {isExpanded ? 'Hide' : 'Show'} Full Score
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(match.id)}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            Details
          </Button>
        </div>

        {/* Expanded Score Details */}
        {match.status === 'completed' && match.score && (
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleContent className="mt-4">
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Set by Set Breakdown</h4>
                <div className="space-y-2">
                  {match.score.sets.map((set, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="font-medium">Set {index + 1}</span>
                      <span className="font-medium">
                        {set.player1Score} - {set.player2Score}
                      </span>
                    </div>
                  ))}
                  {match.duration && (
                    <div className="flex justify-between items-center p-2 text-sm text-muted-foreground">
                      <span>Duration</span>
                      <span>{Math.floor(match.duration / 60)}h {match.duration % 60}m</span>
                    </div>
                  )}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}