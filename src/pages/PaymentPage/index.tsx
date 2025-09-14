import React, { useEffect, useMemo, useState } from "react";
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

// ⚠️ Remplace par ta clé **TEST** dans un .env (ex: REACT_APP_STRIPE_PK)
const stripePromise = loadStripe(
  "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
);

const PaymentPage: React.FC<CartProps> = ({ cart, setCart }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Recharge le panier depuis localStorage au montage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (e) {
      console.error("Erreur de lecture du panier localStorage:", e);
    }
  }, [setCart]);

  // Miroir local pour l'affichage
  useEffect(() => {
    setCartItems(Object.values(cart));
  }, [cart]);

  // Total (optionnel si tu veux l’afficher)
  const total = useMemo(
    () => cartItems.reduce((sum, p) => sum + (p.price ?? 0), 0),
    [cartItems]
  );

  // Suppression par id (et plus par name)
  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const handleStripePayment = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe n'a pas été chargé.");
      return;
    }

    // On ne garde que les items avec un stripePriceId défini
    const purchasable = cartItems.filter((i) => !!i.stripePriceId);

    if (purchasable.length === 0) {
      alert(
        "Aucun article n'est payable (stripePriceId manquant). Vérifie la configuration des produits."
      );
      return;
    }

    const { error } = await stripe.redirectToCheckout({
      lineItems: purchasable.map((item) => ({
        price: item.stripePriceId as string,
        quantity: 1,
      })),
      mode: "payment",
      successUrl: window.location.origin + "/success",
      cancelUrl: window.location.origin + "/cancel",
    });

    if (error) {
      console.error("Erreur Stripe:", error.message);
    }
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
          {cartItems.map((item) => (
            <Box key={item.id} className="cart-item">
              <Typography variant="h6">{item.title}</Typography>
              <Button
                onClick={() => removeFromCart(item.id)}
                className="remove-button"
                title="Retirer du panier"
              >
                <DeleteIcon style={{ color: "red" }} />
              </Button>
            </Box>
          ))}

          {/* (Optionnel) afficher le total */}
          <Box className="cart-total" style={{ marginTop: 12 }}>
            <Typography variant="subtitle1">
              Total: {total.toFixed(2)}€
            </Typography>
          </Box>

          <Button
            variant="contained"
            className="pay-button"
            onClick={handleStripePayment}
            startIcon={<PaymentIcon />}
          >
            Payer avec Stripe
          </Button>
        </Box>
      )}

      <Button
        component={NavLink}
        to="/"
        className="back-button"
        startIcon={<ShoppingCartIcon />}
      >
        Retour à l'accueil
      </Button>
    </Box>
  );
};

export default PaymentPage;
