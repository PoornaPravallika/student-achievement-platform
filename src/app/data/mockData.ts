export interface Achievement {
  id: string;
  studentName: string;
  studentId: string;
  category: string;
  title: string;
  description: string;
  date: string;
  award: string;
  level: "School" | "District" | "State" | "National" | "International";
}

export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  achievements: Achievement[];
}

export const mockAchievements: Achievement[] = [
  {
    id: "1",
    studentName: "Sarah Johnson",
    studentId: "STU001",
    category: "Sports",
    title: "Regional Basketball Championship",
    description: "Led the team to victory in the regional basketball championship",
    date: "2026-02-15",
    award: "Gold Medal",
    level: "State",
  },
  {
    id: "2",
    studentName: "Michael Chen",
    studentId: "STU002",
    category: "Academic",
    title: "Science Fair Winner",
    description: "First place in the National Science Fair for renewable energy project",
    date: "2026-01-20",
    award: "1st Place",
    level: "National",
  },
  {
    id: "3",
    studentName: "Emily Rodriguez",
    studentId: "STU003",
    category: "Arts",
    title: "State Art Competition",
    description: "Excellence award in painting at the state art competition",
    date: "2026-02-10",
    award: "Excellence Award",
    level: "State",
  },
  {
    id: "4",
    studentName: "David Kim",
    studentId: "STU004",
    category: "Music",
    title: "Piano Recital Performance",
    description: "Outstanding performance at the district music recital",
    date: "2026-01-30",
    award: "Outstanding Performance",
    level: "District",
  },
  {
    id: "5",
    studentName: "Sarah Johnson",
    studentId: "STU001",
    category: "Leadership",
    title: "Student Council President",
    description: "Elected as student council president for the academic year",
    date: "2025-09-01",
    award: "Leadership Recognition",
    level: "School",
  },
  {
    id: "6",
    studentName: "Michael Chen",
    studentId: "STU002",
    category: "Community Service",
    title: "Volunteer of the Year",
    description: "Completed 200+ hours of community service",
    date: "2025-12-15",
    award: "Volunteer Award",
    level: "School",
  },
];

export const categories = [
  "Sports",
  "Academic",
  "Arts",
  "Music",
  "Leadership",
  "Community Service",
  "Technology",
  "Debate",
  "Drama",
  "Other",
];

export const awardTypes = [
  "1st Place",
  "2nd Place",
  "3rd Place",
  "Gold Medal",
  "Silver Medal",
  "Bronze Medal",
  "Excellence Award",
  "Outstanding Performance",
  "Recognition Certificate",
  "Leadership Recognition",
  "Volunteer Award",
  "Participation Certificate",
];

export const levels = ["School", "District", "State", "National", "International"];
