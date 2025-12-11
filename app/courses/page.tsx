"use client"

import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, Heart, ChevronRight, Search } from "lucide-react"
import Link from "next/link"
import { getAllCourses, initializeAdminData } from "@/lib/admin-data"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Course } from "@/lib/courses-data"

const levelColors = {
  Beginner: "bg-blue-100 text-blue-800 border-blue-200",
  Intermediate: "bg-primary/20 text-primary border-primary/30",
  Advanced: "bg-purple-100 text-purple-800 border-purple-200",
  Masterclass: "bg-amber-100 text-amber-800 border-amber-200",
}

export default function CoursesPage() {
  const [coursesData, setCoursesData] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState("popular")

  useEffect(() => {
    initializeAdminData()
    const courses = getAllCourses()
    setCoursesData(courses)
  }, [])

  const filteredCourses = coursesData
    .filter((course) => {
      const matchesType = course.type === "Self-Paced"
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level)
      const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1]
      return matchesType && matchesSearch && matchesLevel && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.isNew ? 1 : -1
        default:
          return b.students - a.students
      }
    })

  const trendingCourses = filteredCourses.filter((c) => c.isTrending).slice(0, 3)

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Course Level</h3>
        <div className="space-y-2">
          {["Beginner", "Intermediate", "Advanced", "Masterclass"].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={`level-${level}`}
                checked={selectedLevels.includes(level)}
                onCheckedChange={(checked) => {
                  setSelectedLevels(checked ? [...selectedLevels, level] : selectedLevels.filter((l) => l !== level))
                }}
              />
              <Label htmlFor={`level-${level}`} className="cursor-pointer">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="mb-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full bg-transparent"
        onClick={() => {
          setSelectedLevels([])
          setPriceRange([0, 1000])
        }}
      >
        Clear Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/candle-making-workshop-studio-atmosphere.jpg"
              alt="Candle making studio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
          <div className="relative h-full container mx-auto px-4 lg:px-8 flex flex-col items-center justify-center text-center text-white">
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">Learn Candle Making — At Your Own Pace</h1>
            <p className="text-lg md:text-xl mb-6 max-w-2xl">
              Beautifully structured, self-paced courses designed for creative independence.
            </p>
          </div>
        </section>

        {/* Search and Sort Bar */}
        <section className="sticky top-16 md:top-20 z-40 bg-background border-b shadow-sm">
          <div className="container mx-auto px-4 lg:px-8 py-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search self-paced courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Trending Section */}
        {trendingCourses.length > 0 && (
          <section className="py-12 md:py-16 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">Popular This Month</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {trendingCourses.map((course) => (
                  <Link key={course.id} href={`/course/${course.id}`} className="block">
                    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden aspect-video">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <Badge className="absolute top-4 left-4 bg-amber-500 text-white border-0">Trending</Badge>
                          <Badge className={`absolute top-4 right-4 ${levelColors[course.level]}`}>
                            {course.level}
                          </Badge>
                        </div>
                        <div className="p-6">
                          <Badge variant="outline" className="mb-3">
                            Self-Paced
                          </Badge>
                          <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {course.rating} ({course.reviewCount})
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" /> <span>{course.duration}</span>
                              <Users className="h-4 w-4" /> <span>{course.students}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-2xl font-bold">${course.price}</span>
                            </div>
                            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                              Explore <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Courses Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row gap-8">
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-32">
                <h2 className="font-serif text-2xl font-bold mb-6">Filters</h2>
                <FilterContent />
              </div>
            </aside>

            <div className="flex-1">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
                Self-Paced Courses ({filteredCourses.length})
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {filteredCourses.map((course) => (
                  <Link key={course.id} href={`/course/${course.id}`} className="block h-full">
                    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full cursor-pointer">
                      <CardContent className="p-0 flex flex-col h-full">
                        <div className="relative overflow-hidden aspect-video">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <Badge className={`absolute top-4 left-4 ${levelColors[course.level]}`}>{course.level}</Badge>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <Badge variant="outline" className="mb-3 w-fit">
                            Self-Paced
                          </Badge>
                          <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
                          <div className="text-sm text-muted-foreground mb-3">
                            <span className="font-medium">{course.instructor.name}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {course.rating} ({course.reviewCount})
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                            <Clock className="h-3 w-3" /> <span>{course.duration}</span>
                            <Users className="h-3 w-3" /> <span>{course.students}+ students</span>
                          </div>
                          <div className="mt-auto">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-2xl font-bold">${course.price}</span>
                            </div>
                            <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
