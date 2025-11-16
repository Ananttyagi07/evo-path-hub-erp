import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, UserPlus, Edit, Trash2 } from "lucide-react";

const users = [
  { id: 1, name: "Alice Johnson", email: "alice@school.edu", role: "Student", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@school.edu", role: "Student", status: "Active" },
  { id: 3, name: "Jane Teacher", email: "teacher@school.edu", role: "Teacher", status: "Active" },
  { id: 4, name: "Carol White", email: "carol@school.edu", role: "Student", status: "Inactive" },
  { id: 5, name: "David Brown", email: "david@school.edu", role: "Teacher", status: "Active" },
];

const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case "Teacher":
      return "default";
    case "Student":
      return "secondary";
    default:
      return "outline";
  }
};

export default function AdminUsers() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">User Management</h2>
            <p className="text-muted-foreground">Manage all platform users</p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Users</CardTitle>
                <CardDescription>View and manage user accounts</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                    <Badge variant={user.status === "Active" ? "default" : "outline"}>
                      {user.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
