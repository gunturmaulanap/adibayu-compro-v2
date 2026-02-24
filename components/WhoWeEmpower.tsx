import Image from "next/image";
import { Factory, Truck, Store } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

const entities = [
  {
    name: "Manufacturing",
    description:
      "Strengthening production systems through governance, quality discipline, and scale readiness.",
    icon: Factory,
  },
  {
    name: "Distribution",
    description:
      "Enabling reliable market reach with strategic logistics planning and operational coordination.",
    icon: Truck,
  },
  {
    name: "Retail",
    description:
      "Supporting customer-facing excellence with brand consistency and channel performance oversight.",
    icon: Store,
  },
];

type WhoWeEmpowerProps = {
  isDarkMode?: boolean;
  locale: Locale;
};

export default function WhoWeEmpower({
  isDarkMode = false,
  locale,
}: WhoWeEmpowerProps) {
  const t = copy[locale].home.whoWeEmpower;

  return (
    <section
      id="our-companies"
      className={`py-20 md:py-24 transition-colors duration-300 ${
        isDarkMode ? "bg-[#0B0F19]" : "bg-white"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          <div
            className={`relative min-h-[300px] md:min-h-[420px] w-full overflow-hidden border rounded-2xl ${
              isDarkMode ? "border-white/15" : "border-gray-200"
            }`}
          >
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
              alt="Modern corporate headquarters building"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            {isDarkMode && <div className="absolute inset-0 bg-black/30" />}
          </div>

          <div className="flex flex-col justify-center">
            <h2
              className={`text-3xl md:text-5xl font-bold tracking-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {t.title}
            </h2>
            <p
              className={`mt-5 text-base md:text-lg leading-relaxed max-w-2xl ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {t.subtitle}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {entities.map((entity, index) => (
                <article
                  key={entity.name}
                  className={`border p-5 transition-colors duration-300 rounded-xl ${
                    isDarkMode
                      ? "border-white/15 hover:bg-white/5"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <entity.icon
                      className={`w-5 h-5 mt-0.5 ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                      strokeWidth={1.4}
                    />
                    <div>
                      <h3
                        className={`text-lg font-semibold tracking-tight ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {t.entities[index]?.name ?? entity.name}
                      </h3>
                      <p
                        className={`mt-2 text-sm leading-relaxed ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {t.entities[index]?.description ?? entity.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
