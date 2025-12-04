export default function HeroBackground({ bgRef }: { bgRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div 
      ref={bgRef} 
      className="absolute inset-0 w-full h-[140%] -top-[20%] z-0 will-change-transform pointer-events-none"
    >
      {/* Dark Base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(210,255,0,0.03)_0%,transparent_70%)]" />

      {/* Animated orbs - Static CSS animation is more performant for infinite loops than JS */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#D2FF00] rounded-full blur-[120px] md:blur-[200px] opacity-[0.06] animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-[#D2FF00] rounded-full blur-[100px] md:blur-[180px] opacity-[0.04]" />
      
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px' // Slightly smaller grid for better mobile look
        }}
      />
      
      {/* Bottom fade to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
    </div>
  );
}