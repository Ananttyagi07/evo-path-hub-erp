import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  User,
  Users,
  FileText,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "superadmin" | "admin" | "teacher" | "student";
}

const navigationConfig = {
  student: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/student/dashboard" },
    { icon: BookOpen, label: "My Courses", path: "/student/courses" },
    { icon: Trophy, label: "Leaderboard", path: "/student/leaderboard" },
    { icon: User, label: "Profile", path: "/student/profile" },
  ],
  teacher: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/teacher/dashboard" },
    { icon: Users, label: "Students", path: "/teacher/students" },
    { icon: FileText, label: "Manage Content", path: "/teacher/content" },
    { icon: User, label: "Profile", path: "/teacher/profile" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: BookOpen, label: "Courses", path: "/admin/courses" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ],
  superadmin: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/superadmin/dashboard" },
    { icon: Users, label: "All Users", path: "/superadmin/users" },
    { icon: Settings, label: "System Settings", path: "/superadmin/settings" },
    { icon: FileText, label: "Logs", path: "/superadmin/logs" },
  ],
};

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = navigationConfig[role];

  const handleLogout = () => {
    sessionStorage.removeItem("userRole");
    navigate("/");
  };

  const getRoleDisplay = () => {
    return role.charAt(0).toUpperCase() + role.slice(1).replace("admin", " Admin");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">SkillForge Academy</h1>
              <p className="text-xs text-muted-foreground">{getRoleDisplay()} Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card/30 min-h-[calc(100vh-4rem)] p-4 hidden md:block">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-secondary/80"
                  activeClassName="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
