export interface TrafficData {
    id: number;
    deviceId: string;
    timestamp: string;
    vehicleCount: number;
    avgSpeed: number;
    lightStatus: 'RED' | 'YELLOW' | 'GREEN';
    anomalyScore: number;
  }
  
  export interface BlockchainData {
    id: number;
    blockHash: string;
    timestamp: string;
    deviceId: string;
    dataHash: string;
    verified: boolean;
  }
  
  export interface Alert {
    id: number;
    type: string;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    message: string;
    timestamp: string;
    resolved: boolean;
  }
  
  export interface Device {
    id: string;
    name: string;
    status: 'active' | 'maintenance' | 'inactive';
  }