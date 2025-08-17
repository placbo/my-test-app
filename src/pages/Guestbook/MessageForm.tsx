import { useState } from 'react';
import { postMessage } from './api.service';
import type { Message, NewMessageRequest } from './api.service';

interface MessageFormProps {
  onMessageSubmitted: (newMessage: Message) => void;
  onError: (error: string) => void;
}

export default function MessageForm({ onMessageSubmitted, onError }: MessageFormProps) {
  const [formData, setFormData] = useState<NewMessageRequest>({
    text: '',
    author: '',
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.text.trim() || !formData.author.trim()) {
      return;
    }

    setSubmitting(true);
    try {
      const newMessage = await postMessage(formData);
      setFormData({ text: '', author: '' });
      onMessageSubmitted(newMessage);
      onError('');
    } catch (err) {
      onError('Failed to submit message');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
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
          {submitting ? 'Submitting...' : 'Submit Message'}
        </button>
      </form>
    </div>
  );
}
