"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { CartItem, Product, ProductVariant } from "@/lib/types";

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, variantKey: string) => void;
  updateQuantity: (productId: string, variantKey: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function getVariantKey(productId: string, variant: ProductVariant): string {
  return `${productId}-${variant.size}-${variant.finish}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("poster-haven-cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("poster-haven-cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  const addToCart = useCallback(
    (product: Product, variant: ProductVariant, quantity = 1) => {
      setItems((prev) => {
        const key = getVariantKey(product.id, variant);
        const existing = prev.find(
          (i) => getVariantKey(i.product.id, i.variant) === key
        );
        if (existing) {
          return prev.map((i) =>
            getVariantKey(i.product.id, i.variant) === key
              ? { ...i, quantity: Math.min(i.quantity + quantity, variant.stock) }
              : i
          );
        }
        return [...prev, { product, variant, quantity }];
      });
      setIsOpen(true);
    },
    []
  );

  const removeFromCart = useCallback(
    (productId: string, variantKey: string) => {
      setItems((prev) =>
        prev.filter((i) => getVariantKey(i.product.id, i.variant) !== variantKey)
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, variantKey: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) =>
          prev.filter((i) => getVariantKey(i.product.id, i.variant) !== variantKey)
        );
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          getVariantKey(i.product.id, i.variant) === variantKey
            ? { ...i, quantity: Math.min(quantity, i.variant.stock) }
            : i
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((o) => !o), []);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        itemCount,
        subtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export { getVariantKey };
