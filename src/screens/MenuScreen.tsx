import { ReactNode, useState } from 'react';
import { User, Settings, Heart, MapPin, Globe, HelpCircle, FileText, Shield, FileSignature, Info, LogIn, ChevronLeft, ChevronRight, Moon, Bell } from 'lucide-react';
import type { Tab } from '../types';
import { useAppContext } from '../context/AppContext';

export default function MenuScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { isDarkMode, toggleDarkMode, language, setLanguage, t } = useAppContext();
  const [pushEnabled, setPushEnabled] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 pb-20 overflow-y-auto">
      {/* Profile Header */}
      <div className="bg-red-600 text-white p-6 flex flex-col items-center justify-center pt-10">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-3 relative overflow-hidden">
          <User size={40} className="text-white" />
        </div>
        <h2 className="text-xl font-bold mb-1">{t('guest')}</h2>
        <p className="text-sm text-red-100 mt-1">{t('login_prompt')}</p>
      </div>

      {/* Menu List */}
      <div className="bg-white dark:bg-gray-800 mt-2 border-y border-gray-100 dark:border-gray-700">
        <MenuItem icon={<User size={20} />} label={t('profile')} onClick={() => alert('Profile page coming soon')} lang={language} />
        <MenuItem icon={<MapPin size={20} />} label={t('addresses')} onClick={() => alert('Addresses coming soon')} lang={language} />
        <MenuItem icon={<Heart size={20} />} label={t('favorites')} onClick={() => alert('Favorites coming soon')} lang={language} />
      </div>

      <div className="bg-white dark:bg-gray-800 mt-2 border-y border-gray-100 dark:border-gray-700">
        <MenuItem icon={<Globe size={20} />} label={t('language')} value={language === 'ar' ? 'العربية' : 'English'} onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} lang={language} />
        <MenuItem 
          icon={<Moon size={20} />} 
          label={t('dark_mode')} 
          onClick={toggleDarkMode}
          lang={language}
          value={
            <div className={`w-10 h-6 rounded-full relative transition-colors ${isDarkMode ? 'bg-red-600' : 'bg-gray-200'}`}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-transform ${isDarkMode ? (language === 'ar' ? 'left-1' : 'right-1') : (language === 'ar' ? 'right-1' : 'left-1')}`}></div>
            </div>
          } 
        />
        <MenuItem 
          icon={<Bell size={20} />} 
          label={t('push_notifications')} 
          onClick={() => {
            setPushEnabled(!pushEnabled);
            alert(pushEnabled ? 'Push notifications disabled' : 'Push notifications enabled');
          }}
          lang={language}
          value={
            <div className={`w-10 h-6 rounded-full relative transition-colors ${pushEnabled ? 'bg-red-600' : 'bg-gray-200'}`}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-transform ${pushEnabled ? (language === 'ar' ? 'left-1' : 'right-1') : (language === 'ar' ? 'right-1' : 'left-1')}`}></div>
            </div>
          } 
        />
      </div>

      <div className="bg-white dark:bg-gray-800 mt-2 border-y border-gray-100 dark:border-gray-700">
        <MenuItem icon={<MapPin size={20} />} label={t('all_branches')} onClick={() => alert('Branches coming soon')} lang={language} />
        <MenuItem icon={<HelpCircle size={20} />} label={t('ask_pharmacist')} onClick={() => onNavigate('chat')} lang={language} />
        <MenuItem icon={<Shield size={20} />} label={t('privacy')} onClick={() => alert('Privacy coming soon')} lang={language} />
        <MenuItem icon={<FileSignature size={20} />} label={t('terms')} onClick={() => alert('Terms coming soon')} lang={language} />
        <MenuItem icon={<Info size={20} />} label={t('about')} onClick={() => alert('About coming soon')} lang={language} />
      </div>

      <div className="bg-white dark:bg-gray-800 mt-2 mb-6 border-y border-gray-100 dark:border-gray-700">
        <MenuItem icon={<LogIn size={20} className="text-red-600 dark:text-red-500" />} label={t('login')} className="text-red-600 dark:text-red-500 font-bold" hideArrow onClick={() => alert('Login flow coming soon')} lang={language} />
      </div>

    </div>
  );
}

function MenuItem({ 
  icon, 
  label, 
  value, 
  className = 'text-gray-700 dark:text-gray-200',
  hideArrow = false,
  onClick,
  lang = 'ar'
}: { 
  icon: ReactNode; 
  label: string; 
  value?: ReactNode;
  className?: string;
  hideArrow?: boolean;
  onClick?: () => void;
  lang?: string;
}) {
  const ArrowIcon = lang === 'ar' ? ChevronLeft : ChevronRight;
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 transition-colors">
      <div className={`flex items-center gap-3 ${className}`}>
        <span className="opacity-80">{icon}</span>
        <span className="font-semibold text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
        {value && <span className="text-sm font-medium">{value}</span>}
        {!hideArrow && <ArrowIcon size={18} />}
      </div>
    </button>
  );
}
