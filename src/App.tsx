/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Home, ShoppingCart, FileText, ClipboardList, Menu, Bot } from 'lucide-react';
import type { Tab } from './types';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import PrescriptionScreen from './screens/PrescriptionScreen';
import OrdersScreen from './screens/OrdersScreen';
import MenuScreen from './screens/MenuScreen';
import SplashScreen from './screens/SplashScreen';
import LanguageScreen from './screens/LanguageScreen';
import ChatScreen from './screens/ChatScreen';
import BranchesScreen from './screens/BranchesScreen';
import GenericScreen from './screens/GenericScreen';
import { AppProvider, useAppContext } from './context/AppContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [appState, setAppState] = useState<'splash' | 'language' | 'main'>('splash');
  const { cart, isDarkMode } = useAppContext();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={setActiveTab} />;
      case 'cart':
        return <CartScreen onNavigate={setActiveTab} />;
      case 'prescription':
        return <PrescriptionScreen />;
      case 'orders':
        return <OrdersScreen />;
      case 'menu':
        return <MenuScreen onNavigate={setActiveTab} />;
      case 'chat':
        return <ChatScreen />;
      case 'branches':
        return <BranchesScreen />;
      case 'account':
        return <GenericScreen title="حسابي" onNavigate={setActiveTab} />;
      case 'addresses':
        return <GenericScreen title="العناوين" onNavigate={setActiveTab} />;
      case 'favorites':
        return <GenericScreen title="المفضلة" onNavigate={setActiveTab} />;
      case 'privacy':
        return <GenericScreen title="سياسة الخصوصية" onNavigate={setActiveTab} />;
      case 'terms':
        return <GenericScreen title="الشروط والأحكام" onNavigate={setActiveTab} />;
      case 'about':
        return <GenericScreen title="معلومات عنا" onNavigate={setActiveTab} />;
      case 'login':
        return <GenericScreen title="تسجيل الدخول" onNavigate={setActiveTab} />;
      default:
        return <HomeScreen onNavigate={setActiveTab} />;
    }
  };

  if (appState === 'splash') {
      return (
          <div className="flex justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans" dir="rtl">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 min-h-screen flex flex-col relative shadow-xl overflow-hidden text-gray-900 dark:text-gray-100">
                <SplashScreen onFinish={() => setAppState('language')} />
            </div>
          </div>
      );
  }

  if (appState === 'language') {
      return (
          <div className="flex justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans" dir="rtl">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 min-h-screen flex flex-col relative shadow-xl overflow-hidden text-gray-900 dark:text-gray-100">
                <LanguageScreen onComplete={() => setAppState('main')} />
            </div>
          </div>
      );
  }

  return (
    <div className={`flex justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans ${isDarkMode ? 'dark' : ''}`} dir="rtl">
      {/* Mobile Wrapper */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 min-h-screen flex flex-col relative shadow-xl overflow-hidden pb-16">
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full relative bg-gray-50 dark:bg-gray-900">
          {renderScreen()}
        </main>
        
        {/* Floating AI Button */}
        {activeTab !== 'chat' && (
            <button 
                onClick={() => setActiveTab('chat')}
                className="absolute bottom-20 right-4 bg-red-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-red-700 active:scale-95 transition-transform z-40 border-4 border-white dark:border-gray-800"
            >
                <Bot size={28} />
            </button>
        )}

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center h-16 px-2 z-50">
          <NavItem 
            icon={<Home size={24} />} 
            label="الرئيسية" 
            isActive={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
          />
          <NavItem 
            icon={<ShoppingCart size={24} />} 
            label="السلة" 
            isActive={activeTab === 'cart'} 
            onClick={() => setActiveTab('cart')} 
            badge={cartItemsCount}
          />
          <NavItem 
            icon={<FileText size={24} />} 
            label="الروشتة" 
            isActive={activeTab === 'prescription'} 
            onClick={() => setActiveTab('prescription')} 
          />
          <NavItem 
            icon={<ClipboardList size={24} />} 
            label="الطلبات" 
            isActive={activeTab === 'orders'} 
            onClick={() => setActiveTab('orders')} 
          />
          <NavItem 
            icon={<Menu size={24} />} 
            label="القائمة" 
            isActive={activeTab === 'menu'} 
            onClick={() => setActiveTab('menu')} 
          />
        </nav>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function NavItem({ 
  icon, 
  label, 
  isActive, 
  onClick, 
  badge 
}: { 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-colors ${
        isActive ? 'text-red-600' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
      }`}
    >
      <div className="relative">
        {icon}
        {badge && badge > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-800">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] font-semibold">{label}</span>
    </button>
  );
}
