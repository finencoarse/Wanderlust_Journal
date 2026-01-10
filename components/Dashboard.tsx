import React, { useState } from 'react';
import { Trip, Language, Photo } from '../types';
import { translations } from '../translations';

interface DashboardProps {
  trips: Trip[];
  onOpenTrip: (id: string) => void;
  onUpdateTrip: (trip: Trip) => void;
  onAddTrip?: (trip: Trip) => void;
  language: Language;
  darkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ trips, onOpenTrip, onUpdateTrip, onAddTrip, language, darkMode }) => {
  const t = translations[language];
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const pinnedTrips = trips.filter(t => t.isPinned);
  const regularTrips = trips.filter(t => !t.isPinned);
  const favoritePhotos: { tripId: string, photo: Photo }[] = trips.flatMap(trip => 
    trip.photos.filter(p => p.isFavorite).map(p => ({ tripId: trip.id, photo: p }))
  );

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleShare = (e: React.MouseEvent, trip: Trip) => {
    e.stopPropagation();
    const duration = Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24));
    const summary = `🌍 Journey: ${trip.title}\n📍 Location: ${trip.location}\n📅 Dates: ${trip.startDate} to ${trip.endDate} (${duration} days)\n\nRelived with Wanderlust Journal.`;
    navigator.clipboard.writeText(summary);
    triggerToast(t.copied);
  };

  const handleTogglePin = (e: React.MouseEvent, trip: Trip) => {
    e.stopPropagation();
    onUpdateTrip({ ...trip, isPinned: !trip.isPinned });
  };

  // Fixed: Explicitly typed as React.FC to allow 'key' prop when used in map functions
  const TripCard: React.FC<{ trip: Trip, pinned?: boolean }> = ({ trip, pinned }) => (
    <div 
      onClick={() => onOpenTrip(trip.id)}
      className="group cursor-pointer relative mb-6"
    >
      <div className={`relative overflow-hidden rounded-[2rem] aspect-[16/10] sm:aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 shadow-lg transition-all duration-300 group-active:scale-98 ${pinned ? 'ring-4 ring-indigo-500/20' : ''}`}>
        <img 
          src={trip.coverImage} 
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* The Black Bracket Overlay with White/Bright words */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end justify-between p-6">
          <div className="space-y-1">
            <h3 className="text-white text-2xl font-black tracking-tight drop-shadow-md">
              {trip.title}
            </h3>
            <p className="text-white/80 text-sm font-bold tracking-tight">
              {trip.location}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={(e) => handleShare(e, trip)}
              className="p-3 rounded-2xl bg-white/20 backdrop-blur-xl text-white hover:bg-white hover:text-black transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-2.684 3 3 0 000 2.684zm0 12.684a3 3 0 100-2.684 3 3 0 000 2.684z"/></svg>
            </button>
            <button 
              onClick={(e) => handleTogglePin(e, trip)}
              className={`p-3 rounded-2xl backdrop-blur-xl transition-all ${trip.isPinned ? 'bg-indigo-600 text-white' : 'bg-white/20 text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
            </button>
          </div>
        </div>

        {trip.isPinned && (
          <div className="absolute top-4 left-4 bg-indigo-600 text-white p-2 rounded-xl shadow-xl border border-white/20">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/></svg>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {pinnedTrips.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black tracking-tight uppercase text-indigo-600 dark:text-indigo-400">{t.pinnedSection}</h2>
            <div className="h-px bg-indigo-100 dark:bg-indigo-900/30 flex-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pinnedTrips.map(trip => <TripCard key={trip.id} trip={trip} pinned />)}
          </div>
        </section>
      )}

      {favoritePhotos.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black tracking-tight uppercase text-indigo-600 dark:text-indigo-400">{t.highlightsSection}</h2>
            <div className="h-px bg-indigo-100 dark:bg-indigo-900/30 flex-1" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x -mx-4 px-4">
            {favoritePhotos.map(({ tripId, photo }) => (
              <div 
                key={photo.id} 
                onClick={() => onOpenTrip(tripId)}
                className="relative min-w-[280px] h-[360px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-xl snap-center"
              >
                <img src={photo.url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end">
                  <p className="text-white font-black text-lg line-clamp-2 mb-2 leading-tight">{photo.caption}</p>
                  <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em]">{new Date(photo.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-8 pb-12">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight">{t.pastAdventures}</h2>
          <p className="text-zinc-500 font-bold text-sm">{t.reliveMemories}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}

          <div className="border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2rem] aspect-[16/10] flex flex-col items-center justify-center p-8 text-center active:bg-zinc-100 dark:active:bg-zinc-900 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="font-black text-lg text-zinc-900 dark:text-zinc-100 tracking-tight">{t.addJourney}</p>
          </div>
        </div>
      </section>

      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-6 py-3 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-6 flex items-center gap-3 z-50">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
          <span className="text-sm font-black tracking-tight">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;