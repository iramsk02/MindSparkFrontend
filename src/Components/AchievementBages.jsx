const badgeStyles = {
    gold: {
      ribbon: '#7c2d12',
      medal: '#facc15',
    },
    silver: {
      ribbon: '#3b82f6',
      medal: '#e5e7eb',
    },
    bronze: {
      ribbon: '#16a34a',
      medal: '#d97706',
    },
  };
  
  export default function AchievementBadge({ type = 'gold' }) {
    const { ribbon, medal } = badgeStyles[type] || badgeStyles.gold;
  
    return (
      <div className="bg-[#0f172a] text-white rounded-2xl p-5 m-4 w-48 flex flex-col items-center shadow-lg hover:shadow-white/10 transition-shadow duration-300">
        <svg viewBox="0 0 64 64" className="w-20 h-20 mb-4">
          {/* Ribbon */}
          <path d="M16 0 L24 16 L32 0 L40 16 L48 0" fill={ribbon} />
          {/* Medal Circle */}
          <circle cx="32" cy="40" r="16" fill={medal} stroke="white" strokeWidth="2" />
          {/* Star */}
          <path
            d="M32 33 L34 39 L40 40 L35 44 L36 50 L32 47 L28 50 L29 44 L24 40 L30 39 Z"
            fill="white"
          />
        </svg>
        <h3 className="capitalize text-lg font-semibold">{type} badge</h3>
      </div>
    );
  }
  