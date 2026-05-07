import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { Tab } from '../types';

export default function CartScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useAppContext();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center pt-24">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart size={64} className="text-gray-300" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">السلة فارغة</h2>
        <p className="text-gray-500 mb-8 max-w-xs">يبدو أنك لم تقم بإضافة أي منتج حتى الآن.</p>
        <button 
          onClick={() => onNavigate('home')}
          className="bg-red-600 text-white rounded-xl py-4 px-8 font-semibold shadow-md active:bg-red-700 w-full max-w-xs"
        >
          تصفح المنتجات
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-10 shadow-sm text-center">
        <h1 className="text-lg font-bold text-gray-800">سلة المشتريات</h1>
      </header>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence>
          {cart.map(item => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-3"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.format}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-1">
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-red-600">{item.price} ج.م</span>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 bg-white rounded shadow-sm flex items-center justify-center text-gray-700 active:scale-95"
                    >
                      <Plus size={16} />
                    </button>
                    <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className={`w-7 h-7 bg-white rounded shadow-sm flex items-center justify-center active:scale-95 ${item.quantity <= 1 ? 'text-gray-300' : 'text-gray-700'}`}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Checkout Bar */}
      <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0">
        <div className="flex justify-between items-center mb-4 text-sm">
          <span className="text-gray-600">المجموع ({cart.length} منتجات)</span>
          <span className="font-bold text-lg text-gray-900">{total} ج.م</span>
        </div>
        <button 
          onClick={() => {
              alert('تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً لتأكيد الطلب.');
              clearCart();
              onNavigate('orders');
          }}
          className="w-full bg-red-600 text-white rounded-xl py-4 font-bold text-lg shadow-md active:bg-red-700 active:scale-[0.98] transition-transform"
        >
          تأكيد الطلب
        </button>
      </div>
    </div>
  );
}
