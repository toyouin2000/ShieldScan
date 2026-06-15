export function classifyInput(
  identifier: string,
  type: string,
  placeholder: string
) {
  const text =
    `${identifier} ${placeholder}`
      .toLowerCase();

  if (
    text.includes("search")
  ) {
    return {
      title:
        "Search Input Detected",

      severity: "low",

      description:
        "User-controlled search field may become a reflected XSS injection point.",
    };
  }

  if (
    text.includes("comment") ||
    text.includes("review") ||
    text.includes("feedback")
  ) {
    return {
      title:
        "User Content Field Detected",

      severity: "medium",

      description:
        "User-generated content field may be vulnerable to stored XSS if output encoding is missing.",
    };
  }

  if (
    text.includes("message")
  ) {
    return {
      title:
        "Message Input Detected",

      severity: "medium",

      description:
        "User-controlled message content could introduce XSS payloads.",
    };
  }

  if (
    text.includes("email") ||
    text.includes("username")
  ) {
    return {
      title:
        "Authentication Input Detected",

      severity: "low",

      description:
        "User-controlled authentication field discovered.",
    };
  }

  return {
    title:
      "Potential XSS Injection Point",

    severity: "low",

    description:
      "User-controlled input detected.",
  };
}