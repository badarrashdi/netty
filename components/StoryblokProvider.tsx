"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import { useEffect } from "react";

// Initialize Storyblok
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "",
  },
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Load Storyblok Bridge for Visual Editor
    const script = document.createElement("script");
    script.src = "//app.storyblok.com/f/storyblok-v2-latest.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize the Storyblok Bridge
      if (typeof window !== "undefined" && (window as any).storyblok) {
        const { StoryblokBridge } = (window as any).storyblok;
        const storyblokInstance = new StoryblokBridge({
          resolveRelations: [],
        });

        storyblokInstance.on(["input", "published", "change"], () => {
          // Reload the page when content changes in the Visual Editor
          window.location.reload();
        });
      }
    };

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return <>{children}</>;
}
