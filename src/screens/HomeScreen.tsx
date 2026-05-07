import { Search, Bell, Phone, ShieldCheck, Tag, UserPlus, Heart, Stethoscope, FileText, ShoppingCart, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

import type { Tab } from '../types';
import { useAppContext } from '../context/AppContext';

export default function HomeScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { addToCart } = useAppContext();

  const categories = [
    { title: 'العناية بالبشرة', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=200' },
    { title: 'العناية بالشعر', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=200' },
    { title: 'أدوية', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f263?auto=format&fit=crop&q=80&w=200' },
    { title: 'الأم والطفل', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=200' },
    { title: 'العناية بالجسم', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=200' },
    { title: 'العناية بالرجل', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
  ];

  const randomProducts = [
    { id: 101, name: 'بنادول مسكن للآلام', format: 'علبة 24 قرص', price: 35, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f263?auto=format&fit=crop&q=80&w=200' },
    { id: 102, name: 'فيتامين سي 1000', format: 'عبوة 15 قرص فوار', price: 45, image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&q=80&w=200' },
    { id: 103, name: 'غسول لاروش بوزيه', format: 'عبوة 400 مل', price: 350, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=200' },
    { id: 104, name: 'شامبو صانسيلك', format: 'عبوة 400 مل', price: 65, image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=200' },
  ];

  return (
    <div className="flex flex-col pb-6">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button className="text-gray-600 hover:text-red-600 transition-colors">
            <Bell size={24} />
          </button>
          <a href="https://wa.me/201200400461" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-green-600 transition-colors">
            <MessageCircle size={24} />
          </a>
        </div>
        <div className="flex items-center gap-2 text-red-600 font-bold text-lg">
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 400 320" className="w-12 h-12 ml-1 mt-1">
              <g stroke="#dc2626" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 120 220 L 120 170 C 120 150, 80 150, 80 120 C 80 90, 180 100, 180 140 L 140 150" />
                <ellipse cx="120" cy="220" rx="30" ry="8" />
                <circle cx="85" cy="95" r="5" fill="#dc2626" stroke="none" />
              </g>
            </svg>
          </div>
          صيدليات البنداري
        </div>
      </header>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <input
            type="text"
            placeholder="البحث عن منتج ..."
            className="w-full bg-gray-100 text-gray-800 rounded-full py-3 px-4 pr-11 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
          />
          <Search className="absolute top-3 right-4 text-gray-400" size={20} />
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 gap-3 px-4 py-2">
        <QuickAccessButton icon={<ShieldCheck size={28} className="text-white" />} label="التأمين الطبي" color="bg-red-600" textColor="text-white" />
        <QuickAccessButton icon={<FileText size={28} className="text-red-600" />} label="الروشتة" color="bg-red-50" textColor="text-red-700" borderColor="border-red-200" onClick={() => onNavigate('prescription')} />
      </div>
      
      <div className="grid grid-cols-2 gap-3 px-4 py-2 mb-4">
        <QuickAccessButton icon={<Stethoscope size={28} className="text-red-600" />} label="استشير صيدلي" color="bg-white" textColor="text-red-700" borderColor="border-red-200" onClick={() => onNavigate('chat')} />
        <QuickAccessButton icon={<Tag size={28} className="text-red-600" />} label="العروض الخاصة" color="bg-white" textColor="text-red-700" borderColor="border-red-200" />
      </div>

      {/* Categories Grid */}
      <div className="px-4 mt-2 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
          تصفح الأقسام
          <button onClick={() => onNavigate('menu')} className="text-sm font-normal text-red-600">القائمة والفروع</button>
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
        <h2 className="text-lg font-bold text-gray-800 mb-4">أهم المنتجات لك</h2>
        <div className="grid grid-cols-2 gap-3">
          {randomProducts.map(product => (
            <div key={product.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex flex-col">
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-3">{product.format}</p>
              
              <div className="mt-auto flex items-center justify-between">
                <span className="font-bold text-red-600">{product.price} ج.م</span>
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
  icon: React.ReactNode; 
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
