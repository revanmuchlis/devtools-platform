/**
 * DevForge - Code Formatters (HTML, XML, SQL, CSS, JS) - 100% Client-Side Pure JS
 */

export const codeFormatters = {
  // ==========================================
  // HTML Formatter & Minifier
  // ==========================================
  formatHtml(html, indentSize = 2) {
    if (!html.trim()) return '';
    const indentStr = indentSize === 'tab' ? '\t' : ' '.repeat(Number(indentSize));
    let formatted = '';
    let indent = 0;
    
    // Clean whitespace between tags
    const cleanHtml = html.replace(/>\s+</g, '><').trim();
    const tokens = cleanHtml.split(/(<[^>]+>)/g).filter(Boolean);

    const voidTags = new Set([
      'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 
      'link', 'meta', 'param', 'source', 'track', 'wbr', '!doctype'
    ]);

    tokens.forEach(token => {
      if (token.startsWith('</')) {
        // Closing tag
        indent = Math.max(0, indent - 1);
        formatted += indentStr.repeat(indent) + token + '\n';
      } else if (token.startsWith('<') && !token.startsWith('<!')) {
        const tagName = token.match(/<([a-zA-Z0-9\-]+)/)?.[1]?.toLowerCase();
        const isSelfClosing = token.endsWith('/>') || voidTags.has(tagName);

        formatted += indentStr.repeat(indent) + token + '\n';
        if (!isSelfClosing) {
          indent++;
        }
      } else if (token.startsWith('<!')) {
        formatted += indentStr.repeat(indent) + token + '\n';
      } else {
        // Text content
        const text = token.trim();
        if (text) {
          formatted += indentStr.repeat(indent) + text + '\n';
        }
      }
    });

    return formatted.trim();
  },

  minifyHtml(html) {
    return html
      .replace(/<!--[\s\S]*?-->/g, '') // remove comments
      .replace(/\s+/g, ' ')            // collapse multiple spaces
      .replace(/>\s+</g, '><')         // remove space between tags
      .trim();
  },

  // ==========================================
  // XML Formatter & Validator
  // ==========================================
  formatXml(xml, indentSize = 2) {
    if (!xml.trim()) return { success: false, error: 'Empty XML input' };
    const validation = this.validateXml(xml);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const indentStr = indentSize === 'tab' ? '\t' : ' '.repeat(Number(indentSize));
    let formatted = '';
    let indent = 0;
    const cleanXml = xml.replace(/>\s+</g, '><').trim();
    const tokens = cleanXml.split(/(<[^>]+>)/g).filter(Boolean);

    tokens.forEach(token => {
      if (token.startsWith('</')) {
        indent = Math.max(0, indent - 1);
        formatted += indentStr.repeat(indent) + token + '\n';
      } else if (token.startsWith('<?') || token.startsWith('<!')) {
        formatted += indentStr.repeat(indent) + token + '\n';
      } else if (token.startsWith('<')) {
        const isSelfClosing = token.endsWith('/>');
        formatted += indentStr.repeat(indent) + token + '\n';
        if (!isSelfClosing) {
          indent++;
        }
      } else {
        const text = token.trim();
        if (text) {
          formatted += indentStr.repeat(indent) + text + '\n';
        }
      }
    });

    return { success: true, result: formatted.trim() };
  },

  validateXml(xml) {
    if (!xml.trim()) return { valid: false, error: 'XML is empty' };
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'application/xml');
    const parserError = xmlDoc.querySelector('parsererror');

    if (parserError) {
      return { valid: false, error: parserError.textContent.trim() };
    }
    return { valid: true, message: 'XML is well-formed and syntactically valid.' };
  },

  minifyXml(xml) {
    return xml
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/>\s+</g, '><')
      .trim();
  },

  // ==========================================
  // SQL Formatter
  // ==========================================
  formatSql(sql, uppercaseKeywords = true, indentSize = 2) {
    if (!sql.trim()) return '';
    const indentStr = indentSize === 'tab' ? '\t' : ' '.repeat(Number(indentSize));

    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 
      'HAVING', 'LIMIT', 'OFFSET', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 
      'INNER JOIN', 'OUTER JOIN', 'CROSS JOIN', 'ON', 'INSERT INTO', 
      'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE TABLE', 'ALTER TABLE', 
      'DROP TABLE', 'UNION', 'UNION ALL', 'CASE', 'WHEN', 'THEN', 'ELSE', 
      'END', 'AS', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'IN', 
      'NOT IN', 'LIKE', 'BETWEEN', 'IS NULL', 'IS NOT NULL', 'EXISTS'
    ];

    const majorClauses = [
      'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 
      'LIMIT', 'OFFSET', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 
      'OUTER JOIN', 'JOIN', 'SET', 'VALUES'
    ];

    // Normalize spacing
    let formatted = sql.replace(/\s+/g, ' ').trim();

    // Uppercase all keywords
    if (uppercaseKeywords) {
      keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'gi');
        formatted = formatted.replace(regex, kw);
      });
    }

    // Insert newlines before major clauses
    majorClauses.forEach(clause => {
      const regex = new RegExp(`\\s+(${clause})\\b`, 'gi');
      formatted = formatted.replace(regex, `\n$1`);
    });

    // Indent subclauses like AND, OR, ON
    formatted = formatted.replace(/\s+(AND|OR|ON)\b/gi, `\n${indentStr}$1`);

    // Format comma separated columns in SELECT
    const lines = formatted.split('\n');
    const resultLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('SELECT ')) {
        const rest = trimmed.substring(7);
        const cols = rest.split(',').map(c => `${indentStr}${c.trim()}`);
        return `SELECT\n${cols.join(',\n')}`;
      }
      return line;
    });

    return resultLines.join('\n');
  },

  // ==========================================
  // CSS Beautifier & Minifier
  // ==========================================
  formatCss(css, indentSize = 2) {
    if (!css.trim()) return '';
    const indentStr = indentSize === 'tab' ? '\t' : ' '.repeat(Number(indentSize));
    let clean = css
      .replace(/\s+/g, ' ')
      .replace(/\{\s*/g, ' {\n')
      .replace(/;\s*/g, ';\n')
      .replace(/\}\s*/g, '\n}\n')
      .replace(/\s*:\s*/g, ': ');

    const lines = clean.split('\n');
    let indent = 0;
    const result = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;
      if (trimmed.includes('}')) indent = Math.max(0, indent - 1);
      result.push(indentStr.repeat(indent) + trimmed);
      if (trimmed.includes('{')) indent++;
    });

    return result.join('\n');
  },

  minifyCss(css) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
      .replace(/\s+/g, ' ')
      .replace(/\s*([\{\}:;,])\s*/g, '$1')
      .replace(/;}/g, '}')
      .trim();
  },

  // ==========================================
  // JavaScript Beautifier & Minifier
  // ==========================================
  formatJs(js, indentSize = 2) {
    if (!js.trim()) return '';
    const indentStr = indentSize === 'tab' ? '\t' : ' '.repeat(Number(indentSize));
    let clean = js
      .replace(/\{\s*/g, ' {\n')
      .replace(/;\s*/g, ';\n')
      .replace(/\}\s*/g, '\n}\n');

    const lines = clean.split('\n');
    let indent = 0;
    const result = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;
      if (trimmed.startsWith('}')) indent = Math.max(0, indent - 1);
      result.push(indentStr.repeat(indent) + trimmed);
      if (trimmed.endsWith('{')) indent++;
    });

    return result.join('\n');
  },

  minifyJs(js) {
    return js
      .replace(/\/\*[\s\S]*?\*\//g, '')     // multi-line comments
      .replace(/\/\/[^\n\r]*/g, '')          // single-line comments
      .replace(/\s+/g, ' ')
      .replace(/\s*([\{\}\(\)\[\]=;:,\+\-\*\/])\s*/g, '$1')
      .trim();
  }
};
