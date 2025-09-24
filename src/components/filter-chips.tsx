import { useState } from "react";
import { ChevronDown, X, Filter, Calendar, MapPin, Trophy, Target, Users, DollarSign } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

export interface FilterState {
  dateRange: string;
  location: string;
  categories: string[];
  skillLevel: string;
  gender: string;
  registrationStatus: string;
  entryFee: [number, number];
}

interface FilterChipsProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  activeFilterCount: number;
}

const categories = ["Singles", "Doubles", "Mixed"];
const skillLevels = ["Beginner", "Intermediate", "Advanced"];
const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];
const dateRanges = ["This Week", "Next Week", "This Month", "Next Month"];

export function FilterChips({ filters, onFiltersChange, activeFilterCount }: FilterChipsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      dateRange: "",
      location: "",
      categories: [],
      skillLevel: "",
      gender: "",
      registrationStatus: "",
      entryFee: [0, 500],
    });
  };

  const removeFilter = (key: keyof FilterState, value?: string) => {
    if (key === "categories" && value) {
      updateFilter(key, filters[key].filter(cat => cat !== value));
    } else {
      updateFilter(key, key === "entryFee" ? [0, 500] : key === "categories" ? [] : "");
    }
  };

  const getActiveFilters = () => {
    const active = [];
    if (filters.dateRange) active.push({ key: "dateRange", label: filters.dateRange, value: filters.dateRange });
    if (filters.location) active.push({ key: "location", label: filters.location, value: filters.location });
    if (filters.skillLevel) active.push({ key: "skillLevel", label: filters.skillLevel, value: filters.skillLevel });
    if (filters.gender) active.push({ key: "gender", label: filters.gender, value: filters.gender });
    if (filters.registrationStatus) active.push({ key: "registrationStatus", label: filters.registrationStatus, value: filters.registrationStatus });
    if (filters.entryFee[0] > 0 || filters.entryFee[1] < 500) active.push({ key: "entryFee", label: `$${filters.entryFee[0]}-$${filters.entryFee[1]}`, value: "fee" });
    filters.categories.forEach(cat => active.push({ key: "categories", label: cat, value: cat }));
    return active;
  };

  return (
    <div className="space-y-3">
      {/* Mobile Filter Button */}
      <div className="flex items-center justify-between">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3 lg:hidden">
              <Filter className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filter Tournaments</SheetTitle>
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
        <Select value={filters.dateRange} onValueChange={(value) => updateFilter("dateRange", value)}>
          <SelectTrigger className="w-auto h-8 rounded-full">
            <Calendar className="w-3 h-3 mr-1" />
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            {dateRanges.map(range => (
              <SelectItem key={range} value={range}>{range}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.location} onValueChange={(value) => updateFilter("location", value)}>
          <SelectTrigger className="w-auto h-8 rounded-full">
            <MapPin className="w-3 h-3 mr-1" />
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map(location => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.skillLevel} onValueChange={(value) => updateFilter("skillLevel", value)}>
          <SelectTrigger className="w-auto h-8 rounded-full">
            <Target className="w-3 h-3 mr-1" />
            <SelectValue placeholder="Skill Level" />
          </SelectTrigger>
          <SelectContent>
            {skillLevels.map(level => (
              <SelectItem key={level} value={level}>{level}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.registrationStatus} onValueChange={(value) => updateFilter("registrationStatus", value)}>
          <SelectTrigger className="w-auto h-8 rounded-full">
            <Users className="w-3 h-3 mr-1" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closing-soon">Closing Soon</SelectItem>
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
                onClick={() => removeFilter(filter.key as keyof FilterState, filter.value)}
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
  filters: FilterState; 
  updateFilter: (key: keyof FilterState, value: any) => void;
  clearAllFilters: () => void;
}) {
  return (
    <div className="space-y-6 pt-4">
      <div>
        <label className="text-sm font-medium mb-3 block">Date Range</label>
        <Select value={filters.dateRange} onValueChange={(value) => updateFilter("dateRange", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            {["This Week", "Next Week", "This Month", "Next Month"].map(range => (
              <SelectItem key={range} value={range}>{range}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">Location</label>
        <Select value={filters.location} onValueChange={(value) => updateFilter("location", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {["New York", "Los Angeles", "Chicago", "Houston", "Miami"].map(location => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">Categories</label>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter("categories", [...filters.categories, category]);
                  } else {
                    updateFilter("categories", filters.categories.filter(c => c !== category));
                  }
                }}
              />
              <label htmlFor={category} className="text-sm">{category}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">Skill Level</label>
        <Select value={filters.skillLevel} onValueChange={(value) => updateFilter("skillLevel", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select skill level" />
          </SelectTrigger>
          <SelectContent>
            {skillLevels.map(level => (
              <SelectItem key={level} value={level}>{level}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">Entry Fee Range</label>
        <div className="px-2">
          <Slider
            value={filters.entryFee}
            onValueChange={(value) => updateFilter("entryFee", value)}
            max={500}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>${filters.entryFee[0]}</span>
            <span>${filters.entryFee[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      <Button onClick={clearAllFilters} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );
}