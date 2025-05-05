"use client";

import ProjectPageComponent from "@/components/ProjectPage";
import { PROJECTS } from "@/constants/projects";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const { project } = useParams();

  const projectData = PROJECTS.find((p) => p.title === project);

  if (!projectData) {
    return <div>Project not found</div>;
  }

  return <ProjectPageComponent {...projectData} />;
}
