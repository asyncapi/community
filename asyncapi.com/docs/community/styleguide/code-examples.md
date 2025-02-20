# Code Examples

## Including Comments Explaining Each Line of Code

When including code examples in your documentation, it is important to provide comments that explain each line of code. This helps readers understand the purpose and functionality of the code. Here are some guidelines for including comments:

1. Use clear and concise comments to explain the purpose of each line or block of code.
2. Avoid redundant comments that simply restate the code.
3. Use comments to provide additional context or explanations for complex or non-obvious code.
4. Ensure that comments are up-to-date and reflect any changes made to the code.

Example:

```javascript
// Create a new instance of the AsyncAPI client
const client = new AsyncAPIClient();

// Connect to the server
client.connect('wss://example.com');

// Subscribe to a topic
client.subscribe('my-topic', (message) => {
  // Handle incoming messages
  console.log('Received message:', message);
});
```

## Determining Colors and Formatting Applied to Code Blocks

To ensure consistency and readability, it is important to determine the colors and formatting applied to code blocks in your documentation. Here are some guidelines for determining colors and formatting:

1. Use a consistent color scheme for syntax highlighting across all code examples.
2. Choose colors that provide good contrast and are easy to read.
3. Use a monospaced font for code blocks to ensure proper alignment and readability.
4. Apply consistent indentation and spacing to improve code readability.
5. Use appropriate formatting for different programming languages and code styles.

Example:

```css
/* CSS code block with syntax highlighting */
body {
  background-color: #f5f5f5;
  color: #333;
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-size: 24px;
  color: #007bff;
}

p {
  line-height: 1.5;
  margin-bottom: 10px;
}
```
