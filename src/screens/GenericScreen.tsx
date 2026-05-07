import { ChevronRight } from 'lucide-react';
import type { Tab } from '../types';

export default function GenericScreen({ title, onNavigate }: { title: string, onNavigate: (tab: Tab) => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 pb-20">
      <header className="bg-white dark:bg-gray-800 px-4 py-4 sticky top-0 z-10 shadow-sm flex items-center border-b border-gray-100 dark:border-gray-700">
        <button onClick={() => onNavigate('menu')} className="text-gray-600 dark:text-gray-300 ml-3">
          <ChevronRight size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">{title}</h1>
      </header>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-gray-400 dark:text-gray-500">⚒️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">قريباً</h2>
            <p className="text-gray-500 dark:text-gray-400">هذه الصفحة قيد التطوير وسيتم توفيرها في التحديث القادم.</p>
        </div>
      </div>
    </div>
  );
}
