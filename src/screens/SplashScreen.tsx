import { useEffect } from 'react';
import { motion } from 'motion/react';
import Logo from '../components/Logo';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
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
      </motion.div>
    </div>
  );
}
