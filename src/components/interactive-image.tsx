"use client";

import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface InteractiveImageProps {
  src: string;
  alt: string;
  aspectRatio?: "video" | "auto" | "square" | "2/1" | "intrinsic";
  className?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
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
  // Lock body scroll when fullscreen is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-muted"
    >
      {/* Header */}
      <div
        className="flex items-center px-4 flex-shrink-0"
        style={{ height: "56px" }}
      >
        <button
          onClick={onClose}
          className="p-2 -ml-2 transition-colors cursor-pointer text-foreground"
          aria-label="Close fullscreen"
        >
          <ChevronLeft size={28} />
        </button>
      </div>

      {/* Image container */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{
          position: "relative",
          top: "14px",
          maxHeight: "calc(100% - 70px)",
        }}
      >
        <div
          className="w-full h-full relative cursor-zoom-out"
          onClick={onClose}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="transition-none"
            style={{
              objectFit: "contain",
              objectPosition: "center",
            }}
            unoptimized
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

export function InteractiveImage({
  src,
  alt,
  aspectRatio = "video",
  className = "",
  priority = false,
  objectFit = "cover",
}: InteractiveImageProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aspectClass = 
    aspectRatio === "video" ? "aspect-video" : 
    aspectRatio === "square" ? "aspect-square" : 
    aspectRatio === "2/1" ? "aspect-[2/1]" :
    "";
  const objectFitClass = objectFit === "contain" ? "object-contain" : "object-cover";

  // Intrinsic mode: image determines its own height based on natural aspect ratio
  if (aspectRatio === "intrinsic") {
    // For contain mode, use a container that shows background around the image
    if (objectFit === "contain") {
      return (
        <>
          <div
            className={`relative w-full rounded-3xl overflow-hidden bg-muted cursor-zoom-in group ${className}`}
            style={{ boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.05)" }}
            onClick={() => setIsFullscreen(true)}
          >
            <div className="relative w-full flex items-center justify-center py-8 px-4">
              <div className="relative max-w-full max-h-[600px] w-full flex items-center justify-center">
                <Image
                  src={src}
                  alt={alt}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className={`max-w-full max-h-full w-auto h-auto transition-transform duration-500 ease-out group-hover:scale-[1.02] ${isLoading ? "opacity-0" : "opacity-100"}`}
                  unoptimized
                  priority={priority}
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            </div>
            {isLoading && (
              <Skeleton className="absolute inset-0 w-full h-full rounded-3xl" />
            )}
            {/* Border overlay - stays above scaled image */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none z-10 image-inner-shadow" />
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
    
    // Default intrinsic behavior
    return (
      <>
        <div
          className={`relative w-full rounded-3xl overflow-hidden bg-muted cursor-zoom-in group ${className}`}
          style={{ boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.05)" }}
          onClick={() => setIsFullscreen(true)}
        >
          <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            sizes="100vw"
            className={`w-full h-auto transition-transform duration-500 ease-out group-hover:scale-[1.02] ${isLoading ? "opacity-0" : "opacity-100"}`}
            unoptimized
            priority={priority}
            onLoad={() => setIsLoading(false)}
          />
          {isLoading && (
            <Skeleton className="absolute inset-0 w-full h-full rounded-3xl" />
          )}
          {/* Border overlay - stays above scaled image */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none z-10 image-inner-shadow" />
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

  return (
    <>
        <div
          className={`relative w-full ${aspectClass} rounded-3xl overflow-hidden bg-muted cursor-zoom-in group ${className}`}
          style={{ boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.05)" }}
          onClick={() => setIsFullscreen(true)}
        >
        <Image
          src={src}
          alt={alt}
          fill
          className={`${objectFitClass} transition-transform duration-500 ease-out group-hover:scale-[1.02] ${isLoading ? "opacity-0" : "opacity-100"
            }`}
          unoptimized
          priority={priority}
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-3xl" />
        )}
        {/* Border overlay - stays above scaled image */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none z-10 image-inner-shadow" />
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



