export interface OrderProps {
  id: string;
  order_id?: string;
  createdAt?: {
    seconds: number;
  };
  image?: string;
  title?: string;
  description?: string;
  rating?: number;
  quantity?: number;
  price?: number;
}
