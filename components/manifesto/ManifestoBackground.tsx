import { memo } from 'react';

const ManifestoBackground = memo(() => {
  return (
    <>
      {/* 1. Grainy Texture */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.05] mix-blend-overlay" 
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
      />

      {/* 2. Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#D2FF00] rounded-full blur-[250px] opacity-[0.03]" />
      </div>

      {/* 3. Decorative Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0">
         <span className="text-[18vw] font-display font-black text-white/[0.02] pointer-events-none select-none tracking-tighter">
            ALCOVIA
         </span>
      </div>
    </>
  );
});

ManifestoBackground.displayName = 'ManifestoBackground';
export default ManifestoBackground;