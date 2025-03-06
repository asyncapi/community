---
title: SEO
description: This guide gives advice on how to implement SEO when creating tutorials and other forms of content for Asyncapi.
---

## What is SEO?

SEO (Search Engine Optimization) refers to the methods and strategies used to enhance the visibility of a website's content in search engine results.

## Why is SEO important in technical documentation?

Implementing SEO practices would make it easier for users and others to find them, resulting in more contributions and people in the community.  

## SEO best practices  

### What are headings?

Headings are tags used to make subtitles distinctive from each other.

#### Strategies for making SEO-friendly headings

- **Put them in hierarchical order:** Since an `h1` tag tends to be titles, always start with this tag. From there, use `h2` and `h3` tags for the subsections and `h4` and `h5` tags for other sections in Asyncapi's tutorial or another piece of documentation.
- **Use relevant keywords:** Since sites like Google often use keywords to help people's online content appear on the web, adding these terms effectively helps ensure that the tutorials and other pieces of content created reach a wider audience. It is highly recommended to [implement keywords in the `h1` and`h2` elements because it is where most users start reading"(Stark Visibility, p.16)](https://starkvisibility.com/wp-content/uploads/2022/04/SEO-Copywriting-101-eBook.pdf)  

### Examples of SEO-friendly headings from AsyncAPI's documentation

```md
# Server
## What is a Server?
## What is the purpose of servers?
### Client and Server
```

### What are URLS?

URLs are addresses to webpages and other forms of online content. In the context of SEO, they help make it easier for users to gain access to content.

#### Strategies for making SEO-friendly URLs

- **Make them short:** It'll make the links easier for users to comprehend and find the needed tutorial on Asyncapi's website.
- **Use keywords**: Like alt text, effectively adding keywords in the URL would make it easier for Google to find them.
- **Avoid using special characters and spaces:** Use hyphens (-) instead of underscores (_) to separate words in URLs, as search engines treat hyphens as spaces.

Here are some examples of SEO-friendly URLs from AsyncAPI's documentation:

- `https://www.asyncapi.com/docs/concepts/application`
- `https://www.asyncapi.com/docs/concepts/server`
- `https://www.asyncapi.com/docs/concepts/message`

In addition to being short, these examples mention the titles for AsyncAPI's content buckets with no hyphens, special characters, or spaces.

### What is Anchor Text?

 Anchor texts are the phrases that describe a webpage's URL. They give users an idea of what to expect before reading the content.

#### Strategies for making SEO-friendly anchor texts

- **Implement SEO keywords:**  Be descriptive yet mindful of the number of keywords used to avoid overwhelming the search engine.
- **Consider the audience's needs**:  Consider what the user might look for in AsyncAPI's documentation and ensure the anchor text reflects this.
- **Maintain the text**: AsyncAPI is constantly evolving, so updating the anchor text to suit the documentation's updates is crucial.

### Examples of SEO-friendly anchor texts from AsyncAPI's documentation

- [AsyncAPI](https://github.com/asyncapi)
- [Server Object](https://www.asyncapi.com/docs/reference/specification/latest#serverobject)
- ["The many meanings of Event-Driven Architecture"](https://www.youtube.com/watch?v=STKCRSUsyP0)

These links include relevant keywords such as "AsyncAPI", "Server Object", and "the many meanings of Event-Driven Architecture", which accurately describe the content they are linked to.

### What is Internal Linking?

Internal linking is the process of enclosing links to certain sections of a blog post or tutorial in brackets and placing them next to the headings and title. This makes it easier for users to navigate through AsyncAPI's content.

#### Strategies for making SEO-friendly internal links

- **Develop an internal link structure**: Consider deciding the types of internal links to use when writing a blog post or documentation for AsyncAPI. Doing so would help increase the chances of the content appearing in the search results. To learn more about the different styles of internal links, check out the [Types of Internal Links section in "Internal Links for SEO: An Actionable Guide"](https://ahrefs.com/blog/internal-links-for-seo/#types-of-internal-links).
- **Create unique anchor texts:** It's best to avoid using the same anchor text when linking pages so that users won't be confused as they read the content on Asyncapi's website.
- **Include keywords in your anchor text**: This will ensure the search engine can view the webpage's content.

### Examples of SEO-friendly anchor texts from AsyncAPI's website

- "In this case, in your AsyncAPI file, you describe the `server`, and therefore, the [Server Object](https://www.asyncapi.com/docs/reference/specification/latest#serverObject) holds information about the actual server, including its physical location."
- "JSON Schema Draft 07 is 100% compatible with AsyncAPI schemas. You can also use other standards to describe payload schema, such as [Avro](https://github.com/asyncapi/avro-schema-parser#usage)."
- "Furthermore, the [Pub/sub](/docs/tutorials/getting-started/event-driven-architectures#publishersubscriber) is appealing for IoT use cases due to two key features: support for flexible coupling between publishers/subscribers and inherent support for point-to-multipoint transmission."  

### What are meta descriptions?

Meta descriptions are typically ["snippets of HTML code that are placed in a web page's header"](https://www.techtarget.com/whatis/definition/meta-description-tag). They appear under the title in the search results on Google and can significantly impact click-through rates.

>[!NOTE]
> In the case of AsyncAPI's documentation, meta descriptions are written in YAML.

#### Strategies for making SEO-friendly meta descriptions

- **Make them unique:** Identical Meta descriptions would make it difficult for the content to appear in the search results.
- **Be descriptive** Since this information does not appear on webpages, add enough detail to the content's meta descriptions. It is highly recommended "to keep these descriptions within a range of ["150-300 characters"](https://docs.readthedocs.io/en/stable/guides/technical-docs-seo-guide.html).
- **Be accurate**: Ensure the meta description includes information correlating to the blog post or tutorial's topic. Doing so helps its meta description appear in the search engine's results.

### Examples of SEO-friendly meta descriptions from AsyncAPI's website

- `title: Kafka bindings
description: Learn how to configure Kafka bindings in your AsyncAPI document.`
- `title: "Validate AsyncAPI documents"
description: In this guide, you'll learn multiple ways to validate AsyncAPI documents.`
- `title: Generate code
description: In this tutorial, you'll learn how to generate code from your AsyncAPI document.`

In addition to having information that correlates to the content's topic, these meta descriptions are concise and contain keywords.

### Why is  mobile-friendliness important to technical documentation when making it SEO-friendly?

Whether it's on a tablet, smartphone, or computer, [people consume most online content on these devices](https://blog.google/products/marketingplatform/analytics/mobile-challenge-and-how-measure-it/). Also, making AsyncAPI's content mobile-friendly would bring more users to the site as ["users are more likely to return to and have a high opinion of a product if it's website is mobile-friendly"](https://www.webfx.com/blog/web-design/user-experience-matters-marketing/). Lastly, mobile SEO-friendly technical documentation appears more in search results.

#### Strategies for making mobile and SEO-friendly content

Here are some ways to make blog posts and documentation for AsyncAPI's website mobile and SEO-friendly.

- **Use smaller images and videos**: Large images and videos can cause the documentation on Asyncapi's website to appear at slower rates, which creates an unpleasant user experience.

- **Use mobile-friendly fonts**: Some fonts can be hard to read on mobile devices, so it's crucial to pick font styles and sizes that can be adaptable to their screen sizes. It highly recommended to use styles like ["Arial, Tahoma, and Verdana for headings. For text, it is best to use Times New Roman, Georgia, and  Bookman"](https://clickhelp.com/clickhelp-technical-writing-blog/choosing-fonts-for-technical-documentation/). For sizes, it's best to use ["14-16 point font for headings and 12-point for body text"](https://clickhelp.com/clickhelp-technical-writing-blog/choosing-fonts-for-technical-documentation/).
- **Give each topic its page and/or section**: Consider putting a link to the next page or implementing internal links. It'll help users the project's docs and blog post have an easier time navigating the site.

>[!TIP]
> Need quicker results? Consider using testing tools like [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) to ensure the proposed blog post, tutorial, or update to AsyncAPI's documentation  is mobile and SEO-friendly.

### Why is quality important when making technical documentation that is SEO-friendly?

Search engines tend to favor content that provides value for online users. Therefore, it's important to ensure that the content is high-quality.

#### Strategies for making high-quality and SEO-friendly content

When writing a post for AsyncAPI's blog or contributing to its documentation, consider asking the following questions to ensure it is high-quality and SEO-friendly:

- Is the content interactive and engaging?
- Is the information presented accurate?
- Is the content too technical for its intended audience?

### Images

The way technical documentation images are presented influences how they appear in a search engine's rankings, so optimizing them in the best way possible is important.

### Strategies for making images SEO-friendly

To make SEO-friendly images, it is recommended to use the following methods:

- **Create descriptive alt text**: Ensure that it describes the image's context and purpose. Doing so makes it easier for search engines to understand why it is being used, [especially when the image fails to appear on screen](https://rb.gy/5axft9).  
- **Use search-engine supported image formats**: [`JPEG`, `SVG`, and `PNG`](https://developers.google.com/search/docs/appearance/google-images#supported-image-formats) are the common formats that appear in Google's search rankings, so consider saving the images in these formats.
- **Be mindful of the images' file size**: [Large image file sizes can make cause the site to load slowly](https://developers.google.com/search/docs/appearance/google-images#good-quality-photos-optimize-for-speed) so reduce and compress them before adding them to the documentation or blog post.
