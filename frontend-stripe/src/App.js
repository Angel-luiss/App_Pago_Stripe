// App.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

//const stripePromise = loadStripe('TU_CLAVE_PUBLICA_DE_STRIPE');
const stripePromise = loadStripe('pk_test_51Q9bRqCcZeSxaQ9UiuoQbk4xh2YgQKIncLspAH7gZPF0Pu2dLW7uNDs6cBZdqeh0h89GfRDwKaEDl7Jol3LFdVPN00TwWOaUAK');


const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default App;
