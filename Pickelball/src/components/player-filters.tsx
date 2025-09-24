import { useState } from "react";
import { Filter, Search, X, Users, Trophy, MapPin, Calendar, Target } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export interface PlayerFilters {
  category: string;
  gender: string;
  ageGroup: string;
  region: string;
  rankTier: string;
  searchQuery: string;
}

interface PlayerFiltersProps {
  filters: PlayerFilters;
  onFiltersChange: (filters: PlayerFilters) => void;
  activeFilterCount: number;
}

const categories = ["All", "Singles", "Doubles", "Mixed"];
const genders = ["All", "Men", "Women", "Mixed"];
const ageGroups = ["All", "19+", "35+", "50+"];
const regions = [
  "All", "California", "Texas", "New York", "Florida", "Arizona", 
  "Colorado", "Washington", "Illinois", "Oregon", "Georgia", "Nevada",
  "Massachusetts", "Ohio", "Michigan", "North Carolina", "Virginia",
  "Tennessee", "South Carolina"
];
const rankTiers = ["All", "Top 10", "Top 25", "Top 50", "Top 100", "Unranked"];

export function PlayerFilters({ filters, onFiltersChange, activeFilterCount }: PlayerFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof PlayerFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: "All",
      gender: "All",
      ageGroup: "All",
      region: "All",
      rankTier: "All",
      searchQuery: "",
    });
  };

  const getActiveFilters = () => {
    const active = [];
    if (filters.category && filters.category !== "All") active.push({ key: "category", label: `Category: ${filters.category}`, value: filters.category });
    if (filters.gender && filters.gender !== "All") active.push({ key: "gender", label: `Gender: ${filters.gender}`, value: filters.gender });
    if (filters.ageGroup && filters.ageGroup !== "All") active.push({ key: "ageGroup", label: `Age: ${filters.ageGroup}`, value: filters.ageGroup });
    if (filters.region && filters.region !== "All") active.push({ key: "region", label: `Region: ${filters.region}`, value: filters.region });
    if (filters.rankTier && filters.rankTier !== "All") active.push({ key: "rankTier", label: `Rank: ${filters.rankTier}`, value: filters.rankTier });
    return active;
  };

  const removeFilter = (key: keyof PlayerFilters) => {
    updateFilter(key, "All");
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search players, ID, or city..."
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
              <SheetTitle>Filter Players</SheetTitle>
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
        <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
          <SelectTrigger className="w-auto h-8 rounded-full">
            <Trophy className="w-3 h-3 mr-1" />
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
            <Users className="w-3 h-3 mr-1" />
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
            <Calendar className="w-3 h-3 mr-1" />
            <SelectValue placeholder="Age Group" />
          </SelectTrigger>
          <SelectContent>
            {ageGroups.map(age => (
              <SelectItem key={age} value={age}>{age}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.region} onValueChange={(value) => updateFilter("region", value)}>
          <SelectTrigger className="w-auto h-8 rounded-full">
            <MapPin className="w-3 h-3 mr-1" />
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map(region => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.rankTier} onValueChange={(value) => updateFilter("rankTier", value)}>
          <SelectTrigger className="w-auto h-8 rounded-full">
            <Target className="w-3 h-3 mr-1" />
            <SelectValue placeholder="Rank Tier" />
          </SelectTrigger>
          <SelectContent>
            {rankTiers.map(tier => (
              <SelectItem key={tier} value={tier}>{tier}</SelectItem>
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
                onClick={() => removeFilter(filter.key as keyof PlayerFilters)}
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
  filters: PlayerFilters; 
  updateFilter: (key: keyof PlayerFilters, value: string) => void;
  clearAllFilters: () => void;
}) {
  return (
    <div className="space-y-6 pt-4">
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
        <label className="text-sm font-medium mb-3 block">Region</label>
        <Select value={filters.region} onValueChange={(value) => updateFilter("region", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map(region => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">Rank Tier</label>
        <Select value={filters.rankTier} onValueChange={(value) => updateFilter("rankTier", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select rank tier" />
          </SelectTrigger>
          <SelectContent>
            {rankTiers.map(tier => (
              <SelectItem key={tier} value={tier}>{tier}</SelectItem>
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