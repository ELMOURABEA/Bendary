import { Camera, Image as ImageIcon, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function PrescriptionScreen() {
  const { t } = useAppContext();
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-10 shadow-sm text-center">
        <h1 className="text-lg font-bold text-gray-800">{t('send_rx')}</h1>
      </header>

      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        
        {/* Upload Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl font-black text-red-600">Rx</span>
          </div>
          
          <h2 className="text-lg font-bold text-gray-800 mb-1">{t('rx_images')}</h2>
          <p className="text-sm text-gray-500 mb-6 text-center">{t('rx_images_desc')}</p>
          
          <div className="flex gap-4 w-full">
            <button className="flex-1 bg-red-600 active:bg-red-700 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-colors">
              <Camera size={20} />
              {t('camera')}
            </button>
            <button className="flex-1 bg-white border border-gray-200 active:bg-gray-50 text-gray-700 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-colors shadow-sm">
              <ImageIcon size={20} className="text-red-500" />
              {t('gallery')}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-400 font-medium text-sm">{t('or')}</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Text Input Section */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <label className="block text-sm font-bold text-gray-700 mb-2">{t('write_request')}</label>
          <textarea 
            rows={5}
            placeholder={t('write_request_placeholder')}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
          ></textarea>
        </div>

      </div>

      {/* Submit Button */}
      <div className="p-4 bg-white border-t border-gray-100">
        <button className="w-full bg-red-600 text-white rounded-xl py-4 flex items-center justify-center gap-2 font-bold text-lg shadow-md active:bg-red-700 active:scale-[0.98] transition-transform">
          {t('send_request')}
          <Send size={20} className="transform rtl:-scale-x-100" />
        </button>
      </div>

    </div>
  );
}
