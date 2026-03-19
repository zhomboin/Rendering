import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Rendering: a playful personal blog about frontend systems, design clarity, reading experience, and technical craft.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Rendering",
    description: "A playful personal blog about frontend systems, design clarity, reading experience, and technical craft.",
    url: "/about"
  },
  twitter: {
    title: "About Rendering",
    description: "A playful personal blog about frontend systems, design clarity, reading experience, and technical craft."
  }
};

export default function AboutPage() {
  return (
    <>
      <section className="section-band">
        <div className="section-kicker">About the Blog</div>
        <h1 className="page-title">一个认真写技术、也认真经营气质的个人博客</h1>
        <p className="page-copy">
          Rendering 现在被定位成个人博客，而不是 CMS 展示层。它可以先保持轻巧、有趣、可读，后面再慢慢长出后台和登录能力。
        </p>
      </section>

      <section className="about-grid section">
        <article className="panel about-panel">
          <div className="section-kicker">Author Profile</div>
          <h2 className="section-title">趣味和专业，不必二选一</h2>
          <p className="about-copy">
            这次前端方向的核心，不是把博客做成玩具，而是让它看起来更像一个真实的人在写作、整理和分享，而不是某个模板站自动生成的目录页。
          </p>
          <p className="about-copy">
            所以外层可以更鲜艳、更圆润、更有记忆点，正文区反而要更克制，让图文混排、长段落和技术内容都能安心落下去。
          </p>
        </article>
        <div className="post-list">
          <article className="panel about-panel">
            <div className="section-kicker">Working Principles</div>
            <p className="metric-detail">趣味化首页和卡片外壳</p>
            <p className="metric-detail">安静、稳定、耐读的正文区</p>
            <p className="metric-detail">真实主题切换与阅读进度反馈</p>
            <p className="metric-detail">为未来 CMS 留扩展空间</p>
          </article>
          <article className="panel about-panel">
            <div className="section-kicker">Next Stops</div>
            <div className="post-list">
              <Link className="button-link button-link--primary" href="/blog">
                Read archive
              </Link>
              <Link className="button-link button-link--secondary" href="/tags">
                Explore tags
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
