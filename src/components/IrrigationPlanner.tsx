
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Check, DropletIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data - in a real app, this would be fetched from an API
const scheduleData = [
  {
    id: 1,
    farmName: "Main Field",
    date: "May 19, 2025",
    time: "8:00 AM",
    duration: "3 hours",
    status: "scheduled",
    amount: "1.2 inches"
  },
  {
    id: 2,
    farmName: "North Valley",
    date: "May 19, 2025",
    time: "2:00 PM", 
    duration: "4 hours",
    status: "scheduled",
    amount: "1.5 inches"
  },
  {
    id: 3,
    farmName: "East Field",
    date: "May 21, 2025",
    time: "6:00 AM",
    duration: "2.5 hours",
    status: "scheduled",
    amount: "1.0 inches" 
  },
  {
    id: 4,
    farmName: "Main Field",
    date: "May 16, 2025",
    time: "7:30 AM",
    duration: "3 hours",
    status: "completed",
    amount: "1.2 inches"
  },
];

export default function IrrigationPlanner() {
  const [selectedFarm, setSelectedFarm] = useState("all");
  
  const upcomingSchedules = scheduleData.filter(item => item.status === "scheduled");
  const pastSchedules = scheduleData.filter(item => item.status === "completed");
  
  const filteredUpcoming = selectedFarm === "all" 
    ? upcomingSchedules 
    : upcomingSchedules.filter(item => item.farmName === selectedFarm);
  
  const filteredPast = selectedFarm === "all"
    ? pastSchedules
    : pastSchedules.filter(item => item.farmName === selectedFarm);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold">Irrigation Planner</CardTitle>
            <CardDescription>Schedule and track your irrigation</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedFarm} onValueChange={setSelectedFarm}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Farm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Farms</SelectItem>
                <SelectItem value="Main Field">Main Field</SelectItem>
                <SelectItem value="North Valley">North Valley</SelectItem>
                <SelectItem value="East Field">East Field</SelectItem>
              </SelectContent>
            </Select>
            <Button>+ New Schedule</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="space-y-4">
              {filteredUpcoming.length > 0 ? (
                filteredUpcoming.map((item) => (
                  <div 
                    key={item.id} 
                    className="border rounded-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in"
                  >
                    <div>
                      <h3 className="font-medium">{item.farmName}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{item.date} • {item.time}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <div className="text-xs text-gray-500">Duration</div>
                        <div className="font-medium">{item.duration}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Amount</div>
                        <div className="font-medium">{item.amount}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">Cancel</Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No upcoming irrigation schedules
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4">
              {filteredPast.length > 0 ? (
                filteredPast.map((item) => (
                  <div 
                    key={item.id} 
                    className="border rounded-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50"
                  >
                    <div>
                      <h3 className="font-medium">{item.farmName}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{item.date} • {item.time}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <div className="text-xs text-gray-500">Duration</div>
                        <div className="font-medium">{item.duration}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Amount</div>
                        <div className="font-medium">{item.amount}</div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-green-500 font-medium">
                        <Check className="h-4 w-4" />
                        <span>Completed</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No irrigation history to display
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between text-sm text-gray-500">
        <div>Smart recommendations based on soil moisture, weather, and crop requirements</div>
        <Button variant="link" size="sm" className="text-agri-blue">
          <DropletIcon className="h-4 w-4 mr-1" />
          Generate Optimal Schedule
        </Button>
      </CardFooter>
    </Card>
  );
}
