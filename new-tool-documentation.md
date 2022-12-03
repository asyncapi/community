# Add New AsyncAPI Tool to Website

In this article, we will learn how to add your tool to AsyncAPI website using `.asyncapi-tool` file. You will come to know how you have to structure the above file and it's related content correctly, to render your tool in the website with customised tags and information.

The following areas will be covered:
 - Why should I read this article?
 - AsyncAPI Tool File
 - Tool File Structure
   - JSON Format File Structure
   - YAML Format File Structure
 - Manual Addition of Tool
 - JSON Tool Structure
 - Tool Card in website

## Why should I read this article?

Quite interesting question 😀, but definitely you should know what this article targets about. We already know that the present list of tools used inside AsyncAPI is presented on [AsyncAPI Tools Overview](/docs/tools) and it is manually maintained inside the Github repository. All the tools are sorted according to the different categories in which they are used and maintained by the contributors. But we don't have, how to filter the tools according to our interest 🤔, like languages, technolgies used in it, open source tools, etc. Also, what if you want to add your tool in the list, what you will do 🤔? Will make a PR?

What if I say, you don't need to make a mess of PR now 😉. Yepp, we introduce you with something new to add tools in our website. For this, stay tuned in the article 👇.

## AsyncAPI Tool File

We have introduced a new concept of `.asyncapi-tool` file which describes the type and details of a tool related to AsyncAPI. This file will follow certain schema and fields to describe your tool appropriately according to the needs of a user and it will then automatically being added to our website within a week. But the question comes, where this file will exist? inside AsyncAPI repositories? Definitely not!. Here comes the twist, this file will be created and maintained in your Tool's repository, and it won't ask for our approval. This file will follow certain schema which you have to follow to successfully and appropriately add your tool to our brand new [Tools Dashboard](/tools). The proper schema of the file is described [here](https://github.com/asyncapi/website/blob/master/scripts/tools/tools-schema.json). You can use the tools like [Online JSON Validator](https://www.liquid-technologies.com/online-json-schema-validator) to validate your JSON data for Tool against the schema given above.

## Tool File Structure

Here's the sample `.asyncapi-tool` file structure, which can be used to structurise your tool configuration.

### JSON Format File Structure

```JSON
{
  "title": "Sample Tool",
  "description": "Tool for testing",
  "links": {
    "websiteUrl": "https://akshatnema.netlify.app",
    "docsUrl": ""
  },
  "filters": {
    "language": "javascript",
    "technology": ["react"],
    "categories": ["code generator"],
    "hasCommercial": false
  }
}
```

### YAML Format File Structure

```YAML
---
title: Sample Tool
description: Tool for testing
maintainers:
- akshatnema
links:
  websiteUrl: https://akshatnema.netlify.app
  docsUrl: ''
filters:
  language: javascript
  technology:
  - react
  categories:
  - code generator
  hasCommercial: false
```

This file structure should be used to insert your tool in website. The fields specified above are explained below:

- **`title`** - Specifies the title or name of the Tool. Remember this name will be used as official name of your tool in website.
- **`description`** - Specifies the description of the tool you want to add. Make sure it should be precise, upto 30 words only.
- **`links`** - Object which contains important links related to the tool.
  - **`websiteUrl`** - This is an optional field which specifies URL of the website of the tool.
  - **`docsUrl`** - This is an optional field which specifies URL of the documentation of the tool.
- **`filters`** - Object which contains various fields like language, technologies, categories to provide information about the tool.
  - **`language`** - Specifies primary Language in which the tool has been created. There are predefined languages listed in our documentation which are available right now and will be expanded to add new languages if needed.
  - **`technology`** - Specifies the list of technologies which are used to create the tool. There are predefined technologies listed in our documentation which are available right now and will be expanded to add new languages if needed.
  - **`categories`** - Specifies the list of categories which defines the type of tool. There are predefined categories listed in our documentation which can be used to list down your tool under proper category.
  - **`hasCommercial`** - Specifies whether the tool is a commercial product or is open source.

**Note:** The predefined list of technologies can be found in our repository and are listed as:

- [Languages and Technologies](https://github.com/asyncapi/website/blob/master/scripts/tools/tags-color.js)
- [Categories](https://github.com/asyncapi/website/blob/master/scripts/tools/categorylist.js)

## Manual Addition of Tools

You don't want to create `.asyncapi-tool` file in repository or your tool's codebase doesn't exist in Github, no problem at all!. We have remedy for this problem also 😉. [AsyncAPI website repository](https://github.com/asyncapi/website) contains a file [`manual-tools.json`](https://github.com/asyncapi/website/blob/master/config/tools-manual.json) which will help you add your tool in the above specified format only. In this file, you have to choose desired category for your tool and under that particular category object, add the tool in the above specified JSON format only as a element inside object.

## JSON Tool Structure

After creation of the `.asyncapi-tool` file, you can surely check your tool configuration inside our database json file as [automated-tools.json](https://github.com/asyncapi/website/blob/master/config/tools-automated.json) in GitHub repository. The ideal JSON object for a Tool will look like like the following:

```JSON
{
  "title": "Sample Tool",
  "description": "Tool for testing",
  "links": {
    "websiteUrl": "https://akshatnema.netlify.app",
    "docsUrl": "",
    "repoUrl": "https://github.com/akshatnema/Login-Registration-project"
  },
  "filters": {
    "language": "javascript",
    "technology": ["react"],
    "categories": ["code generator"],
    "hasCommercial": false,
    "isAsyncAPIOwner": false
  }
}
```

If you don't get your tool properly presented in this file, kindly inform us by creating an [Issue on GitHub](https://github.com/asyncapi/website/issues/new/choose) or contact us at [Slack](https://asyncapi.com/slack-invite).

## Tool Card in website

Taking the Tools Card in the website under consideration, you have following sections to detail about a Tool:

![Tools Card](/assets/tool-preview.webp)

<ol>
  <li> Specifies the Name of the Tool.</li>
  <li> Specifies whether the Tool is Free to use or requires commercial access to use it.</li>
  <li> Specifies the Description of the Tool. Clicking on the `Show More` button will open a small box to show full description of the Tool.</li>
  <li> Specifies the Primary Language of the Tool in which it is built.</li>
  <li> Specifies the list of Technologies used to create the Tool.</li>
  <li> <b>View on Github</b> Button directs the user to the Github repository of the Tool.</li>
  <li> <b>Visit Website</b> Button directs the user to the official website of the Tool.</li>
</ol>