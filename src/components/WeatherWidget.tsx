
import { useState } from 'react';
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudSun, Droplet, Sun, ThermometerSun, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, addDays } from "date-fns";

// Sample weather data - in a real app, this would be fetched from a weather API
const sampleWeather = {
  current: {
    time: "2025-05-18T10:00:00Z",
    temp: 72,
    condition: "partly-cloudy",
    humidity: 65,
    windSpeed: 8,
    precip: 0,
    feelsLike: 74,
    uvIndex: 5,
    pressure: "1012 mb",
    visibility: "10 mi"
  },
  forecast: [
    { day: "Today", temp: 72, condition: "partly-cloudy", precip: 10 },
    { day: "Tomorrow", temp: 68, condition: "rain", precip: 60 },
    { day: "Wed", temp: 65, condition: "rain", precip: 80 },
    { day: "Thu", temp: 70, condition: "sunny", precip: 0 },
    { day: "Fri", temp: 75, condition: "sunny", precip: 0 }
  ],
  hourly: [
    { time: "10 AM", temp: 72, condition: "partly-cloudy", precip: 10 },
    { time: "11 AM", temp: 73, condition: "partly-cloudy", precip: 5 },
    { time: "12 PM", temp: 75, condition: "sunny", precip: 0 },
    { time: "1 PM", temp: 76, condition: "sunny", precip: 0 },
    { time: "2 PM", temp: 77, condition: "sunny", precip: 0 },
    { time: "3 PM", temp: 77, condition: "partly-cloudy", precip: 5 },
    { time: "4 PM", temp: 76, condition: "partly-cloudy", precip: 10 },
    { time: "5 PM", temp: 74, condition: "partly-cloudy", precip: 15 },
  ],
  locations: [
    { name: "Midwest Region", lat: 41.878, lng: -93.097, current: "Main Field" },
    { name: "North Region", lat: 44.763, lng: -93.661, current: "North Valley" },
    { name: "East Region", lat: 40.712, lng: -74.005, current: "East Field" },
    { name: "Western Region", lat: 37.774, lng: -122.419, current: "Western Plot" },
    { name: "Southern Region", lat: 29.760, lng: -95.369, current: "South Grove" }
  ]
};

// Weather icon component
const WeatherIcon = ({ condition, className = "h-6 w-6" }: { condition: string, className?: string }) => {
  switch (condition) {
    case "sunny":
      return <Sun className={className} />;
    case "partly-cloudy":
      return <CloudSun className={className} />;
    case "cloudy":
      return <Cloud className={className} />;
    case "rain":
      return <CloudRain className={className} />;
    case "drizzle":
      return <CloudDrizzle className={className} />;
    case "snow":
      return <CloudSnow className={className} />;
    default:
      return <Sun className={className} />;
  }
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState(sampleWeather);
  const [viewType, setViewType] = useState("daily");
  const [selectedLocation, setSelectedLocation] = useState(sampleWeather.locations[0].name);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // In a real app, you would fetch weather data from an API
  // useEffect(() => {
  //   async function fetchWeather() {
  //     const response = await fetch('weather-api-url');
  //     const data = await response.json();
  //     setWeather(data);
  //   }
  //   fetchWeather();
  // }, [selectedLocation]);

  // Function to get current date display
  const getCurrentDateDisplay = () => {
    const now = new Date();
    return format(now, "EEEE, MMMM d, yyyy");
  };

  return (
    <Card className={isExpanded ? "col-span-3" : ""}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Weather Forecast</CardTitle>
        <div className="flex items-center gap-2">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {weather.locations.map(location => (
                <SelectItem key={location.name} value={location.name}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minimize-2"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-maximize-2"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2 text-sm text-gray-500">{getCurrentDateDisplay()}</div>
        
        <div className="flex flex-col">
          {/* Current weather */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <WeatherIcon condition={weather.current.condition} className="h-12 w-12 text-agri-blue" />
              <div>
                <div className="text-3xl font-bold">{weather.current.temp}°F</div>
                <div className="text-sm text-gray-500">Feels like {weather.current.feelsLike}°F</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">
                {selectedLocation}
              </div>
              <div className="text-xs text-gray-500 flex items-center justify-end gap-1">
                <Droplet className="h-3 w-3" /> {weather.current.humidity}%
              </div>
            </div>
          </div>
          
          {/* Additional Current Details (shown when expanded) */}
          {isExpanded && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
              <div>
                <div className="text-xs text-gray-500">Wind</div>
                <div className="flex items-center gap-1">
                  <Wind className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{weather.current.windSpeed} mph</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Humidity</div>
                <div className="flex items-center gap-1">
                  <Droplet className="h-4 w-4 text-agri-blue" />
                  <span className="font-medium">{weather.current.humidity}%</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">UV Index</div>
                <div className="flex items-center gap-1">
                  <ThermometerSun className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">{weather.current.uvIndex}</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Precipitation</div>
                <div className="flex items-center gap-1">
                  <CloudRain className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{weather.current.precip}%</span>
                </div>
              </div>
            </div>
          )}

          {/* View toggle */}
          <div className="border-b border-t py-2 mb-2">
            <div className="flex justify-center">
              <Button 
                variant={viewType === "daily" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setViewType("daily")}
              >
                Daily
              </Button>
              <Button 
                variant={viewType === "hourly" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setViewType("hourly")}
              >
                Hourly
              </Button>
            </div>
          </div>

          {/* Forecast for upcoming days */}
          {viewType === "daily" && (
            <div className="grid grid-cols-5 gap-2">
              {weather.forecast.map((day, index) => (
                <HoverCard key={index}>
                  <HoverCardTrigger asChild>
                    <div className="flex flex-col items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md">
                      <div className="text-xs font-medium mb-1">
                        {index === 0 ? "Today" : format(addDays(new Date(), index), "EEE")}
                      </div>
                      <WeatherIcon condition={day.condition} className="h-6 w-6 mb-1" />
                      <div className="text-sm font-bold">{day.temp}°</div>
                      <div className="text-xs text-gray-500">{day.precip}%</div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">
                          {index === 0 ? "Today" : format(addDays(new Date(), index), "EEEE")}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {format(addDays(new Date(), index), "MMMM d, yyyy")}
                        </p>
                      </div>
                      <WeatherIcon condition={day.condition} className="h-8 w-8" />
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Temperature:</span> {day.temp}°F
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Precipitation:</span> {day.precip}% chance
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Condition:</span> {day.condition.replace('-', ' ')}
                      </div>
                    </div>
                    <div className="mt-2 text-xs">
                      {day.precip > 20 ? (
                        <div className="text-blue-600">
                          Consider adjusting your irrigation schedule.
                        </div>
                      ) : day.precip === 0 ? (
                        <div className="text-orange-600">
                          No precipitation expected. Ensure adequate irrigation.
                        </div>
                      ) : (
                        <div className="text-gray-600">
                          Light chance of precipitation. Monitor conditions.
                        </div>
                      )}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          )}
          
          {/* Hourly forecast */}
          {viewType === "hourly" && (
            <div className="overflow-x-auto">
              <div className="flex gap-3 min-w-[600px] pb-2">
                {weather.hourly.map((hour, index) => (
                  <HoverCard key={index}>
                    <HoverCardTrigger asChild>
                      <div className="flex flex-col items-center justify-between hover:bg-gray-50 p-2 rounded-md cursor-pointer min-w-[60px]">
                        <div className="text-xs font-medium">{hour.time}</div>
                        <WeatherIcon condition={hour.condition} className="h-6 w-6 my-1" />
                        <div className="text-sm font-bold">{hour.temp}°</div>
                        <div className="text-xs text-gray-500">{hour.precip}%</div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">Today, {hour.time}</h4>
                        <WeatherIcon condition={hour.condition} className="h-6 w-6" />
                      </div>
                      <div className="mt-2 space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Temperature:</span> {hour.temp}°F
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Precipitation:</span> {hour.precip}% chance
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4 text-xs text-gray-500">
            <p>This weather data can help you plan irrigation efficiently.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
