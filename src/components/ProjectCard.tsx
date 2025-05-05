"use client";

import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const ProjectCard = ({ title, description, imageSrc }: ProjectCardProps) => {
  return (
    <Link href={`/projects/${title}`}>
      <div className="flex flex-col justify-between items-center flex-1 bg-gradient-slate rounded-3xl p-6 hover:border-[var(--color-secondary-accent)] transition-colors duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 relative">
            <Image
              src={imageSrc}
              alt={`${title} Logo`}
              fill
              className="rounded-full"
            />
          </div>
          <h3 className="text-xl font-semibold text-neutral-100">{title}</h3>
        </div>

        <p className="text-neutral-300 mb-6 md:text-left text-center">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
