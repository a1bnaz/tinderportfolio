import { useState, useEffect } from 'react';
import { Signal, Wifi, Battery } from 'lucide-react';

export default function Phone({ children }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center w-full">
      {/* Phone Container */}
      <div
        className="relative"
        style={{
          width: 'min(380px, calc(100vw - 1rem), calc((100dvh - 1rem) * 9 / 19.5))',
          aspectRatio: '9/19.5',
        }}
      >
        {/* Outer black bezel/frame */}
        <div className="absolute inset-0 bg-black rounded-[40px] sm:rounded-[50px] shadow-2xl" />
        
        {/* Inner padding to create bezel effect */}
        <div className="absolute inset-0 p-2.5 sm:p-3.5 rounded-[40px] sm:rounded-[50px]">
          {/* Screen with notch */}
          <div className="relative w-full h-full bg-white rounded-[36px] sm:rounded-[48px] overflow-hidden flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-36 h-6 sm:h-8 bg-black rounded-b-3xl z-10" />
            
            {/* Status Bar */}
            <div className="relative h-10 bg-white flex items-center justify-between px-5 sm:px-6 text-black text-xs font-semibold pt-2 border-b border-black/5">
              <span>{time}</span>
              <div className="flex gap-2">
                <Signal className="w-4 h-4" />
                <Wifi className="w-4 h-4" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden flex flex-col relative z-10 bg-white">
              {children}
            </div>

            {/* Home Indicator */}
            <div className="h-7 bg-white flex items-center justify-center pb-1 border-t border-black/5 shrink-0">
              <div className="w-24 sm:w-32 h-1 bg-black rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
