export interface ReleaseChange {
  text: string;
}

export interface ReleaseSection {
  label: string;
  emoji: string;
  changes: ReleaseChange[];
}

export interface Release {
  version: string;
  date: string;
  tag: "Latest" | "Major" | "Minor" | "Patch";
  summary: string;
  sections: ReleaseSection[];
}

export const releases: Release[] = [
  {
    version: "2.5.2",
    date: "2026-02-18",
    tag: "Latest",
    summary:
      "Stability improvements, biometric UX polish, better session handling, and enhanced offline support.",
    sections: [
      {
        label: "Improvements",
        emoji: "⚡",
        changes: [
          { text: "Smoother biometric authentication flow on supported devices" },
          { text: "Faster app launch time with optimized splash screen" },
          { text: "Improved session persistence — stay logged in longer" },
          { text: "Better offline data sync when reconnecting to the internet" },
        ],
      },
      {
        label: "Bug Fixes",
        emoji: "🐞",
        changes: [
          { text: "Fixed occasional crash when resuming the app from background" },
          { text: "Resolved update flow getting stuck on certain Android versions" },
          { text: "Fixed date picker not respecting device locale settings" },
        ],
      },
      {
        label: "Security",
        emoji: "🔐",
        changes: [
          { text: "Upgraded encryption library for local data storage" },
        ],
      },
    ],
  },
  {
    version: "2.5.0",
    date: "2026-01-28",
    tag: "Major",
    summary:
      "Encrypted cloud backup, redesigned analytics dashboard, refreshed UI, and major offline-first enhancements.",
    sections: [
      {
        label: "New Features",
        emoji: "✨",
        changes: [
          { text: "Encrypted cloud backup — securely sync your data across devices" },
          { text: "Redesigned analytics dashboard with monthly trends and category breakdown" },
          { text: "New quick-add widget for instant transaction logging from home screen" },
        ],
      },
      {
        label: "Improvements",
        emoji: "⚡",
        changes: [
          { text: "Refreshed UI with improved typography and color contrast" },
          { text: "Faster chart rendering for large transaction histories" },
          { text: "Enhanced offline-first architecture — full functionality without internet" },
        ],
      },
      {
        label: "Bug Fixes",
        emoji: "🐞",
        changes: [
          { text: "Fixed category totals not updating after editing a transaction" },
          { text: "Resolved CSV export including duplicate entries in some cases" },
        ],
      },
    ],
  },
];
