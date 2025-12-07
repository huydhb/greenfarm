// app/components/ui/CartDialog.js
"use client";

import React, { useMemo } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import NumberSpinner from "./NumberSpinner";

export default function CartDialog({
  open,
  onClose,
  items,
  onUpdateItem,
  onRemoveItem,
  onCheckout,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const subtotal = useMemo(
    () =>
      (items || []).reduce((sum, it) => {
        const unit =
          it.salePrice != null && it.salePrice < it.price
            ? it.salePrice
            : it.price;
        const qty = it.quantity ?? 1;
        return sum + unit * qty;
      }, 0),
    [items]
  );

  const totalQty = useMemo(
    () => (items || []).reduce((s, it) => s + (it.quantity ?? 1), 0),
    [items]
  );

  const handleCheckoutClick = () => {
    if (!items || !items.length) return;
    onCheckout?.();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* HEADER: không dùng DialogTitle để tránh <h6> trong <h2> */}
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
          Giỏ hàng ({totalQty} sản phẩm)
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Danh sách sản phẩm */}
        <Box
          sx={{
            borderRadius: 2,
            backgroundColor: "#f1f1f1",
            p: 2,
            maxHeight: 400,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {!items || items.length === 0 ? (
            <Typography align="center">Giỏ hàng đang trống</Typography>
          ) : (
            items.map((item) => {
              const unit =
                item.salePrice != null && item.salePrice < item.price
                  ? item.salePrice
                  : item.price;
              const lineTotal = unit * (item.quantity ?? 1);

              return (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: 2,
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "white",
                    alignItems: isMobile ? "flex-start" : "center",
                  }}
                >
                  <Box
                    component="img"
                    src={item.img}
                    alt={item.name}
                    sx={{
                      width: isMobile ? "100%" : 120,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 1,
                      border: "1px solid #ddd",
                    }}
                  />
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2">
                      Đơn giá:&nbsp;
                      <span style={{ fontWeight: 600 }}>
                        {unit.toLocaleString("vi-VN")}₫
                      </span>
                      {item.salePrice != null &&
                        item.salePrice < item.price && (
                          <>
                            {"  ·  "}
                            <span
                              style={{
                                color: "gray",
                                textDecoration: "line-through",
                              }}
                            >
                              {item.price.toLocaleString("vi-VN")}₫
                            </span>
                          </>
                        )}
                    </Typography>
                    <Typography variant="body2">
                      Thành tiền:&nbsp;
                      <span style={{ fontWeight: 700 }}>
                        {lineTotal.toLocaleString("vi-VN")}₫
                      </span>
                    </Typography>

                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <NumberSpinner
                        min={1}
                        value={item.quantity ?? 1}
                        onChange={(n) => onUpdateItem?.(item.id, n)}
                      />
                      <IconButton
                        color="error"
                        onClick={() => onRemoveItem?.(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              );
            })
          )}
        </Box>

        {/* Tổng kết */}
        <Box
          sx={{
            mt: 1,
            p: 2,
            borderRadius: 2,
            backgroundColor: "white",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: 2,
            border: "1px solid #ddd",
          }}
        >
          <Box>
            <Typography>Tổng số lượng: {totalQty}</Typography>
            <Typography sx={{ fontWeight: "bold", mt: 0.5 }}>
              Tạm tính: {subtotal.toLocaleString("vi-VN")}₫
            </Typography>
          </Box>
          <IconButton
            onClick={handleCheckoutClick}
            sx={{
              borderRadius: 2,
              px: 2,
              gap: 1,
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": { backgroundColor: "primary.light" },
            }}
          >
            <ShoppingBagIcon />
            <Typography component="span">Thanh toán</Typography>
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
