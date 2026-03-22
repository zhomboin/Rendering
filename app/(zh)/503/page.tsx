import Link from "next/link";
import { getLocalizedRoute } from "@/lib/site";

export default function ServiceUnavailablePage() {
  return (
    <section className="not-found section">
      <div className="section-band not-found-shell">
        <div className="section-kicker">服务暂时不可用</div>
        <h1 className="page-title">我们正在恢复这个页面，请稍后再试。</h1>
        <p className="page-copy not-found-copy">
          你可以先返回主页继续浏览，或者打开博客归档看看其他已经发布的内容。
        </p>
        <div className="not-found-code">503</div>
        <div className="not-found-actions">
          <Link className="button-link button-link--primary" href={getLocalizedRoute("zh", "/")}>
            返回主页
          </Link>
          <Link className="button-link button-link--secondary" href={getLocalizedRoute("zh", "/blog")}>
            浏览归档
          </Link>
        </div>
      </div>
    </section>
  );
}