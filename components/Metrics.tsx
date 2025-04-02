"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { 
  Activity, 
  Timer, 
  Heart, 
  Pill, 
} from "lucide-react";

const metrics = [
    {
      value: "4 months",
      label: "Average Waiting Time",
      className: "from-brand-blue/10 to-transparent border-brand-blue/20",
      countTo: 4,
      symbol: " months",
      delay: 0,
      icon: Timer,
      description: "Patients in some UK regions wait up to 4 months for physiotherapy appointments."
    },
    {
      value: "90%",
      label: "AI Diagnostic Accuracy",
      className: "from-brand-purple/10 to-transparent border-brand-purple/20",
      countTo: 90,
      symbol: "%",
      delay: 100,
      icon: Activity,
      description: "AI algorithms have achieved over 90% accuracy in diagnosing musculoskeletal conditions."
    },
    {
      value: "79%",
      label: "Pain Reduction Success",
      className: "from-brand-indigo/10 to-transparent border-brand-indigo/20",
      countTo: 79,
      symbol: "%",
      delay: 200,
      icon: Heart,
      description: "79% of physical therapy patients report significant pain reduction after treatment."
    },
    {
      value: "87%",
      label: "Reduced Opioid Need",
      className: "from-brand-pink/10 to-transparent border-brand-pink/20",
      countTo: 87,
      symbol: "%",
      delay: 300,
      icon: Pill,
      description: "Physical therapy can reduce the need for opioid medication by 87%."
    },
  ];
  

const CounterAnimation = ({ countTo, symbol, delay }: { countTo: number, symbol: string, delay: number }) => {
  const [count, setCount] = useState(0);
  const duration = 2000; // ms
  const framesPerSecond = 60;
  const totalFrames = (duration / 1000) * framesPerSecond;
  
  useEffect(() => {
    // Delayed start for the counter
    const startTimeout = setTimeout(() => {
      let currentFrame = 0;
      
      const counter = setInterval(() => {
        const progress = currentFrame / totalFrames;
        const incrementValue = countTo * progress;
        
        setCount(incrementValue);
        currentFrame++;
        
        if (currentFrame > totalFrames) {
          clearInterval(counter);
          setCount(countTo);
        }
      }, 1000 / framesPerSecond);
      
      return () => clearInterval(counter);
    }, delay);
    
    return () => clearTimeout(startTimeout);
  }, [countTo, totalFrames, delay]);

  return (
    <div className="text-4xl font-bold">
      {count.toFixed(countTo % 1 === 0 ? 0 : 1)}
      {symbol}
    </div>
  );
};

const Metrics = () => {
  return (
    <section id="metrics" className="py-16 md:py-24 bg-slate-50/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 animate-fade-in">
            Rehabilitation <span className="gradient-text">Outcomes</span>
          </h2>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
            Our physiotherapy approach delivers measurable results for patients of all ages and conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card 
              key={index} 
              className={cn(
                "border rounded-xl overflow-hidden bg-gradient-to-b animate-fade-in", 
                metric.className
              )}
              style={{ animationDelay: `${metric.delay}ms` }}
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <metric.icon className="h-8 w-8 mb-4 opacity-75" />
                <CounterAnimation 
                  countTo={metric.countTo} 
                  symbol={metric.symbol} 
                  delay={metric.delay} 
                />
                <div className="font-medium mt-2">{metric.label}</div>
                <div className="text-sm text-muted-foreground mt-1">{metric.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;