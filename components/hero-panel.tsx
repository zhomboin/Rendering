import Link from "next/link";

export function HeroPanel() {
  return (
    <section className="panel hero-panel">
      <div className="hero-kicker">Playful Personal Blog</div>
      <h1 className="hero-title">把技术博客做得像一盒彩色黏土，也像一张舒服的阅读桌。</h1>
      <p className="hero-copy">
        Rendering 现在更像一个带着作者性格的个人空间。高饱和颜色负责把你吸引过来，安静排版和阅读进度负责让长文真的读得下去。
      </p>
      <div className="hero-badges">
        <span className="hero-badge">黏土拟态卡片</span>
        <span className="hero-badge">亮色默认主题</span>
        <span className="hero-badge">可切换暗色模式</span>
        <span className="hero-badge">真实阅读进度</span>
      </div>
      <div className="hero-actions section">
        <Link className="button-link button-link--primary" href="/blog">
          Read the Blog
        </Link>
        <Link className="button-link button-link--secondary" href="/about">
          Meet the Author
        </Link>
      </div>
    </section>
  );
}
