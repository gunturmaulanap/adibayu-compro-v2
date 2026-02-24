"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocale } from "@/lib/i18n";

const content = {
  en: {
    heroTitle: "Who We Are",
    heroSubtitle:
      "Adibayu Group is a strategic holding company driving integrated growth across Manufacturing, Distribution, Retail, and digital acceleration initiatives.",
    sectors: ["Manufacturing", "Distribution", "Retail", "Digital Growth"],
    snapshotTitle: "About Adibayu Group",
    snapshotBody:
      "We provide strategic oversight, governance standards, and capability integration so each enterprise can scale with stronger execution discipline and long-term value orientation.",
    featureTitle: "A Holding Designed for Integrated Growth",
    featureP1:
      "Our holding model is built to connect strategic direction with operational reality. We align governance, resource allocation, and performance architecture across business units.",
    featureP2:
      "By integrating capabilities across pillars, we improve speed of execution, reduce fragmentation, and strengthen resilience in changing market conditions.",
    featureCta: "Explore our Value Ecosystem",
    bandStatement:
      "Our role is to strengthen each enterprise through shared governance, strategy, and operational excellence.",
    visionTitle: "Vision",
    visionBody:
      "To build a high-performing, trusted holding ecosystem that advances sustainable growth across Indonesia’s real economy sectors.",
    missionTitle: "Mission",
    missionPoints: [
      "Set clear strategic direction and measurable governance standards.",
      "Enable operational integration across portfolio companies.",
      "Develop institutional capabilities for long-term competitiveness.",
      "Promote responsible growth through disciplined execution.",
    ],
    valuesTitle: "OUR VALUES",
    values: [
      {
        title: "Integrity",
        desc: "We make transparent decisions anchored in ethical conduct.",
      },
      {
        title: "Accountability",
        desc: "We commit to outcomes and take ownership of execution quality.",
      },
      {
        title: "Excellence",
        desc: "We continuously raise standards across strategy and operations.",
      },
      {
        title: "Collaboration",
        desc: "We unlock value through coordinated capabilities across entities.",
      },
      {
        title: "Long-term Thinking",
        desc: "We prioritize durable value over short-term optics.",
      },
    ],
    leadershipTitle: "Leadership",
    leadershipSubtitle:
      "Experienced institutional leadership guiding group strategy, governance, and execution rhythm.",
    presenceTitle: "Our Presence",
    presenceSubtitle:
      "Operating across key regions through our ecosystem in Indonesia.",
    ctaTitle: "Connect with Adibayu Group",
    ctaFindUs: "Find Us",
    ctaSendInquiry: "Send Inquiry",
  },
  id: {
    heroTitle: "Tentang Kami",
    heroSubtitle:
      "Adibayu Group adalah strategic holding company yang mendorong pertumbuhan terintegrasi di sektor Manufaktur, Distribusi, Ritel, dan akselerasi digital.",
    sectors: ["Manufaktur", "Distribusi", "Ritel", "Pertumbuhan Digital"],
    snapshotTitle: "Tentang Adibayu Group",
    snapshotBody:
      "Kami menghadirkan arahan strategis, standar tata kelola, dan integrasi kapabilitas agar setiap entitas dapat bertumbuh dengan disiplin eksekusi yang kuat serta orientasi nilai jangka panjang.",
    featureTitle: "Holding yang Dirancang untuk Pertumbuhan Terintegrasi",
    featureP1:
      "Model holding kami dibangun untuk menghubungkan arah strategis dengan realitas operasional. Kami menyelaraskan tata kelola, alokasi sumber daya, dan arsitektur kinerja lintas unit bisnis.",
    featureP2:
      "Dengan mengintegrasikan kapabilitas lintas pilar, kami meningkatkan kecepatan eksekusi, mengurangi fragmentasi, dan memperkuat resiliensi pada kondisi pasar yang dinamis.",
    featureCta: "Jelajahi Ekosistem Nilai Kami",
    bandStatement:
      "Peran kami adalah memperkuat setiap entitas melalui tata kelola bersama, strategi, dan keunggulan operasional.",
    visionTitle: "Visi",
    visionBody:
      "Menjadi ekosistem holding berkinerja tinggi dan terpercaya yang mendorong pertumbuhan berkelanjutan pada sektor ekonomi riil Indonesia.",
    missionTitle: "Misi",
    missionPoints: [
      "Menetapkan arah strategis yang jelas dan standar tata kelola yang terukur.",
      "Mendorong integrasi operasional antar perusahaan portofolio.",
      "Membangun kapabilitas institusional untuk daya saing jangka panjang.",
      "Mendorong pertumbuhan yang bertanggung jawab melalui disiplin eksekusi.",
    ],
    valuesTitle: "NILAI KAMI",
    values: [
      {
        title: "Integritas",
        desc: "Kami mengambil keputusan yang transparan dan berlandaskan etika.",
      },
      {
        title: "Akuntabilitas",
        desc: "Kami berkomitmen pada hasil dan bertanggung jawab atas kualitas eksekusi.",
      },
      {
        title: "Keunggulan",
        desc: "Kami terus meningkatkan standar strategi dan operasi.",
      },
      {
        title: "Kolaborasi",
        desc: "Kami membuka nilai lewat koordinasi kapabilitas antar entitas.",
      },
      {
        title: "Berpikir Jangka Panjang",
        desc: "Kami mengutamakan nilai berkelanjutan dibanding hasil sesaat.",
      },
    ],
    leadershipTitle: "Kepemimpinan",
    leadershipSubtitle:
      "Kepemimpinan institusional berpengalaman yang mengarahkan strategi grup, tata kelola, dan ritme eksekusi.",
    presenceTitle: "Jejak Kehadiran",
    presenceSubtitle:
      "Beroperasi di berbagai wilayah kunci melalui ekosistem kami di Indonesia.",
    ctaTitle: "Terhubung dengan Adibayu Group",
    ctaFindUs: "Temukan Kami",
    ctaSendInquiry: "Kirim Inquiry",
  },
} as const;

const heroImage =
  "https://images.unsplash.com/photo-1744998462947-a8f4e816eb4f?auto=format&fit=crop&w=1400&q=80";
const featureImage =
  "https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=1400&q=80";
const statementBandImage =
  "https://images.unsplash.com/photo-1584368209950-475e7f17a4ab?auto=format&fit=crop&w=1800&q=80";
const valuesImage =
  "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1400&q=80";

const leadershipCards = [
  {
    role: "Chief Executive Officer (Interim)",
    bio: "Leads group-level strategic alignment and enterprise performance agenda.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80",
  },
  {
    role: "Chief Operating Officer (Interim)",
    bio: "Oversees operational integration across manufacturing, distribution, and retail units.",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80",
  },
  {
    role: "Chief Strategy Officer (Interim)",
    bio: "Guides portfolio strategy, governance architecture, and long-range value creation plans.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
  },
];

const portfolioCompanies = [
  {
    id: "aksamala",
    slug: "aksamala",
    shortCode: "AKS",
    name: "Aksamala",
    category: "Manufacturing",
    imageUrl:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "nakama",
    slug: "nakama",
    shortCode: "NAK",
    name: "Nakama",
    category: "Retail Herbal",
    imageUrl:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "habbie",
    slug: "habbie",
    shortCode: "HAB",
    name: "Habbie",
    category: "FMCG Aromatic",
    imageUrl:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "achievement",
    slug: "achievement",
    shortCode: "ACH",
    name: "Achievement",
    category: "Distribution",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "satyalaksana",
    slug: "satyalaksana",
    shortCode: "SAT",
    name: "Satyalaksana",
    category: "Retail FMCG",
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "realhe",
    slug: "realhe",
    shortCode: "REH",
    name: "Realhe",
    category: "Digital Growth",
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

export default function WhoWeArePageClient() {
  const { locale } = useLocale();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(0);
  const [isPortfolioPaused, setIsPortfolioPaused] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    window.localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    if (isPortfolioPaused) return;

    const timer = window.setInterval(() => {
      setActivePortfolioIndex((prev) => (prev + 1) % portfolioCompanies.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [isPortfolioPaused]);

  const t = content[locale];

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-[#020617] dark:text-white">
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
        solidOnTop
      />

      <section className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt="Adibayu industrial operations"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto flex h-full max-w-[1400px] items-end px-6 pb-14 md:px-12 md:pb-20">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              {t.heroTitle}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/90 md:text-lg">
              {t.heroSubtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {t.sectors.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-xs font-medium tracking-wide"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 md:px-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
              Group Snapshot
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t.snapshotTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-700 dark:text-gray-300">
              {t.snapshotBody}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Adibayu Group Holding
              </p>
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>

            <div className="mt-5 overflow-x-auto pb-1">
              <div className="flex min-w-max items-center gap-2">
                {portfolioCompanies.map((company, index) => (
                  <button
                    key={company.id}
                    type="button"
                    title={company.name}
                    onClick={() => setActivePortfolioIndex(index)}
                    className={`h-9 rounded-full border px-3.5 text-xs font-semibold tracking-wide outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-500/60 ${
                      activePortfolioIndex === index
                        ? "border-gray-300 bg-white text-gray-900 dark:border-white/20 dark:bg-white/10 dark:text-white"
                        : "border-gray-200 bg-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:border-white/10 dark:text-gray-300 dark:hover:border-white/20 dark:hover:text-white"
                    }`}
                    aria-label={company.name}
                  >
                    {company.shortCode}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="mt-3"
              onMouseEnter={() => setIsPortfolioPaused(true)}
              onMouseLeave={() => setIsPortfolioPaused(false)}
            >
              <div className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white/95 shadow-sm dark:border-white/10 dark:bg-[#0b1220]">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${activePortfolioIndex * 100}%)`,
                  }}
                >
                  {portfolioCompanies.map((company) => (
                    <div
                      key={company.id}
                      className="w-full flex-shrink-0 p-3.5 md:p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {company.name}
                        </p>
                        <span className="inline-flex rounded-full border border-gray-200 px-2.5 py-1 text-[11px] font-medium text-gray-600 dark:border-white/10 dark:text-gray-300">
                          {company.category}
                        </span>
                      </div>

                      <div className="relative mt-2.5 h-52 md:h-56 overflow-hidden rounded-xl">
                        <Image
                          src={company.imageUrl}
                          alt={`${company.name} - ${company.category}`}
                          unoptimized
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 420px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      </div>

                      <p className="mt-2.5 text-xs leading-5 text-gray-500 dark:text-gray-400">
                        Operating entity within Adibayu’s {company.category}{" "}
                        pillar.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs leading-6 text-gray-500 dark:text-gray-400">
              Portfolio:{" "}
              {portfolioCompanies.map((item) => item.name).join(" • ")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-4 md:py-8">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-6 md:px-12 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="relative h-[420px] overflow-hidden rounded-3xl">
            <Image
              src={featureImage}
              alt="Integrated operations"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              {t.featureTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-gray-700 dark:text-gray-300">
              {t.featureP1}
            </p>
            <p className="mt-4 text-base leading-8 text-gray-700 dark:text-gray-300">
              {t.featureP2}
            </p>
            <Link
              href="/#value-chain"
              className="mt-7 inline-flex rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-900 dark:border-white/20 dark:text-white dark:hover:border-white/50"
            >
              {t.featureCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative mt-10 h-[360px] w-full overflow-hidden md:mt-16 md:h-[420px]">
        <Image
          src={statementBandImage}
          alt="Operational excellence"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex h-full max-w-[1200px] items-center px-6 text-center md:px-12">
          <p className="mx-auto max-w-4xl text-2xl font-bold tracking-tight text-white md:text-4xl">
            {t.bandStatement}
          </p>
        </div>
      </section>

      <section className="bg-[#f4f6f8] py-16 dark:bg-[#0b111b] md:py-20">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 md:px-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              {t.visionTitle}
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              {t.visionBody}
            </h2>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              {t.missionTitle}
            </p>
            <ul className="mt-4 space-y-4">
              {t.missionPoints.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-8 text-gray-700 dark:text-gray-300"
                >
                  <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-500 dark:bg-gray-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] dark:border-white/10 dark:from-[#0b1220] dark:via-[#0c1424] dark:to-[#0a1120] md:p-10">
            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-400/20" />
            <div className="pointer-events-none absolute -bottom-24 -right-12 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/20" />

            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
              <div className="lg:col-span-5 lg:h-full">
                <div className="relative h-[320px] overflow-hidden rounded-3xl md:h-[420px] lg:h-full lg:min-h-[640px]">
                  <div className="relative h-full w-full">
                    <Image
                      src={valuesImage}
                      alt="Team values in action"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-950/10 to-transparent" />
                  </div>

                  <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Culture & Execution
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-300/80">
                  Institutional Principles
                </p>

                <h2 className="mt-3 text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl">
                  {t.valuesTitle}
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Nilai kami menjadi standar dalam pengambilan keputusan,
                  kolaborasi lintas entitas, dan disiplin eksekusi untuk
                  pertumbuhan jangka panjang.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {t.values.map((value, index) => (
                    <article
                      key={value.title}
                      className="group rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm transition-colors duration-200 hover:bg-white dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                          {value.title}
                        </p>
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-2.5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {value.desc}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            {t.leadershipTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
            {t.leadershipSubtitle}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {leadershipCards.map((item) => (
              <article
                key={item.role}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1220]"
              >
                <div className="relative h-80 md:h-[30rem] w-full">
                  <Image
                    src={item.image}
                    alt={item.role}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                    {item.role}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                    {item.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5 md:p-10">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t.presenceTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300">
              {t.presenceSubtitle}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="rounded-2xl bg-white p-5 dark:bg-[#0b1220]">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Sumatra
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Operational nodes across industrial and distribution
                  corridors.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 dark:bg-[#0b1220]">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Java
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Integrated retail, warehousing, and strategic management hubs.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 dark:bg-[#0b1220]">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Eastern Regions
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Expanding ecosystem presence through partnerships and channel
                  development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="rounded-3xl bg-[#0b0f19] px-6 py-10 text-center md:px-10 md:py-12">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {t.ctaTitle}
            </h2>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/#find-us"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                {t.ctaFindUs}
              </Link>
              <a
                href="mailto:hello@adibayugroup.com"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {t.ctaSendInquiry}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} locale={locale} />
    </main>
  );
}
