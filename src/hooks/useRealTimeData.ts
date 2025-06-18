import { useState, useEffect, useRef } from 'react';
import { MetricData } from '../types/dashboard';

export const useRealTimeData = (initialData: MetricData[], interval: number = 30000) => {
  const [data, setData] = useState<MetricData[]>(initialData);
  const [isConnected, setIsConnected] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    const startRealTimeUpdates = () => {
      setIsConnected(true);
      
      intervalRef.current = setInterval(() => {
        setData(prevData => 
          prevData.map(metric => ({
            ...metric,
            value: typeof metric.value === 'number' 
              ? metric.value + Math.floor(Math.random() * 10) - 5
              : metric.value,
            change: metric.change + (Math.random() - 0.5) * 2,
            trend: metric.trend ? [
              ...metric.trend.slice(1),
              metric.trend[metric.trend.length - 1] + Math.floor(Math.random() * 10) - 5
            ] : undefined
          }))
        );
      }, interval);
    };

    const stopRealTimeUpdates = () => {
      setIsConnected(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    startRealTimeUpdates();

    return () => {
      stopRealTimeUpdates();
    };
  }, [interval]);

  const toggleRealTime = () => {
    if (isConnected) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsConnected(false);
    } else {
      intervalRef.current = setInterval(() => {
        setData(prevData => 
          prevData.map(metric => ({
            ...metric,
            value: typeof metric.value === 'number' 
              ? metric.value + Math.floor(Math.random() * 10) - 5
              : metric.value,
            change: metric.change + (Math.random() - 0.5) * 2
          }))
        );
      }, interval);
      setIsConnected(true);
    }
  };

  return {
    data,
    isConnected,
    toggleRealTime
  };
};