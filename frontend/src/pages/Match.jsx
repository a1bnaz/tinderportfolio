import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Match({ photo = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop', onView, onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // create confetti instance bound to a local canvas so it plays nicely on mobile
    const conf = canvasRef.current
      ? confetti.create(canvasRef.current, { resize: true, useWorker: true })
      : confetti;

    // larger initial burst
    conf({
      particleCount: 120,
      spread: 140,
      origin: { y: 0 },
      colors: ['#FF5864', '#FF8A65', '#FFB199', '#FF7E6B', '#FFD6C2'],
    });

    // sustained rain for a longer duration
    const interval = setInterval(() => {
      conf({
        particleCount: 24,
        angle: 90 + (Math.random() - 0.5) * 30,
        spread: 70,
        origin: { x: Math.random(), y: 0 },
        gravity: 0.65,
        ticks: 220,
        colors: ['#FF5864', '#FF8A65', '#FFB199', '#FF7E6B'],
      });
    }, 250);

    const stop = setTimeout(() => clearInterval(interval), 5500);

    return () => {
      clearInterval(interval);
      clearTimeout(stop);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.98 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        {/* dark overlay with subtle radial glow (slightly lighter) */}
        <div className="absolute inset-0 bg-black/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,120,90,0.08)_0%,transparent_40%)]" />
        </div>

        {/* confetti canvas */}
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 w-full h-full" />

        {/* Center content */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-6 px-6"
          initial={{ scale: 0.7 }}
          animate={{ scale: [0.7, 1.05, 1] }}
          transition={{ type: 'spring', stiffness: 450, damping: 18, delay: 0.05 }}
        >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 2, 1] }}
              transition={{ delay: 0.06, duration: 0.5, ease: 'easeIn', times: [0, 0.12, 0.28, 1] }}
            >
              It's a Match!
            </motion.h2>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.05, type: 'spring', stiffness: 700, damping: 20 }}
            className="rounded-full p-1 bg-gradient-to-br from-pink-500 to-orange-400 shadow-xl"
          >
            <div className="rounded-full bg-white p-1">
              <img
                src={photo}
                alt="Matched profile"
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover"
                draggable={false}
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex mt-2">
            <button
              onClick={onView}
              className="px-6 py-2 rounded-full bg-white text-black font-semibold shadow-md transform-gpu transition-transform duration-300 ease-out hover:scale-110 active:scale-95"
              aria-label="View profile"
            >
              View profile
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
