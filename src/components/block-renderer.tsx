"use client";

import { InteractiveImage } from "@/components/interactive-image";
import { ContentWrapper } from "@/components/content-wrapper";
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
              <ContentWrapper key={index} hasMaxWidth={false}>
                <InteractiveImage
                  src={block.src}
                  alt={block.alt}
                  priority={true}
                />
              </ContentWrapper>
            );

          case "text":
            return (
              <ContentWrapper key={index} hasMaxWidth>
                <p className="leading-relaxed whitespace-pre-line">
                  {parseTextWithLinks(block.content)}
                </p>
              </ContentWrapper>
            );

          case "heading":
            return (
              <ContentWrapper key={index} hasMaxWidth>
                <h4 className="text-lg font-semibold mt-4">
                  {block.content}
                </h4>
              </ContentWrapper>
            );

          case "image":
            return (
              <ContentWrapper key={index} hasMaxWidth={false}>
                <InteractiveImage
                  src={block.src}
                  alt={block.alt}
                />
              </ContentWrapper>
            );

          case "imagePair":
            return (
              <ContentWrapper key={index} hasMaxWidth={false} className="grid grid-cols-2 gap-2">
                {block.images.map((img, imgIndex) => (
                  <InteractiveImage
                    key={imgIndex}
                    src={img.src}
                    alt={img.alt}
                    objectFit="cover"
                    aspectRatio="square"
                  />
                ))}
              </ContentWrapper>
            );

          case "imageGrid":
            const columns = block.columns || 2;
            const aspectRatio = block.aspectRatio || "video";
            return (
              <ContentWrapper
                key={index}
                hasMaxWidth={false}
                className="grid gap-2"
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
              </ContentWrapper>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
