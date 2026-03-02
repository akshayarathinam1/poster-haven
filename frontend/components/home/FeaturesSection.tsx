"use client";

import React from "react";
import { Printer, Globe, Package, Recycle, RotateCcw, Palette } from "lucide-react";

const features = [
  {
    icon: <Printer size={24} />,
    title: "Museum-Grade Printing",
    description:
      "Archival inks on premium paper stocks. We use industry-leading Epson and Canon printers calibrated to the highest colour standards.",
  },
  {
    icon: <Globe size={24} />,
    title: "India-Wide Delivery",
    description:
      "Flat-rate shipping across India with tracking. Free shipping on orders above ₹2,999. Express delivery available.",
  },
  {
    icon: <Package size={24} />,
    title: "Protective Packaging",
    description:
      "Every print is rolled in acid-free tissue and shipped in a rigid cardboard tube to ensure it arrives pristine.",
  },
  {
    icon: <Recycle size={24} />,
    title: "Eco-Conscious",
    description:
      "FSC-certified paper, water-based inks, and recyclable packaging. Beautiful art that doesn't cost the earth.",
  },
  {
    icon: <RotateCcw size={24} />,
    title: "Easy 30-Day Returns",
    description:
      "If your print arrives damaged or you're not fully satisfied, we'll replace it or issue a full refund. No questions asked.",
  },
  {
    icon: <Palette size={24} />,
    title: "Artist Fair Pay",
    description:
      "We work directly with artists and pay fair royalties on every sale. Buying from us supports independent creators.",
  },
];

export default function FeaturesSection() {
  return (
    <section style={{ padding: "80px 0" }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="text-label" style={{ marginBottom: "12px" }}>
            Why Poster Haven
          </p>
          <h2 className="heading-section" style={{ color: "var(--text-primary)" }}>
            Crafted with care
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
          }}
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{
                padding: "32px",
                border: "1px solid var(--surface-border)",
                transition: "border-color 0.3s ease, transform 0.3s ease",
                animation: `fadeInUp 0.6s ease ${i * 0.08}s both`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(232,197,71,0.35)";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--surface-border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  background: "rgba(232,197,71,0.1)",
                  border: "1px solid rgba(232,197,71,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  marginBottom: "20px",
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "17px",
                  color: "var(--text-primary)",
                  marginBottom: "10px",
                  fontFamily: "var(--font-display, serif)",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                }}
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          [data-features] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          [data-features] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
