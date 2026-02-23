import { motion, AnimatePresence } from "motion/react";
import { Trophy, Calendar, Award, MapPin, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import type { Achievement } from "../data/mockData";
import { toast } from "sonner";

interface AchievementsListProps {
  achievements: Achievement[];
  onDelete?: (id: string) => void;
  showDelete?: boolean;
}

const levelColors = {
  School: "bg-blue-100 text-blue-800",
  District: "bg-green-100 text-green-800",
  State: "bg-yellow-100 text-yellow-800",
  National: "bg-orange-100 text-orange-800",
  International: "bg-red-100 text-red-800",
};

const categoryColors = {
  Sports: "bg-purple-100 text-purple-800",
  Academic: "bg-blue-100 text-blue-800",
  Arts: "bg-pink-100 text-pink-800",
  Music: "bg-indigo-100 text-indigo-800",
  Leadership: "bg-amber-100 text-amber-800",
  "Community Service": "bg-green-100 text-green-800",
  Technology: "bg-cyan-100 text-cyan-800",
  Debate: "bg-rose-100 text-rose-800",
  Drama: "bg-violet-100 text-violet-800",
  Other: "bg-gray-100 text-gray-800",
};

export default function AchievementsList({
  achievements,
  onDelete,
  showDelete = true,
}: AchievementsListProps) {
  const handleDelete = (id: string, title: string) => {
    if (onDelete) {
      onDelete(id);
      toast.success(`Deleted: ${title}`);
    }
  };

  if (achievements.length === 0) {
    return (
      <div className="text-center py-12">
        <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No achievements found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-white to-gray-50 p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    className="p-2 bg-indigo-100 rounded-full mt-1"
                  >
                    <Trophy className="w-5 h-5 text-indigo-600" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-lg mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {achievement.studentName} ({achievement.studentId})
                    </p>
                    {achievement.description && (
                      <p className="text-sm text-gray-700 mb-3">
                        {achievement.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        className={
                          categoryColors[
                            achievement.category as keyof typeof categoryColors
                          ] || "bg-gray-100 text-gray-800"
                        }
                      >
                        {achievement.category}
                      </Badge>
                      <Badge
                        className={
                          levelColors[achievement.level] ||
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        <MapPin className="w-3 h-3 mr-1" />
                        {achievement.level}
                      </Badge>
                      <Badge variant="outline">
                        <Award className="w-3 h-3 mr-1" />
                        {achievement.award}
                      </Badge>
                      <Badge variant="outline">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(achievement.date).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              {showDelete && onDelete && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(achievement.id, achievement.title)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
