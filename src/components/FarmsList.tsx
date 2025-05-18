
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Calendar, Droplet } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    status: "optimal",
    image: "https://media.istockphoto.com/id/1363571533/photo/open-soybean-field-at-sunset.jpg?s=612x612&w=0&k=20&c=TEw_oBj-8R8Ycd-bpHnUNMtQwvxt1vK5CYcpP1hMiTU=",
    soilType: "Loam",
    irrigationMethod: "Center Pivot"
  },
  {
    id: 2,
    name: "North Valley",
    area: "84 acres",
    crops: ["Soybean"],
    location: "North Region",
    moisture: 42,
    lastIrrigation: "4 days ago",
    status: "low",
    image: "https://media.istockphoto.com/id/543212762/photo/tractor-cultivating-field-at-spring.jpg?s=612x612&w=0&k=20&c=uJDy7MECNZeHDKfUrLNeQuT7A1IqQe89lmLREhjIJYU=",
    soilType: "Clay",
    irrigationMethod: "Drip Irrigation"
  },
  {
    id: 3,
    name: "East Field",
    area: "95 acres",
    crops: ["Alfalfa", "Wheat"],
    location: "East Region",
    moisture: 60,
    lastIrrigation: "1 day ago",
    status: "optimal",
    image: "https://plus.unsplash.com/premium_photo-1661912366100-edf0de442ac3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFybSUyMGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
    soilType: "Sandy Loam",
    irrigationMethod: "Sprinkler System"
  }
];

export default function FarmsList() {
  const [selectedFarm, setSelectedFarm] = useState<(typeof farms)[0] | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const navigate = useNavigate();

  const handleScheduleIrrigation = (farm: (typeof farms)[0]) => {
    navigate("/planner", { state: { selectedFarm: farm.name } });
  };

  const handleViewDetails = (farm: (typeof farms)[0]) => {
    setSelectedFarm(farm);
    setIsDetailsOpen(true);
  };

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
            className="border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer animate-fade-in"
          >
            <div className="w-full h-48 relative">
              <img 
                src={farm.image} 
                alt={farm.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={farm.status === "optimal" ? "outline" : "destructive"} className="text-xs bg-white/80">
                  {farm.status === "optimal" ? "Optimal" : "Needs Water"}
                </Badge>
              </div>
            </div>
            <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-semibold">{farm.name}</h3>
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
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(farm)}>View Details</Button>
                  <Button variant="outline" size="sm" onClick={() => handleScheduleIrrigation(farm)}>Schedule Irrigation</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedFarm && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedFarm.name}</DialogTitle>
                <DialogDescription>
                  {selectedFarm.location} • {selectedFarm.area}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="rounded-md overflow-hidden h-48">
                  <img 
                    src={selectedFarm.image} 
                    alt={selectedFarm.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Farm Details</h4>
                    <div className="text-sm">
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-gray-500">Location:</span>
                        <span>{selectedFarm.location}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-gray-500">Total Area:</span>
                        <span>{selectedFarm.area}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-gray-500">Soil Type:</span>
                        <span>{selectedFarm.soilType}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-gray-500">Irrigation Method:</span>
                        <span>{selectedFarm.irrigationMethod}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Current Status</h4>
                    <div className="text-sm">
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-gray-500">Soil Moisture:</span>
                        <span className={selectedFarm.moisture < 50 ? "text-red-500" : "text-green-500"}>
                          {selectedFarm.moisture}% ({selectedFarm.moisture < 50 ? "Low" : "Good"})
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-gray-500">Last Irrigation:</span>
                        <span>{selectedFarm.lastIrrigation}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-gray-500">Current Crops:</span>
                        <span>{selectedFarm.crops.join(", ")}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-500">Status:</span>
                        <span className={selectedFarm.status === "optimal" ? "text-green-500" : "text-red-500"}>
                          {selectedFarm.status === "optimal" ? "Optimal" : "Needs Water"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Close</Button>
                  <Button onClick={() => handleScheduleIrrigation(selectedFarm)}>Schedule Irrigation</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
