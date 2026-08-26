import "dotenv/config";
import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

const app = express();
app.use(cors());
app.use(express.json());

// Reads the secret key from the ANTHROPIC_API_KEY environment variable —
// never hardcode it here, that's the whole point of this server existing.
const client = new Anthropic();

const CheckFitResult = z.object({
  matches: z
    .boolean()
    .describe("false if the posting clashes with a must-have, true otherwise"),
  reason: z.string().describe("one plain-language sentence explaining the decision"),
  quote: z
    .string()
    .nullable()
    .describe(
      "the exact sentence from the job posting that caused a mismatch, or null if there's no clash",
    ),
});

app.post("/api/check-fit", async (req, res) => {
  const { jobPosting, mustHaves } = req.body as {
    jobPosting?: string;
    mustHaves?: string[];
  };

  if (!jobPosting || !mustHaves || mustHaves.length === 0) {
    res.status(400).json({ error: "jobPosting and mustHaves are required" });
    return;
  }

  try {
    const response = await client.messages.parse({
      model: "claude-opus-5",
      max_tokens: 1024,
      output_config: {
        effort: "low",
        format: zodOutputFormat(CheckFitResult),
      },
      system:
        "You check whether a job posting clashes with a job seeker's stated must-haves " +
        "(e.g. languages spoken). Only flag a clash if the posting explicitly states a hard " +
        "requirement that conflicts with a must-have — never guess or infer a requirement " +
        "that isn't actually written in the posting.",
      messages: [
        {
          role: "user",
          content: `Must-haves: ${mustHaves.join(", ")}\n\nJob posting:\n${jobPosting}`,
        },
      ],
    });

    res.json(response.parsed_output);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong checking this job posting." });
  }
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`job-tools backend running on http://localhost:${PORT}`);
});
