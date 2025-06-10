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
      <Box
        className="header"
        sx={{
          backgroundColor: "#f5f5dc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px 0",
          borderBottom: "6px solid #eae4d9",
        }}
      >
        <img
          src="/logoEventbyme.png"
          alt="EventByMe logo"
          className="header-logo"
        />
      </Box>

      <Box className="hero-slider" style={{ position: "relative" }}>
        <img
          src="/banderole1.png"
          alt="Décor baby shower"
          className="hero-image"
        />
        <Box className="social-icons-banner">
          <a
            href="https://www.instagram.com/tonprofil"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link"
          >
            <img src="/1.png" alt="Instagram" className="social-icon" />
          </a>
          <a
            href="https://www.tiktok.com/@tonprofil"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link"
          >
            <img src="/2.png" alt="TikTok" className="social-icon" />
          </a>
          <a href="mailto:contact@eventbyme.fr" className="social-icon-link">
            <img src="/3.png" alt="Email" className="social-icon" />
          </a>
        </Box>

        <Box className="decor-overlay-container">
          <Box
            className="decor-image-wrapper"
            onClick={() => navigate("/panier")}
          >
            <img src="/decor2.png" alt="Décor photo" className="decor-image" />
            <img
              src="/logoEventbyme.png"
              alt="Overlay Logo"
              className="decor-logo-overlay"
            />
          </Box>
        </Box>
      </Box>

      {/* 
<Box className="hero-slider" style={{ position: "relative" }}>
  <img
    src="/banderole2.png"
    alt="Décor baby shower"
    className="hero-image"
  />
</Box>
*/}

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
