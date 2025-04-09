"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { type LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  link?: string;
  fallback?: boolean;
};

const DashboardCard = ({
  title,
  description,
  icon: Icon = AlertTriangle,
  link,
  fallback = false,
}: DashboardCardProps) => {
  const cardClass = fallback
    ? "border-destructive/20 bg-gradient-to-b from-destructive/10 to-transparent"
    : "border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent";

  return (
    <Card className={cn("border rounded-xl overflow-hidden animate-fade-in", cardClass)}>
      <CardHeader>
        <div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
        {link && (
          <Link href={link} className="text-brand-purple hover:underline text-sm mt-4 inline-block">
            Learn more →
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
