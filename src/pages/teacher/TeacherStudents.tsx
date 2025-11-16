import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Eye, TrendingUp } from "lucide-react";

const students = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@school.edu",
    domain: "Cloud Computing",
    progress: 85,
    courses: 3,
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@school.edu",
    domain: "AI & ML",
    progress: 72,
    courses: 2,
    status: "Active",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@school.edu",
    domain: "Full Stack",
    progress: 95,
    courses: 4,
    status: "Active",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@school.edu",
    domain: "DevOps",
    progress: 60,
    courses: 2,
    status: "Active",
  },
];

export default function TeacherStudents() {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Students</h2>
            <p className="text-muted-foreground">View and manage student progress</p>
          </div>
          <Button>Add Student</Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Students</CardTitle>
                <CardDescription>Track student performance and progress</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search students..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Domain</p>
                      <Badge variant="outline">{student.domain}</Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <p className="font-semibold">{student.progress}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Courses</p>
                      <p className="font-semibold">{student.courses}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Report
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
