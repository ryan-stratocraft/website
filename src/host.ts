/** Normalizes host for comparisons (drops leading `www.`). */
export function canonicalHostname(hostname: string): string {
  return hostname.replace(/^www\./i, "").toLowerCase();
}

export function isOneuraHostname(hostname: string): boolean {
  return canonicalHostname(hostname) === "oneura.app";
}
