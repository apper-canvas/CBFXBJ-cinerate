import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Film } from "lucide-react";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative">
          <Film size={120} className="text-primary/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-bold text-primary">404</span>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            <Home size={18} className="mr-2" />
            Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;