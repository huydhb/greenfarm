// app/components/ui/ProductCard.js
"use client";

import React, { useState } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ProductDialog from "./ProductDialog";

const formatPrice = (value) =>
  value.toLocaleString("vi-VN", { minimumFractionDigits: 0 });

export default function ProductCard({ product, onAddToCart }) {
  const [openDialog, setOpenDialog] = useState(false);
  const hasDiscount = product.salePrice < product.price;
  const discountPercent = hasDiscount
    ? (100 - (product.salePrice / product.price) * 100).toFixed(1)
    : 0;

  const handleQuickAdd = (e) => {
    e.stopPropagation(); // không mở dialog khi bấm icon
    onAddToCart?.(product, 1);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // tránh mở dialog khi bấm tim
    // TODO: xử lý favorite sau (nếu có)
  };

  return (
    <>
      {/* Dialog chi tiết sản phẩm */}
      <ProductDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        product={product}
        onAddToCart={(p, qty) => {
          onAddToCart?.(p, qty);
          setOpenDialog(false);
        }}
      />

      {/* Card sản phẩm – click card để mở dialog */}
      <Box
        onClick={() => setOpenDialog(true)}
        sx={{
          backgroundColor: "#f1f1f1",
          width: 250,
          height: 400,
          borderRadius: 2.5,
          border: "2px solid #37be3cff",
          boxShadow: "10px 10px 20px #303030aa",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        {/* Phần hình ảnh */}
        <div
          style={{
            backgroundColor: "#e0e0e0",
            width: "100%",
            height: "60%",
            overflow: "hidden",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <Box
            component="img"
            src={product.img}
            alt={product.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
          />
        </div>

        {/* Phần text */}
        <Box sx={{ padding: 2, height: "40%" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", marginBottom: 1 }}
          >
            {product.name.length > 17
              ? product.name.substring(0, 17) + "..."
              : product.name}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ marginBottom: 2 }}
          >
            {product.shortDescription.length > 24
              ? product.shortDescription.substring(0, 22) + "..."
              : product.shortDescription}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {formatPrice(hasDiscount ? product.salePrice : product.price)}đ
            </Typography>

            {hasDiscount && (
              <Typography
                variant="body2"
                component="div"
                sx={{
                  fontWeight: "bold",
                  color: "gray",
                  textDecoration: "line-through",
                }}
              >
                {formatPrice(product.price)}đ
              </Typography>
            )}
          </Box>
        </Box>

        {/* Phần badge giảm giá + icon, giữ layout cũ nhưng thêm onClick */}
        {hasDiscount ? (
          <>
            {/* Badge giảm giá */}
            <Box
              sx={{
                position: "relative",
                top: -390,
                left: 185,
                fontWeight: "bold",
                color: "white",
                backgroundColor: "primary.main",
                padding: 0.5,
                borderRadius: 2,
                fontSize: 12,
                textAlign: "center",
                width: 55,
              }}
            >
              -{discountPercent}%
            </Box>

            <IconButton
              sx={{ position: "relative", bottom: 70, right: -205 }}
              aria-label="add-to-cart"
              onClick={handleQuickAdd}
            >
              <ShoppingCartIcon />
            </IconButton>
            <IconButton
              sx={{
                position: "relative",
                top: -420,
                left: -35,
                backdropFilter: "blur(10px)",
              }}
              aria-label="favorite"
              onClick={handleFavoriteClick}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              sx={{ position: "relative", bottom: 45, right: -205 }}
              aria-label="add-to-cart"
              onClick={handleQuickAdd}
            >
              <ShoppingCartIcon />
            </IconButton>
            <IconButton
              sx={{
                position: "relative",
                top: -395,
                left: -35,
                backdropFilter: "blur(10px)",
              }}
              aria-label="favorite"
              onClick={handleFavoriteClick}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </>
        )}
      </Box>
    </>
  );
}
