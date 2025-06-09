import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import DeleteIcon from "@mui/icons-material/Delete";
import "./style.css";
import { Product } from "../../types";

interface CartProps {
  cart: { [key: string]: Product };
  setCart: React.Dispatch<React.SetStateAction<{ [key: string]: Product }>>;
}

// Clé publique Stripe (REMPLACE AVEC TA CLÉ TEST)
const stripePromise = loadStripe(
  "pk_live_51Qqw9CHD55FYDeNbST86tQdHgm9PFBeHHSe9ODtehAm1J7UqdHeLiNAvViNwuvbwT6nydjVOQ3NxInv5sET4NUCZ009Whel6Rb" // Vérifie que c'est bien ta clé de test
);

stripePromise.then((stripe) => {
  if (!stripe) {
    console.error("⚠️ Stripe n'a pas été correctement chargé !");
  } else {
    console.log("✅ Stripe chargé avec succès !");
  }
});

const PaymentPage: React.FC<CartProps> = ({ cart, setCart }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [setCart]);

  useEffect(() => {
    setCartItems(Object.values(cart)); // Récupérer la liste des produits dans le panier
  }, [cart]);

  const removeFromCart = (name: string) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[name];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleStripePayment = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    await stripe.redirectToCheckout({
      lineItems: cartItems.map((item) => ({
        price: item.stripePriceId,
        quantity: 1,
      })),
      mode: "payment",
      successUrl: window.location.origin + "/success", // ✅ Redirection après paiement
      cancelUrl: window.location.origin + "/cancel",
    });

    // Vider le panier après le paiement
    setCart({});
    localStorage.removeItem("cart");
  };

  return (
    <Box className="payment-page">
      <Box className="logo-container">
        <img src="/logoliace.png" alt="Logo du site" />
      </Box>

      {cartItems.length === 0 ? (
        <Typography variant="h6" className="empty-cart">
          Votre panier est vide.
        </Typography>
      ) : (
        <Box className="cart-items">
          {cartItems.map((item, index) => (
            <Box key={index} className="cart-item">
              <Typography variant="h6">{item.name}</Typography>
              <Button
                onClick={() => removeFromCart(item.name)}
                className="remove-button"
              >
                <DeleteIcon style={{ color: "red" }} />
              </Button>
            </Box>
          ))}

          {/* Bouton de paiement Stripe */}
          <Button
            variant="contained"
            className="pay-button"
            onClick={handleStripePayment}
          >
            <PaymentIcon style={{ marginRight: "8px" }} /> Payer avec Stripe
          </Button>
        </Box>
      )}

      <Button component={NavLink} to="/" className="back-button">
        Retour à l'accueil
      </Button>
    </Box>
  );
};

export default PaymentPage;
