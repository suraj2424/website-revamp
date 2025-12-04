// app/page.tsx
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Offerings from '@/components/Offerings';
import ToggleSection from '@/components/ToggleSection';
import Footer from '@/components/Footer';
import Socials from '@/components/Socials';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Manifesto />
      <Offerings />
      <ToggleSection />
      <Socials />
      <Footer />
    </main>
  );
}