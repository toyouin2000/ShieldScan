import { groq } from "@/lib/groq";

export async function generateAdvice(
  issue: string
) {
  const completion =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are a senior cybersecurity consultant.

For every issue provide:

1. Potential Impact
2. Recommended Fix
3. Example Fix

Keep the response concise.
`,
        },
        {
          role: "user",
          content: issue,
        },
      ],

      temperature: 0.3,
      max_tokens: 400,
    });

  return (
    completion.choices[0]?.message
      ?.content ?? "No recommendation generated."
  );
}