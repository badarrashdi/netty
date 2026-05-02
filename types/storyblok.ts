// Storyblok Asset Type
export interface StoryblokAsset {
  id: number;
  alt?: string;
  name?: string;
  filename: string;
  fieldtype: string;
}

// Storyblok Link Type
export interface StoryblokLink {
  id?: string;
  url: string;
  linktype: string;
  fieldtype: string;
  cached_url: string;
}

// Card with Icon Component (used in multiple sections)
export interface CardWithIcon {
  _uid: string;
  component: "card_with_icon";
  heading: string;
  description: string;
  icon?: StoryblokAsset;
}

// Hero Section
export interface HeroSection {
  _uid: string;
  component: "hero";
  title: string;
  banner: StoryblokAsset;
}

// About Section
export interface AboutSection {
  _uid: string;
  component: "about";
  heading: string;
  description: string;
  CTA_label: string;
  CTA_link: StoryblokLink;
}

// Mission & Vision Section
export interface MissionVisionSection {
  _uid: string;
  component: "mission_vision";
  heading: string;
  items: CardWithIcon[];
}

// Work Section
export interface WorkSection {
  _uid: string;
  component: "work";
  heading: string;
  work: CardWithIcon[];
}

// Founder Section
export interface FounderSection {
  _uid: string;
  component: "founder";
  heading: string;
  founder_name: string;
  title: string;
  quote: string;
  founder_photo: StoryblokAsset;
}

// Lookbook Section
export interface LookbookSection {
  _uid: string;
  component: "lookbook";
  heading: string;
  cards: CardWithIcon[];
}

// Opportunity Section
export interface OpportunitySection {
  _uid: string;
  component: "opportunity";
  heading: string;
  description: string;
}

// Partner Section
export interface PartnerSection {
  _uid: string;
  component: "partner";
  heading: string;
  description: string;
  image: StoryblokAsset;
  CTA_label: string;
  CTA_link: StoryblokLink;
}

// Roadmap Section
export interface RoadmapPhase {
  _uid: string;
  component: "roadmap_phase";
  phase: string;
  title: string;
  completed: boolean;
}

export interface RoadmapSection {
  _uid: string;
  component: "roadmap";
  heading: string;
  phases: RoadmapPhase[];
}

// Union type for all sections
export type StoryblokSection =
  | HeroSection
  | AboutSection
  | MissionVisionSection
  | WorkSection
  | FounderSection
  | LookbookSection
  | OpportunitySection
  | PartnerSection
  | RoadmapSection;

// Page Content
export interface PageContent {
  _uid: string;
  component: "page";
  body: StoryblokSection[];
}

// Story Type
export interface StoryblokStory {
  name: string;
  content: PageContent;
  slug: string;
  full_slug: string;
  uuid: string;
  id: number;
  published_at: string;
}

// API Response
export interface StoryblokResponse {
  story: StoryblokStory;
  cv?: number;
  rels?: unknown[];
  links?: unknown[];
}
