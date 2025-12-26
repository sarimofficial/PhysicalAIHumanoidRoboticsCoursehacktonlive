---
title: 'Understanding and Using Launch Files'
sidebar_position: 2
---

## Learning Objectives
- Review the role of launch files for complex system startup.
- Learn to create and structure advanced Python launch files.
- Understand how to pass arguments and remap topics using launch files.

## Concept Explanation
Launch files in ROS 2 are powerful tools for defining and orchestrating the startup of multiple nodes, configuring parameters, and setting up the overall system. They use a declarative syntax (typically Python) to define how a collection of nodes should be launched, making it easier to manage complex robot applications.

Key features of ROS 2 launch files:
-   **Node execution**: Start multiple nodes with a single command.
-   **Parameter configuration**: Set initial parameter values for nodes.
-   **Argument passing**: Pass custom arguments to launch files for dynamic behavior.
-   **Topic remapping**: Change the names of topics that nodes publish or subscribe to.
-   **Conditional execution**: Launch nodes or parts of the configuration only if certain conditions are met.

## Real-World Examples
- Launching all nodes for a mobile robot's navigation stack, including sensor drivers, mapping algorithms, and path planners.
- Starting different configurations of a robot (e.g., simulation vs. real hardware) using the same launch file with different arguments.
- Running unit tests for a package by launching test nodes with specific parameters.

## Mathematical or technical breakdown
ROS 2 Python launch files leverage the `launch` and `launch_ros` packages. They define a `generate_launch_description()` function that returns a `LaunchDescription` object composed of various actions (e.g., `Node`, `ExecuteProcess`, `DeclareLaunchArgument`, `SetRemap`).

Example of declaring an argument and using it:
```python
import launch
from launch.actions import DeclareLaunchArgument, SetLaunchConfiguration
from launch.substitutions import LaunchConfiguration
import launch_ros.actions

def generate_launch_description():
    my_param_arg = DeclareLaunchArgument(
        'my_param',
        default_value='default_value',
        description='Description of my parameter'
    )

    my_node = launch_ros.actions.Node(
        package='my_package',
        executable='my_executable',
        name='my_node',
        parameters=[
            {'param_from_launch': LaunchConfiguration('my_param')}
        ]
    )

    return launch.LaunchDescription([
        my_param_arg,
        my_node
    ])
```

## Mini-Project
**Create an Advanced ROS 2 Launch File**:
1.  Take the `talker` and `listener` nodes from previous lessons.
2.  Create a Python launch file that starts both nodes.
3.  Add a launch argument to control the `message_prefix` for the `talker` node.
4.  Optionally, add a remapping rule to change the `/chat` topic name to `/robot_talk` for both nodes.
5.  Test the launch file, passing different values for the launch argument.

## Summary
ROS 2 launch files are indispensable for managing the complexity of robotic systems. They provide a flexible, programmatic way to define and execute the entire startup configuration, including nodes, parameters, and communication mappings.

## APA-style references
- ROS 2 Documentation. (n.d.). *Launch System*. Retrieved from https://docs.ros.org/en/humble/Tutorials/Intermediate/Launch/Launch-system.html
- ROS 2 Documentation. (n.d.). *Launch Arguments*. Retrieved from https://docs.ros.org/en/humble/Tutorials/Intermediate/Launch/Using-ROS2-Launch-for-large-projects.html
