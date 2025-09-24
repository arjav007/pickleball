import { useState } from "react";
import { Filter, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export interface ResultsFilters {
  tournament: string;
  year: string;
  category: string;
  gender: string;
  ageGroup: string;
  stage: string;
  searchQuery: string;
}

interface ResultsFiltersProps {
  filters: ResultsFilters;
  onFiltersChange: (filters: ResultsFilters) => void;
  activeFilterCount: number;
}

const tournaments = [
  "All",
  "Summer Championship 2024",
  "Regional Open Championship", 
  "State Finals 2024",
  "Spring Championship 2024",
  "National Championships 2023",
  "West Coast Open 2023"
];

const years = ["All", "2024", "2023", "2022", "2021"];
const categories = ["All", "Singles", "Doubles", "Mixed"];
const genders = ["All", "Men", "Women", "Mixed"];
const ageGroups = ["All", "19+", "35+", "50+"];
const stages = ["All", "Final", "Semifinal", "Quarterfinal", "Round 1", "Qualification"];

export function ResultsFilters({ filters, onFiltersChange, activeFilterCount }: ResultsFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof ResultsFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      tournament: "All",
      year: "All",
      category: "All",
      gender: "All",
      ageGroup: "All",
      stage: "All",
      searchQuery: "",
    });
  };

  const getActiveFilters = () => {
    const active = [];
    if (filters.tournament && filters.tournament !== "All") active.push({ key: "tournament", label: filters.tournament, value: filters.tournament });
    if (filters.year && filters.year !== "All") active.push({ key: "year", label: filters.year, value: filters.year });
    if (filters.category && filters.category !== "All") active.push({ key: "category", label: filters.category, value: filters.category });
    if (filters.gender && filters.gender !== "All") active.push({ key: "gender", label: filters.gender, value: filters.gender });
    if (filters.ageGroup && filters.ageGroup !== "All") active.push({ key: "ageGroup", label: filters.ageGroup, value: filters.ageGroup });
    if (filters.stage && filters.stage !== "All") active.push({ key: "stage", label: filters.stage, value: filters.stage });
    return active;
  };

  const removeFilter = (key: keyof ResultsFilters) => {
    updateFilter(key, "All");
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search players or tournaments..."
          value={filters.searchQuery}
          onChange={(e) => updateFilter("searchQuery", e.target.value)}
          className="pl-10 pr-10 rounded-full border-border/50 bg-background/80 backdrop-blur-sm"
        />
        {filters.searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 rounded-full hover:bg-muted"
            onClick={() => updateFilter("searchQuery", "")}
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between">
        {/* Mobile Filter Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filter Results</SheetTitle>
            </SheetHeader>
            <FilterContent 
              filters={filters} 
              updateFilter={updateFilter} 
              clearAllFilters={clearAllFilters}
            />
          </SheetContent>
        </Sheet>

        {/* Desktop Clear Button */}
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="hidden lg:flex">
            Clear All
          </Button>
        )}
      </div>

      {/* Desktop Filter Chips */}
      <div className="hidden lg:flex flex-wrap gap-2">
        <Select value={filters.tournament} onValueChange={(value) => updateFilter("tournament", value)}>
          <SelectTrigger className="w-auto h-8 rounded-full">
            <SelectValue placeholder="Tournament" />
          </SelectTrigger>
          <SelectContent>
            {tournaments.map(tournament => (
              <SelectItem key={tournament} value={tournament}>{tournament}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.year} onValueChange={(value) => updateFilter("year", value)}>
          <SelectTrigger className="w-auto h-8 rounded-full">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
          <SelectTrigger className="w-auto h-8 rounded-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.gender} onValueChange={(value) => updateFilter("gender", value)}>
          <SelectTrigger className="w-auto h-8 rounded-full">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            {genders.map(gender => (
              <SelectItem key={gender} value={gender}>{gender}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.ageGroup} onValueChange={(value) => updateFilter("ageGroup", value)}>
          <SelectTrigger className="w-auto h-8 rounded-full">
            <SelectValue placeholder="Age Group" />
          </SelectTrigger>
          <SelectContent>
            {ageGroups.map(age => (
              <SelectItem key={age} value={age}>{age}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.stage} onValueChange={(value) => updateFilter("stage", value)}>
          <SelectTrigger className="w-auto h-8 rounded-full">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            {stages.map(stage => (
              <SelectItem key={stage} value={stage}>{stage}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filter Tags */}
      {getActiveFilters().length > 0 && (
        <div className="flex flex-wrap gap-2">
          {getActiveFilters().map((filter, index) => (
            <Badge 
              key={`${filter.key}-${filter.value}-${index}`} 
              variant="secondary" 
              className="text-xs px-2 py-1 flex items-center gap-1"
            >
              {filter.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-3 w-3 p-0 hover:bg-muted-foreground/20"
                onClick={() => removeFilter(filter.key as keyof ResultsFilters)}
              >
                <X className="w-2 h-2" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterContent({ 
  filters, 
  updateFilter, 
  clearAllFilters 
}: { 
  filters: ResultsFilters; 
  updateFilter: (key: keyof ResultsFilters, value: string) => void;
  clearAllFilters: () => void;
}) {
  return (
    <div className="space-y-6 pt-4">
      <div>
        <label className="text-sm font-medium mb-3 block">Tournament</label>
        <Select value={filters.tournament} onValueChange={(value) => updateFilter("tournament", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select tournament" />
          </SelectTrigger>
          <SelectContent>
            {tournaments.map(tournament => (
              <SelectItem key={tournament} value={tournament}>{tournament}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">Year</label>
        <Select value={filters.year} onValueChange={(value) => updateFilter("year", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">Category</label>
        <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">Gender</label>
        <Select value={filters.gender} onValueChange={(value) => updateFilter("gender", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            {genders.map(gender => (
              <SelectItem key={gender} value={gender}>{gender}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">Age Group</label>
        <Select value={filters.ageGroup} onValueChange={(value) => updateFilter("ageGroup", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select age group" />
          </SelectTrigger>
          <SelectContent>
            {ageGroups.map(age => (
              <SelectItem key={age} value={age}>{age}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">Stage</label>
        <Select value={filters.stage} onValueChange={(value) => updateFilter("stage", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select stage" />
          </SelectTrigger>
          <SelectContent>
            {stages.map(stage => (
              <SelectItem key={stage} value={stage}>{stage}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <Button onClick={clearAllFilters} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );
}