"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockEnrollments, type Enrollment } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { GraduationCap, Mail, Phone, Calendar, MessageSquare } from "lucide-react"

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Get enrollments from localStorage or mock data
    const stored = localStorage.getItem("enrollments")
    const allEnrollments = stored ? JSON.parse(stored) : mockEnrollments
    setEnrollments(allEnrollments)
  }, [])

  const handleStatusChange = (enrollmentId: string, newStatus: string) => {
    const updated = enrollments.map((e) =>
      e.id === enrollmentId ? { ...e, status: newStatus as Enrollment["status"] } : e,
    )
    setEnrollments(updated)
    localStorage.setItem("enrollments", JSON.stringify(updated))

    toast({
      title: "Status Updated",
      description: `Enrollment status changed to ${newStatus}`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = {
    total: enrollments.length,
    pending: enrollments.filter((e) => e.status === "pending").length,
    approved: enrollments.filter((e) => e.status === "approved").length,
    completed: enrollments.filter((e) => e.status === "completed").length,
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold">Enrollments</h1>
        <p className="text-muted-foreground mt-1">Manage course and service enrollments</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Enrollments</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Approved</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{stats.approved}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed</CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.completed}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Enrollments List */}
      <div className="grid gap-4">
        {enrollments.map((enrollment) => (
          <Card key={enrollment.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-rose-500" />
                    {enrollment.productName}
                  </CardTitle>
                  <CardDescription>
                    ID: {enrollment.id} • {enrollment.productType}
                  </CardDescription>
                </div>
                <Select value={enrollment.status} onValueChange={(value) => handleStatusChange(enrollment.id, value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Student Information</p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{enrollment.userName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {enrollment.userEmail}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {enrollment.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(enrollment.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                {enrollment.message && (
                  <div>
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </p>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">{enrollment.message}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
