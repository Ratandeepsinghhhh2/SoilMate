import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageCircle,
  Clock,
  Users
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Get immediate help from our farming experts",
      contact: "+63 2 8123 4567",
      hours: "Mon-Fri, 8AM-6PM PHT"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions or feedback",
      contact: "support@soilmate.ph",
      hours: "Response within 24 hours"
    },
    {
      icon: MapPin,
      title: "Regional Office",
      description: "Visit our agricultural technology center",
      contact: "123 Agriculture Drive, Quezon City",
      hours: "Mon-Fri, 9AM-5PM PHT"
    }
  ];

  const supportTypes = [
    {
      icon: MessageCircle,
      title: "Technical Support",
      description: "Device setup, troubleshooting, and technical issues"
    },
    {
      icon: Users,
      title: "Farming Consultation",
      description: "Agricultural advice and best practices guidance"
    },
    {
      icon: Clock,
      title: "Emergency Support",
      description: "Critical alerts and urgent farming issues"
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact & Support</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Need help with SoilMate? Our team of farming and technology experts 
            is here to support you every step of the way.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+63 912 345 6789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your question or issue in detail..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button type="submit" className="w-full button-glow">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{info.description}</p>
                          <p className="font-medium">{info.contact}</p>
                          <p className="text-sm text-muted-foreground">{info.hours}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Support Types */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>How We Can Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportTypes.map((support, index) => {
                  const Icon = support.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">{support.title}</h4>
                        <p className="text-sm text-muted-foreground">{support.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Emergency Notice */}
            <Card className="border-warning bg-warning/10">
              <CardContent className="p-6">
                <h3 className="font-semibold text-warning-foreground mb-2">Emergency Support</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For critical farming emergencies or device failures affecting your crops, 
                  please call our 24/7 emergency hotline:
                </p>
                <p className="font-bold text-lg">+63 917 SOIL-HELP</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Available 24/7 for urgent agricultural situations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;