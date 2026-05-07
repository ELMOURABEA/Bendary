export default function OrdersScreen() {
  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 items-center justify-center p-6">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">📦</span>
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">لا توجد طلبات سابقة</h2>
      <p className="text-gray-500 mb-8 max-w-xs text-center">قم بتسجيل الدخول لمتابعة طلباتك أو اطلب أول طلب لك الآن.</p>
    </div>
  );
}
