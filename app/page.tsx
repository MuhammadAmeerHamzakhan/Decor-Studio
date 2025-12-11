"use client";

import { SiteNavigation } from "@/components/site-navigation";
import { SiteFooter } from "@/components/site-footer";
import { HomeHero } from "@/components/home-hero";
import { WelcomeLevelUp } from "@/components/welcome-level-up";
import { CoursesCandlesHero } from "@/components/courses-candles-hero";
import { FeaturedCollections } from "@/components/featured-collections";
import { BrandStory } from "@/components/brand-story";
import { InstagramGrid } from "@/components/instagram-grid";
import { Testimonials } from "@/components/testimonials";
import { NewsletterCTA } from "@/components/newsletter-cta";
import { RecentlyViewed } from "@/components/recently-viewed";
import { ErrorBoundary } from "@/components/error-boundary";
import { TestBackend } from "@/components/TestBackend";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavigation />

      <main className="flex-1">
        <ErrorBoundary>
          <HomeHero />
          <WelcomeLevelUp />
          <CoursesCandlesHero />
          <FeaturedCollections />
          <Testimonials />
          <BrandStory />
          <InstagramGrid />
          <RecentlyViewed />
          <NewsletterCTA />

          {/* ✅ Backend Test Button */}
          <div className="p-6">
            <TestBackend />
          </div>
        </ErrorBoundary>
      </main>

      <SiteFooter />
    </div>
  );
}
