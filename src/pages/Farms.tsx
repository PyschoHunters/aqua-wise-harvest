
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const Farms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="agri-container py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-agri-green-dark">My Farms</h1>
          <div className="flex gap-2">
            <Input placeholder="Search farms..." className="w-full sm:w-60" />
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
              {Array.from({ length: 6 }).map((_, idx) => (
                <Card key={idx} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-agri-green-light bg-opacity-30 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-agri-green-dark opacity-40" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>Farm {idx + 1}</CardTitle>
                      <Badge variant={idx % 3 !== 1 ? "outline" : "destructive"} className="text-xs">
                        {idx % 3 !== 1 ? "Optimal" : "Needs Water"}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> 
                      {idx % 2 === 0 ? "Midwest Region" : "Eastern Region"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Size:</span>
                        <span className="font-medium">{80 + idx * 10} acres</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Crops:</span>
                        <span className="font-medium">
                          {idx % 3 === 0 ? "Corn, Wheat" : idx % 3 === 1 ? "Soybean" : "Alfalfa"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Soil Moisture:</span>
                        <span 
                          className={`font-medium ${idx % 3 !== 1 ? "text-green-600" : "text-red-500"}`}
                        >
                          {idx % 3 !== 1 ? "58%" : "42%"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Last Irrigation:</span>
                        <span className="font-medium">{idx % 4 + 1} days ago</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Schedule Irrigation</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="map">
            <div className="mt-6 border rounded-lg overflow-hidden h-[600px] flex items-center justify-center bg-gray-100 text-gray-500">
              <div className="text-center">
                <MapPin className="h-16 w-16 mx-auto opacity-30 mb-4" />
                <p className="text-lg font-medium">Farm Map View</p>
                <p className="text-sm max-w-md mx-auto mt-2">
                  This area would display an interactive map showing all farm locations with detailed information available on click.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
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
