import type { Project } from "../types";

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "This site: a responsive, accessible portfolio built with React and TypeScript, with theme switching, routed project pages, automated tests and CI.",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "React Router",
      "Vitest",
    ],
    github: "https://github.com/harishvelip28/my_portfolio",
    live: "https://my-portfolio-ruby-psi-83.vercel.app/",
    slug: "portfolio-website",
    highlights: [
      "Light and dark theme that follows the system setting and remembers the visitor’s choice",
      "Project pages at /projects/:slug, lazy-loaded, with per-page titles, a 404 page and an error boundary",
      "Typed content in src/data, so updating jobs, skills or projects never touches a component",
      "Tests for components, hooks and the real route table, plus an automated accessibility scan",
      "GitHub Actions runs lint, type checks, tests and the build on every push, with deploys on Vercel",
    ],
  },
  {
    title: "Cricket Auction Web App",
    description:
      "An AI-assisted cricket auction application that automates player valuation and manages the auction flow.",
    tech: ["React", "Tailwind CSS", "AI"],
    github: "https://github.com/harishvelip28/spl-auction",
    live: "https://spl-auction2.vercel.app/",
    slug: "cricket-auction",
    highlights: [
      "AI-assisted automated player valuation",
      "Auction flow management built in React",
    ],
  },
  {
    title: "Library Management System",
    description:
      "A simple book management system with a full MEAN stack: add, update, search and delete books.",
    tech: ["MongoDB", "Express", "Angular", "Node.js"],
    github: "",
    live: "",
    slug: "library-management",
    highlights: [
      "Full MEAN stack: MongoDB, Express, Angular and Node.js",
      "Add, update, search and delete books",
    ],
  },
];
