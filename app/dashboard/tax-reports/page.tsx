"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  DollarSign, 
  CreditCard, 
  Calendar,
  FileText,
  BarChart3,
  Users
} from "lucide-react";
import { getCurrentTaxYear, getAvailableTaxYears, formatCurrency, formatDate, getTaxYearMonths, TaxYear } from "@/lib/tax-utils";
import { IncomeSummary } from "@/components/dashboard/IncomeSummary";
import { MonthlyBreakdown } from "@/components/dashboard/MonthlyBreakdown";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

interface PaymentData {
  id: string;
  amount: number;
  paid_at: string;
  status: string;
  currency: string;
  product_id: string;
  user_id: string;
  products?: {
    name: string;
    price: number;
  };
}

interface TaxReportData {
  totalRevenue: number;
  totalFees: number;
  netIncome: number;
  transactionCount: number;
  averageTransaction: number;
  monthlyData: Array<{
    month: string;
    revenue: number;
    fees: number;
    netIncome: number;
    transactionCount: number;
  }>;
  productBreakdown: Array<{
    productName: string;
    revenue: number;
    transactionCount: number;
  }>;
}

export default function TaxReportsPage() {
  const [selectedTaxYear, setSelectedTaxYear] = useState<TaxYear>(getCurrentTaxYear());
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<TaxReportData | null>(null);
  const [availableTaxYears, setAvailableTaxYears] = useState<TaxYear[]>([]);

  useEffect(() => {
    const fetchBusinessId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Current user:", user);
      if (!user) return;

      const { data: business, error } = await supabase
        .from("businesses")
        .select("id")
        .eq("user_id", user.id)
        .single();

      console.log("Business data:", business);
      console.log("Business error:", error);

      if (business) {
        setBusinessId(business.id);
      }
    };

    fetchBusinessId();
  }, []);

  useEffect(() => {
    if (businessId) {
      fetchAvailableTaxYears();
      fetchTaxReportData();
    }
  }, [businessId, selectedTaxYear]);

  const fetchAvailableTaxYears = async () => {
    if (!businessId) return;

    try {
      // Fetch all successful payments for this business
      const { data: allPayments, error } = await supabase
        .from("payments")
        .select(`
          id,
          amount,
          paid_at,
          created_at,
          status,
          currency,
          product_id,
          user_id
        `)
        .eq("business_id", businessId)
        .eq("status", "succeeded")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching payments for tax years:", error);
        return;
      }

      if (allPayments && allPayments.length > 0) {
        // Filter tax years to only include those with transactions
        const allTaxYears = getAvailableTaxYears();
        const yearsWithData = allTaxYears.filter(taxYear => {
          return allPayments.some(payment => {
            const paymentDate = new Date(payment.paid_at || payment.created_at);
            return paymentDate >= taxYear.start && paymentDate <= taxYear.end;
          });
        });

        setAvailableTaxYears(yearsWithData);
        
        // If current tax year has no data, select the most recent year with data
        if (yearsWithData.length > 0 && !yearsWithData.some(year => year.year === selectedTaxYear.year)) {
          setSelectedTaxYear(yearsWithData[0]);
        }
      } else {
        setAvailableTaxYears([]);
      }
    } catch (error) {
      console.error("Error fetching available tax years:", error);
    }
  };

  const fetchTaxReportData = async () => {
    if (!businessId) return;

    setLoading(true);
    try {
      console.log("Fetching payments for business:", businessId);
      console.log("Tax year range:", selectedTaxYear.start.toISOString(), "to", selectedTaxYear.end.toISOString());
      
      // First, let's check if there are any payments at all for this business
      const { data: allPayments, error: allPaymentsError } = await supabase
        .from("payments")
        .select("*")
        .eq("business_id", businessId);
      
      console.log("All payments for business:", allPayments);
      console.log("All payments error:", allPaymentsError);

      // Fetch payments for the selected tax year (without joins first)
      let { data: payments, error } = await supabase
        .from("payments")
        .select(`
          id,
          amount,
          paid_at,
          created_at,
          status,
          currency,
          product_id,
          user_id
        `)
        .eq("business_id", businessId)
        .eq("status", "succeeded")
        .not("paid_at", "is", null)
        .gte("paid_at", selectedTaxYear.start.toISOString())
        .lte("paid_at", selectedTaxYear.end.toISOString())
        .order("paid_at", { ascending: true });

      // If no payments found with paid_at, try with created_at
      if (!payments || payments.length === 0) {
        console.log("No payments found with paid_at, trying created_at");
        const { data: paymentsByCreated, error: createdError } = await supabase
          .from("payments")
          .select(`
            id,
            amount,
            paid_at,
            created_at,
            status,
            currency,
            product_id,
            user_id
          `)
          .eq("business_id", businessId)
          .eq("status", "succeeded")
          .gte("created_at", selectedTaxYear.start.toISOString())
          .lte("created_at", selectedTaxYear.end.toISOString())
          .order("created_at", { ascending: true });
        
        payments = paymentsByCreated;
        error = createdError;
        console.log("Payments by created_at:", payments);
      }

      // If still no payments, try getting all successful payments for this business (no date filter)
      if (!payments || payments.length === 0) {
        console.log("No payments found with date filters, trying all successful payments");
        const { data: allSuccessfulPayments, error: allError } = await supabase
          .from("payments")
          .select(`
            id,
            amount,
            paid_at,
            created_at,
            status,
            currency,
            product_id,
            user_id
          `)
          .eq("business_id", businessId)
          .eq("status", "succeeded")
          .order("created_at", { ascending: true });
        
        payments = allSuccessfulPayments;
        error = allError;
        console.log("All successful payments:", payments);
      }

      // Now fetch product details separately if we have payments
      let enrichedPayments = payments;
      if (payments && payments.length > 0) {
        console.log("Fetching product details for payments");
        const productIds = [...new Set(payments.map(p => p.product_id).filter(Boolean))];
        
        if (productIds.length > 0) {
          const { data: products, error: productsError } = await supabase
            .from("products")
            .select("id, name, price")
            .in("id", productIds);
          
          console.log("Products data:", products);
          console.log("Products error:", productsError);
          
          if (products && !productsError) {
            // Enrich payments with product data
            enrichedPayments = payments.map(payment => ({
              ...payment,
              products: products.find(prod => prod.id === payment.product_id) || null
            }));
          }
        }
      }

      console.log("Filtered payments:", enrichedPayments);
      console.log("Payments error:", error);

      if (error) {
        console.error("Error fetching payments:", error);
        return;
      }

      // Calculate report data
      const totalRevenue = enrichedPayments?.reduce((sum, p) => sum + p.amount, 0) || 0;
      const totalFees = Math.round(totalRevenue * 0.029 + 20 * (enrichedPayments?.length || 0)); // Approximate Stripe fees
      const netIncome = totalRevenue - totalFees;
      const transactionCount = enrichedPayments?.length || 0;
      const averageTransaction = transactionCount > 0 ? totalRevenue / transactionCount : 0;

      // Calculate monthly breakdown
      const monthlyData = getTaxYearMonths(selectedTaxYear).map(month => {
        const monthPayments = enrichedPayments?.filter(p => {
          // Use paid_at if available, otherwise fallback to created_at
          const paymentDate = new Date(p.paid_at || p.created_at);
          return paymentDate.getMonth() === month.date.getMonth() && 
                 paymentDate.getFullYear() === month.date.getFullYear();
        }) || [];

        const monthRevenue = monthPayments.reduce((sum, p) => sum + p.amount, 0);
        const monthFees = Math.round(monthRevenue * 0.029 + 20 * monthPayments.length);
        const monthNetIncome = monthRevenue - monthFees;

        return {
          month: month.name,
          revenue: monthRevenue,
          fees: monthFees,
          netIncome: monthNetIncome,
          transactionCount: monthPayments.length
        };
      });

      // Calculate product breakdown
      const productMap = new Map<string, { revenue: number; count: number; name: string }>();
      enrichedPayments?.forEach(payment => {
        const productId = payment.product_id;
        const productName = payment.products?.name || 'Unknown Product';
        
        if (productMap.has(productId)) {
          const existing = productMap.get(productId)!;
          existing.revenue += payment.amount;
          existing.count += 1;
        } else {
          productMap.set(productId, {
            revenue: payment.amount,
            count: 1,
            name: productName
          });
        }
      });

      const productBreakdown = Array.from(productMap.values()).map(p => ({
        productName: p.name,
        revenue: p.revenue,
        transactionCount: p.count
      }));

      setReportData({
        totalRevenue,
        totalFees,
        netIncome,
        transactionCount,
        averageTransaction,
        monthlyData,
        productBreakdown
      });
    } catch (error) {
      console.error("Error generating tax report:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!reportData) return;

    const csvData = [
      ['Tax Report Export'],
      ['Generated', new Date().toLocaleDateString()],
      [''],
      ['TAX YEAR SUMMARY'],
      ['Tax Year', selectedTaxYear.year],
      ['Period', `${formatDate(selectedTaxYear.start)} - ${formatDate(selectedTaxYear.end)}`],
      ['Total Revenue', formatCurrency(reportData.totalRevenue)],
      ['Total Fees', formatCurrency(reportData.totalFees)],
      ['Net Income', formatCurrency(reportData.netIncome)],
      ['Transaction Count', reportData.transactionCount.toString()],
      ['Average Transaction', formatCurrency(reportData.averageTransaction)],
      [''],
      ['MONTHLY BREAKDOWN'],
      ['Month', 'Revenue', 'Fees', 'Net Income', 'Transactions'],
      ...reportData.monthlyData.map(month => [
        month.month,
        formatCurrency(month.revenue),
        formatCurrency(month.fees),
        formatCurrency(month.netIncome),
        month.transactionCount.toString()
      ]),
      [''],
      ['PRODUCT BREAKDOWN'],
      ['Product', 'Revenue', 'Transactions'],
      ...reportData.productBreakdown.map(product => [
        product.productName,
        formatCurrency(product.revenue),
        product.transactionCount.toString()
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tax-report-${selectedTaxYear.year}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return <LoadingOverlay show message="Generating tax report..." />;
  }

  if (!businessId) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">No Business Found</h1>
        <p className="text-gray-400">Please create a business first to view tax reports.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Tax Reports</h1>
            <p className="text-gray-400">Generate tax reports for your business income</p>
          </div>
          
          <div className="flex gap-4">
            <Select value={selectedTaxYear.year} onValueChange={(value) => {
              const year = availableTaxYears.find(y => y.year === value);
              if (year) setSelectedTaxYear(year);
            }}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableTaxYears.map(year => (
                  <SelectItem key={year.year} value={year.year}>
                    {year.year} ({formatDate(year.start)} - {formatDate(year.end)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button onClick={exportToCSV} className="hero-button-primary">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>Tax Year: {selectedTaxYear.year}</span>
          <Badge variant="outline" className="ml-2">
            {formatDate(selectedTaxYear.start)} - {formatDate(selectedTaxYear.end)}
          </Badge>
        </div>
      </div>

      {reportData && (
        <div className="space-y-8">
          {/* Tax Year Summary */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Tax Year {selectedTaxYear.year} Summary
            </h2>
            <IncomeSummary data={reportData} />
          </div>

          {/* Monthly Breakdown */}
          <MonthlyBreakdown data={reportData.monthlyData} />
        </div>
      )}

      {!reportData && !loading && (
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              {availableTaxYears.length === 0 ? 'No Payment Data Found' : 'No Data for Selected Tax Year'}
            </h3>
            <p className="text-gray-400">
              {availableTaxYears.length === 0 
                ? 'Start selling to see your income reports here. Once you have successful payments, tax reports will be available.'
                : 'No payment data found for the selected tax year. Try selecting a different tax year from the dropdown above.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
