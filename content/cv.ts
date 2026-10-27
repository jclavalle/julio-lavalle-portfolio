// CV summary rendered at /cv. Keep in sync with the PDF in
// public/ — when the PDF changes, update `pdf` / `pages` / `updated` and the entries below.

type Role = {
  role: string;
  org: string;
  place: string;
  period: string;
  note: string;
  // Slug under /projects/ when the role has a case study.
  caseStudy?: string;
};

export const CV = {
  pdf: "/Julio_Lavalle_CV.pdf",
  pages: 2,
  updated: "Oct 2026",
  headline: "Senior AI Product Builder",
  summary:
    "Product leader with 10+ years building fintech and SaaS products across LatAm and the US. Founder of 3 fintech ventures.",
  metrics: [
    { value: "750K", label: "app users", source: "MiBolsillo" },
    { value: "5", label: "LATAM markets", source: "MiBolsillo" },
    { value: "−35%", label: "underwriting cost", source: "Conecta Pro" },
    { value: "−30%", label: "acquisition cost", source: "MiBolsillo" },
  ],
  experience: <Role[]>[
    {
      role: "Sr. AI Product Manager",
      org: "Clade",
      place: "New York",
      caseStudy: "clade",
      period: "07/2025 – now",
      note: "AI-native investment diligence platform. Evals, production monitoring and automated QA; cut nightly test failures by 50%.",
    },
    {
      role: "Partner & Head of Product",
      org: "Conecta Pro",
      place: "LatAm",
      caseStudy: "conecta-pro",
      period: "01/2024 – 01/2025",
      note: "KYC, credit decisioning and Open Finance APIs. Underwriting costs down 35% in 6 months.",
    },
    {
      role: "CEO & Head of Product",
      org: "MiBolsillo (Techstars ’21)",
      place: "LatAm",
      caseStudy: "mibolsillo",
      period: "05/2019 – 12/2023",
      note: "Mobile lending platform taken to break-even across 5 LATAM markets; CAC down 30%.",
    },
    {
      role: "Founder & Product Lead",
      org: "Poupa Certo",
      place: "São Paulo",
      period: "10/2016 – 12/2022",
      note: "Micro-investment app.",
    },
  ],
  earlier: "Plus MIT D-Lab Scale-Ups Fellow, World Bank, MGov Brasil, CAOS Focado and GBD Network in the full PDF.",
  education: [
    { degree: "MBA in AI and Big Data", school: "ICMC – USP", period: "2024 – 2025" },
    { degree: "MSc in Applied Psychology", school: "USP", period: "2020 – 2021" },
  ],
  skills: [
    "Agentic workflows",
    "AI evaluations",
    "Open Finance",
    "Credit & KYC",
    "SQL",
    "Product strategy",
    "A/B testing",
  ],
};
