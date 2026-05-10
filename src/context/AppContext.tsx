import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, Language, TranslationKey } from '../i18n/translations';

export type CartItem = {
  id: number;
  name: string;
  format: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  date: Date;
};

type AppContextType = {
  cart: CartItem[];
  orders: Order[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  addItemsToCart: (items: CartItem[]) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  addOrder: (items: CartItem[]) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const t = (key: TranslationKey) => {
    return translations[language][key] || key;
  };

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === newItem.id);
      if (existing) {
        return prev.map(item => item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const addItemsToCart = (items: CartItem[]) => {
    setCart(prev => {
      let currentCart = [...prev];
      items.forEach(newItem => {
        const existingIndex = currentCart.findIndex(item => item.id === newItem.id);
        if (existingIndex >= 0) {
          currentCart[existingIndex] = {
            ...currentCart[existingIndex],
            quantity: currentCart[existingIndex].quantity + newItem.quantity
          };
        } else {
          currentCart.push({ ...newItem });
        }
      });
      return currentCart;
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return { ...item, quantity: newQ > 0 ? newQ : 1 };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const addOrder = (items: CartItem[]) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...items],
      date: new Date()
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <AppContext.Provider value={{ cart, orders, addToCart, addItemsToCart, updateQuantity, removeFromCart, clearCart, addOrder, isDarkMode, toggleDarkMode, language, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
