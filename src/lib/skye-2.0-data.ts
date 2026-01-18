import type { HardcodedProject } from "./chatgpt-app-data";

export const skye2Project: HardcodedProject = {
  slug: "skye-2.0",
  title: "Skye 2.0",
  subtitle: "Reinventing CarMax's Chatbot as an AI Shopping Assistant",
  company: "CarMax",
  companyLogo: "/logos/carmax-logo.svg",
  tags: ["AI/ML", "Design Systems", "Front-end Development"],
  featured: false,
  status: "live",
  blocks: [
    {
      type: "hero",
      src: "/projects/skye-2.0-hero-chat-redesign.png",
      alt: "Skye 2.0 hero image",
    },
    {
      type: "text",
      content:
        "I **redesigned** Skye's UI around **generative AI**, resulting in **30% higher user satisfaction** and **15% fewer escalations**. When I joined the team, our help chat was a limited, deterministic bot with more negative satisfaction ratings than positive. Meanwhile, ChatGPT was taking over. So I made **prototypes** showing what our chat could be with **LLMs**, **pitched the vision**, and got stakeholders on board to rebuild from the ground up.",
    },
    {
      type: "image",
      src: "/projects/skye-2.0-vision-board-week-one.png",
      alt: "A vision board full of ideas that I created during my first week on the team",
      caption: "A vision board full of ideas that I created during my first week on the team.",
    },
    {
      type: "heading",
      content: "Core Chat Components",
    },
    {
      type: "text",
      content:
        "I created a library of chat components such as the Header, User Input, Conversation, and Messages. I focused on simplicity, speed, and directness to contrast with our previous UI, which was cluttered, slow, and obstructive.",
    },
    {
      type: "imageGrid",
      columns: 1,
      aspectRatio: "intrinsic",
      images: [
        {
          src: "/projects/skye-2.0-component-library-overview-1.png",
          alt: "Gallery of chat components",
        },
        {
          src: "/projects/skye-2.0-desktop-chat-ui.png",
          alt: "Desktop view of the new chat UI with core components",
        },
      ],
    },
    {
      type: "heading",
      content: "Snippets & Escalation",
    },
    {
      type: "text",
      content:
        "To answer user questions in the period before we had an AI provider, our lead dev suggested using a capability that matched a question to content on carmax.com. Since the data contained text and a link, I designed two versions: A rich link and a quoted text link similar to what you might find in Apple Messages. We called them Snippets. In anticipation of snippets getting many answers wrong, I designed it to automatically suggested escalation after the snippet was shown.\n\nDe-escalation were broken. They would end automatically after the live agent left, forcing users to lose their chat history. So I designed it so the conversation continued and displayed the connection status in the UI.",
    },
    {
      type: "imageGrid",
      columns: 1,
      aspectRatio: "intrinsic",
      images: [
        {
          src: "/projects/skye-2.0-snippets.png",
          alt: "Chat screenshot with a snippet",
        },
        {
          src: "/projects/skye-2.0-escalation-flow-screens.png",
          alt: "Screens of escalation and de-escalation steps",
        },
      ],
    },
    {
      type: "heading",
      content: "Failure & Turnaround",
    },
    {
      type: "text",
      content:
        "The version we shipped relied on knowledge found on carmax.com, but there wasn't enough content to satisfy most users' questions. The front-end still needed a lot of work, but engineers needed to focus on improving Skye's knowledge. So I stepped in to work on front-end development for a couple of months, bringing the front-end in line with the design and giving our devs a little extra capacity. Our engineers then created our first working POC with LLMs, which fixed everything. I user tested this and shared recordings with stakeholders, which convinced them to partner with Microsoft quickly.",
    },
    {
      type: "image",
      src: "/projects/skye-2.0-github-pr-activity.png",
      alt: "PRs and my Github activity",
      constrainWidth: true,
    },
    {
      type: "heading",
      content: "Feedback & Rating",
    },
    {
      type: "text",
      content:
        "Now that chat responses were generative, it was imperative for me to design a way for users to rate them. It was also time we improved how we measured the user's chat experience. This was to make sure we didn't only define success as cost savings, but also as improvement to the experience. I needed to find the right point in the conversation to prompt for feedback without interrupting flow. It turned out, the answer was not to place it in the conversation at all, but to make it appear when you close the chat — a natural end point. For this, I designed an emoji rating component with subtle motion to increase likelihood of engagement.",
    },
    {
      type: "image",
      src: "/projects/skye-2.0-feedback-sketches.png",
      alt: "Feedback sketches",
      constrainWidth: true,
    },
    {
      type: "image",
      src: "/projects/skye-2.0-feedback-rating-final.png",
      alt: "Gif of prototype for feedback",
      constrainWidth: true,
    },
    {
      type: "heading",
      content: "Inline Components",
    },
    {
      type: "text",
      content:
        "Showing car search results in chat resulted in long bulleted lists that were laborious to read through. To solve this, I designed an inline carousel of car cards. The nice thing about carousels was that they were used all over the site and thus familiar. CSS scroll snap gave us native-feeling behavior without the burden of custom JS.",
    },
    {
      type: "image",
      src: "/projects/skye-2.0-car-carousel-inline.png",
      alt: "Gif of the shopping results carousel",
      caption: "Inline Carousel. One month after designing this, ChatGPT officially announced their Shopping feature, which also landed on using an inline carousel for results, which reinforced that I was on the right track.",
    },
    {
      type: "heading",
      content: "Conclusion",
    },
    {
      type: "text",
      content:
        "The 30% increase in customer satisfaction alone justified an increased investment in AI at CarMax. Meanwhile, live agent chats improved 10%. This indicated that some gains were from the redesign rather than just LLMs. On top of that, there was a 15% improvement in containment compared to 1.0, which meant we both improved the experience and saved the company money.",
    },
  ],
};
