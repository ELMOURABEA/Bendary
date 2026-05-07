export default function Logo({ className = "w-64" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg viewBox="0 0 400 320" className="w-full h-auto">
        <g stroke="#dc2626" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Snake shape and base */}
          <path d="M 120 220 L 120 170 C 120 150, 80 150, 80 120 C 80 90, 180 100, 180 140 L 140 150" />
          <ellipse cx="120" cy="220" rx="30" ry="8" />
          <circle cx="85" cy="95" r="5" fill="#dc2626" stroke="none" />
          
          {/* Apple shape connection */}
          <path d="M 200 150 C 180 170, 200 220, 250 220 C 300 220, 320 170, 310 120 C 300 70, 250 80, 240 110" />
          <path d="M 230 220 C 260 240, 300 230, 310 210" />
        </g>
        
        {/* Pestle */}
        <path d="M 245 120 L 265 50 C 270 40, 280 40, 280 50 L 260 120 Z" fill="#374151" />
        
        {/* Leaves */}
        <path d="M 280 50 C 290 20, 310 30, 320 50 C 310 70, 290 60, 280 50 Z" fill="#84cc16" />
        <path d="M 320 60 C 330 35, 350 45, 360 65 C 350 85, 330 75, 320 60 Z" fill="#84cc16" />

        {/* Text */}
        <text x="200" y="260" textAnchor="middle" fill="#dc2626" fontSize="24" fontWeight="bold" fontFamily="Tajawal, sans-serif">صيدليات البنداري</text>
        <text x="210" y="295" textAnchor="middle" fill="#111827" fontSize="42" fontWeight="900" fontFamily="sans-serif" letterSpacing="0">BENDAR</text>
        <text x="210" y="315" textAnchor="middle" fill="#111827" fontSize="16" fontWeight="bold" fontFamily="sans-serif">since 1980</text>
      </svg>
    </div>
  );
}
