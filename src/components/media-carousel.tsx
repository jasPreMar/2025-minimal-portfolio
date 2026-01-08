"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft } from "lucide-react";
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
        className={`carousel-item flex-shrink-0 ${height} aspect-video rounded-3xl overflow-hidden cursor-pointer snap-center bg-muted image-inner-shadow`}
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
        className={`carousel-item flex-shrink-0 ${height} rounded-3xl overflow-hidden cursor-pointer relative snap-center bg-muted image-inner-shadow`}
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
        className={`carousel-item flex-shrink-0 ${height} rounded-3xl overflow-hidden cursor-pointer relative bg-black snap-center image-inner-shadow`}
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

// Fullscreen image component with zoom/pan functionality
function FullscreenImage({
  url,
  isZoomed,
  onToggleZoom,
}: {
  url: string;
  isZoomed: boolean;
  onToggleZoom: () => void;
}) {
  const [panPosition, setPanPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; panX: number; panY: number } | null>(null);

  // Reset pan position when zoom state changes
  useEffect(() => {
    if (!isZoomed) {
      setPanPosition({ x: 50, y: 50 });
    }
  }, [isZoomed]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isZoomed) return;
      setIsDragging(true);
      dragStartRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        panX: panPosition.x,
        panY: panPosition.y,
      };
    },
    [isZoomed, panPosition]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isZoomed || !isDragging || !dragStartRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const deltaX = ((e.clientX - dragStartRef.current.mouseX) / rect.width) * 100;
      const deltaY = ((e.clientY - dragStartRef.current.mouseY) / rect.height) * 100;
      setPanPosition({
        x: dragStartRef.current.panX - deltaX,
        y: dragStartRef.current.panY - deltaY,
      });
    },
    [isZoomed, isDragging]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isZoomed) return;
      const touch = e.touches[0];
      dragStartRef.current = {
        mouseX: touch.clientX,
        mouseY: touch.clientY,
        panX: panPosition.x,
        panY: panPosition.y,
      };
    },
    [isZoomed, panPosition]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isZoomed || !dragStartRef.current) return;
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const deltaX = ((touch.clientX - dragStartRef.current.mouseX) / rect.width) * 100;
      const deltaY = ((touch.clientY - dragStartRef.current.mouseY) / rect.height) * 100;
      setPanPosition({
        x: dragStartRef.current.panX - deltaX,
        y: dragStartRef.current.panY - deltaY,
      });
    },
    [isZoomed]
  );

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
      style={{
        cursor: isZoomed ? (isDragging ? "grabbing" : "grab") : "zoom-in",
      }}
      onClick={(e) => {
        if (!isDragging) onToggleZoom();
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => { dragStartRef.current = null; }}
    >
      <Image
        src={url}
        alt=""
        fill
        className="transition-none"
        style={{
          objectFit: isZoomed ? "cover" : "contain",
          objectPosition: isZoomed ? `${panPosition.x}% ${panPosition.y}%` : "center",
        }}
        unoptimized
        draggable={false}
      />
    </div>
  );
}

// Fullscreen carousel view for images
function FullscreenCarousel({
  items,
  initialIndex,
  onClose,
}: {
  items: { type: "image"; url: string }[];
  initialIndex: number;
  onClose: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const showCounter = items.length > 1;

  // Lock body scroll when fullscreen is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Scroll to initial image on mount
  useEffect(() => {
    if (scrollRef.current && initialIndex > 0) {
      const scrollContainer = scrollRef.current;
      const slideWidth = scrollContainer.clientWidth + 8; // width + gap
      scrollContainer.scrollLeft = slideWidth * initialIndex;
    }
  }, [initialIndex]);

  // Track current slide via scroll position
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const slideWidth = scrollContainer.clientWidth + 8;
      const newIndex = Math.round(scrollContainer.scrollLeft / slideWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < items.length) {
        setCurrentIndex(newIndex);
        setIsZoomed(false); // Reset zoom when switching images
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [currentIndex, items.length]);

  // Disable scroll when zoomed
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.style.overflowX = isZoomed ? "hidden" : "auto";
    }
  }, [isZoomed]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-muted"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{ height: "56px" }}
      >
        <button
          onClick={onClose}
          className="p-2 -ml-2 transition-colors cursor-pointer text-foreground"
          aria-label="Close fullscreen"
        >
          <ChevronLeft size={28} />
        </button>
        {showCounter && (
          <span
            className="text-sm font-medium text-foreground"
          >
            {currentIndex + 1} / {items.length}
          </span>
        )}
      </div>

      {/* Image carousel container */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{
          position: "relative",
          top: "14px",
          maxHeight: "calc(100% - 70px)",
        }}
      >
        <div
          ref={scrollRef}
          className="w-full h-full flex overflow-x-auto scrollbar-hide"
          style={{
            scrollSnapType: isZoomed ? "none" : "x mandatory",
            gap: "8px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {items.map((item, index) => (
            <div
              key={`${item.url}-${index}`}
              className="flex-shrink-0 w-full h-full relative"
              style={{ scrollSnapAlign: "start" }}
            >
              <FullscreenImage
                url={item.url}
                isZoomed={isZoomed && index === currentIndex}
                onToggleZoom={() => setIsZoomed(!isZoomed)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FullscreenView({
  item,
  items,
  currentIndex,
  onClose,
}: {
  item: MediaItem;
  items?: MediaItem[];
  currentIndex?: number;
  onClose: () => void;
}) {
  // For images, use the new carousel fullscreen view
  if (item.type === "image") {
    const imageItems = items?.filter((i): i is { type: "image"; url: string } => i.type === "image") || [item as { type: "image"; url: string }];
    const imageIndex = items ? imageItems.findIndex(i => i.url === item.url) : 0;

    return (
      <FullscreenCarousel
        items={imageItems}
        initialIndex={imageIndex >= 0 ? imageIndex : 0}
        onClose={onClose}
      />
    );
  }

  // Lock body scroll when fullscreen is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (item.type === "figma") {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col bg-muted"
      >
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
        <div className="flex-1">
          <iframe
            src={item.url}
            className="w-full h-full border-0"
            allow="fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col bg-muted"
      >
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
        <div
          className="flex-1 flex items-center justify-center"
          style={{ maxHeight: "calc(100% - 70px)" }}
        >
          <video
            src={item.url}
            className="max-w-full max-h-full"
            controls
            autoPlay
          />
        </div>
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
            items={items}
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
          items={items}
          onClose={() => setFullscreenItem(null)}
        />
      )}
    </>
  );
}

