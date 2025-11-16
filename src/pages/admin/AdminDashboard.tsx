import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Settings,
  UserPlus,
  FileText,
  BarChart3,
  Shield,
} from "lucide-react";

const systemStats = [
  { label: "Total Users", value: "1,245", change: "+12%", icon: Users, color: "from-blue-500 to-cyan-500" },
  { label: "Active Courses", value: "86", change: "+5%", icon: BookOpen, color: "from-purple-500 to-pink-500" },
  { label: "Completion Rate", value: "78%", change: "+8%", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
  { label: "System Health", value: "98%", change: "+2%", icon: Shield, color: "from-orange-500 to-amber-500" },
];

const userBreakdown = [
  { role: "Students", count: 1089, percentage: 87.5, color: "bg-blue-500" },
  { role: "Teachers", count: 134, percentage: 10.8, color: "bg-green-500" },
  { role: "Admins", count: 21, percentage: 1.7, color: "bg-purple-500" },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
            <p className="text-muted-foreground">
              Manage users, courses, and system settings
            </p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4">
          {systemStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-success font-semibold">{stat.change} from last month</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* User Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Breakdown of users by role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userBreakdown.map((item) => (
                <div key={item.role} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.role}</span>
                    <span className="text-sm text-muted-foreground">{item.count} users ({item.percentage}%)</span>
                  </div>
                  <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
              <CardDescription>Recent system events and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                <div>
                  <p className="font-medium">New user registration</p>
                  <p className="text-sm text-muted-foreground">45 new students joined today</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <div>
                  <p className="font-medium">Course completion</p>
                  <p className="text-sm text-muted-foreground">128 courses completed this week</p>
                  <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                <div>
                  <p className="font-medium">System update</p>
                  <p className="text-sm text-muted-foreground">Platform upgraded to v2.1.0</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-4 gap-4">
            <Button className="h-auto py-6 flex flex-col gap-2" variant="outline">
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button className="h-auto py-6 flex flex-col gap-2" variant="outline">
              <BookOpen className="h-6 w-6" />
              <span>Manage Courses</span>
            </Button>
            <Button className="h-auto py-6 flex flex-col gap-2" variant="outline">
              <BarChart3 className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
            <Button className="h-auto py-6 flex flex-col gap-2" variant="outline">
              <Settings className="h-6 w-6" />
              <span>System Settings</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
