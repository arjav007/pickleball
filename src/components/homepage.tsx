import { useState } from "react";
import { Search, Calendar, Trophy, Users, MapPin, Clock, Play, Star, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomepageProps {
  onNavigate: (page: string) => void;
}

export function Homepage({ onNavigate }: HomepageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const quickActions = [
    {
      title: "Tournament Registration",
      description: "Register for upcoming tournaments near you",
      icon: Trophy,
      color: "bg-green-500",
      textColor: "text-white",
      action: () => onNavigate("tournaments")
    },
    {
      title: "Live Matches",
      description: "Watch live pickleball matches and scores",
      icon: Play,
      color: "bg-blue-500",
      textColor: "text-white",
      action: () => onNavigate("schedule")
    },
    {
      title: "Player Rankings",
      description: "Check out the latest player rankings and stats",
      icon: Users,
      color: "bg-purple-500",
      textColor: "text-white",
      action: () => onNavigate("rankings")
    }
  ];

  const upcomingTournaments = [
    {
      id: "1",
      name: "Grand Slam International Pickleball Tournament",
      location: "Miami, FL",
      date: "2024-12-25",
      image: "https://images.unsplash.com/photo-1641237003312-07cf9f83c9a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWNrbGViYWxsJTIwY291cnQlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc1ODE3MTczNHww&ixlib=rb-4.1.0&q=80&w=400",
      participants: 128,
      status: "Open"
    },
    {
      id: "2", 
      name: "US Open Pickleball",
      location: "California, CA",
      date: "2024-12-30",
      image: "https://images.unsplash.com/photo-1548212668-a6821525ae8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMHBsYXlpbmclMjBzcG9ydHN8ZW58MXx8fHwxNzU4MTcxNzM4fDA&ixlib=rb-4.1.0&q=80&w=400",
      participants: 256,
      status: "Filling Fast"
    }
  ];

  const liveMatches = [
    {
      id: "1",
      player1: "Sarah Johnson",
      player2: "Mike Chen", 
      score: "11-8, 6-11, 10-8",
      tournament: "Miami Open",
      court: "Court 1"
    },
    {
      id: "2",
      player1: "Emma Wilson",
      player2: "David Park",
      score: "11-5, 9-11, 8-6",
      tournament: "California Cup",
      court: "Court 2"
    },
    {
      id: "3",
      player1: "Alex Rodriguez",
      player2: "Lisa Chang",
      score: "11-9, 11-7",
      tournament: "Texas Masters",
      court: "Court 3"
    }
  ];

  const topPlayers = [
    {
      id: "1",
      name: "Sarah Johnson",
      ranking: 1,
      points: 2840,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b550?w=400&h=400&fit=crop&crop=face",
      winRate: 94
    },
    {
      id: "2", 
      name: "Mike Chen",
      ranking: 2,
      points: 2735,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      winRate: 91
    },
    {
      id: "3",
      name: "Emma Wilson", 
      ranking: 3,
      points: 2650,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      winRate: 89
    }
  ];

  const testimonials = [
    {
      name: "John Smith",
      role: "Tournament Organizer",
      content: "This platform has revolutionized how we manage tournaments. The registration process is seamless and the analytics are incredible.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Professional Player",
      content: "I love being able to track my progress and find tournaments in my area. The ranking system is transparent and fair.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face", 
      rating: 5
    },
    {
      name: "Mark Thompson",
      role: "Club Manager",
      content: "Our club has seen a 300% increase in participation since using this platform. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      rating: 5
    }
  ];

  const sponsors = [
    "Nike", "Adidas", "Wilson", "JOOLA", "Onix", "Paddletek", "Engage", "Selkirk"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1641237003312-07cf9f83c9a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWNrbGViYWxsJTIwY291cnQlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc1ODE3MTczNHww&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            MAKE US A PART OF YOUR<br />
            <span className="text-green-400">UNSTOPPABLE PICKLE BALL JOURNEY</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of players in the ultimate pickleball experience. Find tournaments, track rankings, and connect with the community.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 flex flex-col md:flex-row gap-4 shadow-2xl">
              <div className="flex-1 flex items-center gap-3 px-4">
                <MapPin className="w-5 h-5 text-gray-400" />
                <Input 
                  placeholder="Location"
                  className="border-0 bg-transparent focus:ring-0 text-gray-900 placeholder:text-gray-500"
                />
              </div>
              
              <div className="flex-1 flex items-center gap-3 px-4 border-l border-gray-200">
                <Calendar className="w-5 h-5 text-gray-400" />
                <Input 
                  type="date"
                  className="border-0 bg-transparent focus:ring-0 text-gray-900"
                />
              </div>
              
              <div className="flex-1 flex items-center gap-3 px-4 border-l border-gray-200">
                <Trophy className="w-5 h-5 text-gray-400" />
                <select className="w-full border-0 bg-transparent focus:ring-0 text-gray-900">
                  <option>Tournament Type</option>
                  <option>Singles</option>
                  <option>Doubles</option>
                  <option>Mixed</option>
                </select>
              </div>
              
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full"
                onClick={() => onNavigate("tournaments")}
              >
                <Search className="w-5 h-5 mr-2" />
                Search Tournaments
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>500+ Tournaments</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>10,000+ Players</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Live Scoring</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className={`${action.color} ${action.textColor} cursor-pointer hover:scale-105 transition-transform duration-300 border-0 shadow-lg`}
                onClick={action.action}
              >
                <CardContent className="p-8 text-center">
                  <action.icon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                  <p className="opacity-90">{action.description}</p>
                  <Button variant="secondary" className="mt-4 bg-white/20 hover:bg-white/30 border-0">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Tournaments */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Tournaments</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on these exciting upcoming tournaments. Register now to secure your spot!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {upcomingTournaments.map((tournament) => (
              <Card key={tournament.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <ImageWithFallback 
                    src={tournament.image}
                    alt={tournament.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                    {tournament.status}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{tournament.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{tournament.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(tournament.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{tournament.participants} players</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={() => onNavigate("tournaments")}
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate("tournaments")}
            >
              View All Tournaments <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Live Tournaments */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-3xl md:text-4xl font-bold">Live Tournaments</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Watch live matches and follow real-time scores from ongoing tournaments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liveMatches.map((match) => (
              <Card key={match.id} className="border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-red-500 text-white animate-pulse">
                      <Play className="w-3 h-3 mr-1" />
                      LIVE
                    </Badge>
                    <span className="text-sm text-muted-foreground">{match.court}</span>
                  </div>
                  
                  <h3 className="font-bold text-center mb-2">
                    {match.player1} vs {match.player2}
                  </h3>
                  
                  <div className="text-center mb-3">
                    <div className="text-lg font-bold text-red-600">{match.score}</div>
                    <div className="text-sm text-muted-foreground">{match.tournament}</div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onNavigate("schedule")}
                  >
                    Watch Live
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate("schedule")}
            >
              View All Live Matches <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Top Ranked Players */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Ranked Players</h2>
            <p className="text-lg text-muted-foreground">
              Meet the champions leading the pickleball rankings and inspiring players worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topPlayers.map((player) => (
              <Card key={player.id} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage src={player.avatar} alt={player.name} />
                      <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full">
                      #{player.ranking}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{player.name}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>Ranking Points: <span className="font-bold text-foreground">{player.points}</span></div>
                    <div>Win Rate: <span className="font-bold text-green-600">{player.winRate}%</span></div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => onNavigate("players")}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate("rankings")}
            >
              View Full Rankings <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Associated Players & Organisers Have To Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from the community that makes pickleball tournaments amazing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 flex-grow italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Sponsors & Corporate Partners</h2>
            <p className="text-lg text-muted-foreground">
              Trusted by leading brands in the pickleball industry
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center opacity-60">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs font-bold text-muted-foreground">{sponsor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Every game tells a unique story -<br />
              bring yours to the court, and we'll hear it on!
            </h2>
            <Button 
              size="lg" 
              variant="secondary" 
              className="mt-6 bg-white text-green-500 hover:bg-white/90"
              onClick={() => onNavigate("tournaments")}
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LOGO</h3>
              <p className="text-gray-400 mb-4">
                The ultimate pickleball tournament platform connecting players worldwide.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                  <div key={social} className="w-8 h-8 bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => onNavigate("tournaments")}>Tournaments</button></li>
                <li><button onClick={() => onNavigate("rankings")}>Rankings</button></li>
                <li><button onClick={() => onNavigate("schedule")}>Schedule</button></li>
                <li><button onClick={() => onNavigate("players")}>Players</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button className="bg-green-500 hover:bg-green-600">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PickleBall Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}