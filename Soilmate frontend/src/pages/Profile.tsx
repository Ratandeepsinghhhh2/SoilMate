import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  MapPin, 
  Calendar, 
  Leaf, 
  BarChart3,
  Award,
  Edit,
  Phone,
  Mail
} from "lucide-react";
import farmerProfile from "@/assets/farmer-profile.jpg";

const Profile = () => {
  const farmerData = {
    name: "Maria Santos",
    location: "San Juan Valley, Philippines",
    phone: "+63 912 345 6789",
    email: "maria.santos@email.com",
    joinDate: "March 2023",
    farmSize: "15 hectares",
    crops: [
      { name: "Rice", area: "8 hectares", status: "Growing", health: 85 },
      { name: "Corn", area: "4 hectares", status: "Harvesting", health: 92 },
      { name: "Vegetables", area: "3 hectares", status: "Planted", health: 78 }
    ],
    achievements: [
      { title: "Water Saver", description: "Reduced water usage by 35%" },
      { title: "High Yield", description: "Achieved 120% of expected yield" },
      { title: "Early Adopter", description: "First farmer in region to use IoT" }
    ],
    recentAlerts: [
      { date: "Today", message: "Optimal soil moisture in Rice Field A", type: "success" },
      { date: "Yesterday", message: "Low nutrients detected in Corn Field B", type: "warning" },
      { date: "2 days ago", message: "Perfect growing conditions", type: "success" },
      { date: "3 days ago", message: "Weather alert: Heavy rain expected", type: "info" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "growing": return "bg-primary";
      case "harvesting": return "bg-success";
      case "planted": return "bg-accent";
      default: return "bg-secondary";
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "success": return "border-success bg-success/10";
      case "warning": return "border-warning bg-warning/10";
      case "info": return "border-primary bg-primary/10";
      default: return "border-muted bg-muted/10";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Farmer Profile</h1>
          <p className="text-muted-foreground">Manage your farming information and track your progress</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="card-hover">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-warm">
                  <img 
                    src={farmerProfile} 
                    alt="Farmer Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-2xl">{farmerData.name}</CardTitle>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{farmerData.location}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{farmerData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{farmerData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Member since {farmerData.joinDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Leaf className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Farm size: {farmerData.farmSize}</span>
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="card-hover mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {farmerData.achievements.map((achievement, index) => (
                  <div key={index} className="p-3 rounded-lg gradient-subtle border">
                    <h4 className="font-semibold text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Crops Overview */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  My Crops
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-1">
                  {farmerData.crops.map((crop, index) => (
                    <div key={index} className="p-4 rounded-lg border gradient-subtle">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{crop.name}</h3>
                          <p className="text-sm text-muted-foreground">{crop.area}</p>
                        </div>
                        <Badge className={getStatusColor(crop.status)}>
                          {crop.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Crop Health</span>
                          <span className="font-medium">{crop.health}%</span>
                        </div>
                        <Progress value={crop.health} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Recent Alerts & Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {farmerData.recentAlerts.map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">{alert.message}</p>
                        <span className="text-xs text-muted-foreground">{alert.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Farm Statistics */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Farm Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 rounded-lg gradient-subtle">
                    <div className="text-2xl font-bold text-primary">1,247</div>
                    <div className="text-sm text-muted-foreground">Data Points Collected</div>
                  </div>
                  <div className="text-center p-4 rounded-lg gradient-subtle">
                    <div className="text-2xl font-bold text-success">35%</div>
                    <div className="text-sm text-muted-foreground">Water Saved</div>
                  </div>
                  <div className="text-center p-4 rounded-lg gradient-subtle">
                    <div className="text-2xl font-bold text-accent">92%</div>
                    <div className="text-sm text-muted-foreground">System Uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;