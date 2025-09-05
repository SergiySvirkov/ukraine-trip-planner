import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Heart, Clock, Star } from "lucide-react";
import { format } from "date-fns";

interface TravelResultsProps {
  travelData: {
    fromCity: string;
    toCity: string;
    arrivalDate?: string;
    departureDate?: string;
    travelWishes: string;
    timestamp: string;
  };
}

export const TravelResults = ({ travelData }: TravelResultsProps) => {
  const mockResults = [
    {
      id: 1,
      title: "Historic City Center Tour",
      description: "Explore the ancient architecture and cultural landmarks of your destination",
      duration: "4-5 hours",
      rating: 4.8,
      category: "Culture & History"
    },
    {
      id: 2,
      title: "Traditional Ukrainian Cuisine Experience",
      description: "Taste authentic local dishes and learn about Ukrainian culinary traditions",
      duration: "2-3 hours",
      rating: 4.9,
      category: "Food & Drink"
    },
    {
      id: 3,
      title: "Local Markets & Artisan Shops",
      description: "Discover handcrafted souvenirs and interact with local artisans",
      duration: "3-4 hours",
      rating: 4.7,
      category: "Shopping"
    },
    {
      id: 4,
      title: "Nature & Parks Walking Tour",
      description: "Enjoy the natural beauty and green spaces around the city",
      duration: "2-3 hours",
      rating: 4.6,
      category: "Nature"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Trip Summary */}
      <Card className="border-ukraine-blue/20 bg-gradient-to-br from-ukraine-blue/5 to-ukraine-yellow/5">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Star className="h-5 w-5 text-ukraine-yellow" />
            Your Ukrainian Adventure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-ukraine-blue" />
            <span className="font-medium">{travelData.fromCity}</span>
            <span className="text-muted-foreground">→</span>
            <span className="font-medium">{travelData.toCity}</span>
          </div>
          
          {travelData.arrivalDate && travelData.departureDate && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-ukraine-blue" />
              <span>{format(new Date(travelData.arrivalDate), "MMM dd")} - {format(new Date(travelData.departureDate), "MMM dd, yyyy")}</span>
            </div>
          )}
          
          {travelData.travelWishes && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Heart className="h-4 w-4 text-ukraine-yellow" />
                Your Preferences
              </div>
              <p className="text-sm text-muted-foreground pl-6">{travelData.travelWishes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recommended Experiences</CardTitle>
          <p className="text-muted-foreground">
            Based on your preferences, here are some great activities in {travelData.toCity}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockResults.map((result, index) => (
            <div key={result.id}>
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground">
                      {result.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {result.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {result.category}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{result.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-ukraine-yellow text-ukraine-yellow" />
                    <span>{result.rating}</span>
                  </div>
                </div>
              </div>
              
              {index < mockResults.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Generated timestamp */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Results generated on {format(new Date(travelData.timestamp), "MMM dd, yyyy 'at' HH:mm")}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};