import assert from "node:assert/strict";
import { createGalleryModel, stepGalleryIndex } from "./article-media.js";

const twoUpGallery = createGalleryModel([
  { src: "/images/blog/performance-rhythm-1.svg", alt: "Signal flow sketch", caption: "Signals first." },
  { src: "/images/blog/performance-rhythm-2.svg", caption: "Cadence second." },
  { alt: "Missing source should be ignored" }
]);

assert.equal(twoUpGallery.layout, "gallery--two", "two valid items should render as a two-up gallery");
assert.deepEqual(
  twoUpGallery.items,
  [
    {
      src: "/images/blog/performance-rhythm-1.svg",
      alt: "Signal flow sketch",
      caption: "Signals first."
    },
    {
      src: "/images/blog/performance-rhythm-2.svg",
      alt: "Gallery image 2",
      caption: "Cadence second."
    }
  ],
  "gallery items should normalize alt text, captions, and drop invalid entries"
);

const threeUpGallery = createGalleryModel([
  { src: "/images/blog/performance-rhythm-1.svg" },
  { src: "/images/blog/performance-rhythm-2.svg" },
  { src: "/images/blog/performance-rhythm-3.svg" }
]);

assert.equal(threeUpGallery.layout, "gallery--three", "three items should render as a three-up gallery");
assert.equal(threeUpGallery.items[2].alt, "Gallery image 3", "fallback alt text should use the normalized index");

const singleFigure = createGalleryModel([{ src: "/images/blog/performance-rhythm-hero.svg", alt: "Hero figure" }]);
assert.equal(singleFigure.layout, "gallery--single", "one item should stay in single-column mode");

assert.equal(stepGalleryIndex(0, 1, 3), 1, "next should move forward by one slot");
assert.equal(stepGalleryIndex(2, 1, 3), 0, "next should wrap from the last image to the first");
assert.equal(stepGalleryIndex(0, -1, 3), 2, "previous should wrap from the first image to the last");
assert.equal(stepGalleryIndex(6, -2, 4), 0, "navigation should normalize an out-of-range current index before stepping");
assert.equal(stepGalleryIndex(0, 1, 0), null, "empty galleries should not produce a navigation index");

console.log("article media assertions passed");