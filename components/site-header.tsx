import { SearchTrigger } from "@/components/search-trigger";
import { siteNavigation } from "@/lib/site";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-mark">Rendering Signal</span>
        <span className="brand-name">rendering.me</span>
      </Link>

      <nav className="nav-links" aria-label="Primary">
        {siteNavigation.map((item) => (
          <Link key={item.href} className="nav-link" href={item.href}>
            {item.label}
          </Link>
        ))}
        <SearchTrigger />
      </nav>
    </header>
  );
}
