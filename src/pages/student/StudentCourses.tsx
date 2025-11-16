import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Target } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Cloud Computing Fundamentals",
    domain: "Cloud",
    progress: 65,
    duration: "8 weeks",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    domain: "AI & ML",
    progress: 30,
    duration: "10 weeks",
    status: "In Progress",
  },
  {
    id: 3,
    title: "DevOps Essentials",
    domain: "DevOps",
    progress: 100,
    duration: "6 weeks",
    status: "Completed",
  },
];

export default function StudentCourses() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">My Courses</h2>
          <p className="text-muted-foreground">Track your learning progress</p>
        </div>

        <div className="grid gap-4">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {course.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.duration}
                        </span>
                        <Badge variant={course.status === "Completed" ? "default" : "secondary"}>
                          {course.domain}
                        </Badge>
                      </div>
                    </CardDescription>
                  </div>
                  <Badge variant={course.status === "Completed" ? "default" : "outline"}>
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1">Continue Learning</Button>
                    <Button variant="outline">View Details</Button>
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
