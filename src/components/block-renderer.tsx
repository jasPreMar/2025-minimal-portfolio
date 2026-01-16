"use client";

import { InteractiveImage } from "@/components/interactive-image";
import { ContentWrapper } from "@/components/content-wrapper";
import { ShimmerKeyword } from "@/components/shimmer-keyword";
import type { ContentBlock } from "@/lib/chatgpt-app-data";

// Parse markdown-style links [text](url) and bold **text** into JSX
function parseTextWithLinks(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let keyCounter = 0;
  
  // Find all markdown elements (links and bold)
  const elements: Array<{ type: 'link' | 'bold'; start: number; end: number; content: string; url?: string }> = [];
  
  // Find all links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    elements.push({
      type: 'link',
      start: match.index,
      end: match.index + match[0].length,
      content: match[1],
      url: match[2],
    });
  }
  
  // Find all bold text (but skip if inside a link)
  const boldRegex = /\*\*([^*]+)\*\*/g;
  while ((match = boldRegex.exec(text)) !== null) {
    const boldStart = match.index;
    const boldEnd = match.index + match[0].length;
    
    // Check if this bold is inside any link
    const isInsideLink = elements.some(
      (el) => el.type === 'link' && boldStart >= el.start && boldEnd <= el.end
    );
    
    if (!isInsideLink) {
      elements.push({
        type: 'bold',
        start: boldStart,
        end: boldEnd,
        content: match[1],
      });
    }
  }
  
  // Sort by position
  elements.sort((a, b) => a.start - b.start);
  
  // Remove overlapping elements (keep the first one found)
  const filteredElements: typeof elements = [];
  for (const element of elements) {
    const overlaps = filteredElements.some(
      (existing) => !(element.end <= existing.start || element.start >= existing.end)
    );
    if (!overlaps) {
      filteredElements.push(element);
    }
  }
  
  // Build the result
  for (const element of filteredElements) {
    // Add text before the element
    if (element.start > lastIndex) {
      parts.push(text.slice(lastIndex, element.start));
    }
    
    // Add the element
    if (element.type === 'link') {
      parts.push(
        <a
          key={`link-${keyCounter++}`}
          href={element.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-secondary transition-colors"
        >
          {element.content}
        </a>
      );
    } else if (element.type === 'bold') {
      parts.push(
        <ShimmerKeyword key={`bold-${keyCounter++}`}>
          {element.content}
        </ShimmerKeyword>
      );
    }
    
    lastIndex = element.end;
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
              <ContentWrapper key={index} hasMaxWidth={false} spacing="media">
                <InteractiveImage
                  src={block.src}
                  alt={block.alt}
                  priority={true}
                  aspectRatio="intrinsic"
                />
              </ContentWrapper>
            );

          case "text":
            return (
              <ContentWrapper key={index} hasMaxWidth spacing="text">
                <p className="leading-relaxed whitespace-pre-line">
                  {parseTextWithLinks(block.content)}
                </p>
              </ContentWrapper>
            );

          case "heading":
            return (
              <ContentWrapper key={index} hasMaxWidth spacing="section">
                <h4 className="text-lg font-semibold">
                  {block.content}
                </h4>
              </ContentWrapper>
            );

          case "image":
            return (
              <ContentWrapper key={index} hasMaxWidth={block.constrainWidth ?? false} spacing="media">
                <InteractiveImage
                  src={block.src}
                  alt={block.alt}
                  aspectRatio="intrinsic"
                  objectFit={block.objectFit}
                />
              </ContentWrapper>
            );

          case "imagePair":
            return (
              <ContentWrapper key={index} hasMaxWidth={false} spacing="media" className="grid grid-cols-2 gap-2">
                {block.images.map((img, imgIndex) => (
                  <InteractiveImage
                    key={imgIndex}
                    src={img.src}
                    alt={img.alt}
                    aspectRatio="intrinsic"
                    objectFit={img.objectFit}
                  />
                ))}
              </ContentWrapper>
            );

          case "imageGrid":
            const columns = block.columns || 2;
            const defaultAspectRatio = block.aspectRatio || "intrinsic";
            return (
              <ContentWrapper
                key={index}
                hasMaxWidth={block.constrainWidth ?? false}
                spacing="media"
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
              >
                {block.images.map((img, imgIndex) => (
                  <div
                    key={imgIndex}
                    style={img.colSpan ? { gridColumn: `span ${img.colSpan}` } : undefined}
                  >
                    <InteractiveImage
                      src={img.src}
                      alt={img.alt}
                      aspectRatio={img.aspectRatio || defaultAspectRatio}
                      objectFit={img.objectFit}
                    />
                  </div>
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
