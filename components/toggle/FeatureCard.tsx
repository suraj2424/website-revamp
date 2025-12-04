import { FeatureItem } from './data';

interface FeatureCardProps {
  item: FeatureItem;
  variant: 'dark' | 'lime';
}

export default function FeatureCard({ item, variant }: FeatureCardProps) {
  const isDark = variant === 'dark';
  const Icon = item.icon;
  
  // Style Logic based on Reference Image
  // Dark Mode: Dark Card, White Text
  // Lime Mode: Slightly darker Lime Card (simulated with black opacity), Black Text
  const cardBg = isDark 
    ? 'bg-[#1A1A1A] border-white/5 hover:border-white/20' 
    : 'bg-black/[0.03] border-black/5 hover:bg-black/[0.06] hover:border-black/10';
    
  const iconColor = isDark ? 'text-gray-400 group-hover:text-white' : 'text-black group-hover:scale-110';
  const titleColor = isDark ? 'text-white' : 'text-black';
  const descColor = isDark ? 'text-gray-500' : 'text-black/70';

  return (
    <div className={`feature-card group ${cardBg} border p-5 rounded-xl transition-all duration-300 h-full flex flex-col justify-start`}>
      <div className={`mb-3 transition-all duration-300 ${iconColor}`}>
        {/* Stroke width 1.5 matches the thin look in the screenshot */}
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <h4 className={`${titleColor} font-display font-bold text-sm md:text-base uppercase tracking-wider mb-2 leading-none`}>
        {item.title}
      </h4>
      <p className={`${descColor} text-[11px] md:text-xs leading-relaxed font-medium`}>
        {item.desc}
      </p>
    </div>
  );
}