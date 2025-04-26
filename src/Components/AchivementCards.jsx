export default function AchievementCard({ src, title, description }) {
    return (
  
    <div className="bg-blue-950 text-white p-6 rounded-3xl shadow-lg w-64 transition-transform hover:-translate-y-2 hover:shadow-blue-500/40 duration-300">
    <div className="flex flex-col items-center">
      <div className="bg-blue-800 p-4 rounded-full shadow-inner mb-4">
        <img
          src={src}
          alt={title}
          className="w-24 h-24 object-contain drop-shadow-lg"
        />
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-white mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-blue-200 text-center">{description}</p>
      )}
    </div>
  </div>
    );
  }