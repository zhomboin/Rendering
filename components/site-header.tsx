import { SearchTrigger } from "@/components/search-trigger";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteNavigation } from "@/lib/site";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-mark">Playful Personal Blog</span>
        <span className="brand-name">Rendering</span>
      </Link>

      <div className="header-controls">
        <nav aria-label="Primary" className="nav-links">
          {siteNavigation.map((item) => (
            <Link key={item.href} className="nav-link" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
