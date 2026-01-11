# 2025 Minimal Portfolio

A modern, minimal portfolio website built with Next.js 16, showcasing design projects with a focus on AI/ML work. The site features dynamic content from Notion, hardcoded project showcases, and sophisticated animations including shimmer text effects, expandable project sections, and interactive image galleries.

## Overview

This portfolio is a Next.js-based static site that displays design projects, primarily focused on AI/ML work at CarMax. The site combines:

- **Dynamic Content**: Projects fetched from a Notion database with automatic filtering based on environment (production shows only "Live" projects, development shows "Draft", "Ready", and "Live")
- **Hardcoded Projects**: Two featured projects (ChatGPT App and AI Pattern Library) with custom content blocks
- **Modern Animations**: Shimmer text effects, staggered fade-ins, expandable sections, and interactive image galleries
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **ISR (Incremental Static Regeneration)**: Pages revalidate every 60 seconds for fresh content

## Tech Stack

### Core Framework
- **Next.js 16.0.7** - React framework with App Router
- **React 19.2.1** - UI library
- **TypeScript 5** - Type safety

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Custom CSS Variables** - OKLCH color system for modern color management
- **CSS Animations** - Custom shimmer effects, wipe reveals, and prismatic gradients

### Animation & Interactions
- **Motion (Framer Motion) 12.23.24** - Animation library for React
- **Custom Shimmer Effects** - Multi-layer text animations with prismatic gradients
- **Touch Gestures** - Pan/zoom for images, swipe for carousels

### Data & CMS
- **Notion API (@notionhq/client 5.4.0)** - Content management via Notion database
- **Environment-based Filtering** - Automatic project status filtering

### UI Components
- **Radix UI** - Accessible component primitives (Tooltip)
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **shadcn/ui** - Component library (Badge, Skeleton, Tooltip)

### Utilities
- **class-variance-authority** - Component variant management
- **clsx** - Conditional class names
- **tailwind-merge** - Merge Tailwind classes intelligently

### Development
- **ESLint** - Code linting
- **TypeScript** - Type checking

## Project Structure

```
2025-minimal-portfolio/
├── public/                          # Static assets
│   ├── icons/                      # SVG icons
│   ├── logos/                      # Company logos (CarMax)
│   ├── projects/                   # Project images and screenshots
│   └── *.svg                       # Various SVG assets
│
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── favicon.ico
│   │   ├── fonts/                  # Custom fonts (CarMax Sharp Sans)
│   │   │   ├── CarMaxSharpSansDisp-Bold.otf
│   │   │   └── CarMaxSharpSansDisp-Book.otf
│   │   ├── globals.css             # Global styles, CSS variables, animations
│   │   ├── layout.tsx              # Root layout with fonts and header
│   │   ├── loading.tsx             # Loading state component
│   │   ├── page.tsx                # Home page (project listing)
│   │   └── projects/
│   │       ├── [slug]/
│   │       │   ├── page.tsx        # Dynamic project detail pages
│   │       │   └── not-found.tsx   # 404 for projects
│   │       ├── ai-pattern-library/
│   │       │   └── page.tsx        # Hardcoded AI Pattern Library project
│   │       ├── chatgpt-app/
│   │       │   └── page.tsx        # Hardcoded ChatGPT App project
│   │       └── page.tsx            # Projects index (if needed)
│   │
│   ├── components/                 # React components
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── badge.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── tooltip.tsx
│   │   ├── animated-header.tsx     # Site header with name and shimmer text
│   │   ├── ascii-assets.ts         # ASCII art assets
│   │   ├── ascii-game.tsx          # ASCII game component
│   │   ├── block-renderer.tsx      # Renders content blocks for hardcoded projects
│   │   ├── compact-carousel.tsx    # Compact image carousel
│   │   ├── content-wrapper.tsx     # Consistent content container with max-width
│   │   ├── email-copy-button.tsx   # Email copy to clipboard button
│   │   ├── expandable-project-section.tsx  # Expandable project list with thumbnails
│   │   ├── experience-section.tsx  # Experience/work history section
│   │   ├── figma-embed.tsx         # Figma embed component
│   │   ├── hash-scroll.tsx         # Hash-based scrolling utility
│   │   ├── interactive-image.tsx   # Image with zoom/pan functionality
│   │   ├── media-carousel.tsx      # Fullscreen media carousel
│   │   ├── page-transition.tsx     # Page transition animations
│   │   ├── preview.tsx             # Preview component
│   │   ├── project-link.tsx        # Individual project link component
│   │   ├── project-section.tsx     # Project section wrapper
│   │   ├── projects-staggered-fade.tsx  # Staggered fade animation for projects
│   │   ├── rulers.tsx              # Ruler overlay component (dev tool)
│   │   ├── shimmer-text.tsx        # Animated shimmer text with word rotation
│   │   ├── site-footer.tsx         # Site footer
│   │   ├── staggered-fade-in.tsx   # Generic staggered fade-in wrapper
│   │   ├── step-item.tsx           # Step component item
│   │   ├── steps.tsx               # Steps component
│   │   └── toaster.tsx             # Toast notification provider
│   │
│   └── lib/                        # Utility functions and data
│       ├── ai-pattern-library-data.ts  # Hardcoded AI Pattern Library project data
│       ├── chatgpt-app-data.ts     # Hardcoded ChatGPT App project data
│       ├── notion.ts               # Notion API integration and project parsing
│       ├── projects.ts             # Legacy project data (unused?)
│       └── utils.ts                # Utility functions (cn, etc.)
│
├── components.json                 # shadcn/ui configuration
├── eslint.config.mjs               # ESLint configuration
├── next.config.ts                  # Next.js configuration
├── next-env.d.ts                   # Next.js TypeScript declarations
├── package.json                    # Dependencies and scripts
├── postcss.config.mjs              # PostCSS configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## Key Files Explained

### Configuration Files

#### `package.json`
```json
{
  "name": "2025-minimal-portfolio",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```
Defines project metadata, dependencies, and npm scripts. Uses Next.js 16 with React 19, Tailwind CSS 4, and Notion API for content.

#### `tsconfig.json`
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
TypeScript configuration with path aliases (`@/` maps to `src/`) for cleaner imports.

#### `next.config.ts`
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```
Next.js configuration file. Currently minimal, but can be extended for image optimization, redirects, etc.

### Core Application Files

#### `src/app/layout.tsx`
```typescript
import { Inter, Lato, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import { AnimatedHeader } from "@/components/animated-header";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const lato = Lato({ variable: "--font-lato", subsets: ["latin"], weight: ["100", "300", "400", "700", "900"] });
const spaceMono = Space_Mono({ variable: "--font-space-mono", subsets: ["latin"], weight: ["400", "700"] });
const carmaxSharpSans = localFont({
  src: [
    { path: "./fonts/CarMaxSharpSansDisp-Book.otf", weight: "400" },
    { path: "./fonts/CarMaxSharpSansDisp-Bold.otf", weight: "700" }
  ],
  variable: "--font-carmax-sharp-sans",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${lato.variable} ${carmaxSharpSans.variable} ${spaceMono.variable} antialiased`}>
        <div className="flex flex-col mt-28 mb-28">
          <AnimatedHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
```
Root layout that:
- Loads multiple fonts (Inter, Lato, Space Mono, and custom CarMax Sharp Sans)
- Exposes fonts as CSS variables for use throughout the app
- Wraps content with `AnimatedHeader` component
- Sets consistent vertical spacing (mt-28 mb-28)

#### `src/app/page.tsx`
```typescript
import { getAllProjects, type NotionProject } from "@/lib/notion";
import { ExpandableProjectSection } from "@/components/expandable-project-section";
import { chatgptAppProject } from "@/lib/chatgpt-app-data";
import { aiPatternLibraryProject } from "@/lib/ai-pattern-library-data";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function Home() {
  const allProjects = await getAllProjects(); // Fetches from Notion
  
  const notionProjects = allProjects.filter((p) => p.projectType === "Project");
  const sideProjects = allProjects.filter((p) => p.projectType === "Side Project");
  
  // Create hardcoded project entries for home page
  const chatgptAppHomeProject = {
    id: "hardcoded-chatgpt-app",
    title: chatgptAppProject.title,
    company: chatgptAppProject.company,
    slug: chatgptAppProject.slug,
    heroImages: ["/projects/Final Multi-car.png"],
    finalScreens: [/* ... */],
    subtitle: chatgptAppProject.subtitle,
    featured: false,
  };
  
  const aiPatternLibraryHomeProject = { /* ... */ };
  
  const projects = [aiPatternLibraryHomeProject, chatgptAppHomeProject, ...notionProjects];
  
  return (
    <StaggeredFadeIn initialDelay={0.25} staggerDelay={0.18} duration={0.45}>
      {projects.length > 0 && (
        <ContentWrapper>
          <ExpandableProjectSection title="Projects" projects={projects} />
        </ContentWrapper>
      )}
      {sideProjects.length > 0 && (
        <ContentWrapper>
          <ExpandableProjectSection title="Side Projects" projects={sideProjects} />
        </ContentWrapper>
      )}
    </StaggeredFadeIn>
  );
}
```
Home page that:
- Fetches projects from Notion API
- Filters by project type (Projects vs Side Projects)
- Prepends hardcoded projects (ChatGPT App, AI Pattern Library) to the list
- Renders expandable sections with staggered fade-in animation
- Uses ISR (Incremental Static Regeneration) with 60-second revalidation

#### `src/app/projects/[slug]/page.tsx`
```typescript
import { getProjectBySlug, getAllProjectSlugs, generateStaticParams } from "@/lib/notion";
import { InteractiveImage } from "@/components/interactive-image";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return {
    title: `${project?.title} | Jason Marsh`,
    description: project?.subtitle || project?.background || "A design project by Jason Marsh",
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) notFound();
  
  return (
    <div className="flex flex-col gap-6">
      <ContentWrapper>
        <h1>{project.title}</h1>
        <p>{project.subtitle || "A collection of real, impactful, and shipped projects."}</p>
      </ContentWrapper>
      
      {project.heroImages.length > 0 && (
        <ContentWrapper hasMaxWidth={false}>
          <InteractiveImage src={project.heroImages[0]} alt={`${project.title} hero`} priority />
        </ContentWrapper>
      )}
      
      {project.background && (
        <ContentWrapper>
          <h3>Overview</h3>
          <p className="whitespace-pre-line">{project.background}</p>
        </ContentWrapper>
      )}
      
      {/* Final screens in alternating 2-1-2-1 grid pattern */}
      {project.finalScreens.length > 0 && (/* ... */)}
    </div>
  );
}
```
Dynamic project detail page that:
- Generates static params at build time for all project slugs
- Fetches project data from Notion by slug
- Renders hero image, overview, and final screens in an alternating grid (2 columns, 1 column, repeat)
- Uses `InteractiveImage` component for zoom/pan functionality
- Implements SEO metadata generation

### Data Layer

#### `src/lib/notion.ts`
```typescript
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID!;

// Environment-based filtering
const isProduction = process.env.NODE_ENV === "production" && process.env.VERCEL_ENV === "production";

export async function getAllProjects(options: GetProjectsOptions = {}): Promise<NotionProject[]> {
  const useProductionFilter = options.forceProduction || isProduction;
  // ... fetches pages from Notion database
  
  // Filter by status:
  // Production: only "Live" projects
  // Development: "Draft", "Ready", and "Live" (excludes "Not started" and "Rejected")
  
  return pages.sort((a, b) => {
    const dateA = new Date(a.startDate || 0);
    const dateB = new Date(b.startDate || 0);
    return dateB.getTime() - dateA.getTime(); // Newest first
  });
}

export async function getProjectBySlug(slug: string): Promise<NotionProject | null> {
  const allProjects = await getAllProjects();
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return null;
  
  project.pageContent = await getPageContent(project.id);
  return project;
}
```
Notion integration that:
- Connects to Notion API using environment variables (`NOTION_TOKEN`, `NOTION_DATABASE_ID`)
- Parses Notion pages into structured `NotionProject` objects
- Implements environment-based filtering (production vs development)
- Generates URL slugs from project names
- Fetches page content blocks recursively
- Sorts projects by date (newest first)

#### `src/lib/chatgpt-app-data.ts` & `src/lib/ai-pattern-library-data.ts`
```typescript
export type ContentBlock =
  | { type: "hero"; src: string; alt: string }
  | { type: "text"; content: string }
  | { type: "heading"; content: string }
  | { type: "image"; src: string; alt: string; constrainWidth?: boolean; objectFit?: "cover" | "contain" }
  | { type: "imagePair"; images: { src: string; alt: string }[] }
  | { type: "imageGrid"; images: { src: string; alt: string }[]; columns?: number; aspectRatio?: "video" | "square" | "2/1" | "intrinsic" };

export type HardcodedProject = {
  slug: string;
  title: string;
  subtitle: string;
  company: string;
  tags: string[];
  blocks: ContentBlock[];
};

export const chatgptAppProject: HardcodedProject = {
  slug: "chatgpt-app",
  title: "CarMax ChatGPT App",
  subtitle: "An AI-Native Car Shopping Experience",
  company: "CarMax",
  tags: ["AI/ML", "Mobile", "Product Strategy"],
  blocks: [
    { type: "hero", src: "/projects/Chat GPT Hero.png", alt: "..." },
    { type: "text", content: "..." },
    { type: "heading", content: "10-Minute Mock" },
    { type: "imageGrid", columns: 1, images: [...] },
    // ...
  ],
};
```
Hardcoded project data with:
- Flexible content block system (hero, text, heading, image, imagePair, imageGrid)
- Type-safe structure for project metadata
- Used for featured projects that need custom layouts

### Component Files

#### `src/components/animated-header.tsx`
```typescript
"use client";

import { usePathname } from "next/navigation";
import { ShimmerText } from "@/components/shimmer-text";
import EmailCopyButton from "@/components/email-copy-button";
import { Rulers } from "@/components/rulers";

export function AnimatedHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  return (
    <ContentWrapper as="header">
      <div className="flex items-center gap-4 w-full">
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1 text-xl font-semibold">
            {isHomePage ? (
              <span>Jason Marsh</span>
            ) : (
              <Link href="/">Jason Marsh</Link>
            )}
          </div>
          <ShimmerText initialShimmerDelay={0.25} initialWord="Designing" />
        </div>
        <div className="flex-shrink-0">
          <Rulers visible={isRulerFilled} />
          <EmailCopyButton />
        </div>
      </div>
    </ContentWrapper>
  );
}
```
Site header component that:
- Shows name as link (except on home page)
- Displays animated shimmer text below name
- Includes email copy button and ruler tool (dev utility)
- Handles hover states with touch device detection

#### `src/components/shimmer-text.tsx`
```typescript
"use client";

const WORDS = ["Designing", "Coding", "Creating", "Thinking", /* ... 100+ words */];
const LOCATIONS = ["New York", "Brooklyn", "the City", /* ... 20+ locations */];

export const ShimmerText = forwardRef(({ initialShimmerDelay, initialWord, initialLocation }, ref) => {
  const [currentWord, setCurrentWord] = useState("Vibing");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPrismaticAnimating, setIsPrismaticAnimating] = useState(false);
  
  const triggerAnimation = useCallback((targetWord, targetLocation) => {
    setCurrentWord(targetWord || getRandomWord(previousWord));
    setCurrentLocation(targetLocation || getRandomLocation(previousLocation));
    setIsAnimating(true);
    
    // Start prismatic shimmer partway through white shimmer
    setTimeout(() => setIsPrismaticAnimating(true), wipeDuration * PRISMATIC_DELAY_RATIO * 1000);
  }, []);
  
  return (
    <p className="shimmer-container">
      <span className={`shimmer-new ${isAnimating ? "shimmer-animating" : ""}`}>
        {`${currentWord} in ${currentLocation}...`}
      </span>
      {isAnimating && (
        <>
          <span className="shimmer-old shimmer-animating">{previousText}</span>
          <span className="shimmer-highlight shimmer-animating">{currentText}</span>
        </>
      )}
      {isPrismaticAnimating && (
        <span className="shimmer-prismatic shimmer-animating">{currentText}</span>
      )}
    </p>
  );
});
```
Animated text component that:
- Rotates through 100+ action words and 20+ locations
- Uses multi-layer CSS animations (wipe reveal + white shimmer + prismatic gradient)
- Supports initial animation delay for page load coordination
- Clickable to manually trigger new word
- Auto-rotates every 4 seconds (0.65s animation + 3.35s pause)

#### `src/components/expandable-project-section.tsx`
```typescript
"use client";

export function ExpandableProjectSection({ title, projects }: { title: string; projects: Project[] }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [fullscreenState, setFullscreenState] = useState<{ images: string[]; initialIndex: number } | null>(null);
  
  return (
    <>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        <p>{title}</p>
        <ChevronUp/Down />
      </button>
      
      <div className={`flex flex-col ${isExpanded ? "gap-5" : "gap-0.5"}`}>
        {projects.map((project) => (
          <ProjectLinkWithThumbnails
            key={project.id}
            project={project}
            href={`/projects/${project.slug}`}
            isExpanded={isExpanded}
          />
        ))}
      </div>
      
      {fullscreenState && (
        <FullscreenCarousel
          items={fullscreenState.images}
          initialIndex={fullscreenState.initialIndex}
          onClose={() => setFullscreenState(null)}
        />
      )}
    </>
  );
}

function ProjectLinkWithThumbnails({ project, href, isExpanded }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPrismaticShimmering, setIsPrismaticShimmering] = useState(false);
  
  const allImages = [...project.heroImages, ...(project.finalScreens || [])];
  
  return (
    <Link href={href}>
      <div className="flex items-center gap-2">
        <span className={isPrismaticShimmering ? "shimmer-prismatic" : ""}>
          {project.title} {isExpanded && <span className="text-secondary">- 2025</span>}
        </span>
        <ArrowRight />
      </div>
      
      {isExpanded && allImages.length > 0 && (
        <div className="flex gap-2 overflow-x-auto">
          {allImages.map((src) => (
            <ThumbnailImage src={src} />
          ))}
        </div>
      )}
    </Link>
  );
}
```
Expandable project section that:
- Toggles between expanded/collapsed states
- Shows project thumbnails when expanded
- Displays prismatic shimmer on hover
- Opens fullscreen carousel when thumbnail clicked
- Handles touch device hover states

#### `src/components/interactive-image.tsx`
```typescript
"use client";

export function InteractiveImage({ src, alt, priority, objectFit, aspectRatio }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  
  return (
    <div
      onClick={() => !isDragging && setIsZoomed(!isZoomed)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      style={{ cursor: isZoomed ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{
          objectFit: isZoomed ? "cover" : "contain",
          objectPosition: isZoomed ? `${panPosition.x}% ${panPosition.y}%` : "center",
        }}
      />
    </div>
  );
}
```
Interactive image component that:
- Supports click-to-zoom functionality
- Enables pan/drag when zoomed
- Works with both mouse and touch events
- Uses Next.js Image component for optimization

#### `src/components/content-wrapper.tsx`
```typescript
interface ContentWrapperProps {
  children: React.ReactNode;
  hasMaxWidth?: boolean; // Default: true (608px max-width)
  className?: string;
  as?: "div" | "header" | "section" | "main" | "footer";
  spacing?: "none" | "text" | "media";
}

export function ContentWrapper({
  children,
  hasMaxWidth = true,
  className = "",
  as: Component = "div",
  spacing = "none",
}: ContentWrapperProps) {
  return (
    <Component className={`w-full px-8 sm:px-16 ${spacingClasses[spacing]}`}>
      <div className={`${hasMaxWidth ? "max-w-[608px] mx-auto" : "w-full"} ${className}`}>
        {children}
      </div>
    </Component>
  );
}
```
Reusable content wrapper that:
- Provides consistent padding (px-8 mobile, px-16 desktop)
- Optionally constrains max-width to 608px (centered)
- Supports different semantic HTML elements
- Handles spacing variants (text: 24px, media: 72px)

### Styling

#### `src/app/globals.css`
```css
@import "tailwindcss";

:root {
  --secondary: oklch(0.70 0 0);
  --shimmer-base: var(--secondary);
  --shimmer-highlight: #ffffff;
  --foreground: oklch(0.145 0 0);
  --background: oklch(1 0 0);
  /* ... more CSS variables */
}

/* Shimmer wipe-reveal animation */
.shimmer-new.shimmer-animating {
  animation: wipe-reveal-new var(--wipe-duration, 0.8s) linear forwards;
}

.shimmer-old.shimmer-animating {
  animation: wipe-reveal-old var(--wipe-duration, 0.8s) linear forwards;
}

.shimmer-highlight.shimmer-animating {
  animation: shimmer-slide var(--wipe-duration, 0.8s) linear forwards;
}

/* Prismatic shimmer effect */
.shimmer-prismatic {
  background:
    linear-gradient(82deg, transparent 0%, #ff4da6 43%, #ffa500 46%, #50fa7b 49%, #00cfff 52%, #da70d6 55%, transparent 100%),
    linear-gradient(98deg, /* ... */),
    linear-gradient(88deg, /* ... */);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark {
  --background: oklch(0 0 0);
  --foreground: oklch(0.98 0 0);
  /* ... dark mode variables */
}
```
Global styles that:
- Import Tailwind CSS
- Define OKLCH color system variables
- Implement shimmer animations (wipe reveal, white highlight, prismatic gradient)
- Support dark mode via `.dark` class
- Include custom scrollbar hiding utilities

## Environment Variables

Required environment variables:

```bash
NOTION_TOKEN=secret_...          # Notion API integration token
NOTION_DATABASE_ID=...           # Notion database ID for projects
```

Optional (for production):
```bash
NODE_ENV=production             # Enables production filtering (only "Live" projects)
VERCEL_ENV=production            # Vercel-specific production flag
```

## Development

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file with your Notion credentials:
   ```bash
   NOTION_TOKEN=your_notion_token
   NOTION_DATABASE_ID=your_database_id
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

The build process will:
- Generate static pages for all projects (via `generateStaticParams`)
- Use ISR (Incremental Static Regeneration) with 60-second revalidation
- Optimize images and assets
- Bundle and minify JavaScript/CSS

## Key Features

### 1. Dynamic Content from Notion
- Projects are stored in a Notion database
- Automatic filtering based on environment (production vs development)
- Real-time content updates via ISR (60-second revalidation)
- Rich content blocks (text, images, headings, grids)

### 2. Hardcoded Featured Projects
- Two special projects (ChatGPT App, AI Pattern Library) with custom layouts
- Flexible content block system for complex layouts
- Separate route structure (`/projects/chatgpt-app`, `/projects/ai-pattern-library`)

### 3. Advanced Animations
- **Shimmer Text**: Multi-layer text animation with prismatic gradients
- **Staggered Fade-In**: Sequential element reveals on page load
- **Expandable Sections**: Smooth expand/collapse with thumbnail carousels
- **Interactive Images**: Zoom and pan functionality for detailed viewing

### 4. Responsive Design
- Mobile-first approach
- Touch-friendly interactions
- Adaptive layouts (single column mobile, multi-column desktop)
- Touch device detection for hover state handling

### 5. Performance Optimizations
- Next.js Image optimization
- Static page generation with ISR
- Font optimization via `next/font`
- Code splitting and lazy loading

## Project Status Filtering

The site automatically filters projects based on environment:

- **Production** (`NODE_ENV=production` && `VERCEL_ENV=production`):
  - Only shows projects with status: `"Live"`

- **Development** (all other environments):
  - Shows projects with status: `"Draft"`, `"Ready"`, `"Live"`
  - Excludes: `"Not started"`, `"Rejected"`

This allows you to preview draft projects locally while only showing published work in production.

## Notion Database Schema

The Notion database should have the following properties (as referenced in `src/lib/notion.ts`):

- **Project Name** (Title)
- **Company** (Rich Text)
- **Company Logo** (Files)
- **Hero Image** (Files)
- **Keywords / Tags** (Multi-select)
- **Start/End** (Date)
- **Duration** (Formula)
- **Status** (Status) - Values: "Not started", "Draft", "Ready", "Live", "Rejected"
- **Project Type** (Select) - Values: "Project", "Side Project"
- **Role** (Rich Text)
- **Team** (Rich Text)
- **Featured** (Checkbox)
- **Overview** / **Background** (Rich Text)
- **Challenge Statement** (Rich Text)
- **Subtitle / Tagline** (Rich Text)
- **Final Screens** (Files)
- **Process Images** (Files)
- And many more content fields...

## Customization

### Adding a New Hardcoded Project

1. Create a new data file in `src/lib/` (e.g., `my-project-data.ts`)
2. Define the project using the `HardcodedProject` type
3. Create a route in `src/app/projects/[slug]/page.tsx` or a dedicated route
4. Add the project to the home page list in `src/app/page.tsx`

### Modifying Shimmer Text Words

Edit the `WORDS` and `LOCATIONS` arrays in `src/components/shimmer-text.tsx`:

```typescript
const WORDS = ["Your", "Custom", "Words", "Here"];
const LOCATIONS = ["Your", "Locations", "Here"];
```

### Changing Color Scheme

Modify CSS variables in `src/app/globals.css`:

```css
:root {
  --foreground: oklch(0.145 0 0);  /* Text color */
  --background: oklch(1 0 0);      /* Background color */
  --secondary: oklch(0.70 0 0);    /* Secondary text color */
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled
- CSS Grid and Flexbox support required

## License

Private project - All rights reserved.

## Author

**Jason Marsh**  
Designer in New York  
Portfolio: [Your portfolio URL]

---

Built with ❤️ using Next.js, React, and Tailwind CSS.
