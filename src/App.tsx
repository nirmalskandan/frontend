import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error("Failed to fetch from backend", err);
        setMessage("Error connecting to backend");
      });
  }, []);

  return <h1>{message}</h1>;
}

export default App;
