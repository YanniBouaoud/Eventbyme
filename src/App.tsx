import React, { useState } from "react";
import "./App.css";
import Footer from "./components/footer";
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/welcome";
import PaymentPage from "./pages/PaymentPage";
import { Product } from "./types";
import Success from "./pages/success";
import Panier from "./pages/Panier";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  const [cart, setCart] = useState<{ [key: string]: Product }>({});

  return (
    <div className="App">
      <div className="striped-background"></div>

      <main>
        <Routes>
          {/*  Passage des props à Welcome */}
          <Route path="/" element={<Welcome cart={cart} setCart={setCart} />} />
          <Route path="/success" element={<Success />} />{" "}
          {/*  Route correcte */}
          <Route
            path="/PaymentPage"
            element={<PaymentPage cart={cart} setCart={setCart} />}
          />
          <Route
            path="/panier"
            element={<Panier cart={cart} setCart={setCart} />}
          />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
