---
title: SEO
description: This guide gives advice on how to implement SEO when creating tutorials and other forms of content for Asyncapi.
---

## What is SEO?

SEO (Search Engine Optimization) refers to the methods and strategies used to enhance the visibility of a website's content in search engine results.

## Why is SEO important in technical documentation?

Implementing SEO practices would make it easier for users and others to find them, resulting in more contributions and people to the community.  

## SEO best practices  

### What are headings?

Headings are tags used to make sub titles distinctive from each other.

#### Strategies for making SEO-friendly headings

- **Put them in hierarchcial order:** Since an `h1` tag tend to be titles, always start with this tag. From there, use `h2` and`h3` tags for the subsections and `h4` and `h5` tags for other sections in yAsyncapi's tutorial or other piece of documentation.
- **Include keywords:** Since sites like Google often use keywords to help people's online content appear on the web, adding these terms effectively is helpful in ensuring that the tutorials and other pieces of content created reach a wider audience. Moz highly recommennds ["implementing keywords in the `h1` and`h2` elements because it is where most users start reading"(Stark Visibility, p.16)](https://starkvisibility.com/wp-content/uploads/2022/04/SEO-Copywriting-101-eBook.pdf)  

### Examples of SEO-friendly headings from Asyncapi's documentation

```md
# Server
## What is Server?
## What is the purpose of servers?
### Client and Server
```

### What are URLS?

URLs are addresses to webpages and other forms of online content. In the context of SEO, they help make it easier for users to gain access content.

#### Strategies for making SEO-friendly URLs

- **Make them short:** It'll make the links easier for users to comprehend and find the needed tutorial on Asyncapi's website.
- **Use keywords**: Like alt text, effectively adding keywords in the URL would make it easier for Google to find them.
- **Avoid using special characters and spaces:** Use hyphens (-) instead of underscores (_) to separate words in URLs, as search engines treat hyphens as space.

Here are some examples of SEO-friendly URLs from Asyncapi's documentation:

- `https://www.asyncapi.com/docs/concepts/application`
- `https://www.asyncapi.com/docs/concepts/server`
- `https://www.asyncapi.com/docs/concepts/message`

In addition to being short, these examples clearly mentions the titles for Asyncapi's content buckets, no hyphens nor special characters and spaces.

### What is Anchor Text?

 Anchor texts are the phrases that describe a webpage's URL. They give users an idea what to expect before actually reading the content.

#### Strategies for making SEO-friendly anchor texts

- **Implement SEO keywords:**  Be descriptive yet mindful of the amount of keywords being used to avoid overwhelming the search engine.
- **Consider the audience's needs**:  Think about what the user might be looking for in Asyncapi's documentation and make sure the anchor text reflects this.
- **Maintain the text**: Asyncapi is constantly evolving so it's crucial to update the anchor text to suit the documentation's updates.

### Examples of SEO-friendly anchor texts from Asyncapi's documentation

- [OpenAPI (aka Swagger)](https://github.com/OAI/OpenAPI-Specification)
- [Server Object](https://www.asyncapi.com/docs/reference/specification/latest#serverobject)
- ["The many meanings of Event-Driven Architecture"](https://www.youtube.com/watch?v=STKCRSUsyP0)

These links include relevant keywords such as "OpenAPI(aka Swagger)", "Server Object", and "the many meanings of Event-Driven Architecture", which accurately describes the content they are linked to.

### What is Internal Linking?

Internal linking is the process of enclosing links to certain sections of a blog post or tutorial in brackets and placing them next to the headings and title. This makes it easier for users to navigate through Asyncapi's content.

#### Strategies for making SEO-friendly internal links

- **Develop a internal link structure**: Consider deciding the types of internal links to use when writing a blog post or documentation for Asyncapi. Doing so would help increase the chances of the content appear in the search results. To learn more about the different styles of internal links, check out the [Types of Internal Links section in "Internal Links for SEO: An Actionable Guide"](https://ahrefs.com/blog/internal-links-for-seo/#types-of-internal-links).
- **Create unique anchor texts:** It's best to avoid using the same anchor text when linking pages so that users won't be confused as they read the content on Asyncapi's website.
- **Include keywords in your anchor text**: This will ensure that the search engine can view the webpage's content.

### Examples of SEO-friendly anchor texts from Asyncapi's website

- "In this case, in your AsyncAPI file, you describe the `server`, and therefore the [Server Object](https://www.asyncapi.com/docs/reference/specification/latest#serverObject) holds information about the actual server, including its physical location."
- "JSON Schema Draft 07 is 100% compatible with AsyncAPI schemas. You can also use other standards to describe payload schema, such as [Avro](https://github.com/asyncapi/avro-schema-parser#usage)."
- "Furthermore, the [Pub/sub](/docs/tutorials/getting-started/event-driven-architectures#publishersubscriber) is appealing for IoT use cases due to two key features: support for flexible coupling between publishers/subscribers and inherent support for point-to-multipoint transmission."  

### What are meta descriptions?

Meta descriptions are typically ["snippets of HTML code that are placed in a web page's header"](https://www.techtarget.com/whatis/definition/meta-description-tag). They appear under the title in the search results on Google and can significantly impact click-through rates.

>[!NOTE]
> In the case of Asyncapi's documentation, meta descriptions are written in YAML

#### Strategies for making SEO-friendly meta descriptions

- **Make them unique:** Meta descriptions that are identical to each other would make it difficult for the content to appear in the search results.
- **Be descriptive** Since this information does not appear in webpages, add enough detail to the content's meta descriptions. It is highly recommended "to keep these descriptions within a range of ["150-300 characters"](https://docs.readthedocs.io/en/stable/guides/technical-docs-seo-guide.html).
- **Be accurate**: Ensure that the meta description includes information that correlates to the blog post or tutorial's topic. Doing so helps its meta description appear in the search engine's results.

### Examples of SEO-friendly meta descriptions from Asyncapi's website

- `title: Kafka bindings
description: Learn how to configure Kafka bindings in your AsyncAPI document.`
- `title: "Validate AsyncAPI documents"
description: In this guide, you'll learn multiple ways to validate AsyncAPI documents.`
- `title: Generate code
description: In this tutorial, you'll learn how to generate code from your AsyncAPI document.`

In addition to having information that correlate to the content's topic, these meta descriptions are concise and contain keywords.

### Why mobile-friendliness important to technical documentation when making it SEO-friendly?

Whether it's on a tablet, smartphone, or computer, [people consume most online content on these devices](https://blog.google/products/marketingplatform/analytics/mobile-challenge-and-how-measure-it/). Also, making Asyncapi's content mobile-friendly would bring more users to the site as ["users are more likely to return to and have a high opinion of a product if it's website is mobile-friendly"](https://www.webfx.com/blog/web-design/user-experience-matters-marketing/). Lastly, mobile SEO-friendly technical documentation appears more in search results.

#### Strategies for making mobile and SEO-friendly content

Here are some ways to make blog posts and documentation for Asyncapi's website mobile and SEO-friendly.

- **Use smaller images and videos**: Large images and videos can cause the documentation on Asyncapi's website to appear at slower rates, which create an unpleasant user-experience.

- **Use mobile-friendly font**: Some fonts can be hard to read on mobile devices, so it's crucial to picks font styles and sizes that can be adaptable to their screen sizes. It highly recommended to use styles like ["Arial, Tahoma, Verdana for headings and Times New Roman, Georgia, Bookman for body text"](https://clickhelp.com/clickhelp-technical-writing-blog/choosing-fonts-for-technical-documentation/) and sizes like ["14-16 point font for headings and 12-point for body text"](https://clickhelp.com/clickhelp-technical-writing-blog/choosing-fonts-for-technical-documentation/).
- **Give each topic its own page and/or section**: Consider putting a link to the next page or implementing internal links. It'll help users the project's docs and blog post have an easier time navigating the site.

>[!TIP]
> Consider using testing tools like [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) to ensure that the proposed blog post, tutorial, or other form of documentation for  Asyncapi is mobile and SEO-friendly if quick results are needed.  

### Examples of SEO and mobile-friendly content from Asyncapi's website

<!-- add examples here -->

### Why is quality important when making technical documentation that is SEO-friendly?
 <!--add explaination here  -->

#### Strategies for making high-quality and SEO-friendly content
<!-- add tips here -->

### Examples of high-quality and SEO-friendly content from Asyncapi's website
<!-- add list of examples -->