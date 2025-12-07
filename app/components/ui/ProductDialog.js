// app/components/ui/ProductDialog.js
"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NumberSpinner from "./NumberSpinner";

export default function ProductDialog({ open, onClose, product, onAddToCart }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (open) setQty(1);
  }, [open]);

  if (!product) return null;

  const { name, img, price, salePrice, description } = product;
  const hasDiscount = salePrice < price;
  const effectivePrice = hasDiscount ? salePrice : price;
  const discountPercent = hasDiscount
    ? (100 - (salePrice / price) * 100).toFixed(1)
    : 0;

  const handleAdd = () => {
    onAddToCart?.(product, qty);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      {/* HEADER: không dùng DialogTitle */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          pt: 2,
          pb: 1,
        }}
      >
        <Typography variant="h6" component="p">
          {name}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          display: "flex",
          gap: isMobile ? 2 : 4,
          minWidth: isMobile ? 320 : 800,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* Ảnh sản phẩm */}
        <Box
          component="img"
          src={img}
          alt={name}
          sx={{
            width: isMobile ? "100%" : 300,
            height: isMobile ? 250 : 400,
            objectFit: "cover",
            borderRadius: 2,
            border: "1px solid #ddd",
          }}
        />

        {/* Thông tin */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="p"
            sx={{ fontWeight: "bold" }}
          >
            {name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              component="p"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {effectivePrice.toLocaleString("vi-VN")}₫
            </Typography>

            {hasDiscount && (
              <>
                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  component="span"
                  sx={{
                    color: "gray",
                    textDecoration: "line-through",
                  }}
                >
                  {price.toLocaleString("vi-VN")}₫
                </Typography>
                <Typography
                  variant="caption"
                  component="span"
                  color="error"
                  sx={{ background: "pink", borderRadius: 1, px: 0.5 }}
                >
                  -{discountPercent}%
                </Typography>
              </>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Typography component="span">Số lượng:</Typography>
            <NumberSpinner value={qty} onChange={setQty} min={1} />
            <IconButton
              color="primary"
              sx={{
                borderRadius: 2,
                px: 2,
                gap: 1,
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": { backgroundColor: "primary.light" },
              }}
              onClick={handleAdd}
            >
              <ShoppingCartIcon />
              <Typography component="span">Thêm vào giỏ</Typography>
            </IconButton>
          </Box>

          <Typography
            variant="h6"
            component="p"
            sx={{ fontWeight: "bold", mt: 1 }}
          >
            Mô tả sản phẩm
          </Typography>
          <Typography variant="body1" component="p">
            {description}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
