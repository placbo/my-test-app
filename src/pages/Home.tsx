import { useEffect, useState } from "react";
import { fetchMessages } from "../api.service";
import type { Message } from "../api.service";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchMessages()
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch messages");
        setLoading(false);
        console.error(err);
      });
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div>
        <h1>Messages</h1>
        <div className="card">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Messages</h1>
        <div className="card error">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Messages</h1>
      {messages.length === 0 ? (
        <div className="card">No messages found.</div>
      ) : (
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.id} className="message-card">
              <div className="message-header">
                <span className="message-author">{message.author}</span>
                <span className="message-date">
                  {formatDate(message.created)}
                </span>
              </div>
              <div className="message-content">{message.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
