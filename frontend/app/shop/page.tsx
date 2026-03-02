import { Suspense } from "react";
import ShopClient from "./ShopClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Posters — Poster Haven",
  description:
    "Browse our complete collection of 500+ premium art posters. Filter by category, size, finish, and price. Worldwide shipping.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-muted)",
            fontSize: "18px",
          }}
        >
          Loading collection...
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
