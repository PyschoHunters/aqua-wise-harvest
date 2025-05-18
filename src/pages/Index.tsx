
import Navbar from "@/components/Navbar";
import DashboardCards from "@/components/DashboardCards";
import WaterUsageChart from "@/components/WaterUsageChart";
import WeatherWidget from "@/components/WeatherWidget";
import FarmsList from "@/components/FarmsList";
import CropDatabase from "@/components/CropDatabase";
import IrrigationPlanner from "@/components/IrrigationPlanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="agri-container py-8">
        <h1 className="text-3xl font-bold mb-8 text-agri-green-dark">Farm Water Management Dashboard</h1>
        
        {/* Dashboard Summary Cards */}
        <section className="mb-8">
          <DashboardCards />
        </section>
        
        {/* Water Usage Chart */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <WaterUsageChart />
          </div>
        </section>
        
        {/* Farms and Weather */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FarmsList />
            <div className="col-span-1">
              <WeatherWidget />
            </div>
          </div>
        </section>
        
        {/* Crop Database */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CropDatabase />
          </div>
        </section>
        
        {/* Irrigation Planner */}
        <section className="mb-8">
          <IrrigationPlanner />
        </section>
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

export default Index;
