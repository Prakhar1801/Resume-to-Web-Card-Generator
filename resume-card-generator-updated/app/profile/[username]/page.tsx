"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ResumeData } from "@/lib/types"
import { getResumeData } from "@/lib/storage"
import { ExternalLink, Github, Linkedin, Share } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch the resume data from local storage
    const data = getResumeData(params.username)

    // Simulate a small loading delay for better UX
    setTimeout(() => {
      setResumeData(data)
      setLoading(false)
    }, 500)
  }, [params.username])

  // If data is not found after loading, show 404
  if (!loading && !resumeData) {
    notFound()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${resumeData?.fullName}'s Resume Card`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">{resumeData?.fullName}</h1>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <Card className="mb-6">
              <CardHeader className="pb-2">
                <h2 className="text-xl font-semibold">About Me</h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{resumeData?.aboutMe}</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader className="pb-2">
                <h2 className="text-xl font-semibold">Skills</h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {resumeData?.skills.split(",").map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader className="pb-2">
                <h2 className="text-xl font-semibold">Projects</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resumeData?.projects.map((project, index) => (
                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <h3 className="font-medium text-lg">{project.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              {resumeData?.linkedinUrl && (
                <a href={resumeData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </Button>
                </a>
              )}

              {resumeData?.githubUrl && (
                <a href={resumeData.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <Github className="h-5 w-5" />
                    GitHub
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </Button>
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-9 w-24" />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-7 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-7 w-24" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-6 w-20" />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-7 w-28" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  )
}
