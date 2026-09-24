// Real MiBolsillo product images. Dimensions come from the asset package manifest
// so layout space is reserved. The phone screens already include the device frame.
// body = the phone's visible box inside the image (px). Screens are fitted by this box so
// every phone renders at the same size and can be aligned exactly.
export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  body: { x: number; y: number; w: number; h: number; pad?: number };
};

export const SHOTS = {
  hero: {
    src: "/mibolsillo/hero-phone.webp",
    width: 1024,
    height: 1536,
    alt: "MiBolsillo financial-advisor experience showing a savings goal, a financial tip and an advisor prompt.",
    body: { x: 192, y: 155, w: 637, h: 1210, pad: 24 },
  },
  pfm: {
    src: "/mibolsillo/02-mibolsillo-personal-financial-management.png",
    width: 696,
    height: 1360,
    alt: "Personal financial management screen showing available balance, income, expenses, monthly spending categories and recent transactions.",
    body: { x: 29, y: 10, w: 658, h: 1340, pad: 8 },
  },
  marketplace: {
    src: "/mibolsillo/03-mibolsillo-wl-services-marketplace.png",
    width: 704,
    height: 1390,
    alt: "MiBolsillo white-label marketplace showing loans, prepaid cards, investments and insurance.",
    body: { x: 25, y: 34, w: 658, h: 1340, pad: 8 },
  },
  bank: {
    src: "/mibolsillo/04-mibolsillo-wl-open-finance-bank-selection.png",
    width: 738,
    height: 1370,
    alt: "Open Finance account connection screen with a bank search and financial institution choices.",
    body: { x: 27, y: 6, w: 658, h: 1340, pad: 8 },
  },
  health: {
    src: "/mibolsillo/05-mibolsillo-wl-financial-health-offers.png",
    width: 738,
    height: 1370,
    alt: "MiBolsillo white-label financial health screen with upcoming payments and a personalized motorcycle credit offer.",
    body: { x: 31, y: 4, w: 658, h: 1340, pad: 8 },
  },
  success: {
    src: "/mibolsillo/06-mibolsillo-wl-data-sharing-success-credit-options.png",
    width: 768,
    height: 1412,
    alt: "Successful financial-data sharing confirmation with an option to view credit offers.",
    body: { x: 69, y: 12, w: 658, h: 1340, pad: 8 },
  },
  loan: {
    src: "/mibolsillo/07-mibolsillo-wl-loan-result-open-finance.png",
    width: 760,
    height: 1402,
    alt: "Loan simulation result with an invitation to share bank data through Open Finance.",
    body: { x: 37, y: 24, w: 658, h: 1340, pad: 8 },
  },
} satisfies Record<string, Shot>;
