"use client";

import { useState, useRef } from "react";
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
      className="carousel-item flex-shrink-0 w-full rounded-xl overflow-hidden cursor-pointer relative snap-start group aspect-video bg-gray-100 dark:bg-gray-800"
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

  if (images.length === 0) return null;

  return (
    <>
      <div
        ref={scrollRef}
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
      {fullscreenImage && (
        <FullscreenView
          url={fullscreenImage}
          onClose={() => setFullscreenImage(null)}
        />
      )}
    </>
  );
}
