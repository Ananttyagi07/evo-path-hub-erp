import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Award } from "lucide-react";

const weeklyLeaders = [
  { rank: 1, name: "Alice Johnson", points: 2850, badge: "🥇" },
  { rank: 2, name: "Bob Smith", points: 2720, badge: "🥈" },
  { rank: 3, name: "Carol White", points: 2650, badge: "🥉" },
  { rank: 4, name: "David Brown", points: 2580, badge: "" },
  { rank: 5, name: "Emma Davis", points: 2510, badge: "" },
];

const monthlyLeaders = [
  { rank: 1, name: "Sarah Wilson", points: 11500, badge: "🥇" },
  { rank: 2, name: "Michael Chen", points: 10800, badge: "🥈" },
  { rank: 3, name: "Lisa Anderson", points: 10200, badge: "🥉" },
  { rank: 4, name: "James Miller", points: 9850, badge: "" },
  { rank: 5, name: "Emily Taylor", points: 9600, badge: "" },
];

const yearlyLeaders = [
  { rank: 1, name: "John Thompson", points: 125000, badge: "🥇" },
  { rank: 2, name: "Maria Garcia", points: 118000, badge: "🥈" },
  { rank: 3, name: "Robert Lee", points: 112000, badge: "🥉" },
  { rank: 4, name: "Jennifer Martin", points: 105000, badge: "" },
  { rank: 5, name: "William Harris", points: 98000, badge: "" },
];

export default function StudentLeaderboard() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Trophy className="h-8 w-8 text-primary" />
              Leaderboard
            </h2>
            <p className="text-muted-foreground">Top performers across the platform</p>
          </div>
        </div>

        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5" />
                  This Week's Top Performers
                </CardTitle>
                <CardDescription>Updated every Monday</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyLeaders.map((leader) => (
                    <div
                      key={leader.rank}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-muted-foreground w-8">
                          {leader.badge || leader.rank}
                        </span>
                        <div>
                          <p className="font-medium">{leader.name}</p>
                          <p className="text-sm text-muted-foreground">{leader.points} points</p>
                        </div>
                      </div>
                      {leader.rank <= 3 && (
                        <Badge variant="default">Top {leader.rank}</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  This Month's Top Performers
                </CardTitle>
                <CardDescription>Updated on the 1st of each month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {monthlyLeaders.map((leader) => (
                    <div
                      key={leader.rank}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-muted-foreground w-8">
                          {leader.badge || leader.rank}
                        </span>
                        <div>
                          <p className="font-medium">{leader.name}</p>
                          <p className="text-sm text-muted-foreground">{leader.points} points</p>
                        </div>
                      </div>
                      {leader.rank <= 3 && (
                        <Badge variant="default">Top {leader.rank}</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="yearly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  This Year's Top Performers
                </CardTitle>
                <CardDescription>Updated annually</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {yearlyLeaders.map((leader) => (
                    <div
                      key={leader.rank}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-muted-foreground w-8">
                          {leader.badge || leader.rank}
                        </span>
                        <div>
                          <p className="font-medium">{leader.name}</p>
                          <p className="text-sm text-muted-foreground">{leader.points} points</p>
                        </div>
                      </div>
                      {leader.rank <= 3 && (
                        <Badge variant="default">Top {leader.rank}</Badge>
                      )}
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
