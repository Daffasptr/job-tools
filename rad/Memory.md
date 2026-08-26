---
title: Rad's Memory
tags:
  - agent
  - memory
  - job-tools
---

# Rad's Memory

Stage history and the plan for job-tools. See [[Identity]] for who Rad is and how this file gets used.

## Project

job-tools — AI tools for job seekers. React 19 + TypeScript + Vite, no backend yet.

## About the user

- **Important external deadline (added 2026-08-25):** the user's Dutch visa ends **October 2, 2026** (~5 weeks out) — he's a recent Fontys graduate job-hunting/deciding next steps under real time pressure. Full detail lives in [[Skepticola]]'s memory, which is where that tension gets actively worked through. Rad should stay aware this exists: the "start small, be consistent, don't rush" pacing below was set before this deadline was on record, and it's worth a beat of judgment (not silent override) if a coding session is about to sink real time into job-tools that the visa timeline can't actually afford.

- **No software development background.** Explain things in plain, non-technical language — analogies over jargon. See [[Identity]] → "Voice" and "Teaching before doing" for how this shapes Rad's behavior day to day.
- **Deliberately building slowly and step by step** — their own framing: "plant a seed and grow it, step by step, to be a beautiful big tree." They said it explicitly: start small, be consistent, don't rush. Rad should not push for big leaps or scope jumps just because they'd be technically efficient.
- **Long-term goal: turn job-tools into a side hustle that makes money later.** Not the immediate priority (learning + steady progress comes first), but worth keeping in mind when a design choice has real cost/monetization implications down the line.
- **Wants to actually understand what's being built**, not just have Rad do it for them — hence the "explain it back in your own words" rule in [[Identity]].

## Stage 2 (started 2026-08-25)

First real AI feature, scope locked in: paste a job posting + your must-haves (e.g. languages spoken) → get a yes/no on whether the posting clashes with a must-have, plus the exact quoted line that decided it. No saved profile/accounts yet — just this one check.

**Built so far:**
- `job-tools/server/` — a small standalone Node.js/TypeScript backend (Express), separate from the React frontend. Holds the Anthropic API key server-side so it's never exposed to the browser (this was the "why can't the key live in the browser" lesson from earlier).
- One endpoint, `POST /api/check-fit`, takes `{ jobPosting, mustHaves }`, calls Claude (`claude-opus-5`, structured output via a Zod schema — `client.messages.parse()`) with a strict instruction to only flag a clash the posting actually states, never to infer one. Returns `{ matches, reason, quote }`.
- Type-checked clean (`npx tsc --noEmit`) and boot/validation-tested (server starts, rejects a request missing `jobPosting`/`mustHaves` with a 400) — not yet tested against a real API key or wired to the frontend.
- `.env.example` added; real `.env` (and `server/.env`) added to `.gitignore` so the key never gets committed.

**Update, same day:** user bought Anthropic API credits and saved a real key. Server was started and live-tested with two real job postings — both correct, including telling apart a hard language requirement from an optional one. Backend is confirmed working end-to-end against the real API.

**Not done yet:** there's still no way to use this from the actual website — no form, no button, just the backend endpoint itself. That's the one remaining piece to call stage 2 fully done.

## Stage 1 (completed 2026-08-24)

- Scaffolded from the standard Vite React-TS template (2026-08-20), unmodified except for one custom component.
- Built a basic **Job Application Tracker** in `src/App.tsx`: client-side only, `useState` list of `{company, role}`, add via two text inputs and a button. No persistence — state resets on refresh. No styling beyond the template default.
- No backend, no API integration, and no actual AI feature yet — the "AI" in job-tools hasn't been built. This is plumbing, not product.
- No git repo initialized in this folder yet.

## Plan for upcoming stages

**First feature direction — confirmed by the user on 2026-08-24, not yet designed in detail:**

A job-matching / filtering tool. Not a chatbot that freely guesses whether a job "seems like a fit" — a system that pulls concrete, checkable requirements out of a job posting and matches them precisely against the job seeker's actual profile. Two layers, in the user's own framing:

1. **Hard filtering** (facts) — things a job posting states plainly, like required languages, that should be checked like a checklist, not guessed at. This is the core differentiator: the user has personally been shown jobs requiring Dutch when they only speak **English and Indonesian** — existing AI job tools hallucinated a match that a simple, literal check would have caught. Rad must treat "don't hallucinate the filter" as a hard requirement, especially for language.
2. **Soft matching** (values/fit) — matching the job seeker's own values against what the company says it needs/culture — softer and more interpretive than the hard filtering layer, and will need a different approach than the checklist-style hard filter.

**Product vision, in the user's own words (2026-08-25):** "think about it like dating apps — if you find a partner right away, it will be nice to spend time and effort because you are sure about the right one. It saves time and energy, instead of having a lot of options and get drained or overwhelmed." The goal isn't a long list of maybe-fits — it's a short list the job seeker actually trusts, so they spend their limited time/energy on applications worth it. Success looks like *fewer, higher-confidence matches*, not more results. This is the same instinct behind the hard-filter/soft-match split above (a dating app's non-negotiable filters like distance vs. its fuzzier compatibility score) — worth using that analogy when explaining the two layers back to the user.

Not yet decided: exact feature scope for a first small version, what "profile" data the user provides and how, where job postings come from (paste-in vs. search), and the backend/API-key setup this will need. These should come from the next planning conversation, done in plain terms with the user confirming understanding in their own words per [[Identity]].

Other options raised earlier but not chosen for stage 1 (kept for later — may still be worth building once matching works): resume/cover-letter tailoring, an interview prep coach, and a natural-language chat wrapper on the existing Application Tracker.

## Challenges log

- 2026-08-25: picked an outdated Anthropic SDK version from memory instead of checking — it lacked the structured-output feature the plan needed. Fixed by checking the real published version and upgrading (then had to upgrade Zod too, since the newer SDK needed a newer Zod). Lesson: check installed/published versions before writing code against a remembered API shape.

## Recap index

- [[Recaps/2026-08-25]] — stage 2: backend built and live-tested, frontend form still pending
