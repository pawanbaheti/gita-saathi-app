import { useState } from "react";

const WORKER_URL = "https://gita-ai.pawanbaheti1000.workers.dev";

type Msg = { role: "user" | "ai"; text: string };

export default function AskGita() {
  const [q, setQ] = useState<string>("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function send() {
    const question = q.trim();
    if (!question || loading) return;

    setMsgs((prev) => [...prev, { role: "user", text: question }]);
    setQ("");
    setLoading(true);

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMsgs((prev) => [...prev, { role: "ai", text: String(data.answer) }]);
    } catch {
      setMsgs((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong. Please try again." },
      ]);
    }

    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h2>Ask Gita Saathi</h2>

      <div style={{ minHeight: 200 }}>
        {msgs.map((m, i) => (
          <p
            key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              whiteSpace: "pre-wrap",
            }}
          >
            <b>{m.role === "user" ? "You" : "Saathi"}:</b> {m.text}
          </p>
        ))}
        {loading && <p>Thinking...</p>}
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") send();
        }}
        placeholder="Ask about the Gita..."
        style={{ width: "75%", padding: 8 }}
      />
      <button
        onClick={send}
        disabled={loading}
        style={{ padding: 8, marginLeft: 8 }}
      >
        Ask
      </button>
    </div>
  );
}
