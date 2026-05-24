import { useState } from 'react';
import Card from '../components/Card';
import Phone from '../components/Phone';
import TinderAppIcon from '../components/TinderAppIcon';

export default function CardScreen() {
  const [appOpen, setAppOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-2 sm:p-4">
      <Phone>
        {appOpen ? (
          <Card />
        ) : (
          <TinderAppIcon onClick={() => setAppOpen(true)} />
        )}
      </Phone>
    </div>
  );
}
