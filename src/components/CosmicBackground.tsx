const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main cosmic gradient */}
      <div className="absolute inset-0 bg-gradient-cosmic" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-mystical" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[120px] animate-pulse-mystical" style={{animationDelay: "1.5s"}} />
      
      {/* Animated stars */}
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white animate-pulse-glow"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      
      {/* Shooting stars */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={`comet-${i}`}
            className="absolute"
            style={{
              animation: `comet ${8 + i * 3}s linear infinite`,
              animationDelay: `${i * 4}s`,
              top: `${Math.random() * 30}%`,
              left: `-10%`,
            }}
          >
            <div className="relative">
              <div className="w-2 h-2 bg-accent rounded-full shadow-[0_0_15px_hsl(var(--accent))]" />
              <div 
                className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] bg-gradient-to-r from-accent via-accent/50 to-transparent"
                style={{ width: '80px', transform: 'translateY(-50%) translateX(-80px)' }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Mystical overlay */}
      <div className="absolute inset-0 bg-gradient-mystical" />
      
      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default CosmicBackground;
