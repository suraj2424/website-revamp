import { socialLinks } from './data';

export default function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-8 mt-4 md:mt-0 relative z-30">
      {socialLinks.map((social, idx) => (
        <a
          key={idx}
          href={social.url}
          className="group relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110 hover:border-[#D2FF00] hover:shadow-[0_0_20px_rgba(210,255,0,0.3)]"
        >
          <div className="absolute inset-0 bg-[#D2FF00] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          <social.icon 
            className="relative z-10 w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-black transition-colors duration-300" 
            strokeWidth={1.5}
          />
        </a>
      ))}
    </div>
  );
}