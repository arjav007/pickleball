import { useState, useMemo } from "react";
import { LeaderboardTable } from "./leaderboard-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { mockPlayers, Player } from "../data/mock-players";
import { toast } from "sonner@2.0.3";

interface RankingsPageProps {
  onBack: () => void;
}

const categoryTabs = [
  { id: "overall", label: "Overall", category: "All" },
  { id: "mens-singles", label: "Men's Singles", category: "Singles", gender: "Men" },
  { id: "womens-singles", label: "Women's Singles", category: "Singles", gender: "Women" },
  { id: "doubles", label: "Doubles", category: "Doubles" },
  { id: "mixed", label: "Mixed", category: "Mixed" },
];

export function RankingsPage({ onBack }: RankingsPageProps) {
  const [selectedTab, setSelectedTab] = useState("overall");

  const filteredPlayers = useMemo(() => {
    let filtered = [...mockPlayers];

    // Apply tab-specific filters
    const currentTab = categoryTabs.find(tab => tab.id === selectedTab);
    if (currentTab) {
      if (currentTab.category !== "All") {
        filtered = filtered.filter(player => player.category === currentTab.category);
      }
      if (currentTab.gender) {
        filtered = filtered.filter(player => player.gender === currentTab.gender);
      }
    }

    // Re-rank filtered players within their category
    filtered.sort((a, b) => b.points - a.points);
    return filtered.map((player, index) => ({
      ...player,
      currentRank: index + 1,
    }));
  }, [selectedTab]);

  const handleViewProfile = (playerId: string) => {
    const player = mockPlayers.find(p => p.id === playerId);
    if (player) {
      toast.info(`Viewing profile for ${player.name}`, {
        description: "Player profile would open here.",
      });
    }
  };

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
  };

  const getTabStats = (tabId: string) => {
    const currentTab = categoryTabs.find(tab => tab.id === tabId);
    if (!currentTab) return 0;

    let count = mockPlayers.filter(player => {
      if (currentTab.category !== "All" && player.category !== currentTab.category) return false;
      if (currentTab.gender && player.gender !== currentTab.gender) return false;
      return true;
    }).length;

    return count;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-background to-muted/20 border-b border-border/50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Leaderboard & Rankings
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track top players across categories and tournaments. Rankings update after every official event.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Category Tabs */}
        <Tabs value={selectedTab} onValueChange={handleTabChange} className="space-y-6">
          {/* Category Filters */}
          <div className="flex justify-center px-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-sm border border-gray-200 dark:border-gray-700 max-w-full overflow-hidden">
              <div className="flex md:grid md:grid-cols-5 gap-2 overflow-x-auto md:overflow-x-visible scrollbar-hide">
                {categoryTabs.map((tab) => (
                  <button
                    key={tab.id} 
                    onClick={() => handleTabChange(tab.id)}
                    className={`
                      flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out
                      whitespace-nowrap cursor-pointer group min-w-max border-0 shadow-none
                      ${selectedTab === tab.id 
                        ? "bg-green-500 text-white shadow-md shadow-green-500/25 scale-[1.02]" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200"
                      }
                    `}
                  >
                    <span className="text-sm font-medium">{tab.label}</span>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs px-2 py-0.5 transition-colors duration-200 border-0 ${
                        selectedTab === tab.id
                          ? "bg-white/20 text-white"
                          : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {getTabStats(tab.id)}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {categoryTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-6">
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold">
                    {filteredPlayers.length} Player{filteredPlayers.length !== 1 ? 's' : ''} Ranked
                  </h2>
                </div>

                {/* Live Indicator */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Live Rankings</span>
                </div>
              </div>

              {/* Top 3 Highlight */}
              {filteredPlayers.length >= 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {filteredPlayers.slice(0, 3).map((player, index) => (
                    <div
                      key={player.id}
                      className={`relative p-6 rounded-lg border-2 text-center ${
                        index === 0
                          ? "border-yellow-400 bg-gradient-to-br from-yellow-100 to-amber-200 dark:from-yellow-900/40 dark:to-amber-900/40 shadow-lg shadow-yellow-300/30 dark:shadow-yellow-800/30"
                          : index === 1
                          ? "border-gray-400 bg-gradient-to-br from-gray-100 to-slate-200 dark:from-gray-900/40 dark:to-slate-900/40"
                          : "border-amber-400 bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/40 dark:to-orange-900/40"
                      }`}
                    >
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge
                          className={`${
                            index === 0
                              ? "bg-yellow-500 text-yellow-900"
                              : index === 1
                              ? "bg-gray-400 text-gray-900"
                              : "bg-amber-600 text-amber-100"
                          }`}
                        >
                          #{player.currentRank}
                        </Badge>
                      </div>

                      {/* Rank Change Indicator */}
                      <div className="absolute -top-2 -right-2">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs px-2 py-1 ${
                            index === 0 ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" :
                            index === 1 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400" :
                            "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          }`}
                        >
                          {index === 0 ? "+3" : index === 1 ? "-1" : "+2"}
                        </Badge>
                      </div>

                      {/* Avatar with Medal Background */}
                      <div className="relative flex justify-center mb-3">
                        <div 
                          className={`relative w-16 h-16 rounded-full flex items-center justify-center ${
                            index === 0
                              ? "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg shadow-yellow-500/30"
                              : index === 1
                              ? "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 shadow-lg shadow-gray-400/30"
                              : "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-lg shadow-amber-500/30"
                          }`}
                        >
                          <div className="w-14 h-14 rounded-full overflow-hidden shadow-inner">
                            <img 
                              src={player.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`}
                              alt={player.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<div class="w-full h-full bg-white dark:bg-gray-800 flex items-center justify-center"><span class="text-lg font-bold text-gray-700 dark:text-gray-300">${player.name.split(' ').map(n => n[0]).join('')}</span></div>`;
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-2">
                        <h3 className="font-bold text-lg mb-2">{player.name}</h3>
                        <p className="text-2xl font-bold text-primary mb-1">{player.points.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">points</p>
                        <div className="mt-3 text-sm text-muted-foreground font-bold">
                          {player.wins}W - {player.losses}L
                        </div>

                        {/* Recent Highlight */}
                        <div className="mt-3 px-3 py-2 bg-white/70 dark:bg-gray-800/70 border border-primary/20 rounded-full">
                          <p className="text-xs text-primary font-medium">
                            {player.recentHighlight || 
                             (index === 0 ? "🏆 Won 2024 Summer Championship" :
                              index === 1 ? "🥈 Runner-up Regional Open" :
                              "🏅 Won Mixed Doubles Cup")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Leaderboard Table */}
              <LeaderboardTable
                players={filteredPlayers}
                onViewProfile={handleViewProfile}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}