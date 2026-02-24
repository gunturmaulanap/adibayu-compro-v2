import type { Locale } from "@/lib/i18n";

type Copy = {
  navbar: {
    businesses: string;
    businessItems: [string, string, string];
    exploreValueChain: string;
    whoWeAre: string;
    whoItems: {
      about: string;
      visionMission: string;
      leadership: string;
    };
    insights: string;
    impact: string;
    governance: string;
    contact: string;
    switchTheme: {
      dark: string;
      light: string;
    };
  };
  home: {
    hero: {
      title1: string;
      title2: string;
      subtitle: string;
      cta1: string;
      cta2: string;
      scroll: string;
    };
    valueChain: {
      title: string;
      subtitle: string;
      pillars: [string, string, string, string];
      descriptions: [string, string, string, string];
    };
    whoWeEmpower: {
      title: string;
      subtitle: string;
      entities: {
        name: string;
        description: string;
      }[];
    };
    brandsTitle: string;
    insights: {
      title: string;
      subtitle: string;
      viewAll: string;
    };
    whyWeExist: {
      title: string;
      subtitle: string;
      quote: string;
      pillars: {
        title: string;
        description: string;
      }[];
    };
    recognition: {
      title: string;
      subtitle: string;
      footer: string;
    };
    findUs: {
      title: string;
      subtitle: string;
      email: string;
      phone: string;
      location: string;
      openMaps: string;
      sendEmail: string;
    };
    footer: {
      businesses: string;
      whoWeAre: string;
      impactInsights: string;
      legal: string;
      summary: string;
      rights: string;
      businessLinks: [string, string, string, string];
      whoLinks: [string, string, string, string];
      impactLinks: [string, string, string, string];
      legalLinks: [string, string, string];
    };
  };
  governance: {
    title: string;
    subtitle: string;
    statement: string;
    howWeGovern: string;
    principles: {
      title: string;
      description: string;
    }[];
    portfolioTitle: string;
    portfolioSubtitle: string;
    ctaTitle: string;
    contactUs: string;
    sendEmail: string;
  };
  whoWeArePage: {
    title: string;
    subtitle: string;
    aboutTitle: string;
    aboutParagraph1: string;
    aboutParagraph2: string;
    visionMissionTitle: string;
    visionTitle: string;
    visionDescription: string;
    missionTitle: string;
    missionPoints: string[];
    leadershipTitle: string;
    leadershipSubtitle: string;
    leadershipCards: {
      role: string;
      name: string;
      bio: string;
    }[];
  };
};

export const copy: Record<Locale, Copy> = {
  en: {
    navbar: {
      businesses: "Businesses",
      businessItems: ["Manufacturing", "Distribution", "Retail"],
      exploreValueChain: "Explore Value Chain",
      whoWeAre: "Who We Are",
      whoItems: {
        about: "About Adibayu Group",
        visionMission: "Vision & Mission",
        leadership: "Leadership",
      },
      insights: "Insights",
      impact: "Impact",
      governance: "Governance",
      contact: "Contact",
      switchTheme: {
        dark: "Switch to Dark Mode",
        light: "Switch to Light Mode",
      },
    },
    home: {
      hero: {
        title1: "Advancing Industries.",
        title2: "Driving Growth.",
        subtitle:
          "A strategic holding company empowering core sectors to create sustainable value.",
        cta1: "Explore Businesses",
        cta2: "Our Value Chain",
        scroll: "Scroll",
      },
      valueChain: {
        title: "Value Ecosystem",
        subtitle:
          "An integrated approach to strategic value creation. Our holding structure empowers core sectors to operate interdependently, driving sustainable growth across the entire value chain.",
        pillars: ["Manufacture", "Distribution", "Retail", "Impact"],
        descriptions: [
          "Engineering excellence and scalable production capabilities driving foundational value.",
          "Strategic logistics and supply chain optimization ensuring seamless market access.",
          "Consumer-centric touchpoints delivering premium experiences and market penetration.",
          "Sustainable growth and community empowerment creating long-term societal value.",
        ],
      },
      whoWeEmpower: {
        title: "Who We Empower",
        subtitle:
          "Adibayu Group strengthens each enterprise through shared governance, strategic direction, and operational excellence.",
        entities: [
          {
            name: "Manufacturing",
            description:
              "Strengthening production systems through governance, quality discipline, and scale readiness.",
          },
          {
            name: "Distribution",
            description:
              "Enabling reliable market reach with strategic logistics planning and operational coordination.",
          },
          {
            name: "Retail",
            description:
              "Supporting customer-facing excellence with brand consistency and channel performance oversight.",
          },
        ],
      },
      brandsTitle: "Brands Within Our Ecosystem",
      insights: {
        title: "Insights",
        subtitle: "Strategic perspectives shaping our industries.",
        viewAll: "View All Insights",
      },
      whyWeExist: {
        title: "Why We Exist",
        subtitle:
          "Building sustainable value for society through responsible and integrated growth.",
        quote:
          "Adibayu Group exists to enable integrated growth across industries that benefits people, strengthens markets, and contributes to long-term societal progress.",
        pillars: [
          {
            title: "People",
            description:
              "Developing talent, strengthening communities, and creating opportunities across our ecosystem.",
          },
          {
            title: "Progress",
            description:
              "Driving operational excellence, innovation, and long-term competitiveness across our enterprises.",
          },
          {
            title: "Sustainability",
            description:
              "Ensuring responsible growth through efficient resource use and future-oriented business practices.",
          },
        ],
      },
      recognition: {
        title: "Recognition",
        subtitle:
          "External validation of our commitment to excellence across all business units.",
        footer:
          "Certifications and awards are independently verified by respective issuing organizations. Recognition reflects achievement across Adibayu Group business ecosystem.",
      },
      findUs: {
        title: "Find Us",
        subtitle:
          "Connect with Adibayu Group for business inquiries and partnerships.",
        email: "Email",
        phone: "Phone",
        location: "Location",
        openMaps: "Open in Google Maps",
        sendEmail: "Send Email",
      },
      footer: {
        businesses: "Businesses",
        whoWeAre: "Who We Are",
        impactInsights: "Impact & Insights",
        legal: "Legal",
        summary:
          "Adibayu Group is an integrated holding company operating across manufacturing, distribution, and retail sectors—building sustainable long-term value for society.",
        rights: "Adibayu Group. All rights reserved.",
        businessLinks: [
          "Manufacturing",
          "Distribution",
          "Retail",
          "Value Ecosystem",
        ],
        whoLinks: [
          "About Adibayu Group",
          "Vision & Mission",
          "Leadership",
          "Governance",
        ],
        impactLinks: ["Why We Exist", "Insights", "Partnerships", "Careers"],
        legalLinks: ["Privacy Policy", "Terms", "Cookies Policy"],
      },
    },
    governance: {
      title: "Governance",
      subtitle:
        "A clear view of how Adibayu Group aligns governance, strategy, and operational execution across its portfolio.",
      statement:
        "Adibayu Group provides strategic oversight and shared governance to strengthen each pillar while ensuring sustainable, responsible growth.",
      howWeGovern: "How We Govern",
      principles: [
        {
          title: "Strategic Alignment",
          description:
            "Shared direction across pillars to ensure focus and long-term value creation.",
        },
        {
          title: "Risk & Compliance",
          description:
            "Consistent governance standards, accountability, and operational controls.",
        },
        {
          title: "Performance & Capability Building",
          description:
            "Operational excellence, shared resources, and continuous improvement.",
        },
      ],
      portfolioTitle: "Portfolio Structure",
      portfolioSubtitle:
        "Business pillars, operating entities, and brands within Adibayu’s ecosystem.",
      ctaTitle: "Need business information?",
      contactUs: "Contact Us",
      sendEmail: "Send Email",
    },
    whoWeArePage: {
      title: "Who We Are",
      subtitle:
        "Adibayu Group is a strategic holding company enabling integrated growth across manufacturing, distribution, and retail sectors.",
      aboutTitle: "About Adibayu Group",
      aboutParagraph1:
        "Adibayu Group operates as a strategic holding company that supports and strengthens a portfolio of enterprises across core industries. Through shared governance, long-term strategy, and operational integration, Adibayu enables each business to grow sustainably while contributing to a broader value ecosystem.",
      aboutParagraph2:
        "Our role extends beyond ownership — we actively align capabilities across manufacturing, distribution, and retail to create resilient and competitive enterprises.",
      visionMissionTitle: "Vision & Mission",
      visionTitle: "Vision",
      visionDescription:
        "To become an integrated holding ecosystem that drives sustainable growth across industries and delivers long-term value to society.",
      missionTitle: "Mission",
      missionPoints: [
        "Strengthen enterprise capabilities through strategic governance and shared resources.",
        "Foster integration across the value chain to enhance efficiency and market impact.",
        "Support innovation and operational excellence within each portfolio business.",
        "Promote responsible and sustainable business practices.",
      ],
      leadershipTitle: "Leadership",
      leadershipSubtitle:
        "Leadership at Adibayu Group provides strategic direction and ensures alignment across the organization’s portfolio. Our leadership approach emphasizes long-term value creation, responsible governance, and collaborative growth.",
      leadershipCards: [
        {
          role: "CEO",
          name: "Chief Executive Officer (Placeholder)",
          bio: "Provides strategic oversight and drives integrated development across the group’s business pillars.",
        },
        {
          role: "COO",
          name: "Chief Operating Officer (Placeholder)",
          bio: "Ensures operational alignment and efficiency across manufacturing, distribution, and retail entities.",
        },
      ],
    },
  },
  id: {
    navbar: {
      businesses: "Bisnis",
      businessItems: ["Manufaktur", "Distribusi", "Ritel"],
      exploreValueChain: "Jelajahi Rantai Nilai",
      whoWeAre: "Tentang Kami",
      whoItems: {
        about: "Tentang Adibayu Group",
        visionMission: "Visi & Misi",
        leadership: "Kepemimpinan",
      },
      insights: "Artikel",
      impact: "Dampak",
      governance: "Tata Kelola",
      contact: "Kontak",
      switchTheme: { dark: "Ubah ke Mode Gelap", light: "Ubah ke Mode Terang" },
    },
    home: {
      hero: {
        title1: "Memajukan Industri.",
        title2: "Mendorong Pertumbuhan.",
        subtitle:
          "Perusahaan holding strategis yang memberdayakan sektor inti untuk menciptakan nilai berkelanjutan.",
        cta1: "Jelajahi Bisnis",
        cta2: "Rantai Nilai Kami",
        scroll: "Gulir",
      },
      valueChain: {
        title: "Ekosistem Nilai",
        subtitle:
          "Pendekatan terintegrasi untuk penciptaan nilai strategis. Struktur holding kami memungkinkan sektor inti beroperasi saling terhubung untuk mendorong pertumbuhan berkelanjutan di seluruh rantai nilai.",
        pillars: ["Manufaktur", "Distribusi", "Ritel", "Dampak"],
        descriptions: [
          "Keunggulan rekayasa dan kapabilitas produksi yang skalabel sebagai fondasi nilai.",
          "Logistik strategis dan optimasi rantai pasok untuk memastikan akses pasar yang mulus.",
          "Titik sentuh berorientasi konsumen untuk menghadirkan pengalaman premium dan penetrasi pasar.",
          "Pertumbuhan berkelanjutan dan pemberdayaan komunitas untuk nilai sosial jangka panjang.",
        ],
      },
      whoWeEmpower: {
        title: "Yang Kami Berdayakan",
        subtitle:
          "Adibayu Group memperkuat setiap entitas melalui tata kelola bersama, arah strategis, dan keunggulan operasional.",
        entities: [
          {
            name: "Manufaktur",
            description:
              "Memperkuat sistem produksi melalui tata kelola, disiplin kualitas, dan kesiapan skala.",
          },
          {
            name: "Distribusi",
            description:
              "Memungkinkan jangkauan pasar yang andal dengan perencanaan logistik strategis dan koordinasi operasional.",
          },
          {
            name: "Ritel",
            description:
              "Mendukung keunggulan lini depan pelanggan melalui konsistensi merek dan pengawasan performa kanal.",
          },
        ],
      },
      brandsTitle: "Merek dalam Ekosistem Kami",
      insights: {
        title: "Artikel",
        subtitle: "Perspektif strategis yang membentuk industri kami.",
        viewAll: "Lihat Semua Artikel",
      },
      whyWeExist: {
        title: "Alasan Kami Hadir",
        subtitle:
          "Membangun nilai berkelanjutan bagi masyarakat melalui pertumbuhan yang bertanggung jawab dan terintegrasi.",
        quote:
          "Adibayu Group hadir untuk mendorong pertumbuhan terintegrasi lintas industri yang bermanfaat bagi masyarakat, memperkuat pasar, dan berkontribusi pada kemajuan sosial jangka panjang.",
        pillars: [
          {
            title: "Manusia",
            description:
              "Mengembangkan talenta, memperkuat komunitas, dan menciptakan peluang di seluruh ekosistem kami.",
          },
          {
            title: "Kemajuan",
            description:
              "Mendorong keunggulan operasional, inovasi, dan daya saing jangka panjang di seluruh entitas.",
          },
          {
            title: "Keberlanjutan",
            description:
              "Memastikan pertumbuhan yang bertanggung jawab melalui efisiensi sumber daya dan praktik bisnis berorientasi masa depan.",
          },
        ],
      },
      recognition: {
        title: "Pengakuan",
        subtitle:
          "Validasi eksternal atas komitmen kami terhadap keunggulan di seluruh unit bisnis.",
        footer:
          "Sertifikasi dan penghargaan diverifikasi secara independen oleh lembaga penerbit terkait. Pengakuan ini mencerminkan pencapaian di seluruh ekosistem bisnis Adibayu Group.",
      },
      findUs: {
        title: "Temukan Kami",
        subtitle:
          "Terhubung dengan Adibayu Group untuk kebutuhan bisnis dan kemitraan.",
        email: "Email",
        phone: "Telepon",
        location: "Lokasi",
        openMaps: "Buka di Google Maps",
        sendEmail: "Kirim Email",
      },
      footer: {
        businesses: "Bisnis",
        whoWeAre: "Tentang Kami",
        impactInsights: "Dampak & Artikel",
        legal: "Legal",
        summary:
          "Adibayu Group adalah perusahaan holding terintegrasi yang bergerak di sektor manufaktur, distribusi, dan ritel—membangun nilai jangka panjang yang berkelanjutan bagi masyarakat.",
        rights: "Adibayu Group. Seluruh hak cipta dilindungi.",
        businessLinks: ["Manufaktur", "Distribusi", "Ritel", "Ekosistem Nilai"],
        whoLinks: [
          "Tentang Adibayu Group",
          "Visi & Misi",
          "Kepemimpinan",
          "Tata Kelola",
        ],
        impactLinks: ["Alasan Kami Hadir", "Artikel", "Kemitraan", "Karier"],
        legalLinks: ["Kebijakan Privasi", "Ketentuan", "Kebijakan Cookie"],
      },
    },
    governance: {
      title: "Tata Kelola",
      subtitle:
        "Gambaran jelas tentang bagaimana Adibayu Group menyelaraskan tata kelola, strategi, dan eksekusi operasional di seluruh portofolio.",
      statement:
        "Adibayu Group memberikan pengawasan strategis dan tata kelola bersama untuk memperkuat setiap pilar sekaligus memastikan pertumbuhan yang berkelanjutan dan bertanggung jawab.",
      howWeGovern: "Cara Kami Mengelola",
      principles: [
        {
          title: "Keselarasan Strategis",
          description:
            "Arah bersama antar pilar untuk memastikan fokus dan penciptaan nilai jangka panjang.",
        },
        {
          title: "Risiko & Kepatuhan",
          description:
            "Standar tata kelola yang konsisten, akuntabilitas, dan kontrol operasional.",
        },
        {
          title: "Kinerja & Penguatan Kapabilitas",
          description:
            "Keunggulan operasional, sumber daya bersama, dan peningkatan berkelanjutan.",
        },
      ],
      portfolioTitle: "Struktur Portofolio",
      portfolioSubtitle:
        "Pilar bisnis, entitas operasional, dan merek dalam ekosistem Adibayu.",
      ctaTitle: "Butuh informasi bisnis?",
      contactUs: "Hubungi Kami",
      sendEmail: "Kirim Email",
    },
    whoWeArePage: {
      title: "Tentang Kami",
      subtitle:
        "Adibayu Group adalah perusahaan holding strategis yang memungkinkan pertumbuhan terintegrasi di sektor manufaktur, distribusi, dan ritel.",
      aboutTitle: "Tentang Adibayu Group",
      aboutParagraph1:
        "Adibayu Group beroperasi sebagai perusahaan holding strategis yang mendukung dan memperkuat portofolio entitas lintas industri inti. Melalui tata kelola bersama, strategi jangka panjang, dan integrasi operasional, Adibayu memungkinkan setiap bisnis bertumbuh secara berkelanjutan sekaligus berkontribusi pada ekosistem nilai yang lebih luas.",
      aboutParagraph2:
        "Peran kami melampaui kepemilikan — kami secara aktif menyelaraskan kapabilitas lintas manufaktur, distribusi, dan ritel untuk menciptakan entitas yang tangguh dan kompetitif.",
      visionMissionTitle: "Visi & Misi",
      visionTitle: "Visi",
      visionDescription:
        "Menjadi ekosistem holding terintegrasi yang mendorong pertumbuhan berkelanjutan lintas industri dan menghadirkan nilai jangka panjang bagi masyarakat.",
      missionTitle: "Misi",
      missionPoints: [
        "Memperkuat kapabilitas perusahaan melalui tata kelola strategis dan sumber daya bersama.",
        "Mendorong integrasi lintas rantai nilai untuk meningkatkan efisiensi dan dampak pasar.",
        "Mendukung inovasi dan keunggulan operasional di setiap bisnis dalam portofolio.",
        "Mendorong praktik bisnis yang bertanggung jawab dan berkelanjutan.",
      ],
      leadershipTitle: "Kepemimpinan",
      leadershipSubtitle:
        "Kepemimpinan di Adibayu Group memberikan arah strategis dan memastikan keselarasan di seluruh portofolio organisasi. Pendekatan kepemimpinan kami menekankan penciptaan nilai jangka panjang, tata kelola yang bertanggung jawab, dan pertumbuhan kolaboratif.",
      leadershipCards: [
        {
          role: "CEO",
          name: "Chief Executive Officer (Placeholder)",
          bio: "Memberikan pengawasan strategis dan mendorong pengembangan terintegrasi di seluruh pilar bisnis grup.",
        },
        {
          role: "COO",
          name: "Chief Operating Officer (Placeholder)",
          bio: "Memastikan keselarasan operasional dan efisiensi di seluruh entitas manufaktur, distribusi, dan ritel.",
        },
      ],
    },
  },
};
