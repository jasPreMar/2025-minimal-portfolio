"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface FigmaEmbedProps {
  url: string;
}

export function FigmaEmbed({ url }: FigmaEmbedProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Use the URL directly - no wrapper needed
  const embedUrl = url;

  return (
    <>
      {/* Inline preview - click anywhere to go fullscreen */}
      <div
        className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer"
        onClick={() => setIsFullscreen(true)}
      >
        <iframe
          src={embedUrl}
          className="w-full h-full border-0 pointer-events-none"
          allow="fullscreen"
          allowFullScreen
        />
      </div>

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close fullscreen"
            >
              <X size={24} />
            </button>
          </div>
          {/* Fullscreen iframe */}
          <div className="flex-1 px-4 pb-4">
            <iframe
              src={embedUrl}
              className="w-full h-full border-0 rounded-lg"
              allow="fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}

