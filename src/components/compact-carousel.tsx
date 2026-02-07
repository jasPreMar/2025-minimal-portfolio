"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface CompactCarouselProps {
  images: string[];
}

function ImagePreview({
  url,
  onClick,
}: {
  url: string;
  onClick: () => void;
}) {
  return (
    <div
      className="carousel-item flex-shrink-0 w-full rounded-3xl overflow-hidden cursor-pointer relative snap-start group aspect-video bg-background image-inner-shadow"
      onClick={onClick}
    >
      <Image
        src={url}
        alt=""
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        unoptimized
      />
    </div>
  );
}

function FullscreenView({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center cursor-pointer"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
        aria-label="Close fullscreen"
      >
        <X size={24} />
      </button>
      <Image
        src={url}
        alt=""
        fill
        className="object-contain p-8"
        unoptimized
      />
    </div>
  );
}

export function CompactCarousel({ images }: CompactCarouselProps) {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeState, setFadeState] = useState({ atLeft: true, atRight: false });

  const updateFadeState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const atLeft = el.scrollLeft <= 1;
    const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    setFadeState((prev) =>
      prev.atLeft === atLeft && prev.atRight === atRight ? prev : { atLeft, atRight }
    );
  }, []);

  useEffect(() => {
    updateFadeState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateFadeState);
    const ro = new ResizeObserver(updateFadeState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateFadeState);
      ro.disconnect();
    };
  }, [updateFadeState, images.length]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={updateFadeState}
          className="flex gap-4 overflow-x-auto overflow-y-visible snap-x snap-mandatory scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {images.map((url, index) => (
            <ImagePreview
              key={`${url}-${index}`}
              url={url}
              onClick={() => setFullscreenImage(url)}
            />
          ))}
        </div>
        {/* Left fade - only when not scrolled to the left */}
        <div
          className="carousel-fade-overlay-left absolute left-0 top-0 bottom-0 w-12 pointer-events-none transition-opacity duration-200"
          style={{ opacity: fadeState.atLeft ? 0 : 1 }}
          aria-hidden
        />
        {/* Right fade - only when not scrolled to the right */}
        <div
          className="carousel-fade-overlay absolute right-0 top-0 bottom-0 w-12 pointer-events-none transition-opacity duration-200"
          style={{ opacity: fadeState.atRight ? 0 : 1 }}
          aria-hidden
        />
      </div>
      {fullscreenImage && (
        <FullscreenView
          url={fullscreenImage}
          onClose={() => setFullscreenImage(null)}
        />
      )}
    </>
  );
}
