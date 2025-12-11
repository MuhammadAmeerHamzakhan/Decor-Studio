"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { candlesData } from "@/lib/products-data"
import { useToast } from "@/hooks/use-toast"
import { useCurrency } from "@/contexts/currency-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stockStatus?: string
  collection?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [candles, setCandles] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Product | null>(null)
  const [activeTab, setActiveTab] = useState("candles")
  const { toast } = useToast()
  const { selectedCountry, convertAndFormat } = useCurrency()

  useEffect(() => {
    // Load candles from products-data
    const candleProducts = candlesData.map((candle) => ({
      id: candle.id,
      name: candle.name,
      description: candle.description,
      price: candle.price,
      category: candle.category,
      image: candle.image,
      stockStatus: candle.stockStatus,
      collection: candle.collection,
    }))
    setCandles(candleProducts)

    // Load other products from localStorage
    const stored = localStorage.getItem("admin_products")
    if (stored) {
      setProducts(JSON.parse(stored))
    }
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    stockStatus: "In Stock",
  })

  const handleOpenDialog = (item?: Product) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        name: item.name,
        price: item.price.toString(),
        category: item.category,
        description: item.description,
        image: item.image,
        stockStatus: item.stockStatus || "In Stock",
      })
    } else {
      setEditingItem(null)
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
        stockStatus: "In Stock",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newItem: Product = {
      id: editingItem?.id || `product-${Date.now()}`,
      name: formData.name,
      price: Number.parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      image: formData.image,
      stockStatus: formData.stockStatus,
    }

    if (activeTab === "candles") {
      // Update candles
      const updatedCandles = editingItem
        ? candles.map((c) => (c.id === editingItem.id ? newItem : c))
        : [...candles, newItem]
      setCandles(updatedCandles)
      // TODO: In production, sync with candlesData
    } else {
      // Update other products
      const updatedProducts = editingItem
        ? products.map((p) => (p.id === editingItem.id ? newItem : p))
        : [...products, newItem]
      setProducts(updatedProducts)
      localStorage.setItem("admin_products", JSON.stringify(updatedProducts))
      // TODO: Replace with API call - POST/PUT /api/products
    }

    toast({
      title: editingItem ? "Product updated" : "Product added",
      description: editingItem ? "Product has been updated successfully" : "New product has been added to catalog",
    })
    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    if (activeTab === "candles") {
      setCandles(candles.filter((c) => c.id !== id))
    } else {
      const updated = products.filter((p) => p.id !== id)
      setProducts(updated)
      localStorage.setItem("admin_products", JSON.stringify(updated))
      // TODO: Replace with API call - DELETE /api/products/:id
    }

    toast({
      title: "Product deleted",
      description: "Product has been removed from catalog",
    })
  }

  const currentItems = activeTab === "candles" ? candles : products
  const filteredItems = currentItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Products & Candles</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog and pricing</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Product" : "Add New Product"}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Update product details" : "Fill in the details to add a new product"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Base Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                  {formData.price && (
                    <p className="text-xs text-muted-foreground">
                      Converted: {convertAndFormat(Number.parseFloat(formData.price))}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stockStatus">Stock Status</Label>
                <Input
                  id="stockStatus"
                  value={formData.stockStatus}
                  onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
                  placeholder="In Stock, Low Stock, Out of Stock"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/image.jpg"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Mock only - In production, this would be an image uploader
                </p>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingItem ? "Update Product" : "Add Product"}</Button>
              </DialogFooter>
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
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="candles">Candles ({candles.length})</TabsTrigger>
          <TabsTrigger value="other">Other Products ({products.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="candles" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Luxury Candles</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Collection</TableHead>
                    <TableHead>Base Price (USD)</TableHead>
                    <TableHead>Price ({selectedCountry.currency})</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="h-12 w-12 relative rounded-md overflow-hidden bg-muted">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.collection || "—"}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell className="font-semibold">{convertAndFormat(item.price)}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.stockStatus === "In Stock"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                          }
                        >
                          {item.stockStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleOpenDialog(item)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-700"
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
        </TabsContent>

        <TabsContent value="other" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Other Products</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No other products yet</p>
                  <Button onClick={() => handleOpenDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Product
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Base Price (USD)</TableHead>
                      <TableHead>Price ({selectedCountry.currency})</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="h-12 w-12 relative rounded-md overflow-hidden bg-muted">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell className="font-semibold">{convertAndFormat(item.price)}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.stockStatus === "In Stock"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {item.stockStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="ghost" onClick={() => handleOpenDialog(item)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDelete(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
