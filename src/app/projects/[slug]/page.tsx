import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SetProjectTitle } from "@/components/project-title-context";
import { MediaCarousel } from "@/components/media-carousel";
import { ProjectSection } from "@/components/project-section";
import {
  getProjectBySlug,
  getProjectMetadata,
  getAllProjects,
  type NotionProject,
} from "@/lib/notion";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectMetadata(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Jason Marsh`,
    description: project.subtitle || project.background?.substring(0, 160),
  };
}

// Content section component with fade-in
function ContentSection({
  title,
  content,
  delay,
}: {
  title: string;
  content: string;
  delay: number;
}) {
  if (!content) return null;

  return (
    <ProjectSection delay={delay}>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <div className="text-secondary leading-relaxed whitespace-pre-line">
          {content}
        </div>
      </section>
    </ProjectSection>
  );
}

// Header metadata component - loads instantly
function ProjectHeader({
  project,
}: {
  project: Pick<
    NotionProject,
    "title" | "company" | "companyLogo" | "duration" | "role" | "tags" | "subtitle" | "background"
  >;
}) {
  return (
    <ProjectSection delay={0.1} className="flex flex-col gap-4">
      {/* Set the project title for the animated header */}
      <SetProjectTitle title={project.title} />

      {/* Metadata row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-secondary">
        {/* Company */}
        <div className="flex items-center gap-2">
          {project.companyLogo && (
            <Image
              src={project.companyLogo}
              alt={`${project.company} logo`}
              width={20}
              height={20}
              className="flex-shrink-0"
              unoptimized
            />
          )}
          <span>{project.company}</span>
        </div>

        {/* Duration */}
        {project.duration && (
          <div className="flex items-center gap-1.5">
            <span className="text-secondary/50">⏱</span>
            <span>{project.duration}</span>
          </div>
        )}

        {/* Role */}
        {project.role && (
          <div className="flex items-center gap-1.5">
            <span className="text-secondary/50">👤</span>
            <span>{project.role}</span>
          </div>
        )}

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex items-center gap-2">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full text-xs bg-foreground/5 border border-foreground/10"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs text-secondary/70">
                +{project.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Subtitle / Description */}
      {(project.subtitle || project.background) && (
        <p className="text-secondary leading-relaxed">
          {project.subtitle || project.background}
        </p>
      )}
    </ProjectSection>
  );
}

// Carousel section - loads after header
async function CarouselSection({
  slug,
  delay,
}: {
  slug: string;
  delay: number;
}) {
  const project = await getProjectBySlug(slug);
  if (!project) return null;

  const items = [
    // Figma Slides
    ...(project.figmaSlidesUrl
      ? [{ type: "figma" as const, url: project.figmaSlidesUrl }]
      : []),
    // Prototype
    ...(project.prototypeUrl
      ? [{ type: "figma" as const, url: project.prototypeUrl }]
      : []),
    // Hero Image
    ...(project.heroImage
      ? [{ type: "image" as const, url: project.heroImage }]
      : []),
    // Video
    ...(project.videoUrl
      ? [{ type: "video" as const, url: project.videoUrl }]
      : []),
    // Process Images
    ...project.processImages.map((url) => ({ type: "image" as const, url })),
    // Final Screens
    ...project.finalScreens.map((url) => ({ type: "image" as const, url })),
  ];

  if (items.length === 0) return null;

  return (
    <ProjectSection delay={delay}>
      <MediaCarousel items={items} />
    </ProjectSection>
  );
}

// Quote section
async function QuoteSection({
  slug,
  delay,
}: {
  slug: string;
  delay: number;
}) {
  const project = await getProjectBySlug(slug);
  if (!project?.stakeholderQuote) return null;

  return (
    <ProjectSection delay={delay}>
      <blockquote className="border-l-4 border-foreground/20 pl-4 italic text-secondary">
        {project.stakeholderQuote}
      </blockquote>
    </ProjectSection>
  );
}

// Case study content sections
async function CaseStudySections({
  slug,
  baseDelay,
}: {
  slug: string;
  baseDelay: number;
}) {
  const project = await getProjectBySlug(slug);
  if (!project) return null;

  // Define all possible content sections with their data
  const sections = [
    { title: "Background", content: project.background },
    { title: "The Challenge", content: project.challengeStatement },
    { title: "Trigger or Insight", content: project.triggerOrInsight },
    { title: "Goals", content: project.goals },
    { title: "Constraints", content: project.constraints },
    { title: "Methods", content: project.methods },
    { title: "Key Findings", content: project.keyFindings },
    { title: "Early Concepts", content: project.earlyConcepts },
    { title: "Design Decisions", content: project.designDecisions },
    { title: "UI Principles", content: project.uiPrinciples },
    { title: "Patterns", content: project.patterns },
    { title: "Testing & Feedback", content: project.testingFeedback },
    { title: "Results", content: project.impactMetrics },
    { title: "Qualitative Impact", content: project.qualitativeImpact },
    { title: "Learnings", content: project.learnings },
    { title: "Personal Growth", content: project.personalGrowth },
    { title: "Next Steps", content: project.nextSteps },
  ].filter((s) => s.content); // Only sections with content

  if (sections.length === 0) return null;

  return (
    <article className="flex flex-col gap-12 mt-4">
      {sections.map((section, index) => (
        <ContentSection
          key={section.title}
          title={section.title}
          content={section.content}
          delay={baseDelay + index * 0.08}
        />
      ))}
    </article>
  );
}

// Team section
async function TeamSection({
  slug,
  delay,
}: {
  slug: string;
  delay: number;
}) {
  const project = await getProjectBySlug(slug);
  if (!project?.team) return null;

  return (
    <ProjectSection delay={delay}>
      <section className="flex flex-col gap-3 border-t border-foreground/10 pt-8">
        <h2 className="text-lg font-semibold tracking-tight">Team</h2>
        <p className="text-secondary whitespace-pre-line">{project.team}</p>
      </section>
    </ProjectSection>
  );
}

// Loading placeholder for carousel
function CarouselSkeleton() {
  return (
    <div className="h-[340px] rounded-xl bg-foreground/5 animate-pulse" />
  );
}

// Loading placeholder for content sections
function ContentSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-6 w-32 rounded bg-foreground/5 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-foreground/5 animate-pulse" />
        <div className="h-4 w-3/4 rounded bg-foreground/5 animate-pulse" />
        <div className="h-4 w-5/6 rounded bg-foreground/5 animate-pulse" />
      </div>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Fetch metadata first for instant header render
  const metadata = await getProjectMetadata(slug);

  if (!metadata) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-10 -mt-16">
      {/* Header section - renders immediately */}
      <ProjectHeader project={metadata} />

      {/* Carousel section - streams in */}
      <Suspense fallback={<CarouselSkeleton />}>
        <CarouselSection slug={slug} delay={0.25} />
      </Suspense>

      {/* Quote section - streams in */}
      <Suspense fallback={null}>
        <QuoteSection slug={slug} delay={0.35} />
      </Suspense>

      {/* Case study content - streams in progressively */}
      <Suspense fallback={<ContentSkeleton />}>
        <CaseStudySections slug={slug} baseDelay={0.4} />
      </Suspense>

      {/* Team section - streams in last */}
      <Suspense fallback={null}>
        <TeamSection slug={slug} delay={0.6} />
      </Suspense>

      {/* Footer spacing */}
      <div className="h-20" />
    </div>
  );
}
