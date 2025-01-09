import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [rates, setRates] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all available rates
  useEffect(() => {
    const fetchRates = async () => {
      const response = await fetch("/rates");
      const data = await response.json();
      setRates(data);
    };

    fetchRates();
  }, []);

  // Convert currency when amount, from, or to currency changes
  useEffect(() => {
    const convertCurrency = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/rate?from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await response.json();
        setConvertedAmount((amount * data.rate).toFixed(2));
      } catch (error) {
        console.error("Conversion error:", error);
      }
      setLoading(false);
    };

    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  // Get unique currencies from rates
  const currencies = [...new Set(rates.map((rate) => rate.from))];

  return (
    <div className="converter">
      <h1>Currency Converter</h1>
      
      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
        />
        
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        
        <span>to</span>
        
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className="result">
        {loading ? (
          <p>Converting...</p>
        ) : (
          <p>
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
