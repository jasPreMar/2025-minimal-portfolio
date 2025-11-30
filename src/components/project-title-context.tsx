"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ProjectTitleContextType = {
  title: string | null;
  setTitle: (title: string | null) => void;
};

const ProjectTitleContext = createContext<ProjectTitleContextType>({
  title: null,
  setTitle: () => {},
});

export function ProjectTitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState<string | null>(null);

  return (
    <ProjectTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </ProjectTitleContext.Provider>
  );
}

export function useProjectTitle() {
  return useContext(ProjectTitleContext);
}

// Component to set the title from a server component
export function SetProjectTitle({ title }: { title: string }) {
  const { setTitle } = useProjectTitle();

  useEffect(() => {
    setTitle(title);
    return () => setTitle(null);
  }, [title, setTitle]);

  return null;
}

