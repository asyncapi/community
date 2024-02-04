# Status: Application Phase

## Timeline

- January 22: Organization applications open
- February 20: Accepted GSoC Organizations announced
- February 22 - March 18: Potential GSoC contributors discuss application ideas with mentoring organizations
- March 18 - April 2: GSoC contributor application period
- April 24: Proposal Ranking Deadline
- April 29: Slot Allocation Deadline
- April 30 - Projects Announced to Orgs
- May 1: Accepted Projects Announced
- November 14: Program End Date

## Proposed Project Ideas

## 1) Add "Autofix" feature for common linting errors (w/ spectral): Vs-code Extension

AsyncAPI-Preview + Spectral for VSCode form a perfect combo in terms of UX/DX for asyncapi editing:

with this extension, you can navigate and preview your API definition
while Spectral for VSCode provides inline and listed linting error for common and even custom mistakes
VSCode comes with an API for providing quick/autofixes for linting errors (see https://code.visualstudio.com/docs/editor/refactoring https://code.visualstudio.com/api/references/vscode-api#CodeActionProvider and https://github.com/microsoft/vscode-extension-samples/tree/main/code-actions-sample for an example)

The purpose of this feature is to provide auto-fix refactoring for the most common and standard spectral linting errors for asyncapi:
https://docs.stoplight.io/docs/spectral/1e63ffd0220f3-async-api-rules

Learn more here https://github.com/asyncapi/vs-asyncapi-preview/issues/160

**Mentor/s**: 
@ivangsa 

**Project Repo:** 
https://github.com/asyncapi/vs-asyncapi-preview

**Expected Difficulty**:
Easy-Medium

**Expected Time Commitment**:
175 Hour

## 2) Enhancing Script Stability for AsyncAPI Website: Website

In response to the growing AsyncAPI project and website contributors, this initiative aims to bolster website stability by implementing a systematic approach to validate the integrity of scripts within the /scripts/* folder.

The project involves researching and selecting an appropriate testing engine or framework for JavaScript and Next.JS, seamlessly integrating it into the AsyncAPI website, and crafting comprehensive test cases for all scripts in the specified folder. 

The final step includes establishing a CI workflow using GitHub Actions to automate the testing process, enabling early error detection before code deployment. Proficiency in JavaScript, Next.JS, unit testing, and CI/CD is essential for successful execution, ensuring a resilient and reliable website in the face of continuous development and enhancements.

Learn more here https://github.com/asyncapi/website/issues/2626

**Mentor/s**: 
@akshatnema @anshgoyalevil

**Project Repo:** 
https://github.com/asyncapi/website

**Expected Difficulty**:
Medium-Hard

**Expected Time Commitment**:
175 Hour

## 3) Library for easier integration testing of code generators: Generator

This project addresses the needs of template maintainers, particularly those overseeing code-generating templates. The goal is to develop a dedicated feature within the generator or potentially create a standalone library that can be effortlessly enabled in repositories. The envisioned capability allows maintainers to seamlessly activate integration tests specifically tailored to their code generation templates. By creating this testing library, template maintainers will benefit from a streamlined process to ensure the robustness and reliability of their templates, enhancing overall code generation quality and reliability.

Additionally, contributors will have the opportunity to code in JavaScript or TypeScript, collaborate on a solution that will be used across the AsyncAPI organization, delve into the intricacies of writing a testing library, and gain hands-on experience with Docker, virtualization, and testing automation.

Learn more here https://github.com/asyncapi/generator/issues/752

**Mentor/s**: 
@derberg

**Project Repo:** 
https://github.com/asyncapi/generator

**Expected Difficulty**:
Medium-Hard

**Expected Time Commitment**:
175 Hour

## 4) Enhanced Preview Option with Markdown and MermaidJS Diagrams: VsCode Extension

This project proposes the development of an alternative preview option for visualizing message payloads using Markdown and MermaidJS Class Diagrams. The envisioned feature aims to integrate seamlessly with the existing AsyncAPI schema and Avro (.avsc) files, providing a dynamic and interactive representation of message structures. 

Additionally, the preview should support synchronization between the preview panel and source code, allowing users to navigate and comprehend the structure effortlessly. To enhance usability, the project includes a crucial export functionality, enabling users to export the Markdown preview as text for easy inclusion in external documentation. This endeavor combines the power of Markdown and MermaidJS to offer a comprehensive and visually appealing preview option, fostering a more intuitive understanding of message payloads within the AsyncAPI ecosystem.

Learn more here https://github.com/asyncapi/vs-asyncapi-preview/issues/161

**Mentor/s**: 
@ivangsa 

**Project Repo:** 
https://github.com/asyncapi/vs-asyncapi-preview

**Expected Difficulty**:
Easy-Medium

**Expected Time Commitment**:
175 Hour

## 5) Website UI Kit Development: Website

This exciting project revolves around the development of a Website UI Kit, especially crucial after identifying the need for visual consistency during the visual style update in the recent PR. The current challenge lies in maintaining cohesion across recurring elements, even the smallest ones, on the website. 

The design is ready, and the goal is to translate it into a user-friendly UI Kit. While Tailwind CSS is a powerful tool, we aim to optimize its usage by encapsulating class names within components. This approach replaces the practice of duplicating classes for similar visual styles, ensuring a modular and maintainable design system. 

The outcome will be a comprehensive UI Kit that not only complements the existing design but also streamlines development, making it easier to create and manage cohesive elements across the website.
Learn more here https://github.com/asyncapi-archived-repos/design-system/issues/4

**Mentor/s**: 
@acethecreator @akshatnema

**Project Repo:** 
https://github.com/asyncapi/webiste

**Expected Difficulty**:
Easy-Medium

**Expected Time Commitment**:
175 Hour

## 6) Dynamic Open Graph Link Preview for AsyncAPI Studio: Studio

This project envisions enhancing the social media sharing experience for AsyncAPI Studio by introducing a dynamic Open Graph link preview image generation mechanism. Currently, when users share a link to the Studio with or without query parameters like ?url=<url-of-file> or ?base64=<base64-encoded-doc>, the default preview image lacks context about the specific file being shared.

The goal is to implement a solution that dynamically generates a preview image based on the file being shared. This customized preview image will include essential information such as the title, description, and relevant statistics, offering a more informative representation of the document. This improvement is expected to enhance the user experience when sharing AsyncAPI docs on platforms like Twitter, Linkedin, Facebook, Slack, and others, providing a visually appealing and context-rich preview image.

Learn more here https://github.com/asyncapi/studio/issues/224

**Mentor/s**: 
@smoya

**Project Repo:** 
https://github.com/asyncapi/studio

**Expected Difficulty**:
Easy-Medium

**Expected Time Commitment**:
175 Hour

## 7) Real-time Collaboration and Editing Enhancement for AsyncAPI Studio: Studio

This project centers around enhancing the collaborative experience within AsyncAPI Studio by introducing real-time editing capabilities. 

The primary goal is to empower multiple users to collaboratively work on AsyncAPI specifications in real-time, fostering a seamless and efficient collaborative environment. The project involves implementing features that enable simultaneous editing, version control, and communication tools within the Studio, ensuring that collaborative efforts are streamlined and productive. 

This enhancement is designed to elevate the collaborative workflow, providing users with the ability to collaborate on AsyncAPI specifications in a dynamic and synchronized manner

Learn more here https://github.com/asyncapi/studio/issues/619

**Mentor/s**: 
@fmvilas

**Project Repo:** 
https://github.com/asyncapi/studio

**Expected Difficulty**:
Easy-Medium

**Expected Time Commitment**:
175 
