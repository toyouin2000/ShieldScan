export function calculateEntropy(str: string) {
  const map: Record<string, number> = {};

  for (const char of str) {
    map[char] = (map[char] || 0) + 1;
  }

  let entropy = 0;

  for (const char in map) {
    const p = map[char] / str.length;
    entropy -= p * Math.log2(p);
  }

  return entropy;
}

export function looksLikeSecret(
  variableName: string,
  value: string
) {
  const keywords = [
  "secret",
  "token",
  "password",
  "apikey",
  "api_key",
  "credential",
  "auth",
  "jwt",
  "private",
  "access",
  "client_secret",
  "stripe",
  "aws",
];

  const hasKeyword = keywords.some((keyword) =>
    variableName.toLowerCase().includes(keyword)
  );

  const entropy = calculateEntropy(value);

  return {
    suspicious:
      hasKeyword &&
      value.length > 20 &&
      entropy > 3.5,

    entropy,
  };
}