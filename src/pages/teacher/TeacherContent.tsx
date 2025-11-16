import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, Video, Map, Plus, Edit, Trash2 } from "lucide-react";

const roadmaps = [
  { id: 1, title: "Cloud Computing Path", domain: "Cloud", items: 12 },
  { id: 2, title: "AI & ML Journey", domain: "AI & ML", items: 15 },
  { id: 3, title: "DevOps Pipeline", domain: "DevOps", items: 10 },
];

const resources = [
  { id: 1, title: "Introduction to AWS", type: "Video", domain: "Cloud", duration: "45 min" },
  { id: 2, title: "Python for ML", type: "Document", domain: "AI & ML", pages: 120 },
  { id: 3, title: "Docker Basics", type: "Video", domain: "DevOps", duration: "30 min" },
];

const tests = [
  { id: 1, title: "Cloud Fundamentals Quiz", questions: 20, domain: "Cloud", difficulty: "Easy" },
  { id: 2, title: "ML Algorithms Test", questions: 30, domain: "AI & ML", difficulty: "Hard" },
  { id: 3, title: "CI/CD Pipeline Assessment", questions: 25, domain: "DevOps", difficulty: "Medium" },
];

export default function TeacherContent() {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Manage Content</h2>
            <p className="text-muted-foreground">Create and manage learning materials</p>
          </div>
        </div>

        <Tabs defaultValue="roadmaps" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="roadmaps">Roadmaps</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmaps" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Map className="h-5 w-5" />
                      Learning Roadmaps
                    </CardTitle>
                    <CardDescription>Create structured learning paths</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Roadmap
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {roadmaps.map((roadmap) => (
                  <div
                    key={roadmap.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{roadmap.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{roadmap.domain}</Badge>
                        <span className="text-sm text-muted-foreground">{roadmap.items} items</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5" />
                      Learning Resources
                    </CardTitle>
                    <CardDescription>Videos, notes, and study materials</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Resource
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {resource.type === "Video" ? (
                        <Video className="h-5 w-5 text-primary" />
                      ) : (
                        <FileText className="h-5 w-5 text-primary" />
                      )}
                      <div>
                        <p className="font-medium">{resource.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{resource.domain}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {resource.type === "Video" ? resource.duration : `${resource.pages} pages`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Assessments & Tests
                    </CardTitle>
                    <CardDescription>Create and manage tests</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Test
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {tests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{test.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{test.domain}</Badge>
                        <Badge variant="secondary">{test.difficulty}</Badge>
                        <span className="text-sm text-muted-foreground">{test.questions} questions</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
