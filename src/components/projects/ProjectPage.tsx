"use client";

import { StakeWithUsSection } from "../staking/StakeWithUsSection";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";

interface ProjectPageProps {
  title: string;
  description: string;
  imageSrc: string;
  githubUrl?: string;
}

interface RepoData {
  readme?: string;
  languages?: { [key: string]: number };
}

const ProjectPage = ({
  title,
  description,
  imageSrc,
  githubUrl,
}: ProjectPageProps) => {
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGithubData = async () => {
      if (!githubUrl) return;

      setLoading(true);
      try {
        // Extract owner and repo from GitHub URL
        const [owner, repo] = githubUrl
          .replace("https://github.com/", "")
          .split("/");

        // Fetch README and languages in parallel
        const [readmeRes, languagesRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${owner}/${repo}/readme`),
          fetch(`https://api.github.com/repos/${owner}/${repo}/languages`),
        ]);

        const readmeData = await readmeRes.json();
        const languages = await languagesRes.json();

        setRepoData({
          readme: Buffer.from(readmeData.content, "base64").toString("utf-8"), // Decode base64 README content
          languages,
        });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [githubUrl]);

  return (
    <div className="flex flex-col justify-between items-center flex-1 bg-gradient-slate py-6 px-8 sm:px-20 hover:border-[var(--color-secondary-accent)] transition-colors duration-300">
      <div className="flex flex-col items-center gap-4 mb-4">
        <div className="w-[200px] h-[200px] relative">
          <Image
            src={imageSrc}
            alt={`${title} Logo`}
            fill
            className="rounded-3xl"
          />
        </div>
        <h3 className="text-xl font-semibold text-neutral-100">{title}</h3>
      </div>

      <p className="text-neutral-300 mb-6 md:text-left text-center">
        {description}
      </p>

      {githubUrl && (
        <div className="w-full">
          {loading ? (
            <Skeleton className="h-20 w-full rounded-xl" />
          ) : (
            <>
              <h4 className="text-3xl font-medium text-neutral-100 mb-4">
                README:
              </h4>
              <div className="mb-4">
                {repoData?.readme && (
                  <div className="text-sm text-neutral-300 overflow-y-auto prose prose-invert markdown-display">
                    <ReactMarkdown remarkPlugins={[remarkGemoji, remarkGfm]}>
                      {repoData.readme + " \n\n..."}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-medium text-neutral-100 mb-4">
                  Languages:
                </h4>
                {repoData?.languages && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.keys(repoData.languages).map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-1 bg-[var(--color-primary-neon)] rounded-full text-xs text-neutral-100"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    "px-3 py-2 text-neutral-100 text-sm cursor-pointer bg-neutral-800 rounded-md transition-colors duration-300 ease-in-out text-center flex items-center justify-center"
                  }
                >
                  View on GitHub
                </a>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(`git clone ${githubUrl}.git`);
                  }}
                  className="px-3 py-2 text-[var(--color-primary-neon)] bg-neutral-800 rounded-md text-sm  hover:bg-neutral-700"
                >
                  Copy Clone URL
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      <StakeWithUsSection
        title="Support Our Work"
        description="If you find this project helpful, consider staking with us to support continued development."
        cta="Stake now"
      />
    </div>
  );
};

export default ProjectPage;
