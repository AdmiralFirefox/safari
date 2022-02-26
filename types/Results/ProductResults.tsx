export interface ProductResults {
    data: {
      line_items: {
        data: {
          id: string;
          description: string;
          quantity: number;
          price: {
            unit_amount: number;
          };
        }[];
      };
      payment_intent: {
        status: string;
      };
    };
  }