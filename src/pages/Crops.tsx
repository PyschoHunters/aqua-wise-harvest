
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropletIcon, Leaf } from "lucide-react";
import { useState } from "react";

// Sample crops data
const allCrops = [
  {
    id: 1,
    name: "Corn",
    scientificName: "Zea mays",
    waterRequirement: "High",
    imageUrl: "",
    category: "Cereal",
  },
  {
    id: 2,
    name: "Wheat",
    scientificName: "Triticum aestivum",
    waterRequirement: "Moderate",
    imageUrl: "",
    category: "Cereal",
  },
  {
    id: 3,
    name: "Soybean",
    scientificName: "Glycine max",
    waterRequirement: "Moderate",
    imageUrl: "",
    category: "Legume",
  },
  {
    id: 4,
    name: "Alfalfa",
    scientificName: "Medicago sativa",
    waterRequirement: "High",
    imageUrl: "",
    category: "Forage",
  },
  {
    id: 5,
    name: "Rice",
    scientificName: "Oryza sativa",
    waterRequirement: "Very High",
    imageUrl: "",
    category: "Cereal",
  },
  {
    id: 6,
    name: "Cotton",
    scientificName: "Gossypium hirsutum",
    waterRequirement: "Moderate",
    imageUrl: "",
    category: "Fiber",
  },
  {
    id: 7,
    name: "Sugar Cane",
    scientificName: "Saccharum officinarum",
    waterRequirement: "High",
    imageUrl: "",
    category: "Sugar",
  },
  {
    id: 8,
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    waterRequirement: "Moderate",
    imageUrl: "",
    category: "Vegetable",
  },
  {
    id: 9,
    name: "Potato",
    scientificName: "Solanum tuberosum",
    waterRequirement: "Moderate to High",
    imageUrl: "",
    category: "Vegetable",
  },
];

const categories = ["All", "Cereal", "Legume", "Forage", "Fiber", "Sugar", "Vegetable"];

const Crops = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCrops = allCrops.filter(
    (crop) => 
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (selectedCategory === "All" || crop.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="agri-container py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-agri-green-dark">Crop Database</h1>
            <p className="text-gray-500 mt-1">
              Explore water requirements and growing information for various crops
            </p>
          </div>
          <div className="flex gap-2">
            <Input 
              placeholder="Search crops..." 
              className="w-full sm:w-60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6 flex overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="mr-2 whitespace-nowrap"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {filteredCrops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCrops.map((crop) => (
              <Card key={crop.id} className="overflow-hidden hover:shadow-md transition-all">
                <div className="h-40 bg-gradient-to-r from-agri-green-light to-agri-blue-light opacity-70 flex items-center justify-center">
                  <Leaf className="h-16 w-16 text-white opacity-50" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{crop.name}</CardTitle>
                      <CardDescription className="italic">{crop.scientificName}</CardDescription>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        crop.waterRequirement === 'High' || crop.waterRequirement === 'Very High'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-green-50 text-green-700 border-green-200'
                      }`}
                    >
                      {crop.waterRequirement}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                    <span>Category:</span>
                    <span className="font-medium">{crop.category}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <DropletIcon className="h-4 w-4 text-agri-blue" />
                    <span className="text-sm text-agri-blue">
                      {crop.waterRequirement === 'High' || crop.waterRequirement === 'Very High'
                        ? 'Requires frequent irrigation'
                        : 'Moderate water needs'
                      }
                    </span>
                  </div>
                  <Button className="w-full mt-4" size="sm">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Leaf className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No crops found</h3>
            <p className="text-gray-500 max-w-md mx-auto mt-2">
              Try changing your search term or selecting a different category
            </p>
          </div>
        )}
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

export default Crops;
