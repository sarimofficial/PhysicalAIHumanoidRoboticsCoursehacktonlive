# Tasks: Physical AI & Humanoid Robotics Book

**Input**: Design documents from `specs/1-ai-robotics-book/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md (resolved decisions)

**Tests**: Test tasks are included as part of the quality validation strategy.

**Organization**: Tasks are grouped by logical phases, which align with the project's phased organization and user stories, enabling independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description with file path`

-   **[P]**: Can run in parallel (different files, no dependencies)
-   **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
-   Include exact file paths in descriptions

## Phase 1: Setup (Project Initialization & Core Structure)

*Goal: Establish the foundational Docusaurus project and the core content hierarchy.*

### Implementation Tasks

- [X] T001 Initialize Docusaurus project using `npx create-docusaurus@latest book classic`
- [X] T002 Configure Docusaurus theme as "classic" in `book/docusaurus.config.js`
- [X] T003 Set up sidebar auto-generation in `book/sidebars.js`
- [X] T004 Create core `docs` directory for modules: `book/docs/`
- [X] T005 [P] Create module directory `book/docs/introduction/`
- [X] T006 [P] Create module directory `book/docs/ros2/`
- [X] T007 [P] Create module directory `book/docs/digital-twin-simulation/`
- [X] T008 [P] Create module directory `book/docs/nvidia-isaac/`
- [X] T009 [P] Create module directory `book/docs/vla-integration/`
- [X] T010 [P] Create module directory `book/docs/hardware-edge-ai/`
- [X] T011 [P] Create module directory `book/docs/weekly-breakdown-assessments/`
- [X] T012 [P] Create module directory `book/docs/capstone-project/`
- [X] T013 [P] Create `_category_.json` for `book/docs/introduction/_category_.json`
- [X] T014 [P] Create `_category_.json` for `book/docs/ros2/_category_.json`
- [X] T015 [P] Create `_category_.json` for `book/docs/digital-twin-simulation/_category_.json`
- [X] T016 [P] Create `_category_.json` for `book/docs/nvidia-isaac/_category_.json`
- [X] T017 [P] Create `_category_.json` for `book/docs/vla-integration/_category_.json`
- [X] T018 [P] Create `_category_.json` for `book/docs/hardware-edge-ai/_category_.json`
- [X] T019 [P] Create `_category_.json` for `book/docs/weekly-breakdown-assessments/_category_.json`
- [X] T020 [P] Create `_category_.json` for `book/docs/capstone-project/_category_.json`
- [X] T021 [P] Create `index.md` for `book/docs/introduction/index.md`
- [X] T022 [P] Create `index.md` for `book/docs/ros2/index.md`
- [X] T023 [P] Create `index.md` for `book/docs/digital-twin-simulation/index.md`
- [X] T024 [P] Create `index.md` for `book/docs/nvidia-isaac/index.md`
- [X] T025 [P] Create `index.md` for `book/docs/vla-integration/index.md`
- [X] T026 [P] Create `index.md` for `book/docs/hardware-edge-ai/index.md`
- [X] T027 [P] Create `index.md` for `book/docs/weekly-breakdown-assessments/index.md`
- [X] T028 [P] Create `index.md` for `book/docs/capstone-project/index.md`
- [X] T029 Create `/blog/` directory and initial content (e.g., `book/blog/2025-12-05-welcome.md`)
- [X] T030 Create custom React components directory `book/src/components/`
- [X] T031 Create `/static/images/` directory for global assets `book/static/images/`
- [X] T032 Create `README.md` for the book project in `book/README.md`

---

## Phase 2: Foundational (Detailed Content Architecture)

*Goal: Implement the detailed chapter and lesson structure, and define content metadata.*

### Implementation Tasks

- [X] T033 [P] Create chapter folder structure and `_category_.json` for Introduction module (Chapter 1) `book/docs/introduction/chapter1/`
- [X] T034 [P] Create lesson files for Introduction module (Chapter 1, Lessons 1-3) `book/docs/introduction/chapter1/lesson*.md`
- [X] T035 [P] Create chapter folder structures and `_category_.json` for ROS 2 module (Chapters 1-3) `book/docs/ros2/chapter*/`
- [X] T036 [P] Create lesson files for ROS 2 module (Chapters 1-3, Lessons 1-3 each) `book/docs/ros2/chapter*/lesson*.md`
- [X] T037 [P] Create chapter folder structures and `_category_.json` for Digital Twin & Simulation module (Chapters 1-3) `book/docs/digital-twin-simulation/chapter*/`
- [X] T038 [P] Create lesson files for Digital Twin & Simulation module (Chapters 1-3, Lessons 1-3 each) `book/docs/digital-twin-simulation/chapter*/lesson*.md`
- [X] T039 [P] Create chapter folder structures and `_category_.json` for NVIDIA Isaac module (Chapters 1-3) `book/docs/nvidia-isaac/chapter*/`
- [X] T040 [P] Create lesson files for NVIDIA Isaac module (Chapters 1-3, Lessons 1-3 each) `book/docs/nvidia-isaac/chapter*/lesson*.md`
- [X] T041 [P] Create chapter folder structures and `_category_.json` for VLA Integration module (Chapters 1-3) `book/docs/vla-integration/chapter*/`
- [X] T042 [P] Create lesson files for VLA Integration module (Chapters 1-3, Lessons 1-3 each) `book/docs/vla-integration/chapter*/lesson*.md`
- [X] T043 [P] Create chapter folder structures and `_category_.json` for Hardware & Edge AI module (Chapters 1-3) `book/docs/hardware-edge-ai/chapter*/`
- [X] T044 [P] Create lesson files for Hardware & Edge AI module (Chapters 1-3, Lessons 1-3 each) `book/docs/hardware-edge-ai/chapter*/lesson*.md`
- [X] T045 [P] Create content files for Weekly Breakdown & Assessments module (`week*.md`) `book/docs/weekly-breakdown-assessments/week*.md`
- [X] T046 [P] Create content files for Capstone Project module (`phase*.md`, `submission-guidelines.md`) `book/docs/capstone-project/*.md`
- [X] T047 Draft initial `data-model.md` for chapter/lesson metadata (e.g., objectives, references, word count tracking) `specs/1-ai-robotics-book/data-model.md`

---

## Phase 3: User Story 1 (P1: Learning about Physical AI) 🎯 MVP

*Goal: Comprehensive understanding of Physical AI fundamentals.*
*Independent Test: The student can demonstrate comprehension of Physical AI principles through quizzes or discussions, covering topics like what Physical AI is, its applications, and basic embodied intelligence concepts.*

### Implementation Tasks

- [X] T048 [US1] Write "Introduction" module `book/docs/introduction/index.md`
- [X] T049 [US1] Write "Chapter 1: Physical AI Fundamentals - Lesson 1.1: What is Physical AI?" `book/docs/introduction/chapter1/lesson1.md`
- [X] T050 [US1] Write "Chapter 1: Physical AI Fundamentals - Lesson 1.2: Embodied Intelligence Principles" `book/docs/introduction/chapter1/lesson2.md`
- [X] T051 [US1] Write "Chapter 1: Physical AI Fundamentals - Lesson 1.3: Physical Constraints & Real-World Dynamics" `book/docs/introduction/chapter1/lesson3.md`
- [X] T052 [US1] Add APA-style references for all lessons in "Introduction" module `book/docs/introduction/chapter1/lesson*.md`
- [X] T053 [US1] Integrate visuals and diagrams for "Introduction" module `book/docs/introduction/chapter1/lesson*.md`, `book/static/images/`

---

## Phase 4: User Story 2 (P2: Practicing with Simulations)

*Goal: Successful execution of ROS 2, Gazebo, and NVIDIA Isaac simulations.*
*Independent Test: An independent user can successfully set up and run at least three distinct simulation examples.*

### Implementation Tasks

- [X] T054 [US2] Write "ROS 2 – Robotic Nervous System" module (all chapters and lessons) with Gazebo examples `book/docs/ros2/chapter*/lesson*.md`
- [X] T055 [US2] Write "Digital Twin & Simulation" module (all chapters and lessons) with Gazebo and Unity context `book/docs/digital-twin-simulation/chapter*/lesson*.md`
- [X] T056 [US2] Write "NVIDIA Isaac AI-Robot Brain" module (all chapters and lessons) with Isaac Sim examples `book/docs/nvidia-isaac/chapter*/lesson*.md`
- [X] T057 [US2] Integrate practical code snippets for ROS 2, Gazebo, and Isaac Sim examples `book/docs/<module_name>/chapter*/lesson*.md`
- [X] T058 [US2] Add APA-style references for all lessons in simulation-related modules `book/docs/<module_name>/chapter*/lesson*.md`
- [X] T059 [US2] Integrate visuals and diagrams for simulation concepts `book/docs/<module_name>/chapter*/lesson*.md`, `book/static/images/`
- [X] T060 [US2] Write "Simulation → Real World" module (all chapters and lessons) `book/docs/simulation-to-real-world/chapter*/lesson*.md`

---

## Phase 5: User Story 3 (P1: Implementing a Capstone Project)

*Goal: Successful completion and demonstration of a humanoid robot capstone project.*
*Independent Test: A student can successfully implement and demonstrate the capstone project, achieving all defined project goals.*

### Implementation Tasks

- [X] T061 [US3] Write "Vision-Language-Action Integration" module (all chapters and lessons) with OpenAI Whisper examples `book/docs/vla-integration/chapter*/lesson*.md`
- [X] T062 [US3] Write "Hardware & Edge AI Kits" module (all chapters and lessons) including Jetson Edge Kit context `book/docs/hardware-edge-ai/chapter*/lesson*.md`
- [X] T063 [US3] Write "Weekly Breakdown & Assessments" module content `book/docs/weekly-breakdown-assessments/week*.md`
- [X] T064 [US3] Write "Capstone Project Instructions" module content, including project phases and evaluation `book/docs/capstone-project/*.md`
- [X] T065 [US3] Add APA-style references for all lessons in capstone-related modules `book/docs/<module_name>/chapter*/lesson*.md`
- [X] T066 [US3] Integrate visuals and diagrams for capstone project concepts `book/docs/<module_name>/chapter*/lesson*.md`, `book/static/images/`

---

## Phase 6: Polish & Cross-Cutting Concerns

*Goal: Ensure overall quality, deployability, and adherence to all constraints and standards.*

### Implementation Tasks

- [X] T067 Review all chapters for Docusaurus formatting compliance `book/docs/**`
- [X] T068 Review all chapters for 3-lesson structure compliance `book/docs/**`
- [X] T069 Verify every lesson contains APA references (minimum 6 per chapter) `book/docs/**`
- [X] T070 Review all code blocks for correctness and testability `book/docs/**`
- [X] T071 Review all equations for correctness `book/docs/**`
- [X] T072 Verify visuals are added where needed and correctly integrated `book/docs/**`
- [X] T073 Review reading flow for coherence across all modules `book/docs/**`
- [X] T074 Verify no incomplete placeholders remain in any content `book/docs/**`
- [X] T075 Perform a full Docusaurus build to check for warnings and errors `book/`
- [X] T076 Verify all internal links resolve correctly `book/`
- [X] T077 Check mobile responsiveness of the Docusaurus site `book/`
- [X] T078 Test GitHub Pages deploy with `npx docusaurus deploy` `book/`
- [X] T079 Validate search index functionality `book/`
- [X] T080 Address edge cases identified in `spec.md` with appropriate guidance `book/docs/**`

---

## Dependencies & Execution Order

### Phase Dependencies

-   **Phase 1: Setup**: No dependencies - can start immediately.
-   **Phase 2: Foundational**: Depends on Phase 1 completion.
-   **Phase 3: User Story 1 (P1)**: Depends on Phase 2 completion.
-   **Phase 4: User Story 2 (P2)**: Depends on Phase 2 completion. Can start in parallel with Phase 3 or after.
-   **Phase 5: User Story 3 (P1)**: Depends on Phase 2 completion. Can start in parallel with Phase 3/4 or after.
-   **Phase 6: Polish & Cross-Cutting Concerns**: Depends on completion of all User Story phases.

### User Story Dependencies

-   **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories.
-   **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but is designed to be independently testable.
-   **User Story 3 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but is designed to be independently testable.

### Within Each Task Group

-   Tasks are generally ordered by logical flow (e.g., directory creation before file creation).
-   Content writing tasks (e.g., T048-T066) are dependent on the foundational structure being in place.
-   Review and testing tasks (e.g., T067-T080) are dependent on content creation.

---

## Parallel Execution Examples

-   **Initial Setup (Phase 1)**: Many directory and `_category_.json` creation tasks (T005-T028) can be executed in parallel.
-   **Foundational Structure (Phase 2)**: Creating chapter/lesson folder structures and `_category_.json` files (T033-T046) can be done in parallel for different modules.
-   **Content Writing (Phases 3, 4, 5)**: Once the foundational structure is complete, content writing for different modules/user stories can proceed in parallel, especially across different team members. For example, one person could work on US1 content while another works on US2 content.
-   **Visual Integration**: Integrating visuals and diagrams (e.g., T053, T059, T066) can often be performed in parallel with or after the initial content writing.
-   **Review & Testing (Phase 6)**: Various review and testing tasks (T067-T080) can be distributed and executed concurrently. For instance, one reviewer can check formatting while another verifies references.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational
3.  Complete Phase 3: User Story 1
4.  **STOP and VALIDATE**: Test User Story 1 independently against its acceptance criteria (e.g., through manual review of content and sidebar navigation).
5.  Deploy/demo if ready (e.g., a basic Docusaurus site with Introduction and Physical AI Fundamentals).

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready.
2.  Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3.  Add User Story 2 → Test independently → Deploy/Demo
4.  Add User Story 3 → Test independently → Deploy/Demo
5.  Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1.  Team completes Phase 1: Setup and Phase 2: Foundational together.
2.  Once Foundational is done:
    *   Developer A: Focuses on Phase 3 (User Story 1).
    *   Developer B: Focuses on Phase 4 (User Story 2).
    *   Developer C: Focuses on Phase 5 (User Story 3).
3.  Phase 6: Polish & Cross-Cutting Concerns can be done by a dedicated QA/Review team, or distributed among developers as their story phases complete.

---

## Notes

-   [P] tasks = different files, no dependencies
-   [Story] label maps task to specific user story for traceability
-   Each user story should be independently completable and testable
-   Commit after each task or logical group
-   Stop at any checkpoint to validate story independently
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
