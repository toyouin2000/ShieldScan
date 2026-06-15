import * as cheerio from "cheerio";

import {
  XSSInjectionPoint,
} from "@/types/xss";

export function discoverInjectionPoints(
  html: string,
  baseUrl: string
): XSSInjectionPoint[] {
  const points: XSSInjectionPoint[] = [];

  const $ = cheerio.load(html);

  $("form").each(
    (_, form) => {
      const action =
        $(form).attr("action") ||
        baseUrl;

      $(form)
        .find("input")
        .each(
          (_, input) => {
            const name =
              $(input).attr("name");

            if (!name) return;

            points.push({
              name,
              type: "input",
              endpoint: action,
            });
          }
        );

      $(form)
        .find("textarea")
        .each(
          (_, textarea) => {
            const name =
              $(textarea).attr("name");

            if (!name) return;

            points.push({
              name,
              type: "textarea",
              endpoint: action,
            });
          }
        );

      $(form)
        .find("select")
        .each(
          (_, select) => {
            const name =
              $(select).attr("name");

            if (!name) return;

            points.push({
              name,
              type: "select",
              endpoint: action,
            });
          }
        );
    }
  );

  // URL query params

  try {
    const url =
      new URL(baseUrl);

    url.searchParams.forEach(
      (_, key) => {
        points.push({
          name: key,
          type: "query-param",
          endpoint: baseUrl,
        });
      }
    );
  } catch {}

  const uniquePoints =
    points.filter(
      (
        point,
        index,
        self
      ) =>
        index ===
        self.findIndex(
          (p) =>
            p.name ===
              point.name &&
            p.endpoint ===
              point.endpoint
        )
    );

  return uniquePoints;
}