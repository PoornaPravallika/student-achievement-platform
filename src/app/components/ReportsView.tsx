import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Achievement } from "../data/mockData";

interface ReportsViewProps {
  achievements: Achievement[];
}

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ef4444",
  "#06b6d4",
  "#84cc16",
  "#a855f7",
];

export default function ReportsView({ achievements }: ReportsViewProps) {
  const categoryData = achievements.reduce((acc, achievement) => {
    const category = achievement.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  const levelData = achievements.reduce((acc, achievement) => {
    const level = achievement.level;
    if (!acc[level]) {
      acc[level] = 0;
    }
    acc[level]++;
    return acc;
  }, {} as Record<string, number>);

  const levelChartData = Object.entries(levelData).map(([name, count]) => ({
    name,
    count,
  }));

  const monthlyData = achievements.reduce((acc, achievement) => {
    const month = new Date(achievement.date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month]++;
    return acc;
  }, {} as Record<string, number>);

  const monthlyChartData = Object.entries(monthlyData).map(([month, count]) => ({
    month,
    count,
  }));

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl mb-6">Achievements by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl mb-6">Achievements by Level</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={levelChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl mb-6">Monthly Achievement Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
          <p className="text-sm opacity-90 mb-2">Total Achievements</p>
          <p className="text-4xl">{achievements.length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-lg shadow-md">
          <p className="text-sm opacity-90 mb-2">Most Active Category</p>
          <p className="text-2xl">
            {chartData.sort((a, b) => b.value - a.value)[0]?.name || "N/A"}
          </p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-6 rounded-lg shadow-md">
          <p className="text-sm opacity-90 mb-2">Unique Students</p>
          <p className="text-4xl">
            {new Set(achievements.map((a) => a.studentId)).size}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
