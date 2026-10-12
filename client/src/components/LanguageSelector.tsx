import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';
import { ChevronDown } from 'lucide-react';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇲🇦' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

export const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-sm text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-2xs active:scale-98"
      >
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{currentLang.flag}</span>
          <span>{currentLang.label}</span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {open && (
        <div className="absolute ltr:right-0 rtl:left-0 mt-1.5 w-36 rounded-2xl bg-white shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => {
                setLanguage(item.code);
                setOpen(false);
              }}
              className={`w-full ltr:text-left rtl:text-right px-3.5 py-2 text-xs font-bold flex items-center justify-between transition-colors ${
                language === item.code ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{item.flag}</span>
                <span>{item.label}</span>
              </div>
              {language === item.code && <span className="text-emerald-600 font-black">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
