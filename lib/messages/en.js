export const enMessages = {
  locale: {
    code: "en",
    label: "English",
    htmlLang: "en",
    ogLocale: "en_US"
  },
  site: {
    name: "Rendering",
    brandMark: "Playful Personal Blog",
    authorName: "Rendering Author",
    description: "A playful personal blog about frontend systems, reading experience, motion, and design engineering."
  },
  navigation: {
    home: "Home",
    blog: "Blog",
    tags: "Tags",
    about: "About"
  },
  footer: {
    copy: "Playful mode is live. Bright on the outside, calm for reading inside.",
    about: "About",
    tags: "Tags"
  },
  language: {
    label: "Language",
    zh: "中文",
    en: "English"
  },
  theme: {
    kicker: "Theme",
    light: "Light",
    dark: "Dark",
    toggleToLight: "Switch to light theme",
    toggleToDark: "Switch to dark theme"
  },
  search: {
    trigger: "Search",
    sectionKicker: "Search Playground",
    title: "Looking for a note? Open search in one tap.",
    copy: "The entry can stay playful while the actual search stays powered by Pagefind. The homepage invites exploration; the results help you arrive fast.",
    placeholderButton: "Try searching “motion”, “reading”, or “frontend”",
    openBlogIndex: "Open Blog Index",
    globalKicker: "Global Search",
    modalTitle: "Search the playful archive",
    modalClose: "Close",
    inputLabel: "Search the blog archive",
    inputPlaceholder: "Search by topic, mood, or phrase",
    emptyPrompt: "Type a keyword and see which note rises to the top first.",
    loading: "Searching the Pagefind index...",
    noResults: "No matching article turned up this time. Try another phrase.",
    shortcuts: {
      focus: "/ focus",
      move: "↑ ↓ move",
      open: "Enter open"
    },
    pills: {
      pagefind: "Pagefind",
      archive: "MDX Archive"
    }
  },
  common: {
    topic: "Topic",
    spotlight: "Spotlight",
    representativeRead: "Representative read",
    representativePost: "Representative post",
    openArchive: "Open Archive",
    openTagArchive: "Open Tag Archive",
    openTagMap: "Open Tag Map",
    readLeadArticle: "Read Lead Article",
    readArchive: "Read Archive",
    readArticle: "Read Article",
    readNote: "Read Note",
    clearFilter: "Clear Filter",
    backToTagMap: "Back to Tag Map",
    browseFullArchive: "Browse Full Archive",
    exploreMoreTags: "Explore More Tags",
    openFilteredBlogView: "Open Filtered Blog View",
    moreComing: "More writing is coming soon.",
    singleArticleCluster: "Single Article Cluster"
  },
  home: {
    metadataTitle: "Home",
    metadataDescription: "A playful personal blog homepage for frontend systems, reading experience, motion, and design notes.",
    hero: {
      kicker: "Playful Personal Blog",
      title: "A technical blog shaped like a box of clay and a reading desk you actually want to stay at.",
      copy: "Rendering now feels more like a personal space with a point of view. High-saturation color brings you in; quieter typography and reading progress keep long-form writing comfortable once you are here.",
      badges: ["Claymorphism cards", "Light theme by default", "Switchable dark mode", "Real reading progress"],
      primaryAction: "Read the Blog",
      secondaryAction: "Meet the Author"
    },
    featured: {
      kicker: "Featured Stories",
      title: "Let the clay cards pull you in first, then let the reading experience hold steady.",
      copy: "The homepage no longer pretends to be a cold terminal. It is closer to a personal blog living room that glows a little and keeps inviting you deeper."
    },
    latest: {
      kicker: "Latest Notes",
      title: "Recent sparks, methods, and longer reflections",
      copy: "Keep the lightness a personal blog needs, make the cards livelier, keep the density restrained, and let titles plus excerpts scan cleanly at a glance."
    },
    tags: {
      kicker: "Tag Candy Jar",
      title: "Tags are colorful sweets, but also reading entrances",
      copy: "Tags are not backend leftovers. They are one of the first clues readers use to understand what you write and where they can go next.",
      cardCountSuffix: "articles are waiting inside this theme."
    },
    metrics: {
      articles: { label: "Articles", detail: "public pieces in the current archive" },
      tags: { label: "Tags", detail: "colorful routes into your writing themes" },
      themes: { label: "Themes", detail: "light by default, dark when you want it", value: "02" },
      progress: { label: "Progress", detail: "real reading progress on article pages", value: "Live" }
    }
  },
  about: {
    metadataTitle: "About",
    metadataDescription: "About Rendering: a playful personal blog about frontend systems, design clarity, reading experience, and technical craft.",
    heroKicker: "About the Blog",
    title: "A personal blog that takes both technical craft and personality seriously",
    intro: "Rendering is currently positioned as a personal blog rather than a CMS presentation layer. It can stay light, playful, and readable now, then slowly grow admin and login capabilities later.",
    profileKicker: "Author Profile",
    profileTitle: "Playfulness and rigor do not have to cancel each other out",
    profileParagraphs: [
      "The goal of this frontend direction is not to turn the blog into a toy. It is to make it feel like a real person is writing, sorting, and sharing here, rather than a template directory generated itself.",
      "That is why the outer shell can become brighter, rounder, and more memorable, while the reading area becomes calmer so mixed media, longer paragraphs, and technical writing can land safely."
    ],
    principlesKicker: "Working Principles",
    principles: ["Playful homepage and card shells", "Calm, stable, readable article body", "Real theme switching and reading-progress feedback", "Room for a future CMS phase"],
    nextKicker: "Next Stops",
    nextPrimary: "Read Archive",
    nextSecondary: "Explore Tags"
  },
  article: {
    storyCapsule: "Story Capsule",
    publishedPrefix: "Published",
    previous: "Previous",
    next: "Next",
    previousEmpty: "Start of the current visible archive.",
    nextEmpty: "Latest node reached.",
    tocKicker: "Story Map",
    tocTitle: "On this page",
    tocEmpty: "This article unfolds in one continuous section."
  },
  blogArchive: {
    metadataTitle: "Blog",
    metadataDescription: "Browse the Rendering archive of playful technical essays on frontend systems, motion, reading UX, and design engineering.",
    heroKicker: "Archive Playground",
    heroTitle: "Move through the archive with a little more direction.",
    heroCopy: "Featured essays still lead the way, but the archive now has a real tag shelf too. You can browse broadly, narrow the stack to one signal, or jump straight into a dedicated tag archive when you want a cleaner entry point.",
    guideKicker: "Archive Guide",
    guideTitle: "Start broad, then tighten the archive around one theme.",
    guideCopy: "The rail now works like a browsing toolbelt. Keep the full archive visible when you want serendipity, or use a tag filter to pull one topic into focus without losing the layered card rhythm.",
    filterKicker: "Filter Shelf",
    filterTitle: "Shape the archive around one tag.",
    filterCopy: "Quick filters are for when you already know the thread you want to follow. The dedicated tag page stays richer and more shareable, but this view keeps the archive nimble.",
    allEssays: "All essays",
    filterMissing: "This tag is not public yet, so the full archive is shown instead.",
    quickSignalsKicker: "Quick Signals",
    quickSignalsTitle: "Jump straight into a full tag archive.",
    filteredSummaryKicker: "Filter On",
    filteredSummaryCopy: "This filtered archive keeps only the essays filed under the active tag. If you want the cleaner, shareable version of the same cluster, open the dedicated tag archive next.",
    featuredKicker: "Featured Now",
    filteredFeaturedKicker: "Filtered Spotlight",
    featuredTitle: "Start with the two essays carrying the most visual and editorial weight.",
    filteredFeaturedTitle: "Start with the lead story inside this theme.",
    featuredCopy: "The archive still opens with a pair of heavier cards so the first decision feels easy, then relaxes into a lighter stack for quicker scanning.",
    filteredFeaturedCopy: "A filtered view trims the archive to one clear thread. The first card does the heavy lifting, then the remaining notes keep the story moving.",
    stackKicker: "Archive Stack",
    stackTitle: "Continue through the lighter archive stack.",
    filteredStackTitle: "Keep going through the rest of this tag.",
    stackCopy: "This layer keeps enough context for confident decisions while letting the archive feel breezier and more browseable.",
    filteredStackCopy: "The cards below are still part of the same theme, just tuned for faster scanning once the lead story has done its job.",
    visibleEssays: "visible essays",
    publicEssays: "public essays",
    topicTags: "topic tags"
  },
  tags: {
    metadataTitle: "Tags",
    metadataDescription: "Browse Rendering by topic clusters, tag counts, and colorful entry points into the current blog archive.",
    heroKicker: "Tag Candy Jar",
    heroTitle: "Browse the archive through topic clusters.",
    heroCopy: "The tag map is no longer just a count board. Every theme now opens into its own archive page, so you can share, revisit, and explore a topic without losing the playful shape of the blog.",
    groupsKicker: "Signal Groups",
    groupsTitle: "Start from the topic that feels most alive, then open its full archive.",
    groupsCopy: "Representative essays still help you get the vibe of a tag quickly, but the primary action now takes you into a dedicated tag archive built for deeper browsing.",
    spotlightCopy: "The loudest topic gets the roomiest card so the page still has a clear place to begin. It acts like a front door into a stronger, shareable archive for that theme."
  },
  tagArchive: {
    metadataSuffix: "tag archive",
    heroKicker: "Tag Archive",
    heroCopy: "This archive cluster gathers the public articles around one theme into a clean entry point that is easier to share, bookmark, and revisit.",
    snapshotKicker: "Tag Snapshot",
    snapshotTitle: "A tighter cluster of articles with one clear starting point.",
    snapshotCopy: "Dedicated tag pages are for deeper browsing. They keep the archive playful, but make one theme feel more coherent, easier to share, and easier to revisit later.",
    articlesInTag: "articles in this tag",
    leadReadingTime: "lead reading time",
    leadArticle: "Lead article",
    nearbyKicker: "Nearby Tags",
    nearbyTitle: "Keep moving through adjacent topics.",
    spotlightKicker: "Tag Spotlight",
    spotlightTitlePrefix: "Begin with the story that opens up",
    spotlightCopy: "The first card acts like a strong editorial doorway. After that, the rest of the stack keeps the same theme going without losing reading rhythm.",
    moreKicker: "More In This Tag",
    moreTitle: "Continue through the rest of the cluster.",
    moreCopy: "Once the lead story gives you the shape of the topic, the remaining cards keep the same thread readable in a lighter, faster rhythm.",
    singleTitle: "This tag currently resolves to one published article.",
    singleCopy: "That can still be a useful bookmark. You can keep this archive URL as the canonical entry point for the topic and return when more writing lands."
  }
};