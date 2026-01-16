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
        "After launching CarMax's first **AI chat**, Skye, many teams were starting to build **AI features** into their products. So I created a **design system for conversational AI** with **components in Figma** and **interactive prototypes in code**, so other teams could ship **generative AI** experiences quickly and consistently.",
    },
    {
      type: "heading",
      content: "Core Component Library in Figma",
    },
    {
      type: "text",
      content:
        "In one week I deconstructed our Skye chat interface into core components like input, messages, responses, and chain of thought. I worked backward from our base MUI components and styles to keep it cohesive with the rest of our experience.\n\nThere were many AI capabilities we didn't have yet, such as response streaming and multi-modal input, but I incorporated them into the system anyway so teams would be ready when we added them later.",
    },
    {
      type: "imageGrid",
      columns: 1,
      aspectRatio: "intrinsic",
      images: [
        {
          src: "/projects/ai-pattern-library-components.png",
          alt: "A cluster of components",
          objectFit: "contain",
        },
        {
          src: "/projects/ai-pattern-library-variants.png",
          alt: "Variants of one component",
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
        "I built interactive prototypes in code using Storybook, demonstrating streaming, scroll positioning, and voice mode that static Figma couldn't capture.",
    },
    {
      type: "image",
      src: "/projects/ai-pattern-library-storybook.gif",
      alt: "Screenshots of storybook component gif for prompt composer",
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
        "With this extension to our design system, one team shipped a new AI chat product in two weeks. This work also created a shared visual and interactive language for AI experiences across the company.",
    },
  ],
};
