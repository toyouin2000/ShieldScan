export interface XSSInjectionPoint {
  name: string;
  type:
    | "input"
    | "textarea"
    | "select"
    | "query-param";

  endpoint: string;
}