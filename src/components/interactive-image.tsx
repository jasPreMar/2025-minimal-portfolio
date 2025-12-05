"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface InteractiveImageProps {
  src: string;
  alt: string;
  aspectRatio?: "video" | "auto";
  className?: string;
  priority?: boolean;
}

function FullscreenView({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
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
        src={src}
        alt={alt}
        fill
        className="object-contain p-8"
        unoptimized
      />
    </div>
  );
}

export function InteractiveImage({
  src,
  alt,
  aspectRatio = "video",
  className = "",
  priority = false,
}: InteractiveImageProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const aspectClass = aspectRatio === "video" ? "aspect-video" : "";

  return (
    <>
      <div
        className={`relative w-full ${aspectClass} rounded-xl overflow-hidden bg-foreground/5 cursor-pointer group ${className}`}
        onClick={() => setIsFullscreen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-150 ease-out group-hover:scale-105"
          unoptimized
          priority={priority}
        />
      </div>
      {isFullscreen && (
        <FullscreenView
          src={src}
          alt={alt}
          onClose={() => setIsFullscreen(false)}
        />
      )}
    </>
  );
}

