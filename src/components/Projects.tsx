import Section from "./Section";
import ProjectCard from "./ProjectCard";
import GithubRepos from "./GithubRepos";
import { projects } from "../data/projects";
import Reveal from "./Reveal";

function Projects() {
  return (
    <Section id="projects" title="Projects" reveal={false}>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal
            key={project.title}
            delay={(index % 2) * 100}
            className="h-full"
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {/* uncomment this to display GitHub repositories */}
      <GithubRepos />
    </Section>
  );
}

export default Projects;
