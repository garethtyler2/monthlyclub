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
    value: "5 mins",
    label: "Setup Time",
    className: "from-brand-blue/10 to-transparent border-brand-blue/20",
    countTo: 5,
    symbol: " mins",
    delay: 0,
    icon: Timer,
    description: "Average time it takes to launch your first subscription service."
  },
  {
    value: "90%",
    label: "Retention Rate",
    className: "from-brand-purple/10 to-transparent border-brand-purple/20",
    countTo: 90,
    symbol: "%",
    delay: 100,
    icon: Activity,
    description: "Businesses using Monthly Club retain over 90% of subscribers month-to-month."
  },
  {
    value: "40%",
    label: "Revenue Boost",
    className: "from-brand-indigo/10 to-transparent border-brand-indigo/20",
    countTo: 40,
    symbol: "%",
    delay: 200,
    icon: Heart,
    description: "On average, service providers increase revenue by 40% with subscription plans."
  },
  {
    value: "0%",
    label: "Technical Skills Needed",
    className: "from-brand-pink/10 to-transparent border-brand-pink/20",
    countTo: 0,
    symbol: "%",
    delay: 300,
    icon: Pill,
    description: "You don’t need to code or design—Monthly Club handles the hard stuff for you."
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
            Real <span className="gradient-text">Business Impact</span>
          </h2>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
            Monthly Club is already helping businesses reduce admin, boost retention, and earn more from loyal customers.
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