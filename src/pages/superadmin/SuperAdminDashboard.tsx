import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  Database, 
  Activity,
  Settings,
  FileText,
  AlertCircle,
  CheckCircle,
  Server,
} from "lucide-react";

const systemMetrics = [
  { label: "Total Users", value: "1,245", icon: Users, color: "from-blue-500 to-cyan-500" },
  { label: "Database Size", value: "2.4 GB", icon: Database, color: "from-purple-500 to-pink-500" },
  { label: "Uptime", value: "99.9%", icon: Activity, color: "from-green-500 to-emerald-500" },
  { label: "API Requests", value: "1.2M", icon: Server, color: "from-orange-500 to-amber-500" },
];

const systemAlerts = [
  { type: "success", message: "Backup completed successfully", time: "10 minutes ago" },
  { type: "warning", message: "High memory usage detected", time: "1 hour ago" },
  { type: "info", message: "System update available", time: "2 hours ago" },
];

const recentLogs = [
  { action: "User Login", user: "admin@school.edu", status: "Success", time: "2 min ago" },
  { action: "Database Query", user: "System", status: "Success", time: "5 min ago" },
  { action: "Configuration Change", user: "superadmin@system.com", status: "Success", time: "15 min ago" },
  { action: "Failed Login Attempt", user: "unknown@email.com", status: "Failed", time: "30 min ago" },
];

export default function SuperAdminDashboard() {
  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              Super Admin Dashboard
            </h2>
            <p className="text-muted-foreground">
              Full system access and control
            </p>
          </div>
          <Button className="gap-2" variant="destructive">
            <Settings className="h-4 w-4" />
            System Settings
          </Button>
        </div>

        {/* System Metrics */}
        <div className="grid md:grid-cols-4 gap-4">
          {systemMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-3xl font-bold mt-1">{metric.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Real-time system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {systemAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  {alert.type === "success" && <CheckCircle className="h-5 w-5 text-success mt-0.5" />}
                  {alert.type === "warning" && <AlertCircle className="h-5 w-5 text-warning mt-0.5" />}
                  {alert.type === "info" && <Activity className="h-5 w-5 text-info mt-0.5" />}
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent System Logs */}
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Recent system activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentLogs.map((log, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.user}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={log.status === "Success" ? "default" : "destructive"}>
                      {log.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* System Controls */}
        <Card>
          <CardHeader>
            <CardTitle>System Controls</CardTitle>
            <CardDescription>Advanced system management</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-4 gap-4">
            <Button className="h-auto py-6 flex flex-col gap-2" variant="outline">
              <Users className="h-6 w-6" />
              <span>User Management</span>
            </Button>
            <Button className="h-auto py-6 flex flex-col gap-2" variant="outline">
              <Database className="h-6 w-6" />
              <span>Database Admin</span>
            </Button>
            <Button className="h-auto py-6 flex flex-col gap-2" variant="outline">
              <FileText className="h-6 w-6" />
              <span>System Logs</span>
            </Button>
            <Button className="h-auto py-6 flex flex-col gap-2" variant="outline">
              <Settings className="h-6 w-6" />
              <span>Configuration</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
