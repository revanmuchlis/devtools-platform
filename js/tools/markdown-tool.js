/**
 * DevForge - Markdown to HTML Live Previewer - 100% Client-Side Pure JS
 */

export const markdownTool = {
  render(md) {
    if (!md) return '';
    
    let html = md
      // Escape HTML entities to prevent injection
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Fenced Code Blocks
    html = html.replace(/```([a-zA-Z0-9_\-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre><code class="language-${lang || 'plaintext'}">${code.trim()}</code></pre>`;
    });

    // Inline Code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Blockquotes
    html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Bold & Italics
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

    // Links & Images
    html = html.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%; border-radius:6px;" />');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Unordered Lists
    html = html.replace(/^\s*[\-\*]\s+(.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');

    // Paragraphs (lines separated by double newlines)
    const lines = html.split(/\n{2,}/);
    const formatted = lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<h') || 
          trimmed.startsWith('<pre') || 
          trimmed.startsWith('<ul') || 
          trimmed.startsWith('<blockquote') ||
          trimmed.startsWith('<img')) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`;
    }).filter(Boolean).join('\n');

    return formatted;
  },

  getSample() {
    return `# DevForge Markdown Previewer

DevForge is a **100% client-side** developer utility platform.

## Key Features
* Zero server latency & absolute privacy
* JSON, XML, HTML, SQL, CSS Formatters
* Base64, URL & JWT Encoders/Decoders
* Cryptographic Hashes (MD5, SHA-256)

### Sample Code Block
\`\`\`javascript
const devForge = {
  privacy: "100% Client-Side",
  speed: "Instant",
  free: true
};
console.log("Ready:", devForge);
\`\`\`

> "Simplicity and speed are the ultimate developer superpowers."

Check our documentation or [View All Tools](#/).
`;
  }
};
