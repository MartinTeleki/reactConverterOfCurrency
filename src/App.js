import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("EUR");
  const [curr, setCurr] = useState(null);

  console.log(fromCurr);
  console.log(toCurr);
  // console.log(amount);

  useEffect(
    function () {
      async function fetchCurrency() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
          // "https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD"
        );
        const data = await res.json();

        //console.log(data);
        //console.log(data.rates.USD);
        if (fromCurr !== toCurr) {
          setCurr(data.rates[toCurr]);
          console.log(data.rates[toCurr]);
        } else {
          setCurr(amount);
        }
        //console.log(curr);
      }

      if (amount && fromCurr && toCurr) {
        fetchCurrency();
      }
    },
    [amount, fromCurr, toCurr]
  );

  return (
    <div>
      <input type="text" onChange={(e) => setAmount(+e.target.value)} />
      <select value={fromCurr} onChange={(e) => setFromCurr(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurr} onChange={(e) => setToCurr(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <p>
        {amount} {fromCurr} = {curr} {toCurr}
      </p>
    </div>
  );
}
