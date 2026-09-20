"use client";

import {
  BubbleIcon,
  FaxIcon,
  HeartIcon,
  ShareIcon,
} from "@/components/service/ServiceIcons";

export default function PostActions({
  likeCount = 0,
  commentCount = 0,
}: {
  likeCount?: number;
  commentCount?: number;
  listHref?: string;
}) {
  return (
    <>
      {/* PC */}
      <div className="hidden items-center justify-between pc:flex">
        <div className="flex items-center">
          <button
            type="button"
            className="mr-4 flex items-center border-y border-transparent py-[10px] text-[17px] leading-[24.29px] text-ink"
          >
            <HeartIcon className="-mt-[2px] mr-[4px] h-[16px] w-[18px]" />
            <em className="not-italic">{likeCount}</em>
          </button>
          <span className="mr-4 flex items-center border-y border-transparent py-[10px] text-[17px] leading-[24.29px] text-ink">
            <BubbleIcon className="-mt-[1px] mr-[4px]" />
            <em className="not-italic">{commentCount}</em>
          </span>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            aria-label="공유"
            className="flex h-[46.28px] items-center px-[12px] py-[11px] text-ink"
          >
            <ShareIcon />
          </button>
          <button
            type="button"
            aria-label="인쇄"
            onClick={() => window.print()}
            className="hidden h-[46.28px] items-center py-[11px] pl-[12px] text-ink pc:flex"
          >
            <FaxIcon />
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="-mx-[15px] flow-root px-[15px] pc:hidden">
        <div className="float-left flow-root">
          <button
            type="button"
            className="float-left mr-[16px] border-y border-transparent py-[10px] text-[17px] leading-[24.2857px] text-ink"
          >
            <HeartIcon className="mr-[4px] inline-block h-[16px] w-[18.3px] align-[-14.2857%]" />
            <em className="not-italic">{likeCount}</em>
          </button>
          <span className="float-left mr-[16px] border-y border-transparent py-[10px] text-[17px] leading-[24.2857px] text-ink">
            <BubbleIcon className="relative top-[1px] mr-[4px] inline-block h-[17px] w-[17px]" />
            <em className="not-italic">{commentCount}</em>
          </span>
        </div>
        <div className="float-right">
          <button
            type="button"
            aria-label="공유"
            className="border-y border-transparent py-[11px] pl-[12px] text-ink"
          >
            <ShareIcon />
          </button>
        </div>
      </div>
    </>
  );
}
