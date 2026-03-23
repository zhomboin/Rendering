/**
 * @typedef {{ slug?: string, title: string, publishedAt: string, tags: string[] }} PostSummary
 * @typedef {{ name: string, slug: string, count: number }} TagSummary
 */

import { normalizeLocale } from "./i18n.js";

/** @param {PostSummary[]=} posts */
function normalizePosts(posts = []) {
  return Array.isArray(posts) ? posts.filter(Boolean) : [];
}

/** @param {TagSummary[]=} tags */
function normalizeTags(tags = []) {
  return Array.isArray(tags) ? tags.filter(Boolean) : [];
}

/** @param {string} locale @param {string[]} names */
function formatTagList(locale, names) {
  const normalizedNames = (Array.isArray(names) ? names : []).filter(Boolean);

  if (normalizedNames.length === 0) {
    return "";
  }

  if (normalizedNames.length === 1) {
    return normalizedNames[0];
  }

  if (normalizeLocale(locale) === "zh") {
    return normalizedNames.join("、");
  }

  if (normalizedNames.length === 2) {
    return `${normalizedNames[0]} and ${normalizedNames[1]}`;
  }

  return `${normalizedNames.slice(0, -1).join(", ")}, and ${normalizedNames[normalizedNames.length - 1]}`;
}

/** @param {number} value @param {string} singular @param {string} [plural] */
function pluralize(value, singular, plural = `${singular}s`) {
  return `${value} ${value === 1 ? singular : plural}`;
}

/** @param {TagSummary[]=} tags @param {number} [limit] */
function getRepresentativeTags(tags = [], limit = 3) {
  return normalizeTags(tags)
    .slice(0, limit)
    .map((tag) => tag.name)
    .filter(Boolean);
}

/** @param {string} locale @param {PostSummary[]=} posts @param {TagSummary[]=} tags */
export function buildHomePageCopy(locale, posts = [], tags = []) {
  const normalizedLocale = normalizeLocale(locale);
  const normalizedPosts = normalizePosts(posts);
  const normalizedTags = normalizeTags(tags);
  const totalPosts = normalizedPosts.length;
  const totalTags = normalizedTags.length;
  const latestPost = normalizedPosts[0] ?? null;
  const latestDate = latestPost?.publishedAt ?? "";
  const representativeTags = getRepresentativeTags(normalizedTags);
  const representativeTagList = formatTagList(normalizedLocale, representativeTags);

  if (totalPosts === 0) {
    return {
      hero: {
        copy:
          normalizedLocale === "zh"
            ? "公开归档还在准备中，等第一篇文章发布后，这里会自动显示真实的数量、时间和主题。"
            : "The public archive is still warming up. Once the first post is published, this page will automatically reflect the real counts, latest update, and active topics.",
        badges:
          normalizedLocale === "zh"
            ? ["0 篇公开文章", "0 个主题标签", "等待首次发布"]
            : ["0 published posts", "0 topic tags", "Waiting for launch"]
      },
      featured: {
        title: normalizedLocale === "zh" ? "等第一篇文章发布后，这里会自动出现精选内容" : "Featured stories will appear here after the first post goes live",
        copy: normalizedLocale === "zh" ? "当前还没有公开文章。" : "There are no published posts yet."
      },
      latest: {
        title: normalizedLocale === "zh" ? "最近更新会在这里展开" : "Recent updates will appear here",
        copy: normalizedLocale === "zh" ? "发布后会按时间倒序自动刷新。" : "Once posts are published, this section will refresh in reverse chronological order."
      },
      tags: {
        title: normalizedLocale === "zh" ? "主题入口会随着内容一起生成" : "Topic entry points will appear with the content",
        copy: normalizedLocale === "zh" ? "发布后这里会根据真实标签自动生成。" : "This area will be generated automatically from real published tags.",
        cardCountSuffix: normalizedLocale === "zh" ? "篇文章正在这个主题里等你点开。" : "articles are waiting inside this theme."
      }
    };
  }

  return {
    hero: {
      copy:
        normalizedLocale === "zh"
          ? `当前公开归档已经收录 ${totalPosts} 篇文章，最近更新于 ${latestDate}${representativeTagList ? `，主题覆盖 ${representativeTagList}。` : "。"}`
          : `The public archive currently includes ${totalPosts} published posts, was most recently updated on ${latestDate}${representativeTagList ? `, and currently spans ${representativeTagList}.` : "."}`,
      badges:
        normalizedLocale === "zh"
          ? [`${totalPosts} 篇公开文章`, `${totalTags} 个主题标签`, `最近更新 ${latestDate}`]
          : [`${totalPosts} published posts`, `${totalTags} topic tags`, `Updated ${latestDate}`]
    },
    featured: {
      title: normalizedLocale === "zh" ? `先从最新发布的 ${Math.min(2, totalPosts)} 篇文章开始` : `Start with the newest ${pluralize(Math.min(2, totalPosts), "published post")}`,
      copy:
        normalizedLocale === "zh"
          ? `当前最前面的文章是《${latestPost.title}》，发布于 ${latestDate}。`
          : `The current lead post is ${latestPost.title}, published on ${latestDate}.`
    },
    latest: {
      title:
        normalizedLocale === "zh"
          ? `继续浏览最近更新的 ${Math.min(3, totalPosts)} 篇文章`
          : `Continue through the newest ${pluralize(Math.min(3, totalPosts), "post")}`,
      copy: normalizedLocale === "zh" ? "这一组会按发布时间倒序展开。" : "This stack stays in reverse chronological order."
    },
    tags: {
      title:
        normalizedLocale === "zh"
          ? `从 ${totalTags} 个主题切入当前 ${totalPosts} 篇公开文章`
          : `Use ${totalTags} topic tags to enter the current ${pluralize(totalPosts, "published post")}`,
      copy:
        representativeTagList
          ? normalizedLocale === "zh"
            ? `目前最活跃的主题包括 ${representativeTagList}。`
            : `The most active themes right now include ${representativeTagList}.`
          : normalizedLocale === "zh"
            ? "这些入口会根据真实标签自动更新。"
            : "These entry points update automatically from the real published tags.",
      cardCountSuffix: normalizedLocale === "zh" ? "篇文章正在这个主题里等你点开。" : "articles are waiting inside this theme."
    }
  };
}

/** @param {string} locale @param {{ allPosts?: PostSummary[], visiblePosts?: PostSummary[], tags?: TagSummary[], activeTag?: TagSummary | null, featuredCount?: number, archiveCount?: number }} [options] */
export function buildBlogArchiveCopy(
  locale,
  { allPosts = [], visiblePosts = [], tags = [], activeTag = null, featuredCount = 0, archiveCount = 0 } = {}
) {
  const normalizedLocale = normalizeLocale(locale);
  const normalizedAllPosts = normalizePosts(allPosts);
  const normalizedVisiblePosts = normalizePosts(visiblePosts);
  const normalizedTags = normalizeTags(tags);
  const latestVisiblePost = normalizedVisiblePosts[0] ?? null;
  const latestVisibleDate = latestVisiblePost?.publishedAt ?? "";
  const representativeTags = getRepresentativeTags(normalizedTags);
  const representativeTagList = formatTagList(normalizedLocale, representativeTags);

  if (normalizedAllPosts.length === 0) {
    return {
      hero: {
        title: normalizedLocale === "zh" ? "公开归档还在准备中" : "The public archive is still warming up",
        copy:
          normalizedLocale === "zh"
            ? "发布第一篇文章后，这里会自动显示真实的文章数量、更新时间和主题筛选。"
            : "Once the first post is published, this page will automatically reflect the real archive size, latest update, and usable topics."
      },
      guide: {
        title: normalizedLocale === "zh" ? "内容发布后，这里会自动生成浏览说明" : "Archive guidance will appear once content is published",
        copy: normalizedLocale === "zh" ? "当前还没有公开文章。" : "There are no published posts yet."
      },
      filter: {
        title: normalizedLocale === "zh" ? "筛选项会跟随真实标签生成" : "Filter chips will appear from real tags",
        copy: normalizedLocale === "zh" ? "发布后无需手动维护这些筛选项。" : "These filters will not require manual maintenance once posts exist."
      },
      filteredSummary: {
        copy: ""
      },
      featured: {
        title: normalizedLocale === "zh" ? "精选内容会在发布后自动出现" : "Featured content will appear automatically",
        copy: normalizedLocale === "zh" ? "当前还没有公开文章。" : "There are no published posts yet."
      },
      stack: {
        title: normalizedLocale === "zh" ? "归档堆栈会在发布后自动展开" : "The archive stack will appear automatically",
        copy: normalizedLocale === "zh" ? "当前还没有可继续浏览的内容。" : "There is no additional archive content yet."
      }
    };
  }

  if (activeTag) {
    return {
      hero: {
        title:
          normalizedLocale === "zh"
            ? `当前正在查看 ${activeTag.name} 主题下的 ${normalizedVisiblePosts.length} 篇公开文章`
            : `Viewing ${normalizedVisiblePosts.length} published posts filed under ${activeTag.slug}`,
        copy:
          normalizedLocale === "zh"
            ? `这个筛选里最新的文章是《${latestVisiblePost.title}》（${latestVisibleDate}）。`
            : `The newest post in this filter is ${latestVisiblePost.title} (${latestVisibleDate}).`
      },
      guide: {
        title: normalizedLocale === "zh" ? "先从最新文章开始，再沿着同一主题继续浏览" : "Start with the newest post, then stay inside the same theme",
        copy:
          normalizedLocale === "zh"
            ? "这个筛选视图会把归档收束到一条更具体的主题线索上。"
            : "This filtered view narrows the archive to one concrete thread."
      },
      filter: {
        title: normalizedLocale === "zh" ? "筛选项来自已发布文章的真实标签" : "Filter chips reflect the tags used by published posts",
        copy:
          normalizedLocale === "zh"
            ? `当前公共归档里一共有 ${normalizedTags.length} 个可用主题标签。`
            : `There are currently ${normalizedTags.length} usable topic tags in the public archive.`
      },
      filteredSummary: {
        copy:
          normalizedLocale === "zh"
            ? `${activeTag.name} 主题下当前共有 ${normalizedVisiblePosts.length} 篇公开文章。`
            : `There are ${normalizedVisiblePosts.length} published posts in ${activeTag.slug} right now.`
      },
      featured: {
        title:
          normalizedLocale === "zh"
            ? `先从 ${activeTag.name} 主题里最新的一篇开始`
            : `Start with the newest post in ${activeTag.slug}`,
        copy:
          normalizedLocale === "zh"
            ? "这张主卡会在同主题出现更新文章时自动刷新。"
            : `This lead card will update automatically when a newer ${activeTag.slug} post is published.`
      },
      stack: {
        title:
          normalizedLocale === "zh"
            ? `继续阅读其余 ${archiveCount} 篇文章`
            : `Continue with the remaining ${pluralize(archiveCount, "post")}`,
        copy: normalizedLocale === "zh" ? "剩余的卡片会继续停留在同一主题里。" : "The rest of the stack stays inside the same theme."
      }
    };
  }

  return {
    hero: {
      title:
        normalizedLocale === "zh"
          ? `当前共 ${normalizedAllPosts.length} 篇公开文章，可按 ${normalizedTags.length} 个主题筛选`
          : `There are currently ${normalizedAllPosts.length} published posts across ${normalizedTags.length} topic tags`,
      copy:
        normalizedLocale === "zh"
          ? `最近更新是《${latestVisiblePost.title}》（${latestVisibleDate}），也可以直接按主题缩小范围。`
          : `The latest update is ${latestVisiblePost.title} (${latestVisibleDate}), and you can also narrow the archive by topic.`
    },
    guide: {
      title: normalizedLocale === "zh" ? "先从最新文章开始，再按主题继续下钻" : "Start with the newest posts, then narrow by topic",
      copy:
        normalizedLocale === "zh"
          ? "当前归档会按发布时间倒序展开，最新内容会自动浮到最前面。"
          : "The archive stays in reverse chronological order, so the newest writing rises to the front automatically."
    },
    filter: {
      title: normalizedLocale === "zh" ? "筛选项来自已发布文章的真实标签" : "Filter chips come from the real tags used by published posts",
      copy:
        representativeTagList
          ? normalizedLocale === "zh"
            ? `目前可用的主题包括 ${representativeTagList}。`
            : `The available themes right now include ${representativeTagList}.`
          : normalizedLocale === "zh"
            ? "当前还没有可用的主题标签。"
            : "There are no usable topic tags yet."
    },
    filteredSummary: {
      copy: ""
    },
    featured: {
      title:
        normalizedLocale === "zh"
          ? `先看最新的 ${featuredCount} 篇重点文章`
          : `Start with the newest ${pluralize(featuredCount, "featured post")}`,
      copy:
        normalizedLocale === "zh"
          ? "这组内容会随着新的公开文章自动更新。"
          : "This set updates automatically as newer published posts arrive."
    },
    stack: {
      title:
        normalizedLocale === "zh"
          ? `继续阅读其余 ${archiveCount} 篇文章`
          : `Continue with the remaining ${pluralize(archiveCount, "post")}`,
      copy:
        normalizedLocale === "zh"
          ? "如果你想按时间继续浏览，可以直接从这里往下读。"
          : "If you want to keep browsing chronologically, continue from here."
    }
  };
}