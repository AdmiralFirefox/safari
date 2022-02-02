export interface SearchProductProps {
  searchProducts: {
    id: number;
    category: string;
    image: string;
    title: string;
    price: number;
    rating: {
      rate: number;
    };
  }[];
}
