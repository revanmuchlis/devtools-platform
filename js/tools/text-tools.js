/**
 * DevForge - Text Utilities (Case Converter, Diff Checker, Regex Tester, Lorem Ipsum)
 */

export const textTools = {
  // ==========================================
  // Text Case Converter
  // ==========================================
  convertCase(str, targetCase) {
    if (!str) return '';

    // Tokenize words
    const words = str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[\-_]/g, ' ')
      .replace(/[^\w\s]/g, '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length === 0) return '';

    switch (targetCase) {
      case 'lowercase':
        return str.toLowerCase();

      case 'uppercase':
        return str.toUpperCase();

      case 'camelCase':
        return words.map((w, idx) => {
          const lower = w.toLowerCase();
          return idx === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
        }).join('');

      case 'pascalCase':
        return words.map(w => {
          const lower = w.toLowerCase();
          return lower.charAt(0).toUpperCase() + lower.slice(1);
        }).join('');

      case 'snake_case':
      case 'snake-case':
        return words.map(w => w.toLowerCase()).join('_');

      case 'constant_case':
      case 'constant-case':
        return words.map(w => w.toUpperCase()).join('_');

      case 'kebab_case':
      case 'kebab-case':
        return words.map(w => w.toLowerCase()).join('-');

      case 'titleCase':
        return words.map(w => {
          const lower = w.toLowerCase();
          return lower.charAt(0).toUpperCase() + lower.slice(1);
        }).join(' ');

      case 'sentenceCase':
        return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());

      default:
        return str;
    }
  },

  getTextStats(str) {
    if (!str) return { chars: 0, words: 0, lines: 0, bytes: 0 };
    const chars = str.length;
    const words = str.trim() ? str.trim().split(/\s+/).length : 0;
    const lines = str.split('\n').length;
    const bytes = new TextEncoder().encode(str).length;
    return { chars, words, lines, bytes };
  },

  // ==========================================
  // Line-by-Line Text Diff Checker
  // ==========================================
  diffText(oldText, newText) {
    const oldLines = oldText.split('\n');
    const newLines = newText.split('\n');
    const diff = [];

    let i = 0, j = 0;
    while (i < oldLines.length || j < newLines.length) {
      if (i < oldLines.length && j < newLines.length) {
        if (oldLines[i] === newLines[j]) {
          diff.push({ type: 'unchanged', text: oldLines[i] });
          i++;
          j++;
        } else {
          // Check if old line exists further in new
          const nextInNew = newLines.indexOf(oldLines[i], j);
          const nextInOld = oldLines.indexOf(newLines[j], i);

          if (nextInNew !== -1 && (nextInOld === -1 || nextInNew - j <= nextInOld - i)) {
            diff.push({ type: 'added', text: newLines[j] });
            j++;
          } else {
            diff.push({ type: 'removed', text: oldLines[i] });
            i++;
          }
        }
      } else if (i < oldLines.length) {
        diff.push({ type: 'removed', text: oldLines[i] });
        i++;
      } else if (j < newLines.length) {
        diff.push({ type: 'added', text: newLines[j] });
        j++;
      }
    }

    return diff;
  },

  // ==========================================
  // Regex Tester & Matcher
  // ==========================================
  testRegex(patternStr, flagsStr, testText) {
    if (!patternStr) return { success: false, error: 'Pattern cannot be empty' };
    try {
      const regex = new RegExp(patternStr, flagsStr);
      const matches = [];

      if (flagsStr.includes('g')) {
        let match;
        while ((match = regex.exec(testText)) !== null) {
          matches.push({
            index: match.index,
            text: match[0],
            groups: match.slice(1)
          });
          // Prevent infinite loops with zero-width matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testText);
        if (match) {
          matches.push({
            index: match.index,
            text: match[0],
            groups: match.slice(1)
          });
        }
      }

      return {
        success: true,
        matchCount: matches.length,
        matches
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // ==========================================
  // Lorem Ipsum Generator
  // ==========================================
  generateLorem(count = 3, type = 'paragraphs', htmlWrap = false) {
    const vocab = [
      'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
      'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
      'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
      'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea',
      'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'in',
      'voluptate', 'velit', 'esse', 'cillum', 'eu', 'fugiat', 'nulla', 'pariatur',
      'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in',
      'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ];

    function getRandomWord() {
      return vocab[Math.floor(Math.random() * vocab.length)];
    }

    function createSentence(wordCount = 8) {
      const words = [];
      for (let i = 0; i < wordCount; i++) {
        words.push(getRandomWord());
      }
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      return words.join(' ') + '.';
    }

    function createParagraph(sentenceCount = 5) {
      const sentences = [];
      for (let i = 0; i < sentenceCount; i++) {
        sentences.push(createSentence(Math.floor(Math.random() * 8) + 6));
      }
      return sentences.join(' ');
    }

    let results = [];
    if (type === 'words') {
      for (let i = 0; i < count; i++) results.push(getRandomWord());
      return results.join(' ');
    } else if (type === 'sentences') {
      for (let i = 0; i < count; i++) results.push(createSentence(Math.floor(Math.random() * 8) + 6));
      return results.join(' ');
    } else {
      for (let i = 0; i < count; i++) {
        const p = createParagraph(Math.floor(Math.random() * 3) + 4);
        results.push(htmlWrap ? `<p>${p}</p>` : p);
      }
      return results.join('\n\n');
    }
  }
};
