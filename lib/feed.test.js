import assert from "node:assert/strict";
import { buildFeedXml } from "./feed.js";

const feedXml = buildFeedXml([
  {
    slug: "mysql-mvcc-explained",
    title: "MySQL MVCC & Locking",
    description: "A clearer walkthrough of snapshots, visibility, and row-level locking.",
    publishedAt: "2026-03-21",
    tags: ["mysql", "database"]
  },
  {
    slug: "redis-sentinel-docker",
    title: "Redis Sentinel <Docker>",
    description: "How to make Sentinel failover feel predictable in local and server environments.",
    publishedAt: "2026-03-20",
    tags: ["redis", "server"]
  }
]);

assert.match(feedXml, /<title>Rendering<\/title>/, "feed should expose the site title");
assert.match(feedXml, /<atom:link href="https:\/\/rendering\.me\/feed\.xml" rel="self" type="application\/rss\+xml"\/>/, "feed should include a self link");
assert.match(feedXml, /<link>https:\/\/rendering\.me\/blog\/mysql-mvcc-explained<\/link>/, "feed items should point at the primary Chinese article URL");
assert.match(feedXml, /Redis Sentinel &lt;Docker&gt;/, "feed should escape XML-sensitive characters inside titles");
assert.match(feedXml, /<category>mysql<\/category>/, "feed items should include categories for tags");

console.log("feed assertions passed");
