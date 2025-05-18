
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Check, Cloud, CloudDrizzle, CloudRain, DropletIcon, Leaf, MapPin, ChevronRight, CloudSun, Info } from "lucide-react";
import WeatherWidget from "@/components/WeatherWidget";
import IrrigationPlanner from "@/components/IrrigationPlanner";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import InfoTooltip from "@/components/InfoTooltip";
import WaterUsageChart from "@/components/WaterUsageChart";

// Gemini API Key
const GEMINI_API_KEY = "AIzaSyBGG3uqzRVp0dE7RLiqevpAxAyImdf6EqU";

// Helper function to generate schedule recommendations using Gemini
const generateScheduleWithGemini = async (farmData: any) => {
  try {
    const prompt = `Generate a detailed irrigation schedule recommendation for a farm with the following details:
    Farm: ${farmData.farm}
    Crop Type: ${farmData.crop}
    Soil Type: ${farmData.soil}
    Current Soil Moisture: ${farmData.moisture}%
    Irrigation Method: ${farmData.method}
    Water Efficiency: ${farmData.efficiency}%
    
    Provide specific recommendations including:
    1. Optimal watering days and times
    2. Water amount recommendations (in inches)
    3. Adjustments based on weather forecast
    4. Water conservation tips specific to this crop and soil combination
    5. Expected benefits of following this schedule
    
    Format it in a clear, concise way that's easy for farmers to follow.`;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Invalid response format from Gemini API");
    }
  } catch (error) {
    console.error("Error generating schedule with Gemini:", error);
    throw error;
  }
};

const Planner = () => {
  const location = useLocation();
  const [selectedFarm, setSelectedFarm] = useState<string>("");
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [soilType, setSoilType] = useState<string>("");
  const [soilMoisture, setSoilMoisture] = useState<string>("55");
  const [irrigationMethod, setIrrigationMethod] = useState<string>("");
  const [wateringEfficiency, setWateringEfficiency] = useState([70]);
  const [waterConservationTips, setWaterConservationTips] = useState(false);
  const [soilAnalysisDialog, setSoilAnalysisDialog] = useState(false);
  const [estimatedSavings, setEstimatedSavings] = useState<string>("0");
  const [aiAdviceOpen, setAiAdviceOpen] = useState(false);
  const [isGeneratingSchedule, setIsGeneratingSchedule] = useState(false);
  const [scheduleDialog, setScheduleDialog] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState<string>("");
  
  // Effect to set the selected farm if passed via navigation state
  useEffect(() => {
    if (location.state?.selectedFarm) {
      setSelectedFarm(location.state.selectedFarm);
      // Calculate water savings estimate based on selected farm
      const randomSavings = Math.floor(Math.random() * 25) + 15;
      setEstimatedSavings(randomSavings.toString());
    }
  }, [location.state]);

  const handleGenerateSchedule = async () => {
    if (!selectedFarm || !selectedCrop || !soilType || !irrigationMethod) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsGeneratingSchedule(true);
    
    try {
      // Gather data to send to Gemini
      const farmData = {
        farm: selectedFarm,
        crop: selectedCrop,
        soil: soilType,
        moisture: soilMoisture,
        method: irrigationMethod,
        efficiency: wateringEfficiency[0]
      };
      
      // Generate schedule using Gemini
      const schedule = await generateScheduleWithGemini(farmData);
      setGeneratedSchedule(schedule);
      
      // Show success toast
      toast.success("Optimal irrigation schedule generated", {
        description: "Your irrigation plan has been created based on crop needs and weather forecast."
      });
      
      // Open the dialog to show the schedule
      setScheduleDialog(true);
    } catch (error) {
      console.error("Error generating schedule:", error);
      toast.error("Failed to generate schedule", {
        description: "Please try again later or adjust your settings."
      });
    } finally {
      setIsGeneratingSchedule(false);
    }
  };
  
  const openSoilAnalysis = () => {
    setSoilAnalysisDialog(true);
  };
  
  const handleSoilAnalysisComplete = () => {
    setSoilAnalysisDialog(false);
    toast.success("Soil analysis complete", {
      description: "Results have been added to your farm profile."
    });
    setSoilMoisture("62");
  };
  
  const waterConservationTipsData = [
    "Use drip irrigation for 30% water savings compared to sprinklers",
    "Schedule irrigation early morning or evening to reduce evaporation",
    "Implement soil moisture sensors to irrigate only when necessary",
    "Add mulch around crops to retain soil moisture",
    "Consider deficit irrigation techniques for drought-tolerant crops",
    "Maintain and repair leaks in irrigation systems promptly"
  ];
  
  const aiAdviceData = {
    farm: selectedFarm || "your farm",
    recommendations: [
      {
        title: "Optimal Irrigation Schedule",
        content: "Based on current soil moisture and weather forecast, we recommend irrigating in the early morning (5-7 AM) with 1.1 inches of water, followed by a light application in 3 days if no rainfall occurs."
      },
      {
        title: "Water Conservation",
        content: "Consider implementing precision drip irrigation to reduce water consumption by up to 30% while maintaining optimal crop yields."
      },
      {
        title: "Weather Adaptation",
        content: "Our forecast shows a 60% chance of rain in 48 hours. Consider delaying irrigation to take advantage of natural precipitation."
      }
    ]
  };

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
                    <Select value={selectedFarm} onValueChange={setSelectedFarm}>
                      <SelectTrigger id="farm">
                        <SelectValue placeholder="Choose a farm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Main Field">Main Field</SelectItem>
                        <SelectItem value="North Valley">North Valley</SelectItem>
                        <SelectItem value="East Field">East Field</SelectItem>
                        <SelectItem value="Western Plot">Western Plot</SelectItem>
                        <SelectItem value="South Grove">South Grove</SelectItem>
                        <SelectItem value="Highland Farm">Highland Farm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="crop">Crop Type</Label>
                    <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                      <SelectTrigger id="crop">
                        <SelectValue placeholder="Choose a crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corn">Corn</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="soybean">Soybean</SelectItem>
                        <SelectItem value="alfalfa">Alfalfa</SelectItem>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="soil">Soil Type</Label>
                    <Select value={soilType} onValueChange={setSoilType}>
                      <SelectTrigger id="soil">
                        <SelectValue placeholder="Choose soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="loam">Loam</SelectItem>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="silt">Silt</SelectItem>
                        <SelectItem value="clay-loam">Clay Loam</SelectItem>
                        <SelectItem value="sandy-loam">Sandy Loam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <Label htmlFor="soil-analysis">Need Soil Analysis?</Label>
                      <Button 
                        variant="link" 
                        className="text-xs p-0 h-auto"
                        onClick={openSoilAnalysis}
                      >
                        Request Analysis
                      </Button>
                    </div>
                    <div className="bg-blue-50 rounded-md p-3 text-sm text-blue-700">
                      Regular soil analysis helps optimize irrigation and fertilizer application.
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <Label htmlFor="moisture">Current Soil Moisture (%)</Label>
                      <span className="text-sm font-medium">
                        {soilMoisture}%
                      </span>
                    </div>
                    <Input 
                      id="moisture" 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={soilMoisture} 
                      onChange={(e) => setSoilMoisture(e.target.value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Dry</span>
                      <span>Optimal</span>
                      <span>Wet</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="method">Irrigation Method</Label>
                    <Select value={irrigationMethod} onValueChange={setIrrigationMethod}>
                      <SelectTrigger id="method">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="drip">Drip Irrigation</SelectItem>
                        <SelectItem value="sprinkler">Sprinkler System</SelectItem>
                        <SelectItem value="furrow">Furrow Irrigation</SelectItem>
                        <SelectItem value="pivot">Center Pivot</SelectItem>
                        <SelectItem value="flood">Flood Irrigation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <Label>Water Efficiency</Label>
                      <span className="text-sm font-medium">{wateringEfficiency}%</span>
                    </div>
                    <Slider
                      value={wateringEfficiency}
                      onValueChange={setWateringEfficiency}
                      max={100}
                      step={1}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex flex-col md:flex-row gap-2 justify-between">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => setWaterConservationTips(!waterConservationTips)}
                      >
                        Water Conservation Tips
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => setAiAdviceOpen(true)}
                        className="flex items-center gap-1"
                      >
                        <span className="bg-blue-500 p-1 rounded-full text-white h-5 w-5 flex items-center justify-center text-xs mr-1">AI</span>
                        Get AI Recommendations
                      </Button>
                    </div>
                    <Button 
                      className="w-full mt-3"
                      onClick={handleGenerateSchedule}
                      disabled={isGeneratingSchedule}
                    >
                      {isGeneratingSchedule ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating...
                        </span>
                      ) : "Generate Optimal Schedule"}
                    </Button>
                  </div>
                </div>
              </div>
              
              {waterConservationTips && (
                <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-100 animate-fade-in">
                  <div className="flex items-center gap-2 mb-3">
                    <DropletIcon className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium text-green-700">Water Conservation Tips</h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {waterConservationTipsData.map((tip, index) => (
                      <li key={index} className="text-sm text-green-700">{tip}</li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1 mt-3 text-sm text-green-700">
                    <Check className="h-4 w-4" />
                    <span>
                      Implementing these tips could save approximately {estimatedSavings}% of your water usage
                    </span>
                  </div>
                </div>
              )}
              
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
        
        {/* Water Usage Analytics */}
        <div className="mb-8">
          <WaterUsageChart />
        </div>
        
        {/* Smart Sensor Network */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Smart Sensor Network</CardTitle>
              <CardDescription>
                Real-time farm monitoring and automated irrigation control
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Sensor Dashboard</h3>
                        <Select defaultValue="main-field">
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select farm" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="main-field">Main Field</SelectItem>
                            <SelectItem value="north-valley">North Valley</SelectItem>
                            <SelectItem value="east-field">East Field</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500">Soil Moisture</div>
                              <Badge variant={parseInt(soilMoisture) > 50 ? "outline" : "destructive"} className="text-xs">
                                {parseInt(soilMoisture) > 50 ? "Optimal" : "Low"}
                              </Badge>
                            </div>
                            <div className="text-2xl font-bold mt-1">{soilMoisture}%</div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div 
                                className={`h-1.5 rounded-full ${parseInt(soilMoisture) > 50 ? 'bg-green-500' : 'bg-amber-500'}`}
                                style={{ width: `${soilMoisture}%` }}
                              ></div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500">Temperature</div>
                              <Badge variant="outline" className="text-xs">Normal</Badge>
                            </div>
                            <div className="text-2xl font-bold mt-1">72°F</div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div className="h-1.5 rounded-full bg-blue-500" style={{ width: '60%' }}></div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <Card>
                          <CardContent className="p-3">
                            <div className="text-xs text-gray-500">Wind Speed</div>
                            <div className="text-lg font-bold">8 mph</div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-3">
                            <div className="text-xs text-gray-500">Humidity</div>
                            <div className="text-lg font-bold">65%</div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-3">
                            <div className="text-xs text-gray-500">Evaporation</div>
                            <div className="text-lg font-bold">0.12 in/day</div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div className="p-3 flex items-center justify-between bg-white">
                      <div className="text-sm">Last updated: 5 minutes ago</div>
                      <Button size="sm" variant="outline">View All Sensors</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Automation Rules</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-2 border rounded-md bg-green-50 border-green-100">
                        <div className="flex items-center gap-2">
                          <DropletIcon className="h-4 w-4 text-green-600" />
                          <div>
                            <div className="text-sm font-medium">Low Moisture Alert</div>
                            <div className="text-xs text-gray-500">Below 40% triggers irrigation</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-9 h-5 bg-green-500 rounded-full flex items-center p-0.5">
                            <div className="w-4 h-4 rounded-full bg-white ml-auto"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <CloudRain className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="text-sm font-medium">Rain Forecast</div>
                            <div className="text-xs text-gray-500">Pause irrigation if rain &gt;60%</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-9 h-5 bg-gray-300 rounded-full flex items-center p-0.5">
                            <div className="w-4 h-4 rounded-full bg-white"></div>
                          </div>
                        </div>
                      </div>
                      
                      <Button size="sm" variant="outline" className="w-full">
                        + Create New Rule
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <div className="bg-agri-green-light/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Smart Control</h3>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <p className="text-sm mt-1 text-gray-600">
                      Automated irrigation valves are responding to real-time sensor data
                    </p>
                    <div className="flex justify-between mt-3">
                      <Button size="sm" variant="outline">Manual Control</Button>
                      <Button size="sm">Automation Settings</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Soil Analysis Dialog */}
      <Dialog open={soilAnalysisDialog} onOpenChange={setSoilAnalysisDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Soil Analysis Request</DialogTitle>
            <DialogDescription>
              Submit a request for professional soil analysis
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="analysis-farm">Farm</Label>
              <Select defaultValue={selectedFarm}>
                <SelectTrigger id="analysis-farm">
                  <SelectValue placeholder="Select farm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Main Field">Main Field</SelectItem>
                  <SelectItem value="North Valley">North Valley</SelectItem>
                  <SelectItem value="East Field">East Field</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="analysis-type">Analysis Type</Label>
              <Select defaultValue="standard">
                <SelectTrigger id="analysis-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Analysis</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                  <SelectItem value="nutrient">Nutrient Analysis</SelectItem>
                  <SelectItem value="custom">Custom Tests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="analysis-notes">Special Instructions</Label>
              <Input id="analysis-notes" placeholder="Any specific areas or concerns..." />
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">Why Soil Analysis?</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Regular soil testing helps optimize irrigation and fertilization, 
                leading to improved crop yields and reduced water waste.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSoilAnalysisDialog(false)}>Cancel</Button>
            <Button onClick={handleSoilAnalysisComplete}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* AI Advice Dialog */}
      <Dialog open={aiAdviceOpen} onOpenChange={setAiAdviceOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="bg-blue-500 p-1 rounded-full text-white h-6 w-6 flex items-center justify-center text-xs">AI</span>
              Smart Irrigation Recommendations
            </DialogTitle>
            <DialogDescription>
              AI-powered insights for {aiAdviceData.farm}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {aiAdviceData.recommendations.map((rec, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">{rec.title}</h3>
                <p className="text-sm text-gray-700">{rec.content}</p>
              </div>
            ))}
            
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <CloudSun className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium text-blue-900">Weather Impact Analysis</h3>
              </div>
              <p className="text-sm text-blue-700">
                Based on the forecast, there's a potential water savings of approximately {estimatedSavings}%
                if you adjust your irrigation schedule to account for upcoming precipitation.
              </p>
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setAiAdviceOpen(false)}>Close</Button>
            <Button>Apply Recommendations</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Generated Schedule Dialog */}
      <Dialog open={scheduleDialog} onOpenChange={setScheduleDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-agri-blue" />
              Optimal Irrigation Schedule
            </DialogTitle>
            <DialogDescription>
              AI-generated irrigation plan for {selectedFarm || "your farm"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-600" />
                <p className="text-sm text-blue-700">
                  This irrigation schedule has been optimized for {selectedCrop} grown in {soilType} soil using {irrigationMethod} irrigation method.
                </p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 whitespace-pre-line">
              {generatedSchedule}
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setScheduleDialog(false)}>Close</Button>
            <Button>Save Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
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
