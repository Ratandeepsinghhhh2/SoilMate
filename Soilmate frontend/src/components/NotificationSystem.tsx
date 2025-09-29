import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Droplets, 
  Sun, 
  Bug, 
  Leaf,
  X
} from "lucide-react";

interface Notification {
  id: string;
  type: "warning" | "success" | "info" | "danger";
  icon: React.ComponentType<any>;
  title: string;
  message: string;
  timestamp: Date;
}

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Simulate real-time notifications
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "warning",
        icon: Droplets,
        title: "Low Soil Moisture",
        message: "Field A needs watering. Moisture level: 25%",
        timestamp: new Date(),
      },
      {
        id: "2",
        type: "success",
        icon: Sun,
        title: "Optimal Sunlight",
        message: "Great growing conditions detected!",
        timestamp: new Date(Date.now() - 300000),
      },
      {
        id: "3",
        type: "danger",
        icon: Bug,
        title: "Pest Alert",
        message: "Unusual activity detected in Field B",
        timestamp: new Date(Date.now() - 600000),
      },
    ];

    setNotifications(mockNotifications);

    // Simulate new notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: Math.random() > 0.5 ? "info" : "warning",
          icon: Math.random() > 0.5 ? Leaf : Droplets,
          title: Math.random() > 0.5 ? "Growth Update" : "Water Reminder",
          message: Math.random() > 0.5 
            ? "Your crops are thriving!" 
            : "Consider checking irrigation system",
          timestamp: new Date(),
        };
        setNotifications(prev => [newNotification, ...prev].slice(0, 5));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case "warning": return "default";
      case "danger": return "destructive";
      case "success": return "default";
      default: return "default";
    }
  };

  const getAlertClass = (type: string) => {
    switch (type) {
      case "warning": return "border-warning bg-warning/10 text-foreground";
      case "danger": return "border-destructive bg-destructive/10 text-foreground";
      case "success": return "border-success bg-success/10 text-foreground";
      default: return "border-primary bg-primary/10 text-foreground";
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-40 space-y-2 w-80 max-w-[calc(100vw-2rem)]">
      {notifications.map((notification) => {
        const Icon = notification.icon;
        return (
          <Alert
            key={notification.id}
            variant={getAlertVariant(notification.type)}
            className={`${getAlertClass(notification.type)} animate-float shadow-warm`}
          >
            <Icon className="h-4 w-4 text-foreground" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground">{notification.title}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeNotification(notification.id)}
                  className="h-6 w-6 p-0 hover:bg-background/50 text-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <AlertDescription className="mt-1 text-foreground">
                {notification.message}
              </AlertDescription>
              <p className="text-xs text-foreground/70 mt-1">
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </Alert>
        );
      })}
    </div>
  );
};

export default NotificationSystem;