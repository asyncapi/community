---
title: Community Glossary
weight: 997
---

This glossary defines terms used across AsyncAPI documentation, governance documents, and community discussions. If you come across a term that isn't listed here, feel free to open an issue or a pull request.

## A

### Ambassador

A community member recognized for their contributions to promoting and supporting AsyncAPI. Ambassadors are part of the TSC and can vote on decisions. See [Ambassador Program](../020-governance-and-policies/AMBASSADOR_PROGRAM.md).

### AsyncAPI Initiative

The open-source project and community responsible for the AsyncAPI specification and its related tooling ecosystem.

### AsyncAPI Specification

The machine-readable format for describing Event-Driven Architecture (EDA) APIs. The current major version is 3.x.

## B

### Bindings

Protocol-specific metadata in an AsyncAPI document. Bindings let you add details that apply only to a specific protocol, such as Kafka, AMQP, or WebSocket.

## C

### Channel

In an AsyncAPI document, a channel is an addressable component through which messages are sent and received. Think of it as a topic, queue, or stream, depending on the protocol.

### Charter

The governing document of the AsyncAPI Initiative that defines decision-making structure, responsibilities, and policies. See [AsyncAPI Charter](../020-governance-and-policies/CHARTER.md).

### Conventional Commits

A commit message format required for contributions. It structures commit messages as `type(scope): description`. See the [Conventional Commits guide](../010-contribution-guidelines/conventional-commits.md).

## E

### EDA (Event-Driven Architecture)

A software design pattern where services communicate by producing and consuming events, rather than making direct synchronous calls.

## G

### Governance Board (GB)

A group of 5 elected members responsible for the overall direction and health of the AsyncAPI Initiative. See [Governance](../020-governance-and-policies/GOVERNANCE.md).

## M

### Maintainer

A contributor with write access to one or more AsyncAPI repositories. Maintainers review PRs, triage issues, and are responsible for a specific project or area. Listed in [MAINTAINERS.yaml](../../MAINTAINERS.yaml).

### Message

The data sent through a channel in an AsyncAPI document. A message has a payload (the actual data) and may include headers and metadata.

## O

### Operation

An action a service can perform — either sending a message to a channel or receiving one. In AsyncAPI 3.x, operations are defined separately from channels.

## P

### Payload

The main body of data in a message. Payloads are described using JSON Schema or other schema formats.

### Protocol

The communication mechanism used to send messages. AsyncAPI supports multiple protocols including AMQP, MQTT, Kafka, WebSocket, HTTP, and others.

## R

### RTM (ready-to-merge)

A comment (`/ready-to-merge` or `/rtm`) you can add to a pull request to tell the AsyncAPI bot to label and merge it, once all checks pass and approvals are in place.

## S

### Schema

A description of the structure and validation rules for a message payload or header. AsyncAPI supports JSON Schema and Avro, among others.

### Spec

Short for Specification. Refers to the AsyncAPI Specification document. When people say "the spec," they mean the formal document that defines how AsyncAPI files should be structured.

## T

### TSC (Technical Steering Committee)

The group of maintainers and ambassadors responsible for technical decisions and governance of the AsyncAPI Initiative. TSC members can vote on proposals. See [Governance](../020-governance-and-policies/GOVERNANCE.md).

## W

### Working Group

A focused group within the AsyncAPI community that works on a specific area, such as the spec, tooling, or documentation. Working groups are listed in [WORKING_GROUPS.yaml](../../WORKING_GROUPS.yaml).