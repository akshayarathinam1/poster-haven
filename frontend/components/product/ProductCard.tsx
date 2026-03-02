"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/mockData";
import { useCart } from "@/contexts/CartContext";
import { Star, Plus, Check } from "lucide-react";


interface ProductCardProps {
  product: Product;
  layout?: "grid" | "list";
}

export default function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const cheapestVariant = product.variants.reduce((min, v) =>
    v.price < min.price ? v : min
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, cheapestVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.basePrice / product.originalPrice) * 100)
    : 0;

  if (layout === "list") {
    return (
      <Link
        href={`/shop/${product.slug}`}
        style={{ textDecoration: "none" }}
      >
        <div
          className="card-base"
          style={{
            display: "flex",
            gap: "20px",
            padding: "16px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              flexShrink: 0,
              overflow: "hidden",
              background: "var(--surface-border)",
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={120}
              height={120}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <p className="text-label" style={{ marginBottom: "4px" }}>
              {product.category}
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display, serif)",
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "6px",
              }}
            >
              {product.name}
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-muted)",
                marginBottom: "12px",
              }}
            >
              by {product.artistName}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--primary)",
                }}
              >
                {formatPrice(product.basePrice)}
              </span>
              {product.originalPrice && (
                <span className="price-original">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/shop/${product.slug}`} style={{ textDecoration: "none" }}>
      <div
        className="card-base"
        style={{
          cursor: "pointer",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div
          style={{
            position: "relative",
            aspectRatio: "3/4",
            overflow: "hidden",
            background: "#1a1510",
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 25vw"
            style={{
              objectFit: "cover",
              transform: isHovered ? "scale(1.07)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />

          {/* Badges */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {product.isNew && <span className="badge badge-success">New</span>}
            {product.isBestseller && (
              <span className="badge badge-primary">Bestseller</span>
            )}
            {discount > 0 && (
              <span className="badge badge-danger">−{discount}%</span>
            )}
          </div>

          {/* Quick Add */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              transform: isHovered ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.3s ease",
            }}
          >
            <button
              onClick={handleQuickAdd}
              style={{
                width: "100%",
                padding: "14px",
                background: added ? "var(--accent-teal)" : "var(--primary)",
                color: "#0d0d0d",
                border: "none",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {added ? (
                <>
                  <Check size={16} />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "6px",
            }}
          >
            {product.artistName}
          </p>
          <h3
            style={{
              fontFamily: "var(--font-display, serif)",
              fontSize: "15px",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "8px",
              flex: 1,
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </h3>

          {/* Stars */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={12}
                  fill={s <= Math.round(product.rating) ? "var(--primary)" : "none"}
                  color={s <= Math.round(product.rating) ? "var(--primary)" : "var(--text-muted)"}
                />
              ))}
            </div>
            <span
              style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "4px" }}
            >
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: product.isSale ? "var(--accent-red)" : "var(--primary)",
              }}
            >
              {formatPrice(product.basePrice)}
            </span>
            {product.originalPrice && (
              <span className="price-original">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Size Hint */}
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              marginTop: "6px",
            }}
          >
            {product.variants.length} sizes available
          </p>
        </div>
      </div>
    </Link>
  );
}
