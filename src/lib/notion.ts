import { Client } from "@notionhq/client";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID!;

// Types for Notion API responses
type RichTextItem = {
  plain_text: string;
};

type MultiSelectItem = {
  name: string;
  color: string;
};

type FileItem = {
  type: "file" | "external";
  file?: { url: string };
  external?: { url: string };
  name: string;
};

type NotionDate = {
  start: string;
  end: string | null;
};

type SelectItem = {
  name: string;
  color: string;
};

type NotionProperties = {
  "Project Name": { title: RichTextItem[] };
  Company: { rich_text: RichTextItem[] };
  "Company Logo": { files: FileItem[] };
  "Hero Image": { files: FileItem[] };
  "Keywords / Tags": { multi_select: MultiSelectItem[] };
  "Start/End": { date: NotionDate | null };
  Duration: { formula: { string: string } };
  Status: { status: { name: string } | null };
  "Project type": { select: SelectItem | null };
  Role: { rich_text: RichTextItem[] };
  Team: { rich_text: RichTextItem[] };
  Featured: { checkbox: boolean };
  Background: { rich_text: RichTextItem[] };
  "Challenge Statement": { rich_text: RichTextItem[] };
  "Trigger or Insight": { rich_text: RichTextItem[] };
  Goals: { rich_text: RichTextItem[] };
  Constraints: { rich_text: RichTextItem[] };
  Methods: { rich_text: RichTextItem[] };
  "Key Findings": { rich_text: RichTextItem[] };
  "Early Concepts": { rich_text: RichTextItem[] };
  "Design Decisions": { rich_text: RichTextItem[] };
  "Testing + Feedback": { rich_text: RichTextItem[] };
  Learnings: { rich_text: RichTextItem[] };
  "Impact Metrics": { rich_text: RichTextItem[] };
  "Qualitative Impact": { rich_text: RichTextItem[] };
  "One-Line Summary": { rich_text: RichTextItem[] };
  "Subtitle / Tagline": { rich_text: RichTextItem[] };
  "Pain Points": { rich_text: RichTextItem[] };
  "Personas / Segments": { rich_text: RichTextItem[] };
  "Patterns / Components": { rich_text: RichTextItem[] };
  "UI Principles / Aesthetic": { rich_text: RichTextItem[] };
  "Stakeholder Quote": { rich_text: RichTextItem[] };
  "Next Steps": { rich_text: RichTextItem[] };
  "Personal Growth": { rich_text: RichTextItem[] };
  Video: { url: string | null };
  Prototype: { url: string | null };
  "Process Images": { files: FileItem[] };
  "Final Screens": { files: FileItem[] };
};

// Helper to extract plain text from rich text array
function getRichText(richText: RichTextItem[] | undefined): string {
  if (!richText || richText.length === 0) return "";
  return richText.map((item) => item.plain_text).join("");
}

// Helper to get file URL from Notion file object
function getFileUrl(files: FileItem[] | undefined): string | null {
  if (!files || files.length === 0) return null;
  const file = files[0];
  if (file.type === "file" && file.file) {
    return file.file.url;
  }
  if (file.type === "external" && file.external) {
    return file.external.url;
  }
  return null;
}

// Helper to get all file URLs
function getAllFileUrls(files: FileItem[] | undefined): string[] {
  if (!files || files.length === 0) return [];
  return files
    .map((file) => {
      if (file.type === "file" && file.file) return file.file.url;
      if (file.type === "external" && file.external) return file.external.url;
      return null;
    })
    .filter((url): url is string => url !== null);
}

// Generate URL slug from project name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Format date for display
function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Project type values
export type ProjectType = "Project" | "Side Project";

// Project type that matches our website structure
export type NotionProject = {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo: string | null;
  heroImage: string | null;
  tags: string[];
  startDate: string;
  endDate: string | null;
  duration: string;
  status: string;
  projectType: ProjectType;
  role: string;
  team: string;
  featured: boolean;
  
  // Content fields
  background: string;
  challengeStatement: string;
  triggerOrInsight: string;
  goals: string;
  constraints: string;
  methods: string;
  keyFindings: string;
  earlyConcepts: string;
  designDecisions: string;
  testingFeedback: string;
  learnings: string;
  impactMetrics: string;
  qualitativeImpact: string;
  summary: string;
  subtitle: string;
  painPoints: string;
  personas: string;
  patterns: string;
  uiPrinciples: string;
  stakeholderQuote: string;
  nextSteps: string;
  personalGrowth: string;
  
  // Media
  videoUrl: string | null;
  prototypeUrl: string | null;
  processImages: string[];
  finalScreens: string[];
  
  // Page content (blocks) - populated separately
  pageContent: NotionBlock[];
};

// Block types for page content
export type NotionBlock = {
  id: string;
  type: string;
  content: string;
  children?: NotionBlock[];
};

// Parse a Notion page into our project structure
function parseNotionPage(page: {
  id: string;
  properties: NotionProperties;
}): NotionProject {
  const props = page.properties;

  return {
    id: page.id,
    slug: generateSlug(getRichText(props["Project Name"]?.title)),
    title: getRichText(props["Project Name"]?.title),
    company: getRichText(props["Company"]?.rich_text),
    companyLogo: getFileUrl(props["Company Logo"]?.files),
    heroImage: getFileUrl(props["Hero Image"]?.files),
    tags: props["Keywords / Tags"]?.multi_select?.map((tag) => tag.name) || [],
    startDate: formatDate(props["Start/End"]?.date?.start || null),
    endDate: formatDate(props["Start/End"]?.date?.end || null),
    duration: props["Duration"]?.formula?.string || "",
    status: props["Status"]?.status?.name || "Draft",
    projectType: (props["Project type"]?.select?.name as ProjectType) || "Project",
    role: getRichText(props["Role"]?.rich_text),
    team: getRichText(props["Team"]?.rich_text),
    featured: props["Featured"]?.checkbox || false,

    // Content
    background: getRichText(props["Background"]?.rich_text),
    challengeStatement: getRichText(props["Challenge Statement"]?.rich_text),
    triggerOrInsight: getRichText(props["Trigger or Insight"]?.rich_text),
    goals: getRichText(props["Goals"]?.rich_text),
    constraints: getRichText(props["Constraints"]?.rich_text),
    methods: getRichText(props["Methods"]?.rich_text),
    keyFindings: getRichText(props["Key Findings"]?.rich_text),
    earlyConcepts: getRichText(props["Early Concepts"]?.rich_text),
    designDecisions: getRichText(props["Design Decisions"]?.rich_text),
    testingFeedback: getRichText(props["Testing + Feedback"]?.rich_text),
    learnings: getRichText(props["Learnings"]?.rich_text),
    impactMetrics: getRichText(props["Impact Metrics"]?.rich_text),
    qualitativeImpact: getRichText(props["Qualitative Impact"]?.rich_text),
    summary: getRichText(props["One-Line Summary"]?.rich_text),
    subtitle: getRichText(props["Subtitle / Tagline"]?.rich_text),
    painPoints: getRichText(props["Pain Points"]?.rich_text),
    personas: getRichText(props["Personas / Segments"]?.rich_text),
    patterns: getRichText(props["Patterns / Components"]?.rich_text),
    uiPrinciples: getRichText(props["UI Principles / Aesthetic"]?.rich_text),
    stakeholderQuote: getRichText(props["Stakeholder Quote"]?.rich_text),
    nextSteps: getRichText(props["Next Steps"]?.rich_text),
    personalGrowth: getRichText(props["Personal Growth"]?.rich_text),

    // Media
    videoUrl: props["Video"]?.url || null,
    prototypeUrl: props["Prototype"]?.url || null,
    processImages: getAllFileUrls(props["Process Images"]?.files),
    finalScreens: getAllFileUrls(props["Final Screens"]?.files),

    // Will be populated separately
    pageContent: [],
  };
}

// Parse block content from Notion
function parseBlockContent(block: { type: string; [key: string]: unknown }): string {
  const blockType = block.type;
  const blockData = block[blockType] as { rich_text?: RichTextItem[] } | undefined;
  
  if (blockData?.rich_text) {
    return getRichText(blockData.rich_text);
  }
  return "";
}

// Status options for filtering
export type ProjectStatus = "Not started" | "Draft" | "Ready" | "Live" | "Rejected";

// Check if we're in production (Vercel sets this)
const isProduction = process.env.NODE_ENV === "production" && process.env.VERCEL_ENV === "production";

// Options for fetching projects
type GetProjectsOptions = {
  // Override the automatic environment-based filtering
  forceProduction?: boolean;
};

// Fetch all projects from the database
export async function getAllProjects(
  options: GetProjectsOptions = {}
): Promise<NotionProject[]> {
  const pages: NotionProject[] = [];
  let cursor: string | undefined = undefined;

  // Determine if we should use production filtering
  const useProductionFilter = options.forceProduction || isProduction;

  do {
    const response = await notion.search({
      filter: { property: "object", value: "page" },
      page_size: 100,
      start_cursor: cursor,
    });

    // Filter to only pages from our database
    const normalizedDbId = databaseId.replace(/-/g, "");
    const dbPages = response.results.filter((page) => {
      if (page.object !== "page" || !("parent" in page)) return false;
      const parent = page.parent as { database_id?: string };
      const parentDbId = parent.database_id?.replace(/-/g, "");
      return parentDbId === normalizedDbId;
    });

    for (const page of dbPages) {
      if ("properties" in page) {
        const project = parseNotionPage(
          page as unknown as { id: string; properties: NotionProperties }
        );

        // Filter by status based on environment:
        // Production: only "Live" projects
        // Development: exclude "Not started" and "Rejected" (show "Draft", "Ready", and "Live")
        let includeProject = false;
        
        if (useProductionFilter) {
          // Production: only show "Live" projects
          includeProject = project.status === "Live";
        } else {
          // Development: show everything except "Not started" and "Rejected"
          includeProject = !["Not started", "Rejected"].includes(project.status);
        }

        if (includeProject && project.title) {
          pages.push(project);
        }
      }
    }

    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  // Sort by start date (newest first)
  return pages.sort((a, b) => {
    const dateA = new Date(a.startDate || 0);
    const dateB = new Date(b.startDate || 0);
    return dateB.getTime() - dateA.getTime();
  });
}

// Fetch a single project by slug
export async function getProjectBySlug(
  slug: string,
  options: GetProjectsOptions = {}
): Promise<NotionProject | null> {
  // Use the same environment-based filtering as getAllProjects
  const allProjects = await getAllProjects(options);
  const project = allProjects.find((p) => p.slug === slug);
  
  if (!project) return null;

  // Fetch the page content (blocks) if any exist
  project.pageContent = await getPageContent(project.id);
  
  return project;
}

// Fetch the content blocks of a page
export async function getPageContent(pageId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
      start_cursor: cursor,
    });

    for (const block of response.results) {
      if ("type" in block) {
        const notionBlock: NotionBlock = {
          id: block.id,
          type: block.type,
          content: parseBlockContent(block as { type: string; [key: string]: unknown }),
        };

        // Recursively fetch children if block has them
        if ("has_children" in block && block.has_children) {
          notionBlock.children = await getPageContent(block.id);
        }

        blocks.push(notionBlock);
      }
    }

    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return blocks;
}

// Get all project slugs for static generation
export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getAllProjects();
  return projects.map((p) => p.slug);
}

// Get featured projects
export async function getFeaturedProjects(): Promise<NotionProject[]> {
  const projects = await getAllProjects();
  return projects.filter((p) => p.featured);
}

