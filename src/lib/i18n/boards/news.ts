import type { Locale } from "../locales";

export interface NewsDict {
  list: {
    eyebrow: string;
    title: string;
    description: (count: number) => string;
    columns: {
      no: string;
      category: string;
      title: string;
      author: string;
      date: string;
      viewsLikes: string;
    };
    noticeBadge: string;
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
    category: string;
    author: string;
    title: string;
    date: string;
    datePlaceholder: string;
    idx: string;
    views: string;
    likes: string;
    notice: string;
    description: string;
    blocksSection: { title: string; description: string };
    filesSection: { title: string; description: string };
  };
  files: {
    item: (index: number) => string;
    name: string;
    size: string;
    sizePlaceholder: string;
    url: string;
    add: string;
  };
  preview: {
    subtitle: string;
    sectionLabel: string;
    mobileTitle: string;
    boardName: string;
  };
  actions: {
    moveUp: string;
    moveDown: string;
    remove: string;
  };
}

const ko: NewsDict = {
  list: {
    eyebrow: "Service",
    title: "뉴스",
    description: (count) =>
      `뉴스·이벤트 게시글 ${count}건입니다. 편집할 글을 선택하세요.`,
    columns: {
      no: "No",
      category: "분류",
      title: "제목",
      author: "작성자",
      date: "작성일",
      viewsLikes: "조회/좋아요",
    },
    noticeBadge: "공지",
  },
  editor: {
    label: "Service",
    title: "뉴스",
    description:
      "뉴스·이벤트 게시글의 메타데이터, 본문 블록, 첨부 파일을 관리합니다.",
    previewLabel: "뉴스 상세",
  },
  meta: {
    listTitle: "뉴스 | KORUN Admin",
    itemSuffix: "KORUN Admin",
  },
  form: {
    metaSection: {
      title: "게시글 정보",
      description: "목록과 상세 상단에 노출되는 메타데이터입니다.",
    },
    category: "분류 (category)",
    author: "작성자 (author)",
    title: "제목 (title)",
    date: "작성일 (date)",
    datePlaceholder: "YYYY-MM-DD",
    idx: "고유 번호 (idx)",
    views: "조회수 (views)",
    likes: "좋아요 (likes)",
    notice: "공지글로 표시 (notice)",
    description: "요약 (description)",
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
    url: "다운로드 URL (url)",
    add: "파일 추가",
  },
  preview: {
    subtitle: "최신 뉴스와 이벤트를 한눈에 보여드립니다",
    sectionLabel: "News&Events",
    mobileTitle: "News & Events",
    boardName: "뉴스&이벤트",
  },
  actions: {
    moveUp: "위로 이동",
    moveDown: "아래로 이동",
    remove: "삭제",
  },
};

const en: NewsDict = {
  list: {
    eyebrow: "Service",
    title: "News",
    description: (count) =>
      `${count} news & event post${count === 1 ? "" : "s"}. Select a post to edit.`,
    columns: {
      no: "No",
      category: "Category",
      title: "Title",
      author: "Author",
      date: "Date",
      viewsLikes: "Views/Likes",
    },
    noticeBadge: "Notice",
  },
  editor: {
    label: "Service",
    title: "News",
    description:
      "Manage the metadata, body blocks, and attachments of news & event posts.",
    previewLabel: "News detail",
  },
  meta: {
    listTitle: "News | KORUN Admin",
    itemSuffix: "KORUN Admin",
  },
  form: {
    metaSection: {
      title: "Post information",
      description: "Metadata shown at the top of the list and detail views.",
    },
    category: "Category (category)",
    author: "Author (author)",
    title: "Title (title)",
    date: "Date (date)",
    datePlaceholder: "YYYY-MM-DD",
    idx: "Unique ID (idx)",
    views: "Views (views)",
    likes: "Likes (likes)",
    notice: "Show as notice (notice)",
    description: "Summary (description)",
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
    url: "Download URL (url)",
    add: "Add file",
  },
  preview: {
    subtitle: "The latest news and events at a glance",
    sectionLabel: "News&Events",
    mobileTitle: "News & Events",
    boardName: "News&Events",
  },
  actions: {
    moveUp: "Move up",
    moveDown: "Move down",
    remove: "Remove",
  },
};

export const newsDict = { ko, en } satisfies Record<Locale, NewsDict>;
