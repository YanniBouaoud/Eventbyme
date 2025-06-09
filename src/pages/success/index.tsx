import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./style.css";

const Success = () => {
  useEffect(() => {
    // ✅ Déclenche automatiquement le téléchargement du PDF après paiement réussi
    const downloadEbook = () => {
      const link = document.createElement("a");
      link.href = "/ebooks/Ebook Albanie liacevoyage.pdf"; // ✅ Remplace avec le chemin de ton eBook
      link.download = "Ebook Albanie liacevoyage.pdf"; // ✅ Nom du fichier PDF
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    downloadEbook();
  }, []);

  return (
    <Box className="success-page">
      <Typography variant="h4" className="success-title">
        🎉 Paiement validé !
      </Typography>
      <Typography variant="h6" className="success-message">
        Merci pour votre achat ! Votre guide a été téléchargé automatiquement.
        Si le téléchargement ne démarre pas,{" "}
        <a href="/ebooks/guide-de-voyage.pdf" download>
          cliquez ici
        </a>
        .
      </Typography>
      <Button component={NavLink} to="/" className="back-button">
        Retour à l'accueil
      </Button>
    </Box>
  );
};

export default Success;
