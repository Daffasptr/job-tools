# job-tools

AI tools for job seekers, built step by step as a learning and portfolio project.

## What this is

Job search tools often hallucinate the filter — recommending jobs that clash with something the seeker has clearly stated (e.g. a required language they don't speak). job-tools is built around fixing that: keeping strict, checkable facts (like language requirements) separate from fuzzier values/culture matching, instead of letting one AI guess at everything at once.

## Current status

- **Stage 1 (done):** a basic Job Application Tracker (`src/App.tsx`) — add a company/role, see the list. Client-side only, no persistence yet.
- **Stage 2 (in progress):** the first real AI feature. Paste a job posting and your must-haves (e.g. languages you speak); get back a plain yes/no on whether the posting clashes with one of them, plus the exact sentence that decided it.
  - Backend built and live-tested — working correctly.
  - Not yet done: a page on the site itself to use it (currently only testable directly against the backend).

## Tech stack

- **Frontend** (`src/`): React + TypeScript + Vite
- **Backend** (`server/`): Node.js + TypeScript + Express, using the Claude API (Anthropic) for the actual job-posting checks

## Project structure

```
job-tools/
├── src/            # the website (frontend)
├── public/         # static files served as-is
├── server/         # the backend — holds the API key, talks to Claude
│   └── src/index.ts
└── rad/            # dev-log notes for Rad, the AI coding assistant on this project
```

## Running it locally

**Frontend:**
```bash
npm install
npm run dev
```

**Backend** (separate terminal):
```bash
cd server
npm install
cp .env.example .env   # then add your own Anthropic API key
npm run dev
```
