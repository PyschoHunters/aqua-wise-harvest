
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropletIcon, Info } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Sample crops data - in a real app, this would be fetched from an API
const cropData = [
  {
    id: 1,
    name: "Corn",
    waterRequirement: "High",
    growingSeason: "Spring-Summer",
    soilType: "Well-drained, fertile",
    daysToMaturity: "90-120 days",
    wateringFrequency: "Regular",
    wateringAmount: "1-2 inches per week",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI8mJaexq94edtBCwP3x2lLNwgsAG41uOXwA&s",
    description: "Corn is a major cereal crop that thrives in warm weather. It has high water requirements, especially during the silking and tasseling stages. Adequate irrigation during these critical growth periods significantly impacts yield.",
    bestPractices: [
      "Irrigate more frequently during silking and tasseling stages",
      "Reduce irrigation as kernels mature",
      "Consider drip irrigation for water efficiency"
    ],
    idealConditions: "Temperatures between 68-86°F with 20-30 inches of water during growing season"
  },
  {
    id: 2,
    name: "Wheat",
    waterRequirement: "Moderate",
    growingSeason: "Fall-Spring (Winter) / Spring-Summer (Spring)",
    soilType: "Loam to heavy clay",
    daysToMaturity: "110-130 days",
    wateringFrequency: "Moderate",
    wateringAmount: "0.8-1.5 inches per week",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7REXsyj60ncyBD6klVrILC8Og9VK9srvdyA&s",
    description: "Wheat is a resilient grain crop that can be grown as winter or spring wheat. It has moderate water needs but is sensitive to both drought and waterlogging. Wheat requires consistent moisture during tillering and grain filling stages.",
    bestPractices: [
      "Ensure adequate soil moisture at planting time",
      "Critical irrigation periods: jointing, flowering, and grain filling",
      "Avoid overwatering during ripening"
    ],
    idealConditions: "Cool, dry conditions during ripening with 14-20 inches of water during growing season"
  },
  {
    id: 3,
    name: "Soybean",
    waterRequirement: "Moderate",
    growingSeason: "Late Spring-Fall",
    soilType: "Well-drained fertile loam",
    daysToMaturity: "90-150 days",
    wateringFrequency: "Moderate",
    wateringAmount: "1-1.5 inches per week",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGNRUuNzK8O62AJKJpcvNXfaaCEy3m5rGcGw&s",
    description: "Soybeans are legumes that fix nitrogen in the soil. They have moderate water requirements and are somewhat drought tolerant due to their deep root systems. However, water stress during flowering and pod development can significantly reduce yields.",
    bestPractices: [
      "Most critical water needs are during flowering and pod fill",
      "Maintain consistent soil moisture throughout growing season",
      "Avoid waterlogging as soybeans are sensitive to excess water"
    ],
    idealConditions: "Temperatures between 68-86°F with 15-25 inches of water during growing season"
  },
  {
    id: 4,
    name: "Alfalfa",
    waterRequirement: "High",
    growingSeason: "Spring-Fall (perennial)",
    soilType: "Well-drained, pH 6.8-7.5",
    daysToMaturity: "70-90 days to first cutting",
    wateringFrequency: "Regular",
    wateringAmount: "1.5-2 inches per week",
    image: "https://cdn.britannica.com/18/182618-050-53ADCEF8/Alfalfa-forage-crop.jpg",
    description: "Alfalfa is a perennial legume with a deep root system that can access water up to 20 feet below the surface. Despite this, it has high water requirements due to its rapid growth and multiple harvests per season. Proper irrigation management is essential for optimal yields.",
    bestPractices: [
      "Schedule irrigation immediately after cutting",
      "Allow soil to dry slightly between waterings to promote deep root growth",
      "Reduce irrigation 7-10 days before harvest"
    ],
    idealConditions: "Well-drained soil with pH 6.8-7.5 and 30-40 inches of water annually"
  },
  {
    id: 5,
    name: "Rice",
    waterRequirement: "Very High",
    growingSeason: "Late Spring-Fall",
    soilType: "Clay or loam with poor drainage",
    daysToMaturity: "120-180 days",
    wateringFrequency: "Constant",
    wateringAmount: "4-6 inches standing water",
    image: "https://media.istockphoto.com/id/153737841/photo/rice.jpg?s=612x612&w=0&k=20&c=lfO7iLT0UsDDzra0uBOsN1rvr2d5OEtrG2uwbts33_c=",
    description: "Rice is one of the most water-intensive crops, typically grown in flooded fields or paddies. It requires continuous flooding during most of its growing cycle, though some modern varieties can be grown with less water using alternate wetting and drying techniques.",
    bestPractices: [
      "Maintain 2-4 inches of standing water during vegetative and reproductive stages",
      "Consider alternate wetting and drying techniques where appropriate",
      "Drain field 2-3 weeks before harvest"
    ],
    idealConditions: "Hot and humid conditions with consistent water supply"
  },
  {
    id: 6,
    name: "Cotton",
    waterRequirement: "Moderate to High",
    growingSeason: "Late Spring-Fall",
    soilType: "Loamy, well-drained",
    daysToMaturity: "150-180 days",
    wateringFrequency: "Regular",
    wateringAmount: "1-2 inches per week",
    image: "https://media.istockphoto.com/id/589121090/photo/branch-of-ripe-cotton.jpg?s=612x612&w=0&k=20&c=eGlf6UISNaZRIKxnoesMIIpOqzevDWtb_OoU_0KVN_M=",
    description: "Cotton is a warm-season crop with moderate to high water requirements. It is relatively drought-tolerant once established but needs adequate moisture during flowering and boll development stages to ensure good yields.",
    bestPractices: [
      "Ensure adequate moisture during peak flowering and boll development",
      "Use deficit irrigation during vegetative growth if necessary",
      "Reduce irrigation as bolls mature and open"
    ],
    idealConditions: "Warm temperatures and 24-36 inches of water during growing season"
  },
  {
    id: 7,
    name: "Sugarcane",
    waterRequirement: "High",
    growingSeason: "Year-round (tropical)",
    soilType: "Rich, well-drained loam",
    daysToMaturity: "300-360 days",
    wateringFrequency: "Regular",
    wateringAmount: "1.5-2 inches per week",
    image: "https://www.netafimindia.com/bynder/689FFBA0-D431-4D9A-8BFB1805602316FC-sugarcane-with-driperline.jpg?width=1200&height=630&rmode=Min",
    description: "Sugarcane is a tropical grass that requires substantial water throughout its long growing cycle. It has one of the highest water requirements among commercial crops, though it can tolerate short periods of water stress.",
    bestPractices: [
      "Maintain consistent soil moisture throughout the growth cycle",
      "Increase water during grand growth phase",
      "Reduce irrigation during ripening to increase sugar content"
    ],
    idealConditions: "Tropical climate with 48-72 inches of water annually"
  },
  {
    id: 8,
    name: "Tomato",
    waterRequirement: "Moderate",
    growingSeason: "Late Spring-Summer",
    soilType: "Well-drained, fertile loam",
    daysToMaturity: "70-85 days",
    wateringFrequency: "Regular",
    wateringAmount: "1-1.5 inches per week",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJKRPXQYgZjJmuQTgXVQNLoZRxRWe7aW09wg&s",
    description: "Tomatoes require consistent moisture for optimal growth and fruit development. Irregular watering can lead to issues like blossom end rot and fruit cracking. Drip irrigation is ideal for tomatoes to keep foliage dry and reduce disease risk.",
    bestPractices: [
      "Water deeply but infrequently to encourage deep root growth",
      "Maintain consistent moisture during flowering and fruiting",
      "Use mulch to conserve soil moisture and reduce evaporation"
    ],
    idealConditions: "Warm temperatures and consistent moisture with 20-25 inches of water during growing season"
  }
];

export default function CropDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<(typeof cropData)[0] | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [detailedCrop, setDetailedCrop] = useState<(typeof cropData)[0] | null>(null);

  const filteredCrops = cropData.filter((crop) =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetailedGuide = (crop: (typeof cropData)[0]) => {
    setDetailedCrop(crop);
    setIsDetailDialogOpen(true);
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <DropletIcon className="h-5 w-5 text-agri-blue" />
          Crop Water Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - crop list */}
          <div className="md:w-1/2 space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
            </div>

            <div className="space-y-2 max-h-[300px] overflow-auto pr-2">
              {filteredCrops.map((crop) => (
                <div
                  key={crop.id}
                  className={`p-3 border rounded-md cursor-pointer transition-colors flex gap-3 items-center ${
                    selectedCrop?.id === crop.id
                      ? "bg-agri-green-light border-agri-green"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedCrop(crop)}
                >
                  <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={crop.image} 
                      alt={crop.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{crop.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span>Water: {crop.waterRequirement}</span>
                      <span>•</span>
                      <span>{crop.growingSeason}</span>
                    </div>
                  </div>
                </div>
              ))}

              {filteredCrops.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No crops found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>

          {/* Right column - crop details */}
          <div className="md:w-1/2 border-t pt-4 md:pt-0 md:border-t-0 md:border-l md:pl-6">
            {selectedCrop ? (
              <div className="animate-fade-in">
                <div className="rounded-lg overflow-hidden h-40 mb-4">
                  <img 
                    src={selectedCrop.image} 
                    alt={selectedCrop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{selectedCrop.name}</h3>
                  <Badge variant="outline" className="bg-agri-blue/10">
                    {selectedCrop.waterRequirement} Water Need
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Growing Season</h4>
                    <p>{selectedCrop.growingSeason}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Soil Type</h4>
                    <p>{selectedCrop.soilType}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Days to Maturity</h4>
                    <p>{selectedCrop.daysToMaturity}</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-agri-blue flex items-center gap-1">
                      <DropletIcon className="h-4 w-4" />
                      Water Requirements
                    </h4>
                    <p className="mt-1 text-sm">
                      <strong>Frequency:</strong> {selectedCrop.wateringFrequency}
                    </p>
                    <p className="mt-1 text-sm">
                      <strong>Amount:</strong> {selectedCrop.wateringAmount}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <Button size="sm">Add to My Crops</Button>
                  <Button size="sm" variant="outline" onClick={() => handleViewDetailedGuide(selectedCrop)}>Detailed Guide</Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <Info className="h-12 w-12 text-gray-300 mb-2" />
                <h3 className="text-lg font-medium">Select a Crop</h3>
                <p className="text-sm text-gray-500 max-w-xs mt-2">
                  Choose a crop from the list to view detailed water requirements and growing information
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Detailed Guide Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          {detailedCrop && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  {detailedCrop.name}
                  <Badge variant="outline" className="bg-agri-blue/10 text-agri-blue">
                    {detailedCrop.waterRequirement} Water Need
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Comprehensive water management guide
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="rounded-lg overflow-hidden h-60 mb-6">
                  <img 
                    src={detailedCrop.image} 
                    alt={detailedCrop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">About {detailedCrop.name}</h3>
                    <p className="text-gray-700">{detailedCrop.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Growing Requirements</h3>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Growing Season</h4>
                        <p className="font-medium">{detailedCrop.growingSeason}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Soil Type</h4>
                        <p className="font-medium">{detailedCrop.soilType}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Days to Maturity</h4>
                        <p className="font-medium">{detailedCrop.daysToMaturity}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Ideal Conditions</h4>
                        <p className="font-medium">{detailedCrop.idealConditions}</p>
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
                            <strong>Frequency:</strong> {detailedCrop.wateringFrequency}
                          </p>
                          <p className="text-sm">
                            <strong>Amount:</strong> {detailedCrop.wateringAmount}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Best Practices</h4>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          {detailedCrop.bestPractices.map((practice, index) => (
                            <li key={index} className="text-sm">{practice}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-agri-green-light/20 p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-2">Smart Irrigation Recommendations</h3>
                    <p className="text-sm">
                      For optimal growth, {detailedCrop.name} requires careful water management. 
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
    </Card>
  );
}
