export const demoReport = {
  score: 86,

  findings: [
    {
      title:
        "Content Security Policy Missing",

      severity: "high",

      description:
        "Header not found. Recommended: default-src 'self'; script-src 'self'; object-src 'none';",
    },

    {
      title:
        "Weak Referrer Policy",

      severity: "low",

      description:
        "Current value is less restrictive than recommended strict-origin-when-cross-origin.",
    },

    {
      title:
        "Hardcoded API Key Detected",

      severity: "critical",

      description:
        "Potential API credential exposed inside repository source code.",
    },

    {
      title:
        "Outdated Dependency",

      severity: "medium",

      description:
        "Dependency contains known vulnerabilities and should be upgraded.",
    },

    {
      title:
        "Potential Reflected XSS",

      severity: "high",

      description:
        "User-controlled input reflected into response without proper encoding.",
    },
  ],
};