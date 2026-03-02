"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Check, 
  PartyPopper, 
  Package, 
  Printer, 
  Truck, 
  Home 
} from "lucide-react";

export default function OrderConfirmationPage() {
  const [orderId, setOrderId] = useState("PH-SEARCHING");

  useEffect(() => {
    setOrderId(`PH${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
  }, []);

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        textAlign: "center",
      }}
    >
      {/* Success Animation */}
      <div
        style={{
          width: "100px",
          height: "100px",
          background: "rgba(71, 197, 168, 0.1)",
          border: "2px solid var(--accent-teal)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "32px",
          animation: "fadeInUp 0.6s ease",
        }}
      >
        <Check size={48} color="var(--accent-teal)" />
      </div>

      <h1
        className="heading-display"
        style={{
          fontSize: "2.5rem",
          color: "var(--text-primary)",
          marginBottom: "12px",
          animation: "fadeInUp 0.7s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px"
        }}
      >
        Order Confirmed! <PartyPopper size={32} color="var(--primary)" />
      </h1>

      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "18px",
          maxWidth: "500px",
          lineHeight: 1.7,
          marginBottom: "24px",
          animation: "fadeInUp 0.8s ease",
        }}
      >
        Thank you for your purchase! Your beautiful posters are being prepared
        for dispatch. You&apos;ll receive a confirmation email shortly.
      </p>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid rgba(71, 197, 168, 0.3)",
          padding: "20px 40px",
          marginBottom: "40px",
          animation: "fadeInUp 0.9s ease",
        }}
      >
        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "6px" }}>
          Order ID
        </p>
        <p
          style={{
            fontFamily: "var(--font-display, serif)",
            fontSize: "22px",
            fontWeight: 700,
            color: "var(--accent-teal)",
            letterSpacing: "0.05em",
          }}
        >
          {orderId}
        </p>
      </div>

      {/* Steps */}
      <div
        style={{
          display: "flex",
          gap: "0",
          marginBottom: "48px",
          animation: "fadeInUp 1s ease",
        }}
      >
        {[
          { icon: <Package size={22} />, label: "Processing", done: true },
          { icon: <Printer size={22} />, label: "Printing", done: false },
          { icon: <Truck size={22} />, label: "Dispatching", done: false },
          { icon: <Home size={22} />, label: "Delivered", done: false },
        ].map((s, i) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: s.done
                  ? "rgba(71, 197, 168, 0.15)"
                  : "var(--surface)",
                border: `2px solid ${s.done ? "var(--accent-teal)" : "var(--surface-border)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: s.done ? "var(--accent-teal)" : "var(--text-muted)",
              }}
            >
              {s.icon}
            </div>
            <span
              style={{
                fontSize: "12px",
                color: s.done ? "var(--accent-teal)" : "var(--text-muted)",
                fontWeight: s.done ? 700 : 400,
              }}
            >
              {s.label}
            </span>
          </div>
        )).reduce((acc, el, i, arr) => {
          if (i < arr.length - 1) {
            return [
              ...acc,
              el,
              <div
                key={`line-${i}`}
                style={{
                  width: "60px",
                  height: "2px",
                  background: "var(--surface-border)",
                  marginTop: "26px",
                }}
              />,
            ];
          }
          return [...acc, el];
        }, [] as React.ReactNode[])}
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "24px"
        }}
      >
        <Link href="/shop" className="btn-primary" style={{ textDecoration: "none" }}>
          Continue Shopping
        </Link>
        <Link
          href="/account/orders"
          className="btn-outline"
          style={{ textDecoration: "none" }}
        >
          View Order
        </Link>
      </div>
    </div>
  );
}
