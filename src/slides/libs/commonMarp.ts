export const commonMarpHeader = `
---
marp: true
theme: {{theme}}
{{#if useLeadClass}}
_class: lead
{{/if}}
paginate: true
{{#if headerLocation}}header: {{headerLocation}}{{/if}}
{{#if footerLocation}}footer: {{footerLocation}}{{/if}}
---
{{#if hasTitleClass}}
<!-- _class: title -->
{{/if}}
# {{title}}

{{#if description}}
{{description}}
{{/if}}
`.trim();

export const commonExampleBody = `
## Heading 2

- {{themeDescription}}

{{#if hasInvertClass}}

---

<!-- _class: invert -->

## Inverted Color Scheme

- Use \`<!-- _class: invert -->\` for dark mode slides.
- Makes content stand out.
- Useful for contrasting sections.

{{/if}}

{{#if hasTinyTextClass}}

---

<!-- _class: tinytext -->

# Tiny Text Slide

- \`<!-- _class: tinytext -->\` makes slide text smaller.
- Ideal for references, footnotes, or legal notes.

{{/if}}

---

## Code Blocks

### Multi-line Code Block (Python)

\`\`\`python
print("This is a code block")
print("Use triple backticks to create multi-line code")
\`\`\`

### Another Example (C)

\`\`\`c
printf("This is another code block");
\`\`\`

---

### Inline Code Blocks

- \`this\` is an inline code block
- Wrap any short code with single backticks like this: \`inline\`

---

## Creating New Slides

- Separate slides using three dashes:

\`\`\`
---

# New Slide
\`\`\`

---

# Conclusion

- You can use **bold**, *italic*, and ~~strikethrough~~
> This is a blockquote
This is regular text.
`.trim();
