"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { formatCurrency } from "@/lib/tax-utils";

interface MonthlyData {
  month: string;
  revenue: number;
  fees: number;
  netIncome: number;
  transactionCount: number;
}

interface MonthlyBreakdownProps {
  data: MonthlyData[];
}

export function MonthlyBreakdown({ data }: MonthlyBreakdownProps) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <Card className="border-white/10 bg-white/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <BarChart3 className="w-5 h-5" />
          Monthly Income Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart */}
          <div className="space-y-3">
            {data.map((month, index) => {
              const revenuePercentage = maxRevenue > 0 ? (month.revenue / maxRevenue) * 100 : 0;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white font-medium">{month.month}</span>
                    <div className="flex gap-4 text-xs text-gray-400">
                      <span>Revenue: {formatCurrency(month.revenue)}</span>
                      <span>Net: {formatCurrency(month.netIncome)}</span>
                      <span>{month.transactionCount} txns</span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    {/* Revenue bar */}
                    <div className="h-6 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${revenuePercentage}%` }}
                      />
                    </div>
                    
                    {/* Net income indicator */}
                    {month.netIncome > 0 && (
                      <div 
                        className="absolute top-0 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-70"
                        style={{ width: `${(month.netIncome / maxRevenue) * 100}%` }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 text-xs text-gray-400 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
              <span>Gross Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded"></div>
              <span>Net Income</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
