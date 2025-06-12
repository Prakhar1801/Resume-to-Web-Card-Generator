"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { ResumeData } from "@/lib/types"
import { saveResumeData } from "@/lib/storage"
import { AlertCircle, Github, Linkedin, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CreatePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ResumeData>({
    username: "",
    fullName: "",
    aboutMe: "",
    skills: "",
    projects: [
      { title: "", description: "" },
      { title: "", description: "" },
    ],
    linkedinUrl: "",
    githubUrl: "",
  })

  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProjectChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedProjects = [...prev.projects]
      updatedProjects[index] = { ...updatedProjects[index], [field]: value }
      return { ...prev, projects: updatedProjects }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.username || !formData.fullName) {
      setError("Username and Full Name are required")
      return
    }

    // Check if username is valid (alphanumeric and hyphens only)
    if (!/^[a-z0-9-]+$/.test(formData.username)) {
      setError("Username can only contain lowercase letters, numbers, and hyphens")
      return
    }

    try {
      saveResumeData(formData)
      router.push(`/profile/${formData.username}`)
    } catch (err) {
      setError("Failed to save your data. Please try again.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Create Your Web Card</CardTitle>
          <CardDescription>Fill in your details to generate a personalized web card</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username (for your profile URL)</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="john-doe"
              />
              <p className="text-sm text-gray-500">This will be used for your profile URL: /profile/your-username</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aboutMe">About Me</Label>
              <Textarea
                id="aboutMe"
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleChange}
                placeholder="A brief introduction about yourself"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Next.js, TypeScript, Tailwind CSS"
              />
            </div>

            <div className="space-y-4">
              <Label>Projects (at least 2)</Label>

              {formData.projects.map((project, index) => (
                <div key={index} className="space-y-2 p-4 border rounded-md">
                  <Label htmlFor={`project-title-${index}`}>Project {index + 1} Title</Label>
                  <Input
                    id={`project-title-${index}`}
                    value={project.title}
                    onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                    placeholder="Project Title"
                  />

                  <Label htmlFor={`project-desc-${index}`}>Project {index + 1} Description</Label>
                  <Textarea
                    id={`project-desc-${index}`}
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                    placeholder="Brief description of your project"
                    rows={2}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <div className="flex">
                  <div className="bg-gray-100 dark:bg-gray-800 flex items-center px-3 rounded-l-md border border-r-0">
                    <Linkedin className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    id="linkedinUrl"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="rounded-l-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <div className="flex">
                  <div className="bg-gray-100 dark:bg-gray-800 flex items-center px-3 rounded-l-md border border-r-0">
                    <Github className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    id="githubUrl"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    className="rounded-l-none"
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full gap-2">
            <Save className="h-4 w-4" />
            Generate Web Card
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
