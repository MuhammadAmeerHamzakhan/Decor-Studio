"use client"

import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Clock, Users, Star, Heart, Share2, CheckCircle2, Play, Calendar } from "lucide-react"
import Link from "next/link"
import { coursesData } from "@/lib/courses-data"
import { notFound } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"

const levelColors = {
  Beginner: "bg-blue-100 text-blue-800 border-blue-200",
  Intermediate: "bg-primary/20 text-primary border-primary/30",
  Advanced: "bg-purple-100 text-purple-800 border-purple-200",
  Masterclass: "bg-amber-100 text-amber-800 border-amber-200",
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = coursesData.find((c) => c.id === params.id)
  const { addItem } = useCart()
  const [activeTab, setActiveTab] = useState("overview")

  if (!course) {
    notFound()
  }

  const relatedCourses = coursesData.filter((c) => c.id !== course.id && c.category === course.category).slice(0, 3)

  const handleEnroll = () => {
    addItem({
      id: course.id,
      name: course.title,
      price: course.price,
      image: course.image,
      quantity: 1,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <div className="absolute inset-0">
            <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          </div>
          <div className="relative h-full container mx-auto px-4 lg:px-8 flex items-end pb-8">
            <div className="text-white max-w-3xl">
              <Badge className={`${levelColors[course.level]} mb-4`}>{course.level}</Badge>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg md:text-xl mb-4 opacity-90">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <img
                    src={course.instructor.photo || "/placeholder.svg"}
                    alt={course.instructor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{course.instructor.name}</p>
                    <p className="text-xs opacity-75">{course.instructor.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="opacity-75">({course.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students}+ students</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-transparent border-b rounded-none p-0">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="curriculum"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none"
                  >
                    Curriculum
                  </TabsTrigger>
                  <TabsTrigger
                    value="instructor"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none"
                  >
                    Instructor
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none"
                  >
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger
                    value="faq"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none"
                  >
                    FAQ
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-8">
                  {/* Course Description */}
                  <div>
                    <h2 className="font-serif text-2xl font-bold mb-4">About This Course</h2>
                    <p className="text-muted-foreground leading-relaxed">{course.fullDescription}</p>
                  </div>

                  {/* What You'll Learn */}
                  <div>
                    <h2 className="font-serif text-2xl font-bold mb-4">What You'll Learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.whatYouLearn.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Course Format */}
                  <div>
                    <h2 className="font-serif text-2xl font-bold mb-4">Course Format</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <p className="font-semibold">{course.duration}</p>
                          <p className="text-xs text-muted-foreground">Duration</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <p className="font-semibold">{course.students}+</p>
                          <p className="text-xs text-muted-foreground">Students</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Badge variant="outline" className="mb-2">
                            {course.type}
                          </Badge>
                          <p className="text-xs text-muted-foreground">Format</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Badge className={levelColors[course.level]}>{course.level}</Badge>
                          <p className="text-xs text-muted-foreground mt-2">Level</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h2 className="font-serif text-2xl font-bold mb-4">Requirements</h2>
                    <p className="text-muted-foreground">{course.requirements}</p>
                  </div>

                  {/* What's Included */}
                  <div>
                    <h2 className="font-serif text-2xl font-bold mb-4">What's Included</h2>
                    <div className="space-y-2">
                      {course.included.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Session */}
                  {course.nextSession && (
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">Next Session</h3>
                        </div>
                        <p className="text-lg font-medium">{course.nextSession}</p>
                        <Button className="mt-4 w-full sm:w-auto" onClick={handleEnroll}>
                          Register for This Date
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="curriculum" className="mt-6">
                  <h2 className="font-serif text-2xl font-bold mb-6">Course Curriculum</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {course.curriculum.map((session, i) => (
                      <AccordionItem key={i} value={`session-${i}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-4 text-left">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0">
                              {session.session}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{session.title}</p>
                              <p className="text-sm text-muted-foreground">{session.duration}</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-14">
                          <p className="text-muted-foreground">{session.description}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>

                <TabsContent value="instructor" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <img
                          src={course.instructor.photo || "/placeholder.svg"}
                          alt={course.instructor.name}
                          className="w-32 h-32 rounded-full object-cover mx-auto sm:mx-0"
                        />
                        <div className="flex-1">
                          <h2 className="font-serif text-2xl font-bold mb-2">{course.instructor.name}</h2>
                          <p className="text-muted-foreground mb-4">{course.instructor.title}</p>
                          <p className="text-muted-foreground leading-relaxed">{course.instructor.bio}</p>
                          <Button variant="outline" className="mt-4 bg-transparent" asChild>
                            <Link href="/about">View Full Profile</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {relatedCourses.length > 0 && (
                    <div className="mt-8">
                      <h3 className="font-serif text-xl font-bold mb-4">More Courses by {course.instructor.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {relatedCourses.map((relatedCourse) => (
                          <Card key={relatedCourse.id} className="group hover:shadow-lg transition-shadow">
                            <CardContent className="p-0">
                              <img
                                src={relatedCourse.image || "/placeholder.svg"}
                                alt={relatedCourse.title}
                                className="w-full aspect-video object-cover"
                              />
                              <div className="p-4">
                                <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                                  {relatedCourse.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">{relatedCourse.duration}</p>
                                <p className="font-bold">${relatedCourse.price}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="mb-8">
                    <h2 className="font-serif text-2xl font-bold mb-4">Student Reviews</h2>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold mb-2">{course.rating}</div>
                        <div className="flex items-center justify-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{course.reviewCount} reviews</p>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((stars) => {
                          const count = course.reviews.filter((r) => Math.floor(r.rating) === stars).length
                          const percentage = (count / course.reviews.length) * 100
                          return (
                            <div key={stars} className="flex items-center gap-2 mb-2">
                              <span className="text-sm w-12">{stars} star</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-400" style={{ width: `${percentage}%` }} />
                              </div>
                              <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {course.reviews.map((review, i) => (
                      <Card key={i}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-semibold">{review.name}</p>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="faq" className="mt-6">
                  <h2 className="font-serif text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq-1">
                      <AccordionTrigger>Do I need prior experience?</AccordionTrigger>
                      <AccordionContent>{course.requirements}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-2">
                      <AccordionTrigger>What materials do I need?</AccordionTrigger>
                      <AccordionContent>
                        All necessary materials and supplies are included in your course enrollment. You'll receive a
                        complete starter kit delivered before the first session.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-3">
                      <AccordionTrigger>Can I attend remotely?</AccordionTrigger>
                      <AccordionContent>
                        {course.type === "Live Workshop"
                          ? "This is a live workshop that can be attended in-person or via Zoom. You'll receive the link upon enrollment."
                          : "This is a self-paced online course that you can complete from anywhere at your own schedule."}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-4">
                      <AccordionTrigger>Is there a certificate?</AccordionTrigger>
                      <AccordionContent>
                        Yes! Upon successful completion of the course, you'll receive a certificate of completion that
                        you can share on your resume or social media.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-5">
                      <AccordionTrigger>What if I miss a session?</AccordionTrigger>
                      <AccordionContent>
                        All live sessions are recorded and available for lifetime access. You can watch the recordings
                        at your convenience if you miss a live session.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-6">
                      <AccordionTrigger>Can I get a refund?</AccordionTrigger>
                      <AccordionContent>
                        We offer a 14-day money-back guarantee. If you're not satisfied with the course within the first
                        14 days, contact us for a full refund.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-96 flex-shrink-0">
              <div className="sticky top-24">
                <Card className="shadow-xl">
                  <CardContent className="p-6">
                    <div className="aspect-video relative rounded-lg overflow-hidden mb-4 group cursor-pointer">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="h-8 w-8 text-foreground ml-1" />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold">${course.price}</span>
                        {course.originalPrice && (
                          <span className="text-xl text-muted-foreground line-through">${course.originalPrice}</span>
                        )}
                      </div>
                      {course.originalPrice && (
                        <Badge className="bg-green-100 text-green-800">
                          Save ${course.originalPrice - course.price}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      <Button className="w-full" size="lg" onClick={handleEnroll}>
                        Enroll Now
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="flex-1 bg-transparent">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="flex-1 bg-transparent">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm border-t pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Level</span>
                        <Badge variant="outline" className={levelColors[course.level]}>
                          {course.level}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Students</span>
                        <span className="font-medium">{course.students}+</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      </div>
                      {course.nextSession && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Next Session</span>
                          <span className="font-medium text-xs">{course.nextSession}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {relatedCourses.length > 0 && (
                  <Card className="mt-6">
                    <CardContent className="p-6">
                      <h3 className="font-serif text-lg font-bold mb-4">Related Courses</h3>
                      <div className="space-y-4">
                        {relatedCourses.map((relatedCourse) => (
                          <Link
                            key={relatedCourse.id}
                            href={`/courses/${relatedCourse.id}`}
                            className="flex gap-3 group"
                          >
                            <img
                              src={relatedCourse.image || "/placeholder.svg"}
                              alt={relatedCourse.title}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                {relatedCourse.title}
                              </h4>
                              <p className="text-sm font-bold">${relatedCourse.price}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
