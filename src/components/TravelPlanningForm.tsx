import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Plane, Heart } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { TravelResults } from "./TravelResults";

interface DateRange {
  from?: Date;
  to?: Date;
}

interface TravelData {
  fromCity: string;
  toCity: string;
  arrivalDate?: string;
  departureDate?: string;
  travelWishes: string;
  timestamp: string;
  webhookResults?: any;
}

export const TravelPlanningForm = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [travelWishes, setTravelWishes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<TravelData | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const travelData = {
        fromCity,
        toCity,
        arrivalDate: dateRange.from?.toISOString(),
        departureDate: dateRange.to?.toISOString(),
        travelWishes,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(
        "https://sergiysvirkov.app.n8n.cloud/webhook-test/a1717cc2-6b62-4683-b0c1-385d6d8191ef",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(travelData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const webhookResponse = await response.json();
      
      // Set search results with webhook response
      setSearchResults({
        ...travelData,
        webhookResults: webhookResponse
      });

      toast({
        title: "Travel Request Sent!",
        description: "Your Ukrainian adventure ideas are ready! Check the results on the right.",
      });
    } catch (error) {
      console.error("Error sending travel data:", error);
      toast({
        title: "Error",
        description: "Failed to send your travel request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {/* Form Section */}
      <div className="space-y-6">
        <Card className="shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-white to-slate-50">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-ukraine-blue to-ukraine-yellow bg-clip-text text-transparent">
              Plan Your Ukrainian Adventure
            </CardTitle>
            <p className="text-muted-foreground text-lg mt-2">
              Discover the beauty of Ukraine with personalized travel recommendations
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-6">
                {/* From City */}
                <div className="space-y-2">
                  <Label htmlFor="fromCity" className="text-base font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-ukraine-blue" />
                    From which city?
                  </Label>
                  <Input
                    id="fromCity"
                    placeholder="Enter your current city"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="h-12 border-2 focus:border-ukraine-blue transition-colors"
                  />
                </div>

                {/* To City */}
                <div className="space-y-2">
                  <Label htmlFor="toCity" className="text-base font-semibold flex items-center gap-2">
                    <Plane className="h-4 w-4 text-ukraine-blue" />
                    Where do you want to go?
                  </Label>
                  <Input
                    id="toCity"
                    placeholder="Enter destination city in Ukraine"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="h-12 border-2 focus:border-ukraine-blue transition-colors"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-ukraine-blue" />
                  Travel Dates
                </Label>
                <div className="grid grid-cols-1 gap-4">
                  {/* Arrival Date */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "h-12 justify-start text-left font-normal border-2 hover:border-ukraine-blue",
                          !dateRange.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? format(dateRange.from, "PPP") : <span>Arrival date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateRange.from}
                        onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>

                  {/* Departure Date */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "h-12 justify-start text-left font-normal border-2 hover:border-ukraine-blue",
                          !dateRange.to && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.to ? format(dateRange.to, "PPP") : <span>Departure date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateRange.to}
                        onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                        disabled={(date) => date < new Date() || (dateRange.from && date <= dateRange.from)}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Travel Wishes */}
              <div className="space-y-2">
                <Label htmlFor="travelWishes" className="text-base font-semibold flex items-center gap-2">
                  <Heart className="h-4 w-4 text-ukraine-yellow" />
                  Your Travel Wishes
                </Label>
                <Textarea
                  id="travelWishes"
                  placeholder="Tell us about your interests, preferred activities, budget, accommodation preferences, food you'd like to try, or anything else that would help us create the perfect itinerary for you..."
                  value={travelWishes}
                  onChange={(e) => setTravelWishes(e.target.value)}
                  className="min-h-[120px] border-2 focus:border-ukraine-blue transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  variant="hero"
                  className="w-full h-14 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Generating Adventure..." : "Generate My Ukrainian Adventure"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {searchResults ? (
          <TravelResults travelData={searchResults} />
        ) : (
          <Card className="h-full flex items-center justify-center min-h-[400px]">
            <CardContent className="text-center">
              <div className="text-muted-foreground">
                <Heart className="h-12 w-12 mx-auto mb-4 text-ukraine-yellow/30" />
                <h3 className="text-lg font-semibold mb-2">Your Adventure Awaits</h3>
                <p>Fill out the form and click "Generate" to see personalized travel recommendations for Ukraine.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};