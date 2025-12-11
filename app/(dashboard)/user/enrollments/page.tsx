"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockEnrollments, type Enrollment } from "@/lib/mock-data"
import { useAuth } from "@/contexts/auth-context"
import { GraduationCap, Calendar, Phone, Mail } from "lucide-react"

export default function EnrollmentsPage() {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])

  useEffect(() => {
    // Get enrollments from localStorage or mock data
    const stored = localStorage.getItem("enrollments")
    const allEnrollments = stored ? JSON.parse(stored) : mockEnrollments

    // Filter for current user
    const userEnrollments = allEnrollments.filter((e: Enrollment) => e.userId === user?.id)
    setEnrollments(userEnrollments)
  }, [user])

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

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold">My Enrollments</h1>
        <p className="text-muted-foreground mt-1">Manage your course and service enrollments</p>
      </div>

      {enrollments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No enrollments yet</p>
            <p className="text-sm text-muted-foreground">Visit the marketplace to enroll in courses</p>
          </CardContent>
        </Card>
      ) : (
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
                    <CardDescription>Enrollment ID: {enrollment.id}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(enrollment.status)}>{enrollment.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Enrolled on {new Date(enrollment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{enrollment.userEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{enrollment.phone}</span>
                  </div>
                  {enrollment.message && (
                    <div className="mt-2 p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Your Message:</p>
                      <p className="text-sm text-muted-foreground">{enrollment.message}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
