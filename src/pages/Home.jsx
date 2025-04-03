import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, TrendingUp, Clock, Heart } from "lucide-react";
import MainFeature from "../components/MainFeature";

// Mock data for the MVP
const TRENDING_MOVIES = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    poster: "https://source.unsplash.com/random/300x450?movie,inception",
    genres: ["Sci-Fi", "Action", "Thriller"]
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    poster: "https://source.unsplash.com/random/300x450?movie,prison",
    genres: ["Drama"]
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    poster: "https://source.unsplash.com/random/300x450?movie,batman",
    genres: ["Action", "Crime", "Drama"]
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    poster: "https://source.unsplash.com/random/300x450?movie,crime",
    genres: ["Crime", "Drama"]
  },
  {
    id: 5,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    poster: "https://source.unsplash.com/random/300x450?movie,mafia",
    genres: ["Crime", "Drama"]
  },
  {
    id: 6,
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    poster: "https://source.unsplash.com/random/300x450?movie,space",
    genres: ["Adventure", "Drama", "Sci-Fi"]
  }
];

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl aspect-[2/3] shadow-card">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-lg">{movie.title}</h3>
          <p className="text-surface-200 text-sm">{movie.year}</p>
          <div className="flex items-center mt-1">
            <Star size={16} className="text-accent fill-accent" />
            <span className="text-white ml-1">{movie.rating}</span>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute -top-2 -right-2 z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <button className="bg-primary rounded-full p-2 shadow-lg hover:bg-primary-dark transition-colors">
              <Heart size={16} className="text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Home = () => {
  const [activeTab, setActiveTab] = useState("trending");
  
  const tabs = [
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "upcoming", label: "Upcoming", icon: Clock },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <MainFeature />
      </section>
      
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Discover Movies</h2>
          
          <div className="flex space-x-2 bg-surface-100 dark:bg-surface-800 p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-surface-700 text-primary shadow-sm"
                      : "text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200"
                  }`}
                >
                  <Icon size={16} className="mr-1.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <AnimatePresence mode="wait">
            {TRENDING_MOVIES.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </AnimatePresence>
        </div>
      </section>
      
      <section>
        <div className="bg-gradient-to-r from-secondary to-secondary-light rounded-2xl p-8 text-white">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="mb-6">Create an account to rate movies, build your watchlist, and get personalized recommendations.</p>
            <button className="btn bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-lg transition-all">
              Sign Up Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;