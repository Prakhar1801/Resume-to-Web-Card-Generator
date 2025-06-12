import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, User } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Resume to Web Card Generator</h1>
        <p className="text-xl text-gray-600 mb-8">
          Transform your resume into a beautiful, shareable web card in seconds. Enter your details and get a
          personalized profile page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/create">
            <Button size="lg" className="gap-2">
              <FileText className="h-5 w-5" />
              Create Your Card
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/samples">
            <Button variant="outline" size="lg" className="gap-2">
              <User className="h-5 w-5" />
              View Sample Cards
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
