import { ShimmerText } from "@/components/shimmer-text";
import { ProjectLink } from "@/components/project-link";

const projects = [
  { name: "Skye AI Transformation (v3) - CarMax" },
  { name: "ChatGPT App - CarMax" },
  { name: "Nutritional Agent - Side Project" },
  { name: "Search Transformation - CarMax" },
  { name: "Car Details Page - CarMax" },
  { name: "Skye AI Transformation (v2) - CarMax" },
  { name: "Mail Agent - Side Project" },
  { name: "Skye Design Transformation (v1) - CarMax" },
];

export default function Home() {
  return (
    <main className="max-w-[608px] mx-auto my-[120px] px-8 flex flex-col gap-20">
      {/* Header section */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xl font-semibold tracking-tight">Jason Marsh</h4>
        <ShimmerText />
      </div>

      {/* Projects section */}
      <div className="flex flex-col gap-0">
        {projects.map((project, index) => (
          <ProjectLink key={index} name={project.name} />
        ))}
      </div>
    </main>
  );
}
