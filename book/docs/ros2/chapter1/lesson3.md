---
title: 'Parameters and Launch Files'
sidebar_position: 3
---

## Learning Objectives
- Understand the role of parameters in configuring ROS 2 nodes.
- Learn how to define and use parameters in ROS 2 nodes.
- Master the creation and execution of ROS 2 launch files for system startup.

## Concept Explanation
**Parameters** in ROS 2 allow for dynamic configuration of nodes without recompiling the code. Nodes can declare parameters, and their values can be set at startup (via launch files) or modified at runtime. This provides flexibility for adjusting behavior, such as sensor thresholds or robot speeds.

**Launch Files** are XML or Python files used to define and execute a set of ROS 2 nodes, along with their parameters and other configurations (e.g., remapping topics). They are essential for starting complex robotic systems with many interconnected nodes in a consistent and organized manner.

## Real-World Examples
- Setting the PID gains for a robot's joint controller.
- Configuring the resolution of a camera sensor node.
- Starting a complete navigation stack with multiple nodes and a map server.

## Mathematical or technical breakdown
Nodes can declare parameters using `declare_parameter` and get their values using `get_parameter`. Launch files use constructs like `<node>`, `<param>`, and `<arg>` to define the system's startup behavior. For example, a Python launch file might look like:
```python
import launch
import launch_ros.actions

def generate_launch_description():
    return launch.LaunchDescription([
        launch_ros.actions.Node(
            package='my_robot_controller',
            executable='controller_node',
            name='robot_controller',
            parameters=[
                {'kp': 0.5},
                {'ki': 0.01},
                {'kd': 0.1}
            ]
        )
    ])
```

## Mini-Project
**Create a ROS 2 Node with Parameters and a Launch File**:
1.  Modify your `talker` node from the previous lesson to declare a `message_prefix` parameter.
2.  The `talker` node should prepend the parameter's value to its published messages.
3.  Create a Python launch file to start the `talker` and `listener` nodes, setting the `message_prefix` for the `talker`.

## Summary
ROS 2 parameters provide runtime configurability for nodes, while launch files orchestrate the startup of complex ROS 2 systems, bundling nodes, parameters, and other configurations into a single execution unit.

## APA-style references
- ROS 2 Documentation. (n.d.). *Parameters*. Retrieved from https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Parameters/Understanding-ROS2-Parameters.html
- ROS 2 Documentation. (n.d.). *Launch Files*. Retrieved from https://docs.ros.org/en/humble/Tutorials/Intermediate/Launch/Launch-system.html
