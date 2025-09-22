"use client";

import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LottieLoadingGradient from "@/components/LottieLoadingGradient";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { 
  Lightbulb, 
  Sparkles, 
  CreditCard, 
  Share2,
  ArrowRight,
  CheckCircle,
  Zap,
  Play,
  Pause,
  Building2,
  ImageIcon
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const HowItWorks = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [ctaHref, setCtaHref] = useState("/login");

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setCtaHref("/create-a-business");
      } else {
        setCtaHref("/login?redirect=/create-a-business");
      }
    };

    checkUser();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    imageUploaded: false,
    description: '',
    products: [] as Array<{name: string, price: string, description: string, type: string}>
  });

  const demoData = {
    businessName: 'Monthly Club\'s Hair Salon',
    description: 'Join our exclusive hair salon community. Get access to premium styling services, expert hair care tips, and networking opportunities that will help you look and feel your best.',
    imageUploaded: true,
    products: [
      {
        name: 'Premium Hair Cut Subscription',
        price: '50.00',
        description: '1 hair cut every other month',
        type: 'subscription'
      },
      {
        name: 'Hair Care Balance Builder',
        price: 'flexible',
        description: 'Build credit for additional services',
        type: 'balance-builder'
      }
    ]
  };

  const startDemo = () => {
    setIsPlaying(true);
    setFormData({ businessName: '', imageUploaded: false, description: '', products: [] });
    
    // Fill business name after 0.5 seconds
    setTimeout(() => {
      setFormData(prev => ({ ...prev, businessName: demoData.businessName }));
    }, 500);
    
    // Fill description after 1.5 seconds
    setTimeout(() => {
      setFormData(prev => ({ ...prev, description: demoData.description }));
    }, 1500);
    
    // Upload image after 2.5 seconds
    setTimeout(() => {
      setFormData(prev => ({ ...prev, imageUploaded: demoData.imageUploaded }));
    }, 2500);
    
    // Add products after 3.5 seconds
    setTimeout(() => {
      setFormData(prev => ({ ...prev, products: demoData.products }));
      setIsPlaying(false);
      
      // Show loading screen for 2 seconds
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep(1);
      }, 2000);
    }, 3500);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setFormData({ businessName: '', imageUploaded: false, description: '', products: [] });
  };

  const steps = [
    {
      number: "01",
      title: "Create & Design",
      subtitle: "Build your business page with products in one step",
      description: "Tell us about your business, upload your image, and create your products all in one place. Choose from different product types like subscriptions, balance builders, or one-time purchases. Use our AI polish feature to enhance your descriptions instantly.",
      icon: Lightbulb,
      color: "from-purple-primary to-blue-secondary",
      features: ["Business Profile Setup", "Product Creation", "AI Description Polish", "Multiple Product Types"]
    },
    {
      number: "02",
      title: "Connect Stripe", 
      subtitle: "Set up payments in minutes",
      description: "Connect your Stripe account seamlessly. We handle all the payment processing, security, and compliance so you can focus on what you do best - creating amazing products and services.",
      icon: CreditCard,
      color: "from-blue-secondary to-purple-light",
      features: ["Secure payments", "Automatic payouts", "Fraud protection", "Easy setup"]
    },
    {
      number: "03",
      title: "Share & Earn",
      subtitle: "Start selling immediately",
      description: "Your beautiful business page is ready! Share your custom link across social media, embed it in your bio, or send it directly to customers. Start earning recurring revenue from day one.",
      icon: Share2,
      color: "from-orange-accent to-pink-accent", 
      features: ["Custom storefront", "Social sharing", "Mobile optimized", "Instant earnings"]
    }
  ];

  const renderInteractiveStep = () => {
    if (currentStep === 0) {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Step 1: Create Your Business & Products
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Watch how easy it is! Click play to see the form fill out automatically with demo data including product creation.
            </p>
            
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={startDemo}
                disabled={isPlaying}
                className="hero-button-primary"
              >
                <Play className="w-4 h-4 mr-2" />
                {isPlaying ? 'Filling Form...' : 'Start Demo'}
              </Button>
              
              <Button 
                onClick={resetDemo}
                variant="outline"
                disabled={isPlaying}
              >
                <Pause className="w-4 h-4 mr-2" />
                Reset Demo
              </Button>
            </div>
          </div>
          
          <Card className="border-0 shadow-glow overflow-hidden">
            <CardContent className="p-4 md:p-8">
              <div className="grid gap-8">
                {/* Form Demo */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground text-center md:text-left">Business Setup Form</h3>
                  
                  <div className="space-y-6">
                    {/* Business Name */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Business Name *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="e.g., Sarah's Fitness Club"
                          value={formData.businessName}
                          readOnly
                          className={`pl-10 transition-all duration-500 ${
                            formData.businessName ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : ''
                          }`}
                        />
                        {formData.businessName && (
                          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                    
                    {/* Business Image */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Business Image
                      </label>
                      <div 
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-500 ${
                          formData.imageUploaded 
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                            : 'border-muted-foreground'
                        }`}
                      >
                        {formData.imageUploaded ? (
                          <div className="text-green-600 dark:text-green-400">
                            <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                            <p className="font-medium">Image Uploaded!</p>
                          </div>
                        ) : (
                          <div className="text-muted-foreground">
                            <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                            <p>Click to upload an image</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Business Description */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Business Description *
                      </label>
                      <Textarea
                        placeholder="Describe what you offer and why people should subscribe..."
                        value={formData.description}
                        readOnly
                        rows={6}
                        className={`transition-all duration-500 ${
                          formData.description ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : ''
                        }`}
                      />
                      {formData.description && (
                        <div className="absolute right-3 top-3">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      )}
                    </div>
                    
                    {/* Products Section */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Products
                      </label>
                      <div className="space-y-3">
                        {formData.products.map((product, index) => (
                          <div key={index} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                              <h6 className="font-semibold text-foreground">{product.name}</h6>
                              <Badge variant="secondary" className="text-xs">
                                {product.type === 'balance-builder' ? 'Balance Builder' : 'Subscription'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                            <p className="text-sm font-medium text-primary">
                              {product.type === 'balance-builder' ? 'Flexible amount' : `£${product.price}/month`}
                            </p>
                          </div>
                        ))}
                        {formData.products.length === 0 && (
                          <div className="text-center py-4 text-muted-foreground">
                            <p>Products will appear here...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Form Progress</span>
                      <span>{Math.round((Object.values(formData).filter(Boolean).length / 4) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(Object.values(formData).filter(Boolean).length / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    // Step 2: AI Enhanced Business Page
    if (currentStep === 1) {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Step 2: Connect Stripe
            </h2>
            <p className="text-lg text-muted-foreground">
              Your business page is ready! Now connect your Stripe account to start accepting payments.
            </p>
          </div>
          
                {/* Stripe Connection */}
                <div className="space-y-4 md:space-y-6">
                  <Card className="border-0 shadow-glow overflow-hidden">
                    <CardContent className="p-4 md:p-8">
                      <div className="grid gap-8">
                        <div className="space-y-6">
                          <div className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                              <CreditCard className="w-12 h-12" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">Connect Stripe</h3>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                              Connect your Stripe account to start accepting payments. We handle all the security and compliance so you can focus on your business.
                            </p>
                          </div>
                          
                          <div className="grid gap-4 max-w-md mx-auto">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="text-sm text-muted-foreground">Secure payment processing</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="text-sm text-muted-foreground">Automatic payouts</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="text-sm text-muted-foreground">Fraud protection</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
          
          {/* Continue to Step 3 Button */}
          <div className="text-center mt-8">
            <Button 
              onClick={() => setCurrentStep(2)}
              className="hero-button-primary"
            >
              Continue to Step 3
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          {/* Back to Step 1 Button */}
          <div className="text-center mt-4">
            <Button 
              onClick={() => setCurrentStep(0)}
              variant="outline"
            >
              Back to Step 1
            </Button>
          </div>
        </div>
      );
    }

    // Step 3: Share & Earn
    if (currentStep === 2) {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Step 3: Share & Start Earning
            </h2>
            <p className="text-lg text-muted-foreground">
              Your business is ready! Share your link and start earning money.
            </p>
          </div>
          
          <Card className="border-0 shadow-glow overflow-hidden">
            <CardContent className="p-4 md:p-8">
              <div className="grid gap-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                      <Share2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">You're Ready to Go!</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Your beautiful business page is live and ready to accept customers. Share your custom link across social media, embed it in your bio, or send it directly to customers.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30 max-w-md mx-auto">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Your Business Link</p>
                      <p className="font-mono text-primary font-medium">monthlyclubhq.com/s/hair-salon</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 max-w-md mx-auto">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Custom storefront</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Social sharing ready</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Mobile optimized</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Restart Demo Button */}
          <div className="text-center mt-8">
            <Button 
              onClick={resetDemo}
              className="hero-button-primary"
            >
              Try Demo Again
              <Play className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      );
    }

  };

  return (
    <>
    <div className="min-h-screen bg-gradient-subtle">


      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <Badge className="mb-6  text-primary-foreground animate-bounce-in">
            <Zap className="w-4 h-4 mr-2" />
            How It Works
          </Badge>
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text gradient-text mb-6 animate-scale-in leading-tight">
            Launch Your Subscription Business <br className="md:hidden" /> in 3 Easy Steps
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-in-up">
            Transform your creativity into recurring revenue. Create your business page with products, connect payments, and start earning - all in minutes.          </p>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="hero-button-primary">
                <Link href={ctaHref}>
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
            
            {/* Demo Button */}
            <div className="mt-6">
              <Button 
                onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
                variant="ghost" 
                size="lg"
                className="text-primary hover:text-primary/80 hover:bg-primary/10"
              >
                <Play className="w-4 h-4 mr-2" />
                See the Demo
              </Button>
            </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 lg:gap-20">
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-1/2 top-full w-px h-20 bg-gradient-primary opacity-30 transform -translate-x-1/2"></div>
                )}
                
                <div className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''} animate-slide-in-up`} style={{animationDelay: `${index * 0.2}s`}}>
                    <div className="flex items-center gap-4">
                      <span className="text-6xl font-bold bg-gradient-primary bg-clip-text gradient-text">
                        {step.number}
                      </span>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                          {step.title}
                        </h2>
                        <p className="text-lg text-muted-foreground">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo-section" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Badge className="mb-6  text-primary-foreground animate-bounce-in">
            <Sparkles className="w-4 h-4 mr-2" />
            Interactive Demo
          </Badge>
          <h2 className="text-4xl md:text-7xl font-bold bg-clip-text gradient-text mb-6 animate-scale-in leading-tight">
            See the Form in Action
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-in-up">
            Watch how the business setup form automatically fills with demo data.
          </p>
          {renderInteractiveStep()}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-0 shadow-glow overflow-hidden relative">
            <CardContent className="p-6 relative z-10">
              <div className="absolute inset-0 bg-black/10"></div>
              <h2 className="text-4xl md:text-5xl gradient-text font-bold mb-6 relative z-10">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl mb-8 opacity-90 relative z-10">
                Join thousands of creators who are already earning money with our platform.
                Your success story starts today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                               <Link href="/create-a-business">
                <Button className="hero-button-primary bg-white text-primary hover:bg-white/90">
                  Start Creating Now
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
             </Link>

          
              </div>
            </CardContent>
            
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          </Card>
        </div>
      </section>
        {/* AI Enhancement Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <LottieLoadingGradient 
              src="https://lottie.host/2df0aa0e-7824-4c43-a3ca-82674f0ecf55/GcoEaiXBJP.lottie"
              className="h-40 w-40"
            />
            <div className="text-center mt-8">
              <h3 className="text-2xl font-semibold text-white mb-2">
                AI is enhancing your business info and products
              </h3>
            </div>
          </div>
        )}
      </div>
      </>
    );
  };

export default HowItWorks;