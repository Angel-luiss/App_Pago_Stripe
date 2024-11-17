import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch('http://localhost:5001/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount * 100 }), // Convertir a centavos
      });

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        throw new Error('No se recibió el clientSecret');
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess('Pago exitoso');
      }

    } catch (err) {
      setError(`Error en la transacción: ${err.message}`);
    }
  };

  // Estilos personalizados para el CardElement
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '18px',
        color: '#32325d',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <div style={{
      width: '400px',
      margin: '0 auto',
      border: '1px solid #ddd',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      backgroundColor: '#f9f9f9',
    }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Finalizar Compra</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>Monto a pagar:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '20px',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <CardElement options={cardElementOptions} />
        </div>

        <button
          type="submit"
          disabled={!stripe}
          style={{
            width: '100%',
            fontSize: '18px',
            backgroundColor: '#28a745',
            color: 'white',
            padding: '12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Pagar
        </button>

        {error && <div style={{ color: 'red', fontSize: '16px', marginTop: '20px', textAlign: 'center' }}>{error}</div>}
        {success && <div style={{ color: 'green', fontSize: '16px', marginTop: '20px', textAlign: 'center' }}>{success}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
