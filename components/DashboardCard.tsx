"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  link?: string;
  fallback?: boolean;
  footer?: ReactNode;
};

const DashboardCard = ({
  title,
  description,
  icon: Icon = AlertTriangle,
  link,
  footer,
}: DashboardCardProps) => {


  return (
    <Card className={cn("border rounded-xl overflow-hidden animate-fade-in border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent", )}>
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
            View →
          </Link>
        )}
      </CardContent>

      {footer && (
        <div className="px-6 pb-6">
          {footer}
        </div>
      )}
    </Card>
  );
};

export default DashboardCard;
