import type { Locale } from "../locales";

export interface ItemsDict {
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
    category: string;
    author: string;
    title: string;
    date: string;
    datePlaceholder: string;
    idx: string;
    views: string;
    thumbnail: string;
    description: string;
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
    subtitle: string;
    mobileSubtitle: string;
    sectionLabel: string;
    boardName: string;
  };
  blocks: {
    typeNames: {
      text: string;
      image: string;
      button: string;
      hr: string;
      br: string;
      list: string;
    };
    addBlock: (typeName: string) => string;
    part: (index: number) => string;
    addPart: string;
    mergeParts: string;
    splitParts: string;
    align: string;
    alignDefault: string;
    alignLeft: string;
    alignCenter: string;
    content: string;
    fontSize: string;
    fontSizeRaw: string;
    bold: string;
    underline: string;
    color: string;
    item: string;
    addItem: string;
    remove: string;
    imageSrc: string;
    width: string;
    blockDisplay: string;
    buttonLabel: string;
    buttonHref: string;
    hrEmpty: string;
  };
}

const ko: ItemsDict = {
  list: {
    eyebrow: "Service",
    title: "기술 자료",
    description: (count) =>
      `기술 자료 게시글 ${count}건입니다. 편집할 항목을 선택하세요.`,
    columns: {
      no: "No",
      category: "분류",
      title: "제목",
      author: "작성자",
      date: "작성일",
      views: "조회수",
    },
  },
  editor: {
    label: "Service",
    title: "기술 자료",
    description:
      "기술 자료 게시글의 메타데이터, 본문 블록, 첨부 파일을 관리합니다.",
    previewLabel: "기술 자료 상세",
  },
  meta: {
    listTitle: "기술 자료 | KORUN Admin",
    itemSuffix: "KORUN Admin",
  },
  form: {
    metaSection: {
      title: "게시글 정보",
      description: "목록과 상세에 노출되는 메타데이터입니다.",
    },
    category: "분류 (category)",
    author: "작성자 (author)",
    title: "제목 (title)",
    date: "작성일 (date)",
    datePlaceholder: "YYYY-MM-DD",
    idx: "고유 번호 (idx)",
    views: "조회수 (views)",
    thumbnail: "썸네일 (thumbnail)",
    description: "설명 (description)",
    blocksSection: {
      title: "본문 블록",
      description: "문단·이미지·버튼·구분선·줄바꿈 블록을 순서대로 구성합니다.",
    },
    filesSection: {
      title: "첨부 파일",
      description: "이 게시판의 파일은 이름과 크기만 표시됩니다.",
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
    subtitle: "자사의 기술력으로 구현된 다양한 제품을 소개합니다.",
    mobileSubtitle: "신적이고 탁월한 아이템을 소개드립니다",
    sectionLabel: "Interesting Items",
    boardName: "Interesting Items",
  },
  blocks: {
    typeNames: {
      text: "텍스트",
      image: "이미지",
      button: "버튼",
      hr: "구분선",
      br: "줄바꿈",
      list: "목록",
    },
    addBlock: (typeName) => `${typeName} 추가`,
    part: (index) => `조각 ${index}`,
    addPart: "조각 추가",
    mergeParts: "단일 텍스트로 합치기",
    splitParts: "조각(parts)으로 나누기",
    align: "정렬",
    alignDefault: "기본",
    alignLeft: "왼쪽",
    alignCenter: "가운데",
    content: "내용",
    fontSize: "글자 크기",
    fontSizeRaw: "글자 크기 (fontSize)",
    bold: "굵게",
    underline: "밑줄",
    color: "색상 (color)",
    item: "항목",
    addItem: "항목 추가",
    remove: "삭제",
    imageSrc: "이미지 URL (src)",
    width: "너비 (width)",
    blockDisplay: "블록으로 표시",
    buttonLabel: "문구 (label)",
    buttonHref: "링크 (href)",
    hrEmpty: "구분선은 별도 설정이 없습니다.",
  },
};

const en: ItemsDict = {
  list: {
    eyebrow: "Service",
    title: "Technical Resources",
    description: (count) =>
      `${count} technical resource post${count === 1 ? "" : "s"}. Select an item to edit.`,
    columns: {
      no: "No",
      category: "Category",
      title: "Title",
      author: "Author",
      date: "Date",
      views: "Views",
    },
  },
  editor: {
    label: "Service",
    title: "Technical Resources",
    description:
      "Manage the metadata, body blocks, and attachments of technical resource posts.",
    previewLabel: "Technical resource detail",
  },
  meta: {
    listTitle: "Technical Resources | KORUN Admin",
    itemSuffix: "KORUN Admin",
  },
  form: {
    metaSection: {
      title: "Post information",
      description: "Metadata shown in the list and detail views.",
    },
    category: "Category (category)",
    author: "Author (author)",
    title: "Title (title)",
    date: "Date (date)",
    datePlaceholder: "YYYY-MM-DD",
    idx: "Unique ID (idx)",
    views: "Views (views)",
    thumbnail: "Thumbnail (thumbnail)",
    description: "Description (description)",
    blocksSection: {
      title: "Body blocks",
      description:
        "Compose paragraph, image, button, divider, and line-break blocks in order.",
    },
    filesSection: {
      title: "Attachments",
      description: "Files on this board show only a name and a size.",
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
    subtitle:
      "A look at the diverse products realized through our engineering.",
    mobileSubtitle: "Discover innovative and outstanding items",
    sectionLabel: "Interesting Items",
    boardName: "Interesting Items",
  },
  blocks: {
    typeNames: {
      text: "Text",
      image: "Image",
      button: "Button",
      hr: "Divider",
      br: "Line break",
      list: "List",
    },
    addBlock: (typeName) => `Add ${typeName.toLowerCase()}`,
    part: (index) => `Part ${index}`,
    addPart: "Add part",
    mergeParts: "Merge into single text",
    splitParts: "Split into parts",
    align: "Alignment",
    alignDefault: "Default",
    alignLeft: "Left",
    alignCenter: "Center",
    content: "Content",
    fontSize: "Font size",
    fontSizeRaw: "Font size (fontSize)",
    bold: "Bold",
    underline: "Underline",
    color: "Color (color)",
    item: "Item",
    addItem: "Add item",
    remove: "Remove",
    imageSrc: "Image URL (src)",
    width: "Width (width)",
    blockDisplay: "Display as block",
    buttonLabel: "Text (label)",
    buttonHref: "Link (href)",
    hrEmpty: "A divider has no additional settings.",
  },
};

export const itemsDict = { ko, en } satisfies Record<Locale, ItemsDict>;
