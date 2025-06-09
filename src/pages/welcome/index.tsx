// EventByMe - Page principale avec style harmonisé noir/blanc/doré
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Snackbar,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";
import { Product } from "../../types";
import { NavLink, useNavigate } from "react-router-dom";

const Welcome: React.FC<{
  cart: { [key: string]: Product };
  setCart: React.Dispatch<React.SetStateAction<{ [key: string]: Product }>>;
}> = ({ cart, setCart }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const cartCount = Object.keys(cart).length;

  return (
    <Box className="homepage">
      <Box className="header">
        <img
          src="/logoEventbyme.png"
          alt="EventByMe logo"
          className="main-logo"
        />
        <Box className="nav-links">
          <NavLink to="/about" className="nav-item">
            About me
          </NavLink>
          <NavLink to="/event" className="nav-item">
            Decor photo
          </NavLink>
        </Box>
        <Box className="nav-actions">
          <IconButton onClick={() => setShowSearch(!showSearch)}>
            <SearchIcon sx={{ color: "#c7a977" }} />
          </IconButton>
          {showSearch && (
            <TextField
              className="search-bar"
              placeholder="Rechercher un décor..."
              variant="outlined"
              size="small"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </Box>
      </Box>

      <Box className="hero-slider" style={{ position: "relative" }}>
        <img
          src="/banderole1.png"
          alt="Décor baby shower"
          className="hero-image"
        />
        <Box className="qr-wrapper">
          <a
            href="https://www.tiktok.com/@lia974ce"
            target="_blank"
            rel="noopener noreferrer"
            className="qr-wrapper"
          >
            <div className="qr-hover-container">
              <img
                src="/qrcodeliace.png"
                alt="QR Code TikTok"
                className="qr-code"
              />
              <img
                src="/logotoktok.png"
                alt="TikTok Logo"
                className="qr-overlay"
              />
            </div>
          </a>
        </Box>
      </Box>

      <Box className="hero-slider" style={{ position: "relative" }}>
        <img
          src="/banderole2.png"
          alt="Décor baby shower"
          className="hero-image"
        />

        <Box className="decor-overlay-container">
          {[1, 2].map((_, i) => (
            <Box
              key={i}
              className="decor-image-wrapper"
              onClick={() => navigate("/panier")}
            >
              <img
                src="/decor1.jpg"
                alt={`Décor ${i + 1}`}
                className="decor-image"
              />
              <img
                src="/logoEventbyme.png"
                alt="Overlay Logo"
                className="decor-logo-overlay"
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        message={alertMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#c7a977",
            color: "white",
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
};

export default Welcome;
