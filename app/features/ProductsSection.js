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
  Popover,
} from "@mui/material";
// Đổi đường dẫn theo project của bạn
import ProductCard from "@components/ui/ProductCard";

const CATEGORY_LABELS = {
  rau: "Rau xanh",
  cu: "Củ, quả",
  nam: "Nấm tươi",
  "trai-cay": "Trái cây",
};

const formatPrice = (value) =>
  value.toLocaleString("vi-VN", { minimumFractionDigits: 0 });

export default function ProductsSection({
  products,
  selectedCategory,
  onChangeSelectedCategory,
  onAddToCart,
}) {
  // lấy danh sách category từ data
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  // sort: default, priceAsc, priceDesc, nameAsc, nameDesc
  const [sortBy, setSortBy] = useState("default");

  // min/max price
  const prices = products.map((p) => p.salePrice ?? p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  // popover cho thanh trượt giá
  const [priceAnchorEl, setPriceAnchorEl] = useState(null);
  const pricePopoverOpen = Boolean(priceAnchorEl);

  // Lọc & sắp xếp
  const visibleProducts = useMemo(() => {
    let list = [...products];

    // lọc theo category
    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // lọc theo khoảng giá
    list = list.filter((p) => {
      const price = p.salePrice ?? p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // sắp xếp
    switch (sortBy) {
      case "priceAsc":
        list.sort(
          (a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
        );
        break;
      case "priceDesc":
        list.sort(
          (a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
        );
        break;
      case "nameAsc":
        list.sort((a, b) =>
          a.name.localeCompare(b.name, "vi", { sensitivity: "base" })
        );
        break;
      case "nameDesc":
        list.sort((a, b) =>
          b.name.localeCompare(a.name, "vi", { sensitivity: "base" })
        );
        break;
      case "default":
      default:
        break;
    }

    return list;
  }, [products, selectedCategory, priceRange, sortBy]);

  // Tiêu đề trang
  const title =
    selectedCategory && CATEGORY_LABELS[selectedCategory]
      ? CATEGORY_LABELS[selectedCategory].toUpperCase()
      : "TẤT CẢ SẢN PHẨM";

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
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", mt: 4, mb: 1, textAlign: "center" }}
      >
        {title}
      </Typography>

      {/* Hàng filter */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          width: "100%",
        }}
      >
        {/* Sắp xếp */}
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

        {/* Loại sản phẩm */}
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="category-label">Loại sản phẩm</InputLabel>
          <Select
            labelId="category-label"
            label="Loại sản phẩm"
            value={selectedCategory || ""}
            onChange={(e) =>
              onChangeSelectedCategory(
                e.target.value === "" ? null : e.target.value
              )
            }
          >
            <MenuItem value="">Tất cả</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {CATEGORY_LABELS[cat] || cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Giá sản phẩm (popover + slider) */}
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={(e) => setPriceAnchorEl(e.currentTarget)}
        >
          Giá sản phẩm
        </Button>

        <Popover
          open={pricePopoverOpen}
          anchorEl={priceAnchorEl}
          onClose={() => setPriceAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Box sx={{ p: 2, width: 260 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {formatPrice(priceRange[0])}đ - {formatPrice(priceRange[1])}đ
            </Typography>
            <Slider
              value={priceRange}
              onChange={(_, newValue) => setPriceRange(newValue)}
              min={minPrice}
              max={maxPrice}
              valueLabelDisplay="off"
            />
          </Box>
        </Popover>

        {/* Reset */}
        <Button
          variant="outlined"
          color="success"
          size="small"
          onClick={() => {
            setSortBy("default");
            onChangeSelectedCategory(null);
            setPriceRange([minPrice, maxPrice]);
          }}
        >
          Bỏ chọn tất cả
        </Button>
      </Box>

      {/* Grid sản phẩm */}
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
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </Box>
    </Box>
  );
}
