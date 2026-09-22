import FooterBar, {
  type FooterBarContact,
  type FooterBarLabels,
  type FooterBarLinks,
} from "@/components/layout/FooterBar";
import { siteSettingsDefault } from "@/lib/admin/entity-store";

export default function Footer({
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
  return (
    <FooterBar
      contact={contact}
      labels={labels}
      links={links}
      copyright={copyright}
    />
  );
}
