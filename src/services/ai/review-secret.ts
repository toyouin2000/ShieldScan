import { groq } from "@/lib/groq";

export async function reviewSecret(
  variableName: string,
  value: string
) {
  try {
    const prompt = `
You are a cybersecurity analyst.

Variable Name:
${variableName}

Value:
${value}

Determine:

1. Is this likely a secret?
2. Why?
3. Severity:
   Critical / High / Medium / Low

Return JSON only:

{
  "isSecret": true,
  "reason": "...",
  "severity": "critical"
}
`;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.1,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    return completion.choices[0]?.message?.content;
  } catch {
    return null;
  }
}