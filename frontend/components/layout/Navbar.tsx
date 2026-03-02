"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ArrowRight,
  Palette,
  Image as ImageIcon
} from "lucide-react";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=abstract", label: "Abstract" },
  { href: "/shop?category=photography", label: "Photography" },
  { href: "/shop?category=minimalist", label: "Minimalist" },
  { href: "/shop?category=vintage", label: "Vintage" },
];

export default function Navbar() {
  const { itemCount, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div
        style={{
          background: "var(--primary)",
          color: "#0d0d0d",
          textAlign: "center",
          padding: "8px 40px",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.05em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px"
        }}
      >
        <Palette size={14} />
        <span>
          Free shipping on orders above ₹2,999 &nbsp;|&nbsp; Use code{" "}
          <strong>ARTLOVER10</strong> for 10% off
        </span>
      </div>

      {/* Main Navbar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled
            ? "rgba(13,13,13,0.96)"
            : "rgba(13,13,13,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--surface-border)",
          transition: "all 0.3s ease",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div
          className="container-custom"
          style={{
            display: "flex",
            alignItems: "center",
            height: "70px",
            gap: "32px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
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
                letterSpacing: "-0.02em",
              }}
            >
              Poster Haven
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              flex: 1,
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "8px 14px",
                  transition: "color 0.2s ease",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--primary)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text-secondary)")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen((o) => !o)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s",
              }}
              aria-label="Search"
              title="Search"
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              id="navbar-cart-btn"
              style={{
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                padding: "10px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s",
              }}
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    background: "var(--primary)",
                    color: "#0d0d0d",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    fontSize: "10px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "fadeIn 0.3s ease",
                  }}
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            {/* Account */}
            <Link
              href="/account/orders"
              style={{
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              aria-label="Account"
            >
              <User size={20} />
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                padding: "10px",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="mobile-menu-btn"
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Dropdown */}
        {searchOpen && (
          <div
            style={{
              background: "var(--surface)",
              borderTop: "1px solid var(--surface-border)",
              padding: "16px 24px",
              animation: "fadeInUp 0.2s ease",
            }}
          >
            <div className="container-custom">
              <div style={{ position: "relative", maxWidth: "600px" }}>
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posters, artists, styles..."
                  className="input-base"
                  style={{ paddingRight: "50px" }}
                />
                <Link
                  href={`/shop?q=${searchQuery}`}
                  onClick={() => setSearchOpen(false)}
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--primary)",
                    cursor: "pointer",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            style={{
              background: "var(--surface)",
              borderTop: "1px solid var(--surface-border)",
              padding: "16px 24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              animation: "fadeInUp 0.2s ease",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: 500,
                  padding: "12px 0",
                  borderBottom: "1px solid var(--surface-border)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
