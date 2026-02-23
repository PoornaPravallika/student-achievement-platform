import { motion } from "motion/react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { TrendingUp, Target, Sparkles } from "lucide-react";
import type { Achievement } from "../data/mockData";

interface ProgressViewProps {
  achievements: Achievement[];
}

export default function ProgressView({ achievements }: ProgressViewProps) {
  const monthlyProgress = achievements.reduce((acc, achievement) => {
    const month = new Date(achievement.date).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month]++;
    return acc;
  }, {} as Record<string, number>);

  const progressData = Object.entries(monthlyProgress)
    .map(([month, count]) => ({
      month,
      achievements: count,
    }))
    .sort(
      (a, b) =>
        new Date(a.month).getTime() - new Date(b.month).getTime()
    );

  const categoryData = achievements.reduce((acc, achievement) => {
    const category = achievement.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {} as Record<string, number>);

  const radarData = Object.entries(categoryData).map(([category, count]) => ({
    category,
    count,
  }));

  const levelPoints = {
    School: 1,
    District: 2,
    State: 3,
    National: 4,
    International: 5,
  };

  const totalPoints = achievements.reduce(
    (acc, a) => acc + (levelPoints[a.level] || 0),
    0
  );

  const averageLevel =
    achievements.length > 0 ? totalPoints / achievements.length : 0;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6" />
            <p className="text-sm opacity-90">Total Progress Points</p>
          </div>
          <p className="text-4xl">{totalPoints}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-6 h-6" />
            <p className="text-sm opacity-90">Average Level</p>
          </div>
          <p className="text-4xl">{averageLevel.toFixed(1)}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-pink-500 to-purple-600 text-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6" />
            <p className="text-sm opacity-90">Growth Streak</p>
          </div>
          <p className="text-4xl">{progressData.length}</p>
          <p className="text-xs opacity-75 mt-1">months</p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl mb-6">Achievement Timeline</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={progressData}>
            <defs>
              <linearGradient id="colorAchievements" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="achievements"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorAchievements)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl mb-6">Category Distribution</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis />
            <Radar
              name="Achievements"
              dataKey="count"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl mb-6">Growth Trajectory</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="achievements"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ fill: "#6366f1", r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
