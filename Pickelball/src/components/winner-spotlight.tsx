import { Trophy, Medal, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { WinnerSpotlight } from "../data/mock-results";

interface WinnerSpotlightProps {
  winners: WinnerSpotlight[];
  onViewPlayer?: (playerId: string) => void;
}

export function WinnerSpotlightSection({ winners, onViewPlayer }: WinnerSpotlightProps) {
  const getMedalIcon = (medalType: string) => {
    switch (medalType) {
      case 'gold':
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'silver':
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 'bronze':
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getMedalBadgeClass = (medalType: string) => {
    switch (medalType) {
      case 'gold':
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900";
      case 'silver':
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900";
      case 'bronze':
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-amber-900";
      default:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatPrizeMoney = (amount?: number) => {
    if (!amount) return null;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (winners.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-semibold">Winners Spotlight</h2>
        <Badge variant="secondary" className="text-xs">
          Recent Champions
        </Badge>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
        {winners.slice(0, 6).map((winner, index) => (
          <Card 
            key={`${winner.playerId}-${winner.tournamentName}-${index}`}
            className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-l-4 ${
              winner.medalType === 'gold' 
                ? 'border-l-yellow-500 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 dark:from-yellow-950/10 dark:to-amber-950/10'
                : winner.medalType === 'silver'
                ? 'border-l-gray-400 bg-gradient-to-br from-gray-50/50 to-slate-50/50 dark:from-gray-950/10 dark:to-slate-950/10'
                : 'border-l-amber-500 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/10 dark:to-orange-950/10'
            }`}
            onClick={() => onViewPlayer?.(winner.playerId)}
          >
            <CardContent className="p-4">
              {/* Medal Badge */}
              <div className="absolute top-2 right-2">
                <Badge className={`${getMedalBadgeClass(winner.medalType)} border-0`}>
                  {getMedalIcon(winner.medalType)}
                </Badge>
              </div>

              {/* Player Info */}
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={winner.avatar} />
                  <AvatarFallback>
                    {winner.playerName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{winner.playerName}</h3>
                  <p className="text-xs text-muted-foreground">{winner.achievement}</p>
                </div>
              </div>

              {/* Tournament & Category */}
              <div className="space-y-2 mb-3">
                <div className="text-sm font-medium truncate">{winner.tournamentName}</div>
                <Badge variant="outline" className="text-xs">{winner.category}</Badge>
              </div>

              {/* Prize & Date */}
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>{formatDate(winner.date)}</span>
                {winner.prizeMoney && (
                  <span className="font-medium text-green-600">
                    {formatPrizeMoney(winner.prizeMoney)}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {winners.slice(0, 6).map((winner, index) => (
            <Card 
              key={`${winner.playerId}-${winner.tournamentName}-${index}`}
              className={`relative min-w-[280px] snap-start transition-all duration-200 border-l-4 ${
                winner.medalType === 'gold' 
                  ? 'border-l-yellow-500 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 dark:from-yellow-950/10 dark:to-amber-950/10'
                  : winner.medalType === 'silver'
                  ? 'border-l-gray-400 bg-gradient-to-br from-gray-50/50 to-slate-50/50 dark:from-gray-950/10 dark:to-slate-950/10'
                  : 'border-l-amber-500 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/10 dark:to-orange-950/10'
              }`}
              onClick={() => onViewPlayer?.(winner.playerId)}
            >
              <CardContent className="p-4">
                {/* Medal Badge */}
                <div className="absolute top-2 right-2">
                  <Badge className={`${getMedalBadgeClass(winner.medalType)} border-0`}>
                    {getMedalIcon(winner.medalType)}
                  </Badge>
                </div>

                {/* Player Info */}
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={winner.avatar} />
                    <AvatarFallback>
                      {winner.playerName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{winner.playerName}</h3>
                    <p className="text-sm text-muted-foreground">{winner.achievement}</p>
                  </div>
                </div>

                {/* Tournament & Category */}
                <div className="space-y-2 mb-3">
                  <div className="font-medium truncate">{winner.tournamentName}</div>
                  <Badge variant="outline" className="text-xs">{winner.category}</Badge>
                </div>

                {/* Prize & Date */}
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{formatDate(winner.date)}</span>
                  {winner.prizeMoney && (
                    <span className="font-medium text-green-600">
                      {formatPrizeMoney(winner.prizeMoney)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}