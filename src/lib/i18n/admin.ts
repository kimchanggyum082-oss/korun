import type { Locale } from "./locales";

export interface AdminDict {
  layout: {
    title: string;
    subtitle: string;
    signOut: string;
    signingOut: string;
    desktopOnly: string;
    desktopOnlyHint: string;
    language: string;
    korean: string;
    english: string;
    viewSite: string;
  };
  groups: {
    main: string;
    content: string;
    boards: string;
    manage: string;
  };
  nav: Record<string, string>;
  editor: {
    sourceDraft: string;
    sourcePublished: string;
    sourceDefault: string;
    noChanges: string;
    draftSaved: string;
    published: string;
    saveDraft: string;
    publish: string;
    save: string;
    processing: string;
    failed: string;
    networkError: string;
    storeMissingTitle: string;
    storeMissingBody: string;
    preview: string;
    previewLanguage: string;
    previewLive: string;
    korean: string;
    english: string;
    koMissing: string;
    enFallsBack: string;
    koMissingHint: string;
    enFallsBackHint: string;
    add: string;
    remove: string;
    moveUp: string;
    moveDown: string;
    upload: string;
    uploading: string;
    uploadFailed: string;
    uploaded: string;
    uploadedSize: (width: number, height: number) => string;
    uploadPlaceholder: string;
    uploadNotConfigured: string;
    uploadNotConfiguredBody: string;
    clear: string;
    emptyValue: string;
    contentList: string;
    imageList: string;
    imageListNote: string;
    imageFallbackNote: string;
    resetToDefault: string;
    linkSearch: string;
    linkNone: string;
    linkNoResults: string;
    linkDirect: string;
    listMaxReached: (max: number) => string;
  };
  dashboard: {
    quickLinks: string;
    notice: string;
    statProductsCases: string;
    statProductsCasesSub: (products: number, cases: number) => string;
    statBoards: string;
    statBoardsSub: (news: number, downloads: number, studio: number) => string;
    statMedia: string;
    statMediaSub: (images: number, jobs: number) => string;
    statPolicy: string;
    statPolicySub: string;
    links: { href: string; label: string; desc: string }[];
    noticeStoreReady: string;
    noticeStoreMissing: string;
    noticeUploadReady: string;
    noticeUploadMissing: string;
    noticePublish: string;
    noticePreview: string;
  };
  requests: {
    title: string;
    subtitle: string;
    empty: string;
    storeMissing: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    page: string;
    date: string;
  };
  preview: {
    blockLabel: (index: number) => string;
    locationMap: string;
    mapTitle: string;
    mapEmpty: string;
    searchShare: string;
    noTitle: string;
    noDescription: string;
    noKeywords: string;
  };
  login: {
    metaTitle: string;
    brand: string;
    title: string;
    subtitle: string;
    email: string;
    password: string;
    submit: string;
    submitting: string;
    failed: string;
    networkError: string;
    footnote: string;
  };
}

const ko: AdminDict = {
  layout: {
    title: "관리자 대시보드",
    subtitle: "콘텐츠 관리",
    signOut: "로그아웃",
    signingOut: "로그아웃 중…",
    desktopOnly: "데스크톱에서 이용해 주세요",
    desktopOnlyHint:
      "관리자 콘텐츠 편집은 PC 화면(가로 992px 이상)에 최적화되어 있습니다.",
    language: "관리자 언어",
    korean: "한국어",
    english: "English",
    viewSite: "웹사이트 보기",
  },
  groups: {
    main: "현황",
    content: "콘텐츠",
    boards: "게시판",
    manage: "관리",
  },
  nav: {
    "/admin": "현황",
    "pages:home": "홈",
    "pages:about": "회사 소개",
    "pages:products": "제품",
    "pages:cases": "적용 사례",
    "pages:site": "사이트 설정",
    "/admin/interesting-items": "흥미로운 아이템",
    "/admin/news": "뉴스&이벤트",
    "/admin/downloads": "자료실",
    "/admin/case-studio": "케이스 스튜디오",
    "/admin/job-posting": "채용 게시판",
    "/admin/requests": "문의 내역",
  },
  requests: {
    title: "문의 내역",
    subtitle: "홈페이지 문의하기 폼으로 접수된 요청입니다.",
    empty: "접수된 문의가 없습니다.",
    storeMissing:
      "데이터베이스가 설정되지 않아 문의 내역을 불러올 수 없습니다.",
    name: "담당자",
    company: "회사명",
    email: "이메일",
    phone: "연락처",
    subject: "제목",
    message: "내용",
    page: "페이지",
    date: "접수일시",
  },
  editor: {
    sourceDraft: "초안",
    sourcePublished: "게시본",
    sourceDefault: "기본값",
    noChanges: "변경사항 없음",
    draftSaved: "초안을 저장했습니다.",
    published: "게시했습니다. 공개 페이지에 반영됩니다.",
    saveDraft: "초안 저장",
    publish: "게시",
    save: "저장",
    processing: "처리 중…",
    failed: "저장하지 못했습니다.",
    networkError: "네트워크 오류가 발생했습니다.",
    storeMissingTitle: "데이터베이스가 설정되지 않아 저장할 수 없습니다",
    storeMissingBody:
      "DATABASE_URL을 설정하면 초안 저장과 게시를 사용할 수 있습니다. 지금은 편집과 미리보기만 동작합니다.",
    preview: "미리보기",
    previewLanguage: "미리보기 언어",
    previewLive: "입력값이 바로 반영됩니다",
    korean: "한국어",
    english: "English",
    koMissing: "한국어 없음",
    enFallsBack: "한국어로 표시",
    koMissingHint:
      "한국어가 비어 있으면 국문 사이트에서 이 문구가 표시되지 않습니다.",
    enFallsBackHint:
      "영문이 비어 있으면 공개 사이트에서 한국어가 대신 표시됩니다.",
    add: "추가",
    remove: "삭제",
    moveUp: "위로 이동",
    moveDown: "아래로 이동",
    upload: "파일 업로드",
    uploading: "업로드 중…",
    uploadFailed: "업로드에 실패했습니다.",
    uploaded: "업로드 완료",
    uploadedSize: (width, height) => `업로드 완료 · ${width}×${height}px`,
    uploadPlaceholder: "https://… 또는 아래 업로드 사용",
    uploadNotConfigured: "이미지 업로드가 설정되지 않았습니다.",
    uploadNotConfiguredBody:
      "BLOB_READ_WRITE_TOKEN이 없어 업로드를 사용할 수 없습니다. 이미지 URL을 직접 입력해 주세요.",
    clear: "선택 취소",
    emptyValue: "값이 비어 있으면 데이터 파일의 기본값이 표시됩니다.",
    contentList: "목록 (줄 단위로 추가/삭제)",
    imageList: "이미지 목록 (추가/삭제/순서 변경)",
    imageListNote:
      "이미지는 국·영문 공통으로 적용되며, 화면 크기에 맞춰 자동으로 조정됩니다.",
    imageFallbackNote: "비워 두면 기본 이미지가 표시됩니다.",
    resetToDefault: "기본값으로",
    linkSearch: "페이지 검색",
    linkNone: "링크 선택",
    linkNoResults:
      "검색 결과가 없습니다. 아래에 URL을 직접 입력할 수 있습니다.",
    linkDirect: "직접 입력 사용",
    listMaxReached: (max) => `최대 ${max}개까지 추가할 수 있습니다.`,
  },
  dashboard: {
    quickLinks: "바로 가기",
    notice: "안내",
    statProductsCases: "제품 · 적용 사례",
    statProductsCasesSub: (products, cases) =>
      `제품 ${products} · 사례 ${cases}`,
    statBoards: "게시판 게시물",
    statBoardsSub: (news, downloads, studio) =>
      `뉴스 ${news} · 자료실 ${downloads} · 스튜디오 ${studio}`,
    statMedia: "이미지 · 채용",
    statMediaSub: (images, jobs) =>
      `갤러리·특허 이미지 ${images} · 채용 공고 ${jobs}`,
    statPolicy: "정책 문서",
    statPolicySub: "이용약관 · 개인정보취급방침",
    links: [
      {
        href: "/admin/pages?group=home",
        label: "홈 섹션",
        desc: "히어로, 제품, CTA, 목록, 회사 소개, 오시는 길",
      },
      {
        href: "/admin/pages?group=about",
        label: "회사 소개",
        desc: "인사말, 특허·인증, 오시는 길, 채용 페이지",
      },
      {
        href: "/admin/pages?group=products",
        label: "제품 페이지",
        desc: "제품 21~24의 제목, 설명, 블록 이미지",
      },
      {
        href: "/admin/pages?group=cases",
        label: "적용 사례",
        desc: "사례 5종의 배너, 본문, 갤러리",
      },
      {
        href: "/admin/news",
        label: "뉴스",
        desc: "뉴스·이벤트 목록과 상세 본문, 첨부 파일",
      },
      {
        href: "/admin/downloads",
        label: "자료실",
        desc: "제품 소개서와 다운로드 파일",
      },
      {
        href: "/admin/case-studio",
        label: "케이스 스튜디오",
        desc: "케이스 스튜디오 게시물과 첨부 파일",
      },
      {
        href: "/admin/pages?group=site",
        label: "사이트 설정",
        desc: "회사 정보, 푸터, 약관 링크",
      },
    ],
    noticeStoreReady:
      "콘텐츠 저장소가 연결되어 있어 편집 내용이 데이터베이스에 저장됩니다.",
    noticeStoreMissing:
      "DATABASE_URL이 없어 번들에 포함된 기본 콘텐츠를 표시하고 있습니다. 편집 내용은 저장되지 않습니다.",
    noticeUploadReady:
      "이미지 업로드가 설정되어 있어 새 이미지를 올릴 수 있습니다.",
    noticeUploadMissing:
      "이미지 업로드에는 BLOB_READ_WRITE_TOKEN 설정이 필요합니다.",
    noticePublish: "게시를 실행하면 변경 내용이 공개 사이트에 반영됩니다.",
    noticePreview:
      "미리보기는 공개 페이지와 동일한 화면을 실제 크기(1280px)로 축소해 보여줍니다.",
  },
  preview: {
    blockLabel: (index) => `블록 ${index}`,
    locationMap: "위치 지도",
    mapTitle: "지도 미리보기",
    mapEmpty: "지도 URL을 입력하면 여기에 표시됩니다.",
    searchShare: "검색 및 공유",
    noTitle: "제목 없음",
    noDescription: "설명이 비어 있습니다.",
    noKeywords: "키워드 없음",
  },
  login: {
    metaTitle: "관리자 로그인",
    brand: "KORUN Admin",
    title: "관리자 로그인",
    subtitle: "콘텐츠를 관리하려면 계정으로 로그인하세요.",
    email: "이메일",
    password: "비밀번호",
    submit: "로그인",
    submitting: "로그인 중…",
    failed: "로그인에 실패했습니다.",
    networkError: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    footnote: "접근 권한은 관리자에게 문의하세요. 세션은 7일간 유지됩니다.",
  },
};

const en: AdminDict = {
  layout: {
    title: "Admin Dashboard",
    subtitle: "Content management",
    signOut: "Sign out",
    signingOut: "Signing out…",
    desktopOnly: "Please use a desktop screen",
    desktopOnlyHint:
      "Content editing is optimized for desktop screens (992px and wider).",
    language: "Admin language",
    korean: "한국어",
    english: "English",
    viewSite: "View website",
  },
  groups: {
    main: "Overview",
    content: "Content",
    boards: "Boards",
    manage: "Management",
  },
  nav: {
    "/admin": "Overview",
    "pages:home": "Home",
    "pages:about": "About",
    "pages:products": "Products",
    "pages:cases": "Case Of Applications",
    "pages:site": "Site Settings",
    "/admin/interesting-items": "Interesting Items",
    "/admin/news": "News & Events",
    "/admin/downloads": "Downloads",
    "/admin/case-studio": "Case Studio",
    "/admin/job-posting": "Job Board",
    "/admin/requests": "Inquiries",
  },
  requests: {
    title: "Inquiries",
    subtitle: "Requests submitted through the website contact form.",
    empty: "No inquiries received.",
    storeMissing: "DATABASE_URL is not set, so inquiries cannot be loaded.",
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    subject: "Subject",
    message: "Message",
    page: "Page",
    date: "Received",
  },
  editor: {
    sourceDraft: "Draft",
    sourcePublished: "Published",
    sourceDefault: "Default",
    noChanges: "No changes",
    draftSaved: "Draft saved.",
    published: "Published. Changes are live on the public site.",
    saveDraft: "Save draft",
    publish: "Publish",
    save: "Save",
    processing: "Working…",
    failed: "Could not save.",
    networkError: "A network error occurred.",
    storeMissingTitle: "Database not configured — saving is disabled",
    storeMissingBody:
      "Set DATABASE_URL to enable draft saving and publishing. Editing and preview work now.",
    preview: "Preview",
    previewLanguage: "Preview language",
    previewLive: "Updates as you type",
    korean: "한국어",
    english: "English",
    koMissing: "No Korean",
    enFallsBack: "Shows Korean",
    koMissingHint:
      "If Korean is empty, this text is not shown on the Korean site.",
    enFallsBackHint:
      "If English is empty, the public English site falls back to Korean.",
    add: "Add",
    remove: "Remove",
    moveUp: "Move up",
    moveDown: "Move down",
    upload: "Upload file",
    uploading: "Uploading…",
    uploadFailed: "Upload failed.",
    uploaded: "Uploaded",
    uploadedSize: (width, height) => `Uploaded · ${width}×${height}px`,
    uploadPlaceholder: "https://… or upload below",
    uploadNotConfigured: "Image upload is not configured.",
    uploadNotConfiguredBody:
      "Upload isn't available (BLOB_READ_WRITE_TOKEN missing). Enter an image URL directly.",
    clear: "Clear selection",
    emptyValue: "Empty values fall back to the data-file defaults.",
    contentList: "List (add/remove rows)",
    imageList: "Image list (add/remove/reorder)",
    imageListNote:
      "Images are shared across languages and adapt to every screen size.",
    imageFallbackNote: "Leave empty to keep the default image.",
    resetToDefault: "Use default",
    linkSearch: "Search pages",
    linkNone: "Select a link",
    linkNoResults: "No matches. Type a URL below to use it directly.",
    linkDirect: "Use typed value",
    listMaxReached: (max) => `Up to ${max} item${max === 1 ? "" : "s"}.`,
  },
  dashboard: {
    quickLinks: "Quick links",
    notice: "Notes",
    statProductsCases: "Products · Cases",
    statProductsCasesSub: (products, cases) =>
      `Products ${products} · Cases ${cases}`,
    statBoards: "Board posts",
    statBoardsSub: (news, downloads, studio) =>
      `News ${news} · Downloads ${downloads} · Studio ${studio}`,
    statMedia: "Media · Jobs",
    statMediaSub: (images, jobs) =>
      `Gallery/patent images ${images} · Jobs ${jobs}`,
    statPolicy: "Policy documents",
    statPolicySub: "Terms of Service · Privacy Policy",
    links: [
      {
        href: "/admin/pages?group=home",
        label: "Home sections",
        desc: "Hero, products, CTA, lists, company and location",
      },
      {
        href: "/admin/pages?group=about",
        label: "About",
        desc: "Greetings, patents, location and job postings",
      },
      {
        href: "/admin/pages?group=products",
        label: "Product pages",
        desc: "Titles, descriptions and block images for products 21–24",
      },
      {
        href: "/admin/pages?group=cases",
        label: "Case pages",
        desc: "Banners, body and gallery for 5 cases",
      },
      {
        href: "/admin/news",
        label: "News",
        desc: "News/event list, detail body and attachments",
      },
      {
        href: "/admin/downloads",
        label: "Downloads",
        desc: "Brochures and downloadable files",
      },
      {
        href: "/admin/case-studio",
        label: "Case Studio",
        desc: "Case studio posts and attachments",
      },
      {
        href: "/admin/pages?group=site",
        label: "Site settings",
        desc: "Company info, footer and terms links",
      },
    ],
    noticeStoreReady:
      "The content store is connected, so edits are saved to the database.",
    noticeStoreMissing:
      "DATABASE_URL is missing, so the bundled default content is shown. Edits are not saved.",
    noticeUploadReady: "Image upload is configured — you can add new images.",
    noticeUploadMissing:
      "Image upload requires the BLOB_READ_WRITE_TOKEN setting.",
    noticePublish: "Publishing applies changes to the public site.",
    noticePreview:
      "The preview shows the public page at real size (1280px), scaled down.",
  },
  preview: {
    blockLabel: (index) => `Block ${index}`,
    locationMap: "Location map",
    mapTitle: "Map preview",
    mapEmpty: "Enter a map URL to display it here.",
    searchShare: "Search & share",
    noTitle: "No title",
    noDescription: "No description.",
    noKeywords: "No keywords",
  },
  login: {
    metaTitle: "Admin Sign-in",
    brand: "KORUN Admin",
    title: "Admin Sign-in",
    subtitle: "Sign in to manage content.",
    email: "Email",
    password: "Password",
    submit: "Sign in",
    submitting: "Signing in…",
    failed: "Sign-in failed.",
    networkError: "A network error occurred. Please try again shortly.",
    footnote: "Ask an administrator for access. Sessions last 7 days.",
  },
};

export const adminDict: Record<Locale, AdminDict> = { ko, en };
