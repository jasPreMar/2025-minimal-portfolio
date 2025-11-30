import Image from "next/image";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/page-transition";
import {
  getProjectBySlug,
  getAllProjects,
  type NotionProject,
} from "@/lib/notion";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Generate static params for all projects
export async function generateStaticParams() {
  // Use environment-based filtering for static generation
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
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Jason Marsh`,
    description: project.subtitle || project.background?.substring(0, 160),
  };
}

// Content section component
function ContentSection({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  if (!content) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="text-secondary leading-relaxed whitespace-pre-line">
        {content}
      </div>
    </section>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageTransition direction="right">
      <div className="flex flex-col gap-10 -mt-16">
        {/* Header section */}
        <div className="flex flex-col gap-4">
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
        </div>

        {/* Hero image */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
          {project.heroImage ? (
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <>
              {/* Placeholder gradient with abstract shapes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-3/4 h-3/4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-600/40 via-transparent to-gray-500/30 blur-sm" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 rounded-full bg-gradient-to-t from-rose-900/40 via-rose-800/20 to-transparent blur-md" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Stakeholder quote if available */}
        {project.stakeholderQuote && (
          <blockquote className="border-l-4 border-foreground/20 pl-4 italic text-secondary">
            {project.stakeholderQuote}
          </blockquote>
        )}

        {/* Case study content - dynamically render sections that have content */}
        <article className="flex flex-col gap-12 mt-4">
          <ContentSection title="Background" content={project.background} />
          <ContentSection
            title="The Challenge"
            content={project.challengeStatement}
          />
          <ContentSection
            title="Trigger or Insight"
            content={project.triggerOrInsight}
          />
          <ContentSection title="Goals" content={project.goals} />
          <ContentSection title="Constraints" content={project.constraints} />
          <ContentSection title="Methods" content={project.methods} />
          <ContentSection title="Key Findings" content={project.keyFindings} />
          <ContentSection
            title="Early Concepts"
            content={project.earlyConcepts}
          />
          <ContentSection
            title="Design Decisions"
            content={project.designDecisions}
          />
          <ContentSection
            title="UI Principles"
            content={project.uiPrinciples}
          />
          <ContentSection title="Patterns" content={project.patterns} />
          <ContentSection
            title="Testing & Feedback"
            content={project.testingFeedback}
          />
          <ContentSection title="Results" content={project.impactMetrics} />
          <ContentSection
            title="Qualitative Impact"
            content={project.qualitativeImpact}
          />
          <ContentSection title="Learnings" content={project.learnings} />
          <ContentSection
            title="Personal Growth"
            content={project.personalGrowth}
          />
          <ContentSection title="Next Steps" content={project.nextSteps} />
        </article>

        {/* Team section */}
        {project.team && (
          <section className="flex flex-col gap-3 border-t border-foreground/10 pt-8">
            <h2 className="text-lg font-semibold tracking-tight">Team</h2>
            <p className="text-secondary whitespace-pre-line">{project.team}</p>
          </section>
        )}

        {/* Footer spacing */}
        <div className="h-20" />
      </div>
    </PageTransition>
  );
}
