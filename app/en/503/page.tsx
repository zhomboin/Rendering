import Link from "next/link";
import { getLocalizedRoute } from "@/lib/site";

export default function ServiceUnavailablePage() {
  return (
    <section className="not-found section">
      <div className="section-band not-found-shell">
        <div className="section-kicker">Service Unavailable</div>
        <h1 className="page-title">We are bringing this page back. Please try again in a moment.</h1>
        <p className="page-copy not-found-copy">
          You can head back home for now, or reopen the blog archive and continue through the published writing.
        </p>
        <div className="not-found-code">503</div>
        <div className="not-found-actions">
          <Link className="button-link button-link--primary" href={getLocalizedRoute("en", "/")}>
            Back Home
          </Link>
          <Link className="button-link button-link--secondary" href={getLocalizedRoute("en", "/blog")}>
            Browse Archive
          </Link>
        </div>
      </div>
    </section>
  );
}