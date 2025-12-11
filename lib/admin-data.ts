// API Integration Points:
// - GET /api/admin/courses - Fetch all courses
// - POST /api/admin/courses - Create new course
// - PUT /api/admin/courses/:id - Update course
// - DELETE /api/admin/courses/:id - Delete course
// - GET /api/admin/modules/:courseId - Fetch modules for course
// - POST /api/admin/modules - Create new module
// - PUT /api/admin/modules/:id - Update module
// - DELETE /api/admin/modules/:id - Delete module
// - GET /api/admin/candles - Fetch all candles
// - POST /api/admin/candles - Create new candle
// - PUT /api/admin/candles/:id - Update candle
// - DELETE /api/admin/candles/:id - Delete candle
// - GET /api/admin/supplies - Fetch all supplies
// - POST /api/admin/supplies - Create new supply
// - PUT /api/admin/supplies/:id - Update supply
// - DELETE /api/admin/supplies/:id - Delete supply

import { coursesData, type Course } from "./courses-data"
import { candlesData } from "./products-data"

export interface Module {
  id: string
  courseId: string
  title: string
  duration: string
  description: string
  materials?: string
  priceInUSD?: number
  order: number
}

export interface Candle {
  id: string
  name: string
  description: string
  fullDescription?: string
  price: number
  image: string
  category: string
  badge?: string
  collection?: string
  images?: string[]
  sizes?: { size: string; price: number; burnTime: string }[]
  colors?: { name: string; hex: string }[]
  stockStatus?: string
  rating?: number
  reviewCount?: number
  scentInspiration?: string
  ingredients?: string[]
  scentNotes?: {
    top: string
    middle: string
    base: string
  }
  specifications?: any
  careInstructions?: string
  features?: string[]
}

export interface Supply {
  id: string
  name: string
  description: string
  fullDescription?: string
  price: number
  image: string
  category: string
  rating?: number
  reviews?: number
  stock?: string
  badge?: string
  size?: string
  brand?: string
}

// Mock data for modules - in production, fetch from backend
export const modulesData: Module[] = [
  {
    id: "mod-1",
    courseId: "soy-candle-fundamentals",
    title: "Introduction & Wax Selection",
    duration: "45 minutes",
    description: "Learn about different wax types, their properties, and how to choose the right wax for your candles.",
    materials: "https://example.com/materials/wax-guide.pdf",
    order: 1,
  },
  {
    id: "mod-2",
    courseId: "soy-candle-fundamentals",
    title: "Wick Selection & Container Prep",
    duration: "30 minutes",
    description: "Master wick sizing, placement techniques, and proper container preparation.",
    materials: "https://example.com/materials/wick-guide.pdf",
    order: 2,
  },
  {
    id: "mod-3",
    courseId: "advanced-candle-techniques",
    title: "Advanced Layering Techniques",
    duration: "3 hours",
    description: "Master the art of creating stunning multi-layer candles with perfect color transitions.",
    priceInUSD: 150,
    order: 1,
  },
]

// Local storage keys
const COURSES_STORAGE_KEY = "admin_courses"
const MODULES_STORAGE_KEY = "admin_modules"
const CANDLES_STORAGE_KEY = "admin_candles"
const SUPPLIES_STORAGE_KEY = "admin_supplies"

// Initialize local storage with default data
export function initializeAdminData() {
  if (typeof window === "undefined") return

  console.log("[v0] Initializing admin data...")

  if (!localStorage.getItem(COURSES_STORAGE_KEY)) {
    console.log("[v0] Initializing courses data")
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(coursesData))
  }
  if (!localStorage.getItem(MODULES_STORAGE_KEY)) {
    console.log("[v0] Initializing modules data")
    localStorage.setItem(MODULES_STORAGE_KEY, JSON.stringify(modulesData))
  }
  if (!localStorage.getItem(CANDLES_STORAGE_KEY)) {
    console.log("[v0] Initializing candles data")
    localStorage.setItem(CANDLES_STORAGE_KEY, JSON.stringify(candlesData))
  }
  if (!localStorage.getItem(SUPPLIES_STORAGE_KEY)) {
    console.log("[v0] Initializing supplies data (empty)")
    // Initialize with empty array, will be populated from supplies page
    localStorage.setItem(SUPPLIES_STORAGE_KEY, JSON.stringify([]))
  }

  console.log("[v0] Admin data initialization complete")
}

// Courses CRUD
export function getAllCourses(): Course[] {
  if (typeof window === "undefined") return coursesData
  const data = localStorage.getItem(COURSES_STORAGE_KEY)
  return data ? JSON.parse(data) : coursesData
}

export function createCourse(course: Course) {
  const courses = getAllCourses()
  courses.push(course)
  localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses))
  syncCoursesToMainSite() // Sync after create
  // TODO: Replace with API call - POST /api/admin/courses
  return course
}

export function updateCourse(id: string, updates: Partial<Course>) {
  const courses = getAllCourses()
  const index = courses.findIndex((c) => c.id === id)
  if (index !== -1) {
    courses[index] = { ...courses[index], ...updates }
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses))
    syncCoursesToMainSite() // Sync after update
  }
  // TODO: Replace with API call - PUT /api/admin/courses/:id
  return courses[index]
}

export function deleteCourse(id: string) {
  const courses = getAllCourses()
  const filtered = courses.filter((c) => c.id !== id)
  localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(filtered))
  syncCoursesToMainSite() // Sync after delete
  // TODO: Replace with API call - DELETE /api/admin/courses/:id
}

// Modules CRUD
export function getAllModules(): Module[] {
  if (typeof window === "undefined") return modulesData
  const data = localStorage.getItem(MODULES_STORAGE_KEY)
  return data ? JSON.parse(data) : modulesData
}

export function getModulesByCourse(courseId: string): Module[] {
  return getAllModules().filter((m) => m.courseId === courseId)
}

export function createModule(module: Module) {
  const modules = getAllModules()
  modules.push(module)
  localStorage.setItem(MODULES_STORAGE_KEY, JSON.stringify(modules))
  // TODO: Replace with API call - POST /api/admin/modules
  return module
}

export function updateModule(id: string, updates: Partial<Module>) {
  const modules = getAllModules()
  const index = modules.findIndex((m) => m.id === id)
  if (index !== -1) {
    modules[index] = { ...modules[index], ...updates }
    localStorage.setItem(MODULES_STORAGE_KEY, JSON.stringify(modules))
  }
  // TODO: Replace with API call - PUT /api/admin/modules/:id
  return modules[index]
}

export function deleteModule(id: string) {
  const modules = getAllModules()
  const filtered = modules.filter((m) => m.id !== id)
  localStorage.setItem(MODULES_STORAGE_KEY, JSON.stringify(filtered))
  // TODO: Replace with API call - DELETE /api/admin/modules/:id
}

// Candles CRUD
export function getAllCandles(): Candle[] {
  if (typeof window === "undefined") return candlesData as Candle[]
  const data = localStorage.getItem(CANDLES_STORAGE_KEY)
  return data ? JSON.parse(data) : candlesData
}

export function createCandle(candle: Candle) {
  const candles = getAllCandles()
  candles.push(candle)
  localStorage.setItem(CANDLES_STORAGE_KEY, JSON.stringify(candles))
  syncCandlesToMainSite()
  // TODO: Replace with API call - POST /api/admin/candles
  return candle
}

export function updateCandle(id: string, updates: Partial<Candle>) {
  const candles = getAllCandles()
  const index = candles.findIndex((c) => c.id === id)
  if (index !== -1) {
    candles[index] = { ...candles[index], ...updates }
    localStorage.setItem(CANDLES_STORAGE_KEY, JSON.stringify(candles))
    syncCandlesToMainSite()
  }
  // TODO: Replace with API call - PUT /api/admin/candles/:id
  return candles[index]
}

export function deleteCandle(id: string) {
  const candles = getAllCandles()
  const filtered = candles.filter((c) => c.id !== id)
  localStorage.setItem(CANDLES_STORAGE_KEY, JSON.stringify(filtered))
  syncCandlesToMainSite()
  // TODO: Replace with API call - DELETE /api/admin/candles/:id
}

// Supplies CRUD
export function getAllSupplies(): Supply[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(SUPPLIES_STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function createSupply(supply: Supply) {
  const supplies = getAllSupplies()
  supplies.push(supply)
  localStorage.setItem(SUPPLIES_STORAGE_KEY, JSON.stringify(supplies))
  syncSuppliesToMainSite()
  // TODO: Replace with API call - POST /api/admin/supplies
  return supply
}

export function updateSupply(id: string, updates: Partial<Supply>) {
  const supplies = getAllSupplies()
  const index = supplies.findIndex((s) => s.id === id)
  if (index !== -1) {
    supplies[index] = { ...supplies[index], ...updates }
    localStorage.setItem(SUPPLIES_STORAGE_KEY, JSON.stringify(supplies))
    syncSuppliesToMainSite()
  }
  // TODO: Replace with API call - PUT /api/admin/supplies/:id
  return supplies[index]
}

export function deleteSupply(id: string) {
  const supplies = getAllSupplies()
  const filtered = supplies.filter((s) => s.id !== id)
  localStorage.setItem(SUPPLIES_STORAGE_KEY, JSON.stringify(filtered))
  syncSuppliesToMainSite()
  // TODO: Replace with API call - DELETE /api/admin/supplies/:id
}

// Sync functions
export function syncCoursesToMainSite() {
  if (typeof window !== "undefined") {
    const courses = getAllCourses()
    window.dispatchEvent(new CustomEvent("coursesUpdated", { detail: courses }))
  }
}

export function syncCandlesToMainSite() {
  if (typeof window !== "undefined") {
    const candles = getAllCandles()
    window.dispatchEvent(new CustomEvent("candlesUpdated", { detail: candles }))
  }
}

export function syncSuppliesToMainSite() {
  if (typeof window !== "undefined") {
    const supplies = getAllSupplies()
    window.dispatchEvent(new CustomEvent("suppliesUpdated", { detail: supplies }))
  }
}
