// app/features/BlogSection.js
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BlogCard from "@components/ui/BlogCard"; // <-- Import BlogCard của bạn (nhớ sửa đúng đường dẫn file)

// Fetch dữ liệu từ blogs.json
async function fetchBlogData() {
  try {
    const response = await fetch("data/blogs.json");
    if (!response.ok) throw new Error("Tải trang không thành công");
    return await response.json();
  } catch (error) {
    console.error("Lỗi tài dữ liệu:", error);
    return [];
  }
}

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogData().then((data) => {
      setBlogData(data);
      setLoading(false);
    });
  }, []);

  // --- TRƯỜNG HỢP 1: HIỂN THỊ CHI TIẾT BÀI VIẾT ---
  if (selectedPost) {
    return (
      <Box
        sx={{
          width: "90%",
          maxWidth: "900px",
          my: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => setSelectedPost(null)}
          sx={{
            alignSelf: "flex-start",
            mb: 2,
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          Quay lại danh sách
        </Button>

        {/* Header bài viết chi tiết */}
        <Typography variant="h4" fontWeight="bold" color="primary.main">
          {selectedPost.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Đăng bởi {selectedPost.author} - {selectedPost.date}
        </Typography>

        <Box
          component="img"
          src={selectedPost.image}
          sx={{
            width: "100%",
            height: 350,
            objectFit: "cover",
            borderRadius: 3,
            border: "2px solid #37be3c",
          }}
        />

        {/* Nội dung HTML */}
        <Box
          sx={{
            mt: 2,
            "& h3": { color: "#1faa54", mt: 3, mb: 1, fontWeight: "bold" },
            "& p": {
              lineHeight: 1.8,
              fontSize: "1.1rem",
              mb: 2,
              textAlign: "justify",
            },
            "& ul": { mb: 2, paddingLeft: 3 },
            "& li": { mb: 1 },
            "& img": { maxWidth: "100%", borderRadius: 2 },
          }}
          dangerouslySetInnerHTML={{ __html: selectedPost.content }}
        />
      </Box>
    );
  }

  // --- TRƯỜNG HỢP 2: HIỂN THỊ DANH SÁCH (Mặc định) ---
  return (
    <Box
      sx={{
        width: "90%",
        maxWidth: "1200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        my: 6,
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ color: "primary.main", mb: 2 }}
      >
        Góc chia sẻ
      </Typography>

      <Box
        sx={{
          display: "grid",
          // Tự động chia cột: Card nhỏ nhất 300px, màn hình to thì 3 cột
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 4,
          width: "100%",
          justifyItems: "center",
        }}
      >
        {loading ? (
          <Typography>Đang tải bài viết...</Typography>
        ) : (
          blogData.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
              date={post.date}
              author={post.author}
              onClick={() => setSelectedPost(post)} // Truyền hàm click xuống component con
            />
          ))
        )}
      </Box>
    </Box>
  );
}
