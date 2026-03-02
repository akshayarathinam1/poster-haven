"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #0d0d0d 0%, #1a1209 50%, #0d0d0d 100%)",
      }}
    >
      {/* Background Decoration */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(232,197,71,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "600px",
          height: "600px",
          border: "1px solid rgba(232,197,71,0.06)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-80px",
          width: "450px",
          height: "450px",
          border: "1px solid rgba(232,197,71,0.04)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        className="container-custom"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
          padding: "80px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: Text */}
        <div style={{ animation: "fadeInUp 0.8s ease" }}>
          <div className="text-label" style={{ marginBottom: "16px" }}>
            ✦ Premium Wall Art
          </div>
          <h1
            className="heading-display"
            style={{
              fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
              color: "var(--text-primary)",
              marginBottom: "24px",
              lineHeight: 1.05,
            }}
          >
            Art that{" "}
            <span
              style={{
                color: "var(--primary)",
                position: "relative",
                display: "inline-block",
              }}
            >
              speaks
              <svg
                style={{
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  width: "100%",
                }}
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 10 Q50 2 100 6 Q150 10 198 4"
                  stroke="var(--primary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            <br />
            to your{" "}
            <span style={{ fontStyle: "italic", opacity: 0.8 }}>walls</span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "480px",
              marginBottom: "36px",
            }}
          >
            Discover over{" "}
            <strong style={{ color: "var(--text-primary)" }}>500+ artworks</strong> curated
            from world-class artists. Museum-grade printing, eco-friendly packaging,
            delivered straight to your door.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "48px" }}>
            <Link href="/shop" className="btn-primary" style={{ textDecoration: "none" }}>
              Shop Collection →
            </Link>
            <Link
              href="/shop"
              className="btn-outline"
              style={{ textDecoration: "none" }}
            >
              Browse Posters
            </Link>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              paddingTop: "32px",
              borderTop: "1px solid var(--surface-border)",
            }}
          >
            {[
              { value: "500+", label: "Artworks" },
              { value: "12K+", label: "Happy Customers" },
              { value: "50+", label: "Artists" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  style={{
                    fontFamily: "var(--font-display, serif)",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "var(--primary)",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Poster Collage */}
        <div
          style={{
            position: "relative",
            animation: "slideInRight 0.9s ease",
          }}
        >
          {/* Main large poster */}
          <div
            style={{
              position: "relative",
              borderRadius: "0",
              overflow: "hidden",
              aspectRatio: "3/4",
              maxWidth: "380px",
              margin: "0 auto",
              border: "1px solid rgba(232,197,71,0.2)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,197,71,0.1)",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=85"
              alt="Featured art poster"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            {/* Overlay Badge */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                right: "20px",
                background: "rgba(13,13,13,0.85)",
                backdropFilter: "blur(8px)",
                padding: "16px",
                border: "1px solid rgba(232,197,71,0.2)",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-display, serif)",
                }}
              >
                Golden Hour Geometry
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "6px",
                }}
              >
                <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                  by Aria Solano
                </span>
                <span
                  style={{
                    color: "var(--primary)",
                    fontWeight: 700,
                    fontSize: "15px",
                  }}
                >
                  From ₹799
                </span>
              </div>
            </div>
          </div>

          {/* Floating mini cards */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "-20px",
              width: "110px",
              height: "130px",
              overflow: "hidden",
              border: "1px solid rgba(232,197,71,0.3)",
              boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=200&q=80"
              alt="Poster preview"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "80px",
              right: "-30px",
              width: "100px",
              height: "120px",
              overflow: "hidden",
              border: "1px solid rgba(232,197,71,0.2)",
              boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=200&q=80"
              alt="Poster preview"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          animation: "fadeIn 2s ease",
        }}
      >
        <span style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, var(--primary), transparent)",
            animation: "fadeIn 2s ease infinite alternate",
          }}
        />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
