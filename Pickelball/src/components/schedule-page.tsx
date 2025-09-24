import { useState, useMemo } from "react";
import { Play, Calendar, TrendingUp } from "lucide-react";
import { ScheduleFilters, ScheduleFilters as FilterType } from "./schedule-filters";
import { MatchCard } from "./match-card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { mockMatches, Match } from "../data/mock-matches";
import { toast } from "sonner@2.0.3";

interface SchedulePageProps {
  onBack: () => void;
}

export function SchedulePage({ onBack }: SchedulePageProps) {
  const [filters, setFilters] = useState<FilterType>({
    tab: "all",
    tournament: "All",
    category: "All",
    gender: "All",
    ageGroup: "All",
    selectedDate: "",
    searchQuery: "",
  });

  const filteredMatches = useMemo(() => {
    let filtered = [...mockMatches];
    const today = new Date().toISOString().split('T')[0];

    // Apply tab filter first
    switch (filters.tab) {
      case "today":
        filtered = filtered.filter(match => match.date === today);
        break;
      case "upcoming":
        filtered = filtered.filter(match => 
          match.status === "scheduled" && match.date >= today
        );
        break;
      case "completed":
        filtered = filtered.filter(match => match.status === "completed");
        break;
      case "all":
      default:
        // Show all matches
        break;
    }

    // Apply other filters
    if (filters.tournament && filters.tournament !== "All") {
      filtered = filtered.filter(match => match.tournamentName === filters.tournament);
    }

    if (filters.category && filters.category !== "All") {
      filtered = filtered.filter(match => match.category === filters.category);
    }

    if (filters.gender && filters.gender !== "All") {
      filtered = filtered.filter(match => match.gender === filters.gender);
    }

    if (filters.ageGroup && filters.ageGroup !== "All") {
      filtered = filtered.filter(match => match.ageGroup === filters.ageGroup);
    }

    if (filters.selectedDate) {
      filtered = filtered.filter(match => match.date === filters.selectedDate);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(match =>
        match.player1.name.toLowerCase().includes(query) ||
        match.player2.name.toLowerCase().includes(query) ||
        match.tournamentName.toLowerCase().includes(query) ||
        match.venue.toLowerCase().includes(query)
      );
    }

    // Sort by date and time
    return filtered.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.tournament && filters.tournament !== "All") count++;
    if (filters.category && filters.category !== "All") count++;
    if (filters.gender && filters.gender !== "All") count++;
    if (filters.ageGroup && filters.ageGroup !== "All") count++;
    if (filters.selectedDate) count++;
    return count;
  }, [filters]);

  // Group matches by date
  const groupedMatches = useMemo(() => {
    const groups: { [key: string]: Match[] } = {};
    
    filteredMatches.forEach(match => {
      if (!groups[match.date]) {
        groups[match.date] = [];
      }
      groups[match.date].push(match);
    });

    return Object.entries(groups).map(([date, matches]) => ({
      date,
      matches: matches.sort((a, b) => a.time.localeCompare(b.time))
    }));
  }, [filteredMatches]);

  // Get live matches for highlighting
  const liveMatches = mockMatches.filter(match => match.status === 'live');

  const handleViewMatchDetails = (matchId: string) => {
    const match = mockMatches.find(m => m.id === matchId);
    if (match) {
      toast.info(`Viewing details for ${match.player1.name} vs ${match.player2.name}`, {
        description: "Match details would open here.",
      });
    }
  };

  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (dateString === today.toISOString().split('T')[0]) {
      return "Today";
    } else if (dateString === tomorrow.toISOString().split('T')[0]) {
      return "Tomorrow";
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  const getMatchCountForDate = (matches: Match[]) => {
    const live = matches.filter(m => m.status === 'live').length;
    const scheduled = matches.filter(m => m.status === 'scheduled').length;
    const completed = matches.filter(m => m.status === 'completed').length;
    
    return { live, scheduled, completed };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-background to-muted/20 border-b border-border/50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Schedule
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check upcoming, live, and completed matches across all tournaments.
            </p>
          </div>

          {/* Filters */}
          <ScheduleFilters
            filters={filters}
            onFiltersChange={setFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>
      </div>

      {/* Live Matches Section */}
      {liveMatches.length > 0 && filters.tab !== "completed" && (
        <>
          <div className="bg-red-50 dark:bg-red-950/20 border-b border-red-200 dark:border-red-800">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <h2 className="text-lg font-semibold text-red-700 dark:text-red-300">
                    Live Now ({liveMatches.length})
                  </h2>
                </div>
                <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View All Live
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {liveMatches.slice(0, 2).map((match) => (
                  <Card key={match.id} className="border-red-200 dark:border-red-800">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-red-600">{match.tournamentName}</span>
                        <Badge className="bg-red-600 text-white animate-pulse">
                          <Play className="w-3 h-3 mr-1" />
                          LIVE
                        </Badge>
                      </div>
                      <div className="text-center mb-3">
                        <div className="font-semibold mb-1">
                          {match.player1.name} vs {match.player2.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {match.category} • {match.stage}
                        </div>
                      </div>
                      {match.liveScore && (
                        <div className="text-center p-2 bg-red-100 dark:bg-red-900/20 rounded">
                          <div className="text-lg font-bold">
                            Set {match.liveScore.currentSet}: {match.liveScore.player1Score} - {match.liveScore.player2Score}
                          </div>
                          {match.score && (
                            <div className="text-sm text-muted-foreground">
                              Sets: {match.score.player1Sets} - {match.score.player2Sets}
                            </div>
                          )}
                        </div>
                      )}
                      <Button 
                        size="sm" 
                        className="w-full mt-3 bg-red-600 hover:bg-red-700"
                        onClick={() => handleViewMatchDetails(match.id)}
                      >
                        Watch Live
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Main Schedule Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">
              {filteredMatches.length} Match{filteredMatches.length !== 1 ? 'es' : ''} Found
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
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>{mockMatches.filter(m => m.status === 'live').length} Live</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>{mockMatches.filter(m => m.status === 'scheduled').length} Scheduled</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{mockMatches.filter(m => m.status === 'completed').length} Completed</span>
            </div>
          </div>
        </div>

        {/* Grouped Matches */}
        {groupedMatches.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No matches found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms to find more matches.
            </p>
            <Button variant="outline" onClick={() => setFilters({
              tab: "all",
              tournament: "All",
              category: "All",
              gender: "All",
              ageGroup: "All",
              selectedDate: "",
              searchQuery: "",
            })}>
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {groupedMatches.map(({ date, matches }) => {
              const counts = getMatchCountForDate(matches);
              
              return (
                <div key={date} className="space-y-4">
                  {/* Date Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{formatDateHeader(date)}</h3>
                      <Badge variant="outline" className="text-xs">
                        {matches.length} match{matches.length !== 1 ? 'es' : ''}
                      </Badge>
                    </div>
                    
                    {/* Date Summary */}
                    <div className="hidden md:flex items-center gap-3 text-sm">
                      {counts.live > 0 && (
                        <span className="text-red-600 font-medium">{counts.live} Live</span>
                      )}
                      {counts.scheduled > 0 && (
                        <span className="text-blue-600">{counts.scheduled} Scheduled</span>
                      )}
                      {counts.completed > 0 && (
                        <span className="text-green-600">{counts.completed} Completed</span>
                      )}
                    </div>
                  </div>

                  {/* Matches for this date */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {matches.map((match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                        onViewDetails={handleViewMatchDetails}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile Sticky Action Bar */}
      {liveMatches.length > 0 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border/50">
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white gap-2">
            <Play className="w-4 h-4" />
            View {liveMatches.length} Live Match{liveMatches.length !== 1 ? 'es' : ''}
          </Button>
        </div>
      )}
    </div>
  );
}