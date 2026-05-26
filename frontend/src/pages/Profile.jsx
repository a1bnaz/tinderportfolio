import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

// Update links here in one place if they ever change.
const LINKS = {
  profileGitHub: 'https://github.com/a1bnaz',
  profileLinkedIn: 'https://www.linkedin.com/in/albertnazareno/',
  profileEmail: 'mailto:albertnazareno6@gmail.com',
  profileInstagram: 'https://instagram.com/albertetccc',
  projectOneGitHub: 'https://github.com/a1bnaz/tinderportfolio',
  projectOneLive: 'https://albertspersonalportfolio.vercel.app',
  projectTwoGitHub: 'https://github.com/a1bnaz/AI-Reflection-Insight-Web-App',
  projectTwoLive: 'https://aireflection.vercel.app/login',
};

export default function Profile({ photo, name = 'Albert', age = 28 }) {
  const [isDark, setIsDark] = useState(false);

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

  const safeEmblaRef = useCallback(
    (node) => {
      if (!emblaRef) return;
      if (typeof emblaRef === 'function') {
        if (!node) return emblaRef(node);
        if (node.firstElementChild) return emblaRef(node);
        Promise.resolve().then(() => emblaRef(node));
        return;
      }
      if (emblaRef && typeof emblaRef === 'object') {
        emblaRef.current = node;
      }
    },
    [emblaRef]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

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

  return (
    <div className={`min-h-screen overflow-hidden bg-[#0b0b0d] ${isDark ? 'text-white' : 'text-black'}`}>
      <div className="mx-auto w-full max-w-2xl min-h-screen flex flex-col">
        <div className="relative h-[46vh] w-full overflow-hidden bg-neutral-950">
          {/* Photo carousel */}
          <div className="embla h-full w-full touch-pan-y select-none" ref={safeEmblaRef}>
            <div className="embla__container flex h-full will-change-transform">
              {photos.map((photo, index) => (
                <div className="embla__slide relative flex-[0_0_100%] min-w-0 h-full" key={photo}>
                  <img
                    src={photo}
                    alt={`Profile photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Slide indicator bars */}
          <div className="absolute top-2.5 left-3 right-3 z-20 flex gap-0.5 pointer-events-none">
            {photos.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? 'bg-white/95' : 'bg-white/35'
                }`}
              />
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/55 to-transparent pointer-events-none" />
          {/* Theme toggle placed on photo bottom-left */}
            <div className="absolute left-4 bottom-4 z-30">
            <button
              aria-label="Toggle theme"
              onClick={() => setIsDark((d) => !d)}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transform-gpu transition transition-transform transition-shadow duration-300 ease-out hover:scale-110 active:scale-95 hover:shadow-xl hover:brightness-95 active:brightness-90 cursor-pointer ${
                isDark ? 'bg-white/10 text-white' : 'bg-white text-black'
              }`}
            >
              {isDark ? '🌙' : '☀️'}
            </button>
          </div>

          {/* Email/chat button on photo bottom-right */}
          <div className="absolute right-4 bottom-4 z-30">
            <a
              href={LINKS.profileEmail}
              aria-label="Email"
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transform-gpu transition transition-transform transition-shadow duration-300 ease-out hover:scale-110 active:scale-95 hover:shadow-xl hover:brightness-95 active:brightness-90 cursor-pointer ${
                isDark ? 'bg-white/10 text-white' : 'bg-white text-black'
              }`}
            >
              ✉️
            </a>
          </div>
        </div>

        <div className={`flex-1 overflow-auto px-5 sm:px-6 py-6 ${isDark ? 'bg-[#0b0b0d]' : 'bg-white'}`}>
          <div className="max-w-xl mx-auto">
            {/* Name, Age */}
            <div className="mb-4">
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{name}, {age}</h1>
            </div>

            {/* Job / School / Location */}
            <div className={`mb-6 space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
              <div className="flex items-center gap-2">
                <span>💼</span>
                <span>Student</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎓</span>
                <span>George Mason University</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>Fairfax, VA</span>
              </div>
            </div>

            {/* About Me */}
            <div className="mb-6">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'} mb-2`}>About Me</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed`}>
                i'm a rising third year computer science student at george mason university and since i didn't get an internship this summer i decided to take matters into my own hands.
              </p>
            </div>

            <div className={`my-4 border-t ${isDark ? 'border-white/8' : 'border-gray-200'} w-[calc(100%+2.5rem)] sm:w-[calc(100%+3rem)] -mx-5 sm:-mx-6`} />

            {/* My Interests */}
            <div className="mb-8">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'} mb-3`}>My Interests</h2>
              <div className="flex flex-wrap gap-3">
                {['🧑‍🍳 Cooking', '🏋️‍♀️ Gym', '🏀 Basketball', '✈️ Traveling', '📚 Reading'].map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition duration-200 ease-out hover:brightness-95 active:brightness-90 transform-gpu ${
                      isDark ? 'bg-white/6 text-white/90 border-white/8' : 'bg-white text-gray-800 border-gray-200'
                    } border`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={`my-4 border-t ${isDark ? 'border-white/8' : 'border-gray-200'} w-[calc(100%+2.5rem)] sm:w-[calc(100%+3rem)] -mx-5 sm:-mx-6`} />

            {/* Projects Section */}
            <div className="mb-6">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'} mb-3`}>My Projects</h2>
              <div className="flex flex-col gap-4">
                <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} rounded-lg p-6 border backdrop-blur-sm transform-gpu transition-transform duration-200 hover:scale-[1.02]`}>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🎨</div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3">
                        <h3 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>Tinder Portfolio</h3>
                      </div>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mt-3`}>
                        you're looking at it.
                      </p>

                      <div className="mt-4 flex gap-2 flex-nowrap">
                        <a
                          href={LINKS.projectOneGitHub}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm ${isDark ? 'bg-white/6 text-white' : 'bg-gray-100 text-gray-800'} border transition hover:brightness-95 active:brightness-90 cursor-pointer`}
                          aria-label="Project GitHub"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.468-2.382 1.235-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .322.216.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          <span className="text-sm font-medium">View on GitHub</span>
                        </a>

                        <a
                          href={LINKS.projectOneLive}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm ${isDark ? 'bg-white/6 text-white' : 'bg-gray-100 text-gray-800'} border transition hover:brightness-95 active:brightness-90 cursor-pointer`}
                          aria-label="Live demo"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" />
                          </svg>
                          <span className="text-sm font-medium">View Live</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} rounded-lg p-6 border backdrop-blur-sm transform-gpu transition-transform duration-200 hover:scale-[1.02]`}>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🧠</div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3">
                        <h3 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-black'}`}>AI Reflection & Insight</h3>
                      </div>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mt-3`}>
                        an ai-powered journal that reads your entries and tells you how you're feeling. built w/ react, springboot, and jwt authentication.
                      </p>

                      <div className="mt-4 flex gap-2 flex-nowrap">
                        <a
                          href={LINKS.projectTwoGitHub}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm ${isDark ? 'bg-white/6 text-white' : 'bg-gray-100 text-gray-800'} border transition hover:brightness-95 active:brightness-90 cursor-pointer`}
                          aria-label="Project GitHub"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.468-2.382 1.235-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .322.216.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          <span className="text-sm font-medium">View on GitHub</span>
                        </a>

                        <a
                          href={LINKS.projectTwoLive}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm ${isDark ? 'bg-white/6 text-white' : 'bg-gray-100 text-gray-800'} border transition hover:brightness-95 active:brightness-90 cursor-pointer`}
                          aria-label="Live demo"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" />
                          </svg>
                          <span className="text-sm font-medium">View Live</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`my-4 border-t ${isDark ? 'border-white/8' : 'border-gray-200'} w-[calc(100%+2.5rem)] sm:w-[calc(100%+3rem)] -mx-5 sm:-mx-6`} />

            {/* Currently Working On */}
            <div className="mb-8">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'} mb-3`}>Currently working on...</h2>
              <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} rounded-lg p-6 border backdrop-blur-sm`}>
                <ul className={`list-disc pl-5 space-y-4 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>data structures and algorithms</li>
                  <li>building projects</li>
                  <li>
                    making videos
                    <a
                      href={LINKS.profileInstagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="inline-flex items-center ml-2 text-current hover:brightness-95"
                    >
                      <span className="font-bold underline">@albertetccc</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className={`my-4 border-t ${isDark ? 'border-white/8' : 'border-gray-200'} w-[calc(100%+2.5rem)] sm:w-[calc(100%+3rem)] -mx-5 sm:-mx-6`} />

            {/* Connect with Me (GitHub, LinkedIn, Email) */}
            <div className="mb-12">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'} mb-3`}>Connect with Me</h2>
              <div className="flex gap-4">
                <a
                  href={LINKS.profileGitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transform-gpu transition duration-300 transition-transform transition-shadow ease-out hover:scale-110 active:scale-95 hover:shadow-xl hover:brightness-95 active:brightness-90 cursor-pointer border ${isDark ? 'bg-white/6 border-white/8 text-white' : 'bg-white border-gray-200 text-gray-800'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.468-2.382 1.235-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .322.216.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>

                <a
                  href={LINKS.profileLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transform-gpu transition duration-300 transition-transform transition-shadow ease-out hover:scale-110 active:scale-95 hover:shadow-xl hover:brightness-95 active:brightness-90 cursor-pointer border ${isDark ? 'bg-white/6 border-white/8 text-white' : 'bg-white border-gray-200 text-gray-800'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.938v5.668H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.603 0 4.269 2.372 4.269 5.456v6.287zM5.337 7.433a2.066 2.066 0 1 1 0-4.133 2.066 2.066 0 0 1 0 4.133zM7.119 20.452H3.555V9h3.564v11.452z"/>
                  </svg>
                </a>

                <a
                  href={LINKS.profileInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transform-gpu transition duration-300 transition-transform transition-shadow ease-out hover:scale-110 active:scale-95 hover:shadow-xl hover:brightness-95 active:brightness-90 cursor-pointer border ${isDark ? 'bg-white/6 border-white/8 text-white' : 'bg-white border-gray-200 text-gray-800'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17.5 6.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
                  </svg>
                </a>

                <a
                  href={LINKS.profileEmail}
                  aria-label="Email"
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transform-gpu transition duration-300 transition-transform transition-shadow ease-out hover:scale-110 active:scale-95 hover:shadow-xl hover:brightness-95 active:brightness-90 cursor-pointer border ${isDark ? 'bg-white/6 border-white/8 text-white' : 'bg-white border-gray-200 text-gray-800'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="h-10 sm:h-12" />
          </div>
        </div>
      </div>
      {/* fixed toggle removed (duplicate) */}
    </div>
  );
}
