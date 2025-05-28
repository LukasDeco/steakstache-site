"use client";

import ProjectPageComponent from "@/components/projects/ProjectPage";
import { PROJECTS } from "@/constants/projects";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const { project } = useParams();

  const projectString = Array.isArray(project) ? project[0] : project;

  const projectData = PROJECTS.find(
    (p) => p.title.toLowerCase() === projectString?.toLowerCase()
  );

  if (!projectData) {
    return <div>Project not found</div>;
  }

  return <ProjectPageComponent {...projectData} />;
}
