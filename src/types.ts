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

export type Theme = 'light' | 'dark'

export type FetchStatus = 'loading' | 'success' | 'error'
export interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics?: string[]
  fork: boolean
  archived: boolean
}

export type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export interface ContactFormData {
  name: string
  email: string
  message: string
}