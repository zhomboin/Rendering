"use client";

import { useEffect, useMemo, useState } from "react";
import { createGalleryModel, stepGalleryIndex } from "@/lib/article-media";

type MediaItem = {
  src: string;
  alt?: string;
  caption?: string;
};

function MediaLightbox({
  items,
  activeIndex,
  onSelect,
  onClose
}: {
  items: MediaItem[];
  activeIndex: number | null;
  onSelect?: (index: number) => void;
  onClose: () => void;
}) {
  const item = activeIndex === null ? null : items[activeIndex] ?? null;
  const hasNavigation = Boolean(item && items.length > 1 && onSelect);

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
          <div className="article-lightbox-counter">{hasNavigation ? `${resolvedIndex + 1} / ${items.length}` : "Image preview"}</div>
          <button aria-label="Close image preview" className="article-lightbox-close" onClick={onClose} type="button">
            Close
          </button>
        </div>
        <div className="article-lightbox-stage">
          {hasNavigation ? (
            <button
              aria-label="Show previous image"
              className="article-lightbox-nav article-lightbox-nav--prev"
              onClick={() => navigate(-1)}
              type="button"
            >
              <span aria-hidden="true">←</span>
              <span className="article-lightbox-nav-copy">Prev</span>
            </button>
          ) : null}
          <img alt={item.alt} className="article-lightbox-image" src={item.src} />
          {hasNavigation ? (
            <button
              aria-label="Show next image"
              className="article-lightbox-nav article-lightbox-nav--next"
              onClick={() => navigate(1)}
              type="button"
            >
              <span className="article-lightbox-nav-copy">Next</span>
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
  credit
}: {
  src: string;
  alt?: string;
  caption?: string;
  credit?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const item = useMemo(() => createGalleryModel([{ src, alt, caption }]).items[0] ?? null, [alt, caption, src]);

  if (!item) {
    return null;
  }

  return (
    <>
      <figure className="article-figure article-figure--interactive">
        <button
          aria-label={`Open image: ${item.alt}`}
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
      <MediaLightbox activeIndex={isOpen ? 0 : null} items={[item]} onClose={() => setIsOpen(false)} />
    </>
  );
}

export function Gallery({
  items,
  caption,
  title
}: {
  items: MediaItem[];
  caption?: string;
  title?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const gallery = useMemo(() => createGalleryModel(items), [items]);

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
              aria-label={`Open gallery image ${index + 1}: ${item.alt}`}
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
      <MediaLightbox activeIndex={activeIndex} items={gallery.items} onClose={() => setActiveIndex(null)} onSelect={setActiveIndex} />
    </>
  );
}