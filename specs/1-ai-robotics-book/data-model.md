# Data Model: Physical AI & Humanoid Robotics Book Content

This document defines the data model for the book's content, focusing on the structure and metadata for Modules, Chapters, and Lessons. This model supports the content generation, validation, and tracking required for the Docusaurus-based book.

## 1. Entity: Module

Represents a major section or thematic unit of the book.

-   **Name**: Module title (e.g., "ROS 2 – Robotic Nervous System")
-   **Slug**: URL-friendly identifier (e.g., `ros2`)
-   **Description**: Brief overview of the module's content.
-   **Position**: Order in the book (integer).
-   **Chapters**: List of associated Chapter entities.

## 2. Entity: Chapter

Represents a subdivision within a Module, covering a specific sub-topic.

-   **Name**: Chapter title (e.g., "ROS 2 Core Concepts")
-   **Slug**: URL-friendly identifier (e.g., `ros2-core-concepts`)
-   **Module**: Reference to parent Module entity.
-   **Position**: Order within its parent Module (integer).
-   **Lessons**: List of associated Lesson entities.
-   **Word Count Goal**: Target word count for the chapter (e.g., 500-2000 words).
-   **Minimum References**: Minimum number of APA-style, peer-reviewed references required (e.g., 6).

<h2> 3. Entity: Lesson </h2>

Represents the smallest unit of content, focusing on a single learning objective.

-   **Name**: Lesson title (e.g., "Understanding ROS 2 Nodes and Topics")
-   **Slug**: URL-friendly identifier (e.g., `ros2-nodes-topics`)
-   **Chapter**: Reference to parent Chapter entity.
-   **Position**: Order within its parent Chapter (integer).
-   **File Path**: Relative path to the Markdown/MDX file (e.g., `book/docs/ros2/chapter1/lesson1.md`).
-   **Learning Objectives**: List of specific, measurable learning outcomes.
-   **Concept Explanation**: Core textual content of the lesson.
-   **Real-World Examples**: Examples illustrating the concept.
-   **Mathematical/Technical Breakdown**: Technical details or equations.
-   **Mini-Project**: Small, hands-on activity or thought experiment.
-   **Summary**: Brief recap of the lesson.
-   **References**: List of APA-style, peer-reviewed sources cited in the lesson.
-   **Word Count**: Actual word count of the lesson content.
-   **Visuals**: List of image/diagram file paths included (e.g., `static/images/ros2_graph.png`).

<h2> 4. Metadata for Book-wide Content </h2>

-   **Total Word Count Goal**: Target total word count for the entire book (e.g., 15,000-25,000 words).
-   **Docusaurus Config**: Structure for `docusaurus.config.js` and `sidebars.js` (implicit from `plan.md`).
-   **Global Assets**: Directory for common images and diagrams (`book/static/images/`).
-   **Custom Components**: Directory for reusable React components (`book/src/components/`).
