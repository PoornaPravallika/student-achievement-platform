import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Trophy,
  Users,
  BarChart3,
  Plus,
  Search,
  Download,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import AddAchievementForm from "../components/AddAchievementForm";
import AchievementsList from "../components/AchievementsList";
import ReportsView from "../components/ReportsView";
import { mockAchievements } from "../data/mockData";
import type { Achievement } from "../data/mockData";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddAchievement = (newAchievement: Achievement) => {
    setAchievements([newAchievement, ...achievements]);
  };

  const handleDeleteAchievement = (id: string) => {
    setAchievements(achievements.filter((a) => a.id !== id));
  };

  const filteredAchievements = achievements.filter(
    (achievement) =>
      achievement.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalAchievements: achievements.length,
    totalStudents: new Set(achievements.map((a) => a.studentId)).size,
    categories: new Set(achievements.map((a) => a.category)).size,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b sticky top-0 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl text-indigo-600">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">
                  Manage student achievements and records
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
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
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Achievements</p>
                <p className="text-3xl mt-1">{stats.totalAchievements}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Trophy className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Students</p>
                <p className="text-3xl mt-1">{stats.totalStudents}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Activity Categories</p>
                <p className="text-3xl mt-1">{stats.categories}</p>
              </div>
              <div className="p-3 bg-pink-100 rounded-full">
                <BarChart3 className="w-8 h-8 text-pink-600" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="achievements" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="add">
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="achievements" className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by student name, achievement, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 outline-none text-sm"
                  />
                </div>
                <AchievementsList
                  achievements={filteredAchievements}
                  onDelete={handleDeleteAchievement}
                />
              </div>
            </TabsContent>

            <TabsContent value="add">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <AddAchievementForm onAdd={handleAddAchievement} />
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <ReportsView achievements={achievements} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
