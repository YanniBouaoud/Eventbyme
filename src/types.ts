export interface Product {
  name: string;
  image: string;
  stripePriceId: string;
  available?: boolean;
  price: number; // ✅ Ajout de la propriété price
}
