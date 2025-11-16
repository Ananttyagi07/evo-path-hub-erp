import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  TrendingUp, 
  Target, 
  Award,
  Cloud,
  Brain,
  Code,
  Layers,
  ArrowRight,
} from "lucide-react";

const domains = [
  { name: "Cloud Computing", icon: Cloud, progress: 65, color: "from-blue-500 to-cyan-500" },
  { name: "AI & ML", icon: Brain, progress: 45, color: "from-purple-500 to-pink-500" },
  { name: "DevOps", icon: Layers, progress: 30, color: "from-green-500 to-emerald-500" },
  { name: "Full Stack", icon: Code, progress: 80, color: "from-orange-500 to-amber-500" },
];

const recentCourses = [
  { title: "AWS Fundamentals", completion: 85, status: "In Progress" },
  { title: "Machine Learning Basics", completion: 60, status: "In Progress" },
  { title: "Docker Essentials", completion: 100, status: "Completed" },
];

export default function StudentDashboard() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Welcome Back, Student!</h2>
          <p className="text-muted-foreground">
            Continue your learning journey and track your progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                  <p className="text-3xl font-bold mt-1">8</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Progress</p>
                  <p className="text-3xl font-bold mt-1">68%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tests Passed</p>
                  <p className="text-3xl font-bold mt-1">24</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                  <p className="text-3xl font-bold mt-1">3</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Domain Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Your Learning Domains</CardTitle>
              <CardDescription>Track your progress across different skill areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {domains.map((domain) => {
                const Icon = domain.icon;
                return (
                  <div key={domain.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${domain.color} flex items-center justify-center`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">{domain.name}</span>
                      </div>
                      <span className="text-sm font-semibold">{domain.progress}%</span>
                    </div>
                    <Progress value={domain.progress} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Courses</CardTitle>
              <CardDescription>Your latest learning activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.title} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className="space-y-1 flex-1">
                    <p className="font-medium">{course.title}</p>
                    <div className="flex items-center gap-2">
                      <Progress value={course.completion} className="h-2 flex-1" />
                      <span className="text-sm font-semibold">{course.completion}%</span>
                    </div>
                  </div>
                  <Badge variant={course.status === "Completed" ? "default" : "secondary"} className="ml-4">
                    {course.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Continue your learning journey</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <Button className="h-auto py-6 flex flex-col gap-2" variant="outline">
              <BookOpen className="h-6 w-6" />
              <span>Browse Courses</span>
            </Button>
            <Button className="h-auto py-6 flex flex-col gap-2" variant="outline">
              <Target className="h-6 w-6" />
              <span>Take a Test</span>
            </Button>
            <Button className="h-auto py-6 flex flex-col gap-2" variant="outline">
              <TrendingUp className="h-6 w-6" />
              <span>View Progress</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
