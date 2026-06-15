import type { OneuraPageSlug } from "./oneuraPaths";

export type OneuraGuideCategory = "guide" | "compare";

export type OneuraGuideLink = {
  slug: OneuraPageSlug;
  category: OneuraGuideCategory;
  titleKey: string;
  descKey: string;
};

/** Single source of truth for Oneura topic / comparison landing pages. */
export const ONEURA_GUIDE_LINKS: OneuraGuideLink[] = [
  {
    slug: "sleep-sounds-white-noise",
    category: "guide",
    titleKey: "home.topicSleepSoundsTitle",
    descKey: "home.topicSleepSoundsDesc",
  },
  {
    slug: "sensory-relaxation-app",
    category: "guide",
    titleKey: "home.topicSensoryTitle",
    descKey: "home.topicSensoryDesc",
  },
  {
    slug: "sleep-app-for-busy-minds",
    category: "guide",
    titleKey: "home.topicBusyMindsTitle",
    descKey: "home.topicBusyMindsDesc",
  },
  {
    slug: "neuro-friendly-sleep-app",
    category: "guide",
    titleKey: "home.topicNeuroTitle",
    descKey: "home.topicNeuroDesc",
  },
  {
    slug: "mood-tracking-sleep-app",
    category: "guide",
    titleKey: "home.topicMoodTitle",
    descKey: "home.topicMoodDesc",
  },
  {
    slug: "sleep-sounds-for-focus",
    category: "guide",
    titleKey: "home.topicFocusTitle",
    descKey: "home.topicFocusDesc",
  },
  {
    slug: "best-sleep-app-for-busy-minds",
    category: "guide",
    titleKey: "home.topicBestBusyMindsTitle",
    descKey: "home.topicBestBusyMindsDesc",
  },
  {
    slug: "white-noise-pink-noise-rain-sounds",
    category: "guide",
    titleKey: "home.topicWhiteNoiseTitle",
    descKey: "home.topicWhiteNoiseDesc",
  },
  {
    slug: "sleep-app-adhd-neurodivergent",
    category: "guide",
    titleKey: "home.topicAdhdNeuroTitle",
    descKey: "home.topicAdhdNeuroDesc",
  },
  {
    slug: "best-free-sleep-sounds-app",
    category: "guide",
    titleKey: "home.topicFreeSleepSoundsTitle",
    descKey: "home.topicFreeSleepSoundsDesc",
  },
  {
    slug: "sleep-sounds-sensory-overload",
    category: "guide",
    titleKey: "home.topicSensoryOverloadTitle",
    descKey: "home.topicSensoryOverloadDesc",
  },
  {
    slug: "oneura-vs-calm",
    category: "compare",
    titleKey: "home.compareCalmTitle",
    descKey: "home.compareCalmDesc",
  },
  {
    slug: "oneura-vs-bettersleep",
    category: "compare",
    titleKey: "home.compareBetterSleepTitle",
    descKey: "home.compareBetterSleepDesc",
  },
  {
    slug: "oneura-vs-headspace",
    category: "compare",
    titleKey: "home.compareHeadspaceTitle",
    descKey: "home.compareHeadspaceDesc",
  },
];

export const ONEURA_TOPIC_GUIDE_LINKS = ONEURA_GUIDE_LINKS.filter(
  (link) => link.category === "guide",
);

export const ONEURA_COMPARE_GUIDE_LINKS = ONEURA_GUIDE_LINKS.filter(
  (link) => link.category === "compare",
);
