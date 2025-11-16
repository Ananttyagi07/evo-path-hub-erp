import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentLeaderboard from "./pages/student/StudentLeaderboard";
import StudentProfile from "./pages/student/StudentProfile";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherStudents from "./pages/teacher/TeacherStudents";
import TeacherContent from "./pages/teacher/TeacherContent";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminSettings from "./pages/admin/AdminSettings";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import SuperAdminUsers from "./pages/superadmin/SuperAdminUsers";
import SuperAdminSettings from "./pages/superadmin/SuperAdminSettings";
import SuperAdminLogs from "./pages/superadmin/SuperAdminLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/courses" element={<StudentCourses />} />
          <Route path="/student/leaderboard" element={<StudentLeaderboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/students" element={<TeacherStudents />} />
          <Route path="/teacher/content" element={<TeacherContent />} />
          <Route path="/teacher/profile" element={<TeacherProfile />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Super Admin Routes */}
          <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/superadmin/users" element={<SuperAdminUsers />} />
          <Route path="/superadmin/settings" element={<SuperAdminSettings />} />
          <Route path="/superadmin/logs" element={<SuperAdminLogs />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
