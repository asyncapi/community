---
title: SEO
description: This guide gives advice on how to implement SEO when creating tutorials for our project.
---

## What is SEO?

SEO (Search Engine Optimization) refers to the methods and strategies used to enhance the visibility of a website's content in search engine results.

### Why is important in Technical Documentation?

Implementing SEO practices would make it easier for users and others to find them, resulting in more contributions and people to the community.  

### SEO Best Practices  

#### Headings

Headings are tags used to make sub titles distinctive from each other. When it comes to making them SEO-friendly, it's highly recommended to do the following:

- **Put them in hierarchcial order:** Since an `h1` tag tend to be titles, always start with this tag. From there, use `h2` and`h3` tags for the subsections and `h4` and `h5` tags for other sections in your tutorial or other piece of documentation.
- **Include keywords:** Since sites like Google often use keywords to help people's online content appear on the web, Adding these terms effectively is helpful in ensuring that the tutorials and other pieces of content created reach a wider audience.

Here's an example of SEO-friendly headings:

```md
# Server 
## What is Server?
## What is the purpose of servers?
### Cilent and Server
```

#### Alt Text

Alt text are short descriptions of images used to help Google and people who use screen readers gain a better understanding of our tutorials and other pieces of content. To make them SEO-friendly, it's highly recommended to do the following:

- **Describe the image accurately**:  Doing this would help our users understand how to use Asyncapi in their work.
- **Be concise**: While accuracy is important, avoid writing every single detail about the image.
- **Use keywords strategically**: Avoid adding every single keyword to your image's alt text. It can overwhelm Google's search engine.

Here's an example of effective alternative text:

```html
alt="Diagram of EDAs"
```

#### URLs

URLs are addresses to webpages and other forms of online content. In the context of SEO, they help make it easier for users to gain access content. To make them SEO-friendly, use the following methods:

- **Make them short:** It'll make the links easier for users to comprehend and find the needed tutorial on our website
- **Use keywords**: Like alt text, effectively adding keywords in the URL would make it easier for Google to find them.
- **Avoid using special characters and spaces:** Use hyphens (-) instead of underscores (_) to separate words in URLs, as search engines treat hyphens as space.

Here are some examples of SEO-friendly URLs from our documentation:

- `https://www.asyncapi.com/docs/concepts/application`
- `https://www.asyncapi.com/docs/concepts/server`
- `https://www.asyncapi.com/docs/concepts/message`

In addition to being short, these examples clearly mentions the titles for our content buckets, no hyphens nor special characters and spaces.

#### Anchor Text

While URLs help users lead people to Asyncapi's content, their anchor texts are the phrases that introduces users to them. Here are some tips to make them SEO-friendly:
<!-- add tips here later -->