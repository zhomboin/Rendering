import assert from "node:assert/strict";
import { buildTagFilterLinks, resolveTagFilter } from "./tag-discovery.js";

const tags = [
  { name: "design", slug: "design", count: 2 },
  { name: "ux", slug: "ux", count: 1 },
  { name: "rendering", slug: "rendering", count: 3 }
];

const activeFilter = resolveTagFilter("DESIGN", tags);
assert.equal(activeFilter.activeTag?.slug, "design", "tag filters should be case-insensitive");
assert.equal(activeFilter.hasRequestedTag, true, "tag filters should remember that a request was made");

const arrayFilter = resolveTagFilter(["ux", "design"], tags);
assert.equal(arrayFilter.activeTag?.slug, "ux", "tag filters should use the first tag when multiple values are provided");

const missingFilter = resolveTagFilter("missing-tag", tags);
assert.equal(missingFilter.activeTag, null, "unknown tag filters should resolve to null");
assert.equal(missingFilter.requestedSlug, "missing-tag", "unknown tag filters should keep the requested slug");

const filterLinks = buildTagFilterLinks(tags, "ux");
assert.equal(filterLinks[0].href, "/blog?tag=design", "tag filter links should point at the blog archive query route");
assert.equal(filterLinks[1].isActive, true, "the active tag chip should be marked in the generated model");
assert.equal(filterLinks[2].isActive, false, "inactive tag chips should stay inactive");

console.log("tag discovery assertions passed");