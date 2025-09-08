"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Scissors, Home, Car, PawPrint, Dumbbell, Wrench } from "lucide-react";
import Link from "next/link";

const verticalItems = [
  {
    icon: Users,
    title: "Sports Clubs",
    description: "Membership management for amateur clubs like rugby, cricket, football, and more",
    link: "/use-cases/sports-club-membership-software",
    className: "border-blue-500/20 bg-gradient-to-b from-blue-500/10 to-transparent"
  },
  {
    icon: Scissors,
    title: "Hairdressers",
    description: "Subscription plans for regular haircuts, styling, and treatments",
    link: "/use-cases/hairdressers-subscription-software",
    className: "border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-transparent"
  },
  {
    icon: Home,
    title: "Cleaning Services",
    description: "Weekly, fortnightly, and deep clean subscription packages",
    link: "/use-cases/cleaning-subscription-software",
    className: "border-green-500/20 bg-gradient-to-b from-green-500/10 to-transparent"
  },
  {
    icon: Car,
    title: "Car Valeting",
    description: "Mobile car washing and detailing subscription services",
    link: "/use-cases/car-valeting-subscription-software",
    className: "border-orange-500/20 bg-gradient-to-b from-orange-500/10 to-transparent"
  },
  {
    icon: PawPrint,
    title: "Pet Services",
    description: "Dog walking, grooming, and pet sitting subscriptions",
    link: "/use-cases/pet-sitter-subscription-software",
    className: "border-pink-500/20 bg-gradient-to-b from-pink-500/10 to-transparent"
  },
  {
    icon: Dumbbell,
    title: "Personal Training",
    description: "Gym memberships and personal training subscription plans",
    link: "/use-cases/personal-trainers-gym-memberships",
    className: "border-red-500/20 bg-gradient-to-b from-red-500/10 to-transparent"
  }
];

const VerticalShowcase = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 animate-fade-in">
            Perfect for <span className="gradient-text">Every Service Business</span>
          </h2>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
            From sports clubs to beauty salons, Monthly Club helps local service providers build predictable recurring revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {verticalItems.map((item, index) => (
            <Card 
              key={index} 
              className={`border rounded-xl overflow-hidden animate-fade-in hover:scale-105 transition-all duration-300 ${item.className}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                    <Link 
                      href={item.link}
                      className="inline-flex items-center text-sm font-medium text-brand-purple hover:text-white transition-colors"
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/use-cases/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-purple to-brand-blue text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span>View All Industries</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VerticalShowcase;
