import { NextResponse } from "next/server";

const MODAL_URL = process.env.MODAL_TRANSLATE_URL; // set in Vercel env vars

// Simple in-memory rate limiter: 20 requests per IP per minute
const rateMap = new Map();
const RATE_LIMIT = 20;
const WINDOW_MS  = 60_000;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) {
    rateMap.set(ip, { count: 1, start: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  rateMap.set(ip, entry);
  return true;
}

export async function POST(request) {
  if (!MODAL_URL) {
    return NextResponse.json({ error: "Translator not configured" }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const text = (body?.text ?? "").trim();
  if (!text) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }
  if (text.length > 500) {
    return NextResponse.json({ error: "text too long (max 500 chars)" }, { status: 400 });
  }

  const method     = body.method === "greedy" ? "greedy" : "beam";
  const beam_width = Math.min(Math.max(parseInt(body.beam_width) || 5, 1), 10);

  try {
    const upstream = await fetch(`${MODAL_URL}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, method, beam_width }),
      signal: AbortSignal.timeout(30_000),
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      return NextResponse.json({ error: data.error ?? "Translation failed" }, { status: 502 });
    }
    return NextResponse.json(data);
  } catch (err) {
    const isTimeout = err.name === "TimeoutError";
    return NextResponse.json(
      { error: isTimeout ? "Request timed out" : "Translation service unavailable" },
      { status: isTimeout ? 504 : 502 }
    );
  }
}
