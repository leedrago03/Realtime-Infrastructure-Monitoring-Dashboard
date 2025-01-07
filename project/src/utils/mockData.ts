import type { SystemMetrics, ContainerMetrics } from '../types/metrics';

export const mockSystemMetrics: SystemMetrics = {
  cpu_usage: 45.5,
  memory_usage: 8589934592, // 8GB in bytes
  disk_usage: 107374182400, // 100GB in bytes
  network_traffic: {
    incoming: 1048576, // 1MB/s
    outgoing: 524288, // 512KB/s
  },
  disk_io: {
    read: 10485760, // 10MB/s
    write: 5242880, // 5MB/s
  },
  disk_space: {
    total: 1099511627776, // 1TB in bytes
    used: 549755813888, // 512GB in bytes
    free: 549755813888, // 512GB in bytes
  },
};

export const mockContainerMetrics: ContainerMetrics[] = [
  {
    container_id: 'mock-container-1',
    name: 'web-server',
    cpu_usage: 25.5,
    memory_usage: 1073741824, // 1GB in bytes
    restarts: 0,
    status: 'running',
  },
  {
    container_id: 'mock-container-2',
    name: 'database',
    cpu_usage: 35.2,
    memory_usage: 2147483648, // 2GB in bytes
    restarts: 1,
    status: 'running',
  },
];