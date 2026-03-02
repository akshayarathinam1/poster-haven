"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, formatPrice, MOCK_REVIEWS } from "@/lib/mockData";
import { ProductVariant, ProductSize, ProductFinish } from "@/lib/types";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/product/ProductCard";
import { 
  Star, 
  Zap, 
  Minus, 
  Plus, 
  Check, 
  Heart, 
  Share2, 
  Lock, 
  Truck, 
  RotateCcw, 
  Package 
} from "lucide-react";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product, 4);
  const productReviews = MOCK_REVIEWS.filter((r) => r.productId === product.id);

  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.variants[0].size
  );
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(
    product.variants[0].finish
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "shipping" | "reviews">(
    "details"
  );

  const availableSizes = [...new Set(product.variants.map((v) => v.size))];
  const availableFinishes = [...new Set(product.variants.map((v) => v.finish))];

  const selectedVariant: ProductVariant | undefined = product.variants.find(
    (v) => v.size === selectedSize && v.finish === selectedFinish
  );
  const displayVariant = selectedVariant || product.variants[0];

  const handleAddToCart = () => {
    addToCart(product, displayVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid var(--surface-border)",
          background: "var(--surface)",
        }}
      >
        <div className="container-custom">
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
              Home
            </Link>{" "}
            /{" "}
            <Link
              href="/shop"
              style={{ color: "var(--text-muted)", textDecoration: "none" }}
            >
              Shop
            </Link>{" "}
            /{" "}
            <Link
              href={`/shop?category=${product.category}`}
              style={{ color: "var(--text-muted)", textDecoration: "none", textTransform: "capitalize" }}
            >
              {product.category}
            </Link>{" "}
            /{" "}
            <span style={{ color: "var(--text-primary)" }}>{product.name}</span>
          </p>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="container-custom" style={{ padding: "48px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "flex-start",
          }}
        >
          {/* Left: Images */}
          <div>
            {/* Main Image */}
            <div
              style={{
                position: "relative",
                aspectRatio: "3/4",
                overflow: "hidden",
                background: "#1a1510",
                marginBottom: "16px",
                border: "1px solid var(--surface-border)",
              }}
            >
              <Image
                src={product.images[activeImage] || product.image}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Badges */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {product.isNew && <span className="badge badge-success">New</span>}
                {product.isBestseller && (
                  <span className="badge badge-primary">Bestseller</span>
                )}
                {product.isSale && (
                  <span className="badge badge-danger">Sale</span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{ display: "flex", gap: "10px" }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      position: "relative",
                      width: "80px",
                      height: "80px",
                      overflow: "hidden",
                      border: `2px solid ${i === activeImage ? "var(--primary)" : "var(--surface-border)"}`,
                      background: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "border-color 0.2s",
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div>
            <div style={{ marginBottom: "6px" }}>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                by{" "}
                <span style={{ color: "var(--primary)", fontWeight: 600 }}>
                  {product.artistName}
                </span>
              </span>
            </div>

            <h1
              className="heading-display"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: "var(--text-primary)",
                marginBottom: "16px",
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                marginBottom: "20px",
              }}
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={16}
                  fill={s <= Math.round(product.rating) ? "var(--primary)" : "none"}
                  color={s <= Math.round(product.rating) ? "var(--primary)" : "var(--text-muted)"}
                />
              ))}
              <span style={{ fontSize: "14px", color: "var(--text-secondary)", marginLeft: "8px" }}>
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "12px",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: product.isSale
                    ? "var(--accent-red)"
                    : "var(--primary)",
                }}
              >
                {formatPrice(displayVariant.price)}
              </span>
              {displayVariant.originalPrice && (
                <>
                  <span className="price-original" style={{ fontSize: "16px" }}>
                    {formatPrice(displayVariant.originalPrice)}
                  </span>
                  <span className="badge badge-danger">
                    −
                    {Math.round(
                      (1 - displayVariant.price / displayVariant.originalPrice) *
                        100
                    )}
                    %
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "15px",
                lineHeight: 1.7,
                marginBottom: "32px",
              }}
            >
              {product.shortDescription}
            </p>

            <div
              style={{
                width: "100%",
                height: "1px",
                background: "var(--surface-border)",
                marginBottom: "28px",
              }}
            />

            {/* Size Selection */}
            <div style={{ marginBottom: "24px" }}>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  color: "var(--text-primary)",
                  marginBottom: "12px",
                }}
              >
                Size:{" "}
                <span style={{ color: "var(--primary)" }}>{selectedSize}</span>
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {availableSizes.map((s) => {
                  const available = product.variants.some(
                    (v) => v.size === s && v.finish === selectedFinish
                  );
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      disabled={!available}
                      style={{
                        padding: "10px 18px",
                        border: `1px solid ${
                          selectedSize === s
                            ? "var(--primary)"
                            : "var(--surface-border)"
                        }`,
                        background:
                          selectedSize === s
                            ? "rgba(232,197,71,0.1)"
                            : "transparent",
                        color:
                          selectedSize === s
                            ? "var(--primary)"
                            : available
                            ? "var(--text-secondary)"
                            : "var(--text-muted)",
                        fontWeight: 600,
                        fontSize: "13px",
                        cursor: available ? "pointer" : "not-allowed",
                        opacity: available ? 1 : 0.4,
                        transition: "all 0.2s",
                        textDecoration: available ? "none" : "line-through",
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Finish Selection */}
            <div style={{ marginBottom: "24px" }}>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  color: "var(--text-primary)",
                  marginBottom: "12px",
                }}
              >
                Finish:{" "}
                <span
                  style={{
                    color: "var(--primary)",
                    textTransform: "capitalize",
                  }}
                >
                  {selectedFinish}
                </span>
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {availableFinishes.map((f) => {
                  const available = product.variants.some(
                    (v) => v.finish === f && v.size === selectedSize
                  );
                  return (
                    <button
                      key={f}
                      onClick={() => setSelectedFinish(f)}
                      disabled={!available}
                      style={{
                        padding: "10px 18px",
                        border: `1px solid ${
                          selectedFinish === f
                            ? "var(--primary)"
                            : "var(--surface-border)"
                        }`,
                        background:
                          selectedFinish === f
                            ? "rgba(232,197,71,0.1)"
                            : "transparent",
                        color:
                          selectedFinish === f
                            ? "var(--primary)"
                            : available
                            ? "var(--text-secondary)"
                            : "var(--text-muted)",
                        fontWeight: 600,
                        fontSize: "13px",
                        cursor: available ? "pointer" : "not-allowed",
                        opacity: available ? 1 : 0.4,
                        textTransform: "capitalize",
                        transition: "all 0.2s",
                      }}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stock */}
            {displayVariant.stock < 5 && (
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--accent-red)",
                  fontWeight: 600,
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <Zap size={14} fill="var(--accent-red)" />
                Only {displayVariant.stock} left in stock!
              </p>
            )}

            {/* Quantity */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid var(--surface-border)",
                }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "none",
                    border: "none",
                    color: "var(--text-primary)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Minus size={18} />
                </button>
                <span
                  style={{
                    width: "48px",
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(displayVariant.stock, q + 1))
                  }
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "none",
                    border: "none",
                    color: "var(--text-primary)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Plus size={18} />
                </button>
              </div>
              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                {displayVariant.stock} available
              </span>
            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "24px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={handleAddToCart}
                className="btn-primary"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  minWidth: "200px",
                  background: added ? "var(--accent-teal)" : undefined,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                {added ? (
                  <>
                    <Check size={18} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>
              <button className="btn-outline" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", padding: 0 }}>
                <Heart size={20} />
              </button>
              <button className="btn-outline" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", padding: 0 }}>
                <Share2 size={20} />
              </button>
            </div>

            {/* Trust */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              {[
                { icon: <Lock size={14} />, text: "Secure checkout" },
                { icon: <Truck size={14} />, text: "Fast delivery" },
                { icon: <RotateCcw size={14} />, text: "30-day returns" },
              ].map((item) => (
                <span
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    color: "var(--text-muted)",
                  }}
                >
                  {item.icon} {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            marginTop: "64px",
            borderTop: "1px solid var(--surface-border)",
            paddingTop: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "0",
              borderBottom: "1px solid var(--surface-border)",
              marginBottom: "32px",
            }}
          >
            {(["details", "shipping", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "12px 28px",
                  background: "none",
                  border: "none",
                  borderBottom: `2px solid ${activeTab === tab ? "var(--primary)" : "transparent"}`,
                  color:
                    activeTab === tab
                      ? "var(--primary)"
                      : "var(--text-secondary)",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  letterSpacing: "0.04em",
                  transition: "all 0.2s",
                  marginBottom: "-1px",
                }}
              >
                {tab === "reviews"
                  ? `Reviews (${productReviews.length})`
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "details" && (
            <div style={{ maxWidth: "680px" }}>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  marginBottom: "24px",
                }}
              >
                {product.description}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginTop: "24px",
                }}
              >
                {[
                  { label: "Artist", value: product.artistName },
                  { label: "Category", value: product.category },
                  { label: "Available Sizes", value: availableSizes.join(", ") },
                  {
                    label: "Available Finishes",
                    value: availableFinishes.join(", "),
                  },
                  { label: "Paper", value: "180gsm Archival Cotton Rag" },
                  { label: "Inks", value: "Pigment-based, UV-resistant" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: "14px 16px",
                      background: "var(--surface)",
                      border: "1px solid var(--surface-border)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        marginBottom: "4px",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "24px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "4px 12px",
                      background: "var(--surface)",
                      border: "1px solid var(--surface-border)",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                      textTransform: "capitalize",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div style={{ maxWidth: "600px" }}>
              {[
                {
                  icon: <Package size={24} />,
                  title: "Processing Time",
                  text: "Orders are typically processed and dispatched within 1-2 business days.",
                },
                {
                  icon: <Truck size={24} />,
                  title: "Standard Delivery (3-5 days)",
                  text: "₹149 flat rate. Free on orders above ₹2,999. Delivered via Blue Dart / DTDC.",
                },
                {
                  icon: <Zap size={24} />,
                  title: "Express Delivery (1-2 days)",
                  text: "₹299 flat rate. Available for most metro cities. Order before 12PM.",
                },
                {
                  icon: <RotateCcw size={24} />,
                  title: "Returns & Replacement",
                  text: "If your print arrives damaged, we'll replace it free of charge. Contact us within 48 hours of delivery.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "20px",
                    marginBottom: "12px",
                    background: "var(--surface)",
                    border: "1px solid var(--surface-border)",
                  }}
                >
                  <span style={{ fontSize: "24px", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <div>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "var(--text-primary)",
                        marginBottom: "6px",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div style={{ maxWidth: "680px" }}>
              {productReviews.length === 0 ? (
                <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
                  No reviews yet. Be the first to review this product!
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {productReviews.map((rev) => (
                    <div
                      key={rev.id}
                      style={{
                        padding: "24px",
                        background: "var(--surface)",
                        border: "1px solid var(--surface-border)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "12px",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontWeight: 700,
                              fontSize: "15px",
                              color: "var(--text-primary)",
                              marginBottom: "4px",
                            }}
                          >
                            {rev.title}
                          </p>
                          <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={12}
                                fill={s <= rev.rating ? "var(--primary)" : "none"}
                                color={s <= rev.rating ? "var(--primary)" : "var(--text-muted)"}
                              />
                            ))}
                            <span
                              style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "6px" }}
                            >
                              by {rev.author}
                            </span>
                            {rev.verified && (
                              <span className="badge badge-success" style={{ fontSize: "10px", display: "flex", alignItems: "center", gap: "4px" }}>
                                <Check size={10} />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                        <span
                          style={{ fontSize: "12px", color: "var(--text-muted)" }}
                        >
                          {new Date(rev.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "14px",
                          lineHeight: 1.7,
                        }}
                      >
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div
            style={{
              marginTop: "80px",
              borderTop: "1px solid var(--surface-border)",
              paddingTop: "48px",
            }}
          >
            <h2
              className="heading-section"
              style={{
                color: "var(--text-primary)",
                marginBottom: "32px",
                fontSize: "1.8rem",
              }}
            >
              You May Also Like
            </h2>
            <div className="product-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
