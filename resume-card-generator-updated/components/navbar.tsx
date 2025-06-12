"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Home, User } from "lucide-react"

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          <FileText className="h-5 w-5" />
          ResumeCards
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/create">
            <Button variant="ghost" size="sm" className="gap-2">
              <FileText className="h-4 w-4" />
              Create
            </Button>
          </Link>
          <Link href="/samples">
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              Samples
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
