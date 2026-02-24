const brands = [
  "Aksamala",
  "Nakama",
  "Habbie",
  "Realhe",
  "Achievement",
  "Satyalaksana",
  "Vitabumin",
  "Yayle",
  "Richsweet",
  "Telon Lega",
  "Minyak Telon",
  "Minyak Kayu Putih",
  "Hair Oil",
  "Aromatherapy",
  "Parfum",
];

type BrandsEcosystemProps = {
  isDarkMode?: boolean;
  locale: "en" | "id";
};

export default function BrandsEcosystem({
  isDarkMode = false,
  locale,
}: BrandsEcosystemProps) {
  const title = locale === "id" ? "Brand Kami" : "Our Brands";

  return (
    <section
      className={`py-16 md:py-20 overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-[#151922]" : "bg-[#F6F6F7]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-8 md:mb-10">
          <h2
            className={`text-3xl md:text-5xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h2>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 left-0 w-20 z-10 ${
              isDarkMode
                ? "bg-gradient-to-r from-[#151922] to-transparent"
                : "bg-gradient-to-r from-[#F6F6F7] to-transparent"
            }`}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 right-0 w-20 z-10 ${
              isDarkMode
                ? "bg-gradient-to-l from-[#151922] to-transparent"
                : "bg-gradient-to-l from-[#F6F6F7] to-transparent"
            }`}
          />

          <div className="overflow-hidden">
            <div className="flex w-max animate-[marqueeRight_30s_linear_infinite]">
              {[...brands, ...brands].map((brand, index) => (
                <div
                  key={`${brand}-${index}`}
                  className="h-20 min-w-[180px] px-6 flex items-center justify-center"
                >
                  <div
                    className={`text-xl md:text-2xl font-semibold tracking-tight transition duration-300 grayscale hover:grayscale-0 ${
                      isDarkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {brand}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
