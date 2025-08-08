import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LibraryCatProps {
  bookProgress: number;
  bookTitle: string;
  onProgressChange?: (progress: number) => void;
  hasQuitReading?: boolean;
}

export function LibraryCat({ bookProgress, bookTitle, onProgressChange, hasQuitReading }: LibraryCatProps) {
  const [catMood, setCatMood] = useState<'sleeping' | 'happy' | 'excited' | 'betrayed' | 'encouraging'>('sleeping');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [previousProgress, setPreviousProgress] = useState(bookProgress);

  useEffect(() => {
    // Check if user quit reading first
    if (hasQuitReading) {
      setCatMood('betrayed');
      setMessage('You TRAITOR! How could you abandon this story?! 💔');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
      return;
    }

    // Detect progress changes
    if (bookProgress > previousProgress && bookProgress > 0) {
      // Progress increased - cat is happy/excited
      if (bookProgress >= 90) {
        setCatMood('excited');
        setMessage('OMG YOU\'RE ALMOST DONE! 🎉');
      } else if (bookProgress >= 50) {
        setCatMood('happy');
        setMessage('You\'re doing amazing! Keep going! 📚✨');
      } else {
        setCatMood('encouraging');
        setMessage('Great start! I believe in you! 💜');
      }
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } else if (bookProgress === 0) {
      setCatMood('sleeping');
    }

    setPreviousProgress(bookProgress);
  }, [bookProgress, hasQuitReading, previousProgress]);

  const getCatEmoji = () => {
    switch (catMood) {
      case 'sleeping': return '😴';
      case 'happy': return '😊';
      case 'excited': return '🤩';
      case 'betrayed': return '😭'; // Pouting sad with tears emoji
      case 'encouraging': return '😸';
      default: return '😊';
    }
  };

  const getCatAnimation = () => {
    switch (catMood) {
      case 'sleeping':
        return {
          scale: [1, 1.05, 1],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        };
      case 'happy':
        return {
          y: [0, -5, 0],
          transition: { duration: 0.6, repeat: 2 }
        };
      case 'excited':
        return {
          scale: [1, 1.2, 1],
          y: [0, -10, 0],
          transition: { duration: 0.4, repeat: 3 }
        };
      case 'betrayed':
        return {
          x: [0, -5, 5, -5, 0],
          scale: [1, 1.1, 1],
          transition: { duration: 0.5, repeat: 2 }
        };
      case 'encouraging':
        return {
          y: [0, -3, 0],
          transition: { duration: 0.8, repeat: 2 }
        };
      default:
        return {};
    }
  };

  return (
    <div className="relative">
      {/* Cat Character - Simple Emoji */}
      <motion.div
        className="flex flex-col items-center"
        animate={getCatAnimation()}
      >
        {/* Cat Emoji */}
        <div className="text-6xl mb-3 filter drop-shadow-lg">
          {getCatEmoji()}
        </div>
        
        {/* Cat Name Tag */}
        <div className="px-3 py-1.5 bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] text-white rounded-full text-xs font-medium shadow-lg electric-glow">
          <span className="drop-shadow-sm">Whiskers 🏷️</span>
        </div>
      </motion.div>

      {/* Speech Bubble */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-52 z-20"
          >
            <div className="relative bg-[#1e1b2e]/95 backdrop-blur-sm border-2 border-[#00d4ff]/30 rounded-2xl p-3 shadow-xl cosmic-card">
              <p className="text-xs text-[#f8fafc] text-center font-medium">{message}</p>
              {/* Speech bubble tail */}
              <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#1e1b2e]"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Celebration Particles */}
      <AnimatePresence>
        {(catMood === 'excited' || catMood === 'happy') && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-lg"
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50
                }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1, 0],
                  y: -50,
                  rotate: 360
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
                style={{
                  left: '50%',
                  top: '50%',
                }}
              >
                {['✨', '🌟', '💜', '📚', '🎉', '💫'][i]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Sad Tears Animation for Quit Reading */}
      <AnimatePresence>
        {catMood === 'betrayed' && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-lg"
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: Math.random() * 40 - 20,
                  y: -10
                }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1, 0],
                  y: 30
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
                style={{
                  left: '50%',
                  top: '20%',
                }}
              >
                💧
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Ambient Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/10 via-[#8b5cf6]/10 to-[#fbbf24]/10 rounded-full blur-xl -z-10"></div>
    </div>
  );
}