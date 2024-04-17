"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRedirect(true);
    }, 8000); // Redirect after 8 seconds
    return () => clearTimeout(timer);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const handleGetStarted = () => {
    setShowContent(true);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to EmoAnalytics</h1>
        <p className="text-lg mb-8">
          Analyze and understand your emotions like never before.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out"
        >
          Get Started
        </button>
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants}
              className="mt-8"
            >
              <h2 className="text-3xl font-bold mb-4 pt-10">
                Your Emotional Insights Await
              </h2>
              <p className="text-lg mb-4">
                Dive into your emotional data and discover patterns and insights
                that help you understand yourself better.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-30">
                <div>
                  <p className="text-sm mt-2">
                    Visualize your emotional journey.
                  </p>
                </div>
                <div>
                  <p className="text-sm mt-2">
                    Track changes in your emotional state over time.
                  </p>
                </div>
                {/* Additional content */}
                <div>
                  <p className="text-sm mt-2">
                    Understand the impact of external factors on your emotions.
                  </p>
                </div>
                <div>
                  <p className="text-sm mt-2">
                    Receive personalized insights based on your emotional data.
                  </p>
                </div>
                <div>
                  <p className="text-sm mt-2">
                    Set goals and monitor your emotional well-being.
                  </p>
                </div>
                <div>
                  <p className="text-sm mt-2">
                    Interact with visualizations to gain deeper insights.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showRedirect && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="mt-8"
            >
              <p className="text-lg">Redirecting to login page...</p>
            </motion.div>
          )}
        </AnimatePresence>
        {showRedirect && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-950 bg-opacity-80 backdrop-blur-lg rounded-lg p-12 max-w-xl text-center">
              <p className="text-white text-lg">Redirecting to login page...</p>
              <p className="text-gray-300 mt-4 text-sm">
                <Link href="/login" className="underline">
                  Click here if you are not redirected.
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
