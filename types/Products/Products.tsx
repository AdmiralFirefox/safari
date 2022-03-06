export interface ProductsProps {
  products: {
    id: number;
    category: string;
    description: string;
    image: string;
    title: string;
    price: number;
    rating: {
      rate: number;
    };
  }[];
}
