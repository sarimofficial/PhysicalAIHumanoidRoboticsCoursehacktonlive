---
title: 'Debugging and Logging in ROS 2'
sidebar_position: 3
---

## Learning Objectives
- Understand ROS 2's logging mechanisms and severity levels.
- Learn how to use `ros2 log` and `rqt_console` for monitoring messages.
- Explore basic debugging techniques for ROS 2 nodes.

## Concept Explanation
Effective **debugging and logging** are crucial for developing robust ROS 2 applications. ROS 2 provides a comprehensive logging system that allows nodes to output messages with different severity levels (DEBUG, INFO, WARN, ERROR, FATAL). These messages can be monitored and filtered to diagnose issues.

Key tools and concepts:
-   **Logging macros/functions**: `self.get_logger().info("message")`, `RCLCPP_INFO()`.
-   **Severity levels**: Categorize messages by importance.
-   **`ros2 log`**: Command-line tool to view live log messages from the entire ROS 2 system.
-   **`rqt_console`**: A graphical tool for filtering, viewing, and saving ROS 2 log messages.
-   **Debugging**: Using tools like GDB (for C++) or `pdb` (for Python) combined with ROS 2 specific techniques (e.g., attaching to running nodes).

## Real-World Examples
- Logging sensor readings for analysis.
- Debugging a robot's motion planner by increasing log level to DEBUG.
- Monitoring warnings from a navigation stack using `rqt_console`.

## Mathematical or technical breakdown
ROS 2 log messages typically include the logger name (usually the node's name), severity level, and the message itself. The logging system is configurable, allowing developers to set log levels for individual nodes or the entire system.

Python logging example:
```python
import rclpy
from rclpy.node import Node

class MyLoggerNode(Node):
    def __init__(self):
        super().__init__('my_logger_node')
        self.counter = 0
        self.timer = self.create_timer(1.0, self.timer_callback)

    def timer_callback(self):
        self.counter += 1
        self.get_logger().info(f'This is an INFO message. Counter: {self.counter}')
        if self.counter % 5 == 0:
            self.get_logger().warn(f'This is a WARNING message. Counter: {self.counter}')
        if self.counter % 10 == 0:
            self.get_logger().error(f'This is an ERROR message. Counter: {self.counter}')

def main(args=None):
    rclpy.init(args=args)
    node = MyLoggerNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```
You can change a node's log level at runtime using `ros2 param set /my_logger_node logger_level DEBUG`.

## Mini-Project
**Experiment with ROS 2 Logging**:
1.  Implement the `MyLoggerNode` example above.
2.  Run `ros2 run my_package my_logger_node`.
3.  In a separate terminal, run `ros2 log` to see the messages.
4.  Experiment with `rqt_console` to filter messages by severity and node name.
5.  Change the log level of `my_logger_node` at runtime and observe the effect.

## Summary
ROS 2 provides robust logging capabilities with various severity levels and monitoring tools like `ros2 log` and `rqt_console`. These are indispensable for diagnosing issues and ensuring the smooth operation of complex robotic systems.

## APA-style references
- ROS 2 Documentation. (n.d.). *Logging and Debugging*. Retrieved from https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Logging-and-Debugging/Logging-and-Debugging.html
- ROS 2 Documentation. (n.d.). *rqt_console*. Retrieved from https://docs.ros.org/en/humble/Tools/rqt_console/rqt_console.html
