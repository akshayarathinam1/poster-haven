"use client";

import React from "react";
import Link from "next/link";
import {
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Lock,
  Truck,
  Recycle,
  Star,
  RotateCcw,
  Heart,
  CreditCard,
  Smartphone,
  Banknote,
  Coins,
  Image as ImageIcon
} from "lucide-react";

const footerLinks = {
  Shop: [
    { href: "/shop", label: "All Posters" },
    { href: "/shop?category=abstract", label: "Abstract" },
    { href: "/shop?category=photography", label: "Photography" },
    { href: "/shop?category=minimalist", label: "Minimalist" },
    { href: "/shop?category=vintage", label: "Vintage" },
    { href: "/shop?isSale=true", label: "Sale" },
  ],
  Support: [
    { href: "/about", label: "About Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/shipping", label: "Shipping Info" },
    { href: "/returns", label: "Returns Policy" },
    { href: "/contact", label: "Contact Us" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/refund", label: "Refund Policy" },
  ],
  Account: [
    { href: "/account/orders", label: "Track Orders" },
    { href: "/account/orders", label: "Order History" },
    { href: "/account/settings", label: "Settings" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid var(--surface-border)",
        marginTop: "80px",
      }}
    >
      {/* Main Footer */}
      <div
        className="container-custom"
        style={{
          padding: "64px 40px 48px",
          display: "grid",
          gridTemplateColumns: "2fr repeat(4, 1fr)",
          gap: "48px",
        }}
      >
        {/* Brand Column */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                background: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ImageIcon size={20} color="#0d0d0d" />
            </div>
            <span
              style={{
                fontFamily: "var(--font-display, serif)",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              Poster Haven
            </span>
          </div>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "15px",
              lineHeight: 1.7,
              maxWidth: "320px",
              marginBottom: "24px",
            }}
          >
            Curated premium wall art, printed with museum-grade precision and
            delivered to your door. From bold abstracts to stunning photography
            — art for every wall, every story.
          </p>

          {/* Newsletter */}
          <div style={{ marginBottom: "28px" }}>
            <p className="text-label" style={{ marginBottom: "10px" }}>
              Stay in the loop
            </p>
            <div style={{ display: "flex", gap: "0" }}>
              <input
                type="email"
                placeholder="your@email.com"
                className="input-base"
                style={{ flex: 1, fontSize: "13px" }}
                suppressHydrationWarning
              />
              <button
                className="btn-primary"
                style={{ padding: "12px 20px", whiteSpace: "nowrap" }}
                suppressHydrationWarning
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div style={{ display: "flex", gap: "12px" }}>
            {[
              { icon: <Instagram size={18} />, href: "#" },
              { icon: <Twitter size={18} />, href: "#" },
              { icon: <Facebook size={18} />, href: "#" },
              { icon: <Youtube size={18} />, href: "#" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                style={{
                  width: "40px",
                  height: "40px",
                  background: "var(--surface-raised)",
                  border: "1px solid var(--surface-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)";
                  (e.currentTarget as HTMLElement).style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--surface-border)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                }}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-label" style={{ marginBottom: "20px" }}>
              {title}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {links.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    style={{
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      fontSize: "14px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--primary)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "var(--text-secondary)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div
        style={{
          borderTop: "1px solid var(--surface-border)",
          padding: "24px 40px",
        }}
      >
        <div
          className="container-custom"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "48px",
            flexWrap: "wrap",
          }}
        >
          {[
            { icon: <Lock size={16} />, text: "Secure Payments" },
            { icon: <Truck size={16} />, text: "Fast Delivery" },
            { icon: <Recycle size={16} />, text: "Eco Packaging" },
            { icon: <Star size={16} />, text: "Premium Quality" },
            { icon: <RotateCcw size={16} />, text: "Easy Returns" },
          ].map((badge) => (
            <div
              key={badge.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--text-muted)",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              {badge.icon}
              {badge.text}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid var(--surface-border)",
          padding: "20px 40px",
        }}
      >
        <div
          className="container-custom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "13px", display: "flex", alignItems: "center", gap: "4px" }}>
            © 2025 Poster Haven. All rights reserved. Made with <Heart size={12} fill="var(--accent-red)" color="var(--accent-red)" /> in India.
          </p>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {[
              <CreditCard size={18} key="card" />,
              <Banknote size={18} key="bank" />,
              <Smartphone size={18} key="phone" />,
              <Coins size={18} key="coins" />
            ].map((icon, i) => (
              <span
                key={i}
                style={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--surface-border)",
                  padding: "6px 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "2px",
                  color: "var(--text-muted)"
                }}
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div:first-of-type {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          footer > div:first-of-type {
            grid-template-columns: 1fr !important;
            padding: 40px 16px 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
