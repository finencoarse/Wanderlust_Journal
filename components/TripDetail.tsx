import React, { useState, useMemo, useRef } from 'react';
import { Trip, Photo, Language, UserProfile, ItineraryItem, FlightInfo, Comment } from '../types';
import { translations } from '../translations';

interface TripDetailProps {
  trip: Trip;
  onUpdate: (trip: Trip) => void;
  onEditPhoto: (photo: Photo) => void;
  onBack: () => void;
  language: Language;
  darkMode: boolean;
  userProfile: UserProfile;
}

const TripDetail: React.FC<TripDetailProps> = ({ trip, onUpdate, onEditPhoto, onBack, language, darkMode, userProfile }) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'itinerary' | 'album'>('itinerary');
  const [selectedDate, setSelectedDate] = useState<string>(trip.startDate);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [editingActualId, setEditingActualId] = useState<string | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [tempCaption, setTempCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [eventForm, setEventForm] = useState<Partial<ItineraryItem>>({
    type: 'sightseeing',
    time: '09:00',
    endTime: '10:00',
    period: undefined,
    title: '',
    description: '',
    url: '',
    estimatedExpense: 0,
    actualExpense: 0,
    currency: trip.defaultCurrency || '',
    spendingDescription: '',
    transportMethod: '',
    travelDuration: ''
  });

  const [flightForm, setFlightForm] = useState<FlightInfo>({
    code: '',
    gate: '',
    airport: '',
    transport: ''
  });

  const tripDays = useMemo(() => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const days = [];
    let curr = new Date(start);
    while (curr <= end) {
      days.push(curr.toISOString().split('T')[0]);
      curr.setDate(curr.getDate() + 1);
    }
    return days;
  }, [trip.startDate, trip.endDate]);

  const isFirstDay = selectedDate === trip.startDate;
  const isLastDay = selectedDate === trip.endDate;

  const currentDayEvents = useMemo(() => {
    const events = (trip.itinerary && trip.itinerary[selectedDate]) || [];
    return [...events].sort((a, b) => {
      const order = { morning: 1, afternoon: 2, night: 3, undefined: 4 };
      const periodA = a.period || 'undefined';
      const periodB = b.period || 'undefined';
      if (periodA !== periodB) return (order[periodA] || 4) - (order[periodB] || 4);
      if (a.time && b.time) return a.time.localeCompare(b.time);
      return 0;
    });
  }, [trip.itinerary, selectedDate]);

  const stats = useMemo(() => {
    const allItems = (Object.values(trip.itinerary || {}).flat() as ItineraryItem[]);
    const act = allItems.reduce((acc, curr) => acc + (curr.actualExpense || 0), 0);
    const est = allItems.reduce((acc, curr) => acc + (curr.estimatedExpense || 0), 0);
    return { act, est, remaining: (trip.budget || 0) - act };
  }, [trip.itinerary, trip.budget]);

  const handleOpenAddEvent = () => {
    setEditingEventId(null);
    setEventForm({
      type: 'sightseeing',
      time: '09:00',
      endTime: '10:00',
      period: undefined,
      title: '',
      description: '',
      url: '',
      estimatedExpense: 0,
      actualExpense: 0,
      currency: trip.defaultCurrency || '',
      spendingDescription: '',
      transportMethod: '',
      travelDuration: ''
    });
    setShowEventForm(true);
  };

  const handleOpenEditEvent = (item: ItineraryItem) => {
    setEditingEventId(item.id);
    setEventForm({ ...item, currency: item.currency || trip.defaultCurrency || '' });
    setShowEventForm(true);
  };

  const handleSaveEvent = () => {
    const updatedItinerary = { ...trip.itinerary };
    const dayEvents = [...(updatedItinerary[selectedDate] || [])];

    const itemData: ItineraryItem = {
      id: editingEventId || Math.random().toString(36).substr(2, 9),
      time: eventForm.period ? undefined : (eventForm.time || '09:00'),
      endTime: eventForm.period ? undefined : (eventForm.endTime || '10:00'),
      period: eventForm.period as any,
      type: eventForm.type as any || 'sightseeing',
      title: eventForm.title || 'New Event',
      description: eventForm.description || '',
      url: eventForm.url || '',
      estimatedExpense: Number(eventForm.estimatedExpense) || 0,
      actualExpense: Number(eventForm.actualExpense) || 0,
      currency: eventForm.currency || '',
      spendingDescription: eventForm.spendingDescription || '',
      transportMethod: eventForm.transportMethod || '',
      travelDuration: eventForm.travelDuration || ''
    };

    if (editingEventId) {
      const idx = dayEvents.findIndex(e => e.id === editingEventId);
      if (idx > -1) dayEvents[idx] = itemData;
    } else {
      dayEvents.push(itemData);
    }

    updatedItinerary[selectedDate] = dayEvents;

    // Auto-update trip default currency if the user provided one
    const latestCurrency = itemData.currency || trip.defaultCurrency;

    onUpdate({ 
      ...trip, 
      itinerary: updatedItinerary, 
      defaultCurrency: latestCurrency 
    });
    setShowEventForm(false);
  };

  const handleUpdateActualExpense = (itemId: string, value: string) => {
    const updatedItinerary = { ...trip.itinerary };
    const dayEvents = updatedItinerary[selectedDate] || [];
    const itemIndex = dayEvents.findIndex(e => e.id === itemId);
    if (itemIndex > -1) {
      dayEvents[itemIndex] = { ...dayEvents[itemIndex], actualExpense: Number(value) || 0 };
      updatedItinerary[selectedDate] = dayEvents;
      onUpdate({ ...trip, itinerary: updatedItinerary });
    }
  };

  const handleSaveFlight = () => {
    if (isFirstDay) {
      onUpdate({ ...trip, departureFlight: flightForm });
    } else if (isLastDay) {
      onUpdate({ ...trip, returnFlight: flightForm });
    }
    setShowFlightForm(false);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      const isVideo = file.type.startsWith('video/');
      reader.onload = (event) => {
        const newMedia: Photo = {
          id: Math.random().toString(36).substr(2, 9),
          url: event.target?.result as string,
          caption: isVideo ? 'New Video' : 'New Photo',
          date: new Date().toISOString().split('T')[0],
          tags: [],
          comments: [],
          isFavorite: false,
          type: isVideo ? 'video' : 'image'
        };
        onUpdate({ ...trip, photos: [...trip.photos, newMedia] });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleToggleFavorite = (photoId: string) => {
    const updatedPhotos = trip.photos.map(p => 
      p.id === photoId ? { ...p, isFavorite: !p.isFavorite } : p
    );
    onUpdate({ ...trip, photos: updatedPhotos });
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto({ ...selectedPhoto, isFavorite: !selectedPhoto.isFavorite });
    }
  };

  const handleUpdateCaption = () => {
    if (!selectedPhoto) return;
    const updatedPhotos = trip.photos.map(p => 
      p.id === selectedPhoto.id ? { ...p, caption: tempCaption } : p
    );
    onUpdate({ ...trip, photos: updatedPhotos });
    setSelectedPhoto({ ...selectedPhoto, caption: tempCaption });
    setIsEditingCaption(false);
  };

  const handleAddComment = () => {
    if (!selectedPhoto || !newComment.trim()) return;
    const comment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      text: newComment,
      date: new Date().toISOString(),
      author: userProfile.name
    };
    const updatedPhotos = trip.photos.map(p => 
      p.id === selectedPhoto.id ? { ...p, comments: [...(p.comments || []), comment] } : p
    );
    onUpdate({ ...trip, photos: updatedPhotos });
    setSelectedPhoto({ ...selectedPhoto, comments: [...(selectedPhoto.comments || []), comment] });
    setNewComment('');
  };

  const handleDeletePhoto = (photoId: string) => {
    if (!window.confirm("Remove this item?")) return;
    onUpdate({ ...trip, photos: trip.photos.filter(p => p.id !== photoId) });
    setSelectedPhoto(null);
  };

  const currentFlight = isFirstDay ? trip.departureFlight : (isLastDay ? trip.returnFlight : null);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 pb-12">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 active:scale-90 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex bg-zinc-200 dark:bg-zinc-800 p-1 rounded-2xl flex-1 ml-4 overflow-hidden">
          {(['itinerary', 'album'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${activeTab === tab ? 'bg-white dark:bg-zinc-700 text-indigo-600 dark:text-white shadow-sm' : 'text-zinc-500'}`}
            >
              {t[tab]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="relative rounded-[2rem] overflow-hidden aspect-[2/1] shadow-xl">
          <img src={trip.coverImage} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-3xl font-black tracking-tight drop-shadow-lg">{trip.title}</h2>
            <p className="text-white font-bold drop-shadow-lg">{trip.location}</p>
          </div>
        </div>

        {activeTab === 'itinerary' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 snap-x">
              {tripDays.map((date, idx) => (
                <button 
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`min-w-[70px] h-[90px] rounded-2xl flex flex-col items-center justify-center transition-all snap-center border-2 ${selectedDate === date ? 'bg-indigo-600 border-indigo-300 text-white shadow-lg scale-105' : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-400'}`}
                >
                  <span className="text-[10px] font-black opacity-60 uppercase">Day {idx + 1}</span>
                  <span className="text-2xl font-black">{new Date(date).getDate()}</span>
                </button>
              ))}
            </div>

            {/* Flight Details */}
            {(isFirstDay || isLastDay) && (
              <div className="bg-black dark:bg-zinc-900 p-6 rounded-[2rem] shadow-xl border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                    <h3 className="text-white text-lg font-black tracking-tight">{t.flightDetails} ({isFirstDay ? t.departure : t.return})</h3>
                  </div>
                  <button onClick={() => { if (currentFlight) setFlightForm(currentFlight); setShowFlightForm(true); }} className="p-2 rounded-xl bg-white/10 text-white active:scale-95 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </button>
                </div>
                {currentFlight ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1"><span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t.flightCode}</span><p className="text-white font-black text-xl tabular-nums uppercase">{currentFlight.code}</p></div>
                    <div className="space-y-1"><span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t.gate}</span><p className="text-white font-black text-xl tabular-nums uppercase">{currentFlight.gate}</p></div>
                    <div className="col-span-2 pt-2 border-t border-white/5"><span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t.airport}</span><p className="text-white font-black leading-tight">{currentFlight.airport}</p></div>
                    <div className="col-span-2 mt-2 p-3 rounded-xl bg-white/5 border border-white/5"><span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{t.transportPlan}</span><p className="text-white/80 text-sm font-bold mt-1 leading-relaxed">{currentFlight.transport}</p></div>
                  </div>
                ) : <div className="py-4 text-center"><p className="text-zinc-500 text-sm font-bold">No flight information added yet.</p></div>}
              </div>
            )}

            {/* Budget Stats */}
            <div className="bg-zinc-900 text-white rounded-[2rem] p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{t.budget}</span>
                <span className={`text-xl font-black ${stats.remaining < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>{trip.defaultCurrency || '$'}{stats.remaining} {t.remaining}</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${stats.act > trip.budget ? 'bg-rose-500' : 'bg-indigo-500'}`}
                  style={{ width: `${Math.min(100, (stats.act / (trip.budget || 1)) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                <span>{t.total} {t.estimated}: {trip.defaultCurrency || '$'}{stats.est}</span>
                <span>{t.total} {t.actual}: {trip.defaultCurrency || '$'}{stats.act}</span>
              </div>
            </div>

            <div className="space-y-6 relative pl-8">
              <div className="absolute left-[1.1rem] top-0 bottom-0 w-0.5 bg-indigo-100 dark:bg-indigo-900/40" />
              <button onClick={handleOpenAddEvent} className="w-full py-4 border-2 border-dashed border-indigo-200 dark:border-indigo-900/40 rounded-2xl flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 font-black uppercase text-xs tracking-widest active:bg-indigo-50 transition-all">
                + {t.addEvent}
              </button>

              {currentDayEvents.map((item) => {
                const isOverBudget = item.actualExpense > item.estimatedExpense;
                const itemCurrency = item.currency || trip.defaultCurrency || '$';
                return (
                  <div key={item.id} className={`relative p-6 rounded-2xl border-2 transition-all ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-50'} shadow-sm group`}>
                    <div className="absolute left-[-2.1rem] top-8 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-white dark:ring-zinc-950 shadow-sm" />
                    
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-black bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-md tabular-nums uppercase">
                        {item.period ? t[item.period] : `${item.time}${item.endTime ? ' - ' + item.endTime : ''}`}
                      </span>
                      <div className="flex items-center gap-2">
                        {item.url && (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-indigo-500 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                          </a>
                        )}
                        <button onClick={() => handleOpenEditEvent(item)} className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-indigo-500 transition-colors">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                        </button>
                      </div>
                    </div>

                    <h4 className="font-black text-lg tracking-tight mb-1 text-indigo-700 dark:text-indigo-300 flex items-center gap-2 capitalize">
                      {item.type === 'sightseeing' && '🏛️'}
                      {item.type === 'shopping' && '🛍️'}
                      {item.type === 'eating' && '🍱'}
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold mb-2 leading-relaxed">{item.description}</p>

                    {(item.transportMethod || item.travelDuration) && (
                      <div className="flex flex-wrap gap-4 mb-4 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800/50">
                        {item.transportMethod && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1-1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>
                            <span className="text-[10px] font-black uppercase tracking-tight text-black dark:text-zinc-100">{item.transportMethod}</span>
                          </div>
                        )}
                        {item.travelDuration && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span className="text-[10px] font-black uppercase tracking-tight text-black dark:text-zinc-100">{item.travelDuration}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-3">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block">{t.budgetPlan}</span>
                          <span className="text-sm font-black text-amber-600 dark:text-amber-500 transition-colors">{itemCurrency}{item.estimatedExpense}</span>
                          {item.spendingDescription && (
                            <p className="text-[10px] text-zinc-400 font-bold italic">"{item.spendingDescription}"</p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-[9px] font-black uppercase tracking-widest ${isOverBudget ? 'text-rose-500' : 'text-zinc-400'}`}>{t.actualCost}</span>
                          {editingActualId === item.id ? (
                            <input 
                              autoFocus
                              type="number"
                              className={`w-20 p-2 rounded-lg text-sm font-black border-2 outline-none ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'}`}
                              defaultValue={item.actualExpense}
                              onBlur={(e) => { handleUpdateActualExpense(item.id, e.target.value); setEditingActualId(null); }}
                              onKeyDown={(e) => { if (e.key === 'Enter') { handleUpdateActualExpense(item.id, (e.target as HTMLInputElement).value); setEditingActualId(null); } }}
                            />
                          ) : (
                            <button onClick={() => setEditingActualId(item.id)} className={`text-xl font-black tabular-nums transition-colors flex items-center gap-2 group ${isOverBudget ? 'text-rose-500' : 'text-indigo-600 dark:text-indigo-400'}`}>
                              {itemCurrency}{item.actualExpense}
                              <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'album' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
               <div>
                 <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{t.tripAlbum}</h3>
                 <p className="text-zinc-500 font-bold text-sm">{t.albumSub}</p>
               </div>
               <button onClick={() => fileInputRef.current?.click()} className="w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
                 {t.importMedia}
               </button>
               <input type="file" multiple accept="image/*,video/*" ref={fileInputRef} className="hidden" onChange={handleMediaUpload} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {trip.photos.length === 0 ? (
                <div className="col-span-full py-20 text-center border-4 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[2.5rem]">
                  <p className="text-zinc-400 font-bold">{t.noMemories}</p>
                </div>
              ) : (
                trip.photos.map(media => (
                  <div key={media.id} className="relative group aspect-square rounded-[2rem] overflow-hidden shadow-lg cursor-pointer transition-all hover:scale-[1.02] bg-zinc-200 dark:bg-zinc-800" onClick={() => { setSelectedPhoto(media); setTempCaption(media.caption); setIsEditingCaption(false); }}>
                    {media.type === 'video' ? <video src={media.url} className="w-full h-full object-cover" /> : <img src={media.url} className="w-full h-full object-cover" />}
                    <div className="absolute top-4 right-4 bg-rose-500 text-white p-2 rounded-xl shadow-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-3 h-3" fill={media.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* EVENT FORM MODAL */}
      {showEventForm && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowEventForm(false)} />
          <div className={`relative z-10 w-full p-8 pb-12 rounded-t-[2.5rem] shadow-2xl animate-in slide-in-from-bottom-full duration-500 max-w-lg ${darkMode ? 'bg-zinc-900' : 'bg-white'} max-h-[90vh] overflow-y-auto no-scrollbar`}>
            <div className="sticky top-0 pb-4 mb-4 bg-inherit z-10 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
               <h3 className={`text-2xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{editingEventId ? t.updateEvent : t.addEvent}</h3>
               <button onClick={() => setShowEventForm(false)} className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
               </button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-white' : 'text-zinc-400'}`}>{t.period}</label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-950 border-2 dark:border-zinc-800">
                  <button onClick={() => setEventForm({...eventForm, period: undefined})} className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${!eventForm.period ? 'bg-indigo-600 text-white shadow-md' : 'text-zinc-500'}`}>{t.exactTime}</button>
                  <button onClick={() => setEventForm({...eventForm, period: 'morning'})} className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${eventForm.period ? 'bg-indigo-600 text-white shadow-md' : 'text-zinc-500'}`}>{t.period}</button>
                </div>
              </div>

              {/* Interval Selection in Precise Mode */}
              {!eventForm.period ? (
                <div className="grid grid-cols-7 gap-2 items-center">
                  <div className="col-span-3 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.startTime}</label>
                    <input type="time" value={eventForm.time} onChange={e => setEventForm({...eventForm, time: e.target.value})} className={`w-full p-4 rounded-xl border-2 font-black tabular-nums outline-none ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-900'}`} />
                  </div>
                  <div className="col-span-1 flex justify-center pt-6">
                    <span className="font-black text-zinc-300">→</span>
                  </div>
                  <div className="col-span-3 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.endTime}</label>
                    <input type="time" value={eventForm.endTime} onChange={e => setEventForm({...eventForm, endTime: e.target.value})} className={`w-full p-4 rounded-xl border-2 font-black tabular-nums outline-none ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-900'}`} />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.period}</label>
                  <select value={eventForm.period} onChange={e => setEventForm({...eventForm, period: e.target.value as any})} className={`w-full p-4 rounded-xl border-2 font-black outline-none ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-900'}`}>
                    <option value="morning">{t.morning}</option>
                    <option value="afternoon">{t.afternoon}</option>
                    <option value="night">{t.night}</option>
                  </select>
                </div>
              )}

              <div className="space-y-2">
                 <label className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-white' : 'text-zinc-400'}`}>{t.category}</label>
                 <select value={eventForm.type} onChange={e => setEventForm({...eventForm, type: e.target.value as any})} className={`w-full p-4 rounded-xl border-2 font-black outline-none ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-900'}`}>
                  <option value="sightseeing">{t.sightseeing}</option>
                  <option value="shopping">{t.shopping}</option>
                  <option value="eating">{t.eating}</option>
                  <option value="transport">{t.transport}</option>
                  <option value="other">{t.other}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-white' : 'text-zinc-400'}`}>{t.eventName}</label>
                <input placeholder="E.g. 🏙️ Shibuya Sky..." value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} className={`w-full p-4 rounded-xl border-2 font-black outline-none ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white focus:border-indigo-400' : 'bg-zinc-100 border-zinc-200 text-zinc-900 focus:border-indigo-600'}`} />
              </div>

              {/* Currency & Expense Selection */}
              <div className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-3 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.currency}</label>
                  <input placeholder="$" value={eventForm.currency} onChange={e => setEventForm({...eventForm, currency: e.target.value})} className={`w-full p-4 rounded-xl border-2 font-black outline-none text-center ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-900'}`} />
                </div>
                <div className="col-span-4 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.estimated}</label>
                  <input type="number" value={eventForm.estimatedExpense} onChange={e => setEventForm({...eventForm, estimatedExpense: Number(e.target.value)})} className={`w-full p-4 rounded-xl border-2 font-black outline-none ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-900'}`} />
                </div>
                <div className="col-span-5 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.actual}</label>
                  <input type="number" value={eventForm.actualExpense} onChange={e => setEventForm({...eventForm, actualExpense: Number(e.target.value)})} className={`w-full p-4 rounded-xl border-2 font-black outline-none ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-900'}`} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button onClick={handleSaveEvent} className="bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-indigo-700 active:scale-95 transition-all uppercase tracking-widest">
                  {editingEventId ? t.updateEvent : t.addEvent}
                </button>
                <button onClick={() => setShowEventForm(false)} className={`py-4 font-black uppercase tracking-widest text-xs transition-colors ${darkMode ? 'text-white hover:text-indigo-400' : 'text-zinc-400 hover:text-zinc-900'}`}>{t.cancel}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetail;
