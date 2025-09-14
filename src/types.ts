export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  description?: string;
  available?: boolean; // ✅ ajouté
  stripePriceId?: string;
}
