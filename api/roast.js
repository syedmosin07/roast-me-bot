// api/roast.js — Vercel Serverless Function
// Uses Groq FREE API — fast and completely free!

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  // Groq API key — stored safely in Vercel environment variables
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured. Please set GROQ_API_KEY in Vercel environment variables." });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "Groq API error" });
    }

    const text = data.choices?.[0]?.message?.content || "Even the roast bot is speechless. 💀";
    return res.status(200).json({ roast: text });

  } catch (error) {
    console.error("Roast API error:", error);
    return res.status(500).json({ error: "Server error. Try again!" });
  }
}
