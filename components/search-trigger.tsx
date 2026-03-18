"use client";

export function SearchTrigger() {
  return (
    <button
      className="search-trigger"
      onClick={() => window.dispatchEvent(new Event("rendering:open-search"))}
      type="button"
    >
      Search Index
    </button>
  );
}
