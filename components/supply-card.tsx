import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Supply } from "@/lib/products"

interface SupplyCardProps {
  supply: Supply
}

export function SupplyCard({ supply }: SupplyCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <Link href={`/supplies/${supply.id}`}>
          <div className="relative overflow-hidden aspect-square">
            <img
              src={supply.image || "/placeholder.svg"}
              alt={supply.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {!supply.inStock && (
              <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">Out of Stock</Badge>
            )}
          </div>
        </Link>
        <div className="p-6 bg-card">
          <Link href={`/supplies/${supply.id}`}>
            <h3 className="font-serif text-xl font-semibold mb-2 hover:text-primary transition-colors">
              {supply.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{supply.description}</p>
          {supply.specifications && <p className="text-xs text-muted-foreground mb-4">{supply.specifications}</p>}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">${supply.price}</span>
            <Button
              size="sm"
              className="bg-foreground text-background hover:bg-foreground/90"
              disabled={!supply.inStock}
            >
              {supply.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
