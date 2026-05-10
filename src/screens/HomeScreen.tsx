import { ReactNode, useState } from 'react';
import { Search, Bell, Phone, ShieldCheck, Tag, UserPlus, Heart, Stethoscope, FileText, ShoppingCart, MessageCircle, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import type { Tab } from '../types';
import { useAppContext } from '../context/AppContext';

export default function HomeScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { addToCart, t } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { title: t('skincare'), image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=200' },
    { title: t('haircare'), image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=200' },
    { title: t('medicine'), image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f263?auto=format&fit=crop&q=80&w=200' },
    { title: t('mother_baby'), image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=200' },
    { title: t('bodycare'), image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=200' },
    { title: t('mencare'), image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
  ];

  const randomProducts = [
    { id: 101, name: 'بنادول مسكن للآلام', format: 'علبة 24 قرص', price: 35, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f263?auto=format&fit=crop&q=80&w=200' },
    { id: 102, name: 'فيتامين سي 1000', format: 'عبوة 15 قرص فوار', price: 45, image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&q=80&w=200' },
    { id: 103, name: 'غسول لاروش بوزيه', format: 'عبوة 400 مل', price: 350, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=200' },
    { id: 104, name: 'شامبو صانسيلك', format: 'عبوة 400 مل', price: 65, image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=200' },
  ];

  const searchResults = searchQuery.trim() ? randomProducts.filter(p => p.name.includes(searchQuery) || p.format.includes(searchQuery)) : [];

  return (
    <div className="flex flex-col pb-6 dark:bg-gray-900 min-h-full">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 sticky top-0 bg-white dark:bg-gray-800 z-10 shadow-sm border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <a href="tel:01200400094" className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors flex items-center justify-center p-2 rounded-full bg-gray-50 dark:bg-gray-700">
            <PhoneCall size={18} className="text-red-600" />
          </a>
        </div>
        <div className="flex flex-col items-center justify-center">
             <div className="flex items-center gap-2 text-red-600 font-black text-lg leading-tight uppercase relative items-baseline">
                <svg viewBox="0 0 100 100" className="w-8 h-8">
                  <path d="M30,60 Q30,40 50,40 Q70,40 70,60 Q70,80 50,75 Q30,80 30,60 Z" fill="none" stroke="#e11d48" strokeWidth="6" />
                  <path d="M50,40 L46,15" stroke="#333" strokeWidth="5" strokeLinecap="round" />
                  <path d="M55,18 C62,8 72,12 70,22 C67,30 57,28 55,18 Z" fill="#84cc16" />
                  <path d="M30,50 Q10,50 15,30 Q20,20 30,25" fill="none" stroke="#e11d48" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <div className="flex items-baseline">
                    <span className="text-2xl font-serif">B</span>ENDARY
                </div>
             </div>
             <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest -mt-1 ml-6">since 1980</span>
        </div>
      </header>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search_placeholder')}
            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-full py-3 px-4 rtl:pr-11 ltr:pl-11 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm border border-transparent dark:focus:border-red-900"
          />
          <Search className="absolute top-3.5 rtl:right-4 ltr:left-4 text-gray-400 dark:text-gray-500" size={20} />
          {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute top-3.5 rtl:left-4 ltr:right-4 text-gray-400 hover:text-gray-600">
                  ✖
              </button>
          )}
        </div>
      </div>

      <AnimatePresence>
          {searchQuery && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="px-4">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">{t('search_results')}</h2>
                  {searchResults.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3 mb-6">
                      {searchResults.map(product => (
                        <div key={product.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3 shadow-sm flex flex-col">
                          <div className="aspect-square bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden mb-3">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                          </div>
                          <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm leading-tight mb-1">{product.name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{product.format}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <span className="font-bold text-red-600 dark:text-red-500">{product.price} {t('currency')}</span>
                            <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="w-8 h-8 rounded-full bg-red-50 dark:bg-gray-700 text-red-600 dark:text-red-400 flex items-center justify-center hover:bg-red-600 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-colors active:scale-95">
                              <ShoppingCart size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 text-center mb-6">
                          <p className="text-gray-500 dark:text-gray-400">لا توجد نتائج للبحث</p>
                      </div>
                  )}
              </motion.div>
          )}
      </AnimatePresence>

      {!searchQuery && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Quick Access */}
            <div className="grid grid-cols-2 gap-3 px-4 py-2">
        <QuickAccessButton icon={<ShieldCheck size={28} className="text-white" />} label={t('health_insurance')} color="bg-red-600" textColor="text-white" />
        <QuickAccessButton icon={<FileText size={28} className="text-red-600" />} label={t('rx_upload')} color="bg-red-50" textColor="text-red-700" borderColor="border-red-200" onClick={() => onNavigate('prescription')} />
      </div>
      
      <div className="grid grid-cols-2 gap-3 px-4 py-2 mb-4">
        <QuickAccessButton icon={<Stethoscope size={28} className="text-red-600" />} label={t('ask_pharmacist')} color="bg-white" textColor="text-red-700" borderColor="border-red-200" onClick={() => onNavigate('chat')} />
        <QuickAccessButton icon={<Tag size={28} className="text-red-600" />} label={t('special_offers')} color="bg-white" textColor="text-red-700" borderColor="border-red-200" />
      </div>

      {/* Categories Grid */}
      <div className="px-4 mt-2 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
          {t('browse_sections')}
          <button onClick={() => onNavigate('menu')} className="text-sm font-normal text-red-600">{t('all_branches')}</button>
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
              className="relative rounded-xl overflow-hidden shadow-sm aspect-[4/3] bg-white border border-gray-100 cursor-pointer group"
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                <span className="text-white font-medium p-3 w-full text-center text-sm">{cat.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Latest Products */}
      <div className="px-4 mt-4 mb-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">{t('top_products')}</h2>
        <div className="grid grid-cols-2 gap-3">
          {randomProducts.map(product => (
            <div key={product.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex flex-col">
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-3">{product.format}</p>
              
              <div className="mt-auto flex items-center justify-between">
                <span className="font-bold text-red-600">{product.price} {t('currency')}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors active:scale-95"
                >
                  <ShoppingCart size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </motion.div>
      )}
    </div>
  );
}

function QuickAccessButton({ 
  icon, 
  label, 
  color, 
  textColor, 
  borderColor,
  onClick
}: { 
  icon: ReactNode; 
  label: string; 
  color: string; 
  textColor: string;
  borderColor?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button 
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex flex-col items-center justify-center p-4 rounded-2xl ${color} ${borderColor ? `border ${borderColor}` : ''} shadow-sm w-full gap-2`}
    >
      {icon}
      <span className={`font-semibold text-sm ${textColor}`}>{label}</span>
    </motion.button>
  );
}
