"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  formatPrice,
} from "@/lib/mockData";
import {
  Product,
  ProductCategory,
  ProductSize,
  ProductFinish,
  SortOption,
} from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";
import {
  Tag, 
  LayoutGrid, 
  List, 
  Palette, 
  Minus, 
  Plus, 
  X 
} from "lucide-react";

const SIZES: ProductSize[] = ["A4", "A3", "A2", "A1", "50x70", "70x100"];
const FINISHES: ProductFinish[] = ["matte", "glossy", "satin", "canvas"];
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest First" },
  { value: "bestseller", label: "Bestsellers" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export default function ShopPageClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as ProductCategory | null;
  const sortParam = (searchParams.get("sort") as SortOption) || "featured";
  const isSaleParam = searchParams.get("isSale") === "true";

  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(
    categoryParam ? [categoryParam] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<ProductFinish[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<SortOption>(sortParam);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [saleOnly, setSaleOnly] = useState(isSaleParam);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleCategory = (cat: ProductCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };
  const toggleSize = (s: ProductSize) => {
    setSelectedSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };
  const toggleFinish = (f: ProductFinish) => {
    setSelectedFinishes((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const filtered = useMemo(() => {
    let results = [...MOCK_PRODUCTS];

    if (selectedCategories.length > 0) {
      results = results.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedSizes.length > 0) {
      results = results.filter((p) =>
        p.variants.some((v) => selectedSizes.includes(v.size))
      );
    }
    if (selectedFinishes.length > 0) {
      results = results.filter((p) =>
        p.variants.some((v) => selectedFinishes.includes(v.finish))
      );
    }
    if (saleOnly) {
      results = results.filter((p) => p.isSale);
    }
    results = results.filter(
      (p) => p.basePrice >= priceRange[0] && p.basePrice <= priceRange[1]
    );

    switch (sortBy) {
      case "newest":
        results = results.filter((p) => p.isNew).concat(results.filter((p) => !p.isNew));
        break;
      case "bestseller":
        results = results.sort((a, b) =>
          a.isBestseller === b.isBestseller ? 0 : a.isBestseller ? -1 : 1
        );
        break;
      case "price-asc":
        results = results.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price-desc":
        results = results.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "rating":
        results = results.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        results = results.sort((a, b) =>
          a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1
        );
    }

    return results;
  }, [selectedCategories, selectedSizes, selectedFinishes, saleOnly, priceRange, sortBy]);

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedSizes.length > 0 ||
    selectedFinishes.length > 0 ||
    saleOnly ||
    priceRange[0] > 0 ||
    priceRange[1] < 5000;

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedFinishes([]);
    setPriceRange([0, 5000]);
    setSaleOnly(false);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Page Header */}
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--surface-border)",
          padding: "48px 24px",
        }}
      >
        <div className="container-custom">
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              marginBottom: "8px",
            }}
          >
            Home / Shop
          </p>
          <h1
            className="heading-display"
            style={{ fontSize: "2.5rem", color: "var(--text-primary)", marginBottom: "8px" }}
          >
            {selectedCategories.length === 1
              ? MOCK_CATEGORIES.find((c) => c.id === selectedCategories[0])?.name || "Shop"
              : saleOnly
              ? "Sale Items"
              : "Shop All Posters"}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
            {filtered.length} {filtered.length === 1 ? "result" : "results"} found
          </p>
        </div>
      </div>

      <div className="container-custom">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "40px",
            padding: "40px 0",
          }}
        >
          {/* Sidebar */}
          <aside
            style={{
              position: "sticky",
              top: "90px",
              height: "fit-content",
            }}
          >
            {/* Sidebar Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "var(--text-primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Filters
              </h3>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--primary)",
                    fontSize: "12px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Sale Toggle */}
            <div
              style={{
                marginBottom: "28px",
                paddingBottom: "28px",
                borderBottom: "1px solid var(--surface-border)",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={saleOnly}
                  onChange={(e) => setSaleOnly(e.target.checked)}
                  style={{ accentColor: "var(--primary)", width: "16px", height: "16px" }}
                />
                <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--accent-red)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Tag size={16} />
                  On Sale Only
                </span>
              </label>
            </div>

            {/* Categories */}
            <FilterSection title="Category">
              {MOCK_CATEGORIES.map((cat) => (
                <label
                  key={cat.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    padding: "6px 0",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    style={{ accentColor: "var(--primary)", width: "14px", height: "14px" }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      color: selectedCategories.includes(cat.id)
                        ? "var(--primary)"
                        : "var(--text-secondary)",
                      flex: 1,
                    }}
                  >
                    {cat.name}
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {cat.productCount}
                  </span>
                </label>
              ))}
            </FilterSection>

            {/* Sizes */}
            <FilterSection title="Size">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    style={{
                      padding: "6px 14px",
                      border: `1px solid ${
                        selectedSizes.includes(s)
                          ? "var(--primary)"
                          : "var(--surface-border)"
                      }`,
                      background: selectedSizes.includes(s)
                        ? "rgba(232,197,71,0.1)"
                        : "transparent",
                      color: selectedSizes.includes(s)
                        ? "var(--primary)"
                        : "var(--text-secondary)",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* Finishes */}
            <FilterSection title="Finish">
              {FINISHES.map((f) => (
                <label
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    padding: "6px 0",
                    textTransform: "capitalize",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedFinishes.includes(f)}
                    onChange={() => toggleFinish(f)}
                    style={{ accentColor: "var(--primary)", width: "14px", height: "14px" }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      color: selectedFinishes.includes(f)
                        ? "var(--primary)"
                        : "var(--text-secondary)",
                    }}
                  >
                    {f}
                  </span>
                </label>
              ))}
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Price Range" noBorder>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  marginBottom: "12px",
                }}
              >
                {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}
              </p>
              <input
                type="range"
                min={0}
                max={5000}
                step={100}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                style={{ width: "100%", accentColor: "var(--primary)" }}
              />
            </FilterSection>
          </aside>

          {/* Main Content */}
          <div>
            {/* Toolbar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "28px",
                padding: "16px",
                background: "var(--surface)",
                border: "1px solid var(--surface-border)",
              }}
            >
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                Showing{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  {filtered.length}
                </strong>{" "}
                items
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  style={{
                    background: "var(--surface-raised)",
                    border: "1px solid var(--surface-border)",
                    color: "var(--text-primary)",
                    padding: "8px 12px",
                    fontSize: "13px",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* View Toggle */}
                <div style={{ display: "flex", gap: "4px" }}>
                  {(["grid", "list"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      style={{
                        padding: "8px 12px",
                        background:
                          viewMode === mode
                            ? "var(--primary)"
                            : "var(--surface-raised)",
                        border:
                          "1px solid " +
                          (viewMode === mode
                            ? "var(--primary)"
                            : "var(--surface-border)"),
                        color: viewMode === mode ? "#0d0d0d" : "var(--text-secondary)",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {mode === "grid" ? <LayoutGrid size={18} /> : <List size={18} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {hasFilters && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "20px",
                }}
              >
                {selectedCategories.map((c) => (
                  <FilterChip
                    key={c}
                    label={c}
                    onRemove={() => toggleCategory(c)}
                  />
                ))}
                {selectedSizes.map((s) => (
                  <FilterChip
                    key={s}
                    label={s}
                    onRemove={() => toggleSize(s)}
                  />
                ))}
                {selectedFinishes.map((f) => (
                  <FilterChip
                    key={f}
                    label={f}
                    onRemove={() => toggleFinish(f)}
                  />
                ))}
                {saleOnly && (
                  <FilterChip label="On Sale" onRemove={() => setSaleOnly(false)} />
                )}
              </div>
            )}

            {/* Grid / List */}
            {filtered.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 24px",
                  color: "var(--text-muted)",
                }}
              >
                <span style={{ fontSize: "64px", display: "block", marginBottom: "16px", color: "var(--text-muted)" }}>
                  <Palette size={64} strokeWidth={1} />
                </span>
                <p style={{ fontSize: "18px", marginTop: "16px", fontWeight: 600 }}>
                  No products match your filters
                </p>
                <p style={{ fontSize: "14px", marginTop: "8px" }}>
                  Try adjusting or clearing your filters
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                  style={{ marginTop: "24px" }}
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="product-grid">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} layout="grid" />
                ))}
              </div>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: "12px" }}
              >
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} layout="list" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  children,
  noBorder,
}: {
  title: string;
  children: React.ReactNode;
  noBorder?: boolean;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div
      style={{
        marginBottom: "28px",
        paddingBottom: "28px",
        borderBottom: noBorder ? "none" : "1px solid var(--surface-border)",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-primary)",
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          marginBottom: open ? "14px" : "0",
        }}
      >
        {title}
        <span style={{ color: "var(--text-muted)" }}>
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      {open && children}
    </div>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      onClick={onRemove}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 12px",
        background: "rgba(232,197,71,0.1)",
        border: "1px solid rgba(232,197,71,0.3)",
        color: "var(--primary)",
        fontSize: "12px",
        fontWeight: 600,
        cursor: "pointer",
        textTransform: "capitalize",
      }}
    >
      {label} <X size={12} style={{ marginLeft: "4px" }} />
    </button>
  );
}
