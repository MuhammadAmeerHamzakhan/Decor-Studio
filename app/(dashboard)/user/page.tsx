"use client";

import { useAuth } from "@/contexts/auth-context";
import { useCurrency } from "@/contexts/currency-context"; // Assuming you have this
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingBag, Heart, Globe, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { mockEnrollments } from "@/lib/mock-data"; // Keep mocks until LMS is ready

export default function UserDashboardPage() {
  const { user } = useAuth();
  // Safe fallback if currency context is missing or loading
  const { selectedCountry, showCountrySelector } = useCurrency() || { 
    selectedCountry: { name: "US", flag: "🇺🇸", currency: "USD", symbol: "$" }, 
    showCountrySelector: () => {} 
  };
  
  const [enrollmentsCount, setEnrollmentsCount] = useState(0);

  useEffect(() => {
    // keeping mock logic for now until LMS tables are built
    const stored = localStorage.getItem("enrollments");
    const allEnrollments = stored ? JSON.parse(stored) : mockEnrollments;
    // user.id is now the Real Supabase ID
    const userEnrollments = allEnrollments.filter((e: any) => e.userId === user?.id);
    setEnrollmentsCount(userEnrollments.length);
  }, [user]);

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold">
          Welcome back, {user?.full_name || user?.email?.split("@")[0]}!
        </h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your account today</p>
      </div>

      <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Your Location & Currency
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{selectedCountry.flag}</span>
            <div>
              <p className="font-semibold text-lg">{selectedCountry.name}</p>
              <p className="text-sm text-muted-foreground">
                Currency: {selectedCountry.currency} ({selectedCountry.symbol})
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={showCountrySelector}>
            Change Country
          </Button>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* Placeholder data until Order Table is ready */}
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Recent orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Purchased</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Across all orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrollments</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrollmentsCount}</div>
            <p className="text-xs text-muted-foreground">Active courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Saved for later</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest orders and interactions</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="p-4 text-center text-muted-foreground bg-muted/20 rounded-lg">
                No recent activity found.
            </div>
        </CardContent>
      </Card>
    </div>
  );
}