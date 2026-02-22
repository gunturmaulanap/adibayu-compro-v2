import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ValueChain from '@/components/ValueChain';

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ValueChain />
      
      <section id="section-6" className="h-screen bg-white flex flex-col items-center justify-center border-b border-gray-100">
        <h2 className="text-4xl font-bold tracking-tight mb-4">Impact</h2>
        <p className="text-gray-500 max-w-md text-center">Sustainable value creation across core sectors.</p>
      </section>
      
      <section id="section-7" className="h-screen bg-white flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold tracking-tight mb-4">Find Us</h2>
        <p className="text-gray-500 max-w-md text-center">Get in touch with Adibayu Group.</p>
      </section>
    </main>
  );
}
