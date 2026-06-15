export function extractAssignments(
  content: string
) {
  const matches = [];

  const regex =
    /(API_KEY|SECRET_KEY|JWT_SECRET|ACCESS_TOKEN|AUTH_TOKEN|DATABASE_PASSWORD|PRIVATE_KEY|CLIENT_SECRET|PAYMENT_CREDENTIAL)\s*[:=]\s*["']?([^"'\n\r]+)["']?/gi;

  let match;

  while ((match = regex.exec(content))) {
    matches.push({
      variable: match[1],
      value: match[2],
    });
  }

  return matches;
}