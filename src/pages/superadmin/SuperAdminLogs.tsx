import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, RefreshCcw, FileText } from "lucide-react";

const systemLogs = [
  { timestamp: "2024-01-20 14:35:22", level: "INFO", message: "System backup completed successfully", source: "BackupService" },
  { timestamp: "2024-01-20 14:30:15", level: "WARNING", message: "High memory usage detected (85%)", source: "MonitorService" },
  { timestamp: "2024-01-20 14:25:08", level: "ERROR", message: "Failed database connection attempt", source: "DatabaseService" },
  { timestamp: "2024-01-20 14:20:45", level: "INFO", message: "User login successful", source: "AuthService" },
];

const securityLogs = [
  { timestamp: "2024-01-20 14:32:10", event: "Failed Login", user: "unknown@email.com", ip: "192.168.1.100", status: "Blocked" },
  { timestamp: "2024-01-20 14:28:45", event: "Password Change", user: "admin@school.edu", ip: "192.168.1.50", status: "Success" },
  { timestamp: "2024-01-20 14:15:22", event: "Role Modified", user: "superadmin@system.com", ip: "192.168.1.10", status: "Success" },
];

const apiLogs = [
  { timestamp: "2024-01-20 14:35:00", endpoint: "/api/users", method: "GET", status: 200, duration: "45ms" },
  { timestamp: "2024-01-20 14:34:55", endpoint: "/api/courses", method: "POST", status: 201, duration: "120ms" },
  { timestamp: "2024-01-20 14:34:50", endpoint: "/api/login", method: "POST", status: 401, duration: "15ms" },
  { timestamp: "2024-01-20 14:34:45", endpoint: "/api/students", method: "GET", status: 200, duration: "60ms" },
];

const getLevelBadgeVariant = (level: string) => {
  switch (level) {
    case "ERROR":
      return "destructive";
    case "WARNING":
      return "outline";
    case "INFO":
      return "default";
    default:
      return "secondary";
  }
};

export default function SuperAdminLogs() {
  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <FileText className="h-8 w-8" />
              System Logs
            </h2>
            <p className="text-muted-foreground">Monitor system activities and events</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="system" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="system">System Logs</TabsTrigger>
            <TabsTrigger value="security">Security Logs</TabsTrigger>
            <TabsTrigger value="api">API Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>System Events</CardTitle>
                    <CardDescription>Application and system-level logs</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search logs..." className="pl-10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {systemLogs.map((log, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-secondary/30 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={getLevelBadgeVariant(log.level)}>{log.level}</Badge>
                            <span className="text-xs text-muted-foreground">{log.source}</span>
                          </div>
                          <p className="text-sm">{log.message}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                          {log.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Security Events</CardTitle>
                    <CardDescription>Authentication and security-related logs</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search security logs..." className="pl-10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {securityLogs.map((log, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-secondary/30 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{log.event}</span>
                            <Badge variant={log.status === "Success" ? "default" : "destructive"}>
                              {log.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-0.5">
                            <p>User: {log.user}</p>
                            <p>IP: {log.ip}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                          {log.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>API Request Logs</CardTitle>
                    <CardDescription>All API requests and responses</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search API logs..." className="pl-10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {apiLogs.map((log, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-secondary/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <Badge variant="outline">{log.method}</Badge>
                          <span className="text-sm font-mono">{log.endpoint}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={log.status < 400 ? "default" : "destructive"}>
                            {log.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{log.duration}</span>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {log.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
