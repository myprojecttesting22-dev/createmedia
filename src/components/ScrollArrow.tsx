import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollArrow = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if at bottom (with small threshold)
      const atBottom = scrollTop + windowHeight >= documentHeight - 100;
      setIsAtBottom(atBottom);
      
      // Hide at very top, show otherwise
      setIsVisible(scrollTop > 50 || atBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (isAtBottom) {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Scroll down one viewport
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 text-primary hover:bg-primary/20 transition-all duration-300 shadow-lg hover:shadow-primary/20"
          aria-label={isAtBottom ? "Scroll to top" : "Scroll down"}
        >
          <motion.div
            animate={{ rotate: isAtBottom ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollArrow;
