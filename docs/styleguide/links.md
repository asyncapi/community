---
title: Links
description: This style guide gives advice on creating effective internal, external, and asset links in AsyncAPI content.
weight: 130
---



Links serve as pathways through resources referenced in AsyncAPI's content, and their design directly impacts how users navigate and engage with it.

## Text Links

Here are some ways to effectively design links when referencing sources in a tutorial, blog post, or making an update to AsyncAPI's documentation:

- **Use clear and concise link text**: Make sure the link text accurately describes the destination or action, so users know what to expect when clicking.
- **Be descriptive**: Using common phrases like "Click Here" or "Read More" makes it harder for users, especially those who use screen readers to navigate the web, to understand what will happen
- **Be Relevant**:  It's best to ensure that the link's text describes the source in a way that connects to the content's topic. This helps users gain a better understanding of the material they are reading.
- **Be Unique**: Avoid using the same text for sources' links. help screen reader users distinguish between different navigation options and prevent confusion for all readers.

## Asset Links

Consider using the following tips to format links for files, images, and other forms of multimedia in AsyncAPI's content:

- **Use relative paths**: This will make it easier for readers to quick access the image or source embedded in the repository.
- **Use recent version files**:  Check to see if assets being used in the content are up-to-date. This ensures that readers get the correct information.
- **Use meaningful names for files**:  Make sure the file names for assets correspond to what they describe. This makes the tutorial, blog post, or documentation-related update more accessible, especially for users who use screen readers to navigate the site.  

## External Links

When referencing sources that will take users outside AsyncAPI, refer to the following tips:

- **Use absolute URLs:** Always include the full URL, starting with `https://`, for external resources.
- **Clearly signal external destinations:** Enhance user awareness by explicitly indicating when a link will take users away from AsyncAPI's website.
- **Provide contextual link anchors:** Embed links within the surrounding sentence or paragraph in a way that naturally describes the external resource. This creates a smoother reading experience and provides immediate context for users.
## Internal Links

When it comes to referring to other sections within the content being created for AsyncAPI, consider using the following methods:

- **Use relative URLs**: Structure internal links with relative paths to maintain functionality when documentation is moved or deployed to different environments.
- **Maintain consistency**: Use similar patterns for internal navigation to help users build a mental model of the documentation structure.
- **Consider anchor links**: For lengthy pages, use anchor links to direct users to specific sections rather than forcing them to scroll through content.
## Examples

### Sample of a Text Link

```markdown
For more information, visit the [AsyncAPI website](https://www.asyncapi.com).
```

### Example of an Asset Link

```markdown
![AsyncAPI Logo](../assets/asyncapi-logo.png)
```

### Example of an Internal Link


## Additional Resources

 For more tips on creating effective links, consider consulting the following sources:

- [Creating Links](https://anvilproject.org/guides/content/creating-links)
- [Markdown Hacks: Link Targets](https://www.markdownguide.org/hacks/#link-targets)
- [Mastering Markdown: Your Ultimate Guide to Creating Links](https://www.devzery.com/post/mastering-markdown-your-ultimate-guide-to-creating-links)
