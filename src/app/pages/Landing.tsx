import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { GraduationCap, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export default function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <GraduationCap className="w-16 h-16 text-indigo-600" />
            </motion.div>
          </div>
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Student Achievement Platform
          </h1>
          <p className="text-xl text-gray-600">
            Track, manage, and showcase extracurricular accomplishments
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <motion.div
            variants={cardHoverVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="p-8 cursor-pointer border-2 hover:border-indigo-400 transition-colors"
              onClick={() => navigate("/admin")}
            >
              <div className="text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="flex justify-center mb-6"
                >
                  <div className="p-4 bg-indigo-100 rounded-full">
                    <ShieldCheck className="w-12 h-12 text-indigo-600" />
                  </div>
                </motion.div>
                <h2 className="text-2xl mb-3 text-indigo-600">Admin Portal</h2>
                <p className="text-gray-600 mb-6">
                  Record achievements, update participation data, and generate reports
                </p>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Enter as Admin
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            variants={cardHoverVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="p-8 cursor-pointer border-2 hover:border-purple-400 transition-colors"
              onClick={() => navigate("/student")}
            >
              <div className="text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    delay: 0.5,
                  }}
                  className="flex justify-center mb-6"
                >
                  <div className="p-4 bg-purple-100 rounded-full">
                    <GraduationCap className="w-12 h-12 text-purple-600" />
                  </div>
                </motion.div>
                <h2 className="text-2xl mb-3 text-purple-600">Student Portal</h2>
                <p className="text-gray-600 mb-6">
                  View achievements, track progress, and showcase your accomplishments
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Enter as Student
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 text-center">
          <p className="text-gray-500">
            Empowering students to celebrate their achievements beyond academics
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
