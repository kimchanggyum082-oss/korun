import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
          <p className="text-[60px] font-bold leading-none text-brand md:text-[80px]">
            404
          </p>
          <p className="mt-4 text-[16px] text-neutral-600 md:text-[18px]">
            요청하신 페이지를 찾을 수 없습니다.
          </p>
          <Link
            href="/"
            className="mt-6 bg-ink px-6 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-brand"
          >
            홈으로 이동
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
