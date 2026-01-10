import React, { useState, useEffect } from 'react';
import { Trip, ViewState, Photo, Language, UserProfile, CustomEvent, Memo } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TripDetail from './components/TripDetail';
import Planner from './components/Planner';
import Calendar from './components/Calendar';
import Memos from './components/Memos';
import ImageEditor from './components/ImageEditor';
import Settings from './components/Settings';
import Onboarding from './components/Onboarding';
import UserGuide from './components/UserGuide';
import { translations } from './translations';

const INITIAL_TRIPS: Trip[] = [
  {
    id: '1',
    title: 'Autumn in Kyoto',
    location: 'Kyoto, Japan',
    startDate: '2023-11-10',
    endDate: '2023-11-20',
    description: 'A serene walk through the golden temples and maple-covered hills of Kyoto.',
    status: 'past',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
    photos: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=800&auto=format&fit=crop', caption: 'Kinkaku-ji at dusk', date: '2023-11-12', tags: ['Traveler A'], isFavorite: true, type: 'image' },
      { id: 'p2', url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop', caption: 'Nature hike', date: '2023-11-13', tags: [], type: 'image' },
    ],
    comments: [],
    rating: 5,
    dayRatings: { '2023-11-12': 5, '2023-11-13': 4 },
    isPinned: true,
    favoriteDays: ['2023-11-12'],
    budget: 3500,
    itinerary: {}
  }
];

const DEFAULT_PROFILE: UserProfile = {
  name: 'Wanderer',
  pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wanderer',
  nationality: 'United States',
  isOnboarded: false
};

const App: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('wanderlust_trips');
    return saved ? JSON.parse(saved) : INITIAL_TRIPS;
  });
  
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('wanderlust_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [customEvents, setCustomEvents] = useState<CustomEvent[]>(() => {
    const saved = localStorage.getItem('wanderlust_events');
    return saved ? JSON.parse(saved) : [];
  });

  const [memos, setMemos] = useState<Memo[]>(() => {
    const saved = localStorage.getItem('wanderlust_memos');
    return saved ? JSON.parse(saved) : [];
  });

  const [view, setView] = useState<ViewState>(() => {
    const savedProfile = localStorage.getItem('wanderlust_profile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      return parsed.isOnboarded ? 'dashboard' : 'onboarding';
    }
    return 'onboarding';
  });

  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<{ tripId: string, photo: Photo } | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('wanderlust_lang') as Language) || 'en';
  });
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('wanderlust_dark') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('wanderlust_trips', JSON.stringify(trips));
    localStorage.setItem('wanderlust_profile', JSON.stringify(userProfile));
    localStorage.setItem('wanderlust_events', JSON.stringify(customEvents));
    localStorage.setItem('wanderlust_memos', JSON.stringify(memos));
    localStorage.setItem('wanderlust_lang', language);
    localStorage.setItem('wanderlust_dark', darkMode.toString());
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [trips, userProfile, customEvents, memos, language, darkMode]);

  const activeTrip = trips.find(t => t.id === activeTripId) || null;
  const t = translations[language];

  const handleUpdateTrip = (updatedTrip: Trip) => {
    setTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t));
  };

  const handleCombineTrips = (selectedTripIds: string[]) => {
    if (selectedTripIds.length < 2) return;
    const selectedTrips = trips.filter(t => selectedTripIds.includes(t.id)).sort((a, b) => a.startDate.localeCompare(b.startDate));
    
    const combinedTrip: Trip = {
      id: `combined-${Date.now()}`,
      title: `Multi-Country: ${selectedTrips.map(t => t.title).join(' & ')}`,
      location: selectedTrips.map(t => t.location).join(', '),
      startDate: selectedTrips[0].startDate,
      endDate: selectedTrips[selectedTrips.length - 1].endDate,
      description: `Combined journey covering ${selectedTrips.length} regions.`,
      status: 'future',
      coverImage: selectedTrips[0].coverImage,
      photos: [],
      comments: [],
      rating: 0,
      dayRatings: {},
      budget: selectedTrips.reduce((sum, t) => sum + (t.budget || 0), 0),
      itinerary: selectedTrips.reduce((acc, t) => ({ ...acc, ...t.itinerary }), {}),
    };

    setTrips(prev => [...prev.filter(t => !selectedTripIds.includes(t.id)), combinedTrip]);
    setActiveTripId(combinedTrip.id);
    setView('trip-detail');
  };

  const openTrip = (id: string) => {
    setActiveTripId(id);
    setView('trip-detail');
  };

  if (view === 'onboarding') {
    return (
      <Onboarding 
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        onComplete={() => {
          setUserProfile(prev => ({ ...prev, isOnboarded: true }));
          setView('dashboard');
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-300 ${darkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'}`}>
      <Header setView={setView} currentView={view} language={language} darkMode={darkMode} userProfile={userProfile} onShowGuide={() => setShowGuide(true)} />
      
      <main className="max-w-4xl mx-auto px-4 py-6 md:py-12">
        {view === 'dashboard' && <Dashboard trips={trips.filter(t => t.status === 'past')} onOpenTrip={openTrip} onUpdateTrip={handleUpdateTrip} language={language} darkMode={darkMode} />}
        {view === 'trip-detail' && activeTrip && <TripDetail trip={activeTrip} onUpdate={handleUpdateTrip} onEditPhoto={(photo) => { setEditingPhoto({ tripId: activeTrip.id, photo }); setView('editor'); }} onBack={() => setView('dashboard')} language={language} darkMode={darkMode} userProfile={userProfile} />}
        {view === 'planner' && <Planner trips={trips.filter(t => t.status === 'future')} onAddTrip={(t) => setTrips([...trips, t])} onUpdateTrip={handleUpdateTrip} onOpenTrip={openTrip} language={language} darkMode={darkMode} userProfile={userProfile} customEvents={customEvents} onUpdateEvents={setCustomEvents} />}
        {view === 'calendar' && <Calendar trips={trips} customEvents={customEvents} language={language} darkMode={darkMode} userProfile={userProfile} onOpenTrip={openTrip} onUpdateEvents={setCustomEvents} onCombineTrips={handleCombineTrips} />}
        {view === 'memos' && <Memos memos={memos} setMemos={setMemos} language={language} darkMode={darkMode} />}
        {view === 'editor' && editingPhoto && activeTrip && <ImageEditor photo={editingPhoto.photo} trip={activeTrip} onSave={(url, type) => { setTrips(trips.map(t => t.id === editingPhoto.tripId ? { ...t, photos: t.photos.map(p => p.id === editingPhoto.photo.id ? { ...p, url, type: type || p.type } : p) } : t)); setView('trip-detail'); setEditingPhoto(null); }} onCancel={() => setView('trip-detail')} darkMode={darkMode} language={language} />}
        {view === 'settings' && <Settings language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} onBack={() => setView('dashboard')} userProfile={userProfile} setUserProfile={setUserProfile} />}
      </main>

      {showGuide && <UserGuide onClose={() => setShowGuide(false)} language={language} darkMode={darkMode} />}

      <nav className={`fixed bottom-0 left-0 right-0 border-t flex justify-around items-center h-20 safe-area-bottom z-50 transition-all duration-300 ${darkMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white/90 border-zinc-200'} backdrop-blur-xl shadow-[0_-8px_30px_rgb(0,0,0,0.04)]`}>
        {[
          { id: 'dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: t.journal },
          { id: 'planner', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: t.planner },
          { id: 'calendar', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: t.calendar },
          { id: 'memos', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z', label: t.memos },
          { id: 'settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', label: t.settings }
        ].map(item => (
          <button 
            key={item.id} 
            onClick={() => setView(item.id as ViewState)} 
            className={`flex flex-col items-center justify-center w-full h-full transition-all active:scale-90 ${view === item.id ? (darkMode ? 'text-indigo-400' : 'text-indigo-600') : 'text-zinc-400'}`}
          >
            <div className={`p-1 rounded-full transition-all ${view === item.id ? (darkMode ? 'bg-indigo-400/10' : 'bg-indigo-600/5') : ''}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={view === item.id ? "2.5" : "2"} d={item.icon}/></svg>
            </div>
            <span className={`text-[10px] mt-1 font-black uppercase tracking-widest ${view === item.id ? 'opacity-100' : 'opacity-60'}`}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;