import { useState } from 'react';
import Card from '../components/Card';
import Phone from '../components/Phone';
import TinderAppIcon from '../components/TinderAppIcon';
import Match from './Match';
import Profile from './Profile';
import { profilePhoto1 } from '../lib/profilePhotos';

export default function CardScreen() {
  const [appOpen, setAppOpen] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(profilePhoto1 || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop');

  const startProfileTransition = () => {
    // fade to black, then swap to profile view, then fade back in
    setOverlayActive(true);
    // after half of the fade (250ms), swap screens
    setTimeout(() => {
      setShowMatch(false);
      setShowProfile(true);
    }, 250);

    // after full fade (500ms) hide overlay
    setTimeout(() => setOverlayActive(false), 500);
  };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-2 sm:p-4 relative">
      {/* fullscreen fade overlay used during transition */}
      <div
        aria-hidden
        className={`pointer-events-none transition-opacity duration-300 absolute inset-0 z-50 bg-black ${overlayActive ? 'opacity-100' : 'opacity-0'}`}
      />

      {showProfile ? (
        // render Profile full-window (outside Phone)
        <div className="w-full min-h-screen">
          <Profile photo={profilePhoto} name="Albert" age={19} onBack={() => setShowProfile(false)} />
        </div>
      ) : (
        <Phone>
          {showMatch ? (
            <Match
              photo={profilePhoto}
              onView={startProfileTransition}
            />
          ) : appOpen ? (
            <Card onMatch={() => setShowMatch(true)} />
          ) : (
            <TinderAppIcon onClick={() => setAppOpen(true)} />
          )}
        </Phone>
      )}
    </div>
  );
}
