/**
 * DevForge - JSON Utilities (100% Client-Side Pure JavaScript)
 */

export const jsonTools = {
  format(inputStr, indent = 2) {
    if (!inputStr.trim()) return { success: false, error: 'Input is empty' };
    try {
      const parsed = JSON.parse(inputStr);
      const spaces = indent === 'tab' ? '\t' : Number(indent);
      const formatted = JSON.stringify(parsed, null, spaces);
      return { success: true, result: formatted, data: parsed };
    } catch (err) {
      return { 
        success: false, 
        error: err.message, 
        lineInfo: this.extractLineNumber(inputStr, err.message)
      };
    }
  },

  minify(inputStr) {
    if (!inputStr.trim()) return { success: false, error: 'Input is empty' };
    try {
      const parsed = JSON.parse(inputStr);
      return { success: true, result: JSON.stringify(parsed) };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  validate(inputStr) {
    if (!inputStr.trim()) return { valid: false, message: 'Please enter JSON string to validate' };
    try {
      const parsed = JSON.parse(inputStr);
      const isArray = Array.isArray(parsed);
      const count = isArray ? parsed.length : Object.keys(parsed).length;
      return { 
        valid: true, 
        message: `Valid JSON (${isArray ? 'Array' : 'Object'} with ${count} top-level ${isArray ? 'items' : 'keys'})`,
        data: parsed
      };
    } catch (err) {
      const lineInfo = this.extractLineNumber(inputStr, err.message);
      return { 
        valid: false, 
        message: `Invalid JSON: ${err.message}`, 
        lineInfo 
      };
    }
  },

  escape(inputStr) {
    return JSON.stringify(inputStr);
  },

  unescape(inputStr) {
    try {
      if ((inputStr.startsWith('"') && inputStr.endsWith('"')) || (inputStr.startsWith("'") && inputStr.endsWith("'"))) {
        return JSON.parse(inputStr);
      }
      return inputStr.replace(/\\"/g, '"').replace(/\\\\/g, '\\').replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t');
    } catch (err) {
      return inputStr;
    }
  },

  extractLineNumber(jsonStr, errorMsg) {
    // Attempt to extract position from V8 error e.g. "at position 42 (line 3 column 5)"
    const matchLine = errorMsg.match(/line (\d+) column (\d+)/i);
    if (matchLine) {
      return { line: parseInt(matchLine[1], 10), column: parseInt(matchLine[2], 10) };
    }
    const matchPos = errorMsg.match(/position (\d+)/i);
    if (matchPos) {
      const pos = parseInt(matchPos[1], 10);
      const lines = jsonStr.slice(0, pos).split('\n');
      return { line: lines.length, column: lines[lines.length - 1].length + 1 };
    }
    return null;
  },

  renderTree(data, container) {
    container.innerHTML = '';
    const rootEl = document.createElement('div');
    rootEl.className = 'json-tree';
    rootEl.appendChild(this.createTreeNode(data, 'root'));
    container.appendChild(rootEl);
  },

  createTreeNode(value, key = null) {
    const node = document.createElement('div');
    node.className = 'tree-node';

    const keySpan = key !== null ? `<span class="tree-key">"${key}": </span>` : '';

    if (value === null) {
      node.innerHTML = `${keySpan}<span class="tree-null">null</span>`;
    } else if (typeof value === 'boolean') {
      node.innerHTML = `${keySpan}<span class="tree-boolean">${value}</span>`;
    } else if (typeof value === 'number') {
      node.innerHTML = `${keySpan}<span class="tree-number">${value}</span>`;
    } else if (typeof value === 'string') {
      node.innerHTML = `${keySpan}<span class="tree-string">"${this.escapeHtml(value)}"</span>`;
    } else if (Array.isArray(value)) {
      node.innerHTML = `${keySpan}<span>[</span>`;
      const childrenWrapper = document.createElement('div');
      value.forEach((item, idx) => {
        childrenWrapper.appendChild(this.createTreeNode(item, idx));
      });
      node.appendChild(childrenWrapper);
      const closeSpan = document.createElement('div');
      closeSpan.textContent = ']';
      node.appendChild(closeSpan);
    } else if (typeof value === 'object') {
      node.innerHTML = `${keySpan}<span>{</span>`;
      const childrenWrapper = document.createElement('div');
      Object.entries(value).forEach(([k, v]) => {
        childrenWrapper.appendChild(this.createTreeNode(v, k));
      });
      node.appendChild(childrenWrapper);
      const closeSpan = document.createElement('div');
      closeSpan.textContent = '}';
      node.appendChild(closeSpan);
    }

    return node;
  },

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },

  getSample() {
    return JSON.stringify({
      appName: "DevForge",
      version: "2.5.0",
      isClientSide: true,
      features: [
        "Zero API Dependencies",
        "GDPR & CCPA Compliant",
        "High Performance Web Workers",
        "Instant Ctrl+K Navigation"
      ],
      developer: {
        company: "Antigravity Dev Labs",
        location: "Jakarta, Indonesia",
        openSource: true
      },
      metrics: {
        activeTools: 16,
        latencyMs: 0.8,
        privacyRating: "A+"
      }
    }, null, 2);
  }
};
