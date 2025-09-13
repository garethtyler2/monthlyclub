"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight,
  CreditCard, 
  TrendingUp, 
  Calendar, 
  ShoppingCart,
  Check
} from "lucide-react";
import { ProductType, PRODUCT_TYPE_CONFIG, getProductTypeConfig, requiresPrice } from "@/types/products";
import { cn } from "@/lib/utils";

interface ProductFormData {
  product_type: ProductType;
  name: string;
  description: string;
  price?: number;
}

interface MultiStepProductCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: ProductFormData) => Promise<void>;
  initialData?: Partial<ProductFormData>;
  title?: string;
}

const typeIcons = {
  CreditCard,
  TrendingUp,
  Calendar,
  ShoppingCart,
};

export default function MultiStepProductCreator({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  title = "Add New Product"
}: MultiStepProductCreatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProductFormData>({
    product_type: 'standard',
    name: '',
    description: '',
    price: undefined,
    ...initialData
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProductTypeSelect = (type: ProductType) => {
    updateFormData('product_type', type);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form and close
      setFormData({
        product_type: 'standard',
        name: '',
        description: '',
        price: undefined,
      });
      setCurrentStep(1);
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      product_type: 'standard',
      name: '',
      description: '',
      price: undefined,
    });
    setCurrentStep(1);
    onClose();
  };

  const selectedConfig = getProductTypeConfig(formData.product_type);
  const SelectedIcon = typeIcons[selectedConfig.icon as keyof typeof typeIcons];
  const needsPrice = requiresPrice(formData.product_type);

  // Examples for each product type
  const examples = {
    standard: "e.g., 'Membership to a club, or for a regular service'",
    balance_builder: "e.g., 'Personal training credit - flexible monthly amount'",
    pay_it_off: "e.g., 'Wedding Photography - £1200 total, pay over 2-18 months'",
    one_time: "e.g., 'A product or one-off session'"
  };

  const recurringTypes = Object.entries(PRODUCT_TYPE_CONFIG).filter(([type]) => type !== 'one_time');
  const oneTimeTypes = Object.entries(PRODUCT_TYPE_CONFIG).filter(([type]) => type === 'one_time');

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-800 border-white/10 sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-4">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-white flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Step {currentStep} of 2</span>
              <div className="flex gap-1">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  currentStep >= 1 ? "bg-blue-500" : "bg-gray-600"
                )} />
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  currentStep >= 2 ? "bg-blue-500" : "bg-gray-600"
                )} />
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Step 1: Product Type Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Choose Product Type</h3>
                <p className="text-gray-400">Select how customers will pay for this service</p>
              </div>

              {/* Recurring Products Section */}
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">Recurring Products</h4>
                <div className="grid gap-3">
                  {recurringTypes.map(([type, config]) => {
                    const Icon = typeIcons[config.icon as keyof typeof typeIcons];
                    const isSelected = formData.product_type === type;
                    
                    return (
                      <Card
                        key={type}
                        className={cn(
                          "cursor-pointer transition-all hover:bg-white/10 border-white/10 hover:border-white/20",
                          isSelected && `ring-4 ${config.color === 'blue' ? 'ring-blue-500 bg-blue-500/20 border-blue-500/30' : 
                                          config.color === 'green' ? 'ring-green-500 bg-green-500/20 border-green-500/30' : 
                                          'ring-purple-500 bg-purple-500/20 border-purple-500/30'}`
                        )}
                        onClick={() => handleProductTypeSelect(type as ProductType)}
                      >
                        <CardContent className="p-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "p-2.5 rounded-lg",
                                config.color === 'blue' && "bg-blue-500/20 text-blue-400",
                                config.color === 'green' && "bg-green-500/20 text-green-400",
                                config.color === 'purple' && "bg-purple-500/20 text-purple-400"
                              )}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h5 className="font-semibold text-white">{config.label}</h5>
                                  {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                                </div>
                                <p className="text-sm text-gray-400 mb-2">
                                  {config.shortDescription}
                                </p>
                                <p className="text-xs text-gray-500 italic">
                                  {examples[type as ProductType]}
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
                <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">One-Time Products</h4>
                <div className="grid gap-3">
                  {oneTimeTypes.map(([type, config]) => {
                    const Icon = typeIcons[config.icon as keyof typeof typeIcons];
                    const isSelected = formData.product_type === type;
                    
                    return (
                      <Card
                        key={type}
                        className={cn(
                          "cursor-pointer transition-all hover:bg-white/10 border-white/10 hover:border-white/20",
                          isSelected && "ring-2 ring-orange-500 bg-orange-500/20 border-orange-500/30"
                        )}
                        onClick={() => handleProductTypeSelect(type as ProductType)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "p-2.5 rounded-lg",
                                config.color === 'orange' && "bg-orange-500/20 text-orange-400"
                              )}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h5 className="font-semibold text-white">{config.label}</h5>
                                  {isSelected && <Check className="w-4 h-4 text-orange-400" />}
                                </div>
                                <p className="text-sm text-gray-400 mb-2">
                                  {config.shortDescription}
                                </p>
                                <p className="text-xs text-gray-500 italic">
                                  {examples[type as ProductType]}
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

          {/* Step 2: Product Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Product Details</h3>
                <p className="text-gray-400">Fill in the details for your product</p>
              </div>

              {/* Selected product type reminder */}
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    selectedConfig.color === 'blue' && "bg-blue-500/20 text-blue-400",
                    selectedConfig.color === 'green' && "bg-green-500/20 text-green-400",
                    selectedConfig.color === 'purple' && "bg-purple-500/20 text-purple-400",
                    selectedConfig.color === 'orange' && "bg-orange-500/20 text-orange-400"
                  )}>
                    <SelectedIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{selectedConfig.label}</div>
                    <div className="text-sm text-gray-400">{selectedConfig.shortDescription}</div>
                  </div>
                </div>
              </div>

              {/* Product details form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name" className="text-white">Product Name</Label>
                  <Input
                    id="product-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="Enter product name"
                    className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-description" className="text-white">Description</Label>
                  <Textarea
                    id="product-description"
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    placeholder="Describe what this product includes"
                    className="bg-white/5 border-white/10 text-white placeholder-gray-400 min-h-[100px]"
                    required
                  />
                </div>

                {needsPrice && (
                  <div className="space-y-2">
                    <Label htmlFor="product-price" className="text-white">
                      {formData.product_type === 'pay_it_off' ? 'Total Amount (£)' : 
                       formData.product_type === 'one_time' ? 'Price (£)' : 
                       'Price (£/month)'}
                    </Label>
                    <Input
                      id="product-price"
                      type="number"
                      step="0.01"
                      value={formData.price || ''}
                      onChange={(e) => updateFormData('price', parseFloat(e.target.value) || 0)}
                      placeholder={formData.product_type === 'pay_it_off' ? 'Total amount to be paid off' : 
                                   formData.product_type === 'one_time' ? 'Total price' :
                                   'Monthly price'}
                      className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                      required
                    />
                    {formData.product_type === 'pay_it_off' && (
                      <p className="text-xs text-gray-400">
                        Customers will choose how many months to pay this off over
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between pt-4 border-t border-white/10">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? handleClose : handleBack}
              className="border-white/20 text-white hover:bg-white/10"
            >
              {currentStep === 1 ? (
                "Cancel"
              ) : (
                <>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </>
              )}
            </Button>

            <Button
              onClick={currentStep === 1 ? handleNext : handleSubmit}
              disabled={
                currentStep === 1 
                  ? !formData.product_type 
                  : !formData.name || !formData.description || (needsPrice && !formData.price)
              }
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              {currentStep === 1 ? (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                isSubmitting ? "Creating..." : "Create Product"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
