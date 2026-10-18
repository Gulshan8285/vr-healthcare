// Lightweight in-memory rate limiter for public forms
const ipSubmissions = new Map<string, { count: number; firstSeen: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 5; // Max 5 submissions per minute per IP

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = ipSubmissions.get(ip);

  // Periodically clean up old entries
  if (ipSubmissions.size > 1000) {
    for (const [key, val] of ipSubmissions.entries()) {
      if (now - val.firstSeen > WINDOW_MS) {
        ipSubmissions.delete(key);
      }
    }
  }

  if (!record || now - record.firstSeen > WINDOW_MS) {
    ipSubmissions.set(ip, { count: 1, firstSeen: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}
