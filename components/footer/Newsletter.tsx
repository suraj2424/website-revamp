'use client';

import { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail('');

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <div className="py-16 md:py-20 border-b border-white/10">
      <div className="footer-reveal max-w-2xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 bg-white/10 text-[#D2FF00] text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-6 border border-white/5">
          Newsletter
        </span>
        <h3 className="text-3xl md:text-4xl font-display uppercase tracking-tight mb-4 text-white">
          Stay Ahead of the Curve
        </h3>
        <p className="text-white/60 mb-8 max-w-md mx-auto leading-relaxed">
          Get exclusive insights, program updates, and leadership tips delivered straight to your inbox.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/30 focus:outline-none focus:border-[#D2FF00]/50 focus:ring-2 focus:ring-[#D2FF00]/20 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || isSubscribed}
            className={`px-8 py-4 rounded-full font-bold uppercase text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2 min-w-[160px] ${
              isSubscribed
                ? 'bg-green-500 text-white'
                : 'bg-[#D2FF00] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(210,255,0,0.3)]'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isSubscribed ? (
              <>
                <Check className="w-5 h-5" />
                Subscribed!
              </>
            ) : (
              <>
                Subscribe
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-white/30 mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}