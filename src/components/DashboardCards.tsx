
import { Calendar, Cloud, Droplet, Info, Leaf } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  footer?: string;
}

export function DashboardCard({ title, value, description, icon, className, footer }: DashboardCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-lg", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-1 bg-muted rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      {footer && (
        <CardFooter className="text-xs text-muted-foreground pt-2">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

export default function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        title="Current Water Usage"
        value="1,240 gal"
        description="Today's consumption"
        icon={<Droplet className="h-4 w-4 text-agri-blue" />}
        className="border-l-4 border-agri-blue"
        footer="3% less than yesterday"
      />
      <DashboardCard
        title="Soil Moisture"
        value="62%"
        description="Average across all fields"
        icon={<Cloud className="h-4 w-4 text-agri-green" />}
        className="border-l-4 border-agri-green"
        footer="Optimal range: 55-65%"
      />
      <DashboardCard
        title="Next Irrigation"
        value="Tomorrow"
        description="8:00 AM - All Fields"
        icon={<Calendar className="h-4 w-4 text-agri-brown" />}
        className="border-l-4 border-agri-brown"
        footer="Based on weather forecast and soil data"
      />
      <DashboardCard
        title="Active Crops"
        value="4"
        description="Corn, Wheat, Soy, Alfalfa"
        icon={<Leaf className="h-4 w-4 text-green-600" />}
        className="border-l-4 border-green-600"
        footer="All crops growing as expected"
      />
    </div>
  );
}
