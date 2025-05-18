
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample farms data - in a real app, this would be fetched from an API
const farms = [
  {
    id: 1,
    name: "Main Field",
    area: "126 acres",
    crops: ["Corn", "Wheat"],
    location: "Midwest Region",
    moisture: 58,
    lastIrrigation: "2 days ago",
    status: "optimal"
  },
  {
    id: 2,
    name: "North Valley",
    area: "84 acres",
    crops: ["Soybean"],
    location: "North Region",
    moisture: 42,
    lastIrrigation: "4 days ago",
    status: "low"
  },
  {
    id: 3,
    name: "East Field",
    area: "95 acres",
    crops: ["Alfalfa", "Wheat"],
    location: "East Region",
    moisture: 60,
    lastIrrigation: "1 day ago",
    status: "optimal"
  }
];

export default function FarmsList() {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">My Farms</CardTitle>
        <Button size="sm" variant="outline">+ Add Farm</Button>
      </CardHeader>
      <CardContent className="space-y-5">
        {farms.map((farm) => (
          <div 
            key={farm.id} 
            className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{farm.name}</h3>
                <Badge variant={farm.status === "optimal" ? "outline" : "destructive"} className="text-xs">
                  {farm.status === "optimal" ? "Optimal" : "Needs Water"}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{farm.location} • {farm.area}</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {farm.crops.map((crop, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs inline-block bg-agri-green/10 text-agri-green rounded px-2 py-0.5"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <div className="text-right sm:text-left">
                <div className="text-sm text-gray-500">Soil Moisture</div>
                <div className="text-lg font-medium">
                  {farm.moisture}%
                  <span className={`ml-1 text-xs ${farm.moisture < 50 ? "text-red-500" : "text-green-500"}`}>
                    {farm.moisture < 50 ? "Low" : "Good"}
                  </span>
                </div>
              </div>
              <div className="text-right sm:text-left">
                <div className="text-sm text-gray-500">Last Irrigation</div>
                <div className="text-lg font-medium">{farm.lastIrrigation}</div>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
