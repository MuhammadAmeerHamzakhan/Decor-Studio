"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { mockEnrollments } from "@/lib/mock-data"

interface EnrollModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productId: string
  productName: string
  productType: "course" | "service"
}

export function EnrollModal({ open, onOpenChange, productId, productName, productType }: EnrollModalProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Add to mock enrollments
      const newEnrollment = {
        id: `ENR-${String(mockEnrollments.length + 1).padStart(3, "0")}`,
        userId: user?.id || "guest",
        userName: formData.name,
        userEmail: formData.email,
        phone: formData.phone,
        productId,
        productName,
        productType,
        message: formData.message,
        date: new Date().toISOString().split("T")[0],
        status: "pending" as const,
      }

      mockEnrollments.push(newEnrollment)

      // Store in localStorage
      const enrollments = JSON.parse(localStorage.getItem("enrollments") || "[]")
      enrollments.push(newEnrollment)
      localStorage.setItem("enrollments", JSON.stringify(enrollments))

      toast({
        title: "Enrollment Submitted!",
        description: `Your enrollment for ${productName} has been received. We'll contact you soon.`,
      })

      setIsSubmitting(false)
      onOpenChange(false)
      setFormData({ name: user?.name || "", email: user?.email || "", phone: "", message: "" })
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Enroll Now</DialogTitle>
          <DialogDescription>{productName}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your learning goals..."
              rows={3}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-rose-500 hover:bg-rose-600" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Enrollment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
