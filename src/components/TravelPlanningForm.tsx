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

interface DateRange {
  from?: Date;
  to?: Date;
}

export const TravelPlanningForm = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [travelWishes, setTravelWishes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({ fromCity, toCity, dateRange, travelWishes });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-white to-slate-50">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            >
              Generate My Ukrainian Adventure
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};