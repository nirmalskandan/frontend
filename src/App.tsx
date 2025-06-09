import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [mongoInfo, setMongoInfo] = useState(null);

  // Check current browser path
  const path = window.location.pathname;

  useEffect(() => {
    if (path === "/") {
      // Fetch backend greeting message only on root path
      fetch("http://localhost:8000/")
        .then((res) => res.json())
        .then((data) => setMessage(data.message))
        .catch(() => setMessage("Error connecting to backend"));
    } else if (path === "/mongo-test") {
      // Fetch MongoDB info only on /mongo-test path
      fetch("http://localhost:8000/mongo-info")
        .then((res) => res.json())
        .then((data) => setMongoInfo(data))
        .catch(() => setMongoInfo({ status: "error", message: "Unable to connect" }));
    }
  }, [path]);

  if (path === "/") {
    return <h1>{message}</h1>;
  } else if (path === "/mongo-test") {
    if (!mongoInfo) return <p>Loading MongoDB info...</p>;

    return (
      <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
        <h1>MongoDB Info</h1>
        {mongoInfo.status === "connected" ? (
          <>
            <p><strong>Host:</strong> {mongoInfo.host}</p>
            <p><strong>Port:</strong> {mongoInfo.port}</p>
            <p><strong>Server Version:</strong> {mongoInfo.server_version}</p>
            <h3>Databases & Collections</h3>
            <ul>
              {mongoInfo.databases.map((db) => (
                <li key={db.name}>
                  <strong>{db.name}</strong>
                  <ul>
                    {db.collections.map((col) => (
                      <li key={col}>{col}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p style={{ color: "red" }}>{mongoInfo.message}</p>
        )}
      </div>
    );
  } else {
    return <h1>404 - Page not found</h1>;
  }
}

export default App;
