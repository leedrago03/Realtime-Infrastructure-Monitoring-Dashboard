export interface SystemMetrics {
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  network_traffic: {
    incoming: number;
    outgoing: number;
  };
  disk_io: {
    read: number;
    write: number;
  };
  disk_space: {
    total: number;
    used: number;
    free: number;
  };
}

export interface ContainerMetrics {
  container_id: string;
  name: string;
  cpu_usage: number;
  memory_usage: number;
  restarts: number;
  status: string;
}