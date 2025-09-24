import { ArrowLeft, MapPin, Calendar, Trophy, TrendingUp, TrendingDown, Minus, ExternalLink, Instagram, Globe, Verified } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Player } from "../data/mock-players";

interface PlayerProfileProps {
  player: Player;
  onBack: () => void;
}

export function PlayerProfile({ player, onBack }: PlayerProfileProps) {
  const getRankChangeIcon = () => {
    if (!player.rankChange || player.rankChange === 0) {
      return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
    return player.rankChange > 0 
      ? <TrendingUp className="w-4 h-4 text-green-500" />
      : <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getRankChangeText = () => {
    if (!player.rankChange || player.rankChange === 0) return "No change";
    return player.rankChange > 0 
      ? `+${player.rankChange} from last ranking`
      : `${player.rankChange} from last ranking`;
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
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getExperienceYears = () => {
    const currentYear = new Date().getFullYear();
    return player.playingSince ? currentYear - player.playingSince : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-background to-muted/20 border-b border-border/50">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Players
          </Button>

          {/* Player Header */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar & Basic Info */}
            <div className="flex items-start gap-4 w-full md:w-auto">
              <Avatar className="w-24 h-24 md:w-32 md:h-32">
                <AvatarImage src={player.avatar} />
                <AvatarFallback className="text-2xl font-bold">
                  {player.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2 flex-1 md:flex-none">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold">{player.name}</h1>
                  {player.isVerified && (
                    <Verified className="w-6 h-6 text-blue-500" />
                  )}
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{player.city}, {player.region}</span>
                </div>

                {player.age && (
                  <div className="text-muted-foreground">
                    Age {player.age} • Playing since {player.playingSince} ({getExperienceYears()} years)
                  </div>
                )}

                {/* Category Tags */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{player.category}</Badge>
                  <Badge variant="outline">{player.gender}</Badge>
                  <Badge variant="outline">{player.ageGroup}</Badge>
                </div>
              </div>
            </div>

            {/* Rank & Stats */}
            <div className="flex-1 w-full md:w-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Badge className={`${getRankBadgeColor()} border-0 text-lg font-bold px-4 py-2 mb-2`}>
                    #{player.currentRank}
                  </Badge>
                  <div className="text-sm text-muted-foreground">Current Rank</div>
                </div>

                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="text-2xl font-bold text-primary">{player.points}</div>
                  <div className="text-sm text-muted-foreground">Points</div>
                </div>

                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{getWinPercentage()}%</div>
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                </div>

                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="text-2xl font-bold">{player.matchesPlayed}</div>
                  <div className="text-sm text-muted-foreground">Matches</div>
                </div>
              </div>

              {/* Rank Change */}
              <div className="flex items-center gap-2 mt-4 justify-center md:justify-start">
                {getRankChangeIcon()}
                <span className={`text-sm ${getRankChangeColor()}`}>
                  {getRankChangeText()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bio & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            {player.bio && (
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{player.bio}</p>
                </CardContent>
              </Card>
            )}

            {/* Match Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Match Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{player.wins}</div>
                    <div className="text-sm text-muted-foreground">Wins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">{player.losses}</div>
                    <div className="text-sm text-muted-foreground">Losses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{player.matchesPlayed}</div>
                    <div className="text-sm text-muted-foreground">Total Matches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{getWinPercentage()}%</div>
                    <div className="text-sm text-muted-foreground">Win Percentage</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Category Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{player.category}:</span>
                        <span className="font-medium">{player.wins}W - {player.losses}L</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Experience</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Playing Since:</span>
                        <span className="font-medium">{player.playingSince}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Experience:</span>
                        <span className="font-medium">{getExperienceYears()} years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tournament History */}
            <Card>
              <CardHeader>
                <CardTitle>Tournament History</CardTitle>
              </CardHeader>
              <CardContent>
                {player.tournamentHistory && player.tournamentHistory.length > 0 ? (
                  <div className="space-y-4">
                    {player.tournamentHistory.map((tournament, index) => (
                      <div key={`${tournament.id}-${index}`} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium truncate">{tournament.tournamentName}</h4>
                            <Badge 
                              variant={tournament.result === "Winner" ? "default" : "outline"}
                              className="text-xs"
                            >
                              {tournament.result}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {tournament.category} • {tournament.location}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground text-right">
                          {formatDate(tournament.date)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No tournament history available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Achievements & Social */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {player.achievements && player.achievements.length > 0 ? (
                  <div className="space-y-3">
                    {player.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <Trophy className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                        <span className="text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Trophy className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No achievements listed</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Highlight */}
            {player.recentHighlight && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Highlight</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-l-4 border-l-green-500">
                    <Trophy className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="font-medium">{player.recentHighlight}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Media */}
            {player.socialMedia && Object.keys(player.socialMedia).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Connect</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {player.socialMedia.instagram && (
                      <Button variant="outline" className="w-full justify-start gap-3" asChild>
                        <a href={`https://instagram.com/${player.socialMedia.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                          <Instagram className="w-4 h-4" />
                          {player.socialMedia.instagram}
                          <ExternalLink className="w-3 h-3 ml-auto" />
                        </a>
                      </Button>
                    )}
                    {player.socialMedia.website && (
                      <Button variant="outline" className="w-full justify-start gap-3" asChild>
                        <a href={`https://${player.socialMedia.website}`} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4" />
                          Website
                          <ExternalLink className="w-3 h-3 ml-auto" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Current Rank:</span>
                    <Badge className={`${getRankBadgeColor()} border-0`}>
                      #{player.currentRank}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Points:</span>
                    <span className="font-bold text-primary">{player.points}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Win Rate:</span>
                    <span className="font-bold text-green-600">{getWinPercentage()}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{player.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Age Group:</span>
                    <span className="font-medium">{player.ageGroup}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}