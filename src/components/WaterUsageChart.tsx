
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

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
  
  const renderChart = (data: any[]) => {
    if (chartType === 'area') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2196F3" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#2196F3" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorRecommended" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} gal`} />
            <Legend />
            <Area type="monotone" dataKey="actual" stroke="#2196F3" fillOpacity={1} fill="url(#colorActual)" name="Actual Usage" />
            <Area type="monotone" dataKey="recommended" stroke="#4CAF50" fillOpacity={1} fill="url(#colorRecommended)" name="Recommended Usage" />
          </AreaChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} gal`} />
            <Legend />
            <Bar dataKey="actual" fill="#2196F3" name="Actual Usage" />
            <Bar dataKey="recommended" fill="#4CAF50" name="Recommended Usage" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
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
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            {renderChart(dailyData)}
          </TabsContent>
          <TabsContent value="weekly">
            {renderChart(weeklyData)}
          </TabsContent>
          <TabsContent value="monthly">
            {renderChart(monthlyData)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
