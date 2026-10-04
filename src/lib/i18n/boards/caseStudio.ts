import type { Locale } from "../locales";

export interface CaseStudioDict {
  list: {
    eyebrow: string;
    title: string;
    description: (count: number) => string;
    columns: {
      no: string;
      title: string;
      date: string;
      views: string;
    };
  };
  editor: {
    label: string;
    title: string;
    description: string;
    previewLabel: string;
  };
  meta: {
    listTitle: string;
    itemSuffix: string;
  };
  form: {
    infoSection: { title: string; description: string };
    title: string;
    date: string;
    datePlaceholder: string;
    idx: string;
    views: string;
    thumbnail: string;
    summary: string;
    description: string;
    blocksSection: { title: string; description: string };
    filesSection: { title: string; description: string };
  };
  preview: {
    sectionLabel: string;
    mobileSubtitle: string;
    mobileTitle: string;
    boardName: string;
    fileLabel: string;
  };
  shared: {
    buttonFallback: string;
    imageAlt: string;
  };
}

const ko: CaseStudioDict = {
  list: {
    eyebrow: "Service",
    title: "케이스 스튜디오",
    description: (count) =>
      `케이스 스튜디오 게시글 ${count}건입니다. 편집할 항목을 선택하세요.`,
    columns: {
      no: "No",
      title: "제목",
      date: "작성일",
      views: "조회수",
    },
  },
  editor: {
    label: "Service",
    title: "케이스 스튜디오",
    description:
      "케이스 스튜디오 게시글의 메타데이터, 본문 블록, 첨부 파일을 관리합니다.",
    previewLabel: "케이스 스튜디오 상세",
  },
  meta: {
    listTitle: "케이스 스튜디오 | KORUN Admin",
    itemSuffix: "KORUN Admin",
  },
  form: {
    infoSection: {
      title: "게시글 정보",
      description: "목록과 상세에 노출되는 메타데이터입니다.",
    },
    title: "제목 (title)",
    date: "작성일 (date)",
    datePlaceholder: "YYYY-MM-DD",
    idx: "고유 번호 (idx)",
    views: "조회수 (views)",
    thumbnail: "썸네일 (thumbnail)",
    summary: "요약 (summary)",
    description: "설명 (description)",
    blocksSection: {
      title: "본문 블록",
      description: "문단·이미지·버튼·구분선·줄바꿈 블록을 순서대로 구성합니다.",
    },
    filesSection: {
      title: "첨부 파일",
      description: "상세 페이지 하단의 다운로드 목록입니다.",
    },
  },
  preview: {
    sectionLabel: "Case Studio",
    mobileSubtitle: "다운로드 파일을 제공해드립니다",
    mobileTitle: "Downloads",
    boardName: "Case Studio",
    fileLabel: "첨부파일",
  },
  shared: {
    buttonFallback: "버튼",
    imageAlt: "본문 이미지",
  },
};

const en: CaseStudioDict = {
  list: {
    eyebrow: "Service",
    title: "Case Studio",
    description: (count) =>
      `${count} case studio post${count === 1 ? "" : "s"}. Select an item to edit.`,
    columns: {
      no: "No",
      title: "Title",
      date: "Date",
      views: "Views",
    },
  },
  editor: {
    label: "Service",
    title: "Case Studio",
    description:
      "Manage the metadata, body blocks, and attachments of case studio posts.",
    previewLabel: "Case Studio detail",
  },
  meta: {
    listTitle: "Case Studio | KORUN Admin",
    itemSuffix: "KORUN Admin",
  },
  form: {
    infoSection: {
      title: "Post information",
      description: "Metadata shown in the list and detail views.",
    },
    title: "Title (title)",
    date: "Date (date)",
    datePlaceholder: "YYYY-MM-DD",
    idx: "Unique ID (idx)",
    views: "Views (views)",
    thumbnail: "Thumbnail (thumbnail)",
    summary: "Summary (summary)",
    description: "Description (description)",
    blocksSection: {
      title: "Body blocks",
      description:
        "Compose paragraph, image, button, divider, and line-break blocks in order.",
    },
    filesSection: {
      title: "Attachments",
      description: "The download list at the bottom of the detail page.",
    },
  },
  preview: {
    sectionLabel: "Case Studio",
    mobileSubtitle: "Browse the files available for download",
    mobileTitle: "Downloads",
    boardName: "Case Studio",
    fileLabel: "Attachments",
  },
  shared: {
    buttonFallback: "Button",
    imageAlt: "Body image",
  },
};

export const caseStudioDict = { ko, en } satisfies Record<
  Locale,
  CaseStudioDict
>;
