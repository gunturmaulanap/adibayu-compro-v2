'use client';

import { motion } from 'motion/react';
import { Factory, Truck, Store, Globe } from 'lucide-react';

const pillars = [
  {
    id: 1,
    title: 'Manufacture',
    description: 'Engineering excellence and scalable production capabilities driving foundational value.',
    icon: Factory,
  },
  {
    id: 2,
    title: 'Distribution',
    description: 'Strategic logistics and supply chain optimization ensuring seamless market access.',
    icon: Truck,
  },
  {
    id: 3,
    title: 'Retail',
    description: 'Consumer-centric touchpoints delivering premium experiences and market penetration.',
    icon: Store,
  },
  {
    id: 4,
    title: 'Impact',
    description: 'Sustainable growth and community empowerment creating long-term societal value.',
    icon: Globe,
  },
];

export default function ValueChain() {
  return (
    <section id="section-3" className="py-32 bg-[#F6F6F7] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-20 md:mb-32">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Value Ecosystem
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            An integrated approach to strategic value creation. Our holding structure empowers core sectors to operate interdependently, driving sustainable growth across the entire value chain.
          </p>
        </div>

        <div className="relative">
          {/* Continuous Line connecting the ecosystem */}
          <div className="absolute top-32 left-0 w-full h-px bg-gray-200 hidden md:block">
            <motion.div 
              className="h-full bg-gray-900 w-1/3"
              animate={{ x: ['-100%', '300%'] }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {pillars.map((pillar, index) => (
              <div key={pillar.id} className="flex flex-col relative">
                {/* Icon Area */}
                <div className="h-32 flex items-center justify-start">
                  <motion.div
                    animate={{ x: [0, 15, 0] }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut", 
                      delay: index * 0.5 
                    }}
                  >
                    <pillar.icon className="w-10 h-10 text-gray-900" strokeWidth={1} />
                  </motion.div>
                </div>
                
                {/* Mobile Line */}
                <div className="h-px w-full bg-gray-200 mb-8 md:hidden relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-gray-900 w-1/2"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.2 }}
                  />
                </div>

                {/* Desktop Spacer for the absolute line */}
                <div className="hidden md:block h-px w-full mb-8"></div>

                {/* Text Area */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed pr-4">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
