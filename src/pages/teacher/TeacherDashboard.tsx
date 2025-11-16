import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  BookOpen, 
  Award,
  Plus,
  FileText,
  Target,
} from "lucide-react";

const recentStudents = [
  { name: "John Doe", score: 92, progress: 85, domain: "Cloud Computing" },
  { name: "Jane Smith", score: 88, progress: 78, domain: "AI & ML" },
  { name: "Mike Johnson", score: 95, progress: 92, domain: "Full Stack" },
  { name: "Sarah Williams", score: 87, progress: 75, domain: "DevOps" },
];

const topPerformers = [
  { rank: 1, name: "Alex Chen", score: 98, courses: 12 },
  { rank: 2, name: "Emma Davis", score: 96, courses: 10 },
  { rank: 3, name: "Ryan Kumar", score: 94, courses: 11 },
];

export default function TeacherDashboard() {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Teacher Dashboard</h2>
            <p className="text-muted-foreground">
              Monitor student progress and manage course content
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Content
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold mt-1">156</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Progress</p>
                  <p className="text-3xl font-bold mt-1">73%</p>
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
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                  <p className="text-3xl font-bold mt-1">24</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tests Created</p>
                  <p className="text-3xl font-bold mt-1">48</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Student Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Student Activity</CardTitle>
              <CardDescription>Latest progress updates from your students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentStudents.map((student) => (
                <div key={student.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.domain}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success">{student.score}%</p>
                    <p className="text-sm text-muted-foreground">{student.progress}% complete</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Students with highest scores this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPerformers.map((student) => (
                <div key={student.rank} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    student.rank === 1 ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                    student.rank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                    'bg-gradient-to-br from-amber-600 to-amber-700'
                  }`}>
                    {student.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.courses} courses completed</p>
                  </div>
                  <Badge variant="secondary" className="font-semibold">
                    {student.score}%
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
            <CardDescription>Manage your teaching activities</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-4 gap-4">
            <Button className="h-auto py-6 flex flex-col gap-2" variant="outline">
              <FileText className="h-6 w-6" />
              <span>Add Resources</span>
            </Button>
            <Button className="h-auto py-6 flex flex-col gap-2" variant="outline">
              <Target className="h-6 w-6" />
              <span>Create Test</span>
            </Button>
            <Button className="h-auto py-6 flex flex-col gap-2" variant="outline">
              <Award className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
            <Button className="h-auto py-6 flex flex-col gap-2" variant="outline">
              <Users className="h-6 w-6" />
              <span>Manage Students</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
