"use client";

import { useEffect } from "react";

export function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "instant" });
        }
      }, 100);
    }
  }, []);

  return null;
}
