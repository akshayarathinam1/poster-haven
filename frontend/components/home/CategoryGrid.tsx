"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_CATEGORIES } from "@/lib/mockData";
import { ArrowRight } from "lucide-react";



export default function CategoryGrid() {
  return (
    <section style={{ padding: "80px 0" }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p className="text-label" style={{ marginBottom: "12px" }}>
            Browse By Theme
          </p>
          <h2 className="heading-section" style={{ color: "var(--text-primary)" }}>
            Explore Collections
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto auto",
            gap: "16px",
          }}
        >
          {MOCK_CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              style={{
                textDecoration: "none",
                gridColumn: i === 0 ? "span 2" : "span 1",
                gridRow: i === 0 ? "span 2" : "span 1",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: i === 0 ? "540px" : "260px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "1px solid var(--surface-border)",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(232,197,71,0.4)";
                  const img = (e.currentTarget as HTMLElement).querySelector("img");
                  if (img) (img as HTMLElement).style.transform = "scale(1.07)";
                  const overlay = (e.currentTarget as HTMLElement).querySelector("[data-overlay]");
                  if (overlay) (overlay as HTMLElement).style.opacity = "0.65";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--surface-border)";
                  const img = (e.currentTarget as HTMLElement).querySelector("img");
                  if (img) (img as HTMLElement).style.transform = "scale(1)";
                  const overlay = (e.currentTarget as HTMLElement).querySelector("[data-overlay]");
                  if (overlay) (overlay as HTMLElement).style.opacity = "0.5";
                }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 600px) 100vw, 50vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />
                {/* Dark overlay */}
                <div
                  data-overlay
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.2) 60%, transparent 100%)",
                    opacity: 0.5,
                    transition: "opacity 0.3s ease",
                  }}
                />
                {/* Content */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "24px",
                    left: "24px",
                    right: "24px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display, serif)",
                      fontSize: i === 0 ? "28px" : "18px",
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: "6px",
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.7)",
                      marginBottom: "10px",
                      display: i === 0 ? "block" : "none",
                      lineHeight: 1.5,
                    }}
                  >
                    {cat.description}
                  </p>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--primary)",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    {cat.productCount} works <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [data-category-grid] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 500px) {
          [data-category-grid] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
