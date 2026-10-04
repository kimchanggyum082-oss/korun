import type { Locale } from "../locales";

export interface JobsDict {
  list: {
    eyebrow: string;
    title: string;
    description: (count: number) => string;
    columns: {
      no: string;
      title: string;
      author: string;
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
    metaSection: { title: string; description: string };
    title: string;
    author: string;
    date: string;
    datePlaceholder: string;
    views: string;
    idx: string;
    blocksSection: { title: string; description: string };
    filesSection: { title: string; description: string };
  };
  files: {
    item: (index: number) => string;
    name: string;
    size: string;
    sizePlaceholder: string;
    add: string;
    remove: string;
  };
  preview: {
    sectionLabel: string;
    boardName: string;
    fileLabel: string;
  };
}

const ko: JobsDict = {
  list: {
    eyebrow: "Service",
    title: "채용정보",
    description: (count) =>
      `채용정보 게시글 ${count}건입니다. 편집할 항목을 선택하세요.`,
    columns: {
      no: "No",
      title: "제목",
      author: "작성자",
      date: "작성일",
      views: "조회수",
    },
  },
  editor: {
    label: "Service",
    title: "채용정보",
    description:
      "채용정보 게시글의 메타데이터, 본문 블록, 첨부 파일을 관리합니다.",
    previewLabel: "채용정보 상세",
  },
  meta: {
    listTitle: "채용정보 | KORUN Admin",
    itemSuffix: "KORUN Admin",
  },
  form: {
    metaSection: {
      title: "게시글 정보",
      description: "목록과 상세에 노출되는 메타데이터입니다.",
    },
    title: "제목 (title)",
    author: "작성자 (author)",
    date: "작성일 (date)",
    datePlaceholder: "YYYY-MM-DD",
    views: "조회수 (views)",
    idx: "고유 번호 (idx)",
    blocksSection: {
      title: "본문 블록",
      description: "문단·이미지·버튼·구분선·줄바꿈 블록을 순서대로 구성합니다.",
    },
    filesSection: {
      title: "첨부 파일",
      description: "상세 페이지 하단의 다운로드 목록입니다.",
    },
  },
  files: {
    item: (index) => `파일 ${index}`,
    name: "이름 (name)",
    size: "크기 (size)",
    sizePlaceholder: "예: 979KB",
    add: "파일 추가",
    remove: "삭제",
  },
  preview: {
    sectionLabel: "Job Posting",
    boardName: "Job Posting",
    fileLabel: "첨부파일",
  },
};

const en: JobsDict = {
  list: {
    eyebrow: "Service",
    title: "Job Posting",
    description: (count) =>
      `${count} job post${count === 1 ? "" : "s"}. Select an item to edit.`,
    columns: {
      no: "No",
      title: "Title",
      author: "Author",
      date: "Date",
      views: "Views",
    },
  },
  editor: {
    label: "Service",
    title: "Job Posting",
    description:
      "Manage the metadata, body blocks, and attachments of job posts.",
    previewLabel: "Job posting detail",
  },
  meta: {
    listTitle: "Job Posting | KORUN Admin",
    itemSuffix: "KORUN Admin",
  },
  form: {
    metaSection: {
      title: "Post information",
      description: "Metadata shown in the list and detail views.",
    },
    title: "Title (title)",
    author: "Author (author)",
    date: "Date (date)",
    datePlaceholder: "YYYY-MM-DD",
    views: "Views (views)",
    idx: "Unique ID (idx)",
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
  files: {
    item: (index) => `File ${index}`,
    name: "Name (name)",
    size: "Size (size)",
    sizePlaceholder: "e.g. 979KB",
    add: "Add file",
    remove: "Remove",
  },
  preview: {
    sectionLabel: "Job Posting",
    boardName: "Job Posting",
    fileLabel: "Attachments",
  },
};

export const jobsDict = { ko, en } satisfies Record<Locale, JobsDict>;
