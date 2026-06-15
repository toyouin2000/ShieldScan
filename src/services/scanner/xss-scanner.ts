import axios from "axios";

import {
  discoverInjectionPoints,
} from "./xss-discovery";

import {
  scanSPAXSS,
} from "./spa-xss-scanner";

import {
  testSPAReflection,
} from "./spa-reflection";

import {
  testReflection,
} from "./xss-reflection";

export async function scanXSS(
  targetUrl: string
) {
  const findings: any[] = [];

  try {
    const page =
  await axios.get(
    targetUrl,
    {
      timeout: 10000,

      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36",

        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",

        "Accept-Language":
          "en-US,en;q=0.5",
      },
    }
  );

    const html =
      page.data;
    
    

    const points =
      discoverInjectionPoints(
        html,
        targetUrl
      );

    console.log(
      "Injection Points:",
      points
    );

    for (const point of points) {
      findings.push({
        title:
          "XSS Injection Point",

        severity: "low",

        description:
          `Type: ${point.type}
Parameter: ${point.name}
Endpoint: ${point.endpoint}`,
      });

      const endpoint =
        point.endpoint.startsWith(
          "http"
        )
          ? point.endpoint
          : new URL(
              point.endpoint,
              targetUrl
            ).toString();

      const reflected =
        await testReflection(
          endpoint,
          point.name
        );

      if (reflected) {
        findings.push({
          title:
            "Potential Reflected XSS",

          severity:
            "high",

          description:
            `Payload reflected through "${point.name}"`,
        });
      }
    }
    const spaFindings =
  await scanSPAXSS(
    targetUrl
  );

const reflectedSPA =
  await testSPAReflection(
    targetUrl
  );

    const hasCSP =
      page.headers[
        "content-security-policy"
      ];

    if (!hasCSP) {
      findings.forEach(
        (finding) => {
          if (
            finding.title ===
            "Potential Reflected XSS"
          ) {
            finding.severity =
              "critical";

            finding.description +=
              "\nMissing CSP increases exploitability.";
          }
        }
      );
    }

    return [
  ...findings,
  ...spaFindings,
  ...reflectedSPA,
];
  } catch (error: any) {
  if (
    error.response?.status === 403
  ) {
    findings.push({
      title:
        "XSS Scan Blocked",

      severity: "low",

      description:
        "Target website uses bot protection or WAF. XSS testing could not be completed.",
    });

    return findings;
  }
}
}