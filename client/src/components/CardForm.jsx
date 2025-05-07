import React, { useState, useEffect } from 'react';

const SuccessPopup = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // авто-закрытие через 3 секунды
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-bounce-in">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-green-700">Успешно отправлено!</h2>
      </div>
    </div>
  );
};

const CardForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [status, setStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/submit-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card_number: cardNumber, cvv, expiry }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Что-то пошло не так');
      }

      setStatus(`✅ ${result.status}`);
      setShowPopup(true);
      setCardNumber('');
      setCvv('');
      setExpiry('');
    } catch (error) {
      setStatus(`❌ ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg p-8 rounded-xl max-w-md w-full space-y-4"
    >
      <h2 className="text-2xl font-bold text-purple-700 text-center">Введите данные карты</h2>

      <input
        type="text"
        placeholder="Номер карты"
        minLength={16}
        maxLength={16}
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <div className="flex gap-4">
        <input
          type="password"
          placeholder="CVV"
          value={cvv}
          minLength={3}
          maxLength={3}
          onChange={(e) => setCvv(e.target.value)}
          className="w-1/2 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="w-1/2 p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white font-semibold py-2 rounded hover:bg-purple-700"
      >
        Отправить
      </button>

      {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} />}
    </form>
  );
};

export default CardForm;
