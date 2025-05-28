"use client";

import { StakeWithUsSection } from "../staking/StakeWithUsSection";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "@/constants/projects";

const ProjectSection = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[var(--color-charcoal)] mb-12 text-center">
            <span className="text-[var(--color-primary-neon)] mr-1">{"{"}</span>
            Our Projects
            <span className="text-[var(--color-primary-neon)] ml-1">{"}"}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <StakeWithUsSection
        title="Support our work"
        description="Like what we're building? Support us by staking with the SteakStache validator."
      />
    </div>
  );
};

export default ProjectSection;
