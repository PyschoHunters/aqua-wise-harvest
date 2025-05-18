
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropletIcon, Info } from "lucide-react";

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
  },
];

export default function CropDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<(typeof cropData)[0] | null>(null);

  const filteredCrops = cropData.filter((crop) =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  className={`p-3 border rounded-md cursor-pointer transition-colors ${
                    selectedCrop?.id === crop.id
                      ? "bg-agri-green-light border-agri-green"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedCrop(crop)}
                >
                  <div className="font-medium">{crop.name}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span>Water: {crop.waterRequirement}</span>
                    <span>•</span>
                    <span>{crop.growingSeason}</span>
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
                  <Button size="sm" variant="outline">Detailed Guide</Button>
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
    </Card>
  );
}
