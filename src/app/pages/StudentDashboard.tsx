import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Trophy,
  Star,
  Award,
  TrendingUp,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import AchievementsList from "../components/AchievementsList";
import StudentProfile from "../components/StudentProfile";
import ProgressView from "../components/ProgressView";
import { mockAchievements } from "../data/mockData";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState("STU001");

  const students = Array.from(
    new Set(mockAchievements.map((a) => ({ id: a.studentId, name: a.studentName })))
  ).reduce((acc, student) => {
    if (!acc.find((s) => s.id === student.id)) {
      acc.push(student);
    }
    return acc;
  }, [] as { id: string; name: string }[]);

  const studentAchievements = mockAchievements.filter(
    (a) => a.studentId === selectedStudent
  );

  const currentStudent = students.find((s) => s.id === selectedStudent);

  const stats = {
    total: studentAchievements.length,
    national: studentAchievements.filter((a) => a.level === "National" || a.level === "International").length,
    categories: new Set(studentAchievements.map((a) => a.category)).size,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b sticky top-0 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl text-purple-600">Student Portal</h1>
                <p className="text-sm text-gray-600">
                  View and showcase your achievements
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl mb-2"
                >
                  Welcome, {currentStudent?.name}!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="opacity-90"
                >
                  Student ID: {selectedStudent}
                </motion.p>
              </div>
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Trophy className="w-20 h-20 opacity-80" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Achievements</p>
                <p className="text-3xl mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Trophy className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">National+</p>
                <p className="text-3xl mt-1">{stats.national}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Star className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Categories</p>
                <p className="text-3xl mt-1">{stats.categories}</p>
              </div>
              <div className="p-3 bg-pink-100 rounded-full">
                <Award className="w-8 h-8 text-pink-600" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="achievements" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="achievements">
                <Trophy className="w-4 h-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="progress">
                <TrendingUp className="w-4 h-4 mr-2" />
                Progress
              </TabsTrigger>
              <TabsTrigger value="profile">
                <Award className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="achievements" className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl">My Achievements</h3>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </div>
                <AchievementsList
                  achievements={studentAchievements}
                  showDelete={false}
                />
              </div>
            </TabsContent>

            <TabsContent value="progress">
              <ProgressView achievements={studentAchievements} />
            </TabsContent>

            <TabsContent value="profile">
              <StudentProfile
                student={currentStudent}
                achievements={studentAchievements}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
