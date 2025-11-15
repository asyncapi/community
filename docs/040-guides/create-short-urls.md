---
title: Create Short URLs for the AsyncAPI Website
description: Learn how to create short, memorable redirect links for the AsyncAPI website using the Netlify-powered `_redirects` file.
weight: 10
---

## Introduction

Short URLs make it easier for users to access commonly shared AsyncAPI resources (e.g., `asyncapi.com/slack` instead of long invite links). To avoid conflicts with existing routes (like `/docs`, `/community`, etc.), all short URLs **must use the `/s/` path prefix**. These short links are powered by Netlify server-side redirects using the `_redirects` file, ensuring fast, reliable, and CDN-level redirection.

> The `_redirects` file already exists in the AsyncAPI website repository under `public/_redirects`.

## Understanding the `_redirects` file

The `_redirects` file is a plain text file that defines redirect rules for the AsyncAPI website. Netlify uses this file during deployment and applies the redirects at the CDN (edge) level, meaning the redirect occurs **before the page loads**, ensuring high performance and a better user experience.

### File Location

For the AsyncAPI website, the `_redirects` file is located at:

```text
public/_redirects
```

### How Redirects Are Processed

Netlify reads the `_redirects` file **top to bottom**, and applies the **first matching rule**. Because of this, **the order of rules matters**.

## Defining a Short URL Rule

Each short URL **must begin with `/s/`** to ensure there is no conflict with existing site paths. Write each redirect rule on a single line, with space-separated values:

```text
/s/short-path   https://destination.url   status
```

### Which Status Code to Use?

- **301 (Permanent):** Use when the short link is intended to remain unchanged.
- **302 (Temporary):** Use when the short link may change in the future.

#### Examples

```text
/s/slack-invite   https://asyncapi.com/slack   302
/s/modelina       /tools/modelina              301
/s/github         https://github.com/asyncapi  301
```

## Steps to Add a New Short URL

Follow these steps to add a new redirect rule for the AsyncAPI website:

### Step 1: Open the `_redirects` file

Navigate to the `public/_redirects` file in the AsyncAPI website repository.

### Step 2: Add your redirect rule

Add a new redirect rule on a separate line.  
You may include a comment above the rule for clarity:

```text
# Permanent redirect to the main Studio app
/s/studio   https://studio.asyncapi.com/   301
```

### Step 3: Commit and create a Pull Request

- Commit the updated `_redirects` file to your branch.
- Push your changes to GitHub.
- Raise a Pull Request.
- Deploy Preview will be generated for the PR use it to validate your redirect.

### Step 4: Document the change in the PR

In your PR description, mention:

- The added short URL path
- Destination URL
- Why the short link was needed

This ensures reviewers understand the context and purpose of the redirect.

---

By following this guide, you help maintain consistency and improve navigation for the AsyncAPI community through clean, memorable short URLs using the `/s/` path.
