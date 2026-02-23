import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { categories, awardTypes, levels } from "../data/mockData";
import type { Achievement } from "../data/mockData";

interface AddAchievementFormProps {
  onAdd: (achievement: Achievement) => void;
}

export default function AddAchievementForm({ onAdd }: AddAchievementFormProps) {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    category: "",
    title: "",
    description: "",
    date: "",
    award: "",
    level: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.studentId ||
      !formData.category ||
      !formData.title ||
      !formData.date ||
      !formData.award ||
      !formData.level
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newAchievement: Achievement = {
      id: Date.now().toString(),
      ...formData,
      level: formData.level as Achievement["level"],
    };

    onAdd(newAchievement);
    toast.success("Achievement added successfully!");

    setFormData({
      studentName: "",
      studentId: "",
      category: "",
      title: "",
      description: "",
      date: "",
      award: "",
      level: "",
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="studentName">
            Student Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="studentName"
            value={formData.studentName}
            onChange={(e) =>
              setFormData({ ...formData, studentName: e.target.value })
            }
            placeholder="Enter student name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="studentId">
            Student ID <span className="text-red-500">*</span>
          </Label>
          <Input
            id="studentId"
            value={formData.studentId}
            onChange={(e) =>
              setFormData({ ...formData, studentId: e.target.value })
            }
            placeholder="e.g., STU001"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">
            Category <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">
            Date <span className="text-red-500">*</span>
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="award">
            Award/Recognition <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.award}
            onValueChange={(value) => setFormData({ ...formData, award: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select award type" />
            </SelectTrigger>
            <SelectContent>
              {awardTypes.map((award) => (
                <SelectItem key={award} value={award}>
                  {award}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">
            Level <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.level}
            onValueChange={(value) => setFormData({ ...formData, level: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">
          Achievement Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Regional Basketball Championship"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Describe the achievement in detail..."
          rows={4}
        />
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Achievement
        </Button>
      </motion.div>
    </motion.form>
  );
}
