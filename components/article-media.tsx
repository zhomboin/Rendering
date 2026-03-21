"use client";

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, normalizeLocale } from "@/lib/i18n";
import { createGalleryModel, stepGalleryIndex } from "@/lib/article-media";

type MediaItem = {
  src: string;
  alt?: string;
  caption?: string;
};

function getMediaCopy(locale: string) {
  return normalizeLocale(locale) === "zh"
    ? {
        imagePreview: "图片预览",
        close: "关闭",
        closePreview: "关闭图片预览",
        showPrevious: "查看上一张图片",
        showNext: "查看下一张图片",
        previous: "上一张",
        next: "下一张",
        openImage: (alt: string) => `打开图片：${alt}`,
        openGalleryImage: (index: number, alt: string) => `打开画廊图片 ${index + 1}：${alt}`
      }
    : {
        imagePreview: "Image preview",
        close: "Close",
        closePreview: "Close image preview",
        showPrevious: "Show previous image",
        showNext: "Show next image",
        previous: "Prev",
        next: "Next",
        openImage: (alt: string) => `Open image: ${alt}`,
        openGalleryImage: (index: number, alt: string) => `Open gallery image ${index + 1}: ${alt}`
      };
}

function MediaLightbox({
  items,
  activeIndex,
  onSelect,
  onClose,
  locale = DEFAULT_LOCALE
}: {
  items: MediaItem[];
  activeIndex: number | null;
  onSelect?: (index: number) => void;
  onClose: () => void;
  locale?: string;
}) {
  const item = activeIndex === null ? null : items[activeIndex] ?? null;
  const hasNavigation = Boolean(item && items.length > 1 && onSelect);
  const mediaCopy = getMediaCopy(locale);

  useEffect(() => {
    if (!item) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (activeIndex === null || !onSelect) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = stepGalleryIndex(activeIndex, 1, items.length);

        if (nextIndex !== null) {
          onSelect(nextIndex);
        }

        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const nextIndex = stepGalleryIndex(activeIndex, -1, items.length);

        if (nextIndex !== null) {
          onSelect(nextIndex);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, item, items.length, onClose, onSelect]);

  if (!item) {
    return null;
  }

  const resolvedIndex = activeIndex ?? 0;

  const navigate = (step: number) => {
    if (activeIndex === null || !onSelect) {
      return;
    }

    const nextIndex = stepGalleryIndex(activeIndex, step, items.length);

    if (nextIndex !== null) {
      onSelect(nextIndex);
    }
  };

  return (
    <div className="article-lightbox" onClick={onClose} role="presentation">
      <div aria-modal="true" className="article-lightbox-dialog" onClick={(event) => event.stopPropagation()} role="dialog">
        <div className="article-lightbox-toolbar">
          <div className="article-lightbox-counter">{hasNavigation ? `${resolvedIndex + 1} / ${items.length}` : mediaCopy.imagePreview}</div>
          <button aria-label={mediaCopy.closePreview} className="article-lightbox-close" onClick={onClose} type="button">
            {mediaCopy.close}
          </button>
        </div>
        <div className="article-lightbox-stage">
          {hasNavigation ? (
            <button
              aria-label={mediaCopy.showPrevious}
              className="article-lightbox-nav article-lightbox-nav--prev"
              onClick={() => navigate(-1)}
              type="button"
            >
              <span aria-hidden="true">←</span>
              <span className="article-lightbox-nav-copy">{mediaCopy.previous}</span>
            </button>
          ) : null}
          <img alt={item.alt} className="article-lightbox-image" src={item.src} />
          {hasNavigation ? (
            <button
              aria-label={mediaCopy.showNext}
              className="article-lightbox-nav article-lightbox-nav--next"
              onClick={() => navigate(1)}
              type="button"
            >
              <span className="article-lightbox-nav-copy">{mediaCopy.next}</span>
              <span aria-hidden="true">→</span>
            </button>
          ) : null}
        </div>
        {item.caption ? <p className="article-lightbox-caption">{item.caption}</p> : null}
      </div>
    </div>
  );
}

export function Figure({
  src,
  alt,
  caption,
  credit,
  locale = DEFAULT_LOCALE
}: {
  src: string;
  alt?: string;
  caption?: string;
  credit?: string;
  locale?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const item = useMemo(() => createGalleryModel([{ src, alt, caption }]).items[0] ?? null, [alt, caption, src]);
  const mediaCopy = getMediaCopy(locale);

  if (!item) {
    return null;
  }

  return (
    <>
      <figure className="article-figure article-figure--interactive">
        <button
          aria-label={mediaCopy.openImage(item.alt)}
          className="article-media-button"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <img alt={item.alt} className="article-image" loading="lazy" src={item.src} />
        </button>
        {caption || credit ? (
          <figcaption className="article-figcaption article-figcaption--stacked">
            {caption ? <span>{caption}</span> : null}
            {credit ? <span className="article-credit">{credit}</span> : null}
          </figcaption>
        ) : null}
      </figure>
      <MediaLightbox activeIndex={isOpen ? 0 : null} items={[item]} locale={locale} onClose={() => setIsOpen(false)} />
    </>
  );
}

export function Gallery({
  items,
  caption,
  title,
  locale = DEFAULT_LOCALE
}: {
  items: MediaItem[];
  caption?: string;
  title?: string;
  locale?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const gallery = useMemo(() => createGalleryModel(items), [items]);
  const mediaCopy = getMediaCopy(locale);

  if (!gallery.items.length) {
    return null;
  }

  return (
    <>
      <figure className="article-figure article-gallery-shell">
        {title ? <div className="article-gallery-title">{title}</div> : null}
        <div className={`article-gallery ${gallery.layout}`}>
          {gallery.items.map((item, index) => (
            <button
              aria-label={mediaCopy.openGalleryImage(index, item.alt)}
              className="article-gallery-card"
              key={`${item.src}-${index}`}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <img alt={item.alt} className="article-image article-gallery-image" loading="lazy" src={item.src} />
              {item.caption ? <span className="article-gallery-chip">{item.caption}</span> : null}
            </button>
          ))}
        </div>
        {caption ? <figcaption className="article-figcaption article-gallery-caption">{caption}</figcaption> : null}
      </figure>
      <MediaLightbox activeIndex={activeIndex} items={gallery.items} locale={locale} onClose={() => setActiveIndex(null)} onSelect={setActiveIndex} />
    </>
  );
}