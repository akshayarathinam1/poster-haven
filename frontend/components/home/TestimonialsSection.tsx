import React from "react";
import Link from "next/link";
import { MOCK_TESTIMONIALS } from "@/lib/mockData";
import Image from "next/image";
import { Star } from "lucide-react";

// ...
              {/* Stars */}
              <div
                style={{
                  display: "flex",
                  gap: "2px",
                  marginBottom: "16px",
                  color: "var(--primary)"
                }}
              >
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} fill="var(--primary)" strokeWidth={0} />
                ))}
              </div>

export default function TestimonialsSection() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: "var(--surface)",
        borderTop: "1px solid var(--surface-border)",
        borderBottom: "1px solid var(--surface-border)",
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p className="text-label" style={{ marginBottom: "12px" }}>
            Customer Stories
          </p>
          <h2 className="heading-section" style={{ color: "var(--text-primary)" }}>
            Loved by art lovers
          </h2>
          <div
            className="divider"
            style={{ margin: "16px auto 0" }}
          />
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {MOCK_TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              className="card-base"
              style={{
                padding: "28px",
                animation: `fadeInUp 0.6s ease ${i * 0.1}s both`,
              }}
            >
              {/* Stars */}
              <div
                style={{
                  display: "flex",
                  gap: "2px",
                  marginBottom: "16px",
                  color: "var(--primary)"
                }}
              >
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} fill="var(--primary)" strokeWidth={0} />
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  marginBottom: "20px",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{t.comment}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                    border: "2px solid rgba(232,197,71,0.3)",
                  }}
                >
                  <Image
                    src={t.avatar}
                    alt={t.author}
                    width={44}
                    height={44}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "var(--text-primary)",
                    }}
                  >
                    {t.author}
                  </p>
                  <p
                    style={{ fontSize: "12px", color: "var(--text-muted)" }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link
            href="/shop"
            className="btn-outline"
            style={{ textDecoration: "none" }}
          >
            Start Your Collection
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          [data-testimonials] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          [data-testimonials] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
