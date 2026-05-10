import { ShoppingCart, Plus, Minus, Trash2, Tag, CreditCard, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { Tab } from '../types';
import { useState } from 'react';

export default function CartScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { cart, updateQuantity, removeFromCart, clearCart, addOrder, t } = useAppContext();
  const [couponCode, setCouponCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'instapay'>('cash');
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal - discount;

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'bendary10') {
      setDiscount(Math.round(subtotal * 0.1)); // 10% discount
    } else {
      alert('Invalid coupon code');
      setDiscount(0);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center pt-24 bg-gray-50 dark:bg-gray-900">
        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart size={64} className="text-gray-300 dark:text-gray-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t('empty_cart')}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">{t('empty_cart_desc')}</p>
        <button 
          onClick={() => onNavigate('home')}
          className="bg-red-600 text-white rounded-xl py-4 px-8 font-semibold shadow-md hover:bg-red-700 active:scale-[0.98] transition-all w-full max-w-xs"
        >
          {t('browse_products')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 px-4 py-4 sticky top-0 z-10 shadow-sm text-center border-b border-gray-100 dark:border-gray-700">
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('cart_title')}</h1>
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
              className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 flex gap-3 relative"
            >
              <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shrink-0 border border-gray-100 dark:border-gray-600">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                  <div className="pr-6">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm leading-tight mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.format}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="absolute top-3 left-3 rtl:right-auto rtl:left-3 ltr:right-3 ltr:left-auto text-gray-400 hover:text-red-500 transition-colors p-1">
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-red-600 dark:text-red-500">{item.price} {t('currency')}</span>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 bg-white dark:bg-gray-600 rounded shadow-sm flex items-center justify-center text-gray-700 dark:text-gray-200 active:scale-95"
                    >
                      <Plus size={16} />
                    </button>
                    <span className="w-8 text-center font-semibold text-sm dark:text-gray-100">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className={`w-7 h-7 bg-white dark:bg-gray-600 rounded shadow-sm flex items-center justify-center active:scale-95 ${item.quantity <= 1 ? 'text-gray-300 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200'}`}
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

        {/* Promo Code Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Tag size={18} className="text-gray-500 dark:text-gray-400" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{t('coupon_code')}</h3>
          </div>
          <div className="flex gap-2">
            <input 
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="e.g. BENDARY10"
              className="flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 outline-none focus:border-red-400 dark:text-white"
            />
            <button 
              onClick={applyCoupon}
              className="bg-gray-800 dark:bg-gray-600 text-white px-4 py-2 rounded-xl font-medium"
            >
              {t('apply_coupon')}
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={18} className="text-gray-500 dark:text-gray-400" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{t('payment_method')}</h3>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-gray-100 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input 
                type="radio" 
                name="payment" 
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
                className="text-red-600 focus:ring-red-500 w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('cash_on_delivery')}</span>
            </label>
            
            <label className="flex items-center gap-3 p-3 border border-gray-100 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input 
                type="radio" 
                name="payment" 
                value="instapay"
                checked={paymentMethod === 'instapay'}
                onChange={() => setPaymentMethod('instapay')}
                className="text-red-600 focus:ring-red-500 w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('instapay')} / {t('wallets')}</span>
            </label>
          </div>
          
          {paymentMethod === 'instapay' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-xl text-sm font-medium text-center border border-red-100 dark:border-red-900/30"
            >
              {t('instapay_number_info')}
            </motion.div>
          )}
        </div>
      </div>

      {/* Checkout Bar */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 sticky bottom-0">
        <div className="space-y-2 mb-4">
           {discount > 0 && (
            <div className="flex justify-between items-center text-sm">
                <span className="text-red-600">Discount</span>
                <span className="font-medium text-red-600">-{discount} {t('currency')}</span>
            </div>
           )}
           <div className="flex justify-between items-center text-sm">
             <span className="text-gray-600 dark:text-gray-400">{t('total')} ({cart.length} {t('products_count')})</span>
             <span className="font-bold text-lg text-gray-900 dark:text-white">{total} {t('currency')}</span>
           </div>
        </div>
        <button 
           onClick={() => {
              if (cart.length > 0) {
                 addOrder(cart);
              }
              alert(t('order_success'));
              clearCart();
              onNavigate('orders');
           }}
           className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-4 font-bold text-lg shadow-md active:scale-[0.98] transition-all"
        >
           {t('checkout')}
        </button>
      </div>
    </div>
  );
}
