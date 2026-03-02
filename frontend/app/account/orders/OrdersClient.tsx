"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_ORDERS, formatPrice } from "@/lib/mockData";
import { 
  Package, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle,
  AlertCircle
} from "lucide-react";
import { Order } from "@/lib/types";

export default function OrdersClient() {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleOrder = (id: string) => {
    setExpandedOrderId(prev => (prev === id ? null : id));
  };

  return (
    <div style={{ minHeight: "80vh", padding: "40px 0" }}>
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav style={{ marginBottom: "24px" }}>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link> / 
            <Link href="/account" style={{ color: "var(--text-muted)", textDecoration: "none" }}> Account</Link> / Orders
          </p>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <h1 className="heading-display" style={{ fontSize: "2.5rem", color: "var(--text-primary)", marginBottom: "12px" }}>
            My Orders
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
            Track your current orders and view your purchase history.
          </p>
        </div>

        {/* Orders List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {MOCK_ORDERS.length === 0 ? (
            <div style={{ 
              textAlign: "center", 
              padding: "80px 24px", 
              background: "var(--surface)", 
              border: "1px solid var(--surface-border)" 
            }}>
              <Package size={48} style={{ color: "var(--text-muted)", marginBottom: "16px" }} />
              <h3 style={{ color: "var(--text-primary)", marginBottom: "8px" }}>No orders found</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>You haven't placed any orders yet.</p>
              <Link href="/shop" className="btn-primary">Start Shopping</Link>
            </div>
          ) : (
            MOCK_ORDERS.map((order) => (
              <OrderCard 
                key={order.id} 
                order={order} 
                isExpanded={expandedOrderId === order.id}
                onToggle={() => toggleOrder(order.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order, isExpanded, onToggle }: { order: Order; isExpanded: boolean; onToggle: () => void }) {
  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered": return <CheckCircle2 size={18} color="var(--accent-teal)" />;
      case "shipped": return <Truck size={18} color="var(--primary)" />;
      case "processing": return <Clock size={18} color="var(--primary)" />;
      case "pending": return <AlertCircle size={18} color="#e8c547" />;
      case "cancelled": return <XCircle size={18} color="var(--accent-red)" />;
      default: return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <div className="card-base" style={{ overflow: "hidden" }}>
      {/* Summary Header */}
      <div 
        onClick={onToggle}
        style={{ 
          padding: "24px", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          cursor: "pointer",
          background: isExpanded ? "rgba(232,197,71,0.03)" : "transparent"
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "24px", flex: 1 }}>
          <div>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Order ID</p>
            <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "15px" }}>#{order.id}</p>
          </div>
          <div>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Date Placed</p>
            <p style={{ color: "var(--text-primary)", fontSize: "15px" }}>{formatDate(order.createdAt)}</p>
          </div>
          <div>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Total Amount</p>
            <p style={{ fontWeight: 700, color: "var(--primary)", fontSize: "15px" }}>{formatPrice(order.total)}</p>
          </div>
          <div>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Status</p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {getStatusIcon(order.status)}
              <span style={{ fontSize: "14px", color: "var(--text-primary)", textTransform: "capitalize" }}>{order.status}</span>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "24px", color: "var(--text-muted)" }}>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div style={{ padding: "24px", borderTop: "1px solid var(--surface-border)", animation: "fadeInUp 0.3s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "40px" }}>
            {/* Items */}
            <div>
              <h4 style={{ fontSize: "13px", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                Items Ordered ({order.items.reduce((acc, item) => acc + item.quantity, 0)})
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "16px", paddingBottom: "16px", borderBottom: idx < order.items.length - 1 ? "1px solid var(--surface-border)" : "none" }}>
                    <div style={{ position: "relative", width: "80px", height: "100px", border: "1px solid var(--surface-border)", flexShrink: 0 }}>
                      <Image 
                        src={item.product.image} 
                        alt={item.product.name} 
                        fill 
                        style={{ objectFit: "cover" }} 
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Link href={`/shop/${item.product.slug}`} style={{ textDecoration: "none" }}>
                        <h5 style={{ color: "var(--text-primary)", fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>
                          {item.product.name}
                        </h5>
                      </Link>
                      <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "4px" }}>
                        {item.variant.size} • {item.variant.finish}
                      </p>
                      <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                        Quantity: {item.quantity} × {formatPrice(item.variant.price)}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "14px" }}>
                        {formatPrice(item.variant.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Info */}
            <div>
              <div style={{ background: "rgba(255,255,255,0.02)", padding: "24px", border: "1px solid var(--surface-border)" }}>
                <h4 style={{ fontSize: "13px", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "20px" }}>
                   Delivery Details
                </h4>
                <div style={{ marginBottom: "24px" }}>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>Shipping Address</p>
                  <p style={{ fontSize: "14px", color: "var(--text-primary)", lineHeight: 1.5 }}>
                    {order.shippingAddress.fullName}<br />
                    {order.shippingAddress.address}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                  </p>
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>Payment Method</p>
                  <p style={{ fontSize: "14px", color: "var(--text-primary)" }}>{order.paymentMethod}</p>
                </div>
                
                <div style={{ borderTop: "1px solid var(--surface-border)", paddingTop: "20px" }}>
                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                     <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Subtotal</span>
                     <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>{formatPrice(order.subtotal)}</span>
                   </div>
                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                     <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Shipping</span>
                     <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>{order.shippingCost === 0 ? "FREE" : formatPrice(order.shippingCost)}</span>
                   </div>
                   {order.discount > 0 && (
                     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                       <span style={{ fontSize: "14px", color: "var(--accent-teal)" }}>Discount</span>
                       <span style={{ fontSize: "14px", color: "var(--accent-teal)" }}>-{formatPrice(order.discount)}</span>
                     </div>
                   )}
                   <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "16px", borderTop: "1px dashed var(--surface-border)" }}>
                     <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>Grand Total</span>
                     <span style={{ fontWeight: 700, color: "var(--primary)", fontSize: "1.1rem" }}>{formatPrice(order.total)}</span>
                   </div>
                </div>
              </div>

              <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <button className="btn-outline" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "13px", padding: "10px" }}>
                  Invoice <ExternalLink size={14} />
                </button>
                <button className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "13px", padding: "10px" }}>
                  Track Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
