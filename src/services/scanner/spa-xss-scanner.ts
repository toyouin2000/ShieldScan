import puppeteer from "puppeteer";

export async function scanSPAXSS(
  targetUrl: string
) {
  const findings: any[] = [];

  let browser;

  try {
    browser =
      await puppeteer.launch({
        headless: true,
      });

    const page =
      await browser.newPage();

    await page.goto(
      targetUrl,
      {
        waitUntil:
          "networkidle2",
        timeout: 30000,
      }
    );

    const inputs = await page.$$eval(
  "input, textarea, select",
  (elements) =>
    elements.map((element: any) => ({
      tag:
        element.tagName?.toLowerCase() ||
        "unknown",

      inputType:
        element.type ||
        "unknown",

      identifier:
        element.name ||
        element.id ||
        element.placeholder ||
        element.getAttribute("aria-label") ||
        element.getAttribute("data-testid") ||
        element.getAttribute("formcontrolname") ||
        element.getAttribute("ng-reflect-name") ||
        "unknown",

      placeholder:
        element.placeholder || "",

      html:
        element.outerHTML.slice(
          0,
          150
        ),
    }))
);

    console.log(
      "SPA Inputs:",
      inputs
    );

    for (const input of inputs) {
      findings.push({
        title:
          "Potential XSS Injection Point",

        severity: "low",

        description:
  `Element Type: ${input.tag}
Input Type: ${input.type}
Identifier: ${input.name}`,
      });
    }
console.log(
  "SPA Inputs Found:",
  inputs
);
    return findings;
  } catch (error) {
    console.error(
      "SPA Scanner Error",
      error
    );

    return findings;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}