"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, Flame } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  getAllCandles,
  createCandle,
  updateCandle,
  deleteCandle,
  initializeAdminData,
  type Candle,
} from "@/lib/admin-data"
import { useCurrency } from "@/contexts/currency-context"
import Image from "next/image"

export default function AdminCandlesPage() {
  const [candles, setCandles] = useState<Candle[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingCandle, setEditingCandle] = useState<Candle | null>(null)
  const { toast } = useToast()
  const { convertAndFormat, selectedCountry } = useCurrency()

  useEffect(() => {
    console.log("[v0] Admin Candles page mounted")
    initializeAdminData()
    loadCandles()
  }, [])

  const loadCandles = () => {
    const loadedCandles = getAllCandles()
    console.log("[v0] Loaded candles:", loadedCandles.length)
    setCandles(loadedCandles)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const candleData: Candle = {
      id: editingCandle?.id || `candle-${Date.now()}`,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      fullDescription: formData.get("fullDescription") as string,
      price: Number.parseFloat(formData.get("price") as string),
      image: formData.get("image") as string,
      category: formData.get("category") as string,
      stockStatus: formData.get("stockStatus") as string,
      badge: (formData.get("badge") as string) || undefined,
      rating: 4.5,
      reviewCount: 0,
    }

    if (editingCandle) {
      updateCandle(editingCandle.id, candleData)
      toast({
        title: "Success",
        description: "Candle updated successfully",
      })
    } else {
      createCandle(candleData)
      toast({
        title: "Success",
        description: "Candle created successfully",
      })
    }

    loadCandles()
    setIsOpen(false)
    setEditingCandle(null)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this candle?")) {
      deleteCandle(id)
      loadCandles()
      toast({
        title: "Success",
        description: "Candle deleted successfully",
      })
    }
  }

  const handleEdit = (candle: Candle) => {
    setEditingCandle(candle)
    setIsOpen(true)
  }

  const handleDialogClose = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setEditingCandle(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Flame className="h-8 w-8 text-primary" />
            Candles Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage your luxury candle collection</p>
        </div>
        <Dialog open={isOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Candle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCandle ? "Edit Candle" : "Add New Candle"}</DialogTitle>
              <DialogDescription>
                {editingCandle ? "Update the candle details" : "Create a new candle product"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Candle Name *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingCandle?.name}
                  required
                  placeholder="e.g., Lavender Bliss"
                />
              </div>
              <div>
                <Label htmlFor="description">Short Description *</Label>
                <Input
                  id="description"
                  name="description"
                  defaultValue={editingCandle?.description}
                  required
                  placeholder="Brief description"
                />
              </div>
              <div>
                <Label htmlFor="fullDescription">Full Description</Label>
                <Textarea
                  id="fullDescription"
                  name="fullDescription"
                  defaultValue={editingCandle?.fullDescription}
                  rows={3}
                  placeholder="Detailed product description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={editingCandle?.price}
                    required
                    placeholder="42.00"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select name="category" defaultValue={editingCandle?.category || "Floral"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Floral">Floral</SelectItem>
                      <SelectItem value="Woody">Woody</SelectItem>
                      <SelectItem value="Fresh">Fresh</SelectItem>
                      <SelectItem value="Gourmand">Gourmand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stockStatus">Stock Status *</Label>
                  <Select name="stockStatus" defaultValue={editingCandle?.stockStatus || "In Stock"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In Stock">In Stock</SelectItem>
                      <SelectItem value="Low Stock">Low Stock</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="badge">Badge (Optional)</Label>
                  <Input id="badge" name="badge" defaultValue={editingCandle?.badge} placeholder="e.g., Best Seller" />
                </div>
              </div>
              <div>
                <Label htmlFor="image">Image URL *</Label>
                <Input
                  id="image"
                  name="image"
                  defaultValue={editingCandle?.image}
                  required
                  placeholder="/path-to-image.jpg"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => handleDialogClose(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingCandle ? "Update Candle" : "Create Candle"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price ({selectedCountry.code})</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Badge</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No candles found. Add your first candle!
                </TableCell>
              </TableRow>
            ) : (
              candles.map((candle) => (
                <TableRow key={candle.id}>
                  <TableCell>
                    <div className="relative w-12 h-12 rounded overflow-hidden bg-secondary">
                      <Image src={candle.image || "/placeholder.svg"} alt={candle.name} fill className="object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{candle.name}</TableCell>
                  <TableCell>{candle.category}</TableCell>
                  <TableCell>{convertAndFormat(candle.price)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        candle.stockStatus === "In Stock"
                          ? "bg-green-100 text-green-800"
                          : candle.stockStatus === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {candle.stockStatus}
                    </span>
                  </TableCell>
                  <TableCell>{candle.badge || "-"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(candle)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(candle.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
