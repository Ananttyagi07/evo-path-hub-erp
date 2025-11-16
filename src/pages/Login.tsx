import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GraduationCap, Shield, UserCircle, Settings } from "lucide-react";
import { toast } from "sonner";

type Role = "superadmin" | "admin" | "teacher" | "student";

const roleConfig = {
  superadmin: {
    icon: Shield,
    title: "Super Admin",
    description: "Full system access",
    gradient: "from-purple-500 to-pink-600",
  },
  admin: {
    icon: Settings,
    title: "Admin",
    description: "Manage school operations",
    gradient: "from-blue-500 to-cyan-600",
  },
  teacher: {
    icon: UserCircle,
    title: "Teacher",
    description: "Monitor student progress",
    gradient: "from-green-500 to-emerald-600",
  },
  student: {
    icon: GraduationCap,
    title: "Student",
    description: "Learn and grow",
    gradient: "from-orange-500 to-amber-600",
  },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const navigate = useNavigate();

  const handleQuickLogin = (role: Role) => {
    setSelectedRole(role);
    toast.success(`Logging in as ${roleConfig[role].title}`);
    
    // Store role in sessionStorage
    sessionStorage.setItem("userRole", role);
    
    // Navigate to appropriate dashboard
    setTimeout(() => {
      navigate(`/${role}/dashboard`);
    }, 500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    toast.success(`Welcome back, ${roleConfig[selectedRole].title}!`);
    sessionStorage.setItem("userRole", selectedRole);
    
    setTimeout(() => {
      navigate(`/${selectedRole}/dashboard`);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            SkillForge Academy
          </h1>
          <p className="text-muted-foreground text-lg">
            Empowering IT Skills Development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Quick Login Cards */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Quick Login</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(roleConfig).map(([role, config]) => {
                const Icon = config.icon;
                return (
                  <Card
                    key={role}
                    className="cursor-pointer transition-all hover:scale-105 hover:shadow-xl border-2"
                    onClick={() => handleQuickLogin(role as Role)}
                  >
                    <CardContent className="p-6 text-center space-y-3">
                      <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{config.title}</h3>
                        <p className="text-sm text-muted-foreground">{config.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Select Role</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(roleConfig).map(([role, config]) => (
                      <Button
                        key={role}
                        type="button"
                        variant={selectedRole === role ? "default" : "outline"}
                        className="h-auto py-3"
                        onClick={() => setSelectedRole(role as Role)}
                      >
                        {config.title}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 text-base font-semibold">
                  Sign In
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <a href="#" className="text-primary hover:underline font-semibold">
                    Contact Admin
                  </a>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
