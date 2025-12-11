"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCurrency } from "@/contexts/currency-context"
import type { Course } from "@/lib/courses-data"
import { getAllCourses, createCourse, updateCourse, deleteCourse, initializeAdminData } from "@/lib/admin-data"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const { toast } = useToast()
  const { selectedCountry, convertAndFormat } = useCurrency()

  useEffect(() => {
    initializeAdminData()
    loadCourses()
  }, [])

  const loadCourses = () => {
    const data = getAllCourses()
    setCourses(data)
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const courseData: Course = {
      id: editingCourse?.id || `course-${Date.now()}`,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      fullDescription: formData.get("fullDescription") as string,
      category: formData.get("category") as string,
      level: formData.get("level") as Course["level"],
      type: formData.get("type") as Course["type"],
      duration: formData.get("duration") as string,
      price: Number(formData.get("price")),
      students: editingCourse?.students || 0,
      rating: editingCourse?.rating || 0,
      reviewCount: editingCourse?.reviewCount || 0,
      image: editingCourse?.image || "/placeholder.svg?height=400&width=600",
      instructor: editingCourse?.instructor || {
        name: "Laura Anderson",
        title: "Master Candle Artisan",
        bio: "Expert instructor",
        photo: "/laura-anderson-instructor.jpg",
      },
      whatYouLearn: editingCourse?.whatYouLearn || [],
      requirements: (formData.get("requirements") as string) || "",
      included: editingCourse?.included || [],
      curriculum: editingCourse?.curriculum || [],
      reviews: editingCourse?.reviews || [],
      enrollmentEnabled: formData.get("enrollmentEnabled") === "enabled",
    }

    if (editingCourse) {
      updateCourse(editingCourse.id, courseData)
      toast({
        title: "Course updated",
        description: "The course has been updated successfully",
      })
    } else {
      createCourse(courseData)
      toast({
        title: "Course created",
        description: "The course has been created successfully",
      })
    }

    loadCourses()
    setIsDialogOpen(false)
    setEditingCourse(null)
  }

  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      deleteCourse(id)
      loadCourses()
      toast({
        title: "Course deleted",
        description: "The course has been deleted successfully",
      })
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingCourse(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Courses</h1>
          <p className="text-muted-foreground mt-1">Manage courses and pricing in {selectedCountry.currency}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingCourse(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
              <DialogDescription>
                {editingCourse ? "Update course information" : "Create a new course for your platform"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingCourse?.title}
                  required
                  placeholder="e.g., Soy Candle Making Fundamentals"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Input
                  id="description"
                  name="description"
                  defaultValue={editingCourse?.description}
                  required
                  placeholder="Brief course overview"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription">Full Description</Label>
                <Textarea
                  id="fullDescription"
                  name="fullDescription"
                  defaultValue={editingCourse?.fullDescription}
                  rows={3}
                  placeholder="Detailed course description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    defaultValue={editingCourse?.category}
                    required
                    placeholder="e.g., Candle Making 101"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select name="level" defaultValue={editingCourse?.level || "Beginner"}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Masterclass">Masterclass</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Course Type</Label>
                  <Select name="type" defaultValue={editingCourse?.type || "Live Workshop"}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Live Workshop">Live Workshop</SelectItem>
                      <SelectItem value="Self-Paced">Self-Paced</SelectItem>
                      <SelectItem value="1-on-1 Mentoring">1-on-1 Mentoring</SelectItem>
                      <SelectItem value="Intensive Weekend">Intensive Weekend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    defaultValue={editingCourse?.duration}
                    required
                    placeholder="e.g., 3 hours"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Base Price (USD)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={editingCourse?.price}
                  required
                  placeholder="79.00"
                />
                {editingCourse && (
                  <p className="text-sm text-muted-foreground">Converted: {convertAndFormat(editingCourse.price)}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  defaultValue={editingCourse?.requirements}
                  rows={2}
                  placeholder="Prerequisites or requirements"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enrollmentEnabled">Enrollment Status</Label>
                <Select
                  name="enrollmentEnabled"
                  defaultValue={editingCourse?.enrollmentEnabled !== false ? "enabled" : "disabled"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enabled">Enrollment Open</SelectItem>
                    <SelectItem value="disabled">Enrollment Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancel
                </Button>
                <Button type="submit">{editingCourse ? "Update" : "Create"} Course</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Courses ({filteredCourses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Base Price (USD)</TableHead>
                <TableHead>Price ({selectedCountry.currency})</TableHead>
                <TableHead>Students</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                      {course.level}
                    </span>
                  </TableCell>
                  <TableCell>${course.price}</TableCell>
                  <TableCell className="font-semibold">{convertAndFormat(course.price)}</TableCell>
                  <TableCell>{course.students.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(course)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(course.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
