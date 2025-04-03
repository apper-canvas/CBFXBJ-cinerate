import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Film, Star, TrendingUp, Award } from "lucide-react";

// Mock data for search results
const MOCK_MOVIES = [
  { id: 1, title: "Inception", year: 2010, rating: 8.8, director: "Christopher Nolan" },
  { id: 2, title: "The Shawshank Redemption", year: 1994, rating: 9.3, director: "Frank Darabont" },
  { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, director: "Christopher Nolan" },
  { id: 4, title: "Pulp Fiction", year: 1994, rating: 8.9, director: "Quentin Tarantino" },
  { id: 5, title: "The Godfather", year: 1972, rating: 9.2, director: "Francis Ford Coppola" },
  { id: 6, title: "Interstellar", year: 2014, rating: 8.6, director: "Christopher Nolan" },
  { id: 7, title: "Fight Club", year: 1999, rating: 8.8, director: "David Fincher" },
  { id: 8, title: "The Matrix", year: 1999, rating: 8.7, director: "Lana and Lilly Wachowski" },
  { id: 9, title: "Goodfellas", year: 1990, rating: 8.7, director: "Martin Scorsese" },
  { id: 10, title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, rating: 8.8, director: "Peter Jackson" }
];

const MainFeature = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call with timeout
    const timeoutId = setTimeout(() => {
      const results = MOCK_MOVIES.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };
  
  const handleSearchBlur = () => {
    // Delay to allow for result selection
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 200);
  };
  
  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };
  
  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-secondary via-secondary-dark to-secondary rounded-2xl p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute transform rotate-12 translate-x-1/4 -translate-y-1/4">
            <Film size={400} />
          </div>
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Discover and Rate Your Favorite Movies
            </h1>
            <p className="text-surface-200 text-lg mb-8">
              Search our extensive database of films, read reviews, and share your ratings with the CineRate community.
            </p>
          </motion.div>
          
          <div className="relative">
            <div className={`relative bg-white dark:bg-surface-800 rounded-xl shadow-lg transition-all duration-300 ${
              isSearchFocused ? "ring-4 ring-primary/30" : ""
            }`}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={20} className="text-surface-400" />
              </div>
              
              <input
                type="text"
                placeholder="Search for movies, directors, or actors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full pl-12 pr-12 py-4 bg-transparent rounded-xl text-surface-800 dark:text-white placeholder-surface-400 focus:outline-none"
              />
              
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <X size={18} className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-200" />
                </button>
              )}
            </div>
            
            <AnimatePresence>
              {isSearchFocused && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-20 mt-2 w-full bg-white dark:bg-surface-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="max-h-80 overflow-y-auto scrollbar-hide">
                    <div className="p-2">
                      <div className="px-3 py-2 text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Search Results
                      </div>
                      
                      {searchResults.map((movie) => (
                        <motion.div
                          key={movie.id}
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                          className="px-3 py-2 rounded-lg cursor-pointer"
                          onClick={() => handleSelectMovie(movie)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-surface-900 dark:text-white">
                                {movie.title} <span className="text-surface-500">({movie.year})</span>
                              </div>
                              <div className="text-sm text-surface-500 dark:text-surface-400">
                                {movie.director}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Star size={16} className="text-accent fill-accent" />
                              <span className="ml-1 text-surface-700 dark:text-surface-300">{movie.rating}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              
              {isSearchFocused && isSearching && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-20 mt-2 w-full bg-white dark:bg-surface-800 rounded-xl shadow-lg p-4 text-center"
                >
                  <div className="flex flex-col items-center justify-center py-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <Search size={24} className="text-primary mb-2" />
                    </motion.div>
                    <p className="text-surface-600 dark:text-surface-400">Searching...</p>
                  </div>
                </motion.div>
              )}
              
              {isSearchFocused && !isSearching && searchQuery && searchResults.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-20 mt-2 w-full bg-white dark:bg-surface-800 rounded-xl shadow-lg p-4 text-center"
                >
                  <div className="py-4">
                    <p className="text-surface-600 dark:text-surface-400">No results found for "{searchQuery}"</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <TrendingUp size={16} className="text-accent mr-2" />
              <span className="text-white text-sm">200,000+ Movies</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star size={16} className="text-accent mr-2" />
              <span className="text-white text-sm">User Ratings</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Award size={16} className="text-accent mr-2" />
              <span className="text-white text-sm">Award Winners</span>
            </div>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{selectedMovie.title} <span className="text-surface-500">({selectedMovie.year})</span></h2>
                <p className="text-surface-600 dark:text-surface-400">Directed by {selectedMovie.director}</p>
              </div>
              
              <div className="flex items-center bg-surface-100 dark:bg-surface-700 px-3 py-1 rounded-full">
                <Star size={18} className="text-accent fill-accent mr-1" />
                <span className="font-bold">{selectedMovie.rating}</span>
                <span className="text-surface-500 text-sm ml-1">/10</span>
              </div>
            </div>
            
            <div className="mt-4 flex gap-4">
              <div className="flex-1">
                <h3 className="font-medium mb-2">Your Rating</h3>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                    <motion.button
                      key={rating}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        rating <= 5 
                          ? "bg-primary/10 text-primary hover:bg-primary/20" 
                          : "bg-accent/10 text-accent hover:bg-accent/20"
                      }`}
                    >
                      {rating}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div>
                <button className="btn btn-primary">
                  Add to Watchlist
                </button>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
              <p className="text-surface-600 dark:text-surface-400 italic">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              </p>
            </div>
            
            <button 
              onClick={() => setSelectedMovie(null)}
              className="mt-4 text-primary text-sm font-medium hover:underline"
            >
              Close Details
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;