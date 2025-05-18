
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Check, DropletIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

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

const farmOptions = ["Main Field", "North Valley", "East Field", "Western Plot", "South Grove", "Highland Farm"];

export default function IrrigationPlanner() {
  const [selectedFarm, setSelectedFarm] = useState("all");
  const [schedules, setSchedules] = useState(scheduleData);
  const [isNewScheduleOpen, setIsNewScheduleOpen] = useState(false);
  const [isEditScheduleOpen, setIsEditScheduleOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState<(typeof scheduleData)[0] | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  
  // New Schedule Form State
  const [formValues, setFormValues] = useState({
    farmName: "",
    date: new Date(),
    time: "08:00",
    duration: "",
    amount: ""
  });
  
  const upcomingSchedules = schedules.filter(item => item.status === "scheduled");
  const pastSchedules = schedules.filter(item => item.status === "completed");
  
  const filteredUpcoming = selectedFarm === "all" 
    ? upcomingSchedules 
    : upcomingSchedules.filter(item => item.farmName === selectedFarm);
  
  const filteredPast = selectedFarm === "all"
    ? pastSchedules
    : pastSchedules.filter(item => item.farmName === selectedFarm);

  const handleNewScheduleSubmit = () => {
    if (!formValues.farmName || !formValues.duration || !formValues.amount) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newSchedule = {
      id: schedules.length + 1,
      farmName: formValues.farmName,
      date: format(formValues.date, "MMMM d, yyyy"),
      time: formValues.time,
      duration: `${formValues.duration} hours`,
      status: "scheduled",
      amount: `${formValues.amount} inches`
    };
    
    setSchedules([...schedules, newSchedule]);
    setIsNewScheduleOpen(false);
    resetForm();
    toast.success("New irrigation schedule created");
  };

  const handleEditSchedule = (schedule: (typeof scheduleData)[0]) => {
    setCurrentSchedule(schedule);
    setFormValues({
      farmName: schedule.farmName,
      date: new Date(), // In a real app, parse the date string
      time: schedule.time.replace(" AM", "").replace(" PM", ""),
      duration: schedule.duration.replace(" hours", ""),
      amount: schedule.amount.replace(" inches", "")
    });
    setIsEditScheduleOpen(true);
  };
  
  const handleEditSubmit = () => {
    if (!currentSchedule) return;
    
    const updatedSchedules = schedules.map(schedule => {
      if (schedule.id === currentSchedule.id) {
        return {
          ...schedule,
          farmName: formValues.farmName,
          date: format(formValues.date, "MMMM d, yyyy"),
          time: formValues.time,
          duration: `${formValues.duration} hours`,
          amount: `${formValues.amount} inches`
        };
      }
      return schedule;
    });
    
    setSchedules(updatedSchedules);
    setIsEditScheduleOpen(false);
    resetForm();
    toast.success("Irrigation schedule updated");
  };
  
  const handleDeleteConfirm = () => {
    if (!currentSchedule) return;
    
    const updatedSchedules = schedules.filter(schedule => schedule.id !== currentSchedule.id);
    setSchedules(updatedSchedules);
    setIsDeleteConfirmOpen(false);
    toast.success("Irrigation schedule cancelled");
  };
  
  const resetForm = () => {
    setFormValues({
      farmName: "",
      date: new Date(),
      time: "08:00",
      duration: "",
      amount: ""
    });
    setCurrentSchedule(null);
  };
  
  const confirmDelete = (schedule: (typeof scheduleData)[0]) => {
    setCurrentSchedule(schedule);
    setIsDeleteConfirmOpen(true);
  };

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
                {farmOptions.map((farm) => (
                  <SelectItem key={farm} value={farm}>{farm}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => setIsNewScheduleOpen(true)}>+ New Schedule</Button>
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
                        <CalendarIcon className="h-4 w-4" />
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
                        <Button size="sm" variant="outline" onClick={() => handleEditSchedule(item)}>Edit</Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700" onClick={() => confirmDelete(item)}>Cancel</Button>
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
                        <CalendarIcon className="h-4 w-4" />
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
          Generate AI Schedule
        </Button>
      </CardFooter>

      {/* New Schedule Dialog */}
      <Dialog open={isNewScheduleOpen} onOpenChange={(open) => {
        setIsNewScheduleOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Irrigation Schedule</DialogTitle>
            <DialogDescription>
              Schedule irrigation for your farm based on crop needs and weather conditions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="farm">Farm</Label>
              <Select
                value={formValues.farmName}
                onValueChange={(value) => setFormValues({...formValues, farmName: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Farm" />
                </SelectTrigger>
                <SelectContent>
                  {farmOptions.map((farm) => (
                    <SelectItem key={farm} value={farm}>{farm}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formValues.date ? format(formValues.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formValues.date}
                    onSelect={(date) => date && setFormValues({...formValues, date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formValues.time}
                onChange={(e) => setFormValues({...formValues, time: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input
                  id="duration"
                  placeholder="e.g. 3"
                  value={formValues.duration}
                  onChange={(e) => setFormValues({...formValues, duration: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (inches)</Label>
                <Input
                  id="amount"
                  placeholder="e.g. 1.2"
                  value={formValues.amount}
                  onChange={(e) => setFormValues({...formValues, amount: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewScheduleOpen(false)}>Cancel</Button>
            <Button onClick={handleNewScheduleSubmit}>Create Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Schedule Dialog */}
      <Dialog open={isEditScheduleOpen} onOpenChange={(open) => {
        setIsEditScheduleOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Irrigation Schedule</DialogTitle>
            <DialogDescription>
              Update the irrigation schedule details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="farm">Farm</Label>
              <Select
                value={formValues.farmName}
                onValueChange={(value) => setFormValues({...formValues, farmName: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Farm" />
                </SelectTrigger>
                <SelectContent>
                  {farmOptions.map((farm) => (
                    <SelectItem key={farm} value={farm}>{farm}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formValues.date ? format(formValues.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formValues.date}
                    onSelect={(date) => date && setFormValues({...formValues, date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formValues.time}
                onChange={(e) => setFormValues({...formValues, time: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input
                  id="duration"
                  placeholder="e.g. 3"
                  value={formValues.duration}
                  onChange={(e) => setFormValues({...formValues, duration: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (inches)</Label>
                <Input
                  id="amount"
                  placeholder="e.g. 1.2"
                  value={formValues.amount}
                  onChange={(e) => setFormValues({...formValues, amount: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditScheduleOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit}>Update Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Irrigation Schedule</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this irrigation schedule? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>Nevermind</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Yes, Cancel Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
