
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropletIcon, Leaf, CloudRain, Info } from "lucide-react";

// Sample crops data
const allCrops = [
  {
    id: 1,
    name: "Corn",
    scientificName: "Zea mays",
    waterRequirement: "High",
    imageUrl: "https://images.unsplash.com/photo-1601593768799-76ac155b929a?q=80&w=500&auto=format&fit=crop",
    category: "Cereal",
    description: "Corn is a major cereal crop that thrives in warm weather. It has high water requirements, especially during the silking and tasseling stages. Adequate irrigation during these critical growth periods significantly impacts yield.",
    bestPractices: [
      "Irrigate more frequently during silking and tasseling stages",
      "Reduce irrigation as kernels mature",
      "Consider drip irrigation for water efficiency"
    ],
    wateringAmount: "1-2 inches per week",
    growingSeason: "Spring-Summer",
    daysToMaturity: "90-120 days",
    soilType: "Well-drained, fertile"
  },
  {
    id: 2,
    name: "Wheat",
    scientificName: "Triticum aestivum",
    waterRequirement: "Moderate",
    imageUrl: "https://images.unsplash.com/photo-1467144364918-6a46f9f4e552?q=80&w=500&auto=format&fit=crop",
    category: "Cereal",
    description: "Wheat is a resilient grain crop that can be grown as winter or spring wheat. It has moderate water needs but is sensitive to both drought and waterlogging. Wheat requires consistent moisture during tillering and grain filling stages.",
    bestPractices: [
      "Ensure adequate soil moisture at planting time",
      "Critical irrigation periods: jointing, flowering, and grain filling",
      "Avoid overwatering during ripening"
    ],
    wateringAmount: "0.8-1.5 inches per week",
    growingSeason: "Fall-Spring (Winter) / Spring-Summer (Spring)",
    daysToMaturity: "110-130 days",
    soilType: "Loam to heavy clay"
  },
  {
    id: 3,
    name: "Soybean",
    scientificName: "Glycine max",
    waterRequirement: "Moderate",
    imageUrl: "https://images.unsplash.com/photo-1626953432052-3a2e6d8b4acc?q=80&w=500&auto=format&fit=crop",
    category: "Legume",
    description: "Soybeans are legumes that fix nitrogen in the soil. They have moderate water requirements and are somewhat drought tolerant due to their deep root systems. However, water stress during flowering and pod development can significantly reduce yields.",
    bestPractices: [
      "Most critical water needs are during flowering and pod fill",
      "Maintain consistent soil moisture throughout growing season",
      "Avoid waterlogging as soybeans are sensitive to excess water"
    ],
    wateringAmount: "1-1.5 inches per week",
    growingSeason: "Late Spring-Fall",
    daysToMaturity: "90-150 days",
    soilType: "Well-drained fertile loam"
  },
  {
    id: 4,
    name: "Alfalfa",
    scientificName: "Medicago sativa",
    waterRequirement: "High",
    imageUrl: "https://images.unsplash.com/photo-1626266180957-73cbe5c67bef?q=80&w=500&auto=format&fit=crop",
    category: "Forage",
    description: "Alfalfa is a perennial legume with a deep root system that can access water up to 20 feet below the surface. Despite this, it has high water requirements due to its rapid growth and multiple harvests per season. Proper irrigation management is essential for optimal yields.",
    bestPractices: [
      "Schedule irrigation immediately after cutting",
      "Allow soil to dry slightly between waterings to promote deep root growth",
      "Reduce irrigation 7-10 days before harvest"
    ],
    wateringAmount: "1.5-2 inches per week",
    growingSeason: "Spring-Fall (perennial)",
    daysToMaturity: "70-90 days to first cutting",
    soilType: "Well-drained, pH 6.8-7.5"
  },
  {
    id: 5,
    name: "Rice",
    scientificName: "Oryza sativa",
    waterRequirement: "Very High",
    imageUrl: "https://images.unsplash.com/photo-1568140740310-4d321b1f9cf3?q=80&w=500&auto=format&fit=crop",
    category: "Cereal",
    description: "Rice is one of the most water-intensive crops, traditionally grown in flooded fields or paddies. However, newer cultivation methods like System of Rice Intensification (SRI) can reduce water usage while maintaining or improving yields.",
    bestPractices: [
      "Maintain 2-3 inches of standing water during vegetative growth",
      "Consider alternate wetting and drying techniques to reduce water use",
      "Drain fields 2-3 weeks before harvest"
    ],
    wateringAmount: "3-5 inches per week",
    growingSeason: "Spring-Fall",
    daysToMaturity: "120-150 days",
    soilType: "Clay or clay loam that retains water"
  },
  {
    id: 6,
    name: "Cotton",
    scientificName: "Gossypium hirsutum",
    waterRequirement: "Moderate",
    imageUrl: "https://images.unsplash.com/photo-1532366964362-3f26a72a6b85?q=80&w=500&auto=format&fit=crop",
    category: "Fiber",
    description: "Cotton has moderate water needs and can be relatively drought-tolerant once established. However, adequate water during flowering and boll development is crucial for good yields and fiber quality. Deficit irrigation strategies can be implemented during less critical growth stages.",
    bestPractices: [
      "Critical water periods are during flowering and boll development",
      "Apply deficit irrigation during vegetative growth",
      "Stop irrigation when bolls begin to open"
    ],
    wateringAmount: "1-1.5 inches per week",
    growingSeason: "Late Spring-Fall",
    daysToMaturity: "150-180 days",
    soilType: "Well-drained loam or sandy loam"
  },
  {
    id: 7,
    name: "Sugar Cane",
    scientificName: "Saccharum officinarum",
    waterRequirement: "High",
    imageUrl: "https://images.unsplash.com/photo-1634972294186-5d438ef6bf19?q=80&w=500&auto=format&fit=crop",
    category: "Sugar",
    description: "Sugarcane is a high water-demanding crop with a long growing season. It requires regular and adequate irrigation throughout most of its growth cycle for optimal sugar accumulation and yield.",
    bestPractices: [
      "Maintain consistent soil moisture throughout growing season",
      "Reduce irrigation during ripening phase to increase sugar concentration",
      "Consider drip irrigation to improve water use efficiency"
    ],
    wateringAmount: "1.5-2.5 inches per week",
    growingSeason: "Year-round (tropical) / Spring-Fall (subtropical)",
    daysToMaturity: "10-24 months (varies by region)",
    soilType: "Well-drained, deep, loamy soil"
  },
  {
    id: 8,
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    waterRequirement: "Moderate",
    imageUrl: "https://images.unsplash.com/photo-1592841200220-a32148158212?q=80&w=500&auto=format&fit=crop",
    category: "Vegetable",
    description: "Tomatoes require consistent soil moisture for proper development and to prevent disorders like blossom end rot. However, excessive water can dilute flavors and increase disease susceptibility. Precision irrigation is key for high-quality tomato production.",
    bestPractices: [
      "Maintain even soil moisture to prevent blossom end rot",
      "Reduce water slightly as fruits ripen to improve flavor",
      "Use drip irrigation to keep foliage dry and reduce disease"
    ],
    wateringAmount: "1-2 inches per week",
    growingSeason: "Spring-Fall",
    daysToMaturity: "60-85 days",
    soilType: "Well-drained, fertile loam"
  },
  {
    id: 9,
    name: "Potato",
    scientificName: "Solanum tuberosum",
    waterRequirement: "Moderate to High",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=500&auto=format&fit=crop",
    category: "Vegetable",
    description: "Potatoes require consistent soil moisture, especially during tuber formation. However, excessive moisture can lead to disease issues like late blight. Proper irrigation scheduling is crucial for high yields and quality.",
    bestPractices: [
      "Critical water period is during tuber formation (flowering stage)",
      "Maintain even soil moisture to prevent misshapen tubers",
      "Reduce irrigation as vines begin to yellow and die back"
    ],
    wateringAmount: "1-2 inches per week",
    growingSeason: "Spring-Fall",
    daysToMaturity: "70-120 days depending on variety",
    soilType: "Loose, well-drained, slightly acidic soil"
  },
];

const categories = ["All", "Cereal", "Legume", "Forage", "Fiber", "Sugar", "Vegetable"];

const Crops = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCrop, setSelectedCrop] = useState<typeof allCrops[0] | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const filteredCrops = allCrops.filter(
    (crop) => 
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (selectedCategory === "All" || crop.category === selectedCategory)
  );

  const handleViewDetails = (crop: typeof allCrops[0]) => {
    setSelectedCrop(crop);
    setIsDetailDialogOpen(true);
  };

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
                <div className="h-40 overflow-hidden">
                  <img 
                    src={crop.imageUrl} 
                    alt={crop.name}
                    className="w-full h-full object-cover"
                  />
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
                  <Button className="w-full mt-4" size="sm" onClick={() => handleViewDetails(crop)}>View Details</Button>
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
      
      {/* Detailed Crop Information Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          {selectedCrop && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  {selectedCrop.name}
                  <Badge variant="outline" className="bg-agri-blue/10 text-agri-blue">
                    {selectedCrop.waterRequirement} Water Need
                  </Badge>
                </DialogTitle>
                <DialogDescription className="italic">
                  {selectedCrop.scientificName} • {selectedCrop.category}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="rounded-lg overflow-hidden h-60 mb-6">
                  <img 
                    src={selectedCrop.imageUrl} 
                    alt={selectedCrop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">About {selectedCrop.name}</h3>
                    <p className="text-gray-700">{selectedCrop.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Growing Requirements</h3>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Growing Season</h4>
                        <p className="font-medium">{selectedCrop.growingSeason}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Soil Type</h4>
                        <p className="font-medium">{selectedCrop.soilType}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Days to Maturity</h4>
                        <p className="font-medium">{selectedCrop.daysToMaturity}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Water Management</h3>
                      
                      <div className="bg-blue-50 p-4 rounded-md">
                        <h4 className="text-sm font-medium text-agri-blue flex items-center gap-1">
                          <DropletIcon className="h-4 w-4" />
                          Water Requirements
                        </h4>
                        <div className="space-y-2 mt-2">
                          <p className="text-sm">
                            <strong>Frequency:</strong> {selectedCrop.waterRequirement}
                          </p>
                          <p className="text-sm">
                            <strong>Amount:</strong> {selectedCrop.wateringAmount}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Best Practices</h4>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          {selectedCrop.bestPractices.map((practice, index) => (
                            <li key={index} className="text-sm">{practice}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-agri-green-light/20 p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <CloudRain className="h-5 w-5 text-agri-green-dark" />
                      Smart Irrigation Tips
                    </h3>
                    <p className="text-sm">
                      For optimal growth, {selectedCrop.name} requires careful water management. 
                      Use soil moisture sensors to monitor levels and adjust irrigation accordingly.
                      Consider using drip irrigation systems to deliver water directly to the root zone
                      and minimize water waste. In periods of high heat, increase frequency but maintain
                      consistent amounts.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
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

export default Crops;
