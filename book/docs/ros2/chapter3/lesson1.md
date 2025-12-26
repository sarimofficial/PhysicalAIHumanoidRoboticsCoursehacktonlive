---
title: 'Creating ROS 2 Packages'
sidebar_position: 1
---

## Learning Objectives
- Understand the structure of a ROS 2 package.
- Learn how to create new ROS 2 packages using `ros2 pkg create`.
- Identify key files within a ROS 2 package (package.xml, CMakeLists.txt or setup.py).

## Concept Explanation
A **ROS 2 package** is the fundamental unit for organizing ROS 2 code. It's a directory containing source files, build scripts, configuration files, and other resources related to a specific piece of ROS 2 functionality. Packages facilitate modularity, reusability, and distribution of robotic software.

Key files in a package:
-   **`package.xml`**: Defines metadata about the package, its dependencies, maintainers, license, etc.
-   **`CMakeLists.txt`** (for C++ packages): CMake build system file to compile C++ code.
-   **`setup.py`** (for Python packages): Python build system file to install Python code.

## Real-World Examples
- A package named `robot_description` might contain URDF files describing a robot's physical structure.
- A package named `my_controller` might contain C++ nodes for motor control.
- A package named `image_processing` might contain Python nodes for computer vision algorithms.

## Mathematical or technical breakdown
The `package.xml` file is crucial and follows a specific XML schema. It declares dependencies as `<depend>` (build and runtime), `<build_depend>`, `<exec_depend>`, etc.

Example `package.xml` snippet:
```xml
<package format="3">
  <name>my_robot_pkg</name>
  <version>0.0.0</version>
  <description>A simple ROS 2 package for my robot.</description>
  <maintainer email="user@example.com">Your Name</maintainer>
  <license>Apache License 2.0</license>

  <depend>rclpy</depend>
  <depend>std_msgs</depend>

  <export>
    <build_type>ament_python</build_type>
  </export>
</package>
```

## Mini-Project
**Create Your First ROS 2 Package**:
1.  Navigate to your ROS 2 workspace `src` directory.
2.  Use `ros2 pkg create --build-type ament_python my_first_package --dependencies rclpy std_msgs` to create a new Python package.
3.  Examine the generated `package.xml` and `setup.py` files.
4.  Add a simple publisher node (from Lesson 1.1) to this new package and ensure it runs using `ros2 run`.

## Summary
ROS 2 packages are self-contained units for organizing code and resources. `ros2 pkg create` helps in quickly scaffolding new packages, which are then configured via `package.xml` and either `CMakeLists.txt` (C++) or `setup.py` (Python).

## APA-style references
- ROS 2 Documentation. (n.d.). *Creating a ROS 2 Package*. Retrieved from https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-a-ROS2-Package-Python/Creating-a-ROS2-Package-Python.html
- ROS 2 Documentation. (n.d.). *About Packages*. Retrieved from https://docs.ros.org/en/humble/Concepts/About-Packages.html
