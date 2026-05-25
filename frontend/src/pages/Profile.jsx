import { useCallback } from 'react';

export default function Profile({ photo, name = 'Albert', age = 28, onBack }) {
  const handleBack = useCallback(() => {
    if (onBack) onBack();
  }, [onBack]);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="h-12 flex items-center px-3 border-b border-black/5">
        <button onClick={handleBack} className="text-sm text-blue-600">Back</button>
      </div>

      <div className="flex-1 overflow-auto p-6 flex flex-col items-center gap-4">
        <div className="rounded-full overflow-hidden w-36 h-36 shadow-lg">
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-bold">{name}, {age}</h1>
        <p className="text-center text-gray-600 max-w-xs">This is the profile screen placeholder (screen 3). Add more details here.</p>
        <div className="mt-4 w-full max-w-md">
          <button className="w-full py-2 rounded-full bg-pink-500 text-white font-semibold">Send Message</button>
        </div>
      </div>
    </div>
  );
}
