// EventByMe - Panier + Paiement Stripe
import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Snackbar,
  Divider,
} from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import { Product } from "../../types";
import { NavLink } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import "./style.css";

const stripePromise = loadStripe(
  "pk_live_51Qqw9CHD55FYDeNbST86tQdHgm9PFBeHHSe9ODtehAm1J7UqdHeLiNAvViNwuvbwT6nydjVOQ3NxInv5sET4NUCZ009Whel6Rb"
);

const Panier: React.FC<{
  cart: { [key: string]: Product };
  setCart: React.Dispatch<React.SetStateAction<{ [key: string]: Product }>>;
}> = ({ cart, setCart }) => {
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  const items = Object.values(cart);

  // log debug pour vérifier que stripePriceId est bien présent
  console.log("Panier actuel:", cart);

  const total = useMemo(
    () => items.reduce((acc, p) => acc + (p.price ?? 0), 0),
    [items]
  );

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      const removed = newCart[id];
      delete newCart[id];
      if (removed) {
        setAlertMessage(`❌ Retiré du panier: ${removed.title}`);
        setShowAlert(true);
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const handleStripePayment = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    const purchasable = items.filter((i) => !!i.stripePriceId);

    if (purchasable.length === 0) {
      alert("Aucun produit payable (stripePriceId manquant).");
      return;
    }

    const { error } = await stripe.redirectToCheckout({
      lineItems: purchasable.map((item) => ({
        price: item.stripePriceId as string,
        quantity: 1,
      })),
      mode: "payment",
      successUrl: window.location.origin + "/success",
      cancelUrl: window.location.origin + "/panier",
    });

    if (error) console.error("Erreur Stripe:", error.message);
  };

  return (
    <Box className="panier-page">
      <Box className="panier-header">
        <Typography variant="h4" fontWeight={900}>
          Votre panier
        </Typography>
        <NavLink to="/" className="back-link">
          ⬅ Retour à l’accueil
        </NavLink>
      </Box>

      {items.length === 0 ? (
        <Box className="empty-cart">
          <Typography variant="h6">Votre panier est vide 😢</Typography>
          <Button variant="contained" component={NavLink} to="/produits">
            Découvrir nos prestations
          </Button>
        </Box>
      ) : (
        <Box className="cart-content">
          {items.map((item) => (
            <Box key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-img"
              />
              <Box className="cart-item-info">
                <Typography variant="h6">{item.title}</Typography>
                <Typography className="cart-item-price">
                  {item.price}€
                </Typography>
              </Box>
              <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                <RemoveShoppingCartIcon />
              </IconButton>
            </Box>
          ))}

          <Divider className="cart-divider" />

          <Box className="cart-summary">
            <Typography variant="h6" fontWeight={700}>
              Total : {total}€
            </Typography>
            <Button
              variant="contained"
              startIcon={<PaymentIcon />}
              onClick={handleStripePayment}
              className="checkout-btn"
            >
              Payer avec Stripe
            </Button>
          </Box>
        </Box>
      )}

      <Snackbar
        open={showAlert}
        autoHideDuration={2500}
        onClose={() => setShowAlert(false)}
        message={alertMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default Panier;
