# AsyncAPI Style Guide - Glossary

## Purpose

The **Glossary** section of the AsyncAPI Style Guide serves as a centralized reference for commonly used terms in AsyncAPI documentation. This ensures that all contributors, developers, and technical writers use terminology consistently, improving clarity, comprehension, and professional polish across all AsyncAPI documentation.

A shared glossary:

- Promotes **consistent terminology** across all documents.
- Helps **new contributors** understand core concepts quickly.
- Supports **internationalization (i18n)** efforts by ensuring clear term definitions.
- Reduces ambiguity by aligning all contributors to a **single source of truth** for key terms.

---

## Guidelines for Contributors

When contributing new terms or updating existing ones, follow these guidelines:

- ✅ Define terms **clearly and concisely**.
- ✅ Use **plain language** when possible, avoiding unnecessary jargon.
- ✅ Format definitions using **sentence case**, ending each definition with a period.
- ✅ **Alphabetize terms** for easy navigation.
- ✅ Where applicable, provide **relevant context** for AsyncAPI, e.g., “In the context of AsyncAPI...”
- ✅ Avoid technology-specific definitions unless relevant to AsyncAPI.

### Examples

| Term | Example Definition |
|---|---|
| AsyncAPI | An open source initiative and specification for defining asynchronous APIs to support the design, documentation, and development of event-driven architectures. |
| Message | A structured piece of data transmitted between systems, typically containing an event, command, or response. |

---

## Glossary

### A

#### API
**Application Programming Interface** — A set of rules and protocols for building and interacting with software applications.

#### AsyncAPI
**AsyncAPI** — An open source project that defines a specification for documenting and defining asynchronous APIs, particularly in event-driven architectures.

### B

#### Broker
A **broker** is a server or service that **mediates message exchanges** between producers (senders) and consumers (receivers) in a messaging system.

### C

#### Channel
A **channel** defines a **communication path** between message producers and consumers. In AsyncAPI, channels map to topics, queues, or similar concepts, depending on the protocol.

#### Client
A **client** is any **application or service** that connects to a server, broker, or messaging system to either produce or consume messages.

### E

#### Event
An **event** represents a **state change or occurrence** that triggers communication between systems, typically communicated through a message.

### M

#### Message
A **message** is a **data packet transmitted** between systems. It often represents an event, command, or response and typically includes headers, metadata, and a payload.

### P

#### Payload
The **payload** is the **main content** of a message, often representing the business data or event information being communicated.

#### Producer
A **producer** is an application that **publishes messages** to a channel or broker.

#### Protocol
A **protocol** defines the **rules and formats** for communication between systems. Examples include MQTT, Kafka, AMQP, and WebSockets.

### S

#### Schema
A **schema** defines the **structure and data types** of a message, ensuring compatibility between producers and consumers.

#### Server
A **server** defines the **connection details**, protocols, and security configurations that clients use to interact with a broker or messaging platform.

#### Specification (Spec)
The **AsyncAPI Specification** outlines the rules and structure for describing asynchronous APIs.

### T

#### Topic
A **topic** is a **named channel** used to categorize messages. It is commonly used in **publish-subscribe** messaging systems like MQTT.

---

## Formatting Standards

- Use **`### Term Name`** for each term’s heading.
- Use **bold** for the first appearance of the term within its own definition.
- When referring to other glossary terms, link to the corresponding section where possible.
- Avoid nesting definitions — each term should be self-contained.
- Prefer **plain English** with concise technical explanations.

---

## Ongoing Maintenance

- Contributors should propose new terms through [GitHub issues](https://github.com/asyncapi).
- Changes are reviewed by AsyncAPI maintainers to ensure alignment with the AsyncAPI Specification and Style Guide.
- Terms should be periodically reviewed during major specification releases to ensure relevance and accuracy.

---

## Additional Resources

For broader technical writing and documentation best practices, contributors are encouraged to consult:

- [Write the Docs: Style Guides](https://www.writethedocs.org/guide/writing/style-guides/)
- [Gatsby Style Guide](https://www.gatsbyjs.com/contributing/docs-and-triaging/#docs-style-guide)
- [Gatsby Docs Structure & Documentation Types](https://www.gatsbyjs.com/docs/docs-structure/)
- [Mozilla Style Guide](https://developer.mozilla.org/en-US/docs/MDN/Guidelines/Writing_style_guide)
- [Google Developer Documentation Style Guide](https://developers.google.com/style)
- [Microsoft Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)

---

## Code of Conduct

All contributions must follow the [AsyncAPI Code of Conduct](https://github.com/asyncapi/.github/blob/master/CODE_OF_CONDUCT.md). By contributing, you agree to abide by this Code of Conduct, which promotes a safe, inclusive, and welcoming environment for all contributors, regardless of background or experience level.

---

## How to Contribute

1. Familiarize yourself with the [AsyncAPI Contribution Guidelines](https://github.com/asyncapi/.github/blob/master/CONTRIBUTING.md).
2. Propose new glossary terms or updates via [GitHub Pull Requests](https://github.com/asyncapi).
3. Reference this document (`glossary.md`) when drafting documentation to ensure consistent terminology.
4. Participate in periodic reviews to keep terminology relevant and aligned with evolving best practices.

---

## Version History

| Date | Version | Description |
|---|---|---|
| March 2025 | 1.0 | AsyncAPI New Style Guide - Glossary |

---

_Last Updated: March 2025_

