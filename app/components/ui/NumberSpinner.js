//app/components/ui/NumberSpinner.js
"use client";

import React from "react";
import { Box, IconButton, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function NumberSpinner({
  value,
  onChange,
  min = 1,
  max, // có thể bỏ qua để không giới hạn
  size = "small",
}) {
  const clamp = (n) => {
    let v = Number(n);
    if (!Number.isFinite(v)) v = value || min || 1;
    v = Math.floor(v);
    if (min != null && v < min) v = min;
    if (max != null && Number.isFinite(max) && v > max) v = max;
    return v;
  };

  const handleInputChange = (e) => {
    onChange?.(clamp(e.target.value));
  };

  const handleMinus = () => {
    onChange?.(clamp((value || min || 1) - 1));
  };

  const handlePlus = () => {
    onChange?.(clamp((value || min || 1) + 1));
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton size={size} onClick={handleMinus} aria-label="decrement">
        <RemoveIcon />
      </IconButton>
      <TextField
        size={size}
        value={value ?? min ?? 1}
        onChange={handleInputChange}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", style: { textAlign: "center", width: 50 } }}
      />
      <IconButton size={size} onClick={handlePlus} aria-label="increment">
        <AddIcon />
      </IconButton>
    </Box>
  );
}
