import type { OneuraPageSlug } from "../../../routes/oneuraPaths";

export type TopicFact = {
  label: string;
  value: string;
};

export type TopicSection = {
  title: string;
  body: string;
  bullets: string[];
};

export type TopicFaq = {
  question: string;
  answer: string;
};

export type RelatedTopic = {
  slug: OneuraPageSlug;
  title: string;
  description: string;
};

export type TopicPageContent = {
  kicker: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  answerTitle: string;
  answer: string;
  facts: TopicFact[];
  sections: TopicSection[];
  faqs: TopicFaq[];
  related: RelatedTopic[];
};
