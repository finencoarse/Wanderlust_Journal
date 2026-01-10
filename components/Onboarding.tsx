import React, { useState } from 'react';
import { UserProfile, Language } from '../types';
import { translations } from '../translations';

interface OnboardingProps {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  language: Language;
  onComplete: () => void;
}

const COUNTRIES = [
  "United States", "China", "Hong Kong", "Taiwan", "United Kingdom", "Japan"
];

const Onboarding: React.FC<OnboardingProps> = ({ userProfile, setUserProfile, darkMode, setDarkMode, language, onComplete }) => {
  const t = translations[language];
  const [step, setStep] = useState(1);

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
    <div className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${darkMode ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-md w-full space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl mx-auto flex items-center justify-center shadow-2xl mb-8">
            <svg className="w-8 h-8 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 012.5 2.5V17m-12.293-2.293l1.414 1.414A2 2 0 0011.586 15H11a2 2 0 00-2 2v1a2 2 0 01-2 2H3.055a10.003 10.003 0 0114.158-14.158L15 7" /></svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{t.welcome}</h1>
          <p className="text-zinc-500 dark:text-zinc-400">{t.onboardingSub}</p>
        </div>

        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative group cursor-pointer">
                <img 
                  src={userProfile.pfp} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-zinc-100 dark:border-zinc-800 shadow-xl transition-transform group-hover:scale-105" 
                  alt="PFP" 
                />
                <label className="absolute inset-0 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <input type="file" className="hidden" accept="image/*" onChange={handlePfpUpload} />
                </label>
              </div>
              
              <div className="w-full space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{t.userName}</label>
                <input 
                  type="text" 
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  placeholder="e.g. Marco Polo"
                  className="w-full text-2xl font-bold bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 py-2 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>
            </div>
            
            <button 
              onClick={() => setStep(2)}
              disabled={!userProfile.name.trim()}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-3xl font-bold shadow-xl hover:shadow-2xl transition-all active:scale-95 disabled:opacity-50"
            >
              {t.next}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-center">{t.selectCountry}</h3>
              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                {COUNTRIES.map(country => (
                  <button
                    key={country}
                    onClick={() => setUserProfile({ ...userProfile, nationality: country })}
                    className={`w-full p-4 rounded-2xl text-left border transition-all font-medium ${userProfile.nationality === country ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-md' : 'hover:border-zinc-400'}`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => setStep(3)}
              disabled={!userProfile.nationality}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-3xl font-bold shadow-xl hover:shadow-2xl transition-all active:scale-95 disabled:opacity-50"
            >
              {t.next}
            </button>
            <button 
              onClick={() => setStep(1)}
              className="w-full text-zinc-400 font-bold py-2 hover:text-zinc-600 transition-colors"
            >
              {t.back}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <div className="space-y-6 text-center">
              <h3 className="text-xl font-bold">{t.chooseTheme}</h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setDarkMode(false)}
                  className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${!darkMode ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-900' : 'border-zinc-100 dark:border-zinc-800 hover:border-zinc-300'}`}
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-md border flex items-center justify-center text-zinc-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
                  </div>
                  <span className="font-bold text-sm">Light</span>
                </button>
                <button 
                  onClick={() => setDarkMode(true)}
                  className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${darkMode ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-900' : 'border-zinc-100 dark:border-zinc-800 hover:border-zinc-300'}`}
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-950 shadow-md border-zinc-700 flex items-center justify-center text-zinc-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                  </div>
                  <span className="font-bold text-sm">Dark</span>
                </button>
              </div>
            </div>

            <button 
              onClick={onComplete}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-3xl font-bold shadow-xl hover:shadow-2xl transition-all active:scale-95"
            >
              {t.startJourney}
            </button>
            <button 
              onClick={() => setStep(2)}
              className="w-full text-zinc-400 font-bold py-2 hover:text-zinc-600 transition-colors"
            >
              {t.back}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;