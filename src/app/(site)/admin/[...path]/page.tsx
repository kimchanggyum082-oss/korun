import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionPlaceholder from "@/components/admin/SectionPlaceholder";
import { findAdminNavItem } from "@/lib/admin/nav";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>;
}): Promise<Metadata> {
  const { path } = await params;
  const item = findAdminNavItem(`/admin/${path.join("/")}`);
  if (!item) return {};
  return { title: `${item.ko} | KORUN Admin` };
}

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const item = findAdminNavItem(`/admin/${path.join("/")}`);
  if (!item) notFound();

  return (
    <SectionPlaceholder
      title={item.ko}
      label={item.label}
      description={item.description}
    />
  );
}
