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

  // Examples for each product type
  const examples = {
    standard: "e.g., 'Membership to a club, or for a regular service'",
    balance_builder: "e.g., 'Personal training credit - choose own monthly amount'",
    pay_it_off: "e.g., 'Wedding Photography - £1200 total, pay over 2-18 months'"
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-white">Product Type</label>
        <p className="text-xs text-gray-400">Choose how customers will pay for this service</p>
      </div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between h-12 bg-gradient-to-r from-white/5 to-white/10 border-2 border-white/20 text-white hover:bg-white/15 hover:border-white/30 transition-all duration-200",
              isOpen && "border-blue-500/50 bg-blue-500/10"
            )}
            disabled={disabled}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-1.5 rounded-lg",
                selectedConfig.color === 'blue' && "bg-blue-500/20 text-blue-400",
                selectedConfig.color === 'green' && "bg-green-500/20 text-green-400",
                selectedConfig.color === 'purple' && "bg-purple-500/20 text-purple-400"
              )}>
                <SelectedIcon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-medium">{selectedConfig.label}</div>
                <div className="text-xs text-gray-400">{selectedConfig.shortDescription}</div>
              </div>
            </div>
            <Info className="w-4 h-4 text-gray-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0 bg-gray-900 border-white/10" align="start">
          <div className="p-4">
            <h4 className="font-medium text-sm mb-3 text-white">Choose Product Type</h4>
            <p className="text-xs text-gray-400 mb-4">Select how customers will pay for this service</p>
            <div className="space-y-3">
              {Object.entries(PRODUCT_TYPE_CONFIG).map(([type, config]) => {
                const Icon = typeIcons[config.icon as keyof typeof typeIcons];
                const isSelected = selectedType === type;
                
                return (
                  <Card
                    key={type}
                    className={cn(
                      "cursor-pointer transition-all hover:bg-white/10 border-white/10 hover:border-white/20",
                      isSelected && "ring-2 ring-blue-500 bg-blue-500/20 border-blue-500/30"
                    )}
                    onClick={() => {
                      onTypeChange(type as ProductType);
                      setIsOpen(false);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "p-2 rounded-lg",
                            config.color === 'blue' && "bg-blue-500/20 text-blue-400",
                            config.color === 'green' && "bg-green-500/20 text-green-400",
                            config.color === 'purple' && "bg-purple-500/20 text-purple-400"
                          )}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h5 className="font-semibold text-sm text-white">{config.label}</h5>
                              {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                            </div>
                            <p className="text-xs text-gray-300 mb-2 font-medium">
                              {config.shortDescription}
                            </p>
                            <p className="text-xs text-gray-400 mb-2">
                              {config.description}
                            </p>
                            <div className="text-xs text-gray-500 italic">
                              {examples[type as keyof typeof examples]}
                            </div>
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
      <div className="text-xs text-gray-300 bg-white/5 p-3 rounded border border-white/10">
        <div className="flex items-start gap-2">
          <div className={cn(
            "p-1 rounded",
            selectedConfig.color === 'blue' && "bg-blue-500/20 text-blue-400",
            selectedConfig.color === 'green' && "bg-green-500/20 text-green-400",
            selectedConfig.color === 'purple' && "bg-purple-500/20 text-purple-400"
          )}>
            <SelectedIcon className="w-3 h-3" />
          </div>
          <div>
            <div className="font-medium text-white mb-1">{selectedConfig.label}</div>
            <div className="text-gray-400 mb-1">{selectedConfig.description}</div>
            <div className="text-gray-500 italic">{examples[selectedType]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
