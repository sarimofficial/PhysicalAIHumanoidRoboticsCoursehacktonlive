---
title: 'ROS 2 Services and Actions'
sidebar_position: 2
---

## Learning Objectives
- Differentiate between ROS 2 topics, services, and actions.
- Understand when to use services for request/response communication.
- Learn the purpose and implementation of actions for long-running tasks.

## Concept Explanation
While topics provide asynchronous, many-to-many communication, ROS 2 offers other mechanisms for different interaction patterns:
-   **Services**: Implement a synchronous request/response pattern. A **client** sends a request to a **server**, and the server processes it and sends back a single response. Useful for short-duration, one-off operations (e.g., "get current robot pose").
-   **Actions**: Provide a long-running, asynchronous, and preemptable task execution model. An **action client** sends a goal to an **action server**, which provides continuous feedback on progress and a final result. The client can also preempt (cancel) the goal. Useful for tasks like "navigate to a point" or "pick up an object".

## Real-World Examples
-   **Service**: A robot client requests a map service to "clear costmaps."
-   **Action**: A navigation stack action server receives a goal to "move to target coordinates," providing feedback on current position and remaining distance.

## Mathematical or technical breakdown
**Service Message Structure**: A service definition typically consists of a request and a response message.
```
# Request part of a service
int64 a
int64 b
---
# Response part of a service
int64 sum
```
**Action Message Structure**: An action definition has three parts: Goal, Result, and Feedback.
```
# Goal
int32 order_id
---
# Result
int32[] sequence
---
# Feedback
float32 percentage_complete
```

## Mini-Project
**Implement a Simple ROS 2 Service**:
1.  Create a ROS 2 service server that takes two integers as input and returns their sum.
2.  Create a ROS 2 service client that calls this service with example numbers and prints the result.

## Summary
ROS 2 services enable synchronous request/response communication for immediate tasks, while actions provide a robust framework for managing long-running, preemptable tasks with continuous feedback.

## APA-style references
- ROS 2 Documentation. (n.d.). *Concepts*. Retrieved from https://docs.ros.org/en/humble/Concepts.html
- Gerkey, B. P., et al. (2014). ROS: an open-source robot operating system. In *Experimental Robotics* (pp. 3-19). Springer, Cham.
