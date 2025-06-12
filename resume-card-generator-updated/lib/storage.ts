"use client"

import type { ResumeData } from "./types"

const STORAGE_KEY = "resume-web-cards"

// Save resume data to local storage
export function saveResumeData(data: ResumeData): void {
  if (typeof window === "undefined") return

  try {
    // Get existing data
    const existingDataStr = localStorage.getItem(STORAGE_KEY)
    const existingData: Record<string, ResumeData> = existingDataStr ? JSON.parse(existingDataStr) : {}

    // Add or update the data
    existingData[data.username] = data

    // Save back to local storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData))
  } catch (error) {
    console.error("Error saving resume data:", error)
    throw new Error("Failed to save data")
  }
}

// Get resume data by username
export function getResumeData(username: string): ResumeData | null {
  if (typeof window === "undefined") return null

  try {
    const dataStr = localStorage.getItem(STORAGE_KEY)
    if (!dataStr) return null

    const data: Record<string, ResumeData> = JSON.parse(dataStr)
    return data[username] || null
  } catch (error) {
    console.error("Error getting resume data:", error)
    return null
  }
}

// Get all resume data
export function getAllResumeData(): ResumeData[] {
  if (typeof window === "undefined") return []

  try {
    const dataStr = localStorage.getItem(STORAGE_KEY)
    if (!dataStr) return []

    const data: Record<string, ResumeData> = JSON.parse(dataStr)
    return Object.values(data)
  } catch (error) {
    console.error("Error getting all resume data:", error)
    return []
  }
}

// Sample data
const sampleData: ResumeData[] = [
  {
    username: "jane-smith",
    fullName: "Jane Smith",
    aboutMe:
      "Full-stack developer with 5 years of experience building web applications. Passionate about creating intuitive user interfaces and scalable backend systems.",
    skills: "JavaScript, TypeScript, React, Node.js, Express, MongoDB, AWS",
    projects: [
      {
        title: "E-commerce Platform",
        description:
          "Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Implemented features like user authentication, product catalog, shopping cart, and payment processing.",
      },
      {
        title: "Task Management App",
        description:
          "Developed a task management application with drag-and-drop functionality, real-time updates, and team collaboration features using React, Socket.io, and Express.",
      },
    ],
    linkedinUrl: "https://linkedin.com/in/janesmith",
    githubUrl: "https://github.com/janesmith",
  },
  {
    username: "john-developer",
    fullName: "John Developer",
    aboutMe:
      "Frontend developer specializing in React and modern JavaScript. I love creating beautiful, responsive user interfaces and have experience with various design systems.",
    skills: "React, Next.js, TypeScript, Tailwind CSS, Figma, Jest, GraphQL",
    projects: [
      {
        title: "Portfolio Website",
        description:
          "Designed and developed a personal portfolio website using Next.js and Tailwind CSS. Implemented animations, dark mode, and a contact form with email notifications.",
      },
      {
        title: "Weather Dashboard",
        description:
          "Created a weather dashboard that displays current weather and forecasts for multiple locations. Used React, Context API for state management, and integrated with OpenWeather API.",
      },
    ],
    linkedinUrl: "https://linkedin.com/in/johndeveloper",
    githubUrl: "https://github.com/johndeveloper",
  },
]

// Load sample data into local storage
export function loadSampleData(): void {
  if (typeof window === "undefined") return

  try {
    // Get existing data
    const existingDataStr = localStorage.getItem(STORAGE_KEY)
    const existingData: Record<string, ResumeData> = existingDataStr ? JSON.parse(existingDataStr) : {}

    // Add sample data if not already present
    sampleData.forEach((sample) => {
      if (!existingData[sample.username]) {
        existingData[sample.username] = sample
      }
    })

    // Save back to local storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData))
  } catch (error) {
    console.error("Error loading sample data:", error)
  }
}

// Get sample data
export function getSampleData(): ResumeData[] {
  return getAllResumeData().filter((data) => sampleData.some((sample) => sample.username === data.username))
}
