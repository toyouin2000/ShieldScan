export function isVersionLower(
  current: string,
  target: string
) {
  const currentParts =
    current
      .replace(/[^0-9.]/g, "")
      .split(".")
      .map(Number);

  const targetParts =
    target
      .split(".")
      .map(Number);

  for (
    let i = 0;
    i < Math.max(
      currentParts.length,
      targetParts.length
    );
    i++
  ) {
    const a =
      currentParts[i] || 0;

    const b =
      targetParts[i] || 0;

    if (a < b) return true;
    if (a > b) return false;
  }

  return false;
}