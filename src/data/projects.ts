import type { Project } from "../types";

export const projects: Project[] = [
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
