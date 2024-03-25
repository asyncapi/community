---
title: Tools and setup
weight: 60
---

## Tools and setup for technical writers

To effectively contribute to the AsyncAPI project documentation, you will need the following range of tools and local setup to author technical documentation.

### Hardware and Internet
- A laptop or desktop computer capable of running the tools necessary for contributing to the project.
- Stable internet access to clone the project repository, submit contributions and stay updated on project changes.

### Software and Platforms
- [GitHub](https://github.com) account: All our project's source code and documentation are hosted on GitHub. You'll need an account to create issues, fork the repository, submit pull requests, etc. If you're new to GitHub, familiarize yourself with its [basic functionalities](https://docs.github.com/en/get-started) and workflows.

### Authoring and publishing tools
- Code editor:  Any text editor or IDE capable of handling Markdown files should suffice  (we recommend [VS Code](https://code.visualstudio.com), but you can choose).
- Managing docs (wiki, source control, content management system)
    - [Git](https://git-scm.com), [GitHub](https://github.com)

Remember, these are just the basic requirements. Depending on the complexity and specific tasks, additional tools or software may be required. Always refer to the specific documentation guidelines or ask project maintainers for clarification.


## Setup your AsyncAPI local environment
1. Fork the repository by clicking on the `Fork` option on the top right of the main repository.

2. Open Command Prompt on your local computer.

3. Clone the forked repository by adding your GitHub username instead of `<username>`.
   For multiple contributions, follow the [proper configuration of a forked AsyncAPI repo](https://github.com/asyncapi/community/blob/master/git-workflow.md).

```bash
    git clone https://github.com/<username>/website/
```

4. Navigate to the website directory.

```bash
    cd website
```

5. Install all website dependencies. 

```bash
    npm install
```

6. Run the website locally.

```bash
    npm run dev
```

7. Access the live development server at [localhost:3000](http://localhost:3000).

   
