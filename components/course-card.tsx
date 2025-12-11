import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, User } from "lucide-react"
import Link from "next/link"
import type { Course } from "@/lib/products"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const levelColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Advanced: "bg-purple-100 text-purple-800",
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <Link href={`/courses/${course.id}`}>
          <div className="relative overflow-hidden aspect-video">
            <img
              src={course.image || "/placeholder.svg"}
              alt={course.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <Badge className={`absolute top-3 left-3 ${levelColors[course.level]}`}>{course.level}</Badge>
          </div>
        </Link>
        <div className="p-6 bg-card">
          <Link href={`/courses/${course.id}`}>
            <h3 className="font-serif text-xl font-semibold mb-2 hover:text-primary transition-colors">
              {course.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{course.instructor}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">${course.price}</span>
            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
              Enroll Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
