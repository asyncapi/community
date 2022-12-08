---
title: Add new AsyncAPI tool to website
description: Learn how to add your tool to the AsyncAPI website using the .asyncapi-tool file.
---

## Introduction 
Learn how to add your tool to the AsyncAPI website using the `.asyncapi-tool` file. Make sure to structure your `.asyncapi-tool` file correctly to render your tool on the AsyncAPI website with customized tags and information for users to filter tools according to different categories.

> The entire AsyncAPI Tools list is under the [AsyncAPI Docs tools overview](https://www.asyncapi.com/docs/tools) page.

## AsyncAPI tool file

The [`.asyncapi-tool` file](https://github.com/asyncapi/website/blob/master/scripts/tools/tools-schema.json) requires a specific schema to describe the type and details of your AsyncAPI tool; this file automatically adds your tool to our website's [Tools Dashboard](https://www.asyncapi.com/tools) within a week. Every Monday, we run our workflow to add new tools or update existing tools in our website and thus, notifies us regarding the wrong format of the file used somewhere in Github using Slack notifications. You can even ask the maintainers to manually trigger workflow by [Creating a Github issue](https://github.com/asyncapi/website/issues/new/choose) or contact us via [AsyncAPI Slack](https://asyncapi.com/slack-invite).

You must create and maintain your `.asyncapi-tool` file in your tool's repository, as it doesn't require AsyncAPI approval. 

## Tool file structure

Let's look at a sample `.asyncapi-tool` file in `JSON` and `YAML` structures. You'll use these file structures to insert your tool into the website's [Tools Dashboard](https://www.asyncapi.com/tools). 

### JSON format file structure

```JSON
{
  "title": "Sample Tool",
  "description": "Tool for testing",
  "links": {
    "websiteUrl": "https://akshatnema.netlify.app"
  },
  "filters": {
    "language": "javascript",
    "technology": ["react"],
    "categories": ["code generator"]
  }
}
```

### YAML format file structure

```YAML
---
title: Sample Tool
description: Tool for testing
links:
  websiteUrl: https://akshatnema.netlify.app
  docsUrl: ''
filters:
  language: javascript
  technology:
  - react
  categories:
  - code generator
```

Let's break down each field of an `.asyncapi-tool` file:

|  Field Name 	|  Description 	|  Required 	|
|---	|---	|---	|
|  `title` 	|   Specifies the title or name of the tool; the official name of your tool on the website.  |  Yes 	|
|   `description`	|  Specifies the tool's description; 30 words limitation. 	|  No* 	|
|   `links`	|   Object which contains important links related to the tool.	|  No 	|
|  `websiteUrl` 	|  This is an optional field specifying the tool's website URL. 	|  No 	|
|  `docsUrl`	|  This is an optional field specifying the tool's documentation URL. 	|  No	|
|  `filters` 	|  Object which contains various fields like language, technologies, and categories to provide information about the tool. 	|  Yes 	|
|  `language` 	|  Specifies the primary language in which you created the tool. Our documentation lists [predefined languages](https://github.com/asyncapi/website/blob/master/scripts/tools/tags-color.js), and you can expand this list to add new languages according to your need. To add a new language, you have to create a [new issue on GitHub repository](https://github.com/asyncapi/website/issues/new/choose) specifying the language you want to add. 	|  No	|
|  `technology` 	|  Specifies the technologies used to create the tool. Our documentation lists [predefined technologies](https://github.com/asyncapi/website/blob/master/scripts/tools/tags-color.js), and you can expand this list to add new technologies according to your need. To add a new technology, you have to create a [new issue on GitHub repository](https://github.com/asyncapi/website/issues/new/choose) specifying the technology you want to add. 	|  Yes 	|
|  `categories` 	|  Specifies the list of categories that defines the type of tool. There are [predefined categories](https://github.com/asyncapi/website/blob/master/scripts/tools/categorylist.js) in our documentation that you can use to list your tool under the proper category. If your tool doesn't matches with any categories specified in list, you can choose `others` option to list your tool.  	|  Yes 	|
|  `hasCommercial` 	|  Specifies whether the tool is a commercial product or open source. 	|  No (`false` by default) 	|

* denotes that if you don't add description to the file, you should have proper repository description on Github. 

> You can find the predefined list of technologies in our repository under [Languages and Technologies](https://github.com/asyncapi/website/blob/master/scripts/tools/tags-color.js) and [Categories](https://github.com/asyncapi/website/blob/master/scripts/tools/categorylist.js). If you have any other technologies or languages we left in our list, or you want us to add them, feel free to [create a new AsyncAPI GitHub issue](https://github.com/asyncapi/website/issues/new/choose) specifying the languages or technologies.

## Manual addition of tools

If you don't want to create the `.asyncapi-tool` file in your repository or your tool's codebase doesn't exist in Github, the [AsyncAPI website repository](https://github.com/asyncapi/website) contains a [`manual-tools.json`](https://github.com/asyncapi/website/blob/master/config/tools-manual.json) file that adds your tool to our website's [Tools Dashboard](/tools).

Inside this [`manual-tools.json`](https://github.com/asyncapi/website/blob/master/config/tools-manual.json) file, you must choose the desired category for your tool and add your tool as an **element** inside that particular category **object**.

## JSON tool structure

Once you've created your `.asyncapi-tool` file, check your tool configuration inside our database on the [automated-tools.json](https://github.com/asyncapi/website/blob/master/config/tools-automated.json) file.

Here's what a sample JSON object for an AsyncAPI tool should look like:

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

> If your tool's information isn't showing up correctly in this file, please [create a new AsyncAPI GitHub issue](https://github.com/asyncapi/website/issues/new/choose) or contact us via [AsyncAPI Slack](https://asyncapi.com/slack-invite).

## Tool card in website

Let's break down the details and sections found on tool cards in the website's [Tools Dashboard](/tools):

![Tools Card](/assets/tool-preview.webp)

<ol>
  <li> Specifies the Tool Name.</li>
  <li> Specifies whether the tool is FREE to use or requires commercial access.</li>
  <li> Specifies the tool description. The `Show More` button opens a small box with the complete tool description.</li>
  <li> Specifies the tool's primary language.</li>
  <li> Specifies the list of technologies used to create the tool.</li>
  <li> The <b>View on Github</b> button directs the user to the tool's GitHub repository.</li>
  <li> The <b>Visit Website</b> button directs the user to the official tool's website.</li>
</ol>
