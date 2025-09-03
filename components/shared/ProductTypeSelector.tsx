"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  Info,
  Check
} from "lucide-react";
import { ProductType, PRODUCT_TYPE_CONFIG, getProductTypeConfig } from "@/types/products";
import { cn } from "@/lib/utils";

interface ProductTypeSelectorProps {
  selectedType: ProductType;
  onTypeChange: (type: ProductType) => void;
  disabled?: boolean;
  className?: string;
}

const typeIcons = {
  CreditCard,
  TrendingUp,
  Calendar,
};

export default function ProductTypeSelector({ 
  selectedType, 
  onTypeChange, 
  disabled = false,
  className 
}: ProductTypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedConfig = getProductTypeConfig(selectedType);
  const SelectedIcon = typeIcons[selectedConfig.icon as keyof typeof typeIcons];

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-semibold text-white">Product Type</label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-white/5 border-white/10 text-white hover:bg-white/10"
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <SelectedIcon className="w-4 h-4" />
              <span>{selectedConfig.label}</span>
            </div>
            <Info className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-4">
            <h4 className="font-medium text-sm mb-3">Choose Product Type</h4>
            <div className="space-y-2">
              {Object.entries(PRODUCT_TYPE_CONFIG).map(([type, config]) => {
                const Icon = typeIcons[config.icon as keyof typeof typeIcons];
                const isSelected = selectedType === type;
                
                return (
                  <Card
                    key={type}
                    className={cn(
                      "cursor-pointer transition-all hover:bg-gray-50",
                      isSelected && "ring-2 ring-blue-500 bg-blue-50"
                    )}
                    onClick={() => {
                      onTypeChange(type as ProductType);
                      setIsOpen(false);
                    }}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "p-2 rounded-lg",
                            config.color === 'blue' && "bg-blue-100 text-blue-600",
                            config.color === 'green' && "bg-green-100 text-green-600",
                            config.color === 'purple' && "bg-purple-100 text-purple-600"
                          )}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium text-sm">{config.label}</h5>
                              {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                            </div>
                            <p className="text-xs text-gray-600 mb-1">
                              {config.shortDescription}
                            </p>
                            <p className="text-xs text-gray-500">
                              {config.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {/* Selected type info */}
      <div className="text-xs text-gray-400 bg-white/5 p-2 rounded border border-white/10">
        <strong>{selectedConfig.label}:</strong> {selectedConfig.description}
      </div>
    </div>
  );
}
