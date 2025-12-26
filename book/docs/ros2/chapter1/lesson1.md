---
title: 'Understanding ROS 2 Nodes and Topics'
sidebar_position: 1
---

## Learning Objectives
- Define what a ROS 2 node is and its purpose.
- Understand the concept of ROS 2 topics for data communication.
- Learn how to create and run simple ROS 2 nodes and publishers/subscribers.

## Concept Explanation
In ROS 2, a **node** is an executable process that performs computations. Nodes are designed to be modular and reusable. They communicate with each other primarily through **topics**, which are named buses for sending messages. A node can **publish** messages to a topic or **subscribe** to a topic to receive messages. This publish/subscribe model is asynchronous and many-to-many.

## Real-World Examples
- A camera driver node publishes image data to an `/image_raw` topic.
- An image processing node subscribes to `/image_raw`, processes the image, and publishes detected objects to a `/detected_objects` topic.
- A robot control node subscribes to `/cmd_vel` to receive velocity commands.

## Mathematical or technical breakdown
Messages on topics are strongly typed. For example, a common message type for 2D velocity commands is `geometry_msgs/msg/Twist`, which contains linear and angular components:
```
# A standard 2-D velocity command.

# Linear velocity in x, y, and z.
# In a 2-D robot, y and z are typically 0.
std_msgs/msg/Vector3 linear
  float64 x
  float64 y
  float64 z

# Angular velocity in x, y, and z.
# In a 2-D robot, x and y are typically 0.
std_msgs/msg/Vector3 angular
  float64 x
  float64 y
  float64 z
```

## Mini-Project
**Create a Simple ROS 2 Publisher/Subscriber**:
1.  Create two ROS 2 nodes in Python: `talker` and `listener`.
2.  `talker` node publishes "Hello ROS 2 from Gemini Agent!" messages to a `/chat` topic at 1Hz.
3.  `listener` node subscribes to `/chat` and prints received messages.

## Summary
ROS 2 nodes are modular processes that use topics for asynchronous, many-to-many data exchange. Publishers send messages, and subscribers receive them, forming the backbone of inter-node communication.

## APA-style references
- Macenski, S., et al. (2020). Nav2: Autonomous Navigation for Mobile Robots. *IEEE Robotics & Automation Letters*, 5(2), 3716-3723.
- ROS 2 Documentation. (n.d.). *Concepts*. Retrieved from https://docs.ros.org/en/humble/Concepts.html
