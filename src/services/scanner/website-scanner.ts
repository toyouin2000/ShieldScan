import axios from "axios";
import { scanXSS } from "./xss-scanner";
import { scanHeaders } from "./header-scanner";
import { scanSSL } from "./ssl-scanner"; 
import { ScanResult, Finding } from "@/types/scan";

export async function scanWebsite(
  url: string
): Promise<ScanResult> {
  try {
    const response = await axios.head(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 ShieldScan Security Scanner",
      },
      validateStatus: () => true,
    });

    // console.log(
    //   "Headers:",
    //   JSON.stringify(response.headers, null, 2)
    // );

    const headerFindings =
      await scanHeaders(
        response.headers as Record<string, string>
      );


    const sslFindings =
      await scanSSL(url);
    const xssFindings =
    await scanXSS(url);

    const findings: Finding[] = [
      ...headerFindings,
      ...sslFindings,
        ...(xssFindings || []),
    ];

    let score = 100;
    // const xssFindings =
    // await scanXSS(url);
    findings.forEach((finding) => {
      switch (finding.severity) {
        case "critical":
          score -= 25;
          break;

        case "high":
          score -= 10;
          break;

        case "medium":
          score -= 5;
          break;

        case "low":
          score -= 2;
          break;
      }
    });

    score = Math.max(score, 0);

    return {
      score,
      findings,
    };
  } catch (error: any) {
    console.error(
      "Website Scan Error:",
      error?.message
    );

    return {
      score: 0,
      findings: [
        {
          title: "Site Unreachable",
          severity: "high",
          description:
            error?.message ||
            "Unable to connect to target website.",
        },
      ],
    };
  }
}