import React from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./style.css";

const AboutPage: React.FC = () => {
  const navigate = useNavigate(); // ✅ indispensable

  return (
    <Box className="about-container">
      {/* --- Flèche retour accueil --- */}

      <IconButton
        className="back-button"
        onClick={() => navigate("/")} // ✅ fonctionne
        aria-label="Retour à l'accueil"
      >
        <ArrowBackIcon />
      </IconButton>

      <Container maxWidth="lg">
        {/* -------- Header -------- */}
        <div className="about-header">
          <Avatar src="/logoEventbyme.png" alt="EventByMe" className="logo" />
          <Typography>
            De Lille à Bruxelles, ByMeEvents accompagne vos moments de vie avec
            des décors élégants, modernes et personnalisés.
          </Typography>
        </div>

        {/* -------- Story Blocks -------- */}
        <div className="story-block">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h5">Nos débuts</Typography>
            <Typography>
              ByMeEvents est né d’une passion pour la mise en scène et l’envie
              de transformer les célébrations en expériences uniques. Nos
              premières arches ballon ont vu le jour dans la métropole lilloise.
            </Typography>
          </motion.div>
        </div>

        <div className="story-block">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h5">Expansion</Typography>
            <Typography>
              Rapidement, nous avons étendu nos prestations en Belgique :
              Tournai, Mons, Bruxelles… chaque projet nous a permis de repousser
              nos limites créatives.
            </Typography>
          </motion.div>
        </div>

        <Divider className="about-divider" />

        {/* -------- Map Section -------- */}
        <div className="map-section">
          <Typography variant="h4">
            Présence en Hauts-de-France & Belgique
          </Typography>
          <Typography>
            Nous intervenons principalement dans la métropole lilloise, mais
            aussi à Bruxelles et ses alentours.
          </Typography>

          <div className="map-container">
            <motion.img
              src="/FREN.png"
              alt="Carte Hauts-de-France & Belgique"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            />
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default AboutPage;
