// app/features/FooterSection.js
import React from "react";
import { Typography, Box, Link, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function FooterSection() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        mt: 6,
        backgroundColor: "#1faa54ff",
        color: "white",
        pt: 4,
        pb: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Grid 3 cột, tự xuống dòng trên mobile */}
      <Grid
        container
        spacing={{ xs: 4, md: 8 }}
        sx={{ maxWidth: 1200, mx: "auto", px: 2, pb: 4 }}
      >
        {/* Cột 1: Logo + liên hệ + social */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box
              component="img"
              src="images/branding/logo.png"
              alt="GreenFarm"
              sx={{ height: 40 }}
            />
            <Typography variant="h6" fontWeight="bold">
              GreenFarm
            </Typography>
          </Box>

          <Typography variant="body2">
            Hotline: 0123 456 789
            <br />
            Email: example@mail.host
            <br />
            Địa chỉ: 123 đường ABC, phường XYZ, TP.HCM
          </Typography>

          {/* Social icons có viền */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
            {/* Facebook */}
            <Box
              sx={{
                width: 36,
                height: 36,
                border: "3px solid #0866FF", // VIỀN XANH DƯƠNG
                borderRadius: "50%",
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FacebookIcon sx={{ color: "#0866FF", fontSize: 20 }} />
            </Box>

            {/* Instagram */}
            <Box
              sx={{
                width: 36,
                height: 36,
                border: "3px solid #fa00a4", // VIỀN HỒNG
                borderRadius: "50%",
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <InstagramIcon sx={{ color: "#fa00a4", fontSize: 20 }} />
            </Box>

            {/* GitHub */}
            <Box
              sx={{
                width: 36,
                height: 36,
                border: "2px solid #24292e", // VIỀN ĐEN ĐẬM
                borderRadius: "50%",
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GitHubIcon sx={{ color: "#24292e", fontSize: 20 }} />
            </Box>
          </Box>
        </Grid>

        {/* Cột 2: Liên kết nhanh */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Liên kết nhanh
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="#" color="inherit" underline="hover">
              Trang chủ
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Sản phẩm
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Tin tức
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Liên hệ
            </Link>
          </Box>
        </Grid>

        {/* Cột 3: Chính sách / thông tin thêm */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Chính sách & hỗ trợ
          </Typography>
          <Typography variant="body2">
            • Giao hàng nội thành trong ngày.
          </Typography>
          <Typography variant="body2">
            • Hỗ trợ đổi trả trong 24 giờ.
          </Typography>
          <Typography variant="body2">
            • Nông sản sạch, nguồn gốc rõ ràng.
          </Typography>
        </Grid>
      </Grid>

      {/* Dòng copyright dưới cùng */}
      <Box
        sx={{
          width: "100%",
          py: 1,
          backgroundColor: "#0b830fff",
          color: "white",
          textAlign: "center",
          fontSize: "small",
          mt: "auto",
        }}
      >
        ©Copyright 2025 GreenFarm
      </Box>
    </Box>
  );
}
