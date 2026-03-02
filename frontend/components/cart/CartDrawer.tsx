"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart, getVariantKey } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/mockData";
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight 
} from "lucide-react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, subtotal, itemCount } =
    useCart();

  const shippingCost = subtotal >= 2999 ? 0 : 149;
  const total = subtotal + shippingCost;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="overlay animate-fadeIn"
          onClick={closeCart}
          style={{ zIndex: 55 }}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "min(440px, 100vw)",
          background: "var(--surface)",
          borderLeft: "1px solid var(--surface-border)",
          zIndex: 60,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isOpen ? "-20px 0 60px rgba(0,0,0,0.6)" : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px",
            borderBottom: "1px solid var(--surface-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display, serif)",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              Your Cart
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={closeCart}
            style={{
              background: "var(--surface-raised)",
              border: "1px solid var(--surface-border)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.2s",
            }}
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "16px",
                color: "var(--text-muted)",
              }}
            >
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "var(--surface-raised)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "8px"
                }}
              >
                <ShoppingCart size={48} strokeWidth={1.5} />
              </div>
              <p style={{ fontSize: "16px", fontWeight: 500 }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: "14px", textAlign: "center" }}>
                Discover beautiful posters to fill your walls
              </p>
              <Link href="/shop" onClick={closeCart} className="btn-primary">
                Browse Shop
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {items.map((item) => {
                const variantKey = getVariantKey(item.product.id, item.variant);
                return (
                  <div
                    key={variantKey}
                    className="card-base"
                    style={{ padding: "16px", display: "flex", gap: "14px" }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        flexShrink: 0,
                        overflow: "hidden",
                        background: "var(--surface-border)",
                      }}
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "var(--text-primary)",
                          marginBottom: "4px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.product.name}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "var(--text-muted)",
                          marginBottom: "10px",
                        }}
                      >
                        {item.variant.size} • {item.variant.finish}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {/* Quantity */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid var(--surface-border)",
                          }}
                        >
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                variantKey,
                                item.quantity - 1
                              )
                            }
                            style={{
                              width: "28px",
                              height: "28px",
                              background: "none",
                              border: "none",
                              color: "var(--text-primary)",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Minus size={12} />
                          </button>
                          <span
                            style={{
                              width: "32px",
                              textAlign: "center",
                              fontSize: "13px",
                              fontWeight: 600,
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                variantKey,
                                item.quantity + 1
                              )
                            }
                            style={{
                              width: "28px",
                              height: "28px",
                              background: "none",
                              border: "none",
                              color: "var(--text-primary)",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Price & Remove */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: "14px",
                              color: "var(--primary)",
                            }}
                          >
                            {formatPrice(item.variant.price * item.quantity)}
                          </span>
                          <button
                            onClick={() =>
                              removeFromCart(item.product.id, variantKey)
                            }
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--text-muted)",
                              cursor: "pointer",
                              padding: "2px",
                              display: "flex",
                              alignItems: "center",
                            }}
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              borderTop: "1px solid var(--surface-border)",
              padding: "20px 24px",
              flexShrink: 0,
              background: "var(--surface)",
            }}
          >
            {/* Shipping Banner */}
            {subtotal < 2999 && (
              <div
                style={{
                  background: "rgba(232, 197, 71, 0.08)",
                  border: "1px solid rgba(232, 197, 71, 0.2)",
                  padding: "10px 14px",
                  fontSize: "12px",
                  color: "var(--primary)",
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                Add {formatPrice(2999 - subtotal)} more for free shipping!
              </div>
            )}

            {/* Totals */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                }}
              >
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                }}
              >
                <span>Shipping</span>
                <span style={{ color: shippingCost === 0 ? "var(--accent-teal)" : undefined }}>
                  {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  paddingTop: "10px",
                  borderTop: "1px solid var(--surface-border)",
                }}
              >
                <span>Total</span>
                <span style={{ color: "var(--primary)" }}>{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", textDecoration: "none", gap: "8px" }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/shop"
              onClick={closeCart}
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "10px",
                color: "var(--text-muted)",
                fontSize: "13px",
                textDecoration: "none",
              }}
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
