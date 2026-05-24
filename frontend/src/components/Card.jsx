import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Flame, Heart, Search, Settings, Sparkles, UserRound, MessageCircle, X } from 'lucide-react';

export default function Card() {
  const photos = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=700&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=700&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=700&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=700&fit=crop',
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    skipSnaps: false,
    duration: 28,
    dragThreshold: 8,
  });
  // Wrap the embla ref to ensure the viewport node has its inner container
  // available before the embla hook initializes (avoids `container.children` undefined).
  const safeEmblaRef = useCallback(
    (node) => {
      if (!emblaRef) return;

      // If emblaRef is a function (callback ref) call it directly.
      if (typeof emblaRef === 'function') {
        if (!node) return emblaRef(node);

        // If the viewport already has its first child (the container), initialize immediately.
        if (node.firstElementChild) return emblaRef(node);

        // Otherwise schedule a microtask to attempt initialization after children mount.
        // This prevents embla from trying to access `container.children` when undefined.
        Promise.resolve().then(() => emblaRef(node));
        return;
      }

      // If emblaRef is an object ref, set current directly.
      if (emblaRef && typeof emblaRef === 'object') {
        emblaRef.current = node;
      }
    },
    [emblaRef]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isXShaking, setIsXShaking] = useState(false);
  const [isXCooldown, setIsXCooldown] = useState(false);
  const timeoutsRef = useRef([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  const playErrorSound = useCallback(async () => {
    if (typeof window === 'undefined') return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();

    try {
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
    } catch {
      return;
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 0.12);
    oscillator.frequency.exponentialRampToValueAtTime(160, audioContext.currentTime + 0.22);

    gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.09, audioContext.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.24);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.25);

    oscillator.onended = () => {
      audioContext.close().catch(() => {});
    };
  }, []);

  const handleXClick = useCallback(() => {
    if (isXCooldown) return;

    setIsXShaking(true);
    setIsXCooldown(true);
    playErrorSound();

    const shakeTimeout = setTimeout(() => setIsXShaking(false), 450);
    const cooldownTimeout = setTimeout(() => setIsXCooldown(false), 1200);

    timeoutsRef.current.push(shakeTimeout, cooldownTimeout);
  }, [isXCooldown, playErrorSound]);

  return (
    <div className="w-full h-full relative flex flex-col overflow-hidden bg-white">
      <style>{`
        @keyframes card-shake {
          0% { transform: translateX(0) rotate(0deg); }
          15% { transform: translateX(-3px) rotate(-4deg); }
          30% { transform: translateX(3px) rotate(4deg); }
          45% { transform: translateX(-3px) rotate(-3deg); }
          60% { transform: translateX(2px) rotate(2deg); }
          75% { transform: translateX(-2px) rotate(-2deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
      `}</style>
      {/* App Bar */}
      <div className="h-11 w-full px-4 flex items-center justify-between bg-white border-b border-black/5 z-30">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
            <Flame className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent tracking-wide">tinder</span>
        </div>

        <button
          type="button"
          disabled
          aria-label="Settings"
          className="w-8 h-8 rounded-full flex items-center justify-center text-black/25 bg-black/5 cursor-not-allowed"
        >
          <Settings className="w-4.5 h-4.5" strokeWidth={2.25} />
        </button>
      </div>

      {/* Image Section */}
      <div className="relative flex-[0.84] w-full bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden rounded-b-[20px] shadow-[0_8px_14px_rgba(0,0,0,0.09)]">
        <div className="pointer-events-none absolute inset-x-3 bottom-[-9px] h-12 rounded-[20px] bg-white/92 shadow-[0_5px_12px_rgba(0,0,0,0.08)] border border-black/5" />
        {/* Photo carousel */}
        <div className="embla h-full w-full touch-pan-y select-none" ref={safeEmblaRef}>
          <div className="embla__container flex h-full will-change-transform">
            {photos.map((photo, index) => (
              <div className="embla__slide relative flex-[0_0_100%] min-w-0 h-full" key={photo}>
                <img
                  src={photo}
                  alt={`Profile photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Slide indicator bars */}
        <div className="absolute top-2.5 left-3 right-3 z-20 flex gap-0.5">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                index === selectedIndex ? 'bg-white/95' : 'bg-white/35'
              }`}
            />
          ))}
        </div>

        {/* Active badge moved below (positioned relative to name) */}

        {/* Gradient Overlay for text */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/35 to-transparent h-44" />

        {/* Name and Title (badge positioned relative to this block) */}
        <div className="absolute bottom-8 left-0 right-0 px-4 z-10">
          <div className="relative">
            <span className="absolute left-0 top-0 -translate-y-6 transform inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold shadow-sm border border-emerald-200">Active</span>
            <h2 className="text-4xl text-white">
              <span className="font-bold">Albert</span>
              <span className="font-normal text-white/90 ml-2">, 19</span>
            </h2>
            <p className="text-gray-100 text-base mt-1">Student</p>
          </div>
        </div>
      </div>

      {/* Actions + whitespace section */}
      <div className="relative flex-[0.16] w-full bg-white pt-2 px-5 pb-2">
        <div className="flex gap-6 justify-center -mt-9 relative z-20">
          {/* Pass Button */}
          <button
            type="button"
            onClick={handleXClick}
            className="w-16 h-16 rounded-full bg-white hover:bg-white transition-transform duration-300 ease-out transform-gpu hover:scale-110 hover:-rotate-12 active:scale-95 active:rotate-0 flex items-center justify-center shadow-lg hover:shadow-xl border border-black/5 cursor-pointer"
            style={{ animation: isXShaking ? 'card-shake 0.45s ease-in-out' : 'none', opacity: isXCooldown ? 0.92 : 1 }}
            aria-label="Pass"
          >
            <X className="w-8 h-8 text-red-500" strokeWidth={4} />
          </button>

          {/* Like Button */}
          <button className="w-16 h-16 rounded-full bg-white hover:bg-white transition-transform duration-300 ease-out transform-gpu hover:scale-110 hover:rotate-12 active:scale-95 active:rotate-0 flex items-center justify-center shadow-lg hover:shadow-xl border border-black/5 cursor-not-allowed">
            <Heart className="w-8 h-8 text-green-500 fill-green-500" strokeWidth={3} />
          </button>
        </div>

        {/* Bottom nav */}
        <div className="mt-4 flex items-center justify-between px-2">
          <button type="button" aria-label="Home" className="flex items-center justify-center text-pink-500 cursor-pointer transition-transform duration-300 ease-out transform-gpu hover:scale-125 hover:-rotate-12 active:scale-95 active:rotate-0">
            <Flame className="w-6 h-6 fill-pink-500 transition-transform duration-300 ease-out" strokeWidth={2.4} />
          </button>

          <button type="button" aria-label="Explore" className="flex items-center justify-center text-black/30 cursor-not-allowed">
            <Sparkles className="w-6 h-6" strokeWidth={2.2} />
          </button>

          <button type="button" aria-label="Search" className="relative flex items-center justify-center text-black/30 cursor-not-allowed">
            <Search className="w-6 h-6" strokeWidth={2.2} />
            <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>

          <button type="button" aria-label="Messages" className="flex items-center justify-center text-black/30 cursor-not-allowed">
            <MessageCircle className="w-6 h-6" strokeWidth={2.2} />
          </button>

          <button type="button" aria-label="Profile" className="flex items-center justify-center text-black/30 cursor-not-allowed">
            <UserRound className="w-6 h-6" strokeWidth={2.2} />
          </button>
        </div>
      </div>

    </div>
  );
}
