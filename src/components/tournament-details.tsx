import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, Users, Clock, Share2, Heart, Download, MessageCircle, Phone, Mail, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Tournament } from "./tournament-card";
import { toast } from "sonner@2.0.3";

interface TournamentDetailsProps {
  tournament: Tournament;
  onBack: () => void;
  onRegister: (tournamentId: string) => void;
  isRegistered?: boolean;
}

const categoryDetails = [
  { category: "Singles", fee: 75, maxPlayers: 16, format: "Round Robin + Bracket" },
  { category: "Doubles", fee: 120, maxPlayers: 24, format: "Pool Play + Bracket" },
  { category: "Mixed", fee: 100, maxPlayers: 20, format: "Round Robin + Bracket" },
];

const scheduleEvents = [
  { time: "8:00 AM", event: "Registration Opens" },
  { time: "9:00 AM", event: "Singles - Round 1" },
  { time: "11:00 AM", event: "Doubles - Pool Play" },
  { time: "1:00 PM", event: "Lunch Break" },
  { time: "2:00 PM", event: "Mixed - Round Robin" },
  { time: "4:00 PM", event: "Bracket Play Begins" },
  { time: "6:00 PM", event: "Finals & Awards" },
];

const registeredPlayers = [
  { name: "Sarah Johnson", avatar: "", level: "Advanced" },
  { name: "Mike Chen", avatar: "", level: "Intermediate" },
  { name: "Lisa Rodriguez", avatar: "", level: "Advanced" },
  { name: "David Kim", avatar: "", level: "Intermediate" },
  { name: "Emma Wilson", avatar: "", level: "Beginner" },
];

export function TournamentDetails({ tournament, onBack, onRegister, isRegistered = false }: TournamentDetailsProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysUntilDeadline = () => {
    const deadline = new Date(tournament.registrationDeadline);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const spotsProgress = ((tournament.totalSpots - tournament.spotsLeft) / tournament.totalSpots) * 100;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tournament.name,
        text: `Check out this pickleball tournament: ${tournament.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Removed from saved tournaments" : "Saved for later!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 overflow-hidden">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Browse
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleShare} className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSave} className="gap-2">
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>

          {/* Tournament Header */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {tournament.categories.map((category) => (
                <Badge key={category} variant="secondary" className="text-sm">
                  {category}
                </Badge>
              ))}
              <Badge variant={tournament.isRegistrationOpen ? "default" : "destructive"}>
                {tournament.isRegistrationOpen ? "Open Registration" : "Closed"}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {tournament.name}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              {tournament.location} | {formatDateShort(tournament.startDate)} - {formatDateShort(tournament.endDate)}
            </p>

            {/* Desktop CTA */}
            <div className="hidden md:flex justify-center gap-4">
              {!isRegistered ? (
                <Button 
                  size="lg" 
                  onClick={() => onRegister(tournament.id)}
                  disabled={!tournament.isRegistrationOpen || tournament.spotsLeft === 0}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                >
                  {tournament.spotsLeft === 0 ? "Tournament Full" : "Register Now"}
                </Button>
              ) : (
                <Button size="lg" variant="outline" className="px-8 py-3">
                  ✅ You're Registered
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Row */}
      <div className="border-b border-border/50 bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Dates</span>
              </div>
              <p className="font-medium">{formatDateShort(tournament.startDate)} - {formatDateShort(tournament.endDate)}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-sm">Spots Left</span>
              </div>
              <p className="font-medium">{tournament.spotsLeft} / {tournament.totalSpots}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Registration</span>
              </div>
              <p className="font-medium">{getDaysUntilDeadline()} days left</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Entry Fee</span>
              </div>
              <p className="font-medium">${tournament.entryFee}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Registration Progress</span>
              <span className="text-sm font-medium">{Math.round(spotsProgress)}% filled</span>
            </div>
            <Progress value={spotsProgress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Tabs / Desktop Sections */}
        <div className="md:hidden">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="venue">Venue</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <OverviewSection tournament={tournament} />
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <DetailsSection tournament={tournament} />
            </TabsContent>

            <TabsContent value="venue" className="mt-6">
              <VenueSection tournament={tournament} />
            </TabsContent>

            <TabsContent value="contact" className="mt-6">
              <ContactSection tournament={tournament} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block space-y-8">
          <OverviewSection tournament={tournament} />
          <DetailsSection tournament={tournament} />
          <VenueSection tournament={tournament} />
          <ContactSection tournament={tournament} />
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border/50">
        {!isRegistered ? (
          <Button 
            size="lg" 
            onClick={() => onRegister(tournament.id)}
            disabled={!tournament.isRegistrationOpen || tournament.spotsLeft === 0}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {tournament.spotsLeft === 0 ? "Tournament Full" : `Register Now - $${tournament.entryFee}`}
          </Button>
        ) : (
          <Button size="lg" variant="outline" className="w-full">
            ✅ You're Registered - View My Matches
          </Button>
        )}
      </div>
    </div>
  );
}

function OverviewSection({ tournament }: { tournament: Tournament }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tournament Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Join us for an exciting pickleball tournament featuring multiple categories and skill levels. 
          This tournament has been running successfully for 3 years and attracts players from across the region. 
          Experience competitive play in a friendly, well-organized environment with professional officiating and prizes for winners.
        </p>
        
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-medium">Organized by {tournament.organizer}</p>
            <p className="text-sm text-muted-foreground">Trusted tournament organizer</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">3+</div>
            <div className="text-sm text-muted-foreground">Years Running</div>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">150+</div>
            <div className="text-sm text-muted-foreground">Past Participants</div>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">4.8/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DetailsSection({ tournament }: { tournament: Tournament }) {
  return (
    <div className="space-y-6">
      {/* Categories & Fees */}
      <Card>
        <CardHeader>
          <CardTitle>Categories & Entry Fees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryDetails.map((category) => (
              <div key={category.category} className="flex justify-between items-center p-4 border border-border/50 rounded-lg">
                <div>
                  <h4 className="font-medium">{category.category}</h4>
                  <p className="text-sm text-muted-foreground">{category.format}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${category.fee}</p>
                  <p className="text-sm text-muted-foreground">Max {category.maxPlayers} players</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Tournament Schedule</CardTitle>
            <Button variant="outline" size="sm">View Full Schedule</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduleEvents.map((event, index) => (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors">
                <div className="w-16 text-sm font-medium text-muted-foreground">{event.time}</div>
                <div className="flex-1">{event.event}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rules & Policies */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Rules & Policies</CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="general">
              <AccordionTrigger>General Tournament Rules</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• All matches follow official USA Pickleball rules</li>
                  <li>• Players must arrive 30 minutes before their first match</li>
                  <li>• Proper athletic attire and non-marking court shoes required</li>
                  <li>• Tournament format may be adjusted based on final participation</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="registration">
              <AccordionTrigger>Registration & Refund Policy</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Full refund available up to 7 days before tournament</li>
                  <li>• 50% refund available 3-7 days before tournament</li>
                  <li>• No refunds within 3 days of tournament start</li>
                  <li>• Medical exemptions may apply with documentation</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Registered Players */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Registered Players</CardTitle>
            <Button variant="outline" size="sm">View All Players</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {registeredPlayers.slice(0, 5).map((player, index) => (
              <div key={index} className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={player.avatar} />
                  <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{player.name}</p>
                </div>
                <Badge variant="outline" className="text-xs">{player.level}</Badge>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            +{tournament.totalSpots - tournament.spotsLeft - 5} more players registered
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function VenueSection({ tournament }: { tournament: Tournament }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Venue Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">Location</h4>
          <p className="text-muted-foreground">{tournament.location}</p>
          <Button variant="outline" size="sm" className="mt-2 gap-2">
            <ExternalLink className="w-4 h-4" />
            Open in Google Maps
          </Button>
        </div>

        {/* Mock Map */}
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Interactive map would load here</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Facilities</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-sm">🚗 Parking</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-sm">🪑 Seating</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-sm">🚿 Locker Rooms</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-sm">🥤 Refreshments</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactSection({ tournament }: { tournament: Tournament }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact & Support</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{tournament.organizer}</p>
              <p className="text-sm text-muted-foreground">Tournament Organizer</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3">
              <Mail className="w-4 h-4" />
              tournaments@pickleball.com
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Phone className="w-4 h-4" />
              (555) 123-4567
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <MessageCircle className="w-4 h-4" />
              Message on WhatsApp
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Need help with registration or have questions about the tournament? 
            Our support team is available 9 AM - 6 PM, Monday through Friday.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}