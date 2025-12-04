import { memo } from 'react';

export type ManifestoItem = {
  text: string;
  highlight?: boolean;
  underline?: boolean;
  opacity?: string;
};

interface ManifestoContentProps {
  content: ManifestoItem[];
}

const ManifestoContent = memo(({ content }: ManifestoContentProps) => {
  return (
    <div className="max-w-7xl w-full mx-auto relative z-10 px-4 sm:px-6 overflow-hidden">
      
      {/* Label */}
      <div className="manifesto-label text-center mb-6 md:mb-16 overflow-hidden opacity-0 translate-y-10">
        <span className="inline-block text-[#D2FF00] tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold px-4 py-2 border border-[#D2FF00]/20 rounded-full bg-[#D2FF00]/5 backdrop-blur-sm">
          The Mission
        </span>
      </div>

      {/* Main Text Block */}
      <div
        className="flex flex-wrap justify-center text-center w-full max-w-full"
        style={{
          // REVISED FORMULA:
          // Min: 1rem (16px) -> Fits "TOMORROW" on iPhone SE
          // Val: 5vw -> Grows much slower
          // Max: 4rem (64px) -> Prevents it from looking huge on desktop
          fontSize: 'clamp(1rem, 5vw, 4rem)', 
          lineHeight: '1.2'
        }}
      >
        {content.map((item, groupIndex) => (
          <span key={groupIndex} className="contents">
            {item.text.split(" ").map((word, wordIndex) => {
              if (word === "") return <span key={`${groupIndex}-${wordIndex}`} className="w-[0.2em] inline-block" />;

              const isSerif = item.highlight;
              
              const fontClasses = isSerif
                ? "font-serif italic text-[#D2FF00] font-light tracking-normal"
                : `font-display font-bold uppercase tracking-tighter ${item.opacity || 'text-white'}`;

              const underlineClasses = item.underline
                ? "border-b-[1px] md:border-b-[3px] border-[#D2FF00]"
                : "";

              return (
                <span
                  key={`${groupIndex}-${wordIndex}`}
                  // FIX: Added break-all for mobile to FORCE wrap if word is too long
                  // Switched margins to be responsive
                  className={`relative inline-block mr-[0.2em] mb-2 align-top max-w-full break-all sm:break-normal ${underlineClasses}`}
                >
                  {/* LAYER 1: The Text */}
                  <span className={`manifesto-text block ${fontClasses} opacity-0`}>
                    {word}
                  </span>

                  {/* LAYER 2: The Block Overlay */}
                  <span 
                    className="manifesto-block absolute inset-0 bg-[#D2FF00] z-10 will-change-transform mix-blend-screen"
                    style={{ 
                      transform: 'scaleY(0)', 
                      transformOrigin: 'top' 
                    }} 
                  />
                </span>
              );
            })}
          </span>
        ))}
      </div>
    </div>
  );
});

ManifestoContent.displayName = 'ManifestoContent';
export default ManifestoContent;