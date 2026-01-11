import type { HardcodedProject } from "./chatgpt-app-data";

export const aiPatternLibraryProject: HardcodedProject = {
  slug: "ai-pattern-library",
  title: "AI Pattern Library",
  subtitle: "Unifying AI experiences across CarMax",
  company: "CarMax",
  companyLogo: "/logos/carmax-logo.svg",
  tags: ["AI/ML", "Design Systems", "Figma"],
  featured: false,
  status: "in-flight",
  blocks: [
    {
      type: "hero",
      src: "/projects/ai-pattern-library-hero.png",
      alt: "AI Pattern Library hero image",
    },
    {
      type: "text",
      content:
        "After successfully launching our first AI chatbot, Skye, I was asked by leadership to turn my knowledge of conversational AI interfaces and turn it into a design system. This was because many teams were starting to build AI features into their products as a part of a major strategic initiative to transform our retail experience. Another big initiative was a complete visual and functional overhaul the entire end-to-end retail experience. So I needed to incorporate these new ideas and patterns as well.",
    },
    {
      type: "text",
      content:
        "Overall, my goal with the AI Pattern Library was clear: Deconstruct Skye into a reusable design system aligned with the new brand that makes it easy for other teams to build consistent AI experiences.",
    },
    {
      type: "heading",
      content: "Core Component Library in Figma",
    },
    {
      type: "text",
      content:
        "In just 1 week, I deconstructed the Skye conversational interface into several core, highly customizable components in Figma, that covered all modern chat primitives such as prompt composer, messages, responses, system events, and markdown typesetting. Referencing other patterns such as Vercel's AI Elements was really helpful to make sure I covered all my bases. I worked backward from our base MUI components and styles to keep it cohesive with the rest of our experience.",
    },
    {
      type: "text",
      content:
        "There were many AI capabilities we didn't have yet, such as response streaming and multi-modal input, but I incorporated them into the system anyway to help future-proof us in a fast-changing landscape.",
    },
    {
      type: "imageGrid",
      columns: 1,
      aspectRatio: "intrinsic",
      images: [
        {
          src: "/projects/ai-pattern-library-components.png",
          alt: "A cluster of AI pattern library components",
          objectFit: "contain",
        },
        {
          src: "/projects/ai-pattern-library-variants.png",
          alt: "Variants of one component showing different states",
          objectFit: "contain",
        },
      ],
    },
    {
      type: "heading",
      content: "Interaction Design in Code",
    },
    {
      type: "text",
      content:
        "With the help of Claude Code, I was able to build and demonstrate more complex interaction prototypes in a way that's difficult with static images and callouts in Figma. I used Storybook to demonstrate the components in the browser. This included streaming and rollout, scroll positioning, and voice mode.",
    },
    {
      type: "image",
      src: "/projects/ai-pattern-library-storybook.gif",
      alt: "Screenshots of Storybook component demonstrations including prompt composer interactions",
      objectFit: "contain",
      constrainWidth: true,
    },
    {
      type: "heading",
      content: "Conclusion",
    },
    {
      type: "text",
      content:
        "With the patterns codified, other teams could now design new conversational AI experiences quickly instead of starting from scratch. This enabled one team to design and ship a new associate chat product in just two weeks. This work also created a shared visual and interactive language for AI experiences across the company.",
    },
    {
      type: "text",
      content:
        "The design system reduces the effort required to create new AI surfaces, and provides a consistent, on‑brand foundation for both Skye and other AI work at CarMax. It raised the visual and interaction quality of Skye to match the broader rebrand while also positioning Sky as a platform rather than a one‑off feature.",
    },
  ],
};
