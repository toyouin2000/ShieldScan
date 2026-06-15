import puppeteer from "puppeteer";

export async function testSPAReflection(
  url: string
) {
  const findings: any[] = [];

  const payload =
    "<script>alert(1)</script>";

  let browser;

  try {
    browser =
      await puppeteer.launch({
        headless: true,
      });

    const page =
      await browser.newPage();

    await page.goto(url, {
      waitUntil:
        "networkidle2",
    });

    const inputs =
      await page.$$(
        "input"
      );

    for (const input of inputs) {
      try {
        await input.click();

        await input.type(
          payload
        );

        const content =
          await page.content();

        if (
          content.includes(
            payload
          )
        ) {
          findings.push({
            title:
              "Potential Reflected XSS",

            severity:
              "high",

            description:
              "Payload reflected into DOM.",
          });
        }
      } catch {}
    }

    return findings;
  } catch (error) {
    console.error(
      error
    );

    return findings;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}