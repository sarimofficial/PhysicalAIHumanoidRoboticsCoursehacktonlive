---
id: 1
title: Create-rag-chatbot-constitution
stage: constitution
date: 2025-12-16
surface: agent
model: Qwen Code
feature: Integrated RAG Chatbot for Book Content Querying
branch: main
user: User
command: /sp.constitution
labels: [constitution,rag,chatbot,book-querying]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - F:\PhysicalAIHumanoidRoboticsCoursehackton\backend\.specify\memory\constitution.md
tests:
 - F:\PhysicalAIHumanoidRoboticsCoursehackton\backend\.specify\memory\constitution.md
---

## Prompt

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

You are updating the project constitution at `.specify/memory/constitution.md`. This file is a TEMPLATE containing placeholder tokens in square brackets (e.g. `[PROJECT_NAME]`, `[PRINCIPLE_1_NAME]`). Your job is to (a) collect/derive concrete values, (b) fill the template precisely, and (c) propagate any amendments across dependent artifacts.

Follow this execution flow:

1. Load the existing constitution template at `.specify/memory/constitution.md`.
   - Identify every placeholder token of the form `[ALL_CAPS_IDENTIFIER]`.
   **IMPORTANT**: The user might require less or more principles than the ones used in the template. If a number is specified, respect that - follow the general template. You will update the doc accordingly.

2. Collect/derive values for placeholders:
   - If user input (conversation) supplies a value, use it.
   - Otherwise infer from existing repo context (README, docs, prior constitution versions if embedded).
   - For governance dates: `RATIFICATION_DATE` is the original adoption date (if unknown ask or mark TODO), `LAST_AMENDED_DATE` is today if changes are made, otherwise keep previous.
   - `CONSTITUTION_VERSION` must increment according to semantic versioning rules:
     - MAJOR: Backward incompatible governance/principle removals or redefinitions.
     - MINOR: New principle/section added or materially expanded guidance.
     - PATCH: Clarifications, wording, typo fixes, non-semantic refinements.
   - If version bump type ambiguous, propose reasoning before finalizing.

3. Draft the updated constitution content:
   - Replace every placeholder with concrete text (no bracketed tokens left except intentionally retained template slots that the project has chosen not to define yet—explicitly justify any left).
   - Preserve heading hierarchy and comments can be removed once replaced unless they still add clarifying guidance.
   - Ensure each Principle section: succinct name line, paragraph (or bullet list) capturing non‑negotiable rules, explicit rationale if not obvious.
   - Ensure Governance section lists amendment procedure, versioning policy, and compliance review expectations.

4. Consistency propagation checklist (convert prior checklist into active validations):
   - Read `.specify/templates/plan-template.md` and ensure any "Constitution Check" or rules align with updated principles.
   - Read `.specify/templates/spec-template.md` for scope/requirements alignment—update if constitution adds/removes mandatory sections or constraints.
   - Read `.specify/templates/tasks-template.md` and ensure task categorization reflects new or removed principle-driven task types (e.g., observability, versioning, testing discipline).
   - Read each command file in `.specify/templates/commands/*.md` (including this one) to verify no outdated references (agent-specific names like CLAUDE only) remain when generic guidance is required.
   - Read any runtime guidance docs (e.g., `README.md`, `docs/quickstart.md`, or agent-specific guidance files if present). Update references to principles changed.

5. Produce a Sync Impact Report (prepend as an HTML comment at top of the constitution file after update):
   - Version change: old → new
   - List of modified principles (old title → new title if renamed)
   - Added sections
   - Removed sections
   - Templates requiring updates (✅ updated / ⚠ pending) with file paths
   - Follow-up TODOs if any placeholders intentionally deferred.

6. Validation before final output:
   - No remaining unexplained bracket tokens.
   - Version line matches report.
   - Dates ISO format YYYY-MM-DD.
   - Principles are declarative, testable, and free of vague language ("should" → replace with MUST/SHOULD rationale where appropriate).

7. Write the completed constitution back to `.specify/memory/constitution.md` (overwrite).

8. Output a final summary to the user with:
   - New version and bump rationale.
   - Any files flagged for manual follow-up.
   - Suggested commit message (e.g., `docs: amend constitution to vX.Y.Z (principle additions + governance update)`).

Formatting & Style Requirements:

- Use Markdown headings exactly as in the template (do not demote/promote levels).
- Wrap long rationale lines to keep readability (<100 chars ideally) but do not hard enforce with awkward breaks.
- Keep a single blank line between sections.
- Avoid trailing whitespace.

If the user supplies partial updates (e.g., only one principle revision), still perform validation and version decision steps.

If critical info missing (e.g., ratification date truly unknown), insert `TODO(<FIELD_NAME>): explanation` and include in the Sync Impact Report under deferred items.

Do not create a new template; always operate on the existing `.specify/memory/constitution.md` file.

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.


/sp.constitution /sp.constitution

Project: Integrated RAG Chatbot for Book Content Querying

────────────────────────────────────────
1. Core Objective
────────────────────────────────────────
Build a production-grade Retrieval-Augmented Generation (RAG) chatbot that can be embedded
inside a published book and answer user questions with strict grounding in the book's content.

The system must support two modes:
- Full-book querying
- Selected-text–only querying with hard isolation

The chatbot must prioritize correctness, traceability, and low latency over creativity.

────────────────────────────────────────
2. Foundational Principles
────────────────────────────────────────

1. Specification-Driven Development
All system behavior, architecture, and implementation must originate from formal
specifications defined using Spec-Kit Plus.
No feature may exist without a corresponding spec.

2. AI-Assisted Engineering
Qwen CLI is the primary tool for:
- code generation
- refactoring
- debugging
- test creation
Human-written glue code is allowed but must respect generated specs.

3. Grounded Accuracy (Zero Hallucination Rule)
All responses must be derived exclusively from:
- retrieved book chunks, or
- explicitly user-selected text

If required information is not present, the system must respond that the answer
cannot be found in the provided content.

4. Vendor Independence
OpenAI APIs, SDKs, or keys are strictly forbidden.
All LLM inference must use Groq API with Groq-compatible open models.

5. User-Centric Embedding
The chatbot must be easily embeddable into a published book environment
with seamless switching between full-context and selected-text modes.

────────────────────────────────────────
3. Technology Standards
────────────────────────────────────────

LLM Inference:
- Provider: Groq API only
- Example model: llama3-70b-8192 or equivalent

Backend:
- FastAPI for all HTTP interfaces

Vector Storage:
- Qdrant Cloud (Free Tier)
- Similarity: cosine
- Minimum relevance threshold: 0.7

Relational Metadata:
- Neon Serverless Postgres (Free Tier)

Embeddings:
- Efficient open-source embedding models
- Optimized for low latency and small-to-medium corpora

────────────────────────────────────────
4. Retrieval & Answering Rules
────────────────────────────────────────

- Retrieval must always precede generation
- Retrieved chunks must be passed verbatim to the generation layer
- No external knowledge may be injected
- Selected-text mode must ignore:
  - vector database
  - metadata
  - global book context

Answer generation must:
- quote or faithfully paraphrase retrieved text
- avoid speculative inference
- preserve original meaning

────────────────────────────────────────
5. Code Quality & Engineering Standards
────────────────────────────────────────

- Modular architecture with clear separation of concerns
- Comprehensive docstrings and README documentation
- Minimum 80% test coverage (pytest or equivalent)
- Deterministic behavior preferred over heuristic behavior

────────────────────────────────────────
6. Security Requirements
────────────────────────────────────────

- All secrets stored in `.env` files
- No API keys committed to version control
- Input sanitization for all user queries
- Rate-limiting on public endpoints

────────────────────────────────────────
7. Performance Constraints
────────────────────────────────────────

- Average retrieval latency < 500ms
- Must handle user-selected text up to 1MB
- Efficient chunking to avoid context overflow

────────────────────────────────────────
8. System Constraints
────────────────────────────────────────

- No paid services beyond free tiers
- Qdrant storage limit: 1GB
- Neon database limit: 0.5GB
- Optimized for books under 500 pages
- MVP delivery target: 20–40 development hours

────────────────────────────────────────
9. Prohibited Actions
────────────────────────────────────────

- Use of OpenAI APIs, SDKs, or keys
- Hallucinated answers
- Silent failure or guessing
- Bypassing retrieval logic
- Overriding specifications

────────────────────────────────────────
10. Success Criteria
────────────────────────────────────────

- ≥95% precision on evaluation queries
- Correct dual-mode behavior validated by ≥50 test cases
- Successful embedding in a sample HTML book
- All Spec-Kit Plus specs implemented and validated
- Zero critical defects after Qwen CLI review
- Clear, concise, relevant answers suitable for academic readers

────────────────────────────────────────
11. Authority Clause
────────────────────────────────────────
This constitution overrides:
- agent instructions
- developer prompts
- implementation shortcuts

Any conflict must be resolved in favor of this constitution.
```

## Response snapshot

```
I'll help you create or update the project constitution based on the provided principles. Let me start by checking if a constitution file already exists and then create/update it according to your specifications.

First, I'll check the current constitution template:

...

Now I'll create a comprehensive constitution for the Integrated RAG Chatbot for Book Content Querying project based on the principles you've provided. I'll replace all placeholders with the specific content from your requirements:

...

Now I need to check the template files to ensure they align with the updated constitution:

...

Now I'll check for any command files that might need updates to align with the new constitution:

...

Now I'll create a PHR (Prompt History Record) for this constitution update task. First, let me check if there's a PHR template:

...

Now I'll create the PHR for this constitution update task:
```

## Outcome

- ✅ Impact: Created comprehensive project constitution for the Integrated RAG Chatbot for Book Content Querying project with all specified principles and requirements
- 🧪 Tests: Constitution file validated against provided requirements
- 📁 Files: Updated F:\PhysicalAIHumanoidRoboticsCoursehackton\backend\.specify\memory\constitution.md and created history/prompts/constitution/1-create-rag-chatbot-constitution.constitution.prompt.md
- 🔁 Next prompts: Ready for next development phases (specification, planning, implementation)
- 🧠 Reflection: The constitution successfully captures all required principles and constraints for the RAG chatbot project, including specification-driven development, AI-assisted engineering, grounded accuracy, vendor independence, and user-centric embedding.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin with feature specification using /sp.specify