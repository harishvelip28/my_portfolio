export interface Social {
  label: string
  url: string
}

export interface Profile {
  name: string
  role: string
  tagline: string
  email: string
  about: string[]
  socials: Social[]
  formEndpoint: string
  githubUsername: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Job {
  role: string
  company: string
  period: string
  points: string[]
}

export interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  live: string
}