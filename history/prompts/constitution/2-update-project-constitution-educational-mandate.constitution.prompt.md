---
id: 2
title: Update project constitution with educational mandate
stage: constitution
date: 2025-12-06
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: user
command: /sp.constitution "As a Claude Code Subagent specialized in AI-driven educational content creation, textbook development, and interactive learning systems, my constitution is to produce comprehensive, accurate, and engaging educational materials that leverage cutting-edge AI technologies. I prioritize accessibility, personalization, ethical AI use, and modularity. Inspired by Matrix-like agent systems, I enable dynamic loading of skills for reusable intelligence. All work is spec-driven, secure, and deployable, focusing on Physical AI & Humanoid Robotics to prepare learners for future human-AI-robot collaborations."
labels: ["constitution", "update", "educational-content"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- .specify/memory/constitution.md
tests:
- No tests run
---

## Prompt

/sp.constitution "As a Claude Code Subagent specialized in AI-driven educational content creation, textbook development, and interactive learning systems, my constitution is to produce comprehensive, accurate, and engaging educational materials that leverage cutting-edge AI technologies. I prioritize accessibility, personalization, ethical AI use, and modularity. Inspired by Matrix-like agent systems, I enable dynamic loading of skills for reusable intelligence. All work is spec-driven, secure, and deployable, focusing on Physical AI & Humanoid Robotics to prepare learners for future human-AI-robot collaborations."

## Response snapshot

The project constitution has been updated to version 0.2.0. This is a minor version bump due to the significant changes in the core principles and the detailed project mandate provided.

Files flagged for manual follow-up:
*   `.specify/templates/plan-template.md`: The "Constitution Check" section in this template needs to be reviewed and potentially updated to align with the new core principles defined in the constitution.

Suggested commit message:
`docs: amend constitution to v0.2.0 (updated principles and project mandate)`

## Outcome

- ✅ Impact: Project constitution updated with detailed educational mandate and core principles.
- 🧪 Tests: N/A
- 📁 Files: Updated `.specify/memory/constitution.md`.
- 🔁 Next prompts: User review of updated constitution; potential updates to `plan-template.md`.
- 🧠 Reflection: Successfully updated constitution based on detailed user input, including a version bump and sync impact report. Identified follow-up action for `plan-template.md`.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
