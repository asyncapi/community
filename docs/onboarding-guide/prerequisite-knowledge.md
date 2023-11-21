---
title: 'Prerequisite knowledge'
weight: 20
---

This section highlights the key technologies, concepts, and skills that technical writers should know when working on AsyncAPI documentation. While you don't need to know everything to begin contributing, you should understand the main concepts behind the documentation methodology and tools, as well as the technologies surrounding the AsyncAPI specification.

### Documentation concepts

#### Understanding of diátaxis

[Diátaxis](https://diataxis.fr/) is a methodology that AsyncAPI uses to organize its documentation website into several categories, based on what users need. For an overview of how AsyncAPI's documentation uses diátaxis, see [this post](https://www.asyncapi.com/blog/changes-coming-docs).

#### Competency in Markdown

Markdown is a markup language used to format text for the web. AsyncAPI's docs are written in Markdown, which is then processed into HTML by the back end of the website. For an overview of how to write in Markdown, see [this reference](https://www.markdownguide.org/basic-syntax/). 

#### Familiarity with the open source ecosystem

Understanding the concepts of open source software will help you become a strong contributor to this project. For an overview of the AsyncAPI governance model, see [Finding a Good Open Governance Model for AsyncAPI](https://www.asyncapi.com/blog/governance-motivation). To read AsyncAPI's charter, which gives a high-level overview of the organization, see [here](https://github.com/asyncapi/community/blob/master/CHARTER.md).

### AsyncAPI concepts

#### Knowledge of AsyncAPI 

Before contributing to the documentation, you should know what AsyncAPI is, how it's structured, and what purpose it serves. See [here](https://www.asyncapi.com/docs/concepts) for an overview of the major AsyncAPI concepts.

You should also have a basic understanding of [the AsyncAPI specification itself](https://www.asyncapi.com/docs/reference/specification/v2.6.0). 

#### Familiarity with JSON and YAML

Because an AsyncAPI definition can be written in both JSON and YAML, understanding how to read, write, and validate these formats is beneficial. See [this post](https://www.asyncapi.com/blog/json-schema-beyond-validation) for an overview of the JSON schema used in AsyncAPI.

#### Understanding event-driven architecture (EDA) 

Event-driven architecture is the style of software design at the core of how AsyncAPI works. Therefore, you should understand the basics of EDA, including its benefits, use cases, and how AsyncAPI conceptually fits into the EDA ecosystem. To get started with EDA, see [here](https://www.asyncapi.com/docs/tutorials/getting-started/event-driven-architectures/).

Be sure to have an understanding of these EDA concepts:

* Message brokers, aka servers
* Topics, aka channels
* Queues
* Subscriptions
* Publisher/Subscriber (Pub/Sub) pattern

#### Understanding key protocols

AsyncAPI supports several protocols, including Kafka, AMQP, and MQTT. You should have a [basic understanding of these protocols](https://www.asyncapi.com/docs/concepts/protocol#what-is-a-protocol), including their use cases and how they work. 

For further discussion of the protocols supported by AsyncAPI, see [here](https://www.asyncapi.com/blog/asyncapi-and-apicurio-for-asynchronous-apis#kafka-amqp-mqtt-or-http-protocol-specific-properties).


