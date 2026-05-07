import { User, Settings, Heart, MapPin, Globe, HelpCircle, FileText, Shield, FileSignature, Info, LogIn, ChevronLeft, Moon } from 'lucide-react';
import type { Tab } from '../types';
import { useAppContext } from '../context/AppContext';

export default function MenuScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { isDarkMode, toggleDarkMode } = useAppContext();

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 pb-20 overflow-y-auto">
      {/* Profile Header */}
      <div className="bg-red-600 text-white p-6 flex flex-col items-center justify-center pt-10">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-3">
          <User size={40} className="text-white" />
        </div>
        <h2 className="text-xl font-bold">زائر</h2>
        <p className="text-sm text-red-100 mt-1">قم بتسجيل الدخول للاستفادة الكاملة</p>
      </div>

      {/* Menu List */}
      <div className="bg-white dark:bg-gray-800 mt-2 border-y border-gray-100 dark:border-gray-700">
        <MenuItem icon={<User size={20} />} label="حسابي" onClick={() => onNavigate('account')} />
        <MenuItem icon={<MapPin size={20} />} label="العناوين" onClick={() => onNavigate('addresses')} />
        <MenuItem icon={<Heart size={20} />} label="المفضلة" onClick={() => onNavigate('favorites')} />
      </div>

      <div className="bg-white dark:bg-gray-800 mt-2 border-y border-gray-100 dark:border-gray-700">
        <MenuItem icon={<Globe size={20} />} label="اللغة" value="العربية" onClick={() => onNavigate('home')} />
        <MenuItem 
          icon={<Moon size={20} />} 
          label="الوضع الليلي" 
          onClick={toggleDarkMode}
          value={
            <div className={`w-10 h-6 rounded-full relative transition-colors ${isDarkMode ? 'bg-red-600' : 'bg-gray-200'}`}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-transform ${isDarkMode ? 'left-1' : 'right-1'}`}></div>
            </div>
          } 
        />
      </div>

      <div className="bg-white dark:bg-gray-800 mt-2 border-y border-gray-100 dark:border-gray-700">
        <MenuItem icon={<MapPin size={20} />} label="فروعنا (15+ فرع)" onClick={() => onNavigate('branches')} />
        <MenuItem icon={<HelpCircle size={20} />} label="استشير صيدلي" onClick={() => onNavigate('chat')} />
        <MenuItem icon={<Shield size={20} />} label="سياسة الخصوصية" onClick={() => onNavigate('privacy')} />
        <MenuItem icon={<FileSignature size={20} />} label="الشروط والأحكام" onClick={() => onNavigate('terms')} />
        <MenuItem icon={<Info size={20} />} label="معلومات عنا" onClick={() => onNavigate('about')} />
      </div>

      <div className="bg-white dark:bg-gray-800 mt-2 mb-6 border-y border-gray-100 dark:border-gray-700">
        <MenuItem icon={<LogIn size={20} className="text-red-600 dark:text-red-500" />} label="تسجيل الدخول" className="text-red-600 dark:text-red-500 font-bold" hideArrow onClick={() => onNavigate('login')} />
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
  onClick
}: { 
  icon: React.ReactNode; 
  label: string; 
  value?: React.ReactNode;
  className?: string;
  hideArrow?: boolean;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 transition-colors">
      <div className={`flex items-center gap-3 ${className}`}>
        <span className="opacity-80">{icon}</span>
        <span className="font-semibold text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
        {value && <span className="text-sm font-medium">{value}</span>}
        {!hideArrow && <ChevronLeft size={18} />}
      </div>
    </button>
  );
}
