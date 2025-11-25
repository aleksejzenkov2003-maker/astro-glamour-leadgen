const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[hsl(var(--mystical-dark))]">
      {/* Main cosmic gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200_40%_8%)] via-[hsl(200_35%_10%)] to-[hsl(200_30%_12%)]" />
      
      {/* Glowing orbs in background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-mystical" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] animate-pulse-mystical" style={{animationDelay: "1.5s"}} />
      
      {/* Animated stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-primary/60 animate-pulse-glow"
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
      
      {/* Mystical particles */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute text-primary/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${8 + Math.random() * 6}px`,
            }}
          >
            ✨
          </div>
        ))}
      </div>
      
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
    </div>
  );
};

export default CosmicBackground;
