import StoryblokClient from "storyblok-js-client";
import type { StoryblokResponse } from "@/types/storyblok";

const Storyblok = new StoryblokClient({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  cache: {
    clear: "auto",
    type: "memory",
  },
});

export async function getStory(slug: string): Promise<StoryblokResponse | null> {
  try {
    const version =
      process.env.NEXT_PUBLIC_STORYBLOK_VERSION === "published"
        ? "published"
        : "draft";

    const response = await Storyblok.get(`cdn/stories/${slug}`, {
      version,
    });

    return response.data as StoryblokResponse;
  } catch (error) {
    console.error(`Error fetching story "${slug}":`, error);
    return null;
  }
}

export async function getHomepage(): Promise<StoryblokResponse | null> {
  return getStory("home");
}

export { Storyblok };
