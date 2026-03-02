"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { 
  ShoppingCart, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Smartphone, 
  CreditCard, 
  Banknote,
  PartyPopper
} from "lucide-react";

const STEPS = ["Cart Review", "Shipping", "Payment", "Confirm"];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const shippingCost = subtotal >= 2999 ? 0 : 149;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shippingCost - discount;

  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">(
    "upi"
  );

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "ARTLOVER10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
      setCouponApplied(false);
    }
  };

  const placeOrder = () => {
    clearCart();
    router.push("/order-confirmation");
  };

  if (items.length === 0 && step === 0) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "48px 24px",
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
            marginBottom: "16px"
          }}
        >
          <ShoppingCart size={64} strokeWidth={1.5} color="var(--text-muted)" />
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display, serif)",
            fontSize: "2rem",
            color: "var(--text-primary)",
          }}
        >
          Your cart is empty
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Add some beautiful posters before checking out.
        </p>
        <Link href="/shop" className="btn-primary" style={{ textDecoration: "none" }}>
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "0 0 80px" }}>
      {/* Page Header */}
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--surface-border)",
          padding: "32px 24px",
          marginBottom: "40px",
        }}
      >
        <div className="container-custom">
          <h1
            className="heading-display"
            style={{
              fontSize: "2rem",
              color: "var(--text-primary)",
              marginBottom: "24px",
            }}
          >
            Checkout
          </h1>

          {/* Step Indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background:
                        i === step
                          ? "var(--primary)"
                          : i < step
                          ? "var(--accent-teal)"
                          : "var(--surface-raised)",
                      border: `2px solid ${
                        i <= step ? "transparent" : "var(--surface-border)"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: i <= step ? "#0d0d0d" : "var(--text-muted)",
                      fontWeight: 700,
                      fontSize: "13px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {i < step ? <Check size={16} /> : i + 1}
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      color:
                        i === step ? "var(--primary)" : "var(--text-muted)",
                      fontWeight: i === step ? 700 : 400,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: "2px",
                      background:
                        i < step
                          ? "var(--accent-teal)"
                          : "var(--surface-border)",
                      margin: "0 8px",
                      marginBottom: "24px",
                      transition: "background 0.3s ease",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "40px",
            alignItems: "flex-start",
          }}
        >
          {/* Left: Step Content */}
          <div>
            {/* STEP 0: Cart Review */}
            {step === 0 && (
              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "24px",
                    fontFamily: "var(--font-display, serif)",
                  }}
                >
                  Review Your Items
                </h2>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                >
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.variant.size}-${item.variant.finish}`}
                      className="card-base"
                      style={{ padding: "16px", display: "flex", gap: "16px" }}
                    >
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          flexShrink: 0,
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontWeight: 700,
                            fontSize: "15px",
                            color: "var(--text-primary)",
                            marginBottom: "4px",
                          }}
                        >
                          {item.product.name}
                        </p>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                          {item.variant.size} • {item.variant.finish} • Qty:{" "}
                          {item.quantity}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p
                          style={{
                            fontWeight: 700,
                            color: "var(--primary)",
                            fontSize: "15px",
                          }}
                        >
                          {formatPrice(item.variant.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "24px" }}>
                  <button
                    onClick={() => setStep(1)}
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center", gap: "8px" }}
                  >
                    <span>Continue to Shipping</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1: Shipping */}
            {step === 1 && (
              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "24px",
                    fontFamily: "var(--font-display, serif)",
                  }}
                >
                  Shipping Information
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <FormField label="Full Name" style={{ gridColumn: "1 / -1" }}>
                    <input
                      type="text"
                      className="input-base"
                      placeholder="Priya Sharma"
                      value={shippingForm.fullName}
                      onChange={(e) =>
                        setShippingForm((f) => ({
                          ...f,
                          fullName: e.target.value,
                        }))
                      }
                    />
                  </FormField>
                  <FormField label="Email Address">
                    <input
                      type="email"
                      className="input-base"
                      placeholder="you@example.com"
                      value={shippingForm.email}
                      onChange={(e) =>
                        setShippingForm((f) => ({
                          ...f,
                          email: e.target.value,
                        }))
                      }
                    />
                  </FormField>
                  <FormField label="Phone Number">
                    <input
                      type="tel"
                      className="input-base"
                      placeholder="+91 98765 43210"
                      value={shippingForm.phone}
                      onChange={(e) =>
                        setShippingForm((f) => ({
                          ...f,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </FormField>
                  <FormField label="Address" style={{ gridColumn: "1 / -1" }}>
                    <input
                      type="text"
                      className="input-base"
                      placeholder="123, Street Name, Area"
                      value={shippingForm.address}
                      onChange={(e) =>
                        setShippingForm((f) => ({
                          ...f,
                          address: e.target.value,
                        }))
                      }
                    />
                  </FormField>
                  <FormField label="City">
                    <input
                      type="text"
                      className="input-base"
                      placeholder="Mumbai"
                      value={shippingForm.city}
                      onChange={(e) =>
                        setShippingForm((f) => ({
                          ...f,
                          city: e.target.value,
                        }))
                      }
                    />
                  </FormField>
                  <FormField label="State">
                    <input
                      type="text"
                      className="input-base"
                      placeholder="Maharashtra"
                      value={shippingForm.state}
                      onChange={(e) =>
                        setShippingForm((f) => ({
                          ...f,
                          state: e.target.value,
                        }))
                      }
                    />
                  </FormField>
                  <FormField label="PIN Code">
                    <input
                      type="text"
                      className="input-base"
                      placeholder="400001"
                      value={shippingForm.pincode}
                      onChange={(e) =>
                        setShippingForm((f) => ({
                          ...f,
                          pincode: e.target.value,
                        }))
                      }
                    />
                  </FormField>
                  <FormField label="Country">
                    <select
                      className="input-base"
                      value={shippingForm.country}
                      onChange={(e) =>
                        setShippingForm((f) => ({
                          ...f,
                          country: e.target.value,
                        }))
                      }
                    >
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                      <option>Canada</option>
                    </select>
                  </FormField>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "24px",
                  }}
                >
                  <button
                    onClick={() => setStep(0)}
                    className="btn-outline"
                    style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <ArrowLeft size={18} />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: "center", gap: "8px" }}
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Payment */}
            {step === 2 && (
              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "24px",
                    fontFamily: "var(--font-display, serif)",
                  }}
                >
                  Payment Method
                </h2>

                {/* Payment Options */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                >
                  {(
                    [
                      {
                        id: "upi",
                        label: "UPI",
                        desc: "GPay, PhonePe, Paytm, BHIM",
                        icon: <Smartphone size={24} />,
                      },
                      {
                        id: "card",
                        label: "Credit / Debit Card",
                        desc: "Visa, Mastercard, RuPay",
                        icon: <CreditCard size={24} />,
                      },
                      {
                        id: "cod",
                        label: "Cash on Delivery",
                        desc: "Extra ₹50 COD charge applicable",
                        icon: <Banknote size={24} />,
                      },
                    ] as const
                  ).map((opt) => (
                    <label
                      key={opt.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "20px",
                        border: `1px solid ${
                          paymentMethod === opt.id
                            ? "var(--primary)"
                            : "var(--surface-border)"
                        }`,
                        background:
                          paymentMethod === opt.id
                            ? "rgba(232,197,71,0.05)"
                            : "var(--surface)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.id}
                        checked={paymentMethod === opt.id}
                        onChange={() => setPaymentMethod(opt.id)}
                        style={{ accentColor: "var(--primary)" }}
                      />
                      <span style={{ color: "var(--primary)" }}>{opt.icon}</span>
                      <div>
                        <p
                          style={{
                            fontWeight: 700,
                            fontSize: "15px",
                            color: "var(--text-primary)",
                          }}
                        >
                          {opt.label}
                        </p>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                          {opt.desc}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* UPI Input */}
                {paymentMethod === "upi" && (
                  <div style={{ marginTop: "20px" }}>
                    <FormField label="UPI ID">
                      <input
                        type="text"
                        className="input-base"
                        placeholder="yourname@upi"
                      />
                    </FormField>
                  </div>
                )}

                {/* Card Input */}
                {paymentMethod === "card" && (
                  <div
                    style={{
                      marginTop: "20px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                    }}
                  >
                    <FormField label="Card Number" style={{ gridColumn: "1 / -1" }}>
                      <input
                        type="text"
                        className="input-base"
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                      />
                    </FormField>
                    <FormField label="Expiry">
                      <input
                        type="text"
                        className="input-base"
                        placeholder="MM / YY"
                        maxLength={7}
                      />
                    </FormField>
                    <FormField label="CVV">
                      <input
                        type="text"
                        className="input-base"
                        placeholder="123"
                        maxLength={4}
                      />
                    </FormField>
                    <FormField label="Cardholder Name" style={{ gridColumn: "1 / -1" }}>
                      <input
                        type="text"
                        className="input-base"
                        placeholder="PRIYA SHARMA"
                      />
                    </FormField>
                  </div>
                )}

                <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                  <button
                    onClick={() => setStep(1)}
                    className="btn-outline"
                    style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <ArrowLeft size={18} />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: "center", gap: "8px" }}
                  >
                    <span>Review Order</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Confirm */}
            {step === 3 && (
              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "24px",
                    fontFamily: "var(--font-display, serif)",
                  }}
                >
                  Order Review
                </h2>

                {/* Summary Blocks */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  <SummaryBlock title="Items">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.variant.size}`}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "14px",
                          padding: "6px 0",
                        }}
                      >
                        <span style={{ color: "var(--text-secondary)" }}>
                          {item.product.name} ({item.variant.size}) ×{" "}
                          {item.quantity}
                        </span>
                        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                          {formatPrice(item.variant.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </SummaryBlock>

                  <SummaryBlock title="Shipping Address">
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      {shippingForm.fullName || "—"}<br />
                      {shippingForm.address || "—"}<br />
                      {shippingForm.city}, {shippingForm.state} {shippingForm.pincode}<br />
                      {shippingForm.country}
                    </p>
                  </SummaryBlock>

                  <SummaryBlock title="Payment Method">
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                      {paymentMethod === "upi"
                        ? "UPI Payment"
                        : paymentMethod === "card"
                        ? "Credit/Debit Card"
                        : "Cash on Delivery"}
                    </p>
                  </SummaryBlock>
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                  <button
                    onClick={() => setStep(2)}
                    className="btn-outline"
                    style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <ArrowLeft size={18} />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={placeOrder}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: "center", gap: "8px" }}
                  >
                    <PartyPopper size={18} />
                    <span>Place Order — {formatPrice(total)}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div
            style={{ position: "sticky", top: "90px" }}
          >
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--surface-border)",
                padding: "24px",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "var(--text-primary)",
                  marginBottom: "20px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid var(--surface-border)",
                }}
              >
                Order Summary ({items.length} items)
              </h3>

              {/* Items list */}
              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  marginBottom: "16px",
                }}
              >
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.variant.size}`}
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        flexShrink: 0,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="48px"
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                        }}
                      >
                        {item.product.name}
                      </p>
                      <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                        {item.variant.size} • ×{item.quantity}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatPrice(item.variant.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div
                style={{
                  marginBottom: "16px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid var(--surface-border)",
                }}
              >
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    className="input-base"
                    placeholder="Coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    style={{ flex: 1, fontSize: "13px" }}
                    disabled={couponApplied}
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={couponApplied}
                    className="btn-outline"
                    style={{ padding: "10px 14px", fontSize: "12px" }}
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--accent-teal)",
                      marginTop: "6px",
                    }}
                  >
                    ✓ ARTLOVER10 applied! 10% off
                  </p>
                )}
                {couponError && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--accent-red)",
                      marginTop: "6px",
                    }}
                  >
                    {couponError}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <PriceLine label="Subtotal" value={formatPrice(subtotal)} />
                <PriceLine
                  label="Shipping"
                  value={
                    shippingCost === 0 ? (
                      <span style={{ color: "var(--accent-teal)" }}>FREE</span>
                    ) : (
                      formatPrice(shippingCost)
                    )
                  }
                />
                {couponApplied && (
                  <PriceLine
                    label="Discount (ARTLOVER10)"
                    value={
                      <span style={{ color: "var(--accent-red)" }}>
                        −{formatPrice(discount)}
                      </span>
                    }
                  />
                )}
                <div
                  style={{
                    borderTop: "1px solid var(--surface-border)",
                    paddingTop: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "var(--text-primary)",
                    }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: "20px",
                      color: "var(--primary)",
                    }}
                  >
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function FormField({
  label,
  children,
  style,
}: {
  label: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style}>
      <label
        style={{
          display: "block",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: "8px",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function SummaryBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: "20px",
        background: "var(--surface)",
        border: "1px solid var(--surface-border)",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--text-muted)",
          marginBottom: "12px",
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function PriceLine({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "14px",
      }}
    >
      <span style={{ color: "var(--text-secondary)" }}>{label}</span>
      <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
        {value}
      </span>
    </div>
  );
}
