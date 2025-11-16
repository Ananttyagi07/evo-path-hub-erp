import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GraduationCap, ArrowRight, BookOpen, Users, TrendingUp, Award } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl">SkillForge Academy</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button onClick={() => navigate("/login")}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Transform Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                IT Skills
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive learning platform for students, teachers, and administrators to track, manage, and excel in technology education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => navigate("/login")}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Everything You Need to Excel
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Comprehensive Courses",
                description: "Access courses across Cloud, AI/ML, DevOps, and Full Stack development",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: TrendingUp,
                title: "Progress Tracking",
                description: "Monitor your learning journey with detailed analytics and insights",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: Users,
                title: "Role-Based Access",
                description: "Tailored experiences for students, teachers, admins, and super admins",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Award,
                title: "Achievements",
                description: "Earn certificates and compete on leaderboards as you progress",
                gradient: "from-orange-500 to-amber-500",
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-card p-8 rounded-2xl border-2 hover:border-primary/50 transition-all hover:scale-105">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-primary rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students already transforming their IT careers
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={() => navigate("/login")}
            >
              Sign In Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 SkillForge Academy. Empowering IT Skills Development.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
