"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [isZoomed, setIsZoomed] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; panX: number; panY: number } | null>(null);

  // Lock body scroll when fullscreen is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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
          className="w-full h-full relative"
          style={{
            cursor: isZoomed ? (isDragging ? "grabbing" : "grab") : "zoom-in",
          }}
          onClick={(e) => {
            if (!isDragging) setIsZoomed(!isZoomed);
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
            src={src}
            alt={alt}
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
}: InteractiveImageProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aspectClass = aspectRatio === "video" ? "aspect-video" : "";

  return (
    <>
      <div
        className={`relative w-full ${aspectClass} rounded-xl overflow-hidden bg-muted cursor-zoom-in group border border-border ${className}`}
        onClick={() => setIsFullscreen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] ${isLoading ? "opacity-0" : "opacity-100"
            }`}
          unoptimized
          priority={priority}
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-xl" />
        )}
        {/* Inset shadow overlay */}
        <div className="absolute inset-0 pointer-events-none ring-1 ring-border transition-transform duration-500 ease-out group-hover:scale-[1.02]" />
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



