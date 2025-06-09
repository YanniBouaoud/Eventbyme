import { Box, Typography } from "@mui/material";
import "./style.css";

const Footer = () => {
  return (
    <Box className="footer">
      <Typography variant="body2" className="footer-text">
        &copy; LiaceVoyage 2025 - Tous droits réservés{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
