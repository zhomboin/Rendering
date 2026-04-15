import type { MetadataRoute } from "next";
import { getMessages } from "@/lib/i18n";

export default function manifest(): MetadataRoute.Manifest {
  const messages = getMessages("zh");

  return {
    name: messages.site.name,
    short_name: messages.site.name,
    description: messages.site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff7d6",
    theme_color: "#ff8a5b",
    lang: "zh-CN",
    categories: ["technology", "blog", "personal"],
    icons: [
      {
        src: "/logo/icon.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
