"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, CreditCard, Users, Calculator } from "lucide-react";
import { formatCurrency } from "@/lib/tax-utils";

interface IncomeSummaryProps {
  data: {
    totalRevenue: number;
    totalFees: number;
    netIncome: number;
    transactionCount: number;
    averageTransaction: number;
  };
}

export function IncomeSummary({ data }: IncomeSummaryProps) {
  const cards = [
    {
      title: "Total Revenue",
      value: formatCurrency(data.totalRevenue),
      icon: DollarSign,
      description: "Gross income before fees",
      color: "text-green-400"
    },
    {
      title: "Platform Fees",
      value: formatCurrency(data.totalFees),
      icon: CreditCard,
      description: "Stripe + Monthly Club fees",
      color: "text-red-400"
    },
    {
      title: "Net Income",
      value: formatCurrency(data.netIncome),
      icon: TrendingUp,
      description: "Revenue minus fees",
      color: "text-blue-400"
    },
    {
      title: "Transactions",
      value: data.transactionCount.toString(),
      icon: Users,
      description: "Total successful payments",
      color: "text-purple-400"
    },
    {
      title: "Avg Transaction",
      value: formatCurrency(data.averageTransaction),
      icon: Calculator,
      description: "Average payment amount",
      color: "text-orange-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="border-white/10 bg-white/5">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-400">
                {card.title}
              </CardTitle>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">
              {card.value}
            </div>
            <p className="text-xs text-gray-400">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
