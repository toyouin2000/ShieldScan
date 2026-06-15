import {
  SECURITY_HEADERS,
} from "@/constants/security-headers";

export async function scanHeaders(
  headers: any
) {
  const findings = [];

  for (const rule of SECURITY_HEADERS) {
    const value =
      headers[rule.key];

    // Missing Header

    if (!value) {
      findings.push({
        title:
          `${rule.title} Missing`,

        severity:
          rule.severity,

        description:
          `Header not found.

Recommended:
${rule.recommended}`,
      });

      continue;
    }

    // Weak CSP

    if (
      rule.key ===
        "content-security-policy" &&
      !value.includes(
        "default-src"
      )
    ) {
      findings.push({
        title:
          "Weak Content Security Policy",

        severity: "medium",

        description:
          `Current Value:

${value}

Recommended:

${rule.recommended}`,
      });
    }

    // Weak HSTS

    if (
      rule.key ===
      "strict-transport-security"
    ) {
      if (
        !value.includes(
          "includeSubDomains"
        )
      ) {
        findings.push({
          title:
            "Weak HSTS Configuration",

          severity: "medium",

          description:
            `Current Value:

${value}

Missing:
includeSubDomains`,
        });
      }
    }

    // Weak X-Frame

    if (
      rule.key ===
        "x-frame-options" &&
      ![
        "DENY",
        "SAMEORIGIN",
      ].includes(
        value.toUpperCase()
      )
    ) {
      findings.push({
        title:
          "Weak X-Frame-Options",

        severity: "medium",

        description:
          `Current Value:

${value}`,
      });
    }

    // Weak X-Content-Type

    if (
      rule.key ===
        "x-content-type-options" &&
      value.toLowerCase() !==
        "nosniff"
    ) {
      findings.push({
        title:
          "Weak X-Content-Type-Options",

        severity: "medium",

        description:
          `Current Value:

${value}`,
      });
    }

    // Referrer Policy

    if (
      rule.key ===
        "referrer-policy" &&
      value !==
        "strict-origin-when-cross-origin"
    ) {
      findings.push({
        title:
          "Weak Referrer Policy",

        severity: "low",

        description:
          `Current Value:

${value}`,
      });
    }

    // Permissions Policy

    if (
      rule.key ===
        "permissions-policy" &&
      value.length < 10
    ) {
      findings.push({
        title:
          "Weak Permissions Policy",

        severity: "low",

        description:
          `Current Value:

${value}`,
      });
    }
  }

  return findings;
}