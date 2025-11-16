import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Server, Database, Shield, Zap } from "lucide-react";

export default function SuperAdminSettings() {
  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Settings className="h-8 w-8" />
            System Settings
          </h2>
          <p className="text-muted-foreground">Configure system-wide settings</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Server Configuration
              </CardTitle>
              <CardDescription>Manage server and infrastructure settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="serverUrl">Server URL</Label>
                <Input id="serverUrl" defaultValue="https://api.skillforge.edu" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxConnections">Max Connections</Label>
                  <Input id="maxConnections" type="number" defaultValue="1000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeout">Request Timeout (ms)</Label>
                  <Input id="timeout" type="number" defaultValue="30000" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Load Balancing</Label>
                  <p className="text-sm text-muted-foreground">
                    Distribute load across multiple servers
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Save Server Settings</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Configuration
              </CardTitle>
              <CardDescription>Configure database settings and optimization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dbHost">Database Host</Label>
                <Input id="dbHost" defaultValue="db.skillforge.edu" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dbPort">Port</Label>
                  <Input id="dbPort" defaultValue="5432" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dbName">Database Name</Label>
                  <Input id="dbName" defaultValue="skillforge_prod" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically backup database daily
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Query Optimization</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable automatic query optimization
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Save Database Settings</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all admin users
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Password Expiry</Label>
                  <p className="text-sm text-muted-foreground">
                    Force password change every 90 days
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">
                    Auto logout after 30 minutes of inactivity
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Save Security Settings</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Performance & Optimization
              </CardTitle>
              <CardDescription>Configure caching and performance settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Caching</Label>
                  <p className="text-sm text-muted-foreground">
                    Cache frequently accessed data
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>CDN Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Serve static assets via CDN
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compression</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable gzip compression for responses
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Save Performance Settings</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
