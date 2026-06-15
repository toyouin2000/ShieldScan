export const SECRET_PATTERNS = [
  {
    name: "GitHub Token",
    regex: /ghp_[A-Za-z0-9]{20,}/g,
  },

  {
    name: "GitHub Fine Grained Token",
    regex: /github_pat_[A-Za-z0-9_]+/g,
  },

  {
    name: "Stripe Secret",
    regex: /sk_live_[A-Za-z0-9]+/g,
  },

  {
    name: "AWS Access Key",
    regex: /AKIA[0-9A-Z]{16}/g,
  },

  {
    name: "OpenAI Key",
    regex: /sk-[A-Za-z0-9]{20,}/g,
  },

  {
    name: "JWT Secret",
    regex: /jwt[_-]?secret/gi,
  },

  {
    name: "Access Token",
    regex: /access[_-]?token/gi,
  },
];