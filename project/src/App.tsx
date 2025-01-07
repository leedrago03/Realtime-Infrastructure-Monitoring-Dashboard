import React, { useState, useEffect } from 'react';
import { SystemMetricsPanel } from './components/SystemMetrics';
import { ContainerMetricsPanel } from './components/ContainerMetrics';
import { fetchSystemMetrics, fetchContainerMetrics } from './api/prometheus';
import { Activity, Box, AlertCircle } from 'lucide-react';
import type { SystemMetrics } from './types/metrics';
import type { ContainerMetrics } from './types/metrics';

function App() {
  const [activeTab, setActiveTab] = useState('system');
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null);
  const [containerMetrics, setContainerMetrics] = useState<ContainerMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError(null);
        const [sysMetrics, contMetrics] = await Promise.all([
          fetchSystemMetrics(),
          fetchContainerMetrics()
        ]);
        setSystemMetrics(sysMetrics);
        setContainerMetrics(contMetrics);
      } catch (err) {
        setError('Failed to fetch metrics. Please check your Prometheus connection.');
        console.error('Error fetching metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Activity className="w-8 h-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold">Infrastructure Monitor</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('system')}
                className={`${
                  activeTab === 'system'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Activity className="w-5 h-5 mr-2" />
                System Metrics
              </button>
              <button
                onClick={() => setActiveTab('containers')}
                className={`${
                  activeTab === 'containers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Box className="w-5 h-5 mr-2" />
                Container Metrics
              </button>
            </nav>
          </div>
        </div>

        <div className="space-y-8">
          {activeTab === 'system' && (
            <SystemMetricsPanel metrics={systemMetrics} loading={loading} />
          )}
          {activeTab === 'containers' && (
            <ContainerMetricsPanel containers={containerMetrics} loading={loading} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;