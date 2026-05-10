import { useAppContext } from '../context/AppContext';
import { Package, RotateCcw, ChevronRight, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Tab } from '../types';

export default function OrdersScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { t, orders, addItemsToCart } = useAppContext();

  const handleReorder = (orderItems: typeof orders[0]['items']) => {
    addItemsToCart(orderItems);
    onNavigate('cart');
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col h-full bg-gray-50 pb-20 items-center justify-center p-6">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <Package size={48} className="text-gray-300 dark:text-gray-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t('no_orders')}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs text-center">{t('no_orders_desc')}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 pb-20">
      <header className="bg-white dark:bg-gray-800 px-4 py-4 sticky top-0 z-10 shadow-sm text-center border-b border-gray-100 dark:border-gray-700">
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('orders_title')}</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-4 border-b border-gray-50 dark:border-gray-700 pb-3">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <Package size={20} className="text-red-500" />
                    {index === 0 ? t('last_order') : `${t('orders_title')} #${order.id.toUpperCase()}`}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {t('order_date')}: {order.date.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-left" dir="ltr">
                  <span className="font-bold text-red-600 block leading-tight">
                    {order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)} {t('currency')}
                  </span>
                  <span className="text-xs text-gray-500 block mt-1">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} {t('items')}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {order.items.map(item => (
                  <div key={item.id} className="w-16 shrink-0 relative bg-gray-50 dark:bg-gray-700 rounded-xl p-1 border border-gray-100 dark:border-gray-600">
                    <div className="w-full aspect-square bg-white dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center relative">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-contain" />
                       <span className="absolute top-0 right-0 bg-gray-800/80 text-white text-[10px] w-4 h-4 rounded-bl-lg flex items-center justify-center font-bold">
                          {item.quantity}
                       </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                {index === 0 && (
                  <button
                      onClick={() => alert(`Tracking info: Your order is on the way! Status: Preparing`)}
                      className="flex-1 flex flex-col items-center justify-center gap-1 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/40 text-orange-600 font-bold py-2 rounded-xl transition-colors active:scale-[0.98]"
                  >
                      <Truck size={18} />
                      <span className="text-xs">{t('track_order')}</span>
                  </button>
                )}
                <button
                  onClick={() => handleReorder(order.items)}
                  className="flex-1 flex flex-col items-center justify-center gap-1 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 font-bold py-2 rounded-xl transition-colors active:scale-[0.98]"
                >
                  <RotateCcw size={18} />
                  <span className="text-xs">{t('reorder_last_order')}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
