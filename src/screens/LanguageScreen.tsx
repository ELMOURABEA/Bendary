import { useState } from 'react';
import { Check } from 'lucide-react';
import Logo from '../components/Logo';

export default function LanguageScreen({ onComplete }: { onComplete: () => void }) {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex-1 flex flex-col items-center pt-16 px-6">
        <Logo className="w-72 max-w-full mb-12" />

        <div className="w-full space-y-2">
          <button 
            onClick={() => setLang('ar')}
            className={`w-full flex items-center justify-between p-4 border rounded-xl transition-colors ${lang === 'ar' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100 hover:border-red-100'}`}
          >
            <div className="w-6 flex justify-center">
              {lang === 'ar' ? <Check size={20} className="text-red-600" /> : <div className="w-5 h-5 rounded-full border border-gray-300" />}
            </div>
            <span className="flex-1 text-right font-bold text-gray-800 pr-4">عربي</span>
            <div className="w-8 h-6 bg-red-100 rounded overflow-hidden shadow-sm">
              <img src="https://flagcdn.com/w40/eg.png" alt="Egypt" className="w-full h-full object-cover" />
            </div>
          </button>

          <button 
            onClick={() => setLang('en')}
            className={`w-full flex items-center justify-between p-4 border rounded-xl transition-colors ${lang === 'en' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100 hover:border-red-100'}`}
          >
            <div className="w-6 flex justify-center">
              {lang === 'en' ? <Check size={20} className="text-red-600" /> : <div className="w-5 h-5 rounded-full border border-gray-300" />}
            </div>
            <span className="flex-1 text-right font-bold text-gray-800 pr-4">English</span>
            <div className="w-8 h-6 bg-blue-100 rounded overflow-hidden shadow-sm">
              <img src="https://flagcdn.com/w40/gb.png" alt="English" className="w-full h-full object-cover" />
            </div>
          </button>
        </div>
      </div>

      <div className="p-6 w-full mb-4">
        <button 
          onClick={onComplete}
          className="w-full bg-red-600 text-white rounded-xl py-4 font-bold text-lg hover:bg-red-700 active:bg-red-800 active:scale-[0.98] transition-all shadow-md"
        >
          حفظ
        </button>
      </div>
    </div>
  );
}
