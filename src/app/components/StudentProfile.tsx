import { motion } from "motion/react";
import { Trophy, Star, Award, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";
import type { Achievement } from "../data/mockData";

interface StudentProfileProps {
  student: { id: string; name: string } | undefined;
  achievements: Achievement[];
}

export default function StudentProfile({
  student,
  achievements,
}: StudentProfileProps) {
  if (!student) return null;

  const categoryBreakdown = achievements.reduce((acc, achievement) => {
    const category = achievement.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  const recentAchievements = [...achievements]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const levelCounts = achievements.reduce((acc, achievement) => {
    const level = achievement.level;
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-lg shadow-lg"
      >
        <div className="flex items-center gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl"
          >
            {student.name.charAt(0)}
          </motion.div>
          <div className="flex-1">
            <h2 className="text-3xl mb-2">{student.name}</h2>
            <p className="opacity-90">Student ID: {student.id}</p>
            <p className="opacity-90 mt-2">
              {achievements.length} Total Achievements
            </p>
          </div>
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Trophy className="w-16 h-16 opacity-50" />
          </motion.div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500" />
            <h3 className="text-xl">Achievement Levels</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(levelCounts).map(([level, count], index) => (
              <motion.div
                key={level}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between"
              >
                <span className="text-gray-700">{level}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / achievements.length) * 100}%` }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                    />
                  </div>
                  <span className="text-sm">{count}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-purple-500" />
            <h3 className="text-xl">Recent Achievements</h3>
          </div>
          <div className="space-y-3">
            {recentAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg"
              >
                <p className="text-sm mb-1">{achievement.title}</p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Calendar className="w-3 h-3" />
                  {new Date(achievement.date).toLocaleDateString()}
                  <Badge variant="outline" className="text-xs">
                    {achievement.award}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-indigo-500" />
          <h3 className="text-xl">Achievements by Category</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(categoryBreakdown).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border"
            >
              <h4 className="mb-2">{category}</h4>
              <p className="text-3xl text-purple-600">{items.length}</p>
              <p className="text-sm text-gray-600 mt-1">achievements</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
