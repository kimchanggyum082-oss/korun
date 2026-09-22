import FooterBar, {
  type FooterBarContact,
  type FooterBarLabels,
  type FooterBarLinks,
} from "@/components/layout/FooterBar";
import { siteSettingsDefault } from "@/lib/admin/entity-store";
import { resolveActiveLocale } from "@/lib/content";

export default async function Footer({
  contact = siteSettingsDefault(),
  labels,
  links,
  copyright,
}: {
  contact?: FooterBarContact;
  labels?: FooterBarLabels;
  links?: FooterBarLinks;
  copyright?: string;
}) {
  const locale = await resolveActiveLocale();
  return (
    <FooterBar
      contact={contact}
      labels={labels}
      links={links}
      copyright={copyright}
      locale={locale}
    />
  );
}
