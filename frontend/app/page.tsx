import React from "react";
import Link from "next/link";
import { getFeaturedProducts, getBestsellerProducts, getNewProducts, formatPrice } from "@/lib/mockData";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ProductCard from "@/components/product/ProductCard";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const bestsellers = getBestsellerProducts().slice(0, 4);
  const newArrivals = getNewProducts().slice(0, 4);

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Featured Products */}
      <section style={{ padding: "80px 0", background: "var(--surface)" }}>
        <div className="container-custom">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "40px",
            }}
          >
            <div>
              <p className="text-label" style={{ marginBottom: "8px" }}>
                Hand-picked
              </p>
              <h2 className="heading-section" style={{ color: "var(--text-primary)" }}>
                Featured Artworks
              </h2>
            </div>
            <Link
              href="/shop?featured=true"
              className="btn-outline"
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <span>View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section style={{ padding: "80px 0" }}>
        <div className="container-custom">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "40px",
            }}
          >
            <div>
              <p className="text-label" style={{ marginBottom: "8px" }}>
                Most Popular
              </p>
              <h2 className="heading-section" style={{ color: "var(--text-primary)" }}>
                Bestsellers
              </h2>
            </div>
            <Link
              href="/shop?sort=bestseller"
              className="btn-outline"
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <span>View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="product-grid">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a1209 0%, #0d0d0d 100%)",
          padding: "80px 24px",
          textAlign: "center",
          borderTop: "1px solid var(--surface-border)",
          borderBottom: "1px solid var(--surface-border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Deco */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 50% 100% at 50% 50%, rgba(232,197,71,0.05) 0%, transparent 70%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p className="text-label" style={{ marginBottom: "16px" }}>
            Limited Time Offer
          </p>
          <h2
            className="heading-display"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            Up to <span style={{ color: "var(--primary)" }}>40% off</span>{" "}
            sale prints
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "16px",
              maxWidth: "480px",
              margin: "0 auto 32px",
            }}
          >
            Premium posters at incredible prices. Limited stock available —
            don&apos;t miss out.
          </p>
          <Link
            href="/shop?isSale=true"
            className="btn-primary"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <span>Shop Sale</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section style={{ padding: "80px 0" }}>
        <div className="container-custom">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "40px",
            }}
          >
            <div>
              <p className="text-label" style={{ marginBottom: "8px" }}>
                Just In
              </p>
              <h2 className="heading-section" style={{ color: "var(--text-primary)" }}>
                New Arrivals
              </h2>
            </div>
            <Link
              href="/shop?sort=newest"
              className="btn-outline"
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <span>View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="product-grid">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <FeaturesSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA */}
      <section
        style={{
          padding: "80px 24px",
          textAlign: "center",
          background: "var(--surface)",
          borderTop: "1px solid var(--surface-border)",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p className="text-label" style={{ marginBottom: "16px" }}>
            Join 12,000+ happy customers
          </p>
          <h2
            className="heading-section"
            style={{ color: "var(--text-primary)", marginBottom: "16px" }}
          >
            Ready to transform your space?
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "16px",
              marginBottom: "32px",
            }}
          >
            Browse our full collection of 500+ premium posters and find the
            perfect art for your walls.
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/shop"
              className="btn-primary"
              style={{ textDecoration: "none" }}
            >
              Browse All Posters
            </Link>
            <Link
              href="/about"
              className="btn-outline"
              style={{ textDecoration: "none" }}
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
