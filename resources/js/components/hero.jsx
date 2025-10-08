export default function Hero() {
  return (
    <div className="w-full bg-gray-800 bg-cover flex justify-center items-start py-8">
      <img
        src="/RE2Remake.webp"
        alt="Hero image du jeu RE2 Remake"
        className="w-3/4 h-auto rounded-lg shadow-lg"
        width={960}  
        height={540}
        loading="eager" 
        fetchPriority="high"
      />
    </div>
  );
}
