import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Droplets, 
  Sun, 
  Leaf, 
  BarChart3,
  Shield,
  Smartphone
} from "lucide-react";
import heroImage from "@/assets/hero-farming.jpg";

const Home = () => {
  const features = [
    {
      icon: Droplets,
      title: "Soil Monitoring",
      description: "Real-time soil moisture and nutrient tracking for optimal crop health"
    },
    {
      icon: Sun,
      title: "Solar Powered",
      description: "Eco-friendly operation with sustainable solar energy technology"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "AI-powered insights and recommendations for better farming decisions"
    },
    {
      icon: Shield,
      title: "Weather Alerts",
      description: "Proactive notifications for weather changes and potential risks"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Access your farm data anywhere, anytime with our mobile app"
    },
    {
      icon: Leaf,
      title: "Crop Optimization",
      description: "Maximize yield with data-driven farming recommendations"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)'
          }}
        />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-float">
              Your Farming
              <span className="block gradient-hero bg-clip-text text-transparent">
                Companion
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
              Transform your farming with SoilMate's smart IoT sensors, 
              solar-powered monitoring, and AI-driven insights for healthier crops and better yields.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="button-glow text-lg px-8 py-6">
                <Link to="/dashboard">
                  View Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Smart Farming Made Simple
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to monitor, understand, and optimize your crops - 
              designed by farmers, for farmers.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of farmers who are already using SoilMate to 
              increase their yields and reduce water waste.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link to="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;