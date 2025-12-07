// app/layout.js
import "./globals.css";

export const metadata = {
  title: "GreenFarm",
  description: "Website bán nông sản - rau củ sạch",
  icons: {
    icon: "/images/branding/logo.png",
    shortcut: "/images/branding/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
