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
    <div className="w-full h-full flex flex-col items-center justify-start pt-10 px-6">
      {/* iOS Home Screen Grid */}
      <div className="grid grid-cols-4 gap-6 w-full max-w-xs">
        {apps.map((app, index) => {
          const Icon = app.icon;
          return (
            <button
              key={index}
              onClick={app.onClick}
              className="flex flex-col items-center gap-2 group"
            >
              {/* App Icon with iOS style */}
              <div className={`w-20 h-20 bg-gradient-to-br ${app.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-200 group-active:scale-95`}>
                <Icon className="w-10 h-10 text-white drop-shadow" />
              </div>
              
              {/* App Label */}
              <span className="text-xs text-gray-900 font-semibold text-center line-clamp-2 w-20">{app.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
