import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import ContactService from "../../services/ContactService"; // ✅ bon import

// ————————————————————————————————————————————————
// Types locaux (peuvent être importés du service si tu préfères)
// ————————————————————————————————————————————————
interface ContactRequest {
  eventDate: string; // yyyy-mm-dd
  city: string;
  venue: string; // adresse / lieu précis
  theme: string;
  colors: string; // liste libre (ex: noir, blanc, doré)
}

// Helpers
const isNonEmpty = (v: string) => v.trim().length > 0;
const isDate = (v: string) => /\d{4}-\d{2}-\d{2}/.test(v);

// ————————————————————————————————————————————————
// Component
// ————————————————————————————————————————————————
const ContactPage: React.FC = () => {
  const [form, setForm] = useState<ContactRequest>({
    eventDate: "",
    city: "",
    venue: "",
    theme: "",
    colors: "",
  });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    msg: string;
    ok?: boolean;
  }>({
    open: false,
    msg: "",
  });

  const errors = useMemo(() => {
    return {
      eventDate:
        form.eventDate && !isDate(form.eventDate)
          ? "Date invalide"
          : !isNonEmpty(form.eventDate)
          ? "Obligatoire"
          : "",
      city: !isNonEmpty(form.city) ? "Obligatoire" : "",
      venue: !isNonEmpty(form.venue) ? "Obligatoire" : "",
      theme: !isNonEmpty(form.theme) ? "Obligatoire" : "",
      colors: !isNonEmpty(form.colors) ? "Obligatoire" : "",
    } as const;
  }, [form]);

  const isValid = useMemo(
    () => Object.values(errors).every((e) => !e),
    [errors]
  );

  const onChange =
    (key: keyof ContactRequest) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || sending) return;
    try {
      setSending(true);
      localStorage.setItem("eventbyme_contact_draft", JSON.stringify(form));

      await ContactService.save(form); // ✅ méthode réelle du service

      setToast({
        open: true,
        ok: true,
        msg: "Votre demande a été envoyée avec succès.",
      });
      setForm({ eventDate: "", city: "", venue: "", theme: "", colors: "" });
    } catch (err) {
      console.error("Contact submit error:", err);
      setToast({
        open: true,
        ok: false,
        msg: "Échec de l'envoi. Réessayez dans un instant.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#FAFAF7", minHeight: "100vh", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="md">
        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: "1px solid #e6d4ad", // gold light
            background: "#fff",
          }}
        >
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4" fontWeight={900}>
              Demande de contact
            </Typography>
            <Typography color="text.secondary">
              Donnez-nous les infos clés de votre événement : nous revenons vers
              vous rapidement avec une proposition.
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Date de l'événement"
                value={form.eventDate}
                onChange={onChange("eventDate")}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
                error={!!errors.eventDate}
                helperText={errors.eventDate || ""}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Ville"
                placeholder="Ex: Lille, Genève, Paris…"
                value={form.city}
                onChange={onChange("city")}
                fullWidth
                required
                error={!!errors.city}
                helperText={errors.city || ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Lieu / Adresse"
                placeholder="Ex: Salle des fêtes, 10 rue Exemple, 59000 Lille"
                value={form.venue}
                onChange={onChange("venue")}
                fullWidth
                required
                error={!!errors.venue}
                helperText={errors.venue || ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Thème"
                placeholder="Ex: Baby shower, Mariage minimal, Anniversaire 30 ans…"
                value={form.theme}
                onChange={onChange("theme")}
                fullWidth
                required
                error={!!errors.theme}
                helperText={errors.theme || ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Couleurs (séparées par des virgules)"
                placeholder="Ex: noir, blanc, doré"
                value={form.colors}
                onChange={onChange("colors")}
                fullWidth
                required
                error={!!errors.colors}
                helperText={errors.colors || ""}
              />
            </Grid>
          </Grid>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ mt: 3 }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || sending}
              startIcon={sending ? <CircularProgress size={18} /> : undefined}
              sx={{
                bgcolor: "#C8A96A",
                color: "#0E0E0E",
                fontWeight: 800,
                ":hover": { bgcolor: "#B89358" },
              }}
            >
              {sending ? "Envoi…" : "Envoyer la demande"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() =>
                setForm({
                  eventDate: "",
                  city: "",
                  venue: "",
                  theme: "",
                  colors: "",
                })
              }
              sx={{
                borderColor: "#C8A96A",
                ":hover": {
                  borderColor: "#B89358",
                  bgcolor: "rgba(200,169,106,0.08)",
                },
              }}
            >
              Réinitialiser
            </Button>
            <Button
              component={NavLink}
              to="/"
              variant="text"
              sx={{
                color: "#0E0E0E",
                fontWeight: 700,
                ":hover": { textDecoration: "underline", color: "#B89358" },
              }}
            >
              Retour à l'accueil
            </Button>
          </Stack>
        </Paper>
      </Container>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        message={toast.msg}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: toast.ok ? "#2e7d32" : "#c62828",
            color: "white",
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
};

export default ContactPage;
