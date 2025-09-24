import { useState } from "react";
import { Filter, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";

export interface ScheduleFilters {
  tab: string; // all, today, upcoming, completed
  tournament: string;
  category: string;
  gender: string;
  ageGroup: string;
  selectedDate: string;
  searchQuery: string;
}

interface ScheduleFiltersProps {
  filters: ScheduleFilters;
  onFiltersChange: (filters: ScheduleFilters) => void;
  activeFilterCount: number;
}

const tournaments = ["All", "Summer Championship 2024", "Regional Open", "State Finals", "City Championship"];
const categories = ["All", "Singles", "Doubles", "Mixed"];
const genders = ["All", "Men", "Women", "Mixed"];
const ageGroups = ["All", "19+", "35+", "50+"];

const tabOptions = [
  { value: "all", label: "All Matches" },
  { value: "today", label: "Today" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
];

// Generate date options for the next 14 days and past 7 days
const generateDateOptions = () => {
  const dates = [];
  const today = new Date();
  
  // Past 7 days
  for (let i = 7; i >= 1; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push({
      value: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      isPast: true
    });
  }
  
  // Today
  dates.push({
    value: today.toISOString().split('T')[0],
    label: 'Today',
    isToday: true
  });
  
  // Next 14 days
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      value: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      isFuture: true
    });
  }
  
  return dates;
};

export function ScheduleFilters({ filters, onFiltersChange, activeFilterCount }: ScheduleFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dateScrollPosition, setDateScrollPosition] = useState(0);
  const dateOptions = generateDateOptions();

  const updateFilter = (key: keyof ScheduleFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      tab: "all",
      tournament: "All",
      category: "All",
      gender: "All",
      ageGroup: "All",
      selectedDate: "",
      searchQuery: "",
    });
  };

  const getActiveFilters = () => {
    const active = [];
    if (filters.tournament && filters.tournament !== "All") active.push({ key: "tournament", label: filters.tournament, value: filters.tournament });
    if (filters.category && filters.category !== "All") active.push({ key: "category", label: filters.category, value: filters.category });
    if (filters.gender && filters.gender !== "All") active.push({ key: "gender", label: filters.gender, value: filters.gender });
    if (filters.ageGroup && filters.ageGroup !== "All") active.push({ key: "ageGroup", label: filters.ageGroup, value: filters.ageGroup });
    if (filters.selectedDate) {
      const dateOption = dateOptions.find(d => d.value === filters.selectedDate);
      active.push({ key: "selectedDate", label: dateOption?.label || filters.selectedDate, value: filters.selectedDate });
    }
    return active;
  };

  const removeFilter = (key: keyof ScheduleFilters) => {
    if (key === "selectedDate") {
      updateFilter(key, "");
    } else {
      updateFilter(key, "All");
    }
  };

  const scrollDates = (direction: 'left' | 'right') => {
    const container = document.getElementById('date-scroll-container');
    if (container) {
      const scrollAmount = 200;
      const newPosition = direction === 'left' 
        ? dateScrollPosition - scrollAmount 
        : dateScrollPosition + scrollAmount;
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setDateScrollPosition(newPosition);
    }
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

      {/* Status Tabs */}
      <Tabs value={filters.tab} onValueChange={(value) => updateFilter("tab", value)}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          {tabOptions.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-sm">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Date Picker - Horizontal Scroll */}
      <div className="relative">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollDates('left')}
            className="hidden md:flex h-8 w-8 p-0 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex-1">
            <ScrollArea className="w-full whitespace-nowrap">
              <div 
                id="date-scroll-container" 
                className="flex gap-2 p-1"
                onScroll={(e) => setDateScrollPosition(e.currentTarget.scrollLeft)}
              >
                {dateOptions.map((date) => (
                  <Button
                    key={date.value}
                    variant={filters.selectedDate === date.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateFilter("selectedDate", filters.selectedDate === date.value ? "" : date.value)}
                    className={`shrink-0 text-xs px-3 py-1 h-8 ${
                      date.isToday 
                        ? 'border-primary text-primary font-medium' 
                        : date.isPast 
                        ? 'text-muted-foreground' 
                        : ''
                    }`}
                  >
                    {date.label}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollDates('right')}
            className="hidden md:flex h-8 w-8 p-0 rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
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
              <SheetTitle>Filter Schedule</SheetTitle>
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
                onClick={() => removeFilter(filter.key as keyof ScheduleFilters)}
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
  filters: ScheduleFilters; 
  updateFilter: (key: keyof ScheduleFilters, value: string) => void;
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

      <Button onClick={clearAllFilters} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );
}