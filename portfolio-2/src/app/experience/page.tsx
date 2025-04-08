import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Experience {
  title: string
  company: string
  duration: string
  description: string[]
  skills: string[]
}

const experiences: Experience[] = [
  {
    title: "Software Development Engineer",
    company: "Amazon",
    duration: "2023 - Present",
    description: [
      "Working on innovative solutions for Amazon's global infrastructure",
      "Developing and maintaining scalable web applications"
    ],
    skills: ["TypeScript", "React", "Node.js", "AWS"]
  },
  // Add more experiences here
]

export default function Experience() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Experience</h1>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Card key={index} className="w-full transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{exp.title}</CardTitle>
              <CardDescription>
                {exp.company} • {exp.duration}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside mb-4 space-y-2">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}