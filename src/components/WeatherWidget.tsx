
import { useState, useEffect } from 'react';
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudSun, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample weather data - in a real app, this would be fetched from a weather API
const sampleWeather = {
  current: {
    time: "2025-05-18T10:00:00Z",
    temp: 72,
    condition: "partly-cloudy",
    humidity: 65,
    windSpeed: 8,
    precip: 0
  },
  forecast: [
    { day: "Today", temp: 72, condition: "partly-cloudy", precip: 10 },
    { day: "Tomorrow", temp: 68, condition: "rain", precip: 60 },
    { day: "Wed", temp: 65, condition: "rain", precip: 80 },
    { day: "Thu", temp: 70, condition: "sunny", precip: 0 },
    { day: "Fri", temp: 75, condition: "sunny", precip: 0 }
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
  
  // In a real app, you would fetch weather data from an API
  // useEffect(() => {
  //   async function fetchWeather() {
  //     const response = await fetch('weather-api-url');
  //     const data = await response.json();
  //     setWeather(data);
  //   }
  //   fetchWeather();
  // }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {/* Current weather */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <WeatherIcon condition={weather.current.condition} className="h-12 w-12 text-agri-blue" />
              <div>
                <div className="text-3xl font-bold">{weather.current.temp}°F</div>
                <div className="text-sm text-gray-500">Humidity: {weather.current.humidity}%</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">Now</div>
              <div className="text-xs text-gray-500">Wind: {weather.current.windSpeed} mph</div>
            </div>
          </div>

          {/* Forecast for upcoming days */}
          <div className="grid grid-cols-5 gap-2 border-t pt-4">
            {weather.forecast.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs font-medium mb-1">{day.day}</div>
                <WeatherIcon condition={day.condition} className="h-6 w-6 mb-1" />
                <div className="text-sm font-bold">{day.temp}°</div>
                <div className="text-xs text-gray-500">{day.precip}%</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            <p>This weather data can help you plan irrigation efficiently.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
