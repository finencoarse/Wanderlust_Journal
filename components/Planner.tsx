import React, { useState, useMemo } from 'react';
import { Trip, Language, UserProfile, CustomEvent } from '../types';
import { translations } from '../translations';

interface PlannerProps {
  trips: Trip[];
  onAddTrip: (trip: Trip) => void;
  onUpdateTrip: (trip: Trip) => void;
  onOpenTrip: (id: string) => void;
  language: Language;
  darkMode: boolean;
  userProfile: UserProfile;
  customEvents: CustomEvent[];
  onUpdateEvents: (events: CustomEvent[]) => void;
}

const Planner: React.FC<PlannerProps> = ({ trips, onAddTrip, onUpdateTrip, onOpenTrip, language, darkMode, userProfile, customEvents, onUpdateEvents }) => {
  const t = translations[language];
  const [showForm, setShowForm] = useState(false);
  const [editingTripId, setEditingTripId] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarViewDate, setCalendarViewDate] = useState(new Date());
  
  const [formState, setFormState] = useState({
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    budget: 1000
  });

  const handleEditClick = (e: React.MouseEvent, trip: Trip) => {
    e.stopPropagation();
    setEditingTripId(trip.id);
    setFormState({
      title: trip.title,
      location: trip.location,
      startDate: trip.startDate,
      endDate: trip.endDate,
      description: trip.description,
      budget: trip.budget
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.startDate || !formState.endDate) return;
    
    if (editingTripId) {
      const existingTrip = trips.find(t => t.id === editingTripId);
      if (existingTrip) {
        onUpdateTrip({
          ...existingTrip,
          ...formState,
        });
      }
    } else {
      const trip: Trip = {
        id: Date.now().toString(),
        ...formState,
        status: 'future',
        coverImage: `https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop`,
        photos: [],
        comments: [],
        rating: 0,
        dayRatings: {},
        itinerary: {},
        favoriteDays: [],
        budget: formState.budget
      };
      onAddTrip(trip);
    }
    
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormState({
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      budget: 1000
    });
    setEditingTripId(null);
  };

  const daysInMonth = useMemo(() => {
    const year = calendarViewDate.getFullYear();
    const month = calendarViewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
    return days;
  }, [calendarViewDate]);

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    if (!formState.startDate || (formState.startDate && formState.endDate)) {
      setFormState({ ...formState, startDate: dateStr, endDate: '' });
    } else {
      if (dateStr < formState.startDate) {
        setFormState({ ...formState, startDate: dateStr, endDate: formState.startDate });
      } else {
        setFormState({ ...formState, endDate: dateStr });
      }
      setShowCalendar(false);
    }
  };

  const isSelected = (dateStr: string) => dateStr === formState.startDate || dateStr === formState.endDate;
  const isInRange = (dateStr: string) => {
    if (!formState.startDate || !formState.endDate) return false;
    return dateStr > formState.startDate && dateStr < formState.endDate;
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <h2 className={`text-3xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{t.futureEscapes}</h2>
          <p className="text-zinc-500 font-bold text-sm tracking-tight">{t.dreamDesignDo}</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => { resetForm(); setShowForm(true); }} 
            className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-[1.5rem] text-sm font-black shadow-xl uppercase tracking-widest active:scale-95 transition-all"
          >
            {t.planATrip}
          </button>
        )}
      </div>

      {showForm && (
        <div className={`border-2 rounded-[2rem] p-6 shadow-2xl animate-in slide-in-from-top-4 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              {editingTripId ? t.editJourney : t.newJourney}
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className={`text-[10px] font-black uppercase tracking-widest px-1 ${darkMode ? 'text-white' : 'text-zinc-500'}`}>{t.tripName}</label>
                <input required placeholder="E.g. 🏷️ Summer in Tokyo..." value={formState.title} onChange={e => setFormState({...formState, title: e.target.value})} className={`w-full bg-transparent border-b-2 py-3 text-xl font-black outline-none transition-colors ${darkMode ? 'border-zinc-800 text-white focus:border-indigo-400' : 'border-zinc-100 text-zinc-900 focus:border-indigo-600'}`} />
              </div>
              <div className="space-y-2">
                <label className={`text-[10px] font-black uppercase tracking-widest px-1 ${darkMode ? 'text-white' : 'text-zinc-500'}`}>{t.destination}</label>
                <input required placeholder="📍 Japan..." value={formState.location} onChange={e => setFormState({...formState, location: e.target.value})} className={`w-full bg-transparent border-b-2 py-3 text-xl font-black outline-none transition-colors ${darkMode ? 'border-zinc-800 text-white focus:border-indigo-400' : 'border-zinc-100 text-zinc-900 focus:border-indigo-600'}`} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative space-y-2">
                <label className={`text-[10px] font-black uppercase tracking-widest px-1 ${darkMode ? 'text-white' : 'text-zinc-500'}`}>{t.tripSchedule}</label>
                <button 
                  type="button"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 text-sm font-black transition-all ${showCalendar ? 'border-indigo-500 ring-4 ring-indigo-500/10' : (darkMode ? 'border-zinc-800 text-white' : 'border-zinc-100')}`}
                >
                  <span className="tabular-nums flex gap-2 items-center">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    {formState.startDate ? `${formState.startDate} ${formState.endDate ? '→ ' + formState.endDate : ''}` : t.chooseDates}
                  </span>
                  <svg className={`w-4 h-4 transition-transform ${showCalendar ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                </button>

                {showCalendar && (
                  <div className={`absolute top-full left-0 right-0 mt-2 z-50 p-6 rounded-[1.5rem] border-2 shadow-2xl animate-in zoom-in-95 duration-200 ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-100'}`}>
                    <div className="flex justify-between items-center mb-6">
                      <h4 className={`font-black text-lg ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                        {calendarViewDate.toLocaleString(language, { month: 'long', year: 'numeric' })}
                      </h4>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1))} className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg></button>
                        <button type="button" onClick={() => setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1))} className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-center text-[10px] font-black text-zinc-400">{d}</div>)}
                      {daysInMonth.map((date, idx) => {
                        if (!date) return <div key={`empty-${idx}`} />;
                        const dStr = date.toISOString().split('T')[0];
                        const selected = isSelected(dStr);
                        const inRange = isInRange(dStr);
                        return (
                          <button
                            key={dStr}
                            type="button"
                            onClick={() => handleDateClick(date)}
                            className={`aspect-square rounded-xl text-[10px] font-black transition-all
                              ${selected ? 'bg-indigo-600 text-white shadow-lg scale-110 border-2 border-white/20' : ''}
                              ${inRange ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500'}
                            `}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className={`text-[10px] font-black uppercase tracking-widest px-1 ${darkMode ? 'text-white' : 'text-zinc-500'}`}>{t.budget}</label>
                <div className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-colors ${darkMode ? 'bg-zinc-950 border-zinc-800 focus-within:border-indigo-500' : 'bg-zinc-50 border-zinc-100 focus-within:border-indigo-600'}`}>
                  <span className="text-xl font-black text-indigo-500">$</span>
                  <input required type="number" placeholder="0" value={formState.budget} onChange={e => setFormState({...formState, budget: parseFloat(e.target.value) || 0})} className={`bg-transparent w-full text-xl font-black outline-none tabular-nums ${darkMode ? 'text-white' : 'text-zinc-900'}`} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className={`text-[10px] font-black uppercase tracking-widest px-1 ${darkMode ? 'text-white' : 'text-zinc-500'}`}>{t.briefDescription}</label>
                <textarea rows={2} placeholder="📝 Briefly describe your plans..." value={formState.description} onChange={e => setFormState({...formState, description: e.target.value})} className={`w-full p-4 rounded-2xl border-2 font-black resize-none outline-none ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white focus:border-indigo-400' : 'bg-zinc-50 border-zinc-100 text-zinc-900 focus:border-indigo-600'}`} />
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black shadow-xl hover:bg-indigo-700 active:scale-95 transition-all uppercase tracking-widest">
                {editingTripId ? t.save : t.save} {t.planner}
              </button>
              <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className={`w-full py-2 font-black uppercase tracking-widest text-xs transition-colors ${darkMode ? 'text-zinc-100 hover:text-white' : 'text-zinc-400 hover:text-zinc-900'}`}>
                {t.cancel}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {trips.map(trip => (
          <div key={trip.id} onClick={() => onOpenTrip(trip.id)} className={`relative p-6 rounded-[2rem] border-2 group cursor-pointer transition-all active:scale-98 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-sm'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <h3 className={`text-2xl font-black tracking-tight leading-none transition-colors ${darkMode ? 'text-white' : 'text-zinc-900'} group-active:text-indigo-600 pr-10`}>{trip.title}</h3>
                <p className="text-sm font-bold text-zinc-400">{trip.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => handleEditClick(e, trip)}
                  className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-indigo-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                </button>
                <div className="bg-indigo-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md">
                  {t.upcoming}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t-2 dark:border-zinc-800 pt-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{t.starts}</span>
                <span className={`text-sm font-black tabular-nums ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{trip.startDate}</span>
              </div>
              <div className="w-8 h-px bg-zinc-200 dark:bg-zinc-800" />
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{t.budget}</span>
                <span className={`text-xl font-black tabular-nums ${darkMode ? 'text-white' : 'text-zinc-900'}`}>${trip.budget || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planner;