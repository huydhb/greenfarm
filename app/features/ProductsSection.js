// app/features/ProductsSection.js
"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Slider,
  Checkbox,
  FormControlLabel,
  TextField,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import ProductCard from "@components/ui/ProductCard";

// ============================================================================
// CONSTANTS
// ============================================================================

/** Nhãn tiếng Việt cho từng danh mục sản phẩm */
const CATEGORY_LABELS = {
  rau: "Rau xanh",
  cu: "Củ, quả",
  nam: "Nấm tươi",
  "trai-cay": "Trái cây",
  "dau-hu": "Đậu hũ",
};

/** Danh sách tabs hiển thị (TẤT CẢ + các danh mục) */
const CATEGORY_TABS = [
  { value: "", label: "TẤT CẢ" },
  { value: "rau", label: "RAU" },
  { value: "cu", label: "CỦ" },
  { value: "nam", label: "NẤM" },
  { value: "trai-cay", label: "TRÁI CÂY" },
];

// ============================================================================
// HELPERS
// ============================================================================

/** Định dạng số tiền VND */
const formatPrice = (value) =>
  value.toLocaleString("vi-VN", { minimumFractionDigits: 0 });

/** Chuẩn hóa chuỗi: xóa dấu tiếng Việt để tìm kiếm chính xác */
const normalize = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ProductsSection({
  products = [],
  banners = {}, // { categoryKey: bannerImageUrl }
  selectedCategory,
  onChangeSelectedCategory,
  onAddToCart,
}) {
  // ---------- Data & Derived State ----------

  /** Danh sách category thực tế có trong dữ liệu */
  const categories = useMemo(
    () =>
      Array.from(new Set((products || []).map((p) => p.category))).filter(
        Boolean
      ),
    [products]
  );

  /** Tính toán min/max giá từ tất cả sản phẩm */
  const prices = (products || []).map((p) => p.salePrice ?? p.price ?? 0);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  // ---------- Filter State ----------

  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [onlySuperSale, setOnlySuperSale] = useState(false);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  // ---------- Computed Values ----------

  /** Tiêu đề trang theo category hiện tại */
  const title =
    selectedCategory && CATEGORY_LABELS[selectedCategory]
      ? CATEGORY_LABELS[selectedCategory].toUpperCase()
      : "TẤT CẢ SẢN PHẨM";

  /** Chỉ render tabs có sản phẩm trong dữ liệu */
  const availableCatSet = new Set(categories);
  const tabsToRender = CATEGORY_TABS.filter(
    (t) => t.value === "" || availableCatSet.has(t.value)
  );

  /** Banner image cho category hiện tại (nếu có) */
  const bannerImg = useMemo(() => {
    const cat = selectedCategory || "";

    // Nếu không chọn category (TẤT CẢ), không hiển thị banner
    if (!cat) return null;

    // Dùng banner từ props nếu có
    if (banners?.[cat]) return banners[cat];

    // Fallback: tự động map tên category thành đường dẫn banner
    const bannerMap = {
      rau: "images/branding/banner-rau.jpg",
      cu: "images/branding/banner-cu.jpg",
      nam: "images/branding/banner-nam.jpg",
      "trai-cay": "images/branding/banner-traicay.jpg",
    };

    return bannerMap[cat] ?? null;
  }, [selectedCategory, banners, products]);

  // ---------- Filter & Sort Logic ----------

  /**
   * Lọc và sắp xếp sản phẩm theo tiêu chí:
   * 1. Category
   * 2. Từ khóa tìm kiếm (tên + mô tả)
   * 3. Khoảng giá
   * 4. Hàng giảm giá
   * 5. Siêu giảm giá (>50%)
   * 6. Sắp xếp
   */
  const visibleProducts = useMemo(() => {
    let list = [...(products || [])];

    // Lọc theo category
    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchQuery.trim()) {
      const q = normalize(searchQuery);
      list = list.filter((p) => {
        const nameNorm = normalize(p.name);
        const shortNorm = normalize(p.shortDescription || p.short || "");
        const descNorm = normalize(p.description || "");
        return (
          nameNorm.includes(q) || shortNorm.includes(q) || descNorm.includes(q)
        );
      });
    }

    // Lọc theo khoảng giá (sử dụng salePrice nếu có)
    list = list.filter((p) => {
      const price = p.salePrice ?? p.price ?? 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Lọc: chỉ hàng đang giảm giá (salePrice < price)
    if (onlyDiscount) {
      list = list.filter((p) => {
        if (p.salePrice == null || p.price == null) return false;
        return p.salePrice < p.price;
      });
    }

    // Lọc: siêu giảm giá (giảm > 50%)
    if (onlySuperSale) {
      list = list.filter((p) => {
        const orig = p.price ?? 0;
        const sale = p.salePrice ?? orig;
        if (orig <= 0) return false;
        return (1 - sale / orig) * 100 > 50;
      });
    }

    // Sắp xếp
    switch (sortBy) {
      case "priceAsc":
        list.sort(
          (a, b) =>
            (a.salePrice ?? a.price ?? 0) - (b.salePrice ?? b.price ?? 0)
        );
        break;
      case "priceDesc":
        list.sort(
          (a, b) =>
            (b.salePrice ?? b.price ?? 0) - (a.salePrice ?? a.price ?? 0)
        );
        break;
      case "nameAsc":
        list.sort((a, b) =>
          (a.name ?? "").localeCompare(b.name ?? "", "vi", {
            sensitivity: "base",
          })
        );
        break;
      case "nameDesc":
        list.sort((a, b) =>
          (b.name ?? "").localeCompare(a.name ?? "", "vi", {
            sensitivity: "base",
          })
        );
        break;
      case "default":
      default:
        break;
    }

    return list;
  }, [
    products,
    selectedCategory,
    searchQuery,
    priceRange,
    sortBy,
    onlyDiscount,
    onlySuperSale,
  ]);

  // ---------- Reset Filters Handler ----------

  const handleResetFilters = () => {
    setSortBy("default");
    onChangeSelectedCategory(null);
    setPriceRange([minPrice, maxPrice]);
    setOnlyDiscount(false);
    setOnlySuperSale(false);
    setSearchQuery("");
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <Box
      sx={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        mb: 8,
      }}
    >
      {/* Tiêu đề trang lớn */}
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", mt: 4, mb: 1, textAlign: "center" }}
      >
        {title}
      </Typography>

      {/* Tabs danh mục: TẤT CẢ / RAU / CỦ / NẤM / TRÁI CÂY */}
      <Tabs
        value={selectedCategory || ""}
        onChange={(_, newValue) =>
          onChangeSelectedCategory(newValue === "" ? null : newValue)
        }
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderBottom: "1px solid #e0e0e0",
          "& .MuiTab-root": {
            fontWeight: 600,
            fontSize: 16,
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#1faa54",
            height: 3,
            borderRadius: 2,
          },
        }}
      >
        {tabsToRender.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            sx={{
              textTransform: "none",
              "&.Mui-selected": {
                color: "#1faa54",
              },
            }}
          />
        ))}
      </Tabs>

      {/* Banner hình lớn cho category (chỉ hiển thị khi không phải "TẤT CẢ") */}
      {bannerImg && selectedCategory ? (
        <Box
          sx={{
            width: "100%",
            maxWidth: 1000,
            height: { xs: 100, md: 200 },
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 3,
            mb: 2,
            position: "relative",
          }}
        >
          <img
            src={bannerImg}
            alt={selectedCategory || "banner"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Overlay text */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "700",
              fontSize: { xs: 20, md: 36 },
              textShadow: "0 2px 6px rgba(0,0,0,0.5)",
            }}
          >
            {CATEGORY_LABELS[selectedCategory] ?? selectedCategory}
          </Box>
        </Box>
      ) : null}

      {/* Hàng bộ lọc: tìm kiếm, checkbox, sắp xếp, khoảng giá, reset */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            flexWrap: "wrap",
            maxWidth: 1000,
          }}
        >
          {/* Ô tìm kiếm */}
          <TextField
            size="small"
            placeholder="Tìm sản phẩm (tên, mô tả)."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              minWidth: 320,
              flex: "1 1 320px",
              backgroundColor: "white",
            }}
          />

          {/* Checkbox: Hàng đang giảm giá */}
          <FormControlLabel
            control={
              <Checkbox
                checked={onlyDiscount}
                onChange={(e) => setOnlyDiscount(e.target.checked)}
                color="success"
              />
            }
            label="Hàng đang giảm giá"
          />

          {/* Ngăn đứng (chỉ hiển thị trên desktop) */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", md: "block" } }}
          />

          {/* Select: Sắp xếp */}
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="sort-label">Sắp xếp</InputLabel>
            <Select
              labelId="sort-label"
              label="Sắp xếp"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="default">Mặc định</MenuItem>
              <MenuItem value="priceAsc">Giá: Thấp → Cao</MenuItem>
              <MenuItem value="priceDesc">Giá: Cao → Thấp</MenuItem>
              <MenuItem value="nameAsc">Tên: A → Z</MenuItem>
              <MenuItem value="nameDesc">Tên: Z → A</MenuItem>
            </Select>
          </FormControl>

          {/* Slider khoảng giá */}
          <Box
            sx={{
              minWidth: 260,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="caption">
              Khoảng giá: {formatPrice(priceRange[0])}đ –{" "}
              {formatPrice(priceRange[1])}đ
            </Typography>
            <Slider
              value={priceRange}
              min={minPrice}
              max={maxPrice}
              step={1000}
              onChange={(_, v) => setPriceRange(v)}
              sx={{ width: 260 }}
            />
          </Box>

          {/* Nút reset bộ lọc */}
          <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={handleResetFilters}
          >
            Bỏ chọn tất cả
          </Button>
        </Box>
      </Box>

      {/* Lưới sản phẩm (4 cột responsive) */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 250px)",
          gap: 5,
          justifyContent: "center",
        }}
      >
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <ProductCard
              key={product.id ?? `${product.category}__${product.name}`}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))
        ) : (
          <Box sx={{ gridColumn: "1/-1", textAlign: "center", py: 4 }}>
            <Typography color="textSecondary">
              Không tìm thấy sản phẩm phù hợp với bộ lọc.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
