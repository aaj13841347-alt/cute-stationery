import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const TOMAN_TO_USD = 50000;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { cart, currency } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.map((item) => {
        let unitAmount;
        if (currency === 'toman') {
          const usd = item.price / TOMAN_TO_USD;
          unitAmount = Math.round(usd * 100);
        } else {
          // assume item.price is already in USD
          unitAmount = Math.round(item.price * 100);
        }
        return {
          price_data: {
            currency: 'usd',
            product_data: { name: item.name },
            unit_amount: unitAmount,
          },
          quantity: item.qty,
        };
      }),
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/success`,
      cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/cancel`,
    });
    res.status(200).json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
