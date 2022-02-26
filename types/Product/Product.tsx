export interface Product {
  id: number;
  category: string;
  image: string;
  description: string;
  title: string;
  price: number;
  rating: {
    rate: number;
  };
  quantity?: number;
  added?: boolean;
}
