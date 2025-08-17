import { useEffect, useState } from "react";
import { fetchMessages, deleteMessage } from "./api.service";
import type { Message } from "./api.service";
import MessageForm from "./MessageForm";

export default function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  const handleMessageSubmitted = (newMessage: Message) => {
    setMessages([newMessage, ...messages]);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleDeleteMessage = async (messageId: number) => {
    if (!confirm("Are you sure you want to delete this message?")) {
      return;
    }

    setDeletingId(messageId);
    try {
      const response = await deleteMessage(messageId);
      if (response.success) {
        setMessages(messages.filter((message) => message.id !== messageId));
        setError("");
      } else {
        setError(response.message || "Failed to delete message");
      }
    } catch (err) {
      setError("Failed to delete message");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
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
        <h1>Guestbook</h1>
        <div className="card error">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Guestbook</h1>

      <MessageForm
        onMessageSubmitted={handleMessageSubmitted}
        onError={handleError}
      />

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
                <button
                  onClick={() => handleDeleteMessage(message.id)}
                  disabled={deletingId === message.id}
                  className="delete-button"
                  title="Delete message"
                >
                  {deletingId === message.id ? "Deleting..." : "Delete"}
                </button>
              </div>
              <div className="message-content">{message.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
