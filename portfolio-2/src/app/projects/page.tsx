import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Project {
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
}

const projects: Project[] = [
  {
    title: "Modern Portfolio",
    description: "A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a clean design and smooth animations.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://your-portfolio.vercel.app"
  },
  // Add more projects here
]

export default function Projects() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="flex flex-col h-full transition-all hover:shadow-lg">
            {project.imageUrl && (
              <div className="relative h-48 w-full">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  className="object-cover rounded-t-lg"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <Badge key={i} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
                </Button>
              )}
              {project.liveUrl && (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}