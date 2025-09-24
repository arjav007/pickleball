import { useState, useMemo } from "react";
import { Archive, Calendar, Trophy, MapPin, DollarSign, Eye } from "lucide-react";
import { ResultsFilters, ResultsFilters as FilterType } from "./results-filters";
import { WinnerSpotlightSection } from "./winner-spotlight";
import { ResultCard } from "./result-card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { 
  mockTournamentResults, 
  mockMatchResults, 
  winnerSpotlights,
  TournamentResult,
  MatchResult,
  getTournamentResultsWithMatches
} from "../data/mock-results";
import { toast } from "sonner@2.0.3";

interface ResultsPageProps {
  onBack: () => void;
}

export function ResultsPage({ onBack }: ResultsPageProps) {
  const [filters, setFilters] = useState<FilterType>({
    tournament: "All",
    year: "All",
    category: "All",
    gender: "All",
    ageGroup: "All",
    stage: "All",
    searchQuery: "",
  });

  const [expandedTournaments, setExpandedTournaments] = useState<Set<string>>(new Set());

  const filteredResults = useMemo(() => {
    let filteredMatches = [...mockMatchResults];

    // Apply filters
    if (filters.tournament && filters.tournament !== "All") {
      filteredMatches = filteredMatches.filter(match => match.tournamentName === filters.tournament);
    }

    if (filters.year && filters.year !== "All") {
      filteredMatches = filteredMatches.filter(match => 
        new Date(match.date).getFullYear().toString() === filters.year
      );
    }

    if (filters.category && filters.category !== "All") {
      filteredMatches = filteredMatches.filter(match => match.category === filters.category);
    }

    if (filters.gender && filters.gender !== "All") {
      filteredMatches = filteredMatches.filter(match => match.gender === filters.gender);
    }

    if (filters.ageGroup && filters.ageGroup !== "All") {
      filteredMatches = filteredMatches.filter(match => match.ageGroup === filters.ageGroup);
    }

    if (filters.stage && filters.stage !== "All") {
      filteredMatches = filteredMatches.filter(match => match.stage === filters.stage);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredMatches = filteredMatches.filter(match =>
        match.player1.name.toLowerCase().includes(query) ||
        match.player2.name.toLowerCase().includes(query) ||
        match.tournamentName.toLowerCase().includes(query) ||
        match.venue.toLowerCase().includes(query)
      );
    }

    // Sort by date (most recent first)
    return filteredMatches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filters]);

  // Group matches by tournament
  const groupedResults = useMemo(() => {
    const groups: { [key: string]: { tournament: TournamentResult; matches: MatchResult[] } } = {};
    
    filteredResults.forEach(match => {
      const tournament = mockTournamentResults.find(t => t.id === match.tournamentId);
      if (tournament) {
        if (!groups[tournament.id]) {
          groups[tournament.id] = { tournament, matches: [] };
        }
        groups[tournament.id].matches.push(match);
      }
    });

    return Object.values(groups).sort((a, b) => 
      new Date(b.tournament.endDate).getTime() - new Date(a.tournament.endDate).getTime()
    );
  }, [filteredResults]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.tournament && filters.tournament !== "All") count++;
    if (filters.year && filters.year !== "All") count++;
    if (filters.category && filters.category !== "All") count++;
    if (filters.gender && filters.gender !== "All") count++;
    if (filters.ageGroup && filters.ageGroup !== "All") count++;
    if (filters.stage && filters.stage !== "All") count++;
    return count;
  }, [filters]);

  const handleViewMatchDetails = (matchId: string) => {
    const match = mockMatchResults.find(m => m.id === matchId);
    if (match) {
      toast.info(`Viewing details for ${match.player1.name} vs ${match.player2.name}`, {
        description: "Full match analysis would open here.",
      });
    }
  };

  const handleViewTournamentArchive = (tournamentId: string) => {
    const tournament = mockTournamentResults.find(t => t.id === tournamentId);
    if (tournament) {
      toast.info(`Opening tournament archive for ${tournament.name}`, {
        description: "Tournament brackets and full results would be shown.",
      });
    }
  };

  const handleViewPlayer = (playerId: string) => {
    toast.info("Opening player profile", {
      description: "Player statistics and history would be displayed.",
    });
  };

  const toggleTournamentExpansion = (tournamentId: string) => {
    setExpandedTournaments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tournamentId)) {
        newSet.delete(tournamentId);
      } else {
        newSet.add(tournamentId);
      }
      return newSet;
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`;
    }
    
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
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

  const getTierBadgeColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'pro':
        return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/20 dark:text-purple-300';
      case 'regional':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/20 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-background to-muted/20 border-b border-border/50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Results
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See past matches and tournament outcomes. Explore detailed scorecards and championship archives.
            </p>
          </div>

          {/* Filters */}
          <ResultsFilters
            filters={filters}
            onFiltersChange={setFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Winner Spotlight */}
        <WinnerSpotlightSection 
          winners={winnerSpotlights} 
          onViewPlayer={handleViewPlayer}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">
              {filteredResults.length} Result{filteredResults.length !== 1 ? 's' : ''} Found
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
              <Trophy className="w-4 h-4" />
              <span>{groupedResults.length} Tournament{groupedResults.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Grouped Results */}
        {groupedResults.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Archive className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to find more tournament results.
            </p>
            <Button variant="outline" onClick={() => setFilters({
              tournament: "All",
              year: "All",
              category: "All",
              gender: "All",
              ageGroup: "All",
              stage: "All",
              searchQuery: "",
            })}>
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {groupedResults.map(({ tournament, matches }) => (
              <div key={tournament.id} className="space-y-4">
                {/* Tournament Header */}
                <Card className="border-l-4 border-l-primary">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-xl">{tournament.name}</CardTitle>
                          <Badge 
                            variant="outline" 
                            className={getTierBadgeColor(tournament.tier)}
                          >
                            {tournament.tier}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 shrink-0" />
                            <span>{formatDateRange(tournament.startDate, tournament.endDate)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span>{tournament.location}</span>
                          </div>
                          {tournament.totalPrizeMoney && (
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 shrink-0" />
                              <span>{formatPrizeMoney(tournament.totalPrizeMoney)} Prize Pool</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {tournament.categories.map(category => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewTournamentArchive(tournament.id)}
                          className="gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Archive
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Tournament Results */}
                <Collapsible 
                  open={expandedTournaments.has(tournament.id) || matches.length <= 3}
                  onOpenChange={() => toggleTournamentExpansion(tournament.id)}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Show first 6 matches or all if expanded */}
                    {(expandedTournaments.has(tournament.id) ? matches : matches.slice(0, 6)).map((match) => (
                      <ResultCard
                        key={match.id}
                        match={match}
                        onViewDetails={handleViewMatchDetails}
                      />
                    ))}
                  </div>

                  {/* Show More/Less Button */}
                  {matches.length > 6 && (
                    <div className="text-center mt-4">
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" size="sm">
                          {expandedTournaments.has(tournament.id) 
                            ? `Show Less` 
                            : `Show ${matches.length - 6} More Result${matches.length - 6 !== 1 ? 's' : ''}`
                          }
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  )}
                </Collapsible>

                <Separator className="my-8" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}