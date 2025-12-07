// app/features/HomeSection.js
import React from "react";
import { Typography, Box } from "@mui/material";
import ProductCard from "@components/ui/ProductCard";

export default function HomeSection({ products, onAddToCart }) {
  // Lọc theo nhu cầu
  const fruitPartyProducts = products.filter(
    (p) => p.category === "trai-cay" && p.salePrice < p.price
  );

  const superSaleProducts = products.filter((p) => {
    if (p.salePrice >= p.price) return false;
    const discount = 100 - (p.salePrice / p.price) * 100;
    return discount >= 80;
  });

  const onSaleProducts = products.filter((p) => p.salePrice < p.price);

  return (
    <div
      style={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        borderRadius: 10,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {/* Banner */}
      <Box
        sx={{
          backgroundColor: "primary.main",
          height: 300,
          width: "100%",
          overflow: "hidden",
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img
          src="images/branding/banner.png"
          alt="Banner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            color: "white",
            textAlign: "center",
            padding: 2,
            borderRadius: 5,
            height: 300,
            width: "calc(90% - 25px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: "bold", mb: 1, color: "white" }}
          >
            Chào mừng đến với GreenFarm!
          </Typography>
          <Typography
            variant="body1"
            color="white"
            sx={{ textAlign: "center", mb: 2 }}
          >
            Khám phá nông sản tươi sạch, an toàn và chất lượng cao từ các trang
            trại uy tín. Mua sắm dễ dàng và nhanh chóng ngay hôm nay!
          </Typography>
        </Box>
      </Box>

      {/* Fruits Party */}
      <Typography
        variant="h3"
        component="div"
        sx={{
          fontWeight: "bold",
          mt: 10,
          mb: 1,
          color: "text.primary",
          textAlign: "center",
        }}
      >
        Fruits Party
      </Typography>
      <Box
        sx={{
          width: "100%",
          mb: 15,
          maxWidth: "1200px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 250px)",
          gap: 5,
          justifyContent: "center",
        }}
      >
        {fruitPartyProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </Box>

      {/* Siêu giảm giá */}
      <Typography
        variant="h3"
        component="div"
        sx={{
          fontWeight: "bold",
          mt: 10,
          mb: 1,
          color: "text.primary",
          textAlign: "center",
        }}
      >
        Siêu giảm giá
      </Typography>
      <Box
        sx={{
          width: "100%",
          mb: 15,
          maxWidth: "1200px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 250px)",
          gap: 5,
          justifyContent: "center",
        }}
      >
        {superSaleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </Box>

      {/* Đang giảm giá */}
      <Typography
        variant="h3"
        component="div"
        sx={{
          fontWeight: "bold",
          mt: 10,
          mb: 1,
          color: "text.primary",
          textAlign: "center",
        }}
      >
        Đang giảm giá
      </Typography>
      <Box
        sx={{
          width: "100%",
          mb: 15,
          maxWidth: "1200px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 250px)",
          gap: 5,
          justifyContent: "center",
        }}
      >
        {onSaleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </Box>
    </div>
  );
}
