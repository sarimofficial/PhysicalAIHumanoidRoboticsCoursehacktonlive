---
title: 'Designing and Implementing Robot Models for Simulation'
sidebar_position: 2
---

## Learning Objectives
- Learn about common robot description formats like URDF and SDF.
- Understand the components of a robot model (links, joints, sensors, visuals).
- Gain hands-on experience in creating a basic robot model for simulation.

## Concept Explanation
To simulate a robot, a detailed **robot model** is required that describes its physical characteristics and capabilities. Two widely used formats for robot description are:
-   **URDF (Unified Robot Description Format)**: An XML format in ROS for describing all aspects of a robot, including its kinematic and dynamic properties, visual appearance, and sensor attachments. It's often used for single-robot descriptions.
-   **SDF (Simulation Description Format)**: An XML format used by Gazebo (and other simulators) that can describe not only robots but also environments, lights, and other simulation elements. It is more comprehensive than URDF for full simulation scenes.

A robot model consists of:
-   **Links**: Rigid bodies of the robot (e.g., base, arm segments, end-effector).
-   **Joints**: Connect links and define their relative motion (e.g., revolute, prismatic).
-   **Visuals**: Define the graphical representation of links.
-   **Collisions**: Define the simplified geometry for physical interactions.
-   **Inertial Properties**: Mass, center of mass, and inertia tensor for realistic physics.
-   **Sensors**: Descriptions of cameras, LiDARs, IMUs, etc.

## Real-World Examples
-   Modeling a robotic arm (e.g., Franka Emika Panda) for manipulation tasks in a simulated factory.
-   Describing a mobile robot (e.g., TurtleBot3) for navigation experiments in a virtual warehouse.

## Mathematical or technical breakdown
URDF uses a tree-like structure, where each joint connects a parent link to a child link. The `<joint>` tag defines the type of joint (revolute, prismatic, fixed, etc.) and its axis of rotation or translation. The `<link>` tag describes the mass, inertia, visual, and collision properties.

Example of a simple URDF joint and link:
```xml
<joint name="base_link_joint" type="fixed">
  <parent link="world"/>
  <child link="base_link"/>
</joint>

<link name="base_link">
  <visual>
    <geometry>
      <box size="0.6 0.4 0.2"/>
    </geometry>
    <material name="blue">
      <color rgba="0 0 1 1"/>
    </material>
  </visual>
  <collision>
    <geometry>
      <box size="0.6 0.4 0.2"/>
    </geometry>
  </collision>
  <inertial>
    <mass value="10.0"/>
    <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.01"/>
  </inertial>
</link>
```

## Mini-Project
**Build a Simple Mobile Robot URDF Model**:
1.  Create a URDF file for a simple differential drive robot with a base link and two wheel links.
2.  Define fixed joints for the wheels to the base.
3.  Add visual and collision geometries for each link.
4.  Optionally, spawn your robot in Gazebo using a launch file.

## Summary
Robot models, described in formats like URDF and SDF, are critical for simulation. They define the robot's physical and visual properties, kinematics, dynamics, and sensors, enabling realistic interaction within virtual environments.

## APA-style references
- ROS 2 Documentation. (n.d.). *URDF Overview*. Retrieved from https://docs.ros.org/en/humble/Tutorials/URDF/URDF-Overview.html
- Open Robotics. (n.d.). *SDF Specification*. Retrieved from http://sdformat.org/spec
