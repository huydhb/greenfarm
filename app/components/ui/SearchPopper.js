//app/components/ui/SearchPopper.js
import {
  Popper,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
} from "@mui/material";

export default function SearchPopper({
  open,
  anchorEl,
  suggestions = [],
  onPick,
  onClose,
}) {
  const priceStr = (p) => (Number(p)?.toLocaleString("vi-VN") ?? "0") + "₫";

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      style={{ zIndex: 1300 }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 360,
          maxHeight: 360,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Box sx={{ px: 1.5, py: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {suggestions.length} sản phẩm phù hợp
          </Typography>
        </Box>
        <Divider />

        <List dense disablePadding>
          {suggestions.map((sug) => {
            // Dữ liệu mới: img, price, salePrice
            const hasSale =
              sug.salePrice != null &&
              Number(sug.salePrice) > 0 &&
              sug.salePrice < sug.price;
            const displayPrice = sug.salePrice ?? sug.price;

            return (
              <ListItemButton
                key={`${sug.category}-${sug.name}`}
                onMouseDown={(e) => e.preventDefault()} // giữ focus input, tránh đóng sớm
                onClick={() => {
                  onPick?.(sug);
                  onClose?.();
                }}
                sx={{ py: 0.75 }}
              >
                <ListItemAvatar sx={{ minWidth: 48 }}>
                  <Avatar
                    variant="rounded"
                    src={sug.img || undefined}
                    alt={sug.name}
                    sx={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      bgcolor: "grey.200",
                      fontSize: 12,
                    }}
                    imgProps={{
                      referrerPolicy: "no-referrer",
                      onError: (e) => {
                        e.currentTarget.style.visibility = "hidden";
                        e.currentTarget.parentElement.style.background = "#eee";
                      },
                    }}
                  >
                    {sug.name?.slice(0, 2).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        noWrap
                        title={sug.name}
                        sx={{ flex: 1 }}
                      >
                        {sug.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          flexShrink: 0,
                        }}
                      >
                        {hasSale ? (
                          <>
                            <Typography
                              variant="body2"
                              fontWeight={700}
                              color="success.main"
                              noWrap
                            >
                              {priceStr(sug.salePrice)}
                            </Typography>
                            {sug.price !== sug.salePrice && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ textDecoration: "line-through" }}
                                noWrap
                              >
                                {priceStr(sug.price)}
                              </Typography>
                            )}
                          </>
                        ) : (
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            color="text.primary"
                            noWrap
                          >
                            {priceStr(displayPrice)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {sug.category}
                    </Typography>
                  }
                  sx={{ ml: 0.5 }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Paper>
    </Popper>
  );
}
