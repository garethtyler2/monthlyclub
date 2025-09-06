"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  ShoppingCart,
  Info,
  Check,
  ChevronDown
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
  ShoppingCart,
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
    pay_it_off: "e.g., 'Wedding Photography - £1200 total, pay over 2-18 months'",
    one_time: "e.g., 'A product or one-off session'"
  };

  const recurringTypes = Object.entries(PRODUCT_TYPE_CONFIG).filter(([type]) => type !== 'one_time');
  const oneTimeTypes = Object.entries(PRODUCT_TYPE_CONFIG).filter(([type]) => type === 'one_time');

  return (
    <div className={cn("space-y-3", className)}>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-white">Product Type</label>
        <p className="text-xs text-gray-400">Choose how customers will pay for this service</p>
      </div>

      {/* Trigger Button */}
      <Button
        variant="outline"
        className={cn(
          "w-full justify-between h-12 bg-gradient-to-r from-white/5 to-white/10 border-2 border-white/20 text-white hover:bg-white/15 hover:border-white/30 transition-all duration-200",
          isOpen && "border-blue-500/50 bg-blue-500/10"
        )}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-1.5 rounded-lg",
            selectedConfig.color === 'blue' && "bg-blue-500/20 text-blue-400",
            selectedConfig.color === 'green' && "bg-green-500/20 text-green-400",
            selectedConfig.color === 'purple' && "bg-purple-500/20 text-purple-400",
            selectedConfig.color === 'orange' && "bg-orange-500/20 text-orange-400"
          )}>
            <SelectedIcon className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="font-medium">{selectedConfig.label}</div>
            <div className="text-xs text-gray-400">{selectedConfig.shortDescription}</div>
          </div>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isOpen && "rotate-180")} />
      </Button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="bg-gray-900 border border-white/10 rounded-lg p-4 space-y-4 max-h-80 overflow-y-auto">
          <h4 className="font-medium text-sm text-white">Choose Product Type</h4>
          <p className="text-xs text-gray-400">Select how customers will pay for this service</p>
          
          {/* Recurring Products Section */}
          <div>
            <h5 className="text-xs font-semibold text-gray-300 mb-3 uppercase tracking-wide">Recurring Products</h5>
            <div className="space-y-2">
              {recurringTypes.map(([type, config]) => {
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
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-lg",
                            config.color === 'blue' && "bg-blue-500/20 text-blue-400",
                            config.color === 'green' && "bg-green-500/20 text-green-400",
                            config.color === 'purple' && "bg-purple-500/20 text-purple-400"
                          )}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h5 className="font-semibold text-sm text-white">{config.label}</h5>
                              {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                            </div>
                            <p className="text-xs text-gray-400">
                              {config.shortDescription}
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

          {/* One-Time Products Section */}
          <div>
            <h5 className="text-xs font-semibold text-gray-300 mb-3 uppercase tracking-wide">One-Time Products</h5>
            <div className="space-y-2">
              {oneTimeTypes.map(([type, config]) => {
                const Icon = typeIcons[config.icon as keyof typeof typeIcons];
                const isSelected = selectedType === type;
                
                return (
                  <Card
                    key={type}
                    className={cn(
                      "cursor-pointer transition-all hover:bg-white/10 border-white/10 hover:border-white/20",
                      isSelected && "ring-2 ring-orange-500 bg-orange-500/20 border-orange-500/30"
                    )}
                    onClick={() => {
                      onTypeChange(type as ProductType);
                      setIsOpen(false);
                    }}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-lg",
                            config.color === 'orange' && "bg-orange-500/20 text-orange-400"
                          )}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h5 className="font-semibold text-sm text-white">{config.label}</h5>
                              {isSelected && <Check className="w-4 h-4 text-orange-400" />}
                            </div>
                            <p className="text-xs text-gray-400">
                              {config.shortDescription}
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
        </div>
      )}
      
      {/* Selected type info */}
      <div className="text-xs text-gray-300 bg-white/5 p-3 rounded border border-white/10">
        <div className="flex items-start gap-2">
          <div className={cn(
            "p-1 rounded",
            selectedConfig.color === 'blue' && "bg-blue-500/20 text-blue-400",
            selectedConfig.color === 'green' && "bg-green-500/20 text-green-400",
            selectedConfig.color === 'purple' && "bg-purple-500/20 text-purple-400",
            selectedConfig.color === 'orange' && "bg-orange-500/20 text-orange-400"
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