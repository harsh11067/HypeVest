import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { buyerAddress, trancheId, amount } = req.body;
  // Proxy to relayer (or call linera CLI directly from here if you run server in WSL)
  const r = await fetch("http://localhost:3001/buy", {
    method: "POST",
    body: JSON.stringify({ buyerAddress, trancheId, amount }),
    headers: { "Content-Type": "application/json" },
  });
  const json = await r.json();
  res.status(r.status).json(json);
}
