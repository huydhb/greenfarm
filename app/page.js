"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  AppBar,
  Toolbar,
  Tab,
  Tabs,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  useMediaQuery,
  Snackbar,
  Alert,
  Badge,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ProductsSection from "@features/ProductsSection";
import HomeSection from "@features/HomeSection";
import ContactSection from "@features/ContactSection";
import BlogSection from "@features/BlogSection";
import FooterSection from "@features/FooterSection";
import CartDialog from "@components/ui/CartDialog";

export default function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1faa54ff",
        light: "#37be3cff",
      },
      secondary: {
        main: "#ebff38ff",
      },
      text: {
        primary: "#000000",
      },
    },
    typography: {
      fontFamily: "Coiny, Roboto, Arial, sans-serif",
      h4: { fontWeight: 700 },
    },
    spacing: 8,
  });

  // Tabs, filter, layout
  const [tab, setTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  // Data sản phẩm
  const [products, setProducts] = useState(null);

  // Giỏ hàng + dialog + snackbar
  const [cartItems, setCartItems] = useState([]);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);

  const cartTotalQty = React.useMemo(
    () => cartItems.reduce((sum, it) => sum + (it.quantity ?? 1), 0),
    [cartItems]
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  // Scroll lên đầu khi đổi tab
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  // Load dữ liệu sản phẩm
  useEffect(() => {
    fetch("data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi khi tải JSON:", err));
  }, []);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const addToCart = (product, qty = 1) => {
    if (!product) return;

    let addQty = Number(qty);
    if (!Number.isFinite(addQty)) addQty = 1;
    addQty = Math.max(1, Math.floor(addQty));

    setCartItems((prev) => {
      const id = product.id ?? product.name;
      const exists = prev.find((it) => it.id === id);

      if (exists) {
        const newQuantity = (exists.quantity ?? 1) + addQty;
        return prev.map((it) =>
          it.id === id ? { ...it, quantity: newQuantity } : it
        );
      }

      return [
        ...prev,
        {
          ...product,
          id,
          quantity: addQty,
        },
      ];
    });

    setSnackbarMsg(`Đã thêm "${product.name}" x${addQty} vào giỏ hàng.`);
    setSnackbarOpen(true);
  };

  const updateCartItem = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity: quantity } : it))
    );
  };

  const removeCartItem = (id) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleCheckout = () => {
    if (!cartItems.length) return;
    setSnackbarMsg("Thanh toán thành công!");
    setSnackbarOpen(true);
    setCartItems([]);
    setCartDialogOpen(false);
  };

  if (!products) return <div>Đang tải dữ liệu...</div>;

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          padding: 16,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            height: "100%",
            width: "100%",
            borderRadius: 5,
            gap: 10,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            flexGrow: 1,
            marginTop: 15,
          }}
        >
          {tab === 0 && (
            <div
              style={{
                overflowY: "hidden",
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <HomeSection products={products} onAddToCart={addToCart} />
            </div>
          )}
          {tab === 1 && (
            <div
              style={{
                overflowY: "hidden",
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <ProductsSection
                products={products}
                selectedCategory={selectedCategory}
                onChangeSelectedCategory={setSelectedCategory}
                onAddToCart={addToCart}
              />
            </div>
          )}
          {tab === 2 && <BlogSection />}
          {tab === 3 && (
            <div
              style={{
                overflowY: "hidden",
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <ContactSection />
            </div>
          )}
        </Box>
        <div
          style={{
            backdropFilter: "blur(5px)",
            width: "100%",
            height: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
          }}
        >
          <AppBar
            position="static"
            sx={{
              borderRadius: 4,
              display: "flex",
              justifyContent: "center",
              width: "95%",
              backgroundColor: "primary.main",
            }}
          >
            {!openSearch ? (
              <Toolbar sx={{ p: 1, gap: 2 }}>
                {isMobile ? (
                  <>
                    <IconButton
                      color="inherit"
                      aria-label="menu"
                      onClick={toggleDrawer(true)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Drawer
                      anchor="left"
                      open={drawerOpen}
                      onClose={toggleDrawer(false)}
                    >
                      <List sx={{ width: 250 }}>
                        <ListItem
                          onClick={() => handleTabChange(null, 0)}
                          sx={{ cursor: "pointer" }}
                        >
                          <ListItemText primary="Trang chủ" />
                        </ListItem>
                        <ListItem
                          onClick={() => handleTabChange(null, 1)}
                          sx={{ cursor: "pointer" }}
                        >
                          <ListItemText primary="Sản phẩm" />
                        </ListItem>
                        <ListItem
                          onClick={() => handleTabChange(null, 2)}
                          sx={{ cursor: "pointer" }}
                        >
                          <ListItemText primary="Blog" />
                        </ListItem>
                        <ListItem
                          onClick={() => handleTabChange(null, 3)}
                          sx={{ cursor: "pointer" }}
                        >
                          <ListItemText primary="Liên hệ" />
                        </ListItem>
                      </List>
                    </Drawer>
                  </>
                ) : null}

                <img
                  src="/images/branding/logo.png"
                  alt="Logo"
                  style={{ height: 40 }}
                />
                <Typography variant="h5" fontWeight="bold" component="div">
                  GreenFarm
                </Typography>

                {!isMobile ? (
                  <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    textColor="white"
                    indicatorColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    <Tab label="Trang chủ" />
                    <Tab label="Sản phẩm" />
                    <Tab label="Blog" />
                    <Tab label="Liên hệ" />
                  </Tabs>
                ) : null}

                <Box sx={{ flexGrow: 1 }} />

                {/* Nút giỏ hàng: Desktop = nút to, Mobile = icon + badge */}
                {isMobile ? (
                  // MOBILE: chỉ icon + badge tròn ở góc
                  <IconButton
                    color="inherit"
                    aria-label="cart"
                    onClick={() => setCartDialogOpen(true)}
                    sx={{ ml: 1 }}
                  >
                    <Badge
                      badgeContent={cartTotalQty}
                      showZero
                      overlap="circular"
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      sx={{
                        "& .MuiBadge-badge": {
                          minWidth: 18,
                          height: 18,
                          borderRadius: "999px",
                          fontSize: 11,
                          fontWeight: 600,
                          backgroundColor: "#1b5e20",
                          color: "#fff",
                        },
                      }}
                    >
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                ) : (
                  // DESKTOP: nút bo tròn, nền xanh, icon + chữ "Giỏ hàng (x)"
                  <Button
                    onClick={() => setCartDialogOpen(true)}
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                      borderRadius: 999,
                      backgroundColor: "#2ecc71",
                      color: "white",
                      textTransform: "none",
                      px: 2.5,
                      py: 0.75,
                      fontWeight: 500,
                      fontSize: 14,
                      "&:hover": {
                        backgroundColor: "#27ae60",
                      },
                    }}
                  >
                    Giỏ hàng ({cartTotalQty})
                  </Button>
                )}

                {!isMobile ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 200,
                      backgroundColor: "white",
                      borderRadius: 10,
                      paddingLeft: 8,
                    }}
                  >
                    <SearchIcon sx={{ color: "gray" }} />
                    <input
                      style={{
                        height: 40,
                        borderRadius: 10,
                        outline: "none",
                        width: "100%",
                        border: "none",
                        fontFamily: "Coiny",
                      }}
                      placeholder="Tìm kiếm sản phẩm..."
                    />
                  </div>
                ) : (
                  <IconButton
                    color="inherit"
                    aria-label="search"
                    onClick={() => setOpenSearch(true)}
                  >
                    <SearchIcon />
                  </IconButton>
                )}
              </Toolbar>
            ) : (
              <Toolbar sx={{ p: 1, gap: 2 }}>
                <InputBase
                  autoFocus
                  placeholder="Nhập từ khóa..."
                  sx={{
                    flex: 1,
                    backgroundColor: "white",
                    borderRadius: 2,
                    paddingLeft: 2,
                  }}
                />
                <IconButton onClick={() => setOpenSearch(false)}>
                  <CloseIcon sx={{ color: "white" }} />
                </IconButton>
              </Toolbar>
            )}
          </AppBar>
        </div>
      </div>

      {/* CartDialog + Snackbar */}
      <CartDialog
        open={cartDialogOpen}
        onClose={() => setCartDialogOpen(false)}
        items={cartItems}
        onUpdateItem={updateCartItem}
        onRemoveItem={removeCartItem}
        onCheckout={handleCheckout}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>

      <FooterSection />
    </ThemeProvider>
  );
}
