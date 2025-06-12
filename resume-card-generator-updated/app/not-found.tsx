import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Profile Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        The profile you're looking for doesn't exist or may have been removed.
      </p>
      <Link href="/">
        <Button className="gap-2">
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  )
}
