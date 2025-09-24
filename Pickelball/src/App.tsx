import { useState, useMemo } from "react";
import { HeaderNavigation } from "./components/header-navigation";
import { SearchBar } from "./components/search-bar";
import { FilterChips, FilterState } from "./components/filter-chips";
import { TournamentGrid } from "./components/tournament-grid";
import { TournamentDetails } from "./components/tournament-details";
import { RankingsPage } from "./components/rankings-page";
import { SchedulePage } from "./components/schedule-page";
import { ResultsPage } from "./components/results-page";
import { PlayersPage } from "./components/players-page";
import { Footer } from "./components/footer";
import { Button } from "./components/ui/button";
import { mockTournaments } from "./data/mock-tournaments";
import { toast } from "sonner@2.0.3";

export default function App() {
  const [currentPage, setCurrentPage] = useState("tournaments");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
  const [registeredTournaments, setRegisteredTournaments] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    dateRange: "",
    location: "",
    categories: [],
    skillLevel: "",
    gender: "",
    registrationStatus: "",
    entryFee: [0, 500],
  });
  const [loading, setLoading] = useState(false);

  const selectedTournament = selectedTournamentId 
    ? mockTournaments.find(t => t.id === selectedTournamentId)
    : null;

  const filteredTournaments = useMemo(() => {
    return mockTournaments.filter((tournament) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          tournament.name.toLowerCase().includes(query) ||
          tournament.location.toLowerCase().includes(query) ||
          tournament.organizer.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Location filter
      if (filters.location && !tournament.location.includes(filters.location)) {
        return false;
      }

      // Categories filter
      if (filters.categories.length > 0) {
        const hasMatchingCategory = filters.categories.some(category => 
          tournament.categories.includes(category)
        );
        if (!hasMatchingCategory) return false;
      }

      // Skill level filter
      if (filters.skillLevel && tournament.skillLevel !== filters.skillLevel) {
        return false;
      }

      // Registration status filter
      if (filters.registrationStatus) {
        if (filters.registrationStatus === "open" && !tournament.isRegistrationOpen) {
          return false;
        }
        if (filters.registrationStatus === "closing-soon") {
          const deadline = new Date(tournament.registrationDeadline);
          const now = new Date();
          const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          if (daysUntilDeadline > 7 || !tournament.isRegistrationOpen) {
            return false;
          }
        }
      }

      // Entry fee filter
      if (tournament.entryFee < filters.entryFee[0] || tournament.entryFee > filters.entryFee[1]) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.dateRange) count++;
    if (filters.location) count++;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.skillLevel) count++;
    if (filters.gender) count++;
    if (filters.registrationStatus) count++;
    if (filters.entryFee[0] > 0 || filters.entryFee[1] < 500) count++;
    return count;
  }, [filters]);

  const handleRegister = (tournamentId: string) => {
    const tournament = mockTournaments.find(t => t.id === tournamentId);
    if (tournament) {
      toast.success(`Registration initiated for ${tournament.name}!`, {
        description: "You'll be redirected to the registration page.",
      });
      setRegisteredTournaments(prev => new Set([...prev, tournamentId]));
    }
  };

  const handleViewDetails = (tournamentId: string) => {
    setSelectedTournamentId(tournamentId);
  };

  const handleBackToBrowse = () => {
    setSelectedTournamentId(null);
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setSelectedTournamentId(null); // Clear any selected tournament when navigating
  };

  const handleBackToTournaments = () => {
    setCurrentPage("tournaments");
  };

  // Show tournament details if one is selected
  if (selectedTournament) {
    return (
      <>
        <HeaderNavigation currentPage={currentPage} onNavigate={handleNavigation} />
        <TournamentDetails
          tournament={selectedTournament}
          onBack={handleBackToBrowse}
          onRegister={handleRegister}
          isRegistered={registeredTournaments.has(selectedTournament.id)}
        />
        <Footer onNavigate={handleNavigation} />
      </>
    );
  }

  // Show rankings page
  if (currentPage === "rankings") {
    return (
      <>
        <HeaderNavigation currentPage={currentPage} onNavigate={handleNavigation} />
        <RankingsPage onBack={handleBackToTournaments} />
        <Footer onNavigate={handleNavigation} />
      </>
    );
  }

  // Show schedule page
  if (currentPage === "schedule") {
    return (
      <>
        <HeaderNavigation currentPage={currentPage} onNavigate={handleNavigation} />
        <SchedulePage onBack={handleBackToTournaments} />
        <Footer onNavigate={handleNavigation} />
      </>
    );
  }

  // Show results page
  if (currentPage === "results") {
    return (
      <>
        <HeaderNavigation currentPage={currentPage} onNavigate={handleNavigation} />
        <ResultsPage onBack={handleBackToTournaments} />
        <Footer onNavigate={handleNavigation} />
      </>
    );
  }

  // Show players page
  if (currentPage === "players") {
    return (
      <>
        <HeaderNavigation currentPage={currentPage} onNavigate={handleNavigation} />
        <PlayersPage onBack={handleBackToTournaments} />
        <Footer onNavigate={handleNavigation} />
      </>
    );
  }

  // Show home page placeholder
  if (currentPage === "home") {
    return (
      <>
        <HeaderNavigation currentPage={currentPage} onNavigate={handleNavigation} />
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to PickleBall Pro</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your ultimate destination for pickleball tournaments and rankings.
            </p>
            <Button 
              onClick={() => handleNavigation("tournaments")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Browse Tournaments
            </Button>
          </div>
        </div>
        <Footer onNavigate={handleNavigation} />
      </>
    );
  }

  // Show placeholder for other pages
  if (currentPage !== "tournaments") {
    return (
      <>
        <HeaderNavigation currentPage={currentPage} onNavigate={handleNavigation} />
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4 capitalize">{currentPage} Page</h1>
            <p className="text-lg text-muted-foreground mb-8">
              This page is coming soon. Check back later for updates!
            </p>
            <button 
              onClick={() => handleNavigation("tournaments")}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse Tournaments
            </button>
          </div>
        </div>
        <Footer onNavigate={handleNavigation} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation currentPage={currentPage} onNavigate={handleNavigation} />
      
      {/* Hero/Header Section */}
      <div className="bg-gradient-to-b from-background to-muted/20 border-b border-border/50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Browse Tournaments
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your next challenge and register in seconds. Discover pickleball tournaments near you.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by tournament, city, or organizer..."
              className="w-full"
            />
          </div>

          {/* Filters */}
          <FilterChips
            filters={filters}
            onFiltersChange={setFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">
              {filteredTournaments.length} Tournament{filteredTournaments.length !== 1 ? 's' : ''} Found
            </h2>
            {(searchQuery || activeFilterCount > 0) && (
              <span className="text-sm text-muted-foreground">
                {searchQuery && `for "${searchQuery}"`}
                {activeFilterCount > 0 && ` with ${activeFilterCount} filter${activeFilterCount !== 1 ? 's' : ''}`}
              </span>
            )}
          </div>
        </div>

        {/* Tournament Grid */}
        <TournamentGrid
          tournaments={filteredTournaments}
          loading={loading}
          onRegister={handleRegister}
          onViewDetails={handleViewDetails}
          registeredTournaments={registeredTournaments}
          enhanced={true}
        />

        {/* Load More Button (for future pagination) */}
        {filteredTournaments.length > 0 && filteredTournaments.length >= 9 && (
          <div className="text-center mt-12">
            <button
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 1000);
                toast.info("Loading more tournaments...");
              }}
            >
              Load More Tournaments
            </button>
          </div>
        )}
      </div>

      <Footer onNavigate={handleNavigation} />
    </div>
  );
}