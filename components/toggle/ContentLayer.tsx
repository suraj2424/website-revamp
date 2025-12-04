import { forwardRef } from 'react';
import FeatureCard from './FeatureCard';
import { FeatureItem } from './data';

interface ContentLayerProps {
  variant: 'dark' | 'lime';
  title: React.ReactNode;
  subtitle: string;
  features: FeatureItem[];
  className?: string;
}

const ContentLayer = forwardRef<HTMLDivElement, ContentLayerProps>(
  ({ variant, title, subtitle, features, className }, ref) => {
    
    const isDark = variant === 'dark';
    const bgClass = isDark ? 'bg-[#0A0A0A]' : 'bg-[#D2FF00]';
    const textColor = isDark ? 'text-white' : 'text-black';
    const borderColor = isDark ? 'border-[#D2FF00]' : 'border-black';
    const subTextColor = isDark ? 'text-gray-400' : 'text-black/80';

    return (
      <div
        ref={ref}
        // CHANGED: Removed 'absolute inset-0'. 
        // Added 'w-full h-full' to ensure it fills the grid area.
        // Maintained padding for the look.
        className={`w-full h-full z-${isDark ? '0' : '20'} ${bgClass} flex flex-col p-6 md:p-10 ${className || ''}`}
      >
        {/* Decorative Background Blur */}
        <div className={`absolute ${isDark ? 'top-[-20%] right-[-10%] bg-[#D2FF00]/[0.02]' : 'bottom-[-20%] left-[-10%] bg-white/20'} w-[60%] h-[60%] rounded-full blur-[120px] pointer-events-none`} />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header Section */}
          <div className="max-w-3xl relative">
            <h3 className={`text-animate ${textColor} font-display text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-[0.9] mb-3 md:mb-4`}>
              {title}
            </h3>
            <p className={`text-animate ${subTextColor} text-sm md:text-base leading-relaxed border-l-2 ${borderColor} pl-4 font-medium max-w-lg`}>
              {subtitle}
            </p>
          </div>

          {/* 
             Gap Control:
             mt-auto ensures cards push down if there's extra space, 
             but since we removed fixed height, this just acts as a minimum spacer.
             Added 'pb-2' to give a tiny breathing room at bottom if needed.
          */}
          <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full pb-1">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} item={feature} variant={variant} />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

ContentLayer.displayName = 'ContentLayer';
export default ContentLayer;