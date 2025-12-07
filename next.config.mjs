/** @type {import('next').NextConfig} */
const nextConfig = {
  // Xuất site dạng static vào thư mục out/
  output: "export",

  // Cấu hình cho GitHub Pages: https://huydhb.github.io/greenfarm/
  basePath: process.env.NODE_ENV === "production" ? "/greenfarm" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/greenfarm/" : "",

  // Tắt tối ưu ảnh phía server (bắt buộc khi export static)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
