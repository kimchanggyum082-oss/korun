export const CDN = "https://cdn.imweb.me";

export const assets = {
  logo: `${CDN}/thumbnail/20260706/6e6eed688b83a.png`,
  logoWhite: `${CDN}/thumbnail/20260706/2f2ec2ffc01ac.png`,
  heroSlides: [
    {
      src: `${CDN}/thumbnail/20240619/fc7c5f1635997.png`,
      alt: "Hot Runner System KORUN - Best Processing Quality! High quality Fast delivery!",
    },
    {
      src: `${CDN}/thumbnail/20240619/82344c13461a1.png`,
      alt: "High Performance Hot Runners",
    },
  ],
  products: [
    {
      title: "Valve Gate System",
      href: "/21",
      src: `${CDN}/thumbnail/20240715/2a7c07b53aee9.png`,
    },
    {
      title: "Open Gate Systems",
      href: "/22",
      src: `${CDN}/thumbnail/20240715/e88c70262c6cb.png`,
    },
    {
      title: "Single Nozzle",
      href: "/23",
      src: `${CDN}/thumbnail/20240715/2b7bdff8250a3.png`,
    },
    {
      title: "Time&Temperature Controllers",
      href: "/24",
      src: `${CDN}/thumbnail/20240715/797e1918f2a68.png`,
    },
  ],
  ctaBanner: `${CDN}/thumbnail/20240625/fb07ee567ca78.jpg`,
  valuesBg: `${CDN}/thumbnail/20240617/a4408920c5a82.png`,
} as const;

export const company = {
  name: "주식회사 코런",
  nameEn: "KORUN",
  tagline: "HOT RUNNER SYSTEM 전문 제조 회사로서",
  taglineSub:
    "가격, 품질, 서비스로 보답하는 국내 핫런너 제조 전문 메이커입니다.",
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
  {
    category: "EVENT",
    title: "제28회 한국금형비전포럼 2025 개최",
    date: "2025-05-06",
    href: "/34/?idx=163356113&bmode=view",
  },
  {
    category: "NEWS",
    title: "제27회 INTERMOLD KOREA 2025 출품",
    date: "2025-04-06",
    href: "/34/?idx=160786757&bmode=view",
  },
  {
    category: "NEWS",
    title: "코런 태국 지사 OPEN",
    date: "2024-12-08",
    href: "/34/?idx=131837214&bmode=view",
  },
  {
    category: "NEWS",
    title: "제28회 금형의 날 [특허청장표창 수상: 코런 대표이사 김창겸]",
    date: "2024-12-08",
    href: "/34/?idx=131829076&bmode=view",
  },
  {
    category: "NEWS",
    title: "GVETI 글로벌 직업교육 이니셔티브 콘퍼런스 소식",
    date: "2024-12-08",
    href: "/34/?idx=131816057&bmode=view",
  },
  {
    category: "NEWS",
    title: "[코런 기사] HANDLER 24년 10월호 포커스 기사 (에어 증폭기 출시)",
    date: "2024-10-12",
    href: "/34/?idx=122018269&bmode=view",
  },
];

export type DownloadItem = {
  title: string;
  date: string;
  href: string;
};

export const downloads: DownloadItem[] = [
  {
    title: "日本語版カタログをダウンロードします",
    date: "2024-10-12",
    href: "/35/?idx=122009726&bmode=view",
  },
  {
    title: "Download English Version Catalog",
    date: "2024-10-12",
    href: "/35/?idx=122007938&bmode=view",
  },
  {
    title: "Single Valve Nozzle 2D Data",
    date: "2024-08-09",
    href: "/35/?idx=63572250&bmode=view",
  },
  {
    title: "코런 시컨스타임 콘트롤러 모델 KOTS-800 사용 설명서",
    date: "2024-07-21",
    href: "/35/?idx=48614089&bmode=view",
  },
  {
    title: "코런 온도콘트롤러 모델 KOTC-860 사용설명서",
    date: "2024-07-21",
    href: "/35/?idx=48608478&bmode=view",
  },
  {
    title: "korun advantage and benefits (코런 제품 특장점)",
    date: "2024-07-21",
    href: "/35/?idx=48597029&bmode=view",
  },
];

export const values = [
  { label: "기술성 Technology", color: "#43a15c" },
  { label: "안정성 Stability", color: "#f0a63a" },
  { label: "효율성 Effciency", color: "#4d6fd0" },
] as const;

export type SpecRow = { label: string; values: string[] };

export type ProductSection = {
  title: string;
  images: string[];
};

export type ProductBlock = {
  eyebrow?: string;
  title?: string;
  subtitleLines?: string[];
  heroAlt?: string;
  heroSrc?: string;
  introTitle: string;
  introText?: string;
  introBullets?: string[];
  tags: readonly string[];
  showInquiry?: boolean;
  galleryLabel: string;
  sections: ProductSection[];
  spec?: { model: string; image?: string; rows: SpecRow[] };
};

export type ProductPageData = {
  id: string;
  navTitle: string;
  description: string;
  blocks: ProductBlock[];
};

const hotHalfNote =
  "핫런너 관련 베이스판재를 입고 받아 가공조립 테스트 하여 납품하는 Hot Half System을 기본으로 하고 있습니다.";

export const productPages: Record<string, ProductPageData> = {
  "21": {
    id: "21",
    navTitle: "Valve Gate Systems",
    description:
      "게이트를 개폐하는 방식인 코런 벨브 게이트 시스템. 공압을 이용하여 자동차, 전자, 의료, 물류, 건축자재 제품까지 폭넓게 적용됩니다.",
    blocks: [
      {
        eyebrow: "게이트를 개폐하는 방식인 벨브 게이트 시스템",
        title: "Valve Gate Systems",
        subtitleLines: ["게이트를 개폐하는 방식인 벨브 게이트 시스템"],
        heroSrc: `${CDN}/thumbnail/20240617/dfd5e2ca620da.png`,
        heroAlt: "KORUN Valve Gate System",
        introTitle: "코런 밸브 게이트 시스템은",
        introText: `공압을 이용하여 게이트를 개폐하는 방식으로 자동차, 전자, 의료, 물류, 건축자재 제품에 이르기까지 다양하고 폭넓게 적용되고 있습니다. ${hotHalfNote}`,
        tags: [
          "적용의 다양성",
          "깔끔한게이트 자국",
          "튼튼한 내구성",
          "안정적 온도조절",
          "사용자 친화적 설계",
        ],
        galleryLabel: "KODE-Valve Systems",
        sections: [
          {
            title: "Valve System of Applications",
            images: [`${CDN}/thumbnail/20240617/72466c8b4c58f.png`],
          },
          {
            title: "KODE-Valve Systems Nozzle Series Selection",
            images: [`${CDN}/thumbnail/20240617/291a098c65577.png`],
          },
          {
            title: "KODE-Valve Systems Nozzle Tip Types",
            images: [`${CDN}/thumbnail/20240617/6c73897cb7f5b.png`],
          },
        ],
      },
    ],
  },
  "22": {
    id: "22",
    navTitle: "Open Gate Systems",
    description:
      "폭 넓은 제품분야에 안정적으로 적용되는 코런 오픈 게이트 시스템. 극소형 제품부터 대형 제품까지 균일한 열밸런스로 설계됩니다.",
    blocks: [
      {
        eyebrow:
          "폭 넓은 제품분야에 안정적으로 적용되는 코런 오픈 게이트 시스템",
        title: "Open Gate Systems",
        subtitleLines: [
          "폭 넓은 제품분야에 안정적으로",
          "적용되는 코런 오픈 게이트 시스템",
        ],
        heroSrc: `${CDN}/thumbnail/20240617/65c03f9afdc23.png`,
        heroAlt: "KORUN Open Gate System",
        introTitle: "코런 오픈 게이트 시스템은",
        introText: `폭넓은 제품분야에 안정적으로 적용되며, 극소형제품에서부터 대형제품에 이르기까지 균일한 열바란스와 테크니컬하게 설계되어 다양하게 적용됩니다. ${hotHalfNote}`,
        tags: [
          "적용의 다양성",
          "튼튼한 내구성",
          "안정적 온도조절",
          "사용자 친화적 설계",
        ],
        galleryLabel: "KODE-Open Systems",
        sections: [
          {
            title: "Open System of Applications",
            images: [`${CDN}/thumbnail/20240617/64ba1499dc4ac.png`],
          },
          {
            title: "KODE-Open Systems Nozzle Series Selection",
            images: [`${CDN}/thumbnail/20240617/d416ea9e1e240.png`],
          },
          {
            title: "KODE-Open Systems Nozzle Tip Types",
            images: [`${CDN}/thumbnail/20240617/9ff259f9d8247.png`],
          },
        ],
      },
    ],
  },
  "23": {
    id: "23",
    navTitle: "Single Nozzle",
    description:
      "수명이 오래가고 안정적인 코런 싱글 밸브 노즐과 Resin 종류에 따라 다양하게 적용 가능한 싱글 오픈 노즐.",
    blocks: [
      {
        eyebrow: "수명이 오래가고 안정적인 싱글 벨브 노즐",
        title: "Single Valve Nozzles",
        subtitleLines: ["수명이 오래가고 안정적인 싱글 벨브 노즐"],
        heroSrc: `${CDN}/thumbnail/20240617/35a0a3f679657.png`,
        heroAlt: "KORUN Single Valve Nozzle",
        introTitle: "싱글 벨브 노즐은",
        introText:
          "별도의 Air 배관설치가 없고, 실린더가 외부로 설치되 O-Ring 수명이 오래갑니다. 2개의 실린더 구조로 피스톤 추력이 안정적입니다. 3zone 히타 적용으로 균일한 열 분포도를 가집니다. (고온사출 Resin에 탁월 합니다) 편리한 분해조립 구조로 수리가 용이 합니다.",
        tags: [
          "적용의 다양성",
          "튼튼한 내구성",
          "안정적 온도조절",
          "사용자 친화적 설계",
        ],
        galleryLabel: "KOSI-Single Valve Nozzle",
        sections: [
          {
            title: "KOSI-Single Valve Nozzle of Applications",
            images: [
              `${CDN}/thumbnail/20240617/0ec4d633ce941.png`,
              `${CDN}/thumbnail/20240617/85156c9aa20c8.png`,
            ],
          },
        ],
      },
      {
        introTitle: "싱글 오픈 노즐은",
        introText:
          "기존 Nozzle Head부의 수지 고화 현상이 없고, Resin 종류에 따라 다양하게 적용 가능하며, 분해 조립이 쉬운 구조로 설계되어 있습니다. 생활용품 제품부터 자동차 부품까지 코런의 높은 기술은 고객사의 원가절감으로 이어집니다. 코런의 Single Nozzle들이 고객사의 애로사항을 해결해 드릴 수 있습니다.",
        tags: [
          "적용의 다양성",
          "튼튼한 내구성",
          "안정적 온도조절",
          "Resin 종류에 따른 다양한 적용",
        ],
        showInquiry: true,
        galleryLabel: "KODE-Single Open Nozzle",
        sections: [
          {
            title: "KODE-Single Open Nozzle of Applications",
            images: [`${CDN}/thumbnail/20240617/e5d8a791c4e84.png`],
          },
        ],
      },
    ],
  },
  "24": {
    id: "24",
    navTitle: "Time & Temperature Controllers",
    description:
      "새로운 PID 알고리즘으로 정밀한 온도 제어가 가능한 KOTC-860 온도콘트롤러와 KOTS-800 시퀀스 인젝션 타이머.",
    blocks: [
      {
        eyebrow: "새로운 PID 알고리즘으로 정밀한 온도 제어 가능 시스템",
        title: "Time & Temperature Controllers",
        subtitleLines: ["새로운 PID 알고리즘으로 정밀한 온도 제어 가능 시스템"],
        heroSrc: `${CDN}/thumbnail/20240620/34b1cd2b6ab9f.png`,
        heroAlt: "KORUN Time and Temperature Controllers",
        introTitle: "Temperature Controllers는",
        introBullets: [
          "새로운 PID 알고리즘 적용으로 정밀한 온도 제어",
          "과전압 입력시 방어기능 (오배선 방지) 각종 에러 검출기능",
          "온도보정 기능 (편차보정 및 기울기 보정)",
          "트라이악 파손 방지 알고리즘 탑재",
          "전원 배선의 오류, 히터 쇼트, 과전압/과전류 등의 방어기능",
          "탑재 카트리지 방식의 유니트로 교체 필요시 시스템 동작에 영향이 없음",
        ],
        tags: ["정밀한 온도 제어", "각종 에러 검출", "사용자 친화적 설계"],
        galleryLabel: "KOTC-860 Temperature Controller",
        sections: [],
        spec: {
          model: "KOTC-860 Temperature Controller",
          image: `${CDN}/thumbnail/20240627/56d2bcc72d525.png`,
          rows: [
            {
              label: "입력전원",
              values: [
                "3상 3선+E(4선) 220VAC 50/60 Hz ±10%",
                "3상 4선+E(5선) 380VAC 50/60 Hz ±10%",
              ],
            },
            {
              label: "정밀도",
              values: ["±0.3°C 범위 30~400°C (옵션 30~500°C)"],
            },
            { label: "제어방식", values: ["오토튜닝 PID 또는 수동 PID 제어"] },
            { label: "써모커플 입력", values: ["접지형 또는 비접지형"] },
            { label: "써모커플 타입", values: ["IC(J) 또는 CA(K) Type"] },
            { label: "히터 출력", values: ["존 당 240VAC, 15A"] },
            { label: "제작 존수", values: ["1~60존 (제작 가능)"] },
            {
              label: "알람",
              values: [
                "히터 단선/단락 알람",
                "퓨즈 단선 알림",
                "온도 상·하한 알람",
                "전류 상·하한 알람",
                "써모커플 단선·단락·역접속 알람",
              ],
            },
          ],
        },
      },
      {
        introTitle: "Sequence Injection Timer는",
        introBullets: [
          "출력 전압선택 : DC 24V, AC 110V, AC 220V 중 선택가능",
          "동작모드 : A/B/C 모드 사용자 환경에 따라 모드 적용 가능",
          "입력 신호 : Free Voltage (사출기 출력전원을 자동으로 감지 인식)",
        ],
        tags: ["Free Voltage 입력", "A/B/C 동작모드", "출력 전압 선택"],
        galleryLabel: "KOTS-800 Sequence Injection Timer",
        sections: [],
        spec: {
          model: "KOTS-800 Sequence Injection Timer",
          rows: [
            {
              label: "주전원",
              values: ["단상 AC 90~250V (50/60Hz), 입력 전원 자동감지"],
            },
            {
              label: "사출 신호 입력 지원",
              values: ["DC 24V / AC 110V / AC 220V"],
            },
            { label: "솔레노이드 밸브 전원", values: ["DC 24V / AC 220V"] },
            {
              label: "솔레노이드 밸브 용량",
              values: [
                "DC 24V & AC 220V / Total 2A (TS-800)",
                "DC 24V & AC 220V / Each 1.2A (TS-801)",
              ],
            },
            { label: "사용환경", values: ["-10 ~ 50°C"] },
            { label: "시간범위", values: ["9.99 / 99.9 / 999"] },
            { label: "모드", values: ["A / B / C 모드"] },
            {
              label: "게이트 수",
              values: [
                "TS-800 & 801 : 4/6/8/12/18/24 게이트",
                "TS-780 : 8 게이트",
                "TS-910 : 1~16 게이트 (옵션 40 게이트)",
              ],
            },
          ],
        },
      },
    ],
  },
} as const;
