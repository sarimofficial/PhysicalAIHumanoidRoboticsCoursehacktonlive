---
title: 'Understanding Quality of Service (QoS) Settings'
sidebar_position: 2
---

## Learning Objectives
- Define Quality of Service (QoS) in ROS 2.
- Understand the different QoS policies and their impact on communication.
- Learn how to configure QoS settings for publishers and subscribers.

## Concept Explanation
ROS 2 uses **Quality of Service (QoS) settings** to configure the underlying DDS communication. QoS policies allow developers to define the behavior of publishers and subscribers, influencing factors like reliability, latency, and data persistence. This is crucial for matching communication needs to application requirements (e.g., real-time control vs. logging).

Key QoS policies include:
-   **Durability**: Whether messages persist for late-joining subscribers.
-   **Liveliness**: How the system detects if a publisher is still active.
-   **Reliability**: Guarantees about message delivery (best effort vs. reliable).
-   **History**: How many messages or how much time to keep in the history buffer.
-   **Deadline**: Maximum expected time between messages.

## Real-World Examples
- A robot's emergency stop system might use `reliable` reliability and `volatile` durability to ensure immediate delivery of critical messages to active subscribers.
- A sensor data logger might use `transient_local` durability to ensure new subscribers receive a backlog of recent data.
- A high-frequency odometry publisher might use `best_effort` reliability to prioritize low latency over guaranteed delivery.

## Mathematical or technical breakdown
QoS profiles are sets of policies. ROS 2 provides default profiles (e.g., `sensor_data`, `system_default`, `parameters`, `services`, `qos_profile_default`) and allows for custom profiles.
When creating a publisher or subscriber, you can pass a `QoSProfile` object with desired policies:

```python
from rclpy.qos import QoSProfile, ReliabilityPolicy, HistoryPolicy, DurabilityPolicy

# Example QoS profile for reliable communication
qos_profile_reliable = QoSProfile(
    reliability=ReliabilityPolicy.RELIABLE,
    durability=DurabilityPolicy.TRANSIENT_LOCAL,
    history=HistoryPolicy.KEEP_LAST,
    depth=10
)

# When creating a publisher
self.publisher = self.create_publisher(String, 'topic_name', qos_profile_reliable)

# When creating a subscriber
self.subscriber = self.create_subscription(String, 'topic_name', self.callback, qos_profile_reliable)
```

## Mini-Project
**Experiment with QoS Settings**:
1.  Create a simple ROS 2 publisher and subscriber pair.
2.  Experiment with different QoS `ReliabilityPolicy` settings (`BEST_EFFORT` and `RELIABLE`) and `HistoryPolicy` (`KEEP_LAST` and `KEEP_ALL`).
3.  Observe how messages are lost or retained under different network conditions (you might need to introduce artificial delays or packet loss in a more advanced setup to see `BEST_EFFORT` effects).

## Summary
ROS 2 QoS settings provide fine-grained control over DDS communication, allowing developers to optimize reliability, latency, and resource usage according to the specific requirements of each communication channel.

## APA-style references
- ROS 2 Documentation. (n.d.). *About QoS Settings*. Retrieved from https://docs.ros.org/en/humble/Concepts/About-Quality-of-Service-Settings.html
- Open Robotics. (n.d.). *DDS-Glossary*. Retrieved from https://www.ros.org/reps/rep2000.html#dds-glossary
