# Projects ideas
> With this in mind, we have 4 amazing areas we can improve in, but we would like to hear from the community their vote on top 3 projects to select for 2023.

### Ideas list


## 1) Barbaños Education Video Scripts
This past year Barbaño worked hard to produce many video scripts to create a 100 API and AscynAPI learning video series. [You can see all here scripts and open PRs that still need community help here](https://github.com/asyncapi/training/pulls).

For this project, we need:
- more technical Spec contributors to help review her PRs and provide detailed feedback
- more OSS Docs contributors to help write and re-write scripts (GSoD folks... COUGH COUGH..HINT HINT 😂😂😂😂)
- record each of the videos and identify people who want to volunteer to be in these videos
- work with agency we've hired in past to create needed video animations to make videos top notch 😄

## 2) AsyncAPI Interactive Learning Content
Creating **AsyncAPI Interactive Learning Content** that incorporates some best practices, such as:
- Add engaging videos _(Again, see Barbaño's Video Scripts work above)_
- Gamify the training: 
   - **Integrate an immersive storyline** and **eLearning characters**. (EX: _Judy and Tom need to create an app with Kafka and AsyncAPI. Judy needs her app to be able to do yada yada..._)
   - Badges
   - Quizzes
   - Points system
- Create **Learning Paths** on our [Killercoda AsyncAPI profile](https://killercoda.com/asyncapi/). _(This work has already begun during GSoD 2022 scope of work and will likely be partially done before 2023 is over.)_


## 3) Add `Protocol` Specific Tutorial Docs
I know the community uses diff protocols, because everyone has diverse needs. Would the community say they need more tutorials with different protocol setups? IF so, which protocols do you need documented the most?

What do we think of this? (Ok to disagree if you have a better idea!)
EX: `asyncapi.com/docs/tutorials/protocols`

## 4) Document the `AsyncAPI Document` _sections_ in detail: 12 NEW docs

[Lukasz did the below amazing write up to help detail some items he knew were still missing in our Docs. ](https://github.com/orgs/asyncapi/discussions/379#discussioncomment-4217393)

--- 
- **AsyncAPI structure** - intro to all root elements, short explanation of info, servers, channels, components and their purpose
- **Adding variables to URL** - explain how to add variables to server URL when there are parts of URL that maybe different per runtime. And explain how these can be reused between 2 servers using components.serverVariables
- **Adding channel** - explain purpose of channels, different names for it, what people should put here (some overlap with channel concept doc probably). Add simple channel there, and explain how it related to server, that if you specify a channel and server, it is expected that given channel is present on all servers, and explain that channel can also specify that it is present only on server A or server B
- **Specifing dynamic parts of channel name** - explain how to use and reuse parameters
- **Adding operations** - introduce operations, show many there can be, what kind of, their purpose, pub/sub explained
- **Securing operations** - explain that server security applies to all the operations to all channel, but if you have different security per operation then you can use `security` prop on operation level
- **Adding messages** - add simple message as in previous examples, explain most important parts, explain there can be one or multiple (oneOf) under operation. Talk about `contentType` and add note about `defaultSchema`. Also show how to reuse from components
- **Payload schema** - more complex message example with payload added using JSON Schema and also Avro schema, and explanation how to specify them. And schema reuse from components
- **AsyncAPI reusable parts** - talk about `$ref` concept, introduce and explain that `$ref` can point to the same document, other document in local system, and also external urls. What about password to external url? Say that for local references people should use `components`  
- **Reuse with traits** - explain trait concept and how it works
- **Organizing document with tags** - explain different tags info in different parts of AsyncAPI, their purpose (in docs rendering for example)
- **Extending AsyncAPI specification** - explain what to do when something you need is not yet supported by the specification, some field is missing or stuff like that. Explain that one way is to contribute (link) another to use `-x` <- and this is the core of this document, show extensions in action
--- 