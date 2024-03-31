---
title: SEO
description: This guide gives advice on how to implement SEO when creating tutorials and other forms of content for Asyncapi.
---

## What is SEO?

SEO (Search Engine Optimization) refers to the methods and strategies used to enhance the visibility of a website's content in search engine results.

### Why is important in Technical Documentation?

Implementing SEO practices would make it easier for users and others to find them, resulting in more contributions and people to the community.  

### SEO Best Practices  

#### Headings

Headings are tags used to make sub titles distinctive from each other. When it comes to making them SEO-friendly, it's highly recommended to do the following:

- **Put them in hierarchcial order:** Since an `h1` tag tend to be titles, always start with this tag. From there, use `h2` and`h3` tags for the subsections and `h4` and `h5` tags for other sections in yAsyncapi's tutorial or other piece of documentation.
- **Include keywords:** Since sites like Google often use keywords to help people's online content appear on the web, adding these terms effectively is helpful in ensuring that the tutorials and other pieces of content created reach a wider audience. Moz highly recommennds ["implementing keywords in the `h1` and`h2` elements because it is where most users start reading"(Stark Visibility, p.16)](https://starkvisibility.com/wp-content/uploads/2022/04/SEO-Copywriting-101-eBook.pdf)  
- **Use them effectively:** While it is important to use headings in hierachcial order, consider using methods like ["putting one `h2` element in the content sections for easier navigation and readability purposes"(Stark Visibility, p.29)](https://starkvisibility.com/wp-content/uploads/2022/04/SEO-Copywriting-101-eBook.pdf)

Here's an example of SEO-friendly headings:

```md
# Server 
## What is Server?
## What is the purpose of servers?
### Cilent and Server
```
In addition to using keywords, these headings appear in hierarchial order and appear in their respective content once. 

#### Alt Text

Alt text are short descriptions of images used to help Google and people who use screen readers gain a better understanding of Asyncapi's tutorials and other pieces of content. To make them SEO-friendly, it's highly recommended to do the following:

- **Describe the image accurately**:  Doing this would help Asyncapi's users understand how to use Asyncapi in their work.
- **Be concise**: While accuracy is important, avoid writing every single detail about the image.
- **Use keywords strategically**: Avoid adding every single keyword to the image's alt text. It can overwhelm Google's search engine.

Here's an example of effective alternative text:

```html
alt="Diagram of EDAs"
```
The above example is not only concise, but also uses keywords (EDAs) and accurately describes the image used in the tutorial. 
#### URLs

URLs are addresses to webpages and other forms of online content. In the context of SEO, they help make it easier for users to gain access content. To make them SEO-friendly, use the following methods:

- **Make them short:** It'll make the links easier for users to comprehend and find the needed tutorial on Asyncapi's website.
- **Use keywords**: Like alt text, effectively adding keywords in the URL would make it easier for Google to find them.
- **Avoid using special characters and spaces:** Use hyphens (-) instead of underscores (_) to separate words in URLs, as search engines treat hyphens as space.

Here are some examples of SEO-friendly URLs from Asyncapi's documentation:

- `https://www.asyncapi.com/docs/concepts/application`
- `https://www.asyncapi.com/docs/concepts/server`
- `https://www.asyncapi.com/docs/concepts/message`

In addition to being short, these examples clearly mentions the titles for Asyncapi's content buckets, no hyphens nor special characters and spaces.

#### Anchor Text

While URLs help users lead people to Asyncapi's content, their anchor texts are the phrases that introduces users to them. Here are some tips to make them SEO-friendly:

- **Implement SEO keywords:**  Be descriptive yet mindful of the amount of keywords being used to avoid overwhelming the search engine.
- **Consider the audience's needs**:  Think about what the user might be looking for in Asyncapi's documentation and make sure the anchor text reflects this.
- **Maintain the text**: Asyncapi is constantly evolving so it's crucial to update the anchor text to suit the documentation's updates.

Here are some examples of SEO-friendly anchor texts from Asyncapi's documentation:

- `[OpenAPI (aka Swagger)](https://github.com/OAI/OpenAPI-Specification)`
- `[`Server Object`](https://www.asyncapi.com/docs/reference/specification/latest#serverobject)`
- `["the many meanings of Event-Driven Architecture"](https://www.youtube.com/watch?v=STKCRSUsyP0)`

These links include relevant keywords such as "OpenAPI(aka Swagger)", "Server Object", and "the many meanings of Event-Driven Architecture", which accurately describes the content they are linked to.

## Creating High-quality Content 
<!-- add tips here -->
