
import { useState } from "react";
import { Calendar, Cloud, DropletIcon, Menu, XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-card shadow-sm">
      <div className="agri-container">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <DropletIcon className="h-8 w-8 text-agri-blue" />
                <span className="font-bold text-xl text-agri-green">AquaFarm</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-agri-green text-gray-900 dark:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/farms"
                className="border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                My Farms
              </Link>
              <Link
                to="/crops"
                className="border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Crop Database
              </Link>
              <Link
                to="/planner"
                className="border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Irrigation Planner
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Cloud className="h-4 w-4" />
              <span>Weather</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </Button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="bg-white dark:bg-card inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="bg-agri-green-light bg-opacity-50 text-agri-green-dark block pl-3 pr-4 py-2 border-l-4 border-agri-green text-base font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/farms"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              My Farms
            </Link>
            <Link
              to="/crops"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Crop Database
            </Link>
            <Link
              to="/planner"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Irrigation Planner
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
