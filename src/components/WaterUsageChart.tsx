
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
} from '@/components/ui/chart';
import InfoTooltip from '@/components/InfoTooltip';

// Sample data - in a real app, this would come from an API
const dailyData = [
  { date: 'Mon', actual: 1200, recommended: 1100 },
  { date: 'Tue', actual: 1400, recommended: 1300 },
  { date: 'Wed', actual: 1000, recommended: 1200 },
  { date: 'Thu', actual: 1500, recommended: 1400 },
  { date: 'Fri', actual: 1300, recommended: 1200 },
  { date: 'Sat', actual: 900, recommended: 1000 },
  { date: 'Sun', actual: 800, recommended: 900 },
];

const weeklyData = [
  { date: 'Week 1', actual: 8100, recommended: 8000 },
  { date: 'Week 2', actual: 7900, recommended: 8000 },
  { date: 'Week 3', actual: 8300, recommended: 8000 },
  { date: 'Week 4', actual: 7800, recommended: 8000 },
];

const monthlyData = [
  { date: 'Jan', actual: 32000, recommended: 31000 },
  { date: 'Feb', actual: 28000, recommended: 28000 },
  { date: 'Mar', actual: 31000, recommended: 30000 },
  { date: 'Apr', actual: 33000, recommended: 32000 },
  { date: 'May', actual: 35000, recommended: 34000 },
  { date: 'Jun', actual: 37000, recommended: 36000 },
];

export default function WaterUsageChart() {
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  const [activeTab, setActiveTab] = useState('daily');
  
  const getActiveData = () => {
    switch(activeTab) {
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return dailyData;
    }
  };
  
  const config = {
    actual: {
      label: "Actual Usage",
      theme: {
        light: "#2196F3",
        dark: "#2196F3",
      },
    },
    recommended: {
      label: "Recommended Usage",
      theme: {
        light: "#4CAF50",
        dark: "#4CAF50",
      },
    },
  };
  
  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Water Usage Analytics</CardTitle>
          <CardDescription>
            Compare your actual water usage with the recommended amounts
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setChartType('area')}
            className={`px-3 py-1 text-xs rounded-md ${
              chartType === 'area' 
                ? 'bg-agri-blue text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Area
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 text-xs rounded-md ${
              chartType === 'bar' 
                ? 'bg-agri-blue text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Bar
          </button>
          <div className="ml-2">
            <InfoTooltip content="Toggle between area and bar chart visualization types to view your water usage data in different formats" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="h-[300px]">
            <ChartContainer config={config} className="h-full">
              {chartType === 'area' ? (
                <AreaChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    name="actual"
                    stroke="#2196F3"
                    fill="#2196F3"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="recommended"
                    name="recommended"
                    stroke="#4CAF50"
                    fill="#4CAF50"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              ) : (
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="actual" name="actual" fill="#2196F3" />
                  <Bar dataKey="recommended" name="recommended" fill="#4CAF50" />
                </BarChart>
              )}
            </ChartContainer>
          </TabsContent>
          <TabsContent value="weekly" className="h-[300px]">
            <ChartContainer config={config} className="h-full">
              {chartType === 'area' ? (
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    name="actual"
                    stroke="#2196F3"
                    fill="#2196F3"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="recommended"
                    name="recommended"
                    stroke="#4CAF50"
                    fill="#4CAF50"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              ) : (
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="actual" name="actual" fill="#2196F3" />
                  <Bar dataKey="recommended" name="recommended" fill="#4CAF50" />
                </BarChart>
              )}
            </ChartContainer>
          </TabsContent>
          <TabsContent value="monthly" className="h-[300px]">
            <ChartContainer config={config} className="h-full">
              {chartType === 'area' ? (
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    name="actual"
                    stroke="#2196F3"
                    fill="#2196F3"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="recommended"
                    name="recommended"
                    stroke="#4CAF50"
                    fill="#4CAF50"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              ) : (
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="actual" name="actual" fill="#2196F3" />
                  <Bar dataKey="recommended" name="recommended" fill="#4CAF50" />
                </BarChart>
              )}
            </ChartContainer>
          </TabsContent>
        </Tabs>
        <div className="mt-4 text-xs text-gray-500 flex justify-end items-center gap-2">
          <span>Data last updated: Today at 12:00 PM</span>
          <InfoTooltip content="This chart shows your actual water usage compared to recommended amounts based on crop needs and environmental factors" />
        </div>
      </CardContent>
    </Card>
  );
}
