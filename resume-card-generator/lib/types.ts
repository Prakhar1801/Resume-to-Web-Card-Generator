export interface Project {
  title: string
  description: string
}

export interface ResumeData {
  username: string
  fullName: string
  aboutMe: string
  skills: string
  projects: Project[]
  linkedinUrl: string
  githubUrl: string
}
