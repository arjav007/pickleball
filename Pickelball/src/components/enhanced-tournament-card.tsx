import { Calendar, MapPin, Users, Clock, DollarSign, Eye } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Tournament } from "./tournament-card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EnhancedTournamentCardProps {
  tournament: Tournament;
  onRegister: (tournamentId: string) => void;
  onViewDetails: (tournamentId: string) => void;
  isRegistered?: boolean;
}

export function EnhancedTournamentCard({ 
  tournament, 
  onRegister, 
  onViewDetails, 
  isRegistered = false 
}: EnhancedTournamentCardProps) {
  const isDeadlineSoon = new Date(tournament.registrationDeadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const isFull = tournament.spotsLeft === 0;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysUntilDeadline = () => {
    const deadline = new Date(tournament.registrationDeadline);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const spotsProgress = ((tournament.totalSpots - tournament.spotsLeft) / tournament.totalSpots) * 100;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/50 bg-card overflow-hidden">
      {/* Tournament Image */}
      {tournament.image ? (
        <div className="relative h-48 overflow-hidden">
          <ImageWithFallback 
            src={tournament.image} 
            alt={tournament.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay with categories */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {tournament.categories.slice(0, 2).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs px-2 py-0.5 bg-white/90 text-gray-900 border-0">
                {category}
              </Badge>
            ))}
            {tournament.categories.length > 2 && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-white/90 text-gray-900 border-0">
                +{tournament.categories.length - 2}
              </Badge>
            )}
          </div>
          
          <div className="absolute top-3 right-3">
            <Badge 
              variant={isFull ? "destructive" : tournament.spotsLeft <= 5 ? "secondary" : "outline"}
              className="text-xs shrink-0 bg-white/90 text-gray-900 border-0"
            >
              {isFull ? "Full" : `${tournament.spotsLeft} left`}
            </Badge>
          </div>

          {isRegistered && (
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-green-600 text-white border-0">✅ Registered</Badge>
            </div>
          )}
        </div>
      ) : (
        /* Fallback gradient background */
        <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 relative">
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {tournament.categories.slice(0, 2).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs px-2 py-0.5 bg-white/90 dark:bg-black/90">
                {category}
              </Badge>
            ))}
            {tournament.categories.length > 2 && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-white/90 dark:bg-black/90">
                +{tournament.categories.length - 2}
              </Badge>
            )}
          </div>
          
          <div className="absolute top-3 right-3">
            <Badge 
              variant={isFull ? "destructive" : tournament.spotsLeft <= 5 ? "secondary" : "outline"}
              className="text-xs shrink-0 bg-white/90 dark:bg-black/90"
            >
              {isFull ? "Full" : `${tournament.spotsLeft} left`}
            </Badge>
          </div>

          {isRegistered && (
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-green-600 text-white">✅ Registered</Badge>
            </div>
          )}
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {tournament.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">{tournament.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4 shrink-0" />
          <span>{tournament.skillLevel}</span>
        </div>

        {/* Progress bar for spots */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Registration Progress</span>
            <span>{Math.round(spotsProgress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-300" 
              style={{ width: `${spotsProgress}%` }}
            />
          </div>
        </div>

        {isDeadlineSoon && tournament.isRegistrationOpen && (
          <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 dark:bg-orange-950/20 p-2 rounded-md">
            <Clock className="w-4 h-4 shrink-0" />
            <span>Register in {getDaysUntilDeadline()} days</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 shrink-0 text-muted-foreground" />
            <span className="font-medium text-lg">${tournament.entryFee}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            by {tournament.organizer}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onViewDetails(tournament.id)}
          className="flex-1 gap-2 group-hover:border-primary group-hover:text-primary transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Details
        </Button>
        {!isRegistered ? (
          <Button 
            size="sm" 
            onClick={() => onRegister(tournament.id)}
            disabled={!tournament.isRegistrationOpen || isFull}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            {isFull ? "Full" : "Register"}
          </Button>
        ) : (
          <Button 
            size="sm" 
            variant="secondary"
            className="flex-1"
            disabled
          >
            Registered ✅
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}