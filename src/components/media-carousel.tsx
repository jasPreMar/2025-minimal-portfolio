"use client";

import { useState, useRef } from "react";
import { X } from "lucide-react";
import Image from "next/image";

type MediaItem =
  | { type: "figma"; url: string }
  | { type: "image"; url: string }
  | { type: "video"; url: string };

interface MediaCarouselProps {
  items: MediaItem[];
}

function MediaItemPreview({
  item,
  onClick,
}: {
  item: MediaItem;
  onClick: () => void;
}) {
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);

  const height = "h-[340px]"; // Fixed height for all items

  if (item.type === "figma") {
    return (
      <div
        className={`carousel-item flex-shrink-0 ${height} aspect-video rounded-xl overflow-hidden cursor-pointer snap-center`}
        onClick={onClick}
      >
        <iframe
          src={item.url}
          className="w-full h-full border-0 pointer-events-none"
          allow="fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  if (item.type === "image") {
    return (
      <div
        className={`carousel-item flex-shrink-0 ${height} rounded-xl overflow-hidden cursor-pointer relative snap-center`}
        style={{ aspectRatio }}
        onClick={onClick}
      >
        <Image
          src={item.url}
          alt=""
          fill
          className="object-cover"
          unoptimized
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth && img.naturalHeight) {
              setAspectRatio(img.naturalWidth / img.naturalHeight);
            }
          }}
        />
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <div
        className={`carousel-item flex-shrink-0 ${height} rounded-xl overflow-hidden cursor-pointer relative bg-black snap-center`}
        style={{ aspectRatio }}
        onClick={onClick}
      >
        <video
          src={item.url}
          className="w-full h-full object-contain pointer-events-none"
          muted
          loop
          autoPlay
          playsInline
          onLoadedMetadata={(e) => {
            const video = e.currentTarget;
            if (video.videoWidth && video.videoHeight) {
              setAspectRatio(video.videoWidth / video.videoHeight);
            }
          }}
        />
      </div>
    );
  }

  return null;
}

function FullscreenView({
  item,
  onClose,
}: {
  item: MediaItem;
  onClose: () => void;
}) {
  if (item.type === "figma") {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close fullscreen"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 px-4 pb-4">
          <iframe
            src={item.url}
            className="w-full h-full border-0 rounded-lg"
            allow="fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (item.type === "image") {
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
          src={item.url}
          alt=""
          fill
          className="object-contain p-8"
          unoptimized
        />
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <div
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
          aria-label="Close fullscreen"
        >
          <X size={24} />
        </button>
        <video
          src={item.url}
          className="max-w-full max-h-full"
          controls
          autoPlay
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    );
  }

  return null;
}

export function MediaCarousel({ items }: MediaCarouselProps) {
  const [fullscreenItem, setFullscreenItem] = useState<MediaItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  // Single item - no carousel needed
  if (items.length === 1) {
    return (
      <>
        <div className="w-full">
          <MediaItemPreview
            item={items[0]}
            onClick={() => setFullscreenItem(items[0])}
          />
        </div>
        {fullscreenItem && (
          <FullscreenView
            item={fullscreenItem}
            onClose={() => setFullscreenItem(null)}
          />
        )}
      </>
    );
  }

  return (
    <>
      {/* Break out of content container to allow overflow to be visible */}
      <div 
        className="relative w-screen overflow-visible"
        style={{ marginLeft: "calc(-50vw + 50%)" }}
      >
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto overflow-y-visible snap-x snap-mandatory scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Spacer at the beginning to align first item with content */}
          <div 
            className="flex-shrink-0" 
            style={{ width: "max(32px, calc(50vw - 304px))" }} 
            aria-hidden="true" 
          />
          
          {items.map((item, index) => (
            <MediaItemPreview
              key={`${item.type}-${item.url}-${index}`}
              item={item}
              onClick={() => setFullscreenItem(item)}
            />
          ))}
          
          {/* Spacer at the end */}
          <div className="flex-shrink-0 w-8" aria-hidden="true" />
        </div>
      </div>
      {fullscreenItem && (
        <FullscreenView
          item={fullscreenItem}
          onClose={() => setFullscreenItem(null)}
        />
      )}
    </>
  );
}

