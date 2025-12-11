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
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCurrency } from "@/contexts/currency-context"
import {
  type Module,
  getAllModules,
  getAllCourses,
  createModule,
  updateModule,
  deleteModule,
  initializeAdminData,
} from "@/lib/admin-data"

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [selectedCourse, setSelectedCourse] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingModule, setEditingModule] = useState<Module | null>(null)
  const { toast } = useToast()
  const { selectedCountry, convertAndFormat } = useCurrency()

  useEffect(() => {
    initializeAdminData()
    loadData()
  }, [])

  const loadData = () => {
    const modulesData = getAllModules()
    const coursesData = getAllCourses()
    setModules(modulesData)
    setCourses(coursesData)
  }

  const filteredModules = selectedCourse === "all" ? modules : modules.filter((m) => m.courseId === selectedCourse)

  const getCourseName = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId)
    return course?.title || "Unknown Course"
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const moduleData: Module = {
      id: editingModule?.id || `mod-${Date.now()}`,
      courseId: formData.get("courseId") as string,
      title: formData.get("title") as string,
      duration: formData.get("duration") as string,
      description: formData.get("description") as string,
      materials: formData.get("materials") as string,
      priceInUSD: formData.get("priceInUSD") ? Number(formData.get("priceInUSD")) : undefined,
      order: editingModule?.order || modules.filter((m) => m.courseId === formData.get("courseId")).length + 1,
    }

    if (editingModule) {
      updateModule(editingModule.id, moduleData)
      toast({
        title: "Module updated",
        description: "The module has been updated successfully",
      })
    } else {
      createModule(moduleData)
      toast({
        title: "Module created",
        description: "The module has been created successfully",
      })
    }

    loadData()
    setIsDialogOpen(false)
    setEditingModule(null)
  }

  const handleEdit = (module: Module) => {
    setEditingModule(module)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this module?")) {
      deleteModule(id)
      loadData()
      toast({
        title: "Module deleted",
        description: "The module has been deleted successfully",
      })
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingModule(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Modules</h1>
          <p className="text-muted-foreground mt-1">Manage course modules and content</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingModule(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Module
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingModule ? "Edit Module" : "Add New Module"}</DialogTitle>
              <DialogDescription>
                {editingModule ? "Update module information" : "Create a new module for a course"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="courseId">Course</Label>
                <Select name="courseId" defaultValue={editingModule?.courseId} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Module Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingModule?.title}
                  required
                  placeholder="e.g., Introduction & Wax Selection"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  defaultValue={editingModule?.duration}
                  required
                  placeholder="e.g., 45 minutes"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingModule?.description}
                  rows={3}
                  placeholder="Module description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="materials">Materials Link (optional)</Label>
                <Input
                  id="materials"
                  name="materials"
                  type="url"
                  defaultValue={editingModule?.materials}
                  placeholder="https://example.com/materials.pdf"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceInUSD">Module Price in USD (optional)</Label>
                <Input
                  id="priceInUSD"
                  name="priceInUSD"
                  type="number"
                  step="0.01"
                  defaultValue={editingModule?.priceInUSD}
                  placeholder="Leave empty if included in course"
                />
                {editingModule?.priceInUSD && (
                  <p className="text-sm text-muted-foreground">
                    Converted: {convertAndFormat(editingModule.priceInUSD)}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancel
                </Button>
                <Button type="submit">{editingModule ? "Update" : "Create"} Module</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Label>Filter by Course:</Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[300px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Modules Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Modules ({filteredModules.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module Title</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price (USD)</TableHead>
                <TableHead>Price ({selectedCountry.currency})</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredModules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{module.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{getCourseName(module.courseId)}</TableCell>
                  <TableCell>{module.duration}</TableCell>
                  <TableCell>{module.priceInUSD ? `$${module.priceInUSD}` : "Included"}</TableCell>
                  <TableCell className="font-semibold">
                    {module.priceInUSD ? convertAndFormat(module.priceInUSD) : "Included"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(module)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(module.id)}
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
