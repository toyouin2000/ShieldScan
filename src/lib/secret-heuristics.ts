import { calculateEntropy }
  from "./entropy";

const SECRET_KEYWORDS = [
  "secret",
  "token",
  "password",
  "apikey",
  "api_key",
  "auth",
  "credential",
  "jwt",
  "private",
  "access",
];

export function looksLikeSecret(
  variableName: string,
  value: string
): boolean {
  const hasKeyword =
    SECRET_KEYWORDS.some(
      (keyword) =>
        variableName
          .toLowerCase()
          .includes(keyword)
    );

  const entropy =
    calculateEntropy(value);

  const highEntropy =
    entropy > 3.5;

  const longEnough =
    value.length > 16;

  return (
    hasKeyword &&
    highEntropy &&
    longEnough
  );
}