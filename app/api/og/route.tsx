import { ImageResponse } from "next/og";
import { getMessages, normalizeLocale } from "@/lib/i18n";

export const runtime = "edge";
export const revalidate = 3600;

const imageSize = {
  width: 1200,
  height: 630
};

function pickPalette(kind: string) {
  if (kind === "post") {
    return {
      background: "linear-gradient(135deg, #fff7d6 0%, #ffd17e 46%, #7fd5ff 100%)",
      card: "rgba(255, 255, 255, 0.7)",
      accent: "#ff7a45",
      accentSoft: "#6ed3cf",
      text: "#221a45",
      subtext: "#544b7a"
    };
  }

  return {
    background: "linear-gradient(135deg, #fff4c9 0%, #ffb36b 38%, #7cc9ff 100%)",
    card: "rgba(255, 255, 255, 0.72)",
    accent: "#ff6b4a",
    accentSoft: "#84dc8f",
    text: "#241a4f",
    subtext: "#5c557d"
  };
}

function truncate(value: string | null, limit: number, fallback: string) {
  const normalized = typeof value === "string" ? value.trim() : "";

  if (!normalized) {
    return fallback;
  }

  return normalized.length > limit ? `${normalized.slice(0, limit - 1)}…` : normalized;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = normalizeLocale(searchParams.get("locale") ?? "zh");
  const kind = searchParams.get("kind") === "post" ? "post" : "site";
  const messages = getMessages(locale);
  const palette = pickPalette(kind);
  const title =
    kind === "post"
      ? truncate(searchParams.get("title"), 84, messages.site.name)
      : locale === "zh"
        ? messages.site.brandMark
        : "Playful Personal Blog";
  const meta =
    kind === "post"
      ? truncate(searchParams.get("meta"), 72, messages.article.storyCapsule)
      : locale === "zh"
        ? "默认亮色 · 支持暗色 · 长文阅读友好"
        : "Light by default · Dark mode ready · Long-form reading";
  const eyebrow = kind === "post" ? messages.article.storyCapsule : messages.home.hero.kicker;
  const footerLabel =
    kind === "post"
      ? truncate(searchParams.get("slug"), 42, "rendering.me/blog")
      : locale === "zh"
        ? "rendering.me · 个人博客"
        : "rendering.me · personal blog";
  const subtitle = kind === "post" ? messages.site.name : truncate(messages.site.description, 96, messages.site.name);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: palette.background,
          color: palette.text,
          fontFamily: "Segoe UI, sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 52,
            right: 64,
            width: 210,
            height: 210,
            borderRadius: 999,
            background: "rgba(255, 255, 255, 0.36)"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -70,
            bottom: -70,
            width: 260,
            height: 260,
            borderRadius: 72,
            transform: "rotate(-18deg)",
            background: "rgba(255, 255, 255, 0.28)"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 128,
            top: 118,
            width: 88,
            height: 88,
            borderRadius: 28,
            transform: "rotate(-12deg)",
            background: palette.accentSoft,
            opacity: 0.92
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 218,
            bottom: 116,
            width: 132,
            height: 132,
            borderRadius: 40,
            transform: "rotate(15deg)",
            background: palette.accent,
            opacity: 0.9
          }}
        />

        <div
          style={{
            margin: 42,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 42,
            background: palette.card,
            boxShadow: "0 24px 80px rgba(39, 24, 89, 0.18)",
            padding: "56px 60px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 22px",
                borderRadius: 999,
                background: "rgba(255, 255, 255, 0.78)",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase"
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  background: palette.accent
                }}
              />
              <span>{eyebrow}</span>
            </div>
            <div
              style={{
                display: "flex",
                padding: "12px 18px",
                borderRadius: 999,
                background: "rgba(255, 255, 255, 0.72)",
                fontSize: 24,
                color: palette.subtext
              }}
            >
              {locale === "zh" ? "默认亮色 / 支持暗色" : "Light / Dark ready"}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.08 }}>{title}</div>
            <div style={{ display: "flex", fontSize: 30, lineHeight: 1.35, color: palette.subtext }}>{subtitle}</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "18px 22px",
                borderRadius: 28,
                background: "rgba(255, 255, 255, 0.74)",
                fontSize: 28,
                color: palette.text
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: palette.accentSoft
                }}
              />
              <span>{meta}</span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>{messages.site.name}</div>
              <div style={{ display: "flex", fontSize: 22, color: palette.subtext }}>{footerLabel}</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 18px",
                borderRadius: 26,
                background: "rgba(255, 255, 255, 0.78)",
                fontSize: 24,
                color: palette.subtext
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: 16,
                  height: 16,
                  borderRadius: 10,
                  background: palette.accentSoft
                }}
              />
              <span>{locale === "zh" ? "claymorphism notes" : "claymorphism notes"}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    imageSize
  );
}