import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { CheckoutProduct } from "../../../types/Checkout/CheckoutProduct";
import SupportedCountries from "../../../data/supportedcountries.json";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const cart: CheckoutProduct[] = req.body;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: {
          allowed_countries:
            SupportedCountries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
        },

        //Mapping Items in the Cart
        line_items: cart.map((item) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                images: [item.image],
                name: item.title,
              },
              unit_amount: item.price * 100,
            },
            description: item.description,
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/results?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      });

      res.json({ id: session.id });
    } catch (err) {
      console.log(err);
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
