import { TournamentCard, Tournament } from "./tournament-card";
import { EnhancedTournamentCard } from "./enhanced-tournament-card";
import { Skeleton } from "./ui/skeleton";

interface TournamentGridProps {
  tournaments: Tournament[];
  loading?: boolean;
  onRegister: (tournamentId: string) => void;
  onViewDetails: (tournamentId: string) => void;
  registeredTournaments?: Set<string>;
  enhanced?: boolean;
}

export function TournamentGrid({ 
  tournaments, 
  loading = false, 
  onRegister, 
  onViewDetails, 
  registeredTournaments = new Set(),
  enhanced = false 
}: TournamentGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (tournaments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33m0 0A7.962 7.962 0 015 9c0-1.667.455-3.233 1.25-4.615m8.3 10.615A7.962 7.962 0 0119 9c0-1.667-.455-3.233-1.25-4.615M9.75 7.25V6.5c0-.69.56-1.25 1.25-1.25h2c.69 0 1.25.56 1.25 1.25v.75"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">No tournaments found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your filters or search terms to find more tournaments.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {tournaments.map((tournament) => (
        enhanced ? (
          <EnhancedTournamentCard
            key={tournament.id}
            tournament={tournament}
            onRegister={onRegister}
            onViewDetails={onViewDetails}
            isRegistered={registeredTournaments.has(tournament.id)}
          />
        ) : (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
            onRegister={onRegister}
            onViewDetails={onViewDetails}
          />
        )
      ))}
    </div>
  );
}