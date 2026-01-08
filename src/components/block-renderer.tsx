"use client";

import { InteractiveImage } from "@/components/interactive-image";
import type { ContentBlock } from "@/lib/chatgpt-app-data";

// Parse markdown-style links [text](url) into JSX
function parseTextWithLinks(text: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    // Add the link
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-secondary transition-colors"
      >
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

interface BlockRendererProps {
  blocks: ContentBlock[];
  projectTitle: string;
}

export function BlockRenderer({ blocks, projectTitle }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "hero":
            return (
              <div
                key={index}
                className="w-screen ml-[calc(50%-50vw)] -mr-[calc(50%-50vw)] px-8 sm:px-16"
              >
                <InteractiveImage
                  src={block.src}
                  alt={block.alt}
                  priority={true}
                />
              </div>
            );

          case "text":
            return (
              <p key={index} className="leading-relaxed whitespace-pre-line">
                {parseTextWithLinks(block.content)}
              </p>
            );

          case "heading":
            return (
              <h4 key={index} className="text-lg font-semibold mt-4">
                {block.content}
              </h4>
            );

          case "image":
            return (
              <div key={index} className="w-screen ml-[calc(50%-50vw)] -mr-[calc(50%-50vw)] px-8 sm:px-16">
                <InteractiveImage
                  src={block.src}
                  alt={block.alt}
                />
              </div>
            );

          case "imagePair":
            return (
              <div key={index} className="w-screen ml-[calc(50%-50vw)] -mr-[calc(50%-50vw)] px-8 sm:px-16 grid grid-cols-2 gap-2">
                {block.images.map((img, imgIndex) => (
                  <InteractiveImage
                    key={imgIndex}
                    src={img.src}
                    alt={img.alt}
                    objectFit="cover"
                    aspectRatio="square"
                  />
                ))}
              </div>
            );

          case "imageGrid":
            const columns = block.columns || 2;
            const aspectRatio = block.aspectRatio || "video";
            return (
              <div key={index} className="flex flex-col gap-2">
                <div
                  className="w-screen ml-[calc(50%-50vw)] -mr-[calc(50%-50vw)] px-8 sm:px-16 grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
                >
                  {block.images.map((img, imgIndex) => (
                    <InteractiveImage
                      key={imgIndex}
                      src={img.src}
                      alt={img.alt}
                      objectFit="cover"
                      aspectRatio={aspectRatio}
                    />
                  ))}
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
