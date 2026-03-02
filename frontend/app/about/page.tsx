import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Poster Haven",
  description:
    "Poster Haven is on a mission to make premium art accessible to everyone. Learn about our story, our artists, and our craft.",
};

const team = [
  {
    name: "Kavya Nair",
    role: "Founder & Creative Director",
    bio: "Former gallery curator with 12 years of art world experience. Kavya founded Poster Haven to democratise access to great art.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
  },
  {
    name: "Arjun Patel",
    role: "Head of Print Production",
    bio: "Master printer with 15 years of experience. Arjun oversees every print that leaves our facility, ensuring museum-grade quality.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
  {
    name: "Sanya Menon",
    role: "Artist Relations Lead",
    bio: "Art collector and advocate, Sanya works directly with artists worldwide to grow our curated collection.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
  },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          padding: "100px 24px",
          background:
            "linear-gradient(135deg, #0d0d0d 0%, #1a1209 100%)",
          borderBottom: "1px solid var(--surface-border)",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232,197,71,0.05) 0%, transparent 70%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto" }}>
          <p className="text-label" style={{ marginBottom: "16px" }}>
            Our Story
          </p>
          <h1
            className="heading-display"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "var(--text-primary)",
              marginBottom: "20px",
            }}
          >
            Art should be for{" "}
            <span style={{ color: "var(--primary)", fontStyle: "italic" }}>
              everyone
            </span>
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "18px",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}
          >
            We started Poster Haven in 2021 with a simple belief: exceptional art
            shouldn&apos;t be locked behind gallery walls and steep price tags. 
            Great art should live where you live.
          </p>
          <Link href="/shop" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <span>Explore Our Collection</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "80px 24px" }}>
        <div
          className="container-custom"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
          <div>
            <p className="text-label" style={{ marginBottom: "12px" }}>
              Our Mission
            </p>
            <h2
              className="heading-section"
              style={{ color: "var(--text-primary)", marginBottom: "20px" }}
            >
              Print. Ship. Inspire.
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "15px",
                lineHeight: 1.8,
                marginBottom: "20px",
              }}
            >
              We partner with independent artists across the globe to bring their
              work to walls across India. Every print is produced in our certified
              facility using archival inks and FSC-certified papers — because great
              art deserves great materials.
            </p>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "15px",
                lineHeight: 1.8,
              }}
            >
              We pay our artists fair royalties on every single sale. When you
              buy from Poster Haven, you&apos;re not just decorating your wall —
              you&apos;re directly supporting an independent creator.
            </p>
          </div>
          <div
            style={{
              position: "relative",
              height: "500px",
              overflow: "hidden",
              border: "1px solid rgba(232,197,71,0.2)",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80"
              alt="Our printing studio"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          padding: "64px 24px",
          background: "var(--surface)",
          borderTop: "1px solid var(--surface-border)",
          borderBottom: "1px solid var(--surface-border)",
        }}
      >
        <div
          className="container-custom"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "32px",
            textAlign: "center",
          }}
        >
          {[
            { value: "500+", label: "Unique Artworks" },
            { value: "50+", label: "Partner Artists" },
            { value: "12K+", label: "Orders Fulfilled" },
            { 
              value: (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  4.9 <Star size={32} fill="var(--primary)" strokeWidth={0} />
                </span>
              ), 
              label: "Average Rating" 
            },
          ].map((s) => (
            <div key={s.label}>
              <p
                style={{
                  fontFamily: "var(--font-display, serif)",
                  fontSize: "3rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  marginBottom: "8px",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "80px 24px" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p className="text-label" style={{ marginBottom: "12px" }}>
              The People Behind the Prints
            </p>
            <h2
              className="heading-section"
              style={{ color: "var(--text-primary)" }}
            >
              Meet the team
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
            }}
          >
            {team.map((member) => (
              <div
                key={member.name}
                className="card-base"
                style={{ padding: "32px", textAlign: "center" }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    margin: "0 auto 20px",
                    border: "3px solid rgba(232,197,71,0.3)",
                    position: "relative",
                  }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display, serif)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "6px",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-label"
                  style={{ marginBottom: "16px", display: "block" }}
                >
                  {member.role}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "80px 24px",
          background: "var(--surface)",
          borderTop: "1px solid var(--surface-border)",
          textAlign: "center",
        }}
      >
        <h2
          className="heading-section"
          style={{ color: "var(--text-primary)", marginBottom: "16px" }}
        >
          Ready to decorate your walls?
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px", fontSize: "16px" }}>
          Browse our full collection and find art that tells your story.
        </p>
        <Link href="/shop" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <span>Shop All Posters</span>
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
