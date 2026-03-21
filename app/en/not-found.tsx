import Link from "next/link";
import { getLocalizedRoute } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="not-found section">
      <div className="section-band not-found-shell">
        <div className="section-kicker">Page Lost</div>
        <h1 className="page-title">This page is not part of the current archive.</h1>
        <p className="page-copy not-found-copy">
          You can head back home, reopen the blog archive, or use the tag map to keep moving through the published writing.
        </p>
        <div className="not-found-code">404</div>
        <div className="not-found-actions">
          <Link className="button-link button-link--primary" href={getLocalizedRoute("en", "/")}>
            Back Home
          </Link>
          <Link className="button-link button-link--secondary" href={getLocalizedRoute("en", "/blog")}>
            Browse Archive
          </Link>
          <Link className="button-link button-link--secondary" href={getLocalizedRoute("en", "/tags")}>
            View Tags
          </Link>
        </div>
      </div>
    </section>
  );
}