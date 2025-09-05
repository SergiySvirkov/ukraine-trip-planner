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
    webhookResults?: any;
  };
}

export const TravelResults = ({ travelData }: TravelResultsProps) => {
  // Display webhook results if available, otherwise show placeholder
  const hasWebhookResults = travelData.webhookResults;

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
          <CardTitle className="text-xl">
            {hasWebhookResults ? "Your Personalized Travel Recommendations" : "Generating Recommendations..."}
          </CardTitle>
          <p className="text-muted-foreground">
            {hasWebhookResults 
              ? `Custom recommendations for your trip to ${travelData.toCity}`
              : "Please wait while we generate your personalized travel recommendations..."
            }
          </p>
        </CardHeader>
        <CardContent>
          {hasWebhookResults ? (
            <div className="space-y-4">
              <pre className="whitespace-pre-wrap text-sm bg-muted/50 p-4 rounded-lg">
                {JSON.stringify(travelData.webhookResults, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ukraine-blue mx-auto mb-4"></div>
                <p className="text-muted-foreground">Analyzing your preferences...</p>
              </div>
            </div>
          )}
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