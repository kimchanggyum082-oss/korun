export const CDN = "https://cdn.imweb.me";

export const assets = {
  logo: `${CDN}/thumbnail/20260706/6e6eed688b83a.png`,
  logoWhite: `${CDN}/thumbnail/20260706/2f2ec2ffc01ac.png`,
  heroSlides: [
    { src: `${CDN}/thumbnail/20240619/fc7c5f1635997.png`, alt: "Hot Runner System KORUN - Best Processing Quality! High quality Fast delivery!" },
    { src: `${CDN}/thumbnail/20240619/82344c13461a1.png`, alt: "High Performance Hot Runners" },
  ],
  products: [
    { title: "Valve Gate System", href: "/21", src: `${CDN}/thumbnail/20240715/2a7c07b53aee9.png` },
    { title: "Open Gate Systems", href: "/22", src: `${CDN}/thumbnail/20240715/e88c70262c6cb.png` },
    { title: "Single Nozzle", href: "/23", src: `${CDN}/thumbnail/20240715/2b7bdff8250a3.png` },
    { title: "Time&Temperature Controllers", href: "/24", src: `${CDN}/thumbnail/20240715/797e1918f2a68.png` },
  ],
  ctaBanner: `${CDN}/thumbnail/20240625/fb07ee567ca78.jpg`,
  valuesBg: `${CDN}/thumbnail/20240617/a4408920c5a82.png`,
} as const;

export const company = {
  name: "주식회사 코런",
  nameEn: "KORUN",
  tagline: "HOT RUNNER SYSTEM 전문 제조 회사로서",
  taglineSub: "가격, 품질, 서비스로 보답하는 국내 핫런너 제조 전문 메이커입니다.",
  tel: "031.311.5577",
  fax: "031.311.5538",
  email: "korun15@naver.com",
  address: "경기도 시흥시 계수로 86번길 77-1",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.7161608753763!2d126.81074867629253!3d37.443809531155416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b636e33eb1f23%3A0x879829854a681600!2z6rK96riw64-EIOyLnO2dpeyLnCDqs4TsiJjroZw4NuuyiOq4uCA3Ny0x!5e0!3m2!1sko!2skr!4v1728361996222!5m2!1sko!2skr",
} as const;

export type NewsItem = {
  category: "NEWS" | "EVENT";
  title: string;
  date: string;
  href: string;
};

export const news: NewsItem[] = [
  { category: "EVENT", title: "제28회 한국금형비전포럼 2025 개최", date: "2025-05-06", href: "/34/?idx=163356113&bmode=view" },
  { category: "NEWS", title: "제27회 INTERMOLD KOREA 2025 출품", date: "2025-04-06", href: "/34/?idx=160786757&bmode=view" },
  { category: "NEWS", title: "코런 태국 지사 OPEN", date: "2024-12-08", href: "/34/?idx=131837214&bmode=view" },
  { category: "NEWS", title: "제28회 금형의 날 [특허청장표창 수상: 코런 대표이사 김창겸]", date: "2024-12-08", href: "/34/?idx=131829076&bmode=view" },
  { category: "NEWS", title: "GVETI 글로벌 직업교육 이니셔티브 콘퍼런스 소식", date: "2024-12-08", href: "/34/?idx=131816057&bmode=view" },
  { category: "NEWS", title: "[코런 기사] HANDLER 24년 10월호 포커스 기사 (에어 증폭기 출시)", date: "2024-10-12", href: "/34/?idx=122018269&bmode=view" },
];

export type DownloadItem = {
  title: string;
  date: string;
  href: string;
};

export const downloads: DownloadItem[] = [
  { title: "日本語版カタログをダウンロードします", date: "2024-10-12", href: "/35/?idx=122009726&bmode=view" },
  { title: "Download English Version Catalog", date: "2024-10-12", href: "/35/?idx=122007938&bmode=view" },
  { title: "Single Valve Nozzle 2D Data", date: "2024-08-09", href: "/35/?idx=63572250&bmode=view" },
  { title: "코런 시컨스타임 콘트롤러 모델 KOTS-800 사용 설명서", date: "2024-07-21", href: "/35/?idx=48614089&bmode=view" },
  { title: "코런 온도콘트롤러 모델 KOTC-860 사용설명서", date: "2024-07-21", href: "/35/?idx=48608478&bmode=view" },
  { title: "korun advantage and benefits (코런 제품 특장점)", date: "2024-07-21", href: "/35/?idx=48597029&bmode=view" },
];

export const values = [
  { label: "기술성 Technology", color: "#43a15c" },
  { label: "안정성 Stability", color: "#f0a63a" },
  { label: "효율성 Effciency", color: "#4d6fd0" },
] as const;
