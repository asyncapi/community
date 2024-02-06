# AsyncAPI Ideas Page: Google Summer of Code 2024
Welcome to the **AsyncAPI Ideas Page** with our proposed projects for Google Summer of Code (GSoC) 2024! If you are an interested student/contributor, please don't hesitate to contact our mentors directly to discuss project ideas.

## 1) [Autofix for Spectral Linting Errors: VS Code Extension](https://github.com/asyncapi/vs-asyncapi-preview/issues/160)
Enhance the [AsyncAPI Preview + Spectral](https://github.com/asyncapi/vs-asyncapi-preview) VS Code extension by introducing an autofix feature. This improvement aims to streamline the editing experience by automatically resolving common Spectral linting errors directly within the IDE.

- 🎯 **Outcome:** Automate corrections for standard spectral linting issues in AsyncAPI documents. [Learn more](https://docs.stoplight.io/docs/spectral/1e63ffd0220f3-async-api-rules).
- 🛠️ **Skills Required:** TypeScript/JavaScript and understanding of Spectral rules.
- 🧩 **Difficulty:** Easy/Medium
- 👩🏿‍🏫 **Mentor(s):** @ivangsa
- ⏳ **Length:** 175 Hours

## 2) [Script Stability Enhancement for AsyncAPI Website](https://github.com/asyncapi/website/issues/2626)
Improve the AsyncAPI website's robustness by enhancing script stability in the `/scripts/*` directory. This project involves selecting a suitable testing framework for JavaScript and Next.js, integrating it with the website, developing detailed test cases for scripts, and setting up a GitHub Actions CI workflow for automated testing.

- 🎯 **Outcome:** Achieve a stable website framework to support continuous development and updates.
- 🛠️ **Skills:** JavaScript, Next.js, unit testing, and CI/CD practices.
- 🧩 **Difficulty:** Medium/Hard
- 👩🏿‍🏫 **Mentor(s):** @akshatnema, @anshgoyalevil
- ⏳ **Length:** 320 Hours

## 3) [Integration Testing Library for Code Generators](https://github.com/asyncapi/generator/issues/752)
Enhance the [Generator tool](https://github.com/asyncapi/generator) by introducing a feature or creating a new library to simplify integration testing for code generation templates. This solution facilitates the activation of integration tests, ensuring reliability and robustness with our code generators.

- 🎯 **Outcome:** Enable template maintainers to easily validate and improve the quality of code-generating templates.
- 🛠️ **Skills:** JavaScript/TypeScript, testing libraries, Docker, virtualization, and test automation.
- 🧩 **Difficulty:** Medium/Hard
- 👩🏿‍🏫 **Mentor(s):** @derberg
- ⏳ **Length:** 175 Hours

## 4) [Markdown and MermaidJS Diagrams Preview: VS Code Extension](https://github.com/asyncapi/vs-asyncapi-preview/issues/161)
Upgrade the [AsyncAPI Preview](https://github.com/asyncapi/vs-asyncapi-preview) VS Code extension to include a feature for visualizing message payloads through Markdown and MermaidJS Class Diagrams. It also incorporates an export feature for the Markdown preview to facilitate its use in external documentation. This enhancement will work with both AsyncAPI schemas and Avro (.avsc) files to offer a dynamic and interactive view of message structures. 

- 🎯 **Outcome:** Deliver an enriched AsyncAPI preview tool that provides a user-friendly, graphical representation of message payloads, improving comprehension and documentation within the AsyncAPI ecosystem.
- 🛠️ **Skills:** TypeScript/JavaScript, MermaidJS, and AsyncAPI schemas.
- 🧩 **Difficulty:** Easy/Medium
- 👩🏿‍🏫 **Mentor(s):** @ivangsa
- ⏳ **Length:** 175 Hours

## 5) [AsyncAPI Website UI Kit Development](https://github.com/asyncapi-archived-repos/design-system/issues/4)
Create a UI Kit for the AsyncAPI website to ensure brand visual consistency and streamline web development. The project will leverage Tailwind CSS, focusing on component-based class encapsulation to minimize class duplication and promote a modular, easy-to-maintain design system.

- 🎯 **Outcome:** Establish an AsyncAPI Website UI Kit that aligns with our design principles, facilitating the creation of uniform and manageable website elements.
- 🛠️ **Skills:** JavaScript, React, Storybook, and TailwindCSS.
- 🧩 **Difficulty:** Easy/Medium
- 👩🏿‍🏫 **Mentor(s):** @acethecreator, @akshatnema
- ⏳ **Length:** 320 Hours

## 6) [Dynamic Open Graph Preview for AsyncAPI Studio](https://github.com/asyncapi/studio/issues/224)
Improve social sharing for [AsyncAPI Studio](https://studio.asyncapi.com/) by implementing a dynamic Open Graph link preview generator. This feature will create context-specific preview images for shared links, incorporating key details like the title, description, and statistics from the shared AsyncAPI document.

- 🎯 **Outcome:** Provide a richer, more informative link-sharing experience on platforms like Twitter, LinkedIn, Facebook, and Slack with custom preview images.
- 🛠️ **Skills:** TypeScript/JavaScript and React.
- 🧩 **Difficulty:** Easy/Medium
- 👩🏿‍🏫 **Mentor(s):** @smoya
- ⏳ **Length:** 175 Hours

## 7) [Real-time Collaboration in AsyncAPI Studio](https://github.com/asyncapi/studio/issues/619)
Upgrade [AsyncAPI Studio](https://studio.asyncapi.com/) to support real-time collaborative editing. This enhancement will introduce features for simultaneous document editing, version control, and integrated communication tools, streamlining teamwork on AsyncAPI specifications.

- 🎯 **Outcome:** Enable efficient, real-time collaboration among users on AsyncAPI documents, improving the co-editing experience.
- 🛠️ **Skills:** TypeScript/JavaScript, React, and WebSocket.
- 🧩 **Difficulty:** Easy/Medium
- 👩🏿‍🏫 **Mentor(s):** @fmvilas
- ⏳ **Length:** 175 Hours

## Contact AsyncAPI Mentors
- Join [our Slack workspace](https://www.asyncapi.com/slack-invite).  Observe our [Slack etiquette](https://github.com/asyncapi/.github/blob/master/slack-etiquette.md) and [AsyncAPI code of conduct](https://github.com/asyncapi/.github/blob/master/CODE_OF_CONDUCT.md).
- Join the dedicated Mentorship channel `#mentorships` to meet all other GSoC mentees and mentors.

## FAQ
1. **How active are previous GSoC contributors in AsyncAPI?**
   Although AsyncAPI hasn't directly participated in GSoC, our projects were featured in Postman's proposal last year. Active contributors from that cohort include:
   - **[@14Richa](https://github.com/14Richa)** in our [.github](https://github.com/asyncapi/.github), [community](https://github.com/asyncapi/community), and [optimizer](https://github.com/asyncapi/optimizer) repositories.
   - **[@reachaadrika](https://github.com/reachaadrika)** in our [AsyncAPI website](https://github.com/asyncapi/website) repository.
   - **[@oviecodes](https://github.com/oviecodes)** in our [Glee](https://github.com/asyncapi/glee) and [parser-js](https://github.com/asyncapi/parser-js) repositories.

2. **Is using ChatGPT for GSoC project proposals allowed?**
   We advise against using ChatGPT or similar AI tools for your GSoC project proposals with AsyncAPI. Should you choose to use such tools, we require that this be fully disclosed in your application.

3. **Where is the AsyncAPI source code located?**
   You can find all AsyncAPI source code on GitHub under our organization: [https://github.com/asyncapi](https://github.com/asyncapi).

>If you have further questions or queries, please create an issue in this `/community` repo (with the prefix `GSoC 2024`) or start an [open AsyncAPI discussion](https://github.com/orgs/asyncapi/discussions).
