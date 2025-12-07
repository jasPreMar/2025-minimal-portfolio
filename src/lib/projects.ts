// Shared project data
export const projectData = {
  "skye-ai-v3": {
    title: "Skye AI Transformation (v3)",
    company: "CarMax",
    logo: "/logos/carmax-logo.svg",
    author: "Jason Marsh",
    date: "Nov 15, 2024",
    views: "2,847",
    tags: ["AI/ML", "Voice UI", "Design System"],
    heroImages: ["/projects/skye-v3-hero.jpg"],
    description:
      "A look at how conversational AI can transform the car-buying experience, why natural language interfaces feel more intuitive, and when each interaction pattern should appear to guide users through complex decisions.",
    content: {
      overview: `The third iteration of Skye represents a fundamental shift in how we approach AI-assisted car shopping. Rather than treating AI as a feature bolted onto an existing experience, we redesigned the entire journey around natural conversation.

This case study explores the design decisions, user research insights, and technical constraints that shaped the final product.`,
      challenge: `CarMax customers were spending an average of 45 minutes browsing inventory before engaging with a sales associate. The existing search and filter paradigm, while functional, created friction for users who didn't know exactly what they wanted.

Our challenge was clear: could we create an AI experience that felt as natural as talking to a knowledgeable friend, while still respecting the complexity of a major purchase decision?`,
      process: `We began with extensive user interviews, speaking with over 200 customers across different demographics and car-buying stages. Three key insights emerged:

1. **Trust is earned through transparency.** Users wanted to understand why the AI was making certain recommendations. Black-box suggestions felt manipulative.

2. **Context is king.** A user searching for a "safe family car" has different needs than one looking for a "fun weekend convertible." The AI needed to understand these nuances.

3. **Speed matters.** Users weren't willing to engage in long, chatty conversations. They wanted efficient, targeted help.`,
      solution: `The final design introduced three key innovations:

**Adaptive Response Modes**: Skye automatically detects user intent and switches between conversational and transactional modes. A question like "show me blue sedans under 25k" triggers a quick filter response, while "I'm not sure what kind of car would fit my family" initiates a guided discovery flow.

**Reasoning Cards**: Every AI recommendation includes a collapsible "Why this?" card explaining the logic. Users can see which of their stated preferences influenced the suggestion and adjust accordingly.

**Progressive Disclosure**: Rather than overwhelming users with options, Skye presents information in digestible chunks, only revealing complexity when users signal readiness.`,
      results: `Post-launch metrics exceeded expectations:

- **32% reduction** in time-to-first-engagement with sales team
- **47% increase** in customer satisfaction scores
- **28% improvement** in inventory match accuracy
- **4.6/5** average rating for AI helpfulness

Perhaps most tellingly, 67% of users who interacted with Skye v3 returned to use it again on subsequent visits—a strong signal that the experience created genuine value rather than novelty friction.`,
      reflection: `Building Skye v3 taught us that AI design isn't about making technology invisible—it's about making it trustworthy. Users don't want AI that pretends to be human; they want AI that's honest about its capabilities and limitations.

The most successful interactions were those where Skye acknowledged uncertainty: "I'm not sure I fully understand your needs yet. Can you tell me more about..." This vulnerability, counterintuitively, increased user trust.

Looking ahead, we're exploring how these principles might extend to other high-consideration purchases and complex decision-making scenarios.`,
    },
  },
  "chatgpt-app": {
    title: "ChatGPT App",
    company: "CarMax",
    logo: "/logos/carmax-logo.svg",
    author: "Jason Marsh",
    date: "Aug 22, 2024",
    views: "1,923",
    tags: ["Mobile", "AI/ML", "iOS"],
    heroImages: ["/projects/chatgpt-hero.jpg"],
    description:
      "Designing a native ChatGPT integration for the CarMax mobile app, balancing powerful AI capabilities with the simplicity users expect from a car shopping experience.",
    content: {
      overview: `When OpenAI opened their API to enterprise partners, CarMax saw an opportunity to bring conversational AI directly into our mobile app. This project explored how to integrate ChatGPT's capabilities while maintaining brand consistency and user trust.`,
      challenge: `Mobile presented unique constraints: limited screen real estate, interrupted attention spans, and the expectation of quick, tap-friendly interactions. How could we deliver a rich conversational experience without fighting against mobile UI conventions?`,
      process: `We prototyped over 50 different integration points, testing them with users in our lab. We found that users preferred AI assistance that was context-aware—appearing when they were stuck or comparing options—rather than a always-on floating button.`,
      solution: `The final design embeds AI suggestions throughout the browsing experience rather than siloing them in a separate chat interface. Users see relevant prompts like "Ask about this car's maintenance history" or "Compare with similar vehicles" at decision points.`,
      results: `The integration achieved strong adoption with 41% of mobile users engaging with AI features within the first month. Task completion rates improved 23% compared to the control group.`,
      reflection: `Mobile AI design requires thinking about conversation as a complement to, not replacement for, direct manipulation. The best mobile AI experiences feel like a helpful companion, not a separate destination.`,
    },
  },
  "nutritional-agent": {
    title: "Nutritional Agent",
    company: "Side Project",
    author: "Jason Marsh",
    date: "Jan 10, 2024",
    views: "892",
    tags: ["AI/ML", "Health", "Side Project"],
    heroImages: ["/projects/nutritional-agent-hero.jpg"],
    description:
      "A personal project exploring how AI can help users make better nutritional decisions through conversational interfaces.",
    content: {
      overview: `This side project explores the intersection of AI and personal health, focusing on how conversational agents can make nutritional guidance more accessible and personalized.`,
      challenge: `Nutritional advice is often confusing, contradictory, and hard to apply to daily life. Can AI bridge the gap between scientific recommendations and what's on your plate?`,
      process: `I built this as a personal exploration of AI capabilities, iterating on different interaction patterns and information architectures.`,
      solution: `The agent uses natural language to understand user goals and provides tailored nutritional guidance with explanations.`,
      results: `This project helped me understand the nuances of health-related AI interactions and the importance of transparency in recommendations.`,
      reflection: `Building this as a side project gave me the freedom to experiment with different approaches without the constraints of a production environment.`,
    },
  },
  "search-transformation": {
    title: "Search Transformation",
    company: "CarMax",
    logo: "/logos/carmax-logo.svg",
    author: "Jason Marsh",
    date: "Mar 5, 2024",
    views: "3,421",
    tags: ["Search", "UX", "Design System"],
    heroImages: ["/projects/search-transformation-hero.jpg"],
    description:
      "Redesigning the search experience to help users find their perfect car faster and more intuitively.",
    content: {
      overview: `The search transformation project focused on making car discovery more intuitive and efficient for CarMax customers.`,
      challenge: `Users were struggling to find specific vehicle configurations due to a complex and outdated filter system.`,
      process: `We conducted extensive user research to understand search behavior and mental models around car shopping.`,
      solution: `The new search experience uses progressive disclosure, smart defaults, and visual filtering to guide users naturally.`,
      results: `Search completion rates improved by 35% and time-to-find decreased by 28%.`,
      reflection: `This project reinforced the importance of understanding user mental models before designing search experiences.`,
    },
  },
  "car-details": {
    title: "Car Details Page",
    company: "CarMax",
    logo: "/logos/carmax-logo.svg",
    author: "Jason Marsh",
    date: "Feb 12, 2024",
    views: "2,156",
    tags: ["Product Page", "E-commerce", "UX"],
    heroImages: ["/projects/car-details-hero.jpg"],
    description:
      "Redesigning the car details page to better communicate vehicle information and build trust with potential buyers.",
    content: {
      overview: `The car details page is one of the most critical touchpoints in the car-buying journey. This redesign focused on clarity, trust, and action.`,
      challenge: `The previous page was cluttered and information-dense, making it hard for users to find key details about vehicle condition and history.`,
      process: `We analyzed user behavior, conducted A/B tests, and iterated on information hierarchy and visual presentation.`,
      solution: `The new design uses clear sections, high-quality imagery, and strategic placement of key information to build confidence.`,
      results: `Engagement with key information increased by 42% and conversion to next steps improved by 19%.`,
      reflection: `Information architecture is just as important as visual design when it comes to complex product pages.`,
    },
  },
  "skye-ai-v2": {
    title: "Skye AI Transformation (v2)",
    company: "CarMax",
    logo: "/logos/carmax-logo.svg",
    author: "Jason Marsh",
    date: "Jun 20, 2023",
    views: "1,654",
    tags: ["AI/ML", "Voice UI", "Design System"],
    heroImages: ["/projects/skye-v2-hero.jpg"],
    description:
      "The second iteration of Skye AI, focusing on improving conversation quality and user trust.",
    content: {
      overview: `Skye v2 built upon the foundation of v1, with a focus on improving conversation quality and building user trust in AI recommendations.`,
      challenge: `While v1 was functional, users often felt the interactions were robotic and lacked depth.`,
      process: `We analyzed conversation logs, conducted user interviews, and prototyped different approaches to transparency and explanation.`,
      solution: `Version 2 introduced clearer reasoning explanations and better handling of uncertainty in AI responses.`,
      results: `User trust scores increased by 31% and recommendation acceptance rates improved by 24%.`,
      reflection: `This version taught us that AI transparency isn't just about showing data—it's about explaining reasoning in human terms.`,
    },
  },
  "mail-agent": {
    title: "Mail Agent",
    company: "Side Project",
    author: "Jason Marsh",
    date: "Dec 3, 2023",
    views: "567",
    tags: ["AI/ML", "Productivity", "Side Project"],
    heroImages: ["/projects/mail-agent-hero.jpg"],
    description:
      "A personal project exploring how AI can help manage and prioritize email more effectively.",
    content: {
      overview: `Mail Agent is a side project that uses AI to help users manage their email more effectively through intelligent prioritization and summarization.`,
      challenge: `Email overload is a common problem. Can AI help users focus on what matters most?`,
      process: `I built this as an experiment in applying AI to productivity tools, iterating on different approaches to email management.`,
      solution: `The agent learns user preferences and provides smart summaries and prioritization suggestions.`,
      results: `This project was a valuable learning experience in building AI-powered productivity tools.`,
      reflection: `Personal projects are great for exploring new ideas without the constraints of production requirements.`,
    },
  },
  "skye-design-v1": {
    title: "Skye Design Transformation (v1)",
    company: "CarMax",
    logo: "/logos/carmax-logo.svg",
    author: "Jason Marsh",
    date: "Apr 15, 2023",
    views: "2,389",
    tags: ["AI/ML", "Design System", "Voice UI"],
    heroImages: ["/projects/skye-v1-hero.jpg"],
    description:
      "The initial design and launch of Skye AI, CarMax's conversational AI assistant for car shopping.",
    content: {
      overview: `Skye v1 was the first iteration of CarMax's conversational AI assistant, introducing natural language interaction to the car shopping experience.`,
      challenge: `Designing a conversational interface from scratch for a traditional e-commerce platform.`,
      process: `We started with extensive research into conversational interfaces and user expectations for AI assistants in e-commerce.`,
      solution: `The first version focused on core conversational capabilities and establishing a friendly, helpful personality for Skye.`,
      results: `Initial launch saw strong user engagement with 58% of users trying the feature and positive feedback on the conversational experience.`,
      reflection: `Launching v1 taught us the importance of starting simple and building complexity based on real user feedback.`,
    },
  },
};

export type ProjectSlug = keyof typeof projectData;
export type Project = typeof projectData[ProjectSlug];

export function getProjectBySlug(slug: string): Project | undefined {
  return projectData[slug as ProjectSlug];
}

export function getProjectTitle(slug: string): string | undefined {
  return projectData[slug as ProjectSlug]?.title;
}

