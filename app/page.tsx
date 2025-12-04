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
    <main className="text-white">
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