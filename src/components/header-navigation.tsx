import { useState } from "react";
import { Menu, Search, User, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "./ui/dialog";

interface HeaderNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navigationItems = [
  { id: "home", label: "Home" },
  { id: "tournaments", label: "Tournaments" },
  { id: "schedule", label: "Schedule" },
  { id: "rankings", label: "Rankings" },
  { id: "results", label: "Results" },
  { id: "players", label: "Players" },
];

export function HeaderNavigation({ currentPage, onNavigate }: HeaderNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search functionality
      console.log("Searching for:", searchQuery);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavigation("tournaments")}
            >
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">PB</span>
              </div>
              <span className="font-bold text-xl hidden sm:block tracking-tight">PickleBall Pro</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigationItems.filter(item => item.id !== "home").map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item.id)}
                  className={`px-4 py-2 font-medium transition-all ${
                    currentPage === item.id 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Desktop Search */}
              <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden md:flex p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                    <Search className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                    <DialogDescription>
                      Search for players, tournaments, and more across the platform.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSearch} className="space-y-4">
                    <Input
                      placeholder="Search players, tournaments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setSearchOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Search</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              {/* User Profile */}
              <Button variant="outline" size="sm" className="gap-2 border-gray-200 text-gray-700 hover:bg-gray-50">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Login</span>
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                  </SheetHeader>
                  
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="mt-6 space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </form>

                  {/* Mobile Navigation */}
                  <nav className="mt-6 space-y-2">
                    {navigationItems.filter(item => item.id !== "home").map((item) => (
                      <Button
                        key={item.id}
                        variant={currentPage === item.id ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handleNavigation(item.id)}
                        className="w-full justify-start font-medium"
                      >
                        {item.label}
                      </Button>
                    ))}
                  </nav>

                  {/* Mobile User Actions */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <User className="w-4 h-4" />
                      Login / Sign Up
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}