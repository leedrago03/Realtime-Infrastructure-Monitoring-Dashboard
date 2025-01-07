import React from 'react';
import { Container, RefreshCw } from 'lucide-react';
import type { ContainerMetrics } from '../types/metrics';

interface Props {
  containers: ContainerMetrics[];
  loading: boolean;
}

export const ContainerMetricsPanel: React.FC<Props> = ({ containers, loading }) => {
  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading containers...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Container className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold">Container Metrics</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="grid gap-4">
          {containers.map((container) => (
            <div key={container.container_id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{container.name}</h4>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm">{container.restarts} restarts</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">CPU Usage</p>
                  <p className="font-medium">{container.cpu_usage.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Memory Usage</p>
                  <p className="font-medium">{container.memory_usage} MB</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};