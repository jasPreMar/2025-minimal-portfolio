// Block types for flexible content layout
export type ContentBlock =
  | { type: "hero"; src: string; alt: string }
  | { type: "text"; content: string }
  | { type: "heading"; content: string }
  | { type: "image"; src: string; alt: string; constrainWidth?: boolean; objectFit?: "cover" | "contain"; caption?: string }
  | { type: "imagePair"; images: { src: string; alt: string; objectFit?: "cover" | "contain" }[] }
  | { type: "imageGrid"; images: { src: string; alt: string; colSpan?: number; aspectRatio?: "video" | "square" | "2/1" | "intrinsic"; objectFit?: "cover" | "contain" }[]; columns?: number; aspectRatio?: "video" | "square" | "2/1" | "intrinsic"; constrainWidth?: boolean };

export type HardcodedProject = {
  slug: string;
  title: string;
  subtitle: string;
  company: string;
  companyLogo?: string;
  tags: string[];
  featured?: boolean;
  status?: "live" | "in-flight" | "tested" | "shipped";
  blocks: ContentBlock[];
};

export const chatgptAppProject: HardcodedProject = {
  slug: "chatgpt-app",
  title: "CarMax ChatGPT App",
  subtitle: "An AI-Native Car Shopping Experience",
  company: "CarMax",
  companyLogo: "/logos/carmax-logo.svg",
  tags: ["AI/ML", "Mobile", "Product Strategy"],
  featured: false,
  status: "shipped",
  blocks: [
    {
      type: "hero",
      src: "/projects/Chat GPT Hero.png",
      alt: "CarMax ChatGPT App hero image",
    },
    {
      type: "text",
      content:
        "In 2025, CarMax made a big bet on **AI** to assist customers in shopping for cars. Our only solution was in-house, not where shoppers actually spend time. Since more and more people use **ChatGPT** for all kinds of things, I ran **user research** to test car shopping with it.\n\n1. Everybody was surprised by how much they loved it.\n2. It was incomplete.\n\nSo the very day that OpenAI [announced](https://www.youtube.com/watch?v=2C4Cs6503gw&t=7s) the **ChatGPT Apps** platform, I **identified the opportunity** and moved fast: beat Carvana to the **AI-native** market.",
    },
    {
      type: "heading",
      content: "10-Minute Mock",
    },
    {
      type: "text",
      content:
        "Immediately after the announcement, I patched together an app mock from screenshots of ChatGPT and Spotify's app. Then I mocked a fake OpenAI co-branded page showing Carvana as a partner to show that our competitor might beat us to market. I sent both assets up the chain (along with a clarification that it wasn't a real partnership).",
    },
    {
      type: "imageGrid",
      columns: 1,
      constrainWidth: true,
      images: [
        { src: "/projects/Mock ChatGPT app.png", alt: "Mock of ChatGPT app" },
        { src: "/projects/Mock OpenAI logos.png", alt: "Mock of OpenAI logos" },
      ],
    },
    {
      type: "heading",
      content: "Adapting to ChatGPT's Constraints",
    },
    {
      type: "text",
      content:
        "A few weeks later, I was added to a team to sprint on building the app. I started by reading OpenAI's design guidelines. It confirmed the importance of the app feeling like a native part of ChatGPT. Then, using components from CarMax's official Figma file, I refined the design and created both MVP and final versions, allowing engineers to ship incrementally.",
    },
    {
      type: "imageGrid",
      columns: 1,
      aspectRatio: "intrinsic",
      constrainWidth: true,
      images: [
        { src: "/projects/kmx-chatgpt-components.png", alt: "ChatGPT app components" },
        { src: "/projects/kmx-chatgpt-01.png", alt: "ChatGPT app design 1" },
        { src: "/projects/kmx-chatgpt-02.png", alt: "ChatGPT app design 2" },
        { src: "/projects/kmx-chatgpt-03.png", alt: "ChatGPT app design 3" },
        { src: "/projects/kmx-chatgpt-04.png", alt: "ChatGPT app design 4" },
        { src: "/projects/kmx-chatgpt-05.png", alt: "ChatGPT app design 5" },
      ],
    },
    {
      type: "heading",
      content: "Conclusion",
    },
    {
      type: "text",
      content:
        "I positioned CarMax to be the first car shopping app in ChatGPT by moving fast on mocks and specs.",
    },
  ],
};
