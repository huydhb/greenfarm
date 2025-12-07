// app/components/ui/BlogCard.js
import React from "react";
import { Box, Typography, ButtonBase } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

export default function BlogCard({
  title,
  excerpt,
  image,
  date,
  author,
  onClick, // <--- THÊM PROP NÀY
}) {
  const safeTitle = title || "Tiêu đề bài viết GreenFarm";
  const safeExcerpt =
    excerpt ||
    "Đây là đoạn mô tả ngắn về bài viết, giới thiệu nội dung chính cho người đọc…";
  const safeImage = image || "images/blog/blog-default.jpg"; // Đảm bảo bạn có ảnh này hoặc thay bằng link online
  const safeAuthor = author || "GreenFarm";
  const safeDate = date || "00:00, 1 tháng 1 năm 2026";

  return (
    // Dùng ButtonBase hoặc Box với onClick để làm cả thẻ clickable
    <Box
      onClick={onClick} // <--- GẮN SỰ KIỆN CLICK
      sx={{
        width: "100%",
        // maxWidth: 900, // Bỏ maxWidth cứng để nó co giãn theo lưới Grid của BlogSection
        display: "flex",
        flexDirection: "column",
        border: "2px solid #37be3c",
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "#f1f1f1",
        cursor: "pointer", // <--- Con trỏ chuột thành hình bàn tay
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)", // Hiệu ứng nhấc nhẹ khi hover
          boxShadow: 3,
        },
      }}
    >
      {/* Phần nội dung */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          gap: 2,
        }}
      >
        {/* Header: Avatar + Info */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "95%",
            height: 50,
            gap: 2,
          }}
        >
          <Box
            component="img"
            src="images/branding/logo.png" // Logo ví dụ
            alt="Avatar"
            sx={{ borderRadius: 2, width: 40, height: 40, objectFit: "cover" }}
          />
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">
              {safeAuthor}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {safeDate}
            </Typography>
          </Box>
        </Box>

        {/* Title + Excerpt */}
        <Box sx={{ width: "95%" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ lineHeight: 1.3, mb: 1 }}
          >
            {safeTitle}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3, // Giới hạn 3 dòng
            }}
          >
            {safeExcerpt}
          </Typography>
        </Box>

        {/* Image */}
        <Box
          component="img"
          src={safeImage}
          alt={safeTitle}
          sx={{
            width: "95%",
            borderRadius: 2,
            border: "1px solid #1faa54ff",
            objectFit: "cover",
            height: 200, // Cố định chiều cao ảnh cho đều
          }}
        />
      </Box>

      {/* Footer: Like/Comment */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: 45,
          justifyContent: "space-between",
          backgroundColor: "#37be3cff",
          color: "white",
          px: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FavoriteIcon fontSize="small" />
          <Typography variant="body2">
            {Math.floor(Math.random() * 500) + 10}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CommentIcon fontSize="small" />
          <Typography variant="body2">
            {Math.floor(Math.random() * 50)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
