const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// Verificar que la clave secreta de Stripe se está cargando correctamente
console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);


app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    // Verificar que el PaymentIntent se creó correctamente
    console.log('PaymentIntent creado:', paymentIntent);

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creando el PaymentIntent:', error.message);
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});




///Backend iniciar con node server.js

///Frontend iniciar con npm npm start

// Abrir Stripe para ver si llegar los datos de la insert con el Frontend