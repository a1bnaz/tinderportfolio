import { useState } from 'react';
import Card from '../components/Card';
import Phone from '../components/Phone';
import TinderAppIcon from '../components/TinderAppIcon';
import Match from './Match';
import Profile from './Profile';

export default function CardScreen() {
  const [appOpen, setAppOpen] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop');

  return (
    <div className="min-h-dvh bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-2 sm:p-4">
      <Phone>
        {showProfile ? (
          <Profile photo={profilePhoto} name="Albert" age={28} onBack={() => setShowProfile(false)} />
        ) : showMatch ? (
          <Match
            photo={profilePhoto}
            onView={() => {
              setShowMatch(false);
              setShowProfile(true);
            }}
            onClose={() => setShowMatch(false)}
          />
        ) : appOpen ? (
          <Card onMatch={() => setShowMatch(true)} />
        ) : (
          <TinderAppIcon onClick={() => setAppOpen(true)} />
        )}
      </Phone>
    </div>
  );
}
