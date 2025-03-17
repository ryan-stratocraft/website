import React, { useState } from "react";
import "./DeleteData.css";

const DeleteData: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      setMessage("⚠️ Please enter both your name and email.");
      return;
    }

    const response = await fetch("/api/request-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      setMessage("✅ A confirmation email has been sent. Please check your inbox.");
      setIsSent(true);
    } else {
      setMessage("❌ Error sending request. Please try again.");
    }
  };

  return (
    <div className="delete-container">
      <h1>Request Account Deletion</h1>
      <p>Enter your details to request account deletion. You will receive an email to confirm.</p>

      {!isSent ? (
        <form onSubmit={handleSubmit}>
          <label>Name (as registered in Oh-i)</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />

          <label>Email (associated with your Oh-i account)</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <button type="submit">Request Deletion</button>
        </form>
      ) : (
        <p className="status-message">{message}</p>
      )}

      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default DeleteData;
