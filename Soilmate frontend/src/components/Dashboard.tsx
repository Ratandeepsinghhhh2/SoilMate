import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  Sun, 
  Thermometer, 
  Leaf, 
  AlertTriangle,
  TrendingUp,
  Calendar
} from "lucide-react";

interface SensorData {
  soilMoisture: number;
  sunlight: number;
  temperature: number;
  humidity: number;
  pH: number;
  nutrients: number;
}

const Dashboard = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    soilMoisture: 45,
    sunlight: 78,
    temperature: 24,
    humidity: 62,
    pH: 6.8,
    nutrients: 73,
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        soilMoisture: Math.max(20, Math.min(90, prev.soilMoisture + (Math.random() - 0.5) * 5)),
        sunlight: Math.max(30, Math.min(100, prev.sunlight + (Math.random() - 0.5) * 8)),
        temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(40, Math.min(80, prev.humidity + (Math.random() - 0.5) * 4)),
        pH: Math.max(5.5, Math.min(8.0, prev.pH + (Math.random() - 0.5) * 0.2)),
        nutrients: Math.max(50, Math.min(100, prev.nutrients + (Math.random() - 0.5) * 3)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, optimal: { min: number; max: number }) => {
    if (value >= optimal.min && value <= optimal.max) return "success";
    if (value < optimal.min * 0.8 || value > optimal.max * 1.2) return "destructive";
    return "warning";
  };

  const getStatusText = (value: number, optimal: { min: number; max: number }) => {
    if (value >= optimal.min && value <= optimal.max) return "Optimal";
    if (value < optimal.min) return "Low";
    return "High";
  };

  const SensorCard = ({ 
    title, 
    value, 
    unit, 
    icon: Icon, 
    optimal, 
    showProgress = true 
  }: {
    title: string;
    value: number;
    unit: string;
    icon: React.ComponentType<any>;
    optimal: { min: number; max: number };
    showProgress?: boolean;
  }) => {
    const status = getStatusColor(value, optimal);
    const statusText = getStatusText(value, optimal);
    const percentage = showProgress ? Math.min(100, (value / optimal.max) * 100) : 0;

    return (
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-bold">
              {typeof value === 'number' ? value.toFixed(1) : value}{unit}
            </div>
            <Badge variant={status === "success" ? "default" : "secondary"} 
                   className={status === "success" ? "bg-success" : 
                             status === "warning" ? "bg-warning" : "bg-destructive"}>
              {statusText}
            </Badge>
          </div>
          {showProgress && (
            <div className="space-y-1">
              <Progress 
                value={percentage} 
                className="w-full h-2"
              />
              <p className="text-xs text-muted-foreground">
                Optimal: {optimal.min}-{optimal.max}{unit}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Real-time sensor data */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SensorCard
          title="Soil Moisture"
          value={sensorData.soilMoisture}
          unit="%"
          icon={Droplets}
          optimal={{ min: 40, max: 70 }}
        />
        
        <SensorCard
          title="Sunlight"
          value={sensorData.sunlight}
          unit="%"
          icon={Sun}
          optimal={{ min: 60, max: 90 }}
        />
        
        <SensorCard
          title="Temperature"
          value={sensorData.temperature}
          unit="°C"
          icon={Thermometer}
          optimal={{ min: 20, max: 28 }}
        />
        
        <SensorCard
          title="Humidity"
          value={sensorData.humidity}
          unit="%"
          icon={Droplets}
          optimal={{ min: 50, max: 70 }}
        />
        
        <SensorCard
          title="Soil pH"
          value={sensorData.pH}
          unit=""
          icon={Leaf}
          optimal={{ min: 6.0, max: 7.5 }}
          showProgress={false}
        />
        
        <SensorCard
          title="Nutrients"
          value={sensorData.nutrients}
          unit="%"
          icon={TrendingUp}
          optimal={{ min: 60, max: 90 }}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Today's Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sensorData.soilMoisture < 40 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning">
                <Droplets className="h-5 w-5 text-warning" />
                <span>Consider watering your crops - soil moisture is below optimal levels</span>
              </div>
            )}
            {sensorData.nutrients < 60 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 border border-accent">
                <Leaf className="h-5 w-5 text-accent-foreground" />
                <span>Time to add fertilizer - nutrient levels are getting low</span>
              </div>
            )}
            {sensorData.soilMoisture >= 40 && sensorData.nutrients >= 60 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success">
                <TrendingUp className="h-5 w-5 text-success" />
                <span>Great! Your crops are in optimal growing conditions</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;