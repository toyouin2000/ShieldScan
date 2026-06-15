import { groq } from "@/lib/groq";

type Dependency = {
  name: string;
  version: string;
};

export async function reviewDependencies(
  dependencies: Dependency[]
) {
  try {
    const prompt = `
You are a software supply-chain security expert.

Analyze the following dependencies.

For each dependency:

1. Determine if it appears outdated.
2. Identify known security concerns.
3. Assign severity:
   critical | high | medium | low
4. Recommend an upgrade.

Only include dependencies that have meaningful risk.

Return ONLY valid JSON.

Format:

{
  "dependencies": [
    {
      "package": "axios",
      "severity": "high",
      "reason": "Older versions have known security issues.",
      "recommendation": "Upgrade to latest stable version."
    }
  ]
}

Dependencies:

${JSON.stringify(
  dependencies,
  null,
  2
)}
`;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.1,
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    return completion.choices[0]
      ?.message?.content;
  } catch (error) {
    console.error(
      "Dependency Review Error",
      error
    );

    return null;
  }
}