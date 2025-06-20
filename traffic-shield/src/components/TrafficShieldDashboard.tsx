import React, { useState, useEffect } from 'react';
import { Shield, Activity, AlertTriangle, Eye, EyeOff, Cpu, Globe, Lock, Unlock, TrendingUp, MapPin, Clock, Zap } from 'lucide-react';

// Type definitions

type TrafficData = {
  id: number;
  deviceId: string;
  timestamp: string;
  vehicleCount: number;
  avgSpeed: number;
  lightStatus: string;
  anomalyScore: number;
};

type BlockchainData = {
  id: number;
  blockHash: string;
  timestamp: string;
  deviceId: string;
  dataHash: string;
  verified: boolean;
};

type Alert = {
  id: number;
  type: string;
  severity: string;
  message: string;
  timestamp: string;
  resolved: boolean;
};

const TrafficShieldDashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState('TL-001');
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [blockchainData, setBlockchainData] = useState<BlockchainData[]>([]);

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate mock traffic data
      const newTrafficData = {
        id: Date.now(),
        deviceId: selectedDevice,
        timestamp: new Date().toLocaleTimeString(),
        vehicleCount: Math.floor(Math.random() * 50) + 10,
        avgSpeed: Math.floor(Math.random() * 30) + 25,
        lightStatus: ['RED', 'YELLOW', 'GREEN'][Math.floor(Math.random() * 3)],
        anomalyScore: Math.random() * 100
      };

      setTrafficData(prev => [newTrafficData, ...prev.slice(0, 9)]);

      // Generate blockchain transaction
      if (Math.random() > 0.7) {
        const blockData = {
          id: Date.now(),
          blockHash: `0x${Math.random().toString(16).substr(2, 8)}`,
          timestamp: new Date().toLocaleTimeString(),
          deviceId: selectedDevice,
          dataHash: `0x${Math.random().toString(16).substr(2, 16)}`,
          verified: true
        };
        setBlockchainData(prev => [blockData, ...prev.slice(0, 4)]);
      }

      // Generate alerts for anomalies
      if (newTrafficData.anomalyScore > 85) {
        const alert = {
          id: Date.now(),
          type: 'ANOMALY',
          severity: newTrafficData.anomalyScore > 95 ? 'HIGH' : 'MEDIUM',
          message: `Unusual traffic pattern detected at ${selectedDevice}`,
          timestamp: new Date().toLocaleTimeString(),
          resolved: false
        };
        setAlerts(prev => [alert, ...prev.slice(0, 4)]);
      }
    }, 3000);

    setIsConnected(true);
    return () => clearInterval(interval);
  }, [selectedDevice]);

  const devices = [
    { id: 'TL-001', name: 'Main St & 1st Ave', status: 'active' },
    { id: 'TL-002', name: 'Oak St & 2nd Ave', status: 'active' },
    { id: 'TL-003', name: 'Pine St & 3rd Ave', status: 'maintenance' },
    { id: 'TL-004', name: 'Elm St & 4th Ave', status: 'active' }
  ];

  const resolveAlert = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'HIGH': return 'bg-red-100 text-red-800 border-red-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLightColor = (status: string) => {
    switch (status) {
      case 'RED': return 'bg-red-500';
      case 'YELLOW': return 'bg-yellow-500';
      case 'GREEN': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  TrafficShield
                </h1>
                <p className="text-sm text-gray-400">Smart City Traffic Security</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                <span className="text-sm">{isConnected ? 'Connected' : 'Disconnected'}</span>
              </div>
              
              <button
                onClick={() => setPrivacyMode(!privacyMode)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  privacyMode 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                {privacyMode ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                <span className="text-sm">Privacy {privacyMode ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Device Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                Traffic Lights
              </h3>
              <div className="space-y-3">
                {devices.map(device => (
                  <button
                    key={device.id}
                    onClick={() => setSelectedDevice(device.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedDevice === device.id 
                        ? 'bg-blue-500/30 border border-blue-400/50' 
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{device.id}</p>
                        <p className="text-sm text-gray-400">{device.name}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(device.status)}`}>
                        {device.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Alerts Panel */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-400" />
                Security Alerts
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {alerts.length === 0 ? (
                  <p className="text-gray-400 text-sm">No active alerts</p>
                ) : (
                  alerts.map(alert => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)} ${
                        alert.resolved ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{alert.message}</p>
                          <p className="text-xs opacity-70">{alert.timestamp}</p>
                        </div>
                        {!alert.resolved && (
                          <button
                            onClick={() => resolveAlert(alert.id)}
                            className="text-xs px-2 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main Dashboard */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm">Active Devices</p>
                    <p className="text-2xl font-bold">
                      {devices.filter(d => d.status === 'active').length}
                    </p>
                  </div>
                  <Cpu className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm">Blockchain Logs</p>
                    <p className="text-2xl font-bold">{blockchainData.length}</p>
                  </div>
                  <Globe className="w-8 h-8 text-green-400" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-6 border border-orange-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-300 text-sm">Active Alerts</p>
                    <p className="text-2xl font-bold">
                      {alerts.filter(a => !a.resolved).length}
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-orange-400" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm">AI Detections</p>
                    <p className="text-2xl font-bold">
                      {alerts.filter(a => a.type === 'ANOMALY').length}
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Real-time Traffic Data */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-400" />
                Real-time Traffic Data - {selectedDevice}
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4">Time</th>
                      <th className="text-left py-3 px-4">Vehicles</th>
                      <th className="text-left py-3 px-4">Avg Speed</th>
                      <th className="text-left py-3 px-4">Light Status</th>
                      <th className="text-left py-3 px-4">Anomaly Score</th>
                      <th className="text-left py-3 px-4">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trafficData.map(data => (
                      <tr key={data.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-3 px-4 flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          {data.timestamp}
                        </td>
                        <td className="py-3 px-4">{data.vehicleCount}</td>
                        <td className="py-3 px-4">{data.avgSpeed} mph</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${getLightColor(data.lightStatus)}`}></div>
                            <span>{data.lightStatus}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all ${
                                  data.anomalyScore > 85 ? 'bg-red-500' : 
                                  data.anomalyScore > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${data.anomalyScore}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{Math.round(data.anomalyScore)}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300">
                            {privacyMode ? (
                              <>
                                <EyeOff className="w-4 h-4" />
                                <span className="text-xs">Encrypted</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4" />
                                <span className="text-xs">View Raw</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Blockchain Logs */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-blue-400" />
                Blockchain Transaction Logs
              </h3>
              
              <div className="space-y-4">
                {blockchainData.map(block => (
                  <div key={block.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Block Hash</p>
                        <p className="font-mono text-sm text-blue-300">{block.blockHash}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Device ID</p>
                        <p className="font-semibold">{block.deviceId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Timestamp</p>
                        <p>{block.timestamp}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-green-400 text-sm">Verified</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-sm text-gray-400">Data Hash</p>
                      <p className="font-mono text-xs text-gray-300">{block.dataHash}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficShieldDashboard;