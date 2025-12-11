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
import { Plus, Pencil, Trash2, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  getAllSupplies,
  createSupply,
  updateSupply,
  deleteSupply,
  initializeAdminData,
  type Supply,
} from "@/lib/admin-data"
import { useCurrency } from "@/contexts/currency-context"
import Image from "next/image"

const categories = [
  "Waxes & Bases",
  "Fragrance Oils",
  "Containers & Jars",
  "Wicks",
  "Molds & Shapes",
  "Tools & Equipment",
  "Dyes & Colors",
]

export default function AdminSuppliesPage() {
  const [supplies, setSupplies] = useState<Supply[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingSupply, setEditingSupply] = useState<Supply | null>(null)
  const { toast } = useToast()
  const { convertAndFormat, selectedCountry } = useCurrency()

  useEffect(() => {
    console.log("[v0] Admin Supplies page mounted")
    initializeAdminData()
    loadSupplies()
  }, [])

  const loadSupplies = () => {
    const loadedSupplies = getAllSupplies()
    console.log("[v0] Loaded supplies:", loadedSupplies.length)
    setSupplies(loadedSupplies)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const supplyData: Supply = {
      id: editingSupply?.id || `supply-${Date.now()}`,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      fullDescription: formData.get("fullDescription") as string,
      price: Number.parseFloat(formData.get("price") as string),
      image: formData.get("image") as string,
      category: formData.get("category") as string,
      stock: formData.get("stock") as string,
      badge: (formData.get("badge") as string) || undefined,
      size: formData.get("size") as string,
      brand: formData.get("brand") as string,
      rating: 4.5,
      reviews: 0,
    }

    if (editingSupply) {
      updateSupply(editingSupply.id, supplyData)
      toast({
        title: "Success",
        description: "Supply updated successfully",
      })
    } else {
      createSupply(supplyData)
      toast({
        title: "Success",
        description: "Supply created successfully",
      })
    }

    loadSupplies()
    setIsOpen(false)
    setEditingSupply(null)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this supply?")) {
      deleteSupply(id)
      loadSupplies()
      toast({
        title: "Success",
        description: "Supply deleted successfully",
      })
    }
  }

  const handleEdit = (supply: Supply) => {
    setEditingSupply(supply)
    setIsOpen(true)
  }

  const handleDialogClose = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setEditingSupply(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Package className="h-8 w-8 text-primary" />
            Supplies Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage candle-making supplies and materials</p>
        </div>
        <Dialog open={isOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Supply
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSupply ? "Edit Supply" : "Add New Supply"}</DialogTitle>
              <DialogDescription>
                {editingSupply ? "Update the supply details" : "Create a new supply product"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingSupply?.name}
                  required
                  placeholder="e.g., Premium Soy Wax"
                />
              </div>
              <div>
                <Label htmlFor="description">Short Description *</Label>
                <Input
                  id="description"
                  name="description"
                  defaultValue={editingSupply?.description}
                  required
                  placeholder="Brief description"
                />
              </div>
              <div>
                <Label htmlFor="fullDescription">Full Description</Label>
                <Textarea
                  id="fullDescription"
                  name="fullDescription"
                  defaultValue={editingSupply?.fullDescription}
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
                    defaultValue={editingSupply?.price}
                    required
                    placeholder="35.00"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select name="category" defaultValue={editingSupply?.category || categories[0]}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stock">Stock Status *</Label>
                  <Select name="stock" defaultValue={editingSupply?.stock || "In Stock"}>
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
                  <Label htmlFor="size">Size/Quantity *</Label>
                  <Input
                    id="size"
                    name="size"
                    defaultValue={editingSupply?.size}
                    required
                    placeholder="e.g., 10lb bag"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" name="brand" defaultValue={editingSupply?.brand} placeholder="e.g., Decor Studio" />
                </div>
                <div>
                  <Label htmlFor="badge">Badge (Optional)</Label>
                  <Input id="badge" name="badge" defaultValue={editingSupply?.badge} placeholder="e.g., Best Seller" />
                </div>
              </div>
              <div>
                <Label htmlFor="image">Image URL *</Label>
                <Input
                  id="image"
                  name="image"
                  defaultValue={editingSupply?.image}
                  required
                  placeholder="/path-to-image.jpg"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => handleDialogClose(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingSupply ? "Update Supply" : "Create Supply"}</Button>
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
              <TableHead>Size</TableHead>
              <TableHead>Price ({selectedCountry.code})</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No supplies found. Add your first supply!
                </TableCell>
              </TableRow>
            ) : (
              supplies.map((supply) => (
                <TableRow key={supply.id}>
                  <TableCell>
                    <div className="relative w-12 h-12 rounded overflow-hidden bg-secondary">
                      <Image src={supply.image || "/placeholder.svg"} alt={supply.name} fill className="object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{supply.name}</TableCell>
                  <TableCell>{supply.category}</TableCell>
                  <TableCell>{supply.size}</TableCell>
                  <TableCell>{convertAndFormat(supply.price)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        supply.stock === "In Stock"
                          ? "bg-green-100 text-green-800"
                          : supply.stock === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {supply.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(supply)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(supply.id)}>
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
