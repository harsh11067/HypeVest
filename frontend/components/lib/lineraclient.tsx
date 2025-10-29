// frontend/src/lib/lineraclient.tsx
const RELAYER_URL = process.env.NEXT_PUBLIC_RELAYER_URL || 'http://localhost:3001';

export async function callRelayerBuy(buyerAddress: string, trancheId: string, amount: string) {
  const res = await fetch("/api/buy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ buyerAddress, trancheId, amount }),
  });
  return res.json();
}

export async function uploadAttestation(creatorAddress: string, report: object, signature: string) {
  const res = await fetch(`${RELAYER_URL}/attestation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ creatorAddress, revenueReport: report, signature }),
  });
  return res.json();
}

export async function registerCreator(creatorAddress: string, channelId: string, bondTranches: string[] = []) {
  const res = await fetch(`${RELAYER_URL}/register-creator`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ creatorAddress, channelId, bondTranches }),
  });
  return res.json();
}

export async function getCreatorAnalytics(creatorAddress: string) {
  const res = await fetch(`${RELAYER_URL}/analytics/${creatorAddress}`);
  return res.json();
}

export async function getBondTranches() {
  const res = await fetch(`${RELAYER_URL}/tranches`);
  return res.json();
}

export async function getRelayerHealth() {
  const res = await fetch(`${RELAYER_URL}/health`);
  return res.json();
}
