import Link from "next/link";
import { getLocalizedRoute } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="not-found section">
      <div className="section-band not-found-shell">
        <div className="section-kicker">页面走丢了</div>
        <h1 className="page-title">这一页没有出现在当前公开归档里。</h1>
        <p className="page-copy not-found-copy">你可以回到首页继续浏览，或者直接打开博客归档，顺着现有文章继续读下去。</p>
        <div className="not-found-code">404</div>
        <div className="not-found-actions">
          <Link className="button-link button-link--primary" href={getLocalizedRoute("zh", "/")}>
            返回首页
          </Link>
          <Link className="button-link button-link--secondary" href={getLocalizedRoute("zh", "/blog")}>
            浏览归档
          </Link>
        </div>
      </div>
    </section>
  );
}