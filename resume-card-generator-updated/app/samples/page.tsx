"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ResumeData } from "@/lib/types"
import { getSampleData, loadSampleData } from "@/lib/storage"
import { ArrowRight } from "lucide-react"

export default function SamplesPage() {
  const [samples, setSamples] = useState<ResumeData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load sample data if not already loaded
    loadSampleData()

    // Get sample data
    const sampleData = getSampleData()
    setSamples(sampleData)
    setLoading(false)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Sample Web Cards</h1>
        <p className="text-gray-600 mb-8">
          Check out these sample web cards to see what you can create. Click on any card to view the full profile.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {samples.map((sample) => (
              <Card key={sample.username}>
                <CardHeader>
                  <CardTitle>{sample.fullName}</CardTitle>
                  <CardDescription>@{sample.username}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-gray-600 dark:text-gray-400">{sample.aboutMe}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {sample.skills
                      .split(",")
                      .slice(0, 3)
                      .map((skill, i) => (
                        <span key={i} className="bg-gray-100 dark:bg-gray-800 text-xs px-2 py-1 rounded">
                          {skill.trim()}
                        </span>
                      ))}
                    {sample.skills.split(",").length > 3 && (
                      <span className="text-xs px-2 py-1">+{sample.skills.split(",").length - 3} more</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/profile/${sample.username}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to create your own?</h2>
          <Link href="/create">
            <Button size="lg">
              Create Your Web Card
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
