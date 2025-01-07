import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Cpu, HardDrive, Network } from 'lucide-react';
import type { SystemMetrics } from '../types/metrics';

interface Props {
  metrics: SystemMetrics | null;
  loading: boolean;
}

export const SystemMetricsPanel: React.FC<Props> = ({ metrics, loading }) => {
  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading metrics...</div>;
  }

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Unable to load metrics. Please try again later.
      </div>
    );
  }

  const chartData = [{ name: 'Current', value: metrics.cpu_usage }];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* CPU Usage */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">CPU Usage</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Memory Usage */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold">Memory Usage</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={[{ name: 'Current', value: metrics.memory_usage }]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};