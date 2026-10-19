import Section from "./Section";
import ProjectCard from "./ProjectCard";
// import GithubRepos from "./GithubRepos";
import { projects } from "../data/projects";

function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {/* uncomment this to display GitHub repositories */}
      {/* <GithubRepos /> */}
    </Section>
  );
}

export default Projects;
