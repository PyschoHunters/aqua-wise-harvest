
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample farms data
const farmData = [
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
    irrigationMethod: "Center Pivot",
    coordinates: { lat: 41.878, lng: -93.097 }
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
    irrigationMethod: "Drip Irrigation",
    coordinates: { lat: 44.763, lng: -93.661 }
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
    irrigationMethod: "Sprinkler System",
    coordinates: { lat: 40.712, lng: -74.005 }
  },
  {
    id: 4,
    name: "Western Plot",
    area: "110 acres",
    crops: ["Cotton", "Corn"],
    location: "Western Region",
    moisture: 52,
    lastIrrigation: "3 days ago",
    status: "optimal",
    image: "https://images.stockcake.com/public/4/3/3/43369225-0f3f-49cd-9c32-c7a334a14a37_large/tropical-farm-landscape-stockcake.jpg",
    soilType: "Silt",
    irrigationMethod: "Furrow Irrigation",
    coordinates: { lat: 37.774, lng: -122.419 }
  },
  {
    id: 5,
    name: "South Grove",
    area: "76 acres",
    crops: ["Rice", "Wheat"],
    location: "Southern Region",
    moisture: 65,
    lastIrrigation: "1 day ago",
    status: "optimal",
    image: "https://images.stockcake.com/public/4/3/3/43369225-0f3f-49cd-9c32-c7a334a14a37_large/tropical-farm-landscape-stockcake.jpg",
    soilType: "Clay Loam",
    irrigationMethod: "Flood Irrigation",
    coordinates: { lat: 29.760, lng: -95.369 }
  },
  {
    id: 6,
    name: "Highland Farm",
    area: "88 acres",
    crops: ["Potato", "Alfalfa"],
    location: "Mountain Region",
    moisture: 45,
    lastIrrigation: "5 days ago",
    status: "low",
    image: "https://hips.hearstapps.com/hbu.h-cdn.co/assets/16/15/1460404413-1460150763-1460127682-oregon-farm.jpg?crop=0.665xw:1.00xh;0.0442xw,0&resize=980:*",
    soilType: "Loam",
    irrigationMethod: "Drip Irrigation",
    coordinates: { lat: 39.739, lng: -104.990 }
  }
];

const Farms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFarm, setSelectedFarm] = useState<typeof farmData[0] | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedMapFarm, setSelectedMapFarm] = useState<typeof farmData[0] | null>(null);
  const navigate = useNavigate();

  const filteredFarms = farmData.filter(farm => 
    farm.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    farm.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farm.crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewDetails = (farm: typeof farmData[0]) => {
    setSelectedFarm(farm);
    setIsDetailsOpen(true);
  };

  const handleScheduleIrrigation = (farm: typeof farmData[0]) => {
    navigate("/planner", { state: { selectedFarm: farm.name } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="agri-container py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-agri-green-dark">My Farms</h1>
          <div className="flex gap-2">
            <Input 
              placeholder="Search farms..." 
              className="w-full sm:w-60" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button>+ Add Farm</Button>
          </div>
        </div>
        
        <Tabs defaultValue="list" className="mb-8">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredFarms.map((farm) => (
                <Card key={farm.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-agri-green-light bg-opacity-30 relative">
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
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{farm.name}</CardTitle>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> 
                      {farm.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Size:</span>
                        <span className="font-medium">{farm.area}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Crops:</span>
                        <span className="font-medium">
                          {farm.crops.join(", ")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Soil Moisture:</span>
                        <span 
                          className={`font-medium ${farm.status === "optimal" ? "text-green-600" : "text-red-500"}`}
                        >
                          {farm.moisture}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Last Irrigation:</span>
                        <span className="font-medium">{farm.lastIrrigation}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(farm)}>View Details</Button>
                    <Button variant="outline" size="sm" onClick={() => handleScheduleIrrigation(farm)}>Schedule Irrigation</Button>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredFarms.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-xl font-medium text-gray-600">No farms found</p>
                  <p className="text-gray-500 mt-2">Try a different search term</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="map">
            <div className="mt-6 border rounded-lg overflow-hidden h-[600px] relative bg-gray-100">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=40,-95&zoom=4&size=1200x600&scale=2&maptype=terrain')" }}>
                {/* Map Pins */}
                {farmData.map(farm => (
                  <div 
                    key={farm.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:z-10"
                    style={{ 
                      left: `${(farm.coordinates.lng + 130) / 260 * 100}%`, 
                      top: `${(90 - farm.coordinates.lat) / 180 * 100}%` 
                    }}
                    onClick={() => setSelectedMapFarm(farm)}
                  >
                    <div className={`p-1 rounded-full ${farm.status === "optimal" ? "bg-green-500" : "bg-red-500"}`}>
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute bg-white rounded px-2 py-1 text-xs font-medium shadow-md whitespace-nowrap left-1/2 transform -translate-x-1/2 -translate-y-full -mt-1">
                      {farm.name}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Farm Info Card on Map */}
              {selectedMapFarm && (
                <div className="absolute bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={selectedMapFarm.image} 
                      alt={selectedMapFarm.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{selectedMapFarm.name}</h3>
                    <p className="text-sm text-gray-600">{selectedMapFarm.location}</p>
                    <div className="grid grid-cols-2 gap-2 my-2 text-sm">
                      <div>
                        <span className="text-gray-500">Size:</span>
                        <span className="ml-1">{selectedMapFarm.area}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Moisture:</span>
                        <span className={`ml-1 ${selectedMapFarm.moisture < 50 ? "text-red-500" : "text-green-500"}`}>
                          {selectedMapFarm.moisture}%
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" onClick={() => handleViewDetails(selectedMapFarm)}>View Details</Button>
                      <Button size="sm" variant="outline" onClick={() => setSelectedMapFarm(null)}>Close</Button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="absolute top-4 left-4 bg-white p-3 rounded-md shadow-md">
                <h3 className="font-medium text-sm mb-1">Map Legend</h3>
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                    <span>Optimal</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                    <span>Needs Water</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
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
      
      <footer className="bg-white dark:bg-gray-800 shadow-inner py-6">
        <div className="agri-container">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm">AquaFarm - Agricultural Water Management System</p>
            <p className="text-xs mt-1">© 2025 Capstone Project</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Farms;
