function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function getGalleryLayout(count) {
  if (count >= 3) {
    return "gallery--three";
  }

  if (count === 2) {
    return "gallery--two";
  }

  return "gallery--single";
}

function normalizeIndex(value, total) {
  return ((value % total) + total) % total;
}

export function stepGalleryIndex(currentIndex, step, total) {
  if (!Number.isInteger(total) || total <= 0) {
    return null;
  }

  const safeCurrentIndex = Number.isInteger(currentIndex) ? normalizeIndex(currentIndex, total) : 0;
  const safeStep = Number.isInteger(step) ? step : 0;
  return normalizeIndex(safeCurrentIndex + safeStep, total);
}

export function createGalleryModel(items = []) {
  const normalizedItems = items
    .filter((item) => normalizeText(item?.src))
    .map((item, index) => ({
      src: normalizeText(item.src),
      alt: normalizeText(item.alt) || `Gallery image ${index + 1}`,
      caption: normalizeText(item.caption)
    }));

  return {
    layout: getGalleryLayout(normalizedItems.length),
    items: normalizedItems
  };
}