import { getAllProjects } from "@/lib/notion";
import { redirect } from "next/navigation";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Generate metadata for SEO
export const metadata = {
  title: "Projects | Jason Marsh",
  description: "A collection of design projects and case studies.",
};

export default async function ProjectsPage() {
  // Fetch all projects and redirect to the first one
  const allProjects = await getAllProjects();
  
  if (allProjects.length > 0) {
    redirect(`/projects/${allProjects[0].slug}`);
  }
  
  // If no projects, redirect to home
  redirect("/");
}

