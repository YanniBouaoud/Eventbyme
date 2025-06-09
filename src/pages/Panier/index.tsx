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
import { Product } from "../../types";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";

const Panier: React.FC<{
  cart: { [key: string]: Product };
  setCart: React.Dispatch<React.SetStateAction<{ [key: string]: Product }>>;
}> = ({ cart, setCart }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const products: Product[] = [
    {
      name: "Décor Bohème Chic",
      image: "/decor1.jpg",
      stripePriceId: "price_1QxxBOME",
      available: true,
      price: 149,
    },
    {
      name: "Baby Shower Pastel",
      image: "/decor1.jpg",
      stripePriceId: "price_1QxxBABY",
      available: true,
      price: 179,
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const cartCount = Object.keys(cart).length;

  const toggleCart = (product: Product) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[product.name]) {
        delete updatedCart[product.name];
        setAlertMessage(`❌ Retiré du panier: ${product.name}`);
      } else {
        updatedCart[product.name] = product;
        setAlertMessage(`✅ Ajouté au panier: ${product.name}`);
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setShowAlert(true);
      return updatedCart;
    });
  };

  return (
    <Box className="homepage">
      <Box className="header">
        <img
          src="/logoEventbyme.png"
          alt="EventByMe logo"
          className="main-logo"
        />
        <Box className="nav-links">
          <NavLink to="/" className="nav-item">
            EventByMe
          </NavLink>
          <NavLink to="/about" className="nav-item">
            About me
          </NavLink>
          <NavLink to="/event" className="nav-item">
            Event
          </NavLink>
          <NavLink to="/children" className="nav-item">
            Children's corner
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
          <Button className="cart-button" component={NavLink} to="/paymentpage">
            <Badge
              badgeContent={cartCount}
              color="error"
              invisible={cartCount === 0}
            >
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Box>
      </Box>

      <Box className="hero-slider">
        <img
          src="/banderole.png"
          alt="Décor baby shower"
          className="hero-image"
        />
      </Box>

      <Box className="featured-section">
        {filteredProducts.map((product, index) => (
          <Box key={index} className="featured-item">
            <img
              src={product.image}
              alt={product.name}
              className="featured-image"
              style={{ filter: product.available ? "none" : "grayscale(80%)" }}
            />
            <Typography className="product-name">{product.name}</Typography>
            <Typography className="product-price">{product.price}€</Typography>
            <Box className="button-group">
              <Button
                variant="outlined"
                onClick={() => toggleCart(product)}
                disabled={!product.available}
              >
                {cart[product.name] ? (
                  <RemoveShoppingCartIcon />
                ) : (
                  <AddShoppingCartIcon />
                )}
              </Button>
              {cart[product.name] && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/paymentpage")}
                >
                  Voir le panier
                </Button>
              )}
            </Box>
          </Box>
        ))}
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

export default Panier;
