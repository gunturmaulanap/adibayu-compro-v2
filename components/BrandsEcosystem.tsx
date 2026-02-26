import Image from "next/image";
import habbieLogo from "@/components/assets/brands/habbie.png";
import madudizLogo from "@/components/assets/brands/madudiz.png";
import paramorinaLogo from "@/components/assets/brands/paramorina.png";
import protabuminLogo from "@/components/assets/brands/protabumin.png";
import yayleLogo from "@/components/assets/brands/yayle.png";
import richsweet from "@/components/assets/brands/richsweet.png";
import vitabumin from "@/components/assets/brands/vitabumin.png";
import lega from "@/components/assets/brands/lega.png";

const brands = [
  { name: "Habbie", logo: habbieLogo },
  { name: "Madudiz", logo: madudizLogo },
  { name: "Paramorina", logo: paramorinaLogo },
  { name: "Protabumin", logo: protabuminLogo },
  { name: "Yayle", logo: yayleLogo },
  { name: "Richsweet", logo: richsweet },
  { name: "Vitabumin", logo: vitabumin },
  { name: "Lega", logo: lega },
];

const MOBILE_LOGO_SIZES: Record<string, string> = {
  Habbie: "h-[96px]",
  Madudiz: "h-[104px]",
  Paramorina: "h-[88px]",
  Protabumin: "h-[80px]",
  Yayle: "h-[88px]",
  Richsweet: "h-[88px]",
  Vitabumin: "h-[88px]",
  Lega: "h-[88px]",
};

const DESKTOP_LOGO_SIZES: Record<string, string> = {
  Habbie: "md:h-[152px] lg:h-[178px]",
};

const LOGO_MAX_WIDTHS: Record<string, string> = {
  Habbie: "max-w-[250px] md:max-w-[390px]",
};

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
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 xl:px-10">
        <div className="mb-8 md:mb-10 text-center">
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
            className={`pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-10 ${
              isDarkMode
                ? "bg-gradient-to-r from-[#151922] to-transparent"
                : "bg-gradient-to-r from-[#F6F6F7] to-transparent"
            }`}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-10 ${
              isDarkMode
                ? "bg-gradient-to-l from-[#151922] to-transparent"
                : "bg-gradient-to-l from-[#F6F6F7] to-transparent"
            }`}
          />

          <div className="overflow-hidden">
            <div className="flex w-max animate-[marqueeRight_30s_linear_infinite]">
              {[...brands, ...brands].map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="h-[160px] md:h-[240px] min-w-[320px] md:min-w-[460px] px-6 md:px-10 flex items-center justify-center"
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={460}
                    height={180}
                    className={`${MOBILE_LOGO_SIZES[brand.name] ?? "h-[66px]"} ${DESKTOP_LOGO_SIZES[brand.name] ?? "md:h-[128px] lg:h-[150px]"} w-auto ${LOGO_MAX_WIDTHS[brand.name] ?? "max-w-[220px] md:max-w-[340px]"} object-contain opacity-100 md:opacity-95  md:hover:opacity-100 transition duration-300`}
                    sizes="(max-width: 768px) 320px, 460px"
                    priority={false}
                  />
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
