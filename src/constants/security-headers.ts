export const SECURITY_HEADERS = [
  {
    key: "content-security-policy",

    title:
      "Content Security Policy",

    recommended:
      "default-src 'self'; script-src 'self'; object-src 'none';",

    severity: "high",
  },

  {
    key:
      "strict-transport-security",

    title:
      "Strict Transport Security",

    recommended:
      "max-age=63072000; includeSubDomains; preload",

    severity: "high",
  },

  {
    key:
      "x-frame-options",

    title:
      "X-Frame-Options",

    recommended:
      "DENY",

    severity: "medium",
  },

  {
    key:
      "x-content-type-options",

    title:
      "X-Content-Type-Options",

    recommended:
      "nosniff",

    severity: "medium",
  },

  {
    key:
      "referrer-policy",

    title:
      "Referrer Policy",

    recommended:
      "strict-origin-when-cross-origin",

    severity: "medium",
  },

  {
    key:
      "permissions-policy",

    title:
      "Permissions Policy",

    recommended:
      "camera=(), microphone=(), geolocation=()",

    severity: "medium",
  },
];