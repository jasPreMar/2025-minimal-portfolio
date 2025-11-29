"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ProjectLinkProps {
  name: string;
  href?: string;
}

export function ProjectLink({ name, href = "#" }: ProjectLinkProps) {
  return (
    <Link
      href={href}
      className="group flex items-center py-1 w-full justify-between sm:w-fit sm:justify-start sm:gap-2"
    >
      <p className="group-hover:underline truncate">{name}</p>
      <div className="flex items-center justify-center w-6 h-6 shrink-0 transition-transform duration-200 group-hover:translate-x-1">
        <ArrowUpRight size={16} strokeWidth={2} />
      </div>
    </Link>
  );
}
