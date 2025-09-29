import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Droplets, 
  Wifi, 
  Battery,
  Gauge,
  Sun
} from "lucide-react";
import soilmateDevice from "@/assets/soilmate-device.png";

const About = () => {
  const components = [
    {
      icon: Zap,
      title: "Solar Panel",
      description: "High-efficiency solar panel provides sustainable power for continuous operation",
      specs: ["12V Output", "Weather Resistant", "10-year Warranty"]
    },
    {
      icon: Gauge,
      title: "Stainless Steel Sensor Rod",
      description: "Durable probe that measures soil conditions at multiple depths",
      specs: ["Corrosion Resistant", "Multi-depth Sensing", "Easy Installation"]
    },
    {
      icon: Wifi,
      title: "IoT Base Station",
      description: "Smart hub that collects, processes, and transmits all sensor data",
      specs: ["Wi-Fi & Cellular", "Cloud Connectivity", "Real-time Updates"]
    },
    {
      icon: Battery,
      title: "Smart Battery System",
      description: "Long-lasting battery backup ensures 24/7 monitoring capability",
      specs: ["7-day Backup", "Auto Charging", "Low Power Mode"]
    }
  ];

  const benefits = [
    {
      title: "Increase Crop Yield",
      description: "Optimize growing conditions with precise monitoring and timely interventions",
      impact: "Up to 30% increase"
    },
    {
      title: "Reduce Water Waste",
      description: "Smart irrigation recommendations prevent overwatering and conserve resources",
      impact: "Save 40% water"
    },
    {
      title: "Early Problem Detection",
      description: "Get alerts for pest activity, disease risk, and weather threats",
      impact: "Prevent 80% of losses"
    },
    {
      title: "Lower Operating Costs",
      description: "Reduce manual monitoring and optimize resource usage",
      impact: "Cut costs by 25%"
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About SoilMate
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A revolutionary smart farming solution that combines IoT sensors, 
            solar power, and AI analytics to help farmers make data-driven decisions 
            and maximize their crop potential.
          </p>
        </div>

        {/* Product Overview */}
        <section className="mb-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                The Complete Farming Solution
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                SoilMate is more than just a sensor - it's your intelligent farming partner. 
                Our integrated system monitors soil health, weather conditions, and crop needs 
                in real-time, giving you the insights you need to make smart farming decisions.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Sun className="h-5 w-5 text-primary" />
                  <span>100% solar-powered operation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Droplets className="h-5 w-5 text-primary" />
                  <span>Multi-parameter soil monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="h-5 w-5 text-primary" />
                  <span>Real-time cloud connectivity</span>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="h-5 w-5 text-primary" />
                  <span>AI-powered recommendations</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={soilmateDevice} 
                alt="SoilMate Device Components" 
                className="w-full max-w-md mx-auto animate-float rounded-lg shadow-warm"
              />
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            System Components
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {components.map((component, index) => {
              const Icon = component.icon;
              return (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-xl">{component.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{component.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {component.specs.map((spec, specIndex) => (
                        <Badge key={specIndex} variant="secondary">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose SoilMate?
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Card key={index} className="card-hover gradient-subtle">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    <Badge className="bg-primary text-primary-foreground">
                      {benefit.impact}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section>
          <div className="text-center gradient-hero rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">
              Built with Cutting-Edge Technology
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              SoilMate leverages the latest in IoT sensors, machine learning algorithms, 
              and cloud computing to deliver accurate, actionable insights for modern farming.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;