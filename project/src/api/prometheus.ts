import axios from 'axios';
import type { SystemMetrics, ContainerMetrics } from '../types/metrics';
import { PROMETHEUS_URL, USE_MOCK_DATA } from '../utils/constants';
import { mockSystemMetrics, mockContainerMetrics } from '../utils/mockData';

const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to fetch metrics from Prometheus'
    );
  }
  throw error;
};

export const fetchSystemMetrics = async (): Promise<SystemMetrics> => {
  if (USE_MOCK_DATA) {
    return Promise.resolve(mockSystemMetrics);
  }

  try {
    const [cpuResponse, memoryResponse, diskResponse, networkResponse] = await Promise.all([
      axios.get(`${PROMETHEUS_URL}/api/v1/query?query=node_cpu_seconds_total{mode="idle"}`),
      axios.get(`${PROMETHEUS_URL}/api/v1/query?query=node_memory_MemTotal_bytes`),
      axios.get(`${PROMETHEUS_URL}/api/v1/query?query=node_filesystem_size_bytes`),
      axios.get(`${PROMETHEUS_URL}/api/v1/query?query=node_network_receive_bytes_total`)
    ]);

    return {
      cpu_usage: 100 - (Number(cpuResponse.data.data.result[0]?.value[1]) || 0) * 100,
      memory_usage: Number(memoryResponse.data.data.result[0]?.value[1]) || 0,
      disk_usage: Number(diskResponse.data.data.result[0]?.value[1]) || 0,
      network_traffic: {
        incoming: Number(networkResponse.data.data.result[0]?.value[1]) || 0,
        outgoing: 0
      },
      disk_io: {
        read: 0,
        write: 0
      },
      disk_space: {
        total: Number(diskResponse.data.data.result[0]?.value[1]) || 0,
        used: 0,
        free: 0
      }
    };
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const fetchContainerMetrics = async (): Promise<ContainerMetrics[]> => {
  if (USE_MOCK_DATA) {
    return Promise.resolve(mockContainerMetrics);
  }

  try {
    const response = await axios.get(
      `${PROMETHEUS_URL}/api/v1/query?query=container_cpu_usage_seconds_total`
    );

    return response.data.data.result.map((container: any) => ({
      container_id: container.metric.id || 'unknown',
      name: container.metric.name || 'unnamed',
      cpu_usage: Number(container.value[1]) || 0,
      memory_usage: 0,
      restarts: 0,
      status: 'unknown'
    }));
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};