import { Calendar, MapPin, Users, Clock, DollarSign } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  categories: string[];
  skillLevel: string;
  spotsLeft: number;
  totalSpots: number;
  entryFee: number;
  registrationDeadline: string;
  organizer: string;
  isRegistrationOpen: boolean;
  image?: string; // Add image field
}

interface TournamentCardProps {
  tournament: Tournament;
  onRegister: (tournamentId: string) => void;
  onViewDetails: (tournamentId: string) => void;
}

export function TournamentCard({ tournament, onRegister, onViewDetails }: TournamentCardProps) {
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 bg-card overflow-hidden">
      {/* Tournament Image */}
      {tournament.image && (
        <div className="relative h-48 overflow-hidden">
          <ImageWithFallback 
            src={tournament.image} 
            alt={tournament.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <Badge 
              variant={isFull ? "destructive" : tournament.spotsLeft <= 5 ? "secondary" : "outline"}
              className="text-xs bg-white/90 text-gray-900 border-0"
            >
              {isFull ? "Full" : `${tournament.spotsLeft} left`}
            </Badge>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg font-semibold leading-tight line-clamp-2">{tournament.name}</h3>
          {!tournament.image && (
            <Badge 
              variant={isFull ? "destructive" : tournament.spotsLeft <= 5 ? "secondary" : "outline"}
              className="text-xs shrink-0"
            >
              {isFull ? "Full" : `${tournament.spotsLeft} left`}
            </Badge>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {tournament.categories.map((category) => (
            <Badge key={category} variant="secondary" className="text-xs px-2 py-0.5">
              {category}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 shrink-0" />
          <span>{formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">{tournament.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4 shrink-0" />
          <span>{tournament.skillLevel}</span>
        </div>

        {isDeadlineSoon && tournament.isRegistrationOpen && (
          <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 dark:bg-orange-950/20 p-2 rounded-md">
            <Clock className="w-4 h-4 shrink-0" />
            <span>Register in {getDaysUntilDeadline()} days</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 shrink-0 text-muted-foreground" />
          <span className="font-medium">${tournament.entryFee}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onViewDetails(tournament.id)}
          className="flex-1"
        >
          View Details
        </Button>
        <Button 
          size="sm" 
          onClick={() => onRegister(tournament.id)}
          disabled={!tournament.isRegistrationOpen || isFull}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
        >
          {isFull ? "Full" : "Register"}
        </Button>
      </CardFooter>
    </Card>
  );
}