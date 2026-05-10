import { useEffect } from 'react';
import { motion } from 'motion/react';
import Logo from '../components/Logo';
import { useAppContext } from '../context/AppContext';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const { t } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-white text-gray-900 overflow-hidden">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center justify-center p-8 text-center"
      >
        <Logo className="w-80" />
         <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center mt-6"
         >
            <span className="text-lg font-bold text-gray-800 bg-gray-50 px-4 py-1 rounded-full mb-3 shadow-sm border border-gray-100">
                {t('experience')}
            </span>
            <p className="text-gray-500 font-medium">
                {t('branches_count')}
            </p>
         </motion.div>
      </motion.div>
    </div>
  );
}
