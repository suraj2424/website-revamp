// app/page.tsx
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Offerings from '@/components/Offerings';
import ToggleSection from '@/components/ToggleSection';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Socials from '@/components/Socials';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="bg-[#050505] text-white overflow-x-hidden">
      {/* Global Components */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Manifesto Section */}
      <section id="manifesto">
        <Manifesto />
      </section>

      {/* Offerings Section */}
      <section id="offerings">
        <Offerings />
      </section>

      {/* Toggle Section - At School vs Outside School */}
      <section id="toggle">
        <ToggleSection />
      </section>

      {/* Socials Section - Fanned Cards Gallery */}
      <section id="socials">
        <Socials />
      </section>

      {/* Footer */}
      <footer id="footer">
        <Footer />
      </footer>
    </main>
  );
}