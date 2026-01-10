
import React from 'react';
import { Language, UserProfile } from '../types';
import { translations } from '../translations';

interface SettingsProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onBack: () => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

const Settings: React.FC<SettingsProps> = ({ language, setLanguage, darkMode, setDarkMode, onBack, userProfile, setUserProfile }) => {
  const t = translations[language];

  const handlePfpUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserProfile({ ...userProfile, pfp: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <button 
        onClick={onBack}
        className="flex items-center text-sm font-medium text-zinc-500 hover:text-black dark:hover:text-white transition-colors mb-8"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        {t.back}
      </button>

      <div className={`border rounded-[2.5rem] p-8 shadow-sm transition-colors duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'}`}>
        <h2 className="text-3xl font-black mb-8 tracking-tight">{t.settings}</h2>

        <div className="space-y-12">
          {/* User Profile Section */}
          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t.myProfile}</h3>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="relative group">
                <img 
                  src={userProfile.pfp} 
                  alt="Profile" 
                  className={`w-24 h-24 rounded-full object-cover border-4 ${darkMode ? 'border-zinc-800' : 'border-zinc-50'}`} 
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <input type="file" className="hidden" accept="image/*" onChange={handlePfpUpload} />
                </label>
              </div>
              <div className="flex-1 w-full space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500">{t.userName}</label>
                  <input 
                    type="text" 
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    className={`w-full bg-transparent border-b-2 py-2 focus:outline-none focus:border-indigo-500 transition-colors text-lg font-black ${darkMode ? 'border-zinc-800 text-white' : 'border-zinc-100 text-zinc-900'}`}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t.language}</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'en', label: 'English' },
                { id: 'zh-TW', label: '繁體中文' },
                { id: 'ja', label: '日本語' },
                { id: 'ko', label: '한국어' }
              ].map(lang => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id as Language)}
                  className={`p-4 rounded-2xl border-2 text-xs font-black uppercase tracking-widest transition-all ${
                    language === lang.id 
                    ? (darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black')
                    : (darkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700' : 'bg-zinc-50 border-zinc-100 text-zinc-500 hover:border-zinc-200')
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t.appearance}</h3>
            <div className="flex items-center justify-between p-6 rounded-2xl border-2 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${darkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
                  {darkMode ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707-.707M7.757 6.364l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-widest">{t.darkMode}</p>
                </div>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-14 h-8 rounded-full transition-colors relative ${darkMode ? 'bg-indigo-600' : 'bg-zinc-300'}`}
              >
                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${darkMode ? 'translate-x-6' : ''}`} />
              </button>
            </div>
          </section>

          {/* New Data Persistence Note */}
          <section className="pt-6 border-t dark:border-zinc-800">
            <div className="flex gap-4 p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-100 dark:border-indigo-900/40">
              <svg className="w-6 h-6 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Offline & Local First</h4>
                <p className="text-[11px] font-bold text-indigo-900/60 dark:text-indigo-200/60 leading-relaxed">
                  Your travel data is stored securely in this browser's local database. 
                  You can use the app without an internet connection or your computer after it's installed to your home screen.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
