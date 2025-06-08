'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase/client';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ComplaintChartProps {
  complaintId: string;
}

const ComplaintChart: React.FC<ComplaintChartProps> = ({ complaintId }) => {
  const [series, setSeries] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProgressLogs = async () => {
      const { data, error } = await supabase
        .from('complaint_progress_logs')
        .select('pain_level, mobility_level, strength_level, created_at')
        .eq('complaint_id', complaintId)
        .order('created_at', { ascending: true });

      if (data) {
        setCategories(data.map(entry => new Date(entry.created_at).toLocaleDateString()));
        setSeries([
          {
            name: 'Pain',
            data: data.map(entry => entry.pain_level),
            color: '#7E3BF2'
          },
          {
            name: 'Mobility',
            data: data.map(entry => entry.mobility_level),
            color: '#00adb4'
          },
          {
            name: 'Strength',
            data: data.map(entry => entry.strength_level),
            color: '#1A56DB'
          }
        ]);
      }
    };

    fetchProgressLogs();
  }, [complaintId]);

  const options: ApexOptions = {
    chart: {
      height: 400,
      type: 'line',
      fontFamily: 'Inter, sans-serif',
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 350 }
      }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 4
    },
    markers: {
      size: 5,
      hover: { size: 7 },
      colors: ['#7E3BF2', '#00adb4', '#1A56DB'],
      strokeColors: '#fff',
      strokeWidth: 2
    },
    grid: { show: false, strokeDashArray: 4 },
    tooltip: {
      enabled: true,
      theme: 'dark',
      x: { show: true },
      y: {
        formatter: (val: number) => val.toFixed(1),
        title: {
          formatter: (seriesName: string) => `${seriesName}:`
        }
      }
    },
    xaxis: {
      categories,
      labels: { show: false },
    },
    yaxis: {
      min: 0,
      max: 10,
      tickAmount: 5,
      labels: { show: false },
    },
    legend: {
      show: true,
      labels: {
        colors: '#ffffff',
        useSeriesColors: false
      }
    },
  };

  return (
    <div className="w-full">
      <ReactApexChart options={options} series={series} type="line" height={300} />
    </div>
  );
};

export default ComplaintChart;
