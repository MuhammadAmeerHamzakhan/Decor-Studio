"use client"

import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  Clock,
  Users,
  Check,
  Heart,
  Share2,
  BookOpen,
  Target,
  MessageSquare,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  LinkIcon,
} from "lucide-react"
import { getAllCourses, initializeAdminData } from "@/lib/admin-data"
import { notFound } from "next/navigation"
import { useState, useEffect } from "react"
import type { Course } from "@/lib/courses-data"
import { EnrollModal } from "@/components/enroll-modal"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCurrency } from "@/contexts/currency-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrollModalOpen, setEnrollModalOpen] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [likeCount, setLikeCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([])

  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { convertAndFormat } = useCurrency()
  const { toast } = useToast()

  useEffect(() => {
    initializeAdminData()
    const courses = getAllCourses()
    const foundCourse = courses.find((c) => c.id === params.id)

    if (foundCourse) {
      setCourse(foundCourse)

      // Get related courses (same category, different course)
      const related = courses.filter((c) => c.category === foundCourse.category && c.id !== foundCourse.id).slice(0, 3)
      setRelatedCourses(related)

      // Initialize like count (could be from backend)
      setLikeCount(Math.floor(Math.random() * 500) + 100)
    }

    // Check enrollment status
    const enrollments = JSON.parse(localStorage.getItem("enrollments") || "[]")
    const enrolled = enrollments.some((e: any) => e.productId === params.id)
    setIsEnrolled(enrolled)

    // Check liked status
    const liked = localStorage.getItem(`course-liked-${params.id}`) === "true"
    setIsLiked(liked)

    // Get progress if enrolled
    if (enrolled) {
      const savedProgress = localStorage.getItem(`course-progress-${params.id}`)
      setProgress(savedProgress ? Number.parseInt(savedProgress) : 25)
    }

    setLoading(false)
  }, [params.id])

  const handleLike = () => {
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1))
    localStorage.setItem(`course-liked-${params.id}`, newLikedState.toString())
    toast({
      title: newLikedState ? "Added to likes" : "Removed from likes",
      description: newLikedState ? "Course added to your liked courses" : "Course removed from your liked courses",
    })
  }

  const handleWishlist = () => {
    if (!course) return

    if (isInWishlist(course.id)) {
      removeFromWishlist(course.id)
      toast({
        title: "Removed from wishlist",
        description: `${course.title} has been removed from your wishlist`,
      })
    } else {
      addToWishlist({
        id: course.id,
        name: course.title,
        price: course.price,
        image: course.image,
      })
      toast({
        title: "Added to wishlist",
        description: `${course.title} has been added to your wishlist`,
      })
    }
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out this course: ${course?.title}`

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      copy: url,
    }

    if (platform === "copy") {
      navigator.clipboard.writeText(url)
      toast({ title: "Link copied!", description: "Course link copied to clipboard" })
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-300 mx-auto mb-4"></div>
          <p>Loading course...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    notFound()
  }

  const inWishlist = isInWishlist(course.id)

  return (
    <div className="flex flex-col min-h-screen bg-cream-50">
      <SiteNavigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-rose-50 to-cream-100 py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Column - Course Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-rose-100 text-rose-700">
                    {course.category}
                  </Badge>
                  <Badge variant="outline">{course.level}</Badge>
                  {course.isTrending && (
                    <Badge className="bg-gradient-to-r from-orange-400 to-rose-400 text-white">Trending</Badge>
                  )}
                  {course.isNew && (
                    <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white">New</Badge>
                  )}
                </div>

                <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4 text-balance">{course.title}</h1>

                <p className="text-lg text-muted-foreground mb-6 text-pretty">{course.description}</p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-muted-foreground">({course.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-rose-500" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-rose-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-rose-500 text-rose-500" : "text-rose-500"}`} />
                    <span>{likeCount} likes</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-lg">
                  <Image
                    src={course.instructor.photo || "/placeholder.svg"}
                    alt={course.instructor.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{course.instructor.name}</p>
                    <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                  </div>
                </div>

                {/* Progress Bar (if enrolled) */}
                {isEnrolled && (
                  <Card className="mb-6 border-rose-200 bg-rose-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">Your Progress</p>
                        <p className="text-sm text-muted-foreground">{progress}% Complete</p>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Enrollment Card */}
              <div>
                <Card className="sticky top-4 shadow-lg">
                  <CardHeader>
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-bold">{convertAndFormat(course.price)}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {isEnrolled ? (
                      <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" disabled>
                        <Check className="mr-2 h-5 w-5" />
                        Enrolled
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        className="w-full bg-rose-500 hover:bg-rose-600"
                        onClick={() => setEnrollModalOpen(true)}
                        disabled={!course.enrollmentEnabled}
                      >
                        {course.enrollmentEnabled ? "Enroll Now" : "Enrollment Closed"}
                      </Button>
                    )}

                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="w-full bg-transparent" onClick={handleWishlist}>
                        <Heart className={`h-4 w-4 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`} />
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" onClick={handleLike}>
                        <Star className={`h-4 w-4 ${isLiked ? "fill-yellow-400 text-yellow-400" : ""}`} />
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" onClick={() => handleShare("copy")}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <p className="font-semibold text-sm">Share this course:</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleShare("facebook")}>
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleShare("twitter")}>
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleShare("linkedin")}>
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleShare("copy")}>
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <p className="font-semibold text-sm">This course includes:</p>
                      <ul className="space-y-1 text-sm">
                        {course.included.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-rose-500" />
                    About This Course
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-rose max-w-none">
                  <p className="text-lg">{course.fullDescription}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-rose-500" />
                    What You'll Learn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {course.whatYouLearn.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{course.requirements}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {course.curriculum.length} sessions • {course.duration} total
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.curriculum.map((module, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:border-rose-300 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-semibold flex-shrink-0">
                              {module.session}
                            </div>
                            <div>
                              <h3 className="font-semibold">{module.title}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3" />
                                {module.duration}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground ml-11">{module.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructor">
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-6">
                    <Image
                      src={course.instructor.photo || "/placeholder.svg"}
                      alt={course.instructor.name}
                      width={120}
                      height={120}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-2xl mb-2">{course.instructor.name}</CardTitle>
                      <p className="text-rose-600 font-medium mb-4">{course.instructor.title}</p>
                      <p className="text-muted-foreground">{course.instructor.bio}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Student Reviews</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{course.reviewCount} reviews</p>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold">{course.rating}</div>
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.round(course.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {course.reviews.map((review, index) => (
                    <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{review.name}</p>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                <Check className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-rose-500" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      q: "Do I need prior experience?",
                      a: course.requirements || "No prior experience necessary! This course is designed for beginners.",
                    },
                    {
                      q: "What materials are provided?",
                      a: "All necessary materials and tools are included in your course enrollment.",
                    },
                    {
                      q: "Can I access the course materials after completion?",
                      a: "Yes! You'll have lifetime access to all course recordings and materials.",
                    },
                    {
                      q: "Is there a certificate?",
                      a: "Yes, you'll receive a certificate of completion after finishing the course.",
                    },
                    {
                      q: "What if I can't attend the live session?",
                      a: "All live sessions are recorded and available for replay within 24 hours.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                      <h3 className="font-semibold mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Related Courses */}
          {relatedCourses.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-serif font-bold">Related Courses</h2>
                <Link href="/courses">
                  <Button variant="ghost" className="text-rose-500">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedCourses.map((relatedCourse) => (
                  <Link key={relatedCourse.id} href={`/course/${relatedCourse.id}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <Image
                        src={relatedCourse.image || "/placeholder.svg"}
                        alt={relatedCourse.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <CardContent className="pt-4">
                        <Badge className="mb-2">{relatedCourse.level}</Badge>
                        <h3 className="font-semibold mb-2 line-clamp-2">{relatedCourse.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{relatedCourse.rating}</span>
                          <span>•</span>
                          <span>{relatedCourse.students.toLocaleString()} students</span>
                        </div>
                        <p className="font-bold text-lg">{convertAndFormat(relatedCourse.price)}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />

      <EnrollModal
        open={enrollModalOpen}
        onOpenChange={setEnrollModalOpen}
        productId={course.id}
        productName={course.title}
        productType="course"
      />
    </div>
  )
}
