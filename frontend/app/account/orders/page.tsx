import React from "react";
import OrdersClient from "./OrdersClient";

export const metadata = {
  title: "My Orders — Poster Haven",
  description: "View and track your previous orders on Poster Haven.",
};

export default function OrdersPage() {
  return <OrdersClient />;
}
