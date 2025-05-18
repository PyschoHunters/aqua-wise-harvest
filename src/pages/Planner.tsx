
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Calendar, Check, Cloud, CloudDrizzle, CloudRain, DropletIcon, Leaf } from "lucide-react";
import WeatherWidget from "@/components/WeatherWidget";
import IrrigationPlanner from "@/components/IrrigationPlanner";

const Planner = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="agri-container py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-agri-green-dark">Smart Irrigation Planner</h1>
            <p className="text-gray-500 mt-1">
              Optimize your water usage with intelligent irrigation scheduling
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <IrrigationPlanner />
          </div>
          <div>
            <WeatherWidget />
          </div>
        </div>
        
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Create Irrigation Schedule</CardTitle>
              <CardDescription>
                Generate a smart irrigation schedule based on crop requirements and environmental conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="farm">Select Farm</Label>
                    <Select>
                      <SelectTrigger id="farm">
                        <SelectValue placeholder="Choose a farm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Field</SelectItem>
                        <SelectItem value="north">North Valley</SelectItem>
                        <SelectItem value="east">East Field</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="crop">Crop Type</Label>
                    <Select>
                      <SelectTrigger id="crop">
                        <SelectValue placeholder="Choose a crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corn">Corn</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="soybean">Soybean</SelectItem>
                        <SelectItem value="alfalfa">Alfalfa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="soil">Soil Type</Label>
                    <Select>
                      <SelectTrigger id="soil">
                        <SelectValue placeholder="Choose soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="loam">Loam</SelectItem>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="silt">Silt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="moisture">Current Soil Moisture (%)</Label>
                    <Input id="moisture" type="number" placeholder="e.g. 55" />
                  </div>
                  
                  <div>
                    <Label htmlFor="method">Irrigation Method</Label>
                    <Select>
                      <SelectTrigger id="method">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="drip">Drip Irrigation</SelectItem>
                        <SelectItem value="sprinkler">Sprinkler System</SelectItem>
                        <SelectItem value="furrow">Furrow Irrigation</SelectItem>
                        <SelectItem value="pivot">Center Pivot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full">Generate Optimal Schedule</Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t pt-6">
                <h3 className="font-medium mb-4">Recommendation Factors:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                    <DropletIcon className="h-8 w-8 text-blue-500 mb-2" />
                    <h4 className="font-medium text-sm">Water Needs</h4>
                    <p className="text-xs text-center mt-1 text-gray-600">Based on crop water requirements</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                    <Leaf className="h-8 w-8 text-green-500 mb-2" />
                    <h4 className="font-medium text-sm">Growth Stage</h4>
                    <p className="text-xs text-center mt-1 text-gray-600">Adjusts for current crop stage</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-amber-50 rounded-lg">
                    <Cloud className="h-8 w-8 text-amber-500 mb-2" />
                    <h4 className="font-medium text-sm">Weather Data</h4>
                    <p className="text-xs text-center mt-1 text-gray-600">Considers forecast conditions</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                    <CloudRain className="h-8 w-8 text-purple-500 mb-2" />
                    <h4 className="font-medium text-sm">Soil Moisture</h4>
                    <p className="text-xs text-center mt-1 text-gray-600">Optimizes based on soil data</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 shadow-inner py-6 mt-8">
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

export default Planner;
