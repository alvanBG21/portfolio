import ClientLayout from '@/components/ClientLayout';
import Hero from '@/components/landing/Hero';
import ImpactMetrics from '@/components/landing/ImpactMetrics';
import Projects from '@/components/landing/Projects';
import About from '@/components/landing/About';
import Skills from '@/components/landing/Skills';
import Certifications from '@/components/landing/Certifications';
import Contact from '@/components/landing/Contact';

export default function Home() {
  return (
    <ClientLayout>
      <main className="min-h-screen">
        <Hero />
        <ImpactMetrics />
        <Projects />
        <About />
        <Skills />
        <Certifications />
        <Contact />
      </main>
    </ClientLayout>
  );
}
