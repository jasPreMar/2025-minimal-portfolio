// Block types for flexible content layout
export type ContentBlock =
  | { type: "hero"; src: string; alt: string }
  | { type: "text"; content: string }
  | { type: "heading"; content: string }
  | { type: "image"; src: string; alt: string; constrainWidth?: boolean; objectFit?: "cover" | "contain" }
  | { type: "imagePair"; images: { src: string; alt: string; objectFit?: "cover" | "contain" }[] }
  | { type: "imageGrid"; images: { src: string; alt: string; colSpan?: number; aspectRatio?: "video" | "square" | "2/1" | "intrinsic"; objectFit?: "cover" | "contain" }[]; columns?: number; aspectRatio?: "video" | "square" | "2/1" | "intrinsic" };

export type HardcodedProject = {
  slug: string;
  title: string;
  subtitle: string;
  company: string;
  companyLogo?: string;
  tags: string[];
  featured?: boolean;
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
  blocks: [
    {
      type: "hero",
      src: "/projects/Chat GPT Hero.png",
      alt: "CarMax ChatGPT App hero image",
    },
    {
      type: "text",
      content:
        "CarMax's AI assistant, Skye, lived only on carmax.com, which meant it had zero presence where shoppers actually spent their time. 6 months prior, I was conceiving of an opportunity for Skye to integrate more closely with the kind of AI assistants that people use every day.",
    },
    {
      type: "image",
      src: "/projects/Personal AI concept.png",
      alt: "Personal AI concept exploration",
      constrainWidth: true,
    },
    {
      type: "text",
      content:
        "OpenAI had spent the year placing big bets on [shopping](https://openai.com/index/chatgpt-shopping-research/) and [buying](https://www.youtube.com/watch?v=C6qcZdtIv54&t=2s) in ChatGPT. And the moment that OpenAI [announced](https://www.youtube.com/watch?v=2C4Cs6503gw&t=7s) ChatGPT Apps, it was clear that we needed to act.",
    },
    {
      type: "text",
      content:
        "My goal was for us to beat our competitor to market. To do this, I needed to make the opportunity as clear as possible to internal stakeholders. Then, I needed to craft a clean, shippable, native-feeling ChatGPT app that stood a high chance of being approved.",
    },
    {
      type: "heading",
      content: "10-Minute Mock",
    },
    {
      type: "text",
      content:
        "Immediately after the announcement ended, I made a mock by patching together pieces of ChatGPT and Spotify app screenshots. It depicted a simple flow that showed a user querying a CarMax app in ChatGPT and engaging with shopping results. While the mock was believable and effective, it was just as important to show that our competitor might beat us to market. So I also mocked an OpenAI co-branded page showing Carvana as a partner. With both of these assets I had the carrot and stick I needed to make a convincing pitch, all in about 10 minutes. It worked — the response was near instant.",
    },
    {
      type: "imageGrid",
      columns: 1,
      aspectRatio: "intrinsic",
      images: [
        { src: "/projects/Mock.png", alt: "Mock of CarMax ChatGPT app" },
        { src: "/projects/Mock OpenAI logos.png", alt: "Mock of OpenAI partner logos including competitor" },
      ],
    },
    {
      type: "heading",
      content: "Adapting to ChatGPT's Constraints",
    },
    {
      type: "text",
      content:
        "Several weeks later, stakeholders were aligned and the decision was made to build the app. Immediately, I looked to refine the design to make building it as straightforward as possible. I read through the UX and UI guides on OpenAI's site, which confirmed that it was important that the app feels native. Crucially, this helped me convince stakeholders that the design details were important. Then, using components from CarMax's official Figma file, I refined the design and created both MVP and final versions, allowing engineers to ship incrementally.",
    },
    {
      type: "text",
      content:
        "1. Two MVP flows — one with an inline card for a single car, and another with an inline carousel for multiple cars — that opened an in-app browser on tap. This meant we could start by building only the inline elements, and not the full page views (yet).",
    },
    {
      type: "image",
      src: "/projects/MVP1.png",
      alt: "MVP design showing single and multi-car inline flows",
    },
    {
      type: "text",
      content:
        "2. Two fuller flows. These started the same with inline cards and carousels, but including a full screen view inside the app. After sharing it with my 2 devs, they wanted to see what it would look like to be able to switch between multiple cars in the fullscreen view too. It was a great idea, so I made one more addition to the multi-car variant of the full screen view.",
    },
    {
      type: "imageGrid",
      columns: 1,
      aspectRatio: "intrinsic",
      images: [
        { src: "/projects/Single car.png", alt: "Single car design" },
        { src: "/projects/Multi-car.png", alt: "Multi-car design" },
        { src: "/projects/Desktop.png", alt: "Desktop design" },
      ],
    },
    {
      type: "heading",
      content: "Conclusion",
    },
    {
      type: "text",
      content:
        "Our MVP version of the app is now being shipped and designs are ready for engineers to build an improved experience in the following weeks. In the end, this was a successful exercise in taking decisive action, influencing the business, and moving fast while still focusing on craft and quality. Now we stand a chance to have an early mover advantage with one of the first car shopping apps in ChatGPT. And we'll need to move even faster to keep pace with ChatGPT's own internal shopping marketplace ambitions.",
    },
  ],
};
