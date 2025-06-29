import { useEffect, useState } from "react";
import { fetchMessages, postMessage } from "../api.service";
import type { Message, NewMessageRequest } from "../api.service";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<NewMessageRequest>({
    text: "",
    author: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.text.trim() || !formData.author.trim()) {
      return;
    }

    setSubmitting(true);
    try {
      const newMessage = await postMessage(formData);
      setMessages([newMessage, ...messages]);
      setFormData({ text: "", author: "" });
      setError("");
    } catch (err) {
      setError("Failed to submit message");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      <h1>Welcome, Karl</h1>

      <div className="form-container">
        <h2>Share your thoughts below.</h2>

        <form onSubmit={handleFormSubmit} className="message-form">
          <div className="form-group">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Message:</label>
            <textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="Enter your message"
              rows={3}
              required
            />
          </div>
          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Message"}
          </button>
        </form>
      </div>
      <h2>Messages</h2>
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
