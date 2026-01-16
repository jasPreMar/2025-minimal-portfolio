// Project-specific verb lists for the shimmer text animation
// Each project gets verbs that reflect the key actions and skills demonstrated

export const skye2Verbs = [
  // Core design work
  "Redesigning",
  "Prototyping",
  "Sketching",
  "Wireframing",
  "Componentizing",
  "Simplifying",
  "Refining",
  "Polishing",
  // Stakeholder & strategy
  "Pitching",
  "Convincing",
  "Evangelizing",
  "Championing",
  "Strategizing",
  // Engineering crossover
  "Coding",
  "Developing",
  "Shipping",
  "Debugging",
  "Refactoring",
  "PRing",
  // Research & iteration
  "Testing",
  "Iterating",
  "Listening",
  "Measuring",
  "Validating",
  // AI/Chat specific
  "Prompting",
  "Streaming",
  "Escalating",
  "De-escalating",
  // Personality
  "Pivoting",
  "Hustling",
  "Unblocking",
  "Wearing many hats",
];

export const aiPatternLibraryVerbs = [
  // Systems thinking
  "Systematizing",
  "Architecting",
  "Abstracting",
  "Standardizing",
  "Unifying",
  "Scaling",
  // Component work
  "Componentizing",
  "Deconstructing",
  "Cataloging",
  "Documenting",
  "Variantizing",
  // Code prototyping
  "Storybooking",
  "Prototyping",
  "Animating",
  "Streaming",
  "Coding",
  // Impact
  "Enabling",
  "Accelerating",
  "Publishing",
  "Shipping",
  // Design system vibes
  "Tokenizing",
  "Theming",
  "Spacing",
  "Aligning",
  "Gridding",
  "Nesting",
  // Personality
  "Obsessing",
  "Nerding out",
  "Pixel pushing",
];

export const chatgptAppVerbs = [
  // Speed & urgency
  "Speedrunning",
  "Sprinting",
  "Moving fast",
  "Racing",
  "Shipping",
  // Opportunity spotting
  "Spotting opportunities",
  "Seizing the moment",
  "Connecting dots",
  "Reading the room",
  // Competitive
  "Beating Carvana",
  "First-moversing",
  "Positioning",
  // Quick mocking
  "Mocking",
  "Frankensteining",
  "Screenshot stealing",
  "CTRL+V-ing",
  // Research & strategy
  "Researching",
  "Interviewing",
  "Analyzing",
  "Strategizing",
  // Adaptation
  "Adapting",
  "Constraining",
  "Reading guidelines",
  "Following specs",
  // Design
  "Designing",
  "Refining",
  "Iterating",
  // Personality
  "Pitching",
  "Persuading",
  "Storytelling",
  "Creating urgency",
];

// Map of project slugs to their verb lists
export const projectVerbsMap: Record<string, string[]> = {
  "skye-2.0": skye2Verbs,
  "ai-pattern-library": aiPatternLibraryVerbs,
  "chatgpt-app": chatgptAppVerbs,
};

// Helper to get verbs for a given path
export function getVerbsForPath(pathname: string): string[] | undefined {
  // Extract project slug from path like /projects/skye-2.0
  const match = pathname.match(/^\/projects\/([^/]+)/);
  if (match) {
    const slug = match[1];
    return projectVerbsMap[slug];
  }
  return undefined;
}
