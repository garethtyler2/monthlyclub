"use client";
import React, { useState } from 'react';
import { toast } from "sonner";
import { 
  Dumbbell, 
  Clock, 
  CheckCircle2, 
  HomeIcon, 
  Building2, 
  ChevronDown, 
  ChevronUp,
  Activity,
  StretchHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useTypingPlaceholder } from "@/hooks/useTypingPlaceholder";
import { RadioCard } from "@/components/ui/radio-card";


  

const PersonalTraining = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [hasInjury, setHasInjury] = useState<string | null>(null);
  const [trainingGoal, setTrainingGoal] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your training plan request has been submitted!");
      setLoading(false);
    }, 1500);
  };
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const focusPlaceholder = useTypingPlaceholder([
    "Flexibility and Mobility",
    "Marathon Training",
    "Increase Bench Press",
    "Sprint Speed",
    "VO2 MAX",
    "Leg Day",
    "Weight Loss"
  ]);
  return (
    <div className="min-h-screen">
      <div className="container px-3 py-4 md:py-8 max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
        <h1 className="animate-fade-in pb-4 sm:text-5xl text-3xl" style={{ animationDelay: "400ms" }}>
            <span className="block">Your AI-Powered</span>
            <span className="gradient-text">
            Personal Training Plan
            </span>
          </h1>
          <p>
          Get a customized workout program designed specifically for your goals and preferences
          </p>
        </div>
        
        <Card className="p-6 md:p-8 shadow-lg rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
          
            {/* Timeframe Selection */}
            <div className="space-y-3 ">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5" /> 
                How long would you like the workout programme for?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-zinc-900">
                <RadioCard id="timeframe_1_day" name="timeframe" value="1-day" label="Day" />
                <RadioCard id="timeframe_1_week" name="timeframe" value="1-week" label="Week" />
                <RadioCard id="timeframe_1_month" name="timeframe" value="1-month" label="Month" />
              </div>
            </div>
            
            {/* Location Selection */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <HomeIcon className="h-5 w-5  " /> 
                Where will you be working out?
              </h3>
              <div className="grid grid-cols-2 gap-3 text-zinc-900">
                <RadioCard 
                  id="location_home" 
                  name="location" 
                  value="home" 
                  label="At Home" 
                  icon={<HomeIcon className="mr-2 h-4 w-4" />}
                />
                <RadioCard 
                  id="location_gym" 
                  name="location" 
                  value="gym" 
                  label="At The Gym" 
                  icon={<Building2 className="mr-2 h-4 w-4" />}
                />
              </div>
            </div>
            
            {/* Focus Area Input */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">
                What is the focus of your training?
              </h3>
              <Input 
                id="focus_area" 
                name="focus_area" 
                className="border-slate-300 focus-visible:ring-fitness-primary" 
                placeholder={focusPlaceholder}
              />
            </div>
            {/* Tip Message */}
            <p className="text-center  500 text-sm italic">
              Tip: Be specific for better recommendations.
            </p>
            {/* Additional Options Toggle */}
            <div className="pt-4">
              <Button 
                type="button" 
                onClick={toggleDetails}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-slate-300  "
              >
                {showDetails ? (
                  <>Less Options <ChevronUp className="h-4 w-4" /></>
                ) : (
                  <>More Options <ChevronDown className="h-4 w-4" /></>
                )}
              </Button>
            </div>
          
            {/* Additional Details Section */}
            {showDetails && (
              <div className="space-y-8 animate-fade-in">
              
                {/* Injury or Limitation */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold  800">
                    Do you have any injuries or limitations?
                  </h3>
                  <RadioGroup 
                    value={hasInjury || ""} 
                    onValueChange={(value) => setHasInjury(value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="injury_yes" />
                      <Label htmlFor="injury_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="injury_no" />
                      <Label htmlFor="injury_no">No</Label>
                    </div>
                  </RadioGroup>
                  
                  {hasInjury === "yes" && (
                    <Textarea 
                      id="injury-details" 
                      name="injury-details"
                      className="mt-3 border-slate-300 focus-visible:ring-fitness-primary animate-fade-in" 
                      placeholder="Please provide details about your injury or limitation..."
                    />
                  )}
                </div>
                
                {/* Training Goal Dropdown */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold  800">
                    What is your primary training goal?
                  </h3>
                  <Select value={trainingGoal} onValueChange={setTrainingGoal}>
                    <SelectTrigger className="border-slate-300 focus:ring-fitness-primary">
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strength">
                        <div className="flex items-center">
                          <Dumbbell className="mr-2 h-4 w-4" /> Strength Training
                        </div>
                      </SelectItem>
                      <SelectItem value="endurance">
                        <div className="flex items-center">
                          <Activity className="mr-2 h-4 w-4" /> Endurance Training
                        </div>
                      </SelectItem>
                      <SelectItem value="flexibility">
                        <div className="flex items-center">
                          <StretchHorizontal className="mr-2 h-4 w-4" /> Flexibility/Mobility
                        </div>
                      </SelectItem>
                      <SelectItem value="posture">Posture Correction</SelectItem>
                      <SelectItem value="rehab">Rehabilitation</SelectItem>
                      <SelectItem value="stress">Stress Relief</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Dynamic Fields for Training Goal */}
                {trainingGoal === "strength" && (
                  <div className="space-y-3 animate-fade-in">
                    <h3 className="text-lg font-medium  800">
                      Enter your 1 Rep Max (optional):
                    </h3>
                    <div className="flex gap-2 items-center">
                      <Input 
                        id="one_rep_max" 
                        name="one_rep_max" 
                        type="number" 
                        className="border-slate-300 focus-visible:ring-fitness-primary" 
                        placeholder="e.g., 100kg"
                      />
                      <span className=" 500">kg</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="unknown_rep_max" />
                      <label
                        htmlFor="unknown_rep_max"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I don't know
                      </label>
                    </div>
                  </div>
                )}
                
                {trainingGoal === "endurance" && (
                  <div className="space-y-3 animate-fade-in">
                    <h3 className="text-lg font-medium  800">
                      Preferred endurance activity:
                    </h3>
                    <Select>
                      <SelectTrigger className="border-slate-300 focus:ring-fitness-primary">
                        <SelectValue placeholder="Select activity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="running">Running</SelectItem>
                        <SelectItem value="cycling">Cycling</SelectItem>
                        <SelectItem value="swimming">Swimming</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <h3 className="text-lg font-medium  800 mt-4">
                      Distance goal (optional):
                    </h3>
                    <div className="flex gap-2 items-center">
                      <Input 
                        id="distance_goal" 
                        name="distance_goal" 
                        type="number" 
                        className="border-slate-300 focus-visible:ring-fitness-primary" 
                        placeholder="e.g., 5"
                      />
                      <span className=" 500">km</span>
                    </div>
                  </div>
                )}
                
                {/* Preferred Training Style */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold  800">
                    What is your preferred training style?
                  </h3>
                  <Select>
                    <SelectTrigger className="border-slate-300 focus:ring-fitness-primary">
                      <SelectValue placeholder="Select your style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hiit">High-Intensity Interval Training (HIIT)</SelectItem>
                      <SelectItem value="strength">Strength Training</SelectItem>
                      <SelectItem value="cardio">Cardio/Endurance</SelectItem>
                      <SelectItem value="yoga">Yoga/Pilates</SelectItem>
                      <SelectItem value="mixed">Mixed (variety of styles)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Fitness Level */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold  800">
                    What is your current fitness level?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-zinc-900">
                    <RadioCard id="fitness_beginner" name="fitness_level" value="beginner" label="Beginner" />
                    <RadioCard id="fitness_intermediate" name="fitness_level" value="intermediate" label="Intermediate" />
                    <RadioCard id="fitness_advanced" name="fitness_level" value="advanced" label="Advanced" />
                  </div>
                </div>
                
                {/* Activity Level */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold  800">
                    How active are you currently?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-zinc-900">
                    <RadioCard id="activity_sedentary" name="activity_level" value="sedentary" label="Sedentary" />
                    <RadioCard id="activity_light" name="activity_level" value="light" label="Light (1-2 times/week)" />
                    <RadioCard id="activity_moderate" name="activity_level" value="moderate" label="Moderate (3-4 times/week)" />
                    <RadioCard id="activity_high" name="activity_level" value="high" label="High (5+ times/week)" />
                  </div>
                </div>
                
                {/* Equipment Selection */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold  800">
                    What equipment do you have access to?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-zinc-900">
                    <CheckboxCard id="equipment_dumbbells" name="equipment" value="dumbbells" label="Dumbbells" />
                    <CheckboxCard id="equipment_resistance_bands" name="equipment" value="resistance_bands" label="Resistance Bands" />
                    <CheckboxCard id="equipment_none" name="equipment" value="none" label="No Equipment" />
                  </div>
                </div>
                
                {/* Workout Duration */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold flex items-center gap-2 ">
                    <Clock className="h-5 w-5  " /> 
                    How long would you like each workout session to be?
                  </h3>
                  <div className="grid grid-cols-3 gap-3 text-zinc-900">
                    <RadioCard id="duration_15_min" name="workout_duration" value="15-min" label="15 Minutes" />
                    <RadioCard id="duration_30_min" name="workout_duration" value="30-min" label="30 Minutes" />
                    <RadioCard id="duration_60_min" name="workout_duration" value="60-min" label="1 Hour" />
                  </div>
                </div>
              </div>
            )}
            
            {/* Submit Button */}
            <div className="pt-4 flex justify-center">
              <Button
                type="submit"
                disabled={loading}
                className="hero-button-primary"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                    Generating Plan...
                  </div>
                ) : (
                  "Generate Plan"
                )}
              </Button>
            </div>
            
          </form>
        </Card>
      </div>
    </div>
  );
};


const CheckboxCard = ({ id, name, value, label }: { 
  id: string;
  name: string;
  value: string;
  label: string;
}) => {
  return (
    <div className="relative">
      <input 
        id={id}
        name={name}
        value={value}
        type="checkbox"
        className="peer sr-only"
      />
      <label 
        htmlFor={id}
        className="flex h-full items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white p-4 text-center text-sm transition-all   peer-checked:border-fitness-primary peer-checked:bg-fitness-light peer-checked:font-medium cursor-pointer"
      >
        {label}
      </label>
      <CheckCircle2 className="absolute top-2 right-2 h-4 w-4   opacity-0 transition-opacity peer-checked:opacity-100" />
    </div>
  );
};

export default PersonalTraining;
