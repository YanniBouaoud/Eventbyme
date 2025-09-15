import React, { useMemo, useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import TikTokIcon from "@mui/icons-material/MusicNote"; // Placeholder for TikTok
import { useNavigate, NavLink } from "react-router-dom";
import type { Product } from "../../types";

// ————————————————————————————————————————————————
// THEME CONSTANTS
// ————————————————————————————————————————————————
const GOLD = "#C8A96A"; // soft gold
const GOLD_LIGHT = "#e6d4ad";
const INK = "#0E0E0E";
const OFFWHITE = "#FAFAF7";

// ————————————————————————————————————————————————
// MOCK FEATURED ITEMS (you can replace with real data later)
// ————————————————————————————————————————————————
// en haut du fichier
type FeaturedProduct = Product & { tag?: string };

// ...
const featured: FeaturedProduct[] = [
  {
    id: "decor-baby",
    title: "Baby Shower Abeille",
    description:
      "Arche ballon, toile personnalisée, banc capitonné et décoration sur meusure.",
    price: 180,
    image: "/abeille.jpg",
    tag: "Best-seller",
    stripePriceId: "price_1S7Jk4HD55FYDeNbsoRiWHkM", // ✅ clé Stripe
  },
  {
    id: "decor-mariage",
    title: "Mariage Nude ",
    description:
      "Arche, voilage, composition floral (gypsophile), banc capitonné, table basse, tapis et décoration sur meusure.",
    price: 320,
    image: "/henna.jpg",
    tag: "Nouveau",
  },
  {
    id: "kit-photo",
    title: "Aniverssaire Rouge",
    description: "Fond noir & doré, accessoires premium, éclairage LED.",
    price: 110,
    image: "/anniv.jpeg",
  },
];

// ————————————————————————————————————————————————
// COMPONENT
// ————————————————————————————————————————————————
const Welcome: React.FC<{
  cart: { [key: string]: Product };
  setCart: React.Dispatch<React.SetStateAction<{ [key: string]: Product }>>;
}> = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const cartCount = useMemo(() => Object.keys(cart || {}).length, [cart]);

  const handleAdd = (p: Product) => {
    setCart((c) => ({ ...c, [p.id]: p }));
  };

  const handleRemove = (p: Product) => {
    setCart(({ [p.id]: _, ...rest }) => rest);
  };

  const goToShop = () => navigate("/produits");
  const goToCart = () => navigate("/panier");

  return (
    <Box sx={{ bgcolor: OFFWHITE, color: INK, minHeight: "100vh" }}>
      {/* ——— Top AppBar ——— */}
      <AppBar
        elevation={0}
        position="sticky"
        sx={{
          bgcolor: OFFWHITE,
          color: INK,
          borderBottom: `1px solid ${GOLD_LIGHT}`,
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <Avatar
              src="/logoEventbyme.png"
              alt="EventByMe"
              sx={{ width: 40, height: 40 }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, letterSpacing: 0.5 }}
            >
              EventByMe
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }} />

          {/* Nav */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Button
              color="inherit"
              component={NavLink}
              to="/"
              sx={{ fontWeight: 600 }}
            >
              Accueil
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/produits"
              sx={{ fontWeight: 600 }}
            >
              Prestations
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/a-propos"
              sx={{ fontWeight: 600 }}
            >
              À propos
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/contact"
              sx={{ fontWeight: 600 }}
            >
              Contact
            </Button>
          </Stack>

          {/* Search */}
          <IconButton
            aria-label="search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <SearchIcon />
          </IconButton>

          {/* Cart */}
          <IconButton aria-label="open cart" onClick={goToCart}>
            <Badge badgeContent={cartCount} color="warning">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>

        {searchOpen && (
          <Toolbar
            sx={{
              py: 1,
              bgcolor: "#fff",
              borderTop: `1px solid ${GOLD_LIGHT}`,
            }}
          >
            <Container maxWidth="lg" sx={{ px: 0 }}>
              <Paper
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(`/produits?search=${encodeURIComponent(query)}`);
                }}
                sx={{
                  p: "2px 8px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 2,
                  border: `1px solid ${GOLD_LIGHT}`,
                }}
              >
                <SearchIcon />
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Rechercher un décor, un kit, un thème…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: GOLD, ":hover": { bgcolor: "#B89358" } }}
                >
                  Rechercher
                </Button>
              </Paper>
            </Container>
          </Toolbar>
        )}
      </AppBar>

      {/* ——— Hero ——— */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          bgcolor: INK,
          color: "white",
        }}
      >
        <Box
          component="img"
          src="/Blackos.png"
          alt="Décor hero"
          sx={{
            width: "100%",
            maxHeight: { xs: 420, md: 560 },
            objectFit: "cover",
            opacity: 0.5,
            filter: "grayscale(20%)",
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center", px: 2 }}>
            <Chip
              label="Élégance Noir • Blanc • Doré"
              sx={{
                bgcolor: "rgba(200,169,106,0.2)",
                color: GOLD,
                fontWeight: 700,
                mb: 2,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: 0.3,
                fontSize: { xs: 36, md: 56 },
              }}
            >
              Donnez du style à vos événements
            </Typography>
            <Typography
              sx={{ opacity: 0.9, mt: 1, fontSize: { xs: 14, md: 18 } }}
            >
              Décors photo premium, kits prêts-à-installer et accompagnement
              sur-mesure.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              justifyContent="center"
              sx={{ mt: 3 }}
            >
              <Button
                size="large"
                variant="contained"
                onClick={goToShop}
                sx={{
                  bgcolor: GOLD,
                  color: INK,
                  fontWeight: 800,
                  ":hover": { bgcolor: "#B89358" },
                }}
              >
                Découvrir les prestations
              </Button>
              <Button
                size="large"
                variant="outlined"
                onClick={() => navigate("/contact")}
                sx={{
                  borderColor: GOLD,
                  color: "white",
                  fontWeight: 700,
                  ":hover": {
                    borderColor: "#B89358",
                    bgcolor: "rgba(200,169,106,0.1)",
                  },
                }}
              >
                Demander un devis
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* ——— Trust bar / socials ——— */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              src="/logoEventbyme.png"
              alt="EventByMe"
              sx={{ bgcolor: "transparent" }}
            />
            <Typography fontWeight={700}>
              Qualité artisanale & finition premium
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton
              component="a"
              href="https://www.instagram.com/bymeevents_"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              sx={{ border: `1px solid ${GOLD_LIGHT}` }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.tiktok.com/@myevents59"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              sx={{ border: `1px solid ${GOLD_LIGHT}` }}
            >
              <TikTokIcon />
            </IconButton>
            <IconButton
              component="a"
              href="mailto:contact@eventbyme.fr"
              aria-label="Email"
              sx={{ border: `1px solid ${GOLD_LIGHT}` }}
            >
              <EmailIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>

      <Divider sx={{ borderColor: GOLD_LIGHT }} />

      {/* ——— Featured products ——— */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={900}>
            Sélection du moment
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Des décors prêts, pensés pour être installés rapidement, avec un
            rendu professionnel.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {featured.map((p) => {
            const inCart = !!cart?.[p.id];
            return (
              <Grid item xs={12} sm={6} md={4} key={p.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                    border: `1px solid ${GOLD_LIGHT}`,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="400"
                    image={p.image}
                    alt={p.title}
                    sx={{ objectFit: "cover", filter: "saturate(0.95)" }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ mb: 1 }}
                    >
                      <Typography variant="h6" fontWeight={800}>
                        {p.title}
                      </Typography>
                      {p.tag && (
                        <Chip
                          size="small"
                          label={p.tag}
                          sx={{ bgcolor: GOLD, color: INK, fontWeight: 800 }}
                        />
                      )}
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {p.description}
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="baseline"
                      spacing={1}
                      sx={{ mt: 2 }}
                    >
                      <Typography variant="h5" fontWeight={900}>
                        {p.price}€
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        / location
                      </Typography>
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                    {!inCart ? (
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleAdd(p)}
                        sx={{
                          bgcolor: GOLD,
                          color: INK,
                          fontWeight: 800,
                          ":hover": { bgcolor: "#B89358" },
                        }}
                      >
                        Ajouter au panier
                      </Button>
                    ) : (
                      <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => handleRemove(p)}
                          sx={{
                            borderColor: GOLD,
                            color: INK,
                            fontWeight: 800,
                            ":hover": {
                              borderColor: "#B89358",
                              bgcolor: "rgba(200,169,106,0.08)",
                            },
                          }}
                        >
                          Retirer
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={goToCart}
                          sx={{
                            bgcolor: INK,
                            color: "white",
                            fontWeight: 800,
                            ":hover": { bgcolor: "#1a1a1a" },
                          }}
                        >
                          Voir le panier
                        </Button>
                      </Stack>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* ——— Value props ——— */}
      <Box sx={{ bgcolor: INK, color: OFFWHITE, py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {[
              {
                title: "Installation rapide",
                text: "Kits pensés pour être montés en 30–60 minutes avec notice simple.",
              },
              {
                title: "Rendu premium",
                text: "Sélection de matériaux haut de gamme et palette noir/blanc/doré.",
              },
              {
                title: "Personnalisation",
                text: "Néons, impressions et panneaux à votre nom, sur devis.",
              },
            ].map((v) => (
              <Grid item xs={12} md={4} key={v.title}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "80%",
                    bgcolor: "rgba(255,255,255,0.04)",
                    border: `1px solid ${GOLD_LIGHT}`,
                    borderRadius: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={800}
                    sx={{ mb: 1, color: GOLD }}
                  >
                    {v.title}
                  </Typography>
                  <Typography color="rgba(255,255,255,0.85)">
                    {v.text}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ——— Callout banner ——— */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: `1px solid ${GOLD_LIGHT}`,
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <Avatar
            src="/logoEventbyme.png"
            alt="EventByMe"
            sx={{ width: 64, height: 64 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={900}>
              Besoin d'un décor sur-mesure ?
            </Typography>
            <Typography color="text.secondary">
              Parlez-nous de votre événement : thème, couleurs, budget. On
              s'occupe du reste.
            </Typography>
          </Box>
          <Button
            size="large"
            variant="contained"
            onClick={() => navigate("/contact")}
            sx={{
              bgcolor: GOLD,
              color: INK,
              fontWeight: 800,
              ":hover": { bgcolor: "#B89358" },
            }}
          >
            Demander un devis
          </Button>
        </Paper>
      </Container>

      {/* ——— Footer ——— */}
      <Box
        component="footer"
        sx={{
          bgcolor: INK,
          color: OFFWHITE,
          pt: 6,
          pb: 4,
          mt: 4,
          borderTop: `1px solid ${GOLD_LIGHT}`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Stack spacing={1}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar src="/logoEventbyme.png" alt="EventByMe" />
                  <Typography variant="h6" fontWeight={900}>
                    EventByMe
                  </Typography>
                </Box>
                <Typography color="rgba(255,255,255,0.75)">
                  Décors photo élégants et kits événementiels, conçus pour un
                  montage rapide et un rendu haut de gamme.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={3}>
              <Stack spacing={1}>
                <Typography fontWeight={800} sx={{ color: GOLD }}>
                  Liens
                </Typography>
                <Button color="inherit" component={NavLink} to="/produits">
                  Prestations
                </Button>
                <Button color="inherit" component={NavLink} to="/a-propos">
                  À propos
                </Button>
                <Button color="inherit" component={NavLink} to="/ContactPage">
                  Contact
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={6} md={4}>
              <Stack spacing={1}>
                <Typography fontWeight={800} sx={{ color: GOLD }}>
                  Contact
                </Typography>
                <Button
                  color="inherit"
                  component="a"
                  href="mailto:contact@eventbyme.fr"
                  sx={{
                    border: `1px solid ${GOLD_LIGHT}`,
                    color: GOLD_LIGHT,
                    "&:hover": { backgroundColor: "rgba(200,169,106,0.08)" },
                  }}
                >
                  contact@eventbyme.fr
                </Button>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    component="a"
                    href="https://www.instagram.com/bymeevents_"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    sx={{
                      border: `1px solid ${GOLD_LIGHT}`,
                      color: GOLD_LIGHT,
                      "&:hover": { backgroundColor: "rgba(200,169,106,0.08)" },
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://www.tiktok.com/@myevents59"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="TikTok"
                    sx={{
                      border: `1px solid ${GOLD_LIGHT}`,
                      color: GOLD_LIGHT, // ✅ donne la couleur aux icônes (currentColor)
                      "&:hover": { backgroundColor: "rgba(200,169,106,0.08)" },
                    }}
                  >
                    <TikTokIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.12)" }} />
          <Typography variant="caption" color="rgba(255,255,255,0.6)">
            © {new Date().getFullYear()} EventByMe — Tous droits réservés.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Welcome;
