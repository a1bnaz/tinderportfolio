import { Flame, Calculator, FileText, Mail, Cloud, Settings } from 'lucide-react';

export default function TinderAppIcon({ onClick }) {
  const apps = [
    { icon: FileText, label: 'Notes', color: 'from-yellow-300 to-yellow-500' },
    { icon: Flame, label: 'Tinder', color: 'from-orange-400 to-orange-600', onClick },
    { icon: Calculator, label: 'Calculator', color: 'from-slate-400 to-slate-600' },
    { icon: Mail, label: 'Mail', color: 'from-red-400 to-red-600' },
    { icon: Cloud, label: 'Weather', color: 'from-blue-400 to-blue-600' },
    { icon: Settings, label: 'Settings', color: 'from-gray-500 to-gray-700' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-start pt-8 px-4 sm:px-6">
      {/* iOS Home Screen Grid */}
      <div className="grid grid-cols-4 gap-x-2.5 gap-y-4 sm:gap-x-4 sm:gap-y-5 w-full max-w-xs">
        {apps.map((app, index) => {
          const Icon = app.icon;
          return (
            <button
              key={index}
              onClick={app.onClick}
              className="flex flex-col items-center gap-1.5 sm:gap-2 group"
            >
              {/* App Icon with iOS style */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${app.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md sm:shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200 group-active:scale-95`}>
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow" />
              </div>
              
              {/* App Label */}
              <span className="text-[10px] sm:text-xs text-gray-900 font-semibold text-center leading-tight line-clamp-2 w-14 sm:w-16">{app.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
