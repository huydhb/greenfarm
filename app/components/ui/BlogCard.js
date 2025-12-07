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
  onClick, 
}) {
  const safeTitle = title || "Tiêu đề bài viết GreenFarm";
  const safeExcerpt =
    excerpt ||
    "Đây là đoạn mô tả ngắn về bài viết, giới thiệu nội dung chính cho người đọc…";
  const safeImage = image || "images/branding/default-image.png"; 
  const safeAuthor = author || "GreenFarm";
  const safeDate = date || "00:00, 1 tháng 1 năm 2026";

  return (
    // Dùng ButtonBase hoặc Box với onClick để làm cả thẻ clickable
    <Box
      onClick={onClick} 
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        border: "2px solid #37be3c",
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "#f1f1f1",
        cursor: "pointer", 
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)", 
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
            src="images/branding/logo.png" 
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
              WebkitLineClamp: 3, 
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
            height: 200, 
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
            {Math.floor(Math.random() * 10000) + 10}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CommentIcon fontSize="small" />
          <Typography variant="body2">
            {Math.floor(Math.random() * 1000)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
