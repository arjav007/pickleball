import { useState } from "react";
import { Clock, MapPin, Eye, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Separator } from "./ui/separator";
import { MatchResult } from "../data/mock-results";

interface ResultCardProps {
  match: MatchResult;
  onViewDetails: (matchId: string) => void;
}

export function ResultCard({ match, onViewDetails }: ResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getWinner = () => {
    return match.winner === 'player1' ? match.player1 : match.player2;
  };

  const getLoser = () => {
    return match.winner === 'player1' ? match.player2 : match.player1;
  };

  const getScoreDisplay = () => {
    return match.score.sets.map((set, index) => 
      `${set.player1Score}-${set.player2Score}`
    ).join(', ');
  };

  const getStageBadgeColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'final':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700';
      case 'semifinal':
        return 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700';
      case 'quarterfinal':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-700';
    }
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-green-500">
      <CardContent className="p-4">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">{match.tournamentName}</span>
              <Badge 
                variant="outline" 
                className={`text-xs ${getStageBadgeColor(match.stage)}`}
              >
                {match.stage}
              </Badge>
            </div>
            <Badge variant="secondary" className="text-xs">
              Completed
            </Badge>
          </div>
          
          {/* Match Category - Made More Prominent */}
          <div className="mb-3">
            <Badge variant="outline" className="text-sm font-medium px-3 py-1 bg-primary/5 border-primary/20">
              {match.category} {match.gender} {match.ageGroup}
            </Badge>
          </div>
        </div>

        {/* Result Display */}
        <div className="space-y-4">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between">
              {/* Winner */}
              <div className="flex items-center gap-3 flex-1">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={getWinner().avatar} />
                  <AvatarFallback>
                    {getWinner().name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-600">{getWinner().name}</span>
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    {getWinner().seed && (
                      <Badge variant="outline" className="text-xs">
                        #{getWinner().seed}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">Winner</div>
                </div>
              </div>

              {/* Score */}
              <div className="px-6 text-center">
                <div className="text-lg font-bold mb-1">
                  {match.score.player1Sets} - {match.score.player2Sets}
                </div>
                <div className="text-sm text-muted-foreground">
                  ({getScoreDisplay()})
                </div>
              </div>

              {/* Loser */}
              <div className="flex items-center gap-3 flex-1 justify-end">
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    {getLoser().seed && (
                      <Badge variant="outline" className="text-xs">
                        #{getLoser().seed}
                      </Badge>
                    )}
                    <span className="font-medium text-muted-foreground">{getLoser().name}</span>
                  </div>
                </div>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={getLoser().avatar} />
                  <AvatarFallback>
                    {getLoser().name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-3">
            {/* Winner */}
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <Avatar className="w-10 h-10">
                <AvatarImage src={getWinner().avatar} />
                <AvatarFallback>
                  {getWinner().name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-green-600">{getWinner().name}</span>
                  <Trophy className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="text-xs text-green-600">Winner</div>
              </div>
              {getWinner().seed && (
                <Badge variant="outline" className="text-xs">
                  #{getWinner().seed}
                </Badge>
              )}
            </div>

            {/* Score */}
            <div className="text-center py-2">
              <div className="text-lg font-bold mb-1">
                {match.score.player1Sets} - {match.score.player2Sets}
              </div>
              <div className="text-sm text-muted-foreground">
                ({getScoreDisplay()})
              </div>
            </div>

            {/* Loser */}
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Avatar className="w-10 h-10">
                <AvatarImage src={getLoser().avatar} />
                <AvatarFallback>
                  {getLoser().name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <span className="font-medium text-muted-foreground">{getLoser().name}</span>
              </div>
              {getLoser().seed && (
                <Badge variant="outline" className="text-xs">
                  #{getLoser().seed}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Match Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0" />
            <span>{formatDate(match.date)} • {formatTime(match.time)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{match.court} • {match.venue}</span>
          </div>
        </div>

        {/* Actions & Expandable Details */}
        <div className="flex items-center justify-between mt-4">
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {isExpanded ? 'Hide' : 'Show'} Details
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(match.id)}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            View Match
          </Button>
        </div>

        {/* Expanded Details */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent className="mt-4">
            <Separator className="mb-4" />
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Set by Set Breakdown</h4>
                <div className="space-y-2">
                  {match.score.sets.map((set, index) => {
                    const isPlayer1Winner = match.winner === 'player1';
                    const winnerScore = isPlayer1Winner ? set.player1Score : set.player2Score;
                    const loserScore = isPlayer1Winner ? set.player2Score : set.player1Score;
                    
                    return (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded">
                        <span className="font-medium">Set {index + 1}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">
                            <span className="font-semibold text-green-600">{getWinner().name}</span>
                          </span>
                          <span className="font-bold text-lg">
                            {isPlayer1Winner ? `${set.player1Score} - ${set.player2Score}` : `${set.player2Score} - ${set.player1Score}`}
                          </span>
                          <span className="text-sm">
                            <span className="text-muted-foreground">{getLoser().name}</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Additional Match Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{formatDuration(match.duration)}</span>
                  </div>
                  {match.referee && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Referee:</span>
                      <span className="font-medium">{match.referee}</span>
                    </div>
                  )}
                  {match.attendance && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Attendance:</span>
                      <span className="font-medium">{match.attendance.toLocaleString()}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Court:</span>
                    <span className="font-medium">{match.court}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Venue:</span>
                    <span className="font-medium">{match.venue}</span>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}