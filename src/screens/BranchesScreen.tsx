import { MapPin, Phone, MessageCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';

const branches = [
  { name: 'المهندسين', address: '69 ش شهاب تقاطع لبنان بجوار مزايا', phones: ['01210222822', '01210222922', '0233463222', '0233488777'] },
  { name: 'ش الجلاء (1)', address: 'أمام موقف الجلاء', phones: ['0403298793', '01200400094', '01207222322'] },
  { name: 'ش الجلاء (2)', address: 'أمام قاعة جرين بالاس', phones: ['0403546290'] },
  { name: 'ش الجلاء (3)', address: 'بجوار الأمن المركزي', phones: ['0403282323', '01200400461'] },
  { name: 'ش البورصة', address: 'بجوار قسم أول - أسفل مول الشهاوي', phones: ['0403358874', '01121369758'] },
  { name: 'ش الأشرف', address: 'مع المرشحة', phones: ['0403313012', '01200400459'] },
  { name: 'كفر عصام', address: 'بجوار مدرسة أم المؤمنين', phones: ['0403332816', '01207271272'] },
  { name: 'ش سعيد', address: 'آخر ش سعيد مع عمرو بن عبد العزيز', phones: ['0403318734', '01200400469'] },
  { name: 'المعرض', address: 'طريق القاهرة الزراعي أمام مديرية الطب', phones: ['0403329519', '01200400424'] },
  { name: 'طريق اسكندرية الزراعي', address: 'بعد بنزينة اندريا أمام بوابة الجامعة - الطب النفسي', phones: ['0403344350', '01200400471'] },
  { name: 'المحافظة', address: 'أول ش النحاس من ش البحر', phones: ['0403333406', '01222258867'] },
];

export default function BranchesScreen() {
  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 overflow-y-auto">
      <header className="bg-white px-4 py-4 sticky top-0 z-10 shadow-sm text-center border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-800">فروعنا</h1>
        <p className="text-sm text-red-600 font-semibold mt-1">نقدم خدماتنا في أكثر من ١٥ فرع</p>
      </header>
      
      {/* Support Info Cards */}
      <div className="p-4 flex flex-col gap-3">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center justify-between"
        >
            <div className="flex-1">
              <h3 className="font-bold text-green-800 flex items-center gap-2 mb-1">
                <MessageCircle size={18} />
                واتس آب الفروع
              </h3>
              <p className="text-green-700 text-sm font-medium mb-3" dir="ltr">01200400461</p>
              <a 
                href="https://wa.me/201200400461" 
                target="_blank" 
                rel="noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-green-700 active:scale-95 transition-all inline-block"
              >
                مراسلة
              </a>
            </div>
            
            <div className="bg-white p-2 rounded-lg shadow-sm">
                <QRCodeSVG value="https://wa.me/201200400461" size={70} />
            </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center justify-between"
        >
            <div>
              <h3 className="font-bold text-orange-800 flex items-center gap-2 mb-1">
                <AlertCircle size={18} />
                شكاوي واقتراحات
              </h3>
              <p className="text-orange-700 text-sm font-medium" dir="ltr">01200400089</p>
            </div>
            <a 
              href="tel:01200400089" 
              className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-orange-700 active:scale-95 transition-all"
            >
              اتصال
            </a>
        </motion.div>
      </div>

      <div className="p-4 space-y-4">
        {branches.map((branch, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={idx} 
            className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <h3 className="font-bold text-lg text-red-600 mb-2 flex items-center gap-2">
              <MapPin size={20} />
              {branch.name}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed font-medium">
              {branch.address}
            </p>
            <div className="space-y-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl border border-gray-100 dark:border-gray-600 mb-4">
              {branch.phones.map((phone, pIdx) => (
                <a href={`tel:${phone}`} key={pIdx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 text-sm hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium">
                  <Phone size={16} className="text-red-500 shrink-0" />
                  <span dir="ltr">{phone}</span>
                </a>
              ))}
            </div>
            
            {/* Map View */}
            <div className="w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
              <iframe 
                src={`https://maps.google.com/maps?width=100%25&height=200&hl=ar&q=${encodeURIComponent('صيدليات البنداري ' + branch.address + ' طنطا')}&t=&z=14&ie=UTF8&iwloc=B&output=embed`} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{border: 0}} 
                allowFullScreen={false} 
                aria-hidden="false" 
                tabIndex={0}
                title={`خريطة فرع ${branch.name}`}
              ></iframe>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
