import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Edit, Trash2, Users } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Cloud Computing Fundamentals",
    domain: "Cloud",
    students: 45,
    duration: "8 weeks",
    status: "Active",
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    domain: "AI & ML",
    students: 38,
    duration: "10 weeks",
    status: "Active",
  },
  {
    id: 3,
    title: "DevOps Essentials",
    domain: "DevOps",
    students: 52,
    duration: "6 weeks",
    status: "Active",
  },
  {
    id: 4,
    title: "Full Stack Development",
    domain: "Full Stack",
    students: 67,
    duration: "12 weeks",
    status: "Active",
  },
];

export default function AdminCourses() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Course Management</h2>
            <p className="text-muted-foreground">Manage all courses and domains</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>

        <div className="grid gap-4">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{course.domain}</Badge>
                        <span>{course.duration}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={course.status === "Active" ? "default" : "outline"}>
                      {course.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{course.students} students enrolled</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
