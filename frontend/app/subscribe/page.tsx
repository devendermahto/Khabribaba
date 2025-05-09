"use client";
import React, { useState } from "react";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | string>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    setStatus(res.ok ? "Subscribed!" : "Error subscribing.");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h2>
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="Your email"
      />
      <button type="submit" className="btn btn-primary w-full">Subscribe</button>
      {status && <div className="mt-2 text-center">{status}</div>}
    </form>
  );
} 