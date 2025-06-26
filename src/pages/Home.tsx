import { useEffect, useState } from "react";
import { fetchMessage } from "../api.service";

export default function Home() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetchMessage().then(setMessage);
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <div className="card">Message from API: {message}</div>
    </div>
  );
}
