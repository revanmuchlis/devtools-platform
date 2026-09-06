/**
 * DevForge - Client-Side Developer Tools Platform
 * Main Application Orchestrator & Router
 */

import { compliance } from './compliance.js';
import { staticPages } from './static-pages.js';
import { jsonTools } from './tools/json-tools.js';
import { codeFormatters } from './tools/code-formatters.js';
import { encoders } from './tools/encoders.js';
import { cryptoTools } from './tools/crypto-tools.js';
import { textTools } from './tools/text-tools.js';
import { markdownTool } from './tools/markdown-tool.js';

// ==========================================================================
// Tool Registry & Metadata
// ==========================================================================
export const TOOLS = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    category: 'JSON Tools',
    icon: `{ }`,
    badge: 'Popular',
    desc: 'Prettify, format, validate, minify JSON data, and explore nested structures with visual tree inspection.',
    keywords: ['json', 'format', 'prettify', 'validate', 'minify', 'tree', 'beautify']
  },
  {
    id: 'xml-validator',
    name: 'XML Formatter & Validator',
    category: 'Code Formatters',
    icon: `&lt;&gt;`,
    badge: 'Standard',
    desc: 'Format, indent, validate XML syntax, and remove whitespace using the browser native DOMParser.',
    keywords: ['xml', 'validate', 'format', 'minify', 'soap', 'rss', 'svg']
  },
  {
    id: 'html-formatter',
    name: 'HTML Formatter & Minifier',
    category: 'Code Formatters',
    icon: `&lt;/&gt;`,
    badge: 'Essential',
    desc: 'Beautify messy HTML markup with custom indentation or minify HTML to optimize web page load times.',
    keywords: ['html', 'format', 'minify', 'compress', 'web', 'beautify']
  },
  {
    id: 'sql-formatter',
    name: 'SQL Beautifier & Formatter',
    category: 'Code Formatters',
    icon: `SQL`,
    badge: 'Popular',
    desc: 'Format standard SQL queries with uppercase keywords (SELECT, FROM, WHERE, JOIN) and proper indentation.',
    keywords: ['sql', 'query', 'mysql', 'postgres', 'beautify', 'format', 'database']
  },
  {
    id: 'css-beautifier',
    name: 'CSS Beautifier & Minifier',
    category: 'Code Formatters',
    icon: `#`,
    badge: 'CSS',
    desc: 'Format cascading style sheets into clean indented blocks or minify CSS for production bundles.',
    keywords: ['css', 'styles', 'beautify', 'minify', 'clean', 'format']
  },
  {
    id: 'js-beautifier',
    name: 'JavaScript Formatter',
    category: 'Code Formatters',
    icon: `JS`,
    badge: 'JavaScript',
    desc: 'Prettify and clean up raw JavaScript source code with structured curly brace formatting.',
    keywords: ['javascript', 'js', 'format', 'beautify', 'code', 'script']
  },
  {
    id: 'base64-tool',
    name: 'Base64 Text & File Converter',
    category: 'Encoders & Decoders',
    icon: `64`,
    badge: 'Versatile',
    desc: 'Encode and decode UTF-8 text or convert binary files and images to Base64 data URLs with live image preview.',
    keywords: ['base64', 'encode', 'decode', 'file', 'image', 'data-uri', 'binary']
  },
  {
    id: 'url-tool',
    name: 'URL Encoder & Decoder',
    category: 'Encoders & Decoders',
    icon: `%20`,
    badge: 'Web',
    desc: 'Safely encode/decode URL strings and parse complex URI query string parameters into structured JSON.',
    keywords: ['url', 'uri', 'encode', 'decode', 'querystring', 'params']
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Debugger & Inspector',
    category: 'Encoders & Decoders',
    icon: `JWT`,
    badge: 'Security',
    desc: 'Decode JSON Web Tokens without sending private secrets. Inspect Header, Payload claims, and token expiration.',
    keywords: ['jwt', 'token', 'decode', 'claims', 'auth', 'bearer', 'inspect']
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator (MD5, SHA-256)',
    category: 'Cryptography',
    icon: `#️⃣`,
    badge: 'Crypto',
    desc: 'Generate cryptographic checksums: MD5, SHA-1, SHA-256, SHA-384, and SHA-512 in real time via Web Crypto.',
    keywords: ['hash', 'md5', 'sha256', 'sha1', 'sha512', 'checksum', 'crypto']
  },
  {
    id: 'hmac-generator',
    name: 'HMAC Hash Generator',
    category: 'Cryptography',
    icon: `🔑`,
    badge: 'Crypto',
    desc: 'Compute keyed-hash message authentication codes (HMAC) using SHA-256, SHA-384, or SHA-512 algorithms.',
    keywords: ['hmac', 'secret', 'signature', 'sha256', 'crypto', 'auth']
  },
  {
    id: 'uuid-generator',
    name: 'UUID / GUID v4 Generator',
    category: 'Cryptography',
    icon: `🆔`,
    badge: 'Generator',
    desc: 'Generate cryptographically random UUID v4 strings with custom casing, hyphens, and bulk generation.',
    keywords: ['uuid', 'guid', 'v4', 'random', 'id', 'generate', 'unique']
  },
  {
    id: 'case-converter',
    name: 'Text Case Converter',
    category: 'Text & Markdown',
    icon: `Aa`,
    badge: 'Text',
    desc: 'Convert text between camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, and more.',
    keywords: ['case', 'camelcase', 'snake_case', 'kebab-case', 'uppercase', 'lowercase']
  },
  {
    id: 'diff-checker',
    name: 'Text & Code Diff Checker',
    category: 'Text & Markdown',
    icon: `±`,
    badge: 'Diff',
    desc: 'Compare two text snippets side-by-side or line-by-line with visual highlight of additions and removals.',
    keywords: ['diff', 'compare', 'difference', 'merge', 'changes', 'text']
  },
  {
    id: 'regex-tester',
    name: 'Regular Expression (RegEx) Tester',
    category: 'Text & Markdown',
    icon: `/.* /`,
    badge: 'Regex',
    desc: 'Test regular expressions against sample text with real-time match indexing, groups extraction, and error hints.',
    keywords: ['regex', 'regexp', 'regular-expression', 'test', 'matcher', 'pattern']
  },
  {
    id: 'lorem-generator',
    name: 'Lorem Ipsum Generator',
    category: 'Text & Markdown',
    icon: `¶`,
    badge: 'Text',
    desc: 'Generate classic dummy placeholder text by paragraphs, sentences, or word counts with optional HTML wrappers.',
    keywords: ['lorem', 'ipsum', 'placeholder', 'dummy-text', 'generator']
  },
  {
    id: 'markdown-preview',
    name: 'Markdown Live Previewer',
    category: 'Text & Markdown',
    icon: `M↓`,
    badge: 'Preview',
    desc: 'Write Markdown with real-time side-by-side HTML rendering, code highlighting, tables, and quick sample presets.',
    keywords: ['markdown', 'preview', 'html', 'live', 'render', 'readme']
  }
];

// ==========================================================================
// Ad Mock Rendering Helper
// ==========================================================================
function renderAdSlot(type, customClass = '') {
  if (type === 'leaderboard') {
    return `
      <div class="ad-slot ad-leaderboard ${customClass}">
        <span class="ad-label">Sponsor / Ad</span>
        <a href="#/contact" class="ad-mock-content">
          <div class="ad-mock-icon">⚡</div>
          <div class="ad-mock-info">
            <div class="ad-mock-headline">Cloud VPS & Dedicated Compute for Developers</div>
            <div class="ad-mock-subtext">Deploy NVMe cloud instances globally with $100 starting credit. 99.99% uptime.</div>
          </div>
          <span class="ad-mock-cta">Learn More →</span>
        </a>
      </div>
    `;
  }
  if (type === 'sidebar') {
    return `
      <div class="ad-slot ad-sidebar ${customClass}">
        <span class="ad-label">Partner</span>
        <a href="#/contact" class="ad-mock-content" style="flex-direction: column; text-align: center; gap: 0.75rem;">
          <div class="ad-mock-icon" style="width: 52px; height: 52px; font-size: 1.5rem;">🔒</div>
          <div class="ad-mock-info" style="text-align: center;">
            <div class="ad-mock-headline">API Security & Auth Proxy</div>
            <div class="ad-mock-subtext" style="margin-top: 0.35rem;">Zero-trust JWT verification and automated rate-limiting.</div>
          </div>
          <span class="ad-mock-cta" style="margin-top: 0.5rem;">Start Free Tier</span>
        </a>
      </div>
    `;
  }
  if (type === 'intool') {
    return `
      <div class="ad-slot ad-intool ${customClass}">
        <span class="ad-label">Sponsored Tool</span>
        <a href="#/contact" class="ad-mock-content">
          <div class="ad-mock-icon" style="background: linear-gradient(135deg, #10b981, #06b6d4);">🚀</div>
          <div class="ad-mock-info">
            <div class="ad-mock-headline">Next-Gen Fullstack Monitoring & Error Tracking</div>
            <div class="ad-mock-subtext">Find and resolve JavaScript and backend errors in milliseconds.</div>
          </div>
          <span class="ad-mock-cta">Try Demo</span>
        </a>
      </div>
    `;
  }
  return '';
}

// ==========================================================================
// Toast Notifications
// ==========================================================================
export function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  toast.innerHTML = `<span><strong>${icon}</strong> ${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}

// ==========================================================================
// Utility Helpers
// ==========================================================================
export function copyToClipboard(text, customMsg = 'Copied to clipboard!') {
  if (!text) {
    showToast('Nothing to copy', 'error');
    return;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showToast(customMsg, 'success'))
      .catch(() => fallbackCopy(text, customMsg));
  } else {
    fallbackCopy(text, customMsg);
  }
}

function fallbackCopy(text, customMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(customMsg, 'success');
  } catch (err) {
    showToast('Failed to copy', 'error');
  }
  document.body.removeChild(textArea);
}

export function downloadFile(filename, content, mimeType = 'text/plain;charset=utf-8') {
  if (!content) {
    showToast('Content is empty, nothing to download', 'error');
    return;
  }
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Downloaded ${filename}`, 'success');
}

export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================================================
// Application Core & Router
// ==========================================================================
export const app = {
  currentRoute: '',
  theme: localStorage.getItem('devforge_theme') || 'dark',

  init() {
    this.applyTheme(this.theme);
    this.renderSidebar();
    this.bindGlobalEvents();
    compliance.init();

    // Listen to hash changes
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('devforge_theme', theme);
    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      themeBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
    }
  },

  toggleTheme() {
    const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme} theme`, 'info');
  },

  handleRoute() {
    const rawHash = window.location.hash || '#/';
    const path = rawHash.replace(/^#\/?/, '').trim();
    this.currentRoute = path;

    // Update active state in sidebar
    document.querySelectorAll('.sidebar-item-btn').forEach(btn => {
      const target = btn.getAttribute('data-route');
      if (target === path || (path === '' && target === '')) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Close mobile sidebar on navigation
    this.closeSidebar();

    // Route dispatch
    const contentEl = document.getElementById('app-content');
    if (!contentEl) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 1. Home / Dashboard
    if (!path || path === '' || path === '/') {
      this.renderHome(contentEl);
      return;
    }

    // 2. Static Pages
    if (path === 'about') {
      contentEl.innerHTML = renderAdSlot('leaderboard') + staticPages.about() + renderAdSlot('intool');
      return;
    }
    if (path === 'privacy') {
      contentEl.innerHTML = renderAdSlot('leaderboard') + staticPages.privacy() + renderAdSlot('intool');
      return;
    }
    if (path === 'terms') {
      contentEl.innerHTML = renderAdSlot('leaderboard') + staticPages.terms() + renderAdSlot('intool');
      return;
    }
    if (path === 'contact') {
      contentEl.innerHTML = renderAdSlot('leaderboard') + staticPages.contact() + renderAdSlot('intool');
      this.bindContactForm();
      return;
    }
    if (path === 'cookie-policy') {
      contentEl.innerHTML = renderAdSlot('leaderboard') + staticPages.cookiePolicy() + renderAdSlot('intool');
      return;
    }

    // 3. Tool Views
    const tool = TOOLS.find(t => t.id === path);
    if (tool) {
      this.renderTool(contentEl, tool);
    } else {
      contentEl.innerHTML = `
        <div class="page-container" style="text-align: center; padding: 4rem 1rem;">
          <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">404 - Tool Not Found</h1>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">The developer utility you requested does not exist or has been relocated.</p>
          <a href="#/" class="btn btn-primary">Return to All Tools</a>
        </div>
      `;
    }
  },

  // Sidebar helpers for mobile
  openSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.classList.add('sidebar-open');
  },

  closeSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.classList.remove('sidebar-open');
  },

  // ========================================================================
  // Sidebar Rendering
  // ========================================================================
  renderSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    // Group tools by category
    const categories = {};
    TOOLS.forEach(t => {
      if (!categories[t.category]) categories[t.category] = [];
      categories[t.category].push(t);
    });

    let html = `
      <!-- Mobile Sidebar Top Header -->
      <div class="sidebar-mobile-header">
        <div class="sidebar-mobile-title">
          <span>DevForge Tools</span>
          <span class="badge-privacy" style="font-size: 0.62rem; padding: 0.15rem 0.45rem;">100% Client-Side</span>
        </div>
        <button id="btn-sidebar-close" class="btn-icon btn-sm" aria-label="Close navigation menu">✕</button>
      </div>

      <div class="sidebar-section">
        <div class="sidebar-title">Main Navigation</div>
        <ul class="sidebar-menu">
          <li>
            <a href="#/" class="sidebar-item-btn" data-route="">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              <span>Dashboard / All Tools</span>
              <span class="sidebar-badge">${TOOLS.length}</span>
            </a>
          </li>
        </ul>
      </div>
    `;

    Object.entries(categories).forEach(([catName, tools]) => {
      html += `
        <div class="sidebar-section">
          <div class="sidebar-title">${escapeHtml(catName)}</div>
          <ul class="sidebar-menu">
            ${tools.map(t => `
              <li>
                <a href="#/${t.id}" class="sidebar-item-btn" data-route="${t.id}">
                  <span style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; width: 22px; text-align: center; color: var(--accent-primary);">${t.icon}</span>
                  <span>${escapeHtml(t.name)}</span>
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    });

    // Mobile Navigation Links Section inside Sidebar
    html += `
      <div class="sidebar-section">
        <div class="sidebar-title">Pages & Info</div>
        <ul class="sidebar-menu">
          <li>
            <a href="#/about" class="sidebar-item-btn" data-route="about">
              <span style="width: 22px; text-align: center;">ℹ️</span>
              <span>About DevForge</span>
            </a>
          </li>
          <li>
            <a href="#/contact" class="sidebar-item-btn" data-route="contact">
              <span style="width: 22px; text-align: center;">✉️</span>
              <span>Contact Us</span>
            </a>
          </li>
          <li>
            <a href="#/privacy" class="sidebar-item-btn" data-route="privacy">
              <span style="width: 22px; text-align: center;">🔒</span>
              <span>Privacy Policy</span>
            </a>
          </li>
          <li>
            <a href="#/terms" class="sidebar-item-btn" data-route="terms">
              <span style="width: 22px; text-align: center;">📜</span>
              <span>Terms of Use</span>
            </a>
          </li>
        </ul>
      </div>
    `;

    // Sidebar Ad Slot
    html += `
      <div class="sidebar-section" style="border-bottom:none;">
        <div class="sidebar-title">Sponsor</div>
        ${renderAdSlot('sidebar')}
      </div>
    `;

    sidebar.innerHTML = html;

    // Bind sidebar close button
    const closeBtn = document.getElementById('btn-sidebar-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeSidebar());
    }
  },

  // ========================================================================
  // Dashboard / Home View
  // ========================================================================
  renderHome(container) {
    const categories = ['All', ...new Set(TOOLS.map(t => t.category))];

    container.innerHTML = `
      ${renderAdSlot('leaderboard')}

      <!-- Dashboard Hero -->
      <div class="page-hero" style="margin-bottom: 2rem;">
        <div class="badge-privacy" style="margin-bottom: 0.85rem;">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          100% Client-Side Pure JavaScript
        </div>
        <h1 class="page-hero-title">Developer Utility Suite</h1>
        <p class="page-hero-subtitle">
          Lightning-fast formatters, validators, encoders, and crypto utilities. 
          Your sensitive code, queries, and tokens never leave your browser.
        </p>

        <div style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
          <button class="btn btn-secondary js-open-search">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            Quick Search Tools (Ctrl+K)
          </button>
          <a href="#/about" class="btn btn-secondary">Why Client-Side?</a>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="category-filter-bar" id="category-filter-bar">
        ${categories.map((c, i) => `
          <button class="cat-pill ${i === 0 ? 'active' : ''}" data-cat="${escapeHtml(c)}">
            ${escapeHtml(c)}
          </button>
        `).join('')}
      </div>

      <!-- Tools Grid -->
      <div class="tools-grid" id="dashboard-tools-grid">
        ${this.generateToolCards(TOOLS)}
      </div>

      <!-- Trust & Features Banner -->
      <div class="page-section" style="margin-top: 1.5rem; background: radial-gradient(circle at right, rgba(59, 130, 246, 0.05) 0%, transparent 60%);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; text-align: left;">
          <div>
            <h3 style="font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: var(--brand-emerald);">✓</span> Zero API Costs
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">All utilities execute locally inside your browser engine without costly cloud API quotas.</p>
          </div>
          <div>
            <h3 style="font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: var(--brand-cyan);">✓</span> GDPR/CCPA Compliant
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">Integrated with a transparent Cookie Preferences Center and strict zero-logging policy.</p>
          </div>
          <div>
            <h3 style="font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: var(--brand-violet);">✓</span> Open Source Friendly
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">Built with robust vanilla standards, Web Crypto, and open algorithms. Works 100% offline once loaded.</p>
          </div>
        </div>
      </div>

      ${renderAdSlot('intool')}
    `;

    // Filter Bar Logic
    const filterPills = container.querySelectorAll('.cat-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const selectedCat = pill.getAttribute('data-cat');
        const filtered = selectedCat === 'All' 
          ? TOOLS 
          : TOOLS.filter(t => t.category === selectedCat);
        const grid = document.getElementById('dashboard-tools-grid');
        if (grid) grid.innerHTML = this.generateToolCards(filtered);
      });
    });
  },

  generateToolCards(toolList) {
    if (toolList.length === 0) {
      return `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No tools found matching your selection.</p>`;
    }
    return toolList.map(t => `
      <a href="#/${t.id}" class="tool-card">
        <div class="tool-card-header">
          <div class="tool-card-icon">
            <span style="font-family: var(--font-mono); font-weight: 700;">${t.icon}</span>
          </div>
          <span class="tool-card-badge">${escapeHtml(t.badge)}</span>
        </div>
        <div class="tool-card-title">${escapeHtml(t.name)}</div>
        <div class="tool-card-desc">${escapeHtml(t.desc)}</div>
        <div class="tool-card-footer">
          <span>${escapeHtml(t.category)}</span>
          <span class="tool-card-link">Open Tool →</span>
        </div>
      </a>
    `).join('');
  },

  // ========================================================================
  // Individual Tool Router & Layout
  // ========================================================================
  renderTool(container, tool) {
    let specificHtml = '';
    
    // Pick the workspace template based on tool ID
    switch (tool.id) {
      case 'json-formatter':
        specificHtml = this.templateJsonFormatter();
        break;
      case 'xml-validator':
        specificHtml = this.templateXmlValidator();
        break;
      case 'html-formatter':
        specificHtml = this.templateHtmlFormatter();
        break;
      case 'sql-formatter':
        specificHtml = this.templateSqlFormatter();
        break;
      case 'css-beautifier':
        specificHtml = this.templateCssBeautifier();
        break;
      case 'js-beautifier':
        specificHtml = this.templateJsBeautifier();
        break;
      case 'base64-tool':
        specificHtml = this.templateBase64Tool();
        break;
      case 'url-tool':
        specificHtml = this.templateUrlTool();
        break;
      case 'jwt-decoder':
        specificHtml = this.templateJwtDecoder();
        break;
      case 'hash-generator':
        specificHtml = this.templateHashGenerator();
        break;
      case 'hmac-generator':
        specificHtml = this.templateHmacGenerator();
        break;
      case 'uuid-generator':
        specificHtml = this.templateUuidGenerator();
        break;
      case 'case-converter':
        specificHtml = this.templateCaseConverter();
        break;
      case 'diff-checker':
        specificHtml = this.templateDiffChecker();
        break;
      case 'regex-tester':
        specificHtml = this.templateRegexTester();
        break;
      case 'lorem-generator':
        specificHtml = this.templateLoremGenerator();
        break;
      case 'markdown-preview':
        specificHtml = this.templateMarkdownPreview();
        break;
      default:
        specificHtml = `<p>Tool layout under construction.</p>`;
    }

    container.innerHTML = `
      ${renderAdSlot('leaderboard')}

      <div class="tool-view-header">
        <nav class="breadcrumb-nav">
          <a href="#/" class="breadcrumb-link">Tools</a>
          <span>/</span>
          <span class="breadcrumb-link" style="color:var(--accent-primary);">${escapeHtml(tool.category)}</span>
          <span>/</span>
          <span>${escapeHtml(tool.name)}</span>
        </nav>
        <h1 class="tool-view-title">
          <span style="font-family: var(--font-mono); color: var(--accent-primary);">${tool.icon}</span>
          ${escapeHtml(tool.name)}
        </h1>
        <p class="tool-view-desc">${escapeHtml(tool.desc)}</p>
      </div>

      <div class="tool-workspace" id="tool-workspace-root">
        ${specificHtml}
      </div>

      ${renderAdSlot('intool')}
    `;

    // Now bind event listeners for this tool
    this.bindToolActions(tool.id);
  },

  // ========================================================================
  // Tool Templates & Binding Logic
  // ========================================================================

  // 1. JSON Formatter
  templateJsonFormatter() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <span class="toolbar-label">Indentation:</span>
          <select id="json-indent" class="select-input">
            <option value="2" selected>2 Spaces</option>
            <option value="4">4 Spaces</option>
            <option value="tab">1 Tab</option>
          </select>
          <button id="btn-json-format" class="btn btn-outline btn-sm">Format / Prettify</button>
          <button id="btn-json-minify" class="btn btn-outline btn-sm">Minify / Compact</button>
          <button id="btn-json-validate" class="btn btn-outline btn-sm">Validate Syntax</button>
          <button id="btn-json-tree-toggle" class="btn btn-outline btn-sm">Tree View</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-json-sample" class="btn btn-outline btn-sm">Sample</button>
          <button id="btn-json-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div id="json-validation-alert" style="display:none;" class="validation-result"></div>

      <div class="editor-split">
        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Input JSON</span>
            <span id="json-in-stats" class="pane-stats">0 chars • 0 lines</span>
          </div>
          <div class="editor-wrapper">
            <textarea id="json-input" class="editor-textarea" placeholder="Paste or type JSON here..."></textarea>
          </div>
        </div>

        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Formatted Output</span>
            <div class="pane-actions">
              <span id="json-out-stats" class="pane-stats">0 chars</span>
              <button id="btn-json-copy" class="btn btn-outline btn-sm">Copy</button>
              <button id="btn-json-download" class="btn btn-outline btn-sm">Download</button>
            </div>
          </div>
          <div class="editor-wrapper" id="json-output-wrapper">
            <textarea id="json-output" class="editor-textarea" readonly placeholder="Output will appear here..."></textarea>
            <div id="json-tree-container" class="editor-output" style="display: none;"></div>
          </div>
        </div>
      </div>
    `;
  },

  // 2. XML Validator & Formatter
  templateXmlValidator() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <span class="toolbar-label">Indentation:</span>
          <select id="xml-indent" class="select-input">
            <option value="2" selected>2 Spaces</option>
            <option value="4">4 Spaces</option>
            <option value="tab">1 Tab</option>
          </select>
          <button id="btn-xml-format" class="btn btn-outline btn-sm">Format XML</button>
          <button id="btn-xml-validate" class="btn btn-outline btn-sm">Validate Syntax</button>
          <button id="btn-xml-minify" class="btn btn-outline btn-sm">Minify XML</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-xml-sample" class="btn btn-outline btn-sm">Sample</button>
          <button id="btn-xml-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div id="xml-validation-alert" style="display:none;" class="validation-result"></div>

      <div class="editor-split">
        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Input XML</span>
            <span id="xml-in-stats" class="pane-stats">0 chars</span>
          </div>
          <div class="editor-wrapper">
            <textarea id="xml-input" class="editor-textarea" placeholder="Paste or type XML here..."></textarea>
          </div>
        </div>

        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Output XML</span>
            <div class="pane-actions">
              <span id="xml-out-stats" class="pane-stats">0 chars</span>
              <button id="btn-xml-copy" class="btn btn-outline btn-sm">Copy</button>
              <button id="btn-xml-download" class="btn btn-outline btn-sm">Download</button>
            </div>
          </div>
          <div class="editor-wrapper">
            <textarea id="xml-output" class="editor-textarea" readonly placeholder="Formatted XML output..."></textarea>
          </div>
        </div>
      </div>
    `;
  },

  // 3. HTML Formatter & Minifier
  templateHtmlFormatter() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <span class="toolbar-label">Indent:</span>
          <select id="html-indent" class="select-input">
            <option value="2" selected>2 Spaces</option>
            <option value="4">4 Spaces</option>
            <option value="tab">1 Tab</option>
          </select>
          <button id="btn-html-format" class="btn btn-outline btn-sm">Beautify HTML</button>
          <button id="btn-html-minify" class="btn btn-outline btn-sm">Minify HTML</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-html-sample" class="btn btn-outline btn-sm">Sample</button>
          <button id="btn-html-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div class="editor-split">
        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Raw HTML Input</span>
            <span id="html-in-stats" class="pane-stats">0 chars</span>
          </div>
          <div class="editor-wrapper">
            <textarea id="html-input" class="editor-textarea" placeholder="Enter HTML source code..."></textarea>
          </div>
        </div>

        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Formatted HTML Output</span>
            <div class="pane-actions">
              <span id="html-out-stats" class="pane-stats">0 chars</span>
              <button id="btn-html-copy" class="btn btn-outline btn-sm">Copy</button>
              <button id="btn-html-download" class="btn btn-outline btn-sm">Download</button>
            </div>
          </div>
          <div class="editor-wrapper">
            <textarea id="html-output" class="editor-textarea" readonly placeholder="Output HTML..."></textarea>
          </div>
        </div>
      </div>
    `;
  },

  // 4. SQL Beautifier
  templateSqlFormatter() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <label style="font-size: 0.8rem; display: flex; align-items: center; gap: 0.4rem;">
            <input type="checkbox" id="sql-uppercase" checked> Uppercase Keywords
          </label>
          <button id="btn-sql-format" class="btn btn-outline btn-sm">Beautify SQL</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-sql-sample" class="btn btn-outline btn-sm">Sample Query</button>
          <button id="btn-sql-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div class="editor-split">
        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Input SQL Query</span>
            <span id="sql-in-stats" class="pane-stats">0 chars</span>
          </div>
          <div class="editor-wrapper">
            <textarea id="sql-input" class="editor-textarea" placeholder="SELECT * FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE ..."></textarea>
          </div>
        </div>

        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Formatted SQL Output</span>
            <div class="pane-actions">
              <span id="sql-out-stats" class="pane-stats">0 chars</span>
              <button id="btn-sql-copy" class="btn btn-outline btn-sm">Copy</button>
              <button id="btn-sql-download" class="btn btn-outline btn-sm">Download</button>
            </div>
          </div>
          <div class="editor-wrapper">
            <textarea id="sql-output" class="editor-textarea" readonly placeholder="Formatted SQL output..."></textarea>
          </div>
        </div>
      </div>
    `;
  },

  // 5. CSS Beautifier & Minifier
  templateCssBeautifier() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <button id="btn-css-format" class="btn btn-outline btn-sm">Beautify CSS</button>
          <button id="btn-css-minify" class="btn btn-outline btn-sm">Minify CSS</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-css-sample" class="btn btn-outline btn-sm">Sample</button>
          <button id="btn-css-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div class="editor-split">
        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">CSS Input</span>
            <span id="css-in-stats" class="pane-stats">0 chars</span>
          </div>
          <div class="editor-wrapper">
            <textarea id="css-input" class="editor-textarea" placeholder="Paste CSS here..."></textarea>
          </div>
        </div>

        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">CSS Output</span>
            <div class="pane-actions">
              <span id="css-out-stats" class="pane-stats">0 chars</span>
              <button id="btn-css-copy" class="btn btn-outline btn-sm">Copy</button>
              <button id="btn-css-download" class="btn btn-outline btn-sm">Download</button>
            </div>
          </div>
          <div class="editor-wrapper">
            <textarea id="css-output" class="editor-textarea" readonly placeholder="Formatted CSS output..."></textarea>
          </div>
        </div>
      </div>
    `;
  },

  // 6. JS Beautifier
  templateJsBeautifier() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <button id="btn-js-format" class="btn btn-outline btn-sm">Beautify JavaScript</button>
          <button id="btn-js-minify" class="btn btn-outline btn-sm">Minify JavaScript</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-js-sample" class="btn btn-outline btn-sm">Sample</button>
          <button id="btn-js-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div class="editor-split">
        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">JavaScript Input</span>
            <span id="js-in-stats" class="pane-stats">0 chars</span>
          </div>
          <div class="editor-wrapper">
            <textarea id="js-input" class="editor-textarea" placeholder="function example(a, b) { return a + b; }"></textarea>
          </div>
        </div>

        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Formatted JavaScript</span>
            <div class="pane-actions">
              <span id="js-out-stats" class="pane-stats">0 chars</span>
              <button id="btn-js-copy" class="btn btn-outline btn-sm">Copy</button>
              <button id="btn-js-download" class="btn btn-outline btn-sm">Download</button>
            </div>
          </div>
          <div class="editor-wrapper">
            <textarea id="js-output" class="editor-textarea" readonly placeholder="Formatted JavaScript code..."></textarea>
          </div>
        </div>
      </div>
    `;
  },

  // 7. Base64 Tool
  templateBase64Tool() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <button id="btn-base64-encode" class="btn btn-outline btn-sm">Encode to Base64</button>
          <button id="btn-base64-decode" class="btn btn-outline btn-sm">Decode from Base64</button>
          <button id="btn-base64-sample" class="btn btn-outline btn-sm">Sample Text</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-base64-clear" class="btn btn-outline btn-sm">Clear All</button>
        </div>
      </div>

      <!-- File Drag & Drop -->
      <div class="drop-zone" id="base64-dropzone">
        <div class="drop-zone-text">📁 Drag & Drop any File / Image here, or <strong>Browse File</strong></div>
        <div class="drop-zone-sub">Files are converted 100% locally in your browser memory via FileReader (Zero Uploads)</div>
        <input type="file" id="base64-file-input" style="display:none;">
      </div>

      <div class="editor-split">
        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Plain Text Input</span>
            <span id="b64-in-stats" class="pane-stats">0 chars</span>
          </div>
          <div class="editor-wrapper">
            <textarea id="base64-input" class="editor-textarea" placeholder="Type or paste plain text here to encode..."></textarea>
          </div>
        </div>

        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Base64 Output</span>
            <div class="pane-actions">
              <span id="b64-out-stats" class="pane-stats">0 chars</span>
              <button id="btn-base64-copy" class="btn btn-outline btn-sm">Copy</button>
              <button id="btn-base64-download" class="btn btn-outline btn-sm">Download</button>
            </div>
          </div>
          <div class="editor-wrapper">
            <textarea id="base64-output" class="editor-textarea" placeholder="Base64 encoded/decoded output appears here..."></textarea>
          </div>
        </div>
      </div>

      <!-- Image Preview Container (if image file or data-uri) -->
      <div id="base64-preview-container" class="preview-box" style="display:none;">
        <span style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">Rendered Image Preview:</span>
        <img id="base64-img-preview" src="" alt="Base64 Preview">
      </div>
    `;
  },

  // 8. URL Encoder / Decoder
  templateUrlTool() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <button id="btn-url-encode" class="btn btn-outline btn-sm">URL Encode</button>
          <button id="btn-url-decode" class="btn btn-outline btn-sm">URL Decode</button>
          <button id="btn-url-parse-params" class="btn btn-outline btn-sm">Parse Query Params</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-url-sample" class="btn btn-outline btn-sm">Sample URL</button>
          <button id="btn-url-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div class="editor-split">
        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Raw URL / String Input</span>
            <span id="url-in-stats" class="pane-stats">0 chars</span>
          </div>
          <div class="editor-wrapper">
            <textarea id="url-input" class="editor-textarea" placeholder="https://example.com/search?q=developer tools&category=web#results"></textarea>
          </div>
        </div>

        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Processed URL Output</span>
            <div class="pane-actions">
              <button id="btn-url-copy" class="btn btn-outline btn-sm">Copy</button>
            </div>
          </div>
          <div class="editor-wrapper">
            <textarea id="url-output" class="editor-textarea" readonly placeholder="Output appears here..."></textarea>
          </div>
        </div>
      </div>
    `;
  },

  // 9. JWT Debugger
  templateJwtDecoder() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <button id="btn-jwt-decode" class="btn btn-outline btn-sm">Decode Token</button>
          <button id="btn-jwt-sample" class="btn btn-outline btn-sm">Load Sample JWT</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-jwt-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div class="jwt-container">
        <!-- Token Input -->
        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Encoded Token (Header.Payload.Signature)</span>
            <span class="pane-stats">3 Parts</span>
          </div>
          <div class="editor-wrapper">
            <textarea id="jwt-input" class="editor-textarea" style="color: #f472b6;" placeholder="Paste JWT token here... (e.g. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"></textarea>
          </div>
        </div>

        <!-- Decoded Output -->
        <div class="jwt-output-box">
          <div id="jwt-expiry-banner" style="display:none;" class="validation-result"></div>

          <div class="jwt-section-card">
            <div class="jwt-section-header">
              <span class="jwt-tag header">HEADER (Algorithm & Type)</span>
              <button class="btn btn-outline btn-sm" id="btn-copy-jwt-header">Copy Header</button>
            </div>
            <pre id="jwt-header-output" class="editor-output" style="min-height: 100px; padding: 0.75rem; border-radius: 6px;">{}</pre>
          </div>

          <div class="jwt-section-card">
            <div class="jwt-section-header">
              <span class="jwt-tag payload">PAYLOAD (Data Claims)</span>
              <button class="btn btn-outline btn-sm" id="btn-copy-jwt-payload">Copy Payload</button>
            </div>
            <pre id="jwt-payload-output" class="editor-output" style="min-height: 160px; padding: 0.75rem; border-radius: 6px;">{}</pre>
          </div>
        </div>
      </div>
    `;
  },

  // 10. Hash Generator
  templateHashGenerator() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <button id="btn-hash-compute" class="btn btn-outline btn-sm">Generate Hashes</button>
          <button id="btn-hash-sample" class="btn btn-outline btn-sm">Sample Text</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-hash-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div class="editor-pane" style="margin-bottom: 1.5rem;">
        <div class="editor-pane-header">
          <span class="pane-title">Input Text String</span>
          <span id="hash-in-stats" class="pane-stats">0 chars</span>
        </div>
        <div class="editor-wrapper" style="min-height: 120px;">
          <textarea id="hash-input" class="editor-textarea" style="min-height: 120px;" placeholder="Type or paste any text to hash in real-time..."></textarea>
        </div>
      </div>

      <div class="page-section" style="padding: 1.25rem;">
        <h3 style="font-size: 1rem; margin-bottom: 0.75rem;">Generated Cryptographic Hashes</h3>
        <table class="hash-table">
          <thead>
            <tr>
              <th style="width: 130px;">Algorithm</th>
              <th>Hex Digest</th>
              <th style="width: 90px; text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody id="hash-tbody">
            <tr>
              <td class="hash-algo">MD5</td>
              <td class="hash-val" id="hash-md5">-</td>
              <td style="text-align: center;"><button class="btn btn-outline btn-sm" onclick="window.appCopyHash('hash-md5')">Copy</button></td>
            </tr>
            <tr>
              <td class="hash-algo">SHA-1</td>
              <td class="hash-val" id="hash-sha1">-</td>
              <td style="text-align: center;"><button class="btn btn-outline btn-sm" onclick="window.appCopyHash('hash-sha1')">Copy</button></td>
            </tr>
            <tr>
              <td class="hash-algo">SHA-256</td>
              <td class="hash-val" id="hash-sha256" style="color: #38bdf8;">-</td>
              <td style="text-align: center;"><button class="btn btn-outline btn-sm" onclick="window.appCopyHash('hash-sha256')">Copy</button></td>
            </tr>
            <tr>
              <td class="hash-algo">SHA-384</td>
              <td class="hash-val" id="hash-sha384">-</td>
              <td style="text-align: center;"><button class="btn btn-outline btn-sm" onclick="window.appCopyHash('hash-sha384')">Copy</button></td>
            </tr>
            <tr>
              <td class="hash-algo">SHA-512</td>
              <td class="hash-val" id="hash-sha512">-</td>
              <td style="text-align: center;"><button class="btn btn-outline btn-sm" onclick="window.appCopyHash('hash-sha512')">Copy</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  },

  // 11. HMAC Generator
  templateHmacGenerator() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <span class="toolbar-label">Hash Algorithm:</span>
          <select id="hmac-algo" class="select-input">
            <option value="SHA-256" selected>SHA-256</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
            <option value="SHA-1">SHA-1</option>
          </select>
          <button id="btn-hmac-compute" class="btn btn-outline btn-sm">Compute HMAC</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-hmac-sample" class="btn btn-outline btn-sm">Sample</button>
          <button id="btn-hmac-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Secret Key</span>
          </div>
          <div style="padding: 0.75rem;">
            <input type="text" id="hmac-key" class="text-input" style="width:100%; font-family:var(--font-mono);" placeholder="Enter HMAC secret key...">
          </div>
        </div>

        <div class="editor-split">
          <div class="editor-pane">
            <div class="editor-pane-header">
              <span class="pane-title">Message Payload</span>
            </div>
            <div class="editor-wrapper">
              <textarea id="hmac-input" class="editor-textarea" placeholder="Enter message payload to authenticate..."></textarea>
            </div>
          </div>

          <div class="editor-pane">
            <div class="editor-pane-header">
              <span class="pane-title">HMAC Digest Output</span>
              <button id="btn-hmac-copy" class="btn btn-outline btn-sm">Copy</button>
            </div>
            <div class="editor-wrapper">
              <textarea id="hmac-output" class="editor-textarea" readonly placeholder="Computed HMAC hash..."></textarea>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 12. UUID Generator
  templateUuidGenerator() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <span class="toolbar-label">Quantity:</span>
          <input type="number" id="uuid-count" class="text-input" value="5" min="1" max="100" style="width: 70px;">
          
          <label style="font-size: 0.8rem; display: flex; align-items: center; gap: 0.35rem; margin-left: 0.5rem;">
            <input type="checkbox" id="uuid-uppercase"> Uppercase
          </label>
          <label style="font-size: 0.8rem; display: flex; align-items: center; gap: 0.35rem;">
            <input type="checkbox" id="uuid-hyphens" checked> Hyphens
          </label>
          <label style="font-size: 0.8rem; display: flex; align-items: center; gap: 0.35rem;">
            <input type="checkbox" id="uuid-braces"> Braces { }
          </label>

          <button id="btn-uuid-generate" class="btn btn-outline btn-sm">Generate UUIDs</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-uuid-copy" class="btn btn-outline btn-sm">Copy All</button>
          <button id="btn-uuid-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div class="editor-pane">
        <div class="editor-pane-header">
          <span class="pane-title">Generated UUID v4 List</span>
          <span id="uuid-stats" class="pane-stats">0 UUIDs generated</span>
        </div>
        <div class="editor-wrapper">
          <textarea id="uuid-output" class="editor-textarea" style="font-size: 0.92rem; color: #38bdf8;" placeholder="Click 'Generate UUIDs' above to create cryptographically random IDs..."></textarea>
        </div>
      </div>
    `;
  },

  // 13. Case Converter
  templateCaseConverter() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <button class="btn btn-outline btn-sm js-case-btn" data-case="camelCase">camelCase</button>
          <button class="btn btn-outline btn-sm js-case-btn" data-case="pascalCase">PascalCase</button>
          <button class="btn btn-outline btn-sm js-case-btn" data-case="snake_case">snake_case</button>
          <button class="btn btn-outline btn-sm js-case-btn" data-case="kebab-case">kebab-case</button>
          <button class="btn btn-outline btn-sm js-case-btn" data-case="constant_case">CONSTANT_CASE</button>
          <button class="btn btn-outline btn-sm js-case-btn" data-case="uppercase">UPPERCASE</button>
          <button class="btn btn-outline btn-sm js-case-btn" data-case="lowercase">lowercase</button>
          <button class="btn btn-outline btn-sm js-case-btn" data-case="titleCase">Title Case</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-case-sample" class="btn btn-outline btn-sm">Sample</button>
          <button id="btn-case-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div class="editor-split">
        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Input Text</span>
            <span id="case-in-stats" class="pane-stats">0 chars • 0 words</span>
          </div>
          <div class="editor-wrapper">
            <textarea id="case-input" class="editor-textarea" placeholder="Type or paste any text to convert its casing..."></textarea>
          </div>
        </div>

        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Converted Text</span>
            <div class="pane-actions">
              <button id="btn-case-copy" class="btn btn-outline btn-sm">Copy</button>
            </div>
          </div>
          <div class="editor-wrapper">
            <textarea id="case-output" class="editor-textarea" readonly placeholder="Converted text appears here..."></textarea>
          </div>
        </div>
      </div>
    `;
  },

  // 14. Diff Checker
  templateDiffChecker() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <button id="btn-diff-compare" class="btn btn-outline btn-sm">Compare Differences</button>
          <button id="btn-diff-sample" class="btn btn-outline btn-sm">Sample Code</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-diff-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div class="diff-container">
        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Original Text / Code</span>
          </div>
          <div class="editor-wrapper" style="min-height: 240px;">
            <textarea id="diff-old" class="editor-textarea" style="min-height: 240px;" placeholder="Original text or previous code version..."></textarea>
          </div>
        </div>

        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Modified Text / Code</span>
          </div>
          <div class="editor-wrapper" style="min-height: 240px;">
            <textarea id="diff-new" class="editor-textarea" style="min-height: 240px;" placeholder="Modified text or new code version..."></textarea>
          </div>
        </div>
      </div>

      <div class="editor-pane" style="margin-top: 1.25rem;">
        <div class="editor-pane-header">
          <span class="pane-title">Visual Difference Result</span>
          <span id="diff-stats" class="pane-stats">0 changes detected</span>
        </div>
        <div id="diff-output-container" class="diff-output">
          <p style="color: var(--text-muted); text-align: center; padding: 2rem;">Click 'Compare Differences' above to view additions and removals.</p>
        </div>
      </div>
    `;
  },

  // 15. Regex Tester
  templateRegexTester() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group" style="flex:1;">
          <span class="toolbar-label">Pattern:</span>
          <input type="text" id="regex-pattern" class="text-input" style="flex:1; min-width: 180px; font-family: var(--font-mono);" placeholder="([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})">
          <span class="toolbar-label" style="margin-left: 0.5rem;">Flags:</span>
          <input type="text" id="regex-flags" class="text-input" style="width: 60px; font-family: var(--font-mono);" value="gmi">
          <button id="btn-regex-run" class="btn btn-outline btn-sm">Test Regex</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-regex-sample" class="btn btn-outline btn-sm">Sample</button>
          <button id="btn-regex-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div id="regex-alert" style="display:none;" class="validation-result"></div>

      <div class="editor-split">
        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Test String / Haystack</span>
          </div>
          <div class="editor-wrapper">
            <textarea id="regex-input" class="editor-textarea" placeholder="Enter target text to test regex matches against..."></textarea>
          </div>
        </div>

        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Match Results</span>
            <span id="regex-match-count" class="pane-stats">0 matches</span>
          </div>
          <div style="padding: 1rem; overflow-y: auto; max-height: 420px;" id="regex-results-container">
            <p style="color: var(--text-muted); font-size: 0.85rem;">Matched groups will appear here.</p>
          </div>
        </div>
      </div>
    `;
  },

  // 16. Lorem Ipsum Generator
  templateLoremGenerator() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <span class="toolbar-label">Generate:</span>
          <input type="number" id="lorem-count" class="text-input" value="3" min="1" max="50" style="width: 60px;">
          <select id="lorem-type" class="select-input">
            <option value="paragraphs" selected>Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
          <label style="font-size: 0.8rem; display: flex; align-items: center; gap: 0.35rem; margin-left: 0.5rem;">
            <input type="checkbox" id="lorem-html-wrap"> Wrap in &lt;p&gt; tags
          </label>
          <button id="btn-lorem-generate" class="btn btn-outline btn-sm">Generate</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-lorem-copy" class="btn btn-outline btn-sm">Copy</button>
          <button id="btn-lorem-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div class="editor-pane">
        <div class="editor-pane-header">
          <span class="pane-title">Generated Dummy Text</span>
          <span id="lorem-stats" class="pane-stats">0 words</span>
        </div>
        <div class="editor-wrapper">
          <textarea id="lorem-output" class="editor-textarea" style="line-height: 1.8;"></textarea>
        </div>
      </div>
    `;
  },

  // 17. Markdown Previewer
  templateMarkdownPreview() {
    return `
      <div class="tool-toolbar">
        <div class="tool-toolbar-group">
          <button id="btn-md-sample" class="btn btn-outline btn-sm">Load Markdown Sample</button>
          <button id="btn-md-copy-html" class="btn btn-outline btn-sm">Copy Generated HTML</button>
        </div>
        <div class="tool-toolbar-group">
          <button id="btn-md-clear" class="btn btn-outline btn-sm">Clear</button>
        </div>
      </div>

      <div class="editor-split">
        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Markdown Source</span>
            <span id="md-in-stats" class="pane-stats">0 chars</span>
          </div>
          <div class="editor-wrapper">
            <textarea id="md-input" class="editor-textarea" placeholder="# Enter Markdown heading\n\nWrite your content here..."></textarea>
          </div>
        </div>

        <div class="editor-pane">
          <div class="editor-pane-header">
            <span class="pane-title">Live Rendered HTML</span>
            <span class="pane-stats">Preview</span>
          </div>
          <div class="editor-wrapper">
            <div id="md-preview" class="editor-output" style="background: var(--bg-secondary); color: var(--text-primary); line-height: 1.7;">
              <p style="color: var(--text-muted);">Markdown preview will render here in real time...</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ========================================================================
  // Event Binding for Each Tool
  // ========================================================================
  bindToolActions(toolId) {
    // 1. JSON Formatter
    if (toolId === 'json-formatter') {
      const input = document.getElementById('json-input');
      const output = document.getElementById('json-output');
      const indentSel = document.getElementById('json-indent');
      const alertBox = document.getElementById('json-validation-alert');
      const treeBox = document.getElementById('json-tree-container');
      const inStats = document.getElementById('json-in-stats');
      const outStats = document.getElementById('json-out-stats');

      const updateStats = () => {
        const stats = textTools.getTextStats(input.value);
        inStats.textContent = `${stats.chars} chars • ${stats.lines} lines`;
        const oStats = textTools.getTextStats(output.value);
        outStats.textContent = `${oStats.chars} chars`;
      };

      input.addEventListener('input', updateStats);

      document.getElementById('btn-json-format')?.addEventListener('click', () => {
        const res = jsonTools.format(input.value, indentSel.value);
        if (res.success) {
          output.value = res.result;
          output.style.display = 'block';
          treeBox.style.display = 'none';
          alertBox.style.display = 'flex';
          alertBox.className = 'validation-result valid';
          alertBox.textContent = '✓ Valid JSON formatted successfully.';
          updateStats();
          showToast('JSON Formatted', 'success');
        } else {
          alertBox.style.display = 'flex';
          alertBox.className = 'validation-result invalid';
          alertBox.textContent = `✕ JSON Error: ${res.error}`;
          showToast('Invalid JSON Syntax', 'error');
        }
      });

      document.getElementById('btn-json-minify')?.addEventListener('click', () => {
        const res = jsonTools.minify(input.value);
        if (res.success) {
          output.value = res.result;
          output.style.display = 'block';
          treeBox.style.display = 'none';
          alertBox.style.display = 'none';
          updateStats();
          showToast('JSON Minified', 'success');
        } else {
          alertBox.style.display = 'flex';
          alertBox.className = 'validation-result invalid';
          alertBox.textContent = `✕ Minify Error: ${res.error}`;
        }
      });

      document.getElementById('btn-json-validate')?.addEventListener('click', () => {
        const res = jsonTools.validate(input.value);
        alertBox.style.display = 'flex';
        if (res.valid) {
          alertBox.className = 'validation-result valid';
          alertBox.textContent = `✓ ${res.message}`;
          showToast('JSON is valid!', 'success');
        } else {
          alertBox.className = 'validation-result invalid';
          alertBox.textContent = `✕ ${res.message}`;
          showToast('Invalid JSON', 'error');
        }
      });

      document.getElementById('btn-json-tree-toggle')?.addEventListener('click', () => {
        const res = jsonTools.validate(input.value);
        if (res.valid) {
          jsonTools.renderTree(res.data, treeBox);
          output.style.display = 'none';
          treeBox.style.display = 'block';
          showToast('Rendering Visual Tree View', 'info');
        } else {
          showToast('Cannot render tree: JSON has errors', 'error');
        }
      });

      document.getElementById('btn-json-sample')?.addEventListener('click', () => {
        input.value = JSON.stringify({
          platform: "DevForge",
          privacy: "100% Client-Side Pure JavaScript",
          version: "2.5.0",
          features: ["JSON Formatter", "XML Validator", "SQL Beautifier", "Base64 Converter"],
          stats: { tools: 17, serverCost: 0, activeUsersDaily: 48000 }
        }, null, 2);
        updateStats();
        document.getElementById('btn-json-format')?.click();
      });

      document.getElementById('btn-json-clear')?.addEventListener('click', () => {
        input.value = '';
        output.value = '';
        treeBox.innerHTML = '';
        alertBox.style.display = 'none';
        updateStats();
      });

      document.getElementById('btn-json-copy')?.addEventListener('click', () => {
        copyToClipboard(output.value);
      });

      document.getElementById('btn-json-download')?.addEventListener('click', () => {
        downloadFile('formatted.json', output.value, 'application/json');
      });
    }

    // 2. XML Validator
    if (toolId === 'xml-validator') {
      const input = document.getElementById('xml-input');
      const output = document.getElementById('xml-output');
      const indentSel = document.getElementById('xml-indent');
      const alertBox = document.getElementById('xml-validation-alert');

      document.getElementById('btn-xml-format')?.addEventListener('click', () => {
        const res = codeFormatters.formatXml(input.value, indentSel.value);
        if (res.success) {
          output.value = res.result;
          alertBox.style.display = 'flex';
          alertBox.className = 'validation-result valid';
          alertBox.textContent = '✓ XML formatted & syntactically well-formed.';
          showToast('XML Formatted', 'success');
        } else {
          alertBox.style.display = 'flex';
          alertBox.className = 'validation-result invalid';
          alertBox.textContent = `✕ XML Parse Error: ${res.error}`;
          showToast('XML Syntax Error', 'error');
        }
      });

      document.getElementById('btn-xml-validate')?.addEventListener('click', () => {
        const res = codeFormatters.validateXml(input.value);
        alertBox.style.display = 'flex';
        if (res.valid) {
          alertBox.className = 'validation-result valid';
          alertBox.textContent = `✓ ${res.message}`;
          showToast('Valid XML!', 'success');
        } else {
          alertBox.className = 'validation-result invalid';
          alertBox.textContent = `✕ ${res.error}`;
          showToast('Invalid XML', 'error');
        }
      });

      document.getElementById('btn-xml-minify')?.addEventListener('click', () => {
        output.value = codeFormatters.minifyXml(input.value);
        showToast('XML Minified', 'success');
      });

      document.getElementById('btn-xml-sample')?.addEventListener('click', () => {
        input.value = `<?xml version="1.0" encoding="UTF-8"?><devforge><site><name>DevForge</name><type>Developer Tools</type></site><tools><tool id="1"><name>JSON Formatter</name><privacy>Client-Side</privacy></tool><tool id="2"><name>XML Validator</name><privacy>Client-Side</privacy></tool></tools></devforge>`;
        document.getElementById('btn-xml-format')?.click();
      });

      document.getElementById('btn-xml-clear')?.addEventListener('click', () => {
        input.value = '';
        output.value = '';
        alertBox.style.display = 'none';
      });

      document.getElementById('btn-xml-copy')?.addEventListener('click', () => copyToClipboard(output.value));
      document.getElementById('btn-xml-download')?.addEventListener('click', () => downloadFile('document.xml', output.value, 'application/xml'));
    }

    // 3. HTML Formatter
    if (toolId === 'html-formatter') {
      const input = document.getElementById('html-input');
      const output = document.getElementById('html-output');
      const indentSel = document.getElementById('html-indent');

      document.getElementById('btn-html-format')?.addEventListener('click', () => {
        output.value = codeFormatters.formatHtml(input.value, indentSel.value);
        showToast('HTML Formatted', 'success');
      });

      document.getElementById('btn-html-minify')?.addEventListener('click', () => {
        output.value = codeFormatters.minifyHtml(input.value);
        showToast('HTML Minified', 'success');
      });

      document.getElementById('btn-html-sample')?.addEventListener('click', () => {
        input.value = `<!DOCTYPE html><html><head><title>DevForge</title><meta charset="utf-8"></head><body><header class="app-header"><h1>DevForge Tools</h1><nav><a href="#/">Home</a><a href="#/about">About</a></nav></header><main><section><h2>Fast & Free</h2><p>Zero server uploads.</p></section></main></body></html>`;
        document.getElementById('btn-html-format')?.click();
      });

      document.getElementById('btn-html-clear')?.addEventListener('click', () => {
        input.value = '';
        output.value = '';
      });

      document.getElementById('btn-html-copy')?.addEventListener('click', () => copyToClipboard(output.value));
      document.getElementById('btn-html-download')?.addEventListener('click', () => downloadFile('index.html', output.value, 'text/html'));
    }

    // 4. SQL Beautifier
    if (toolId === 'sql-formatter') {
      const input = document.getElementById('sql-input');
      const output = document.getElementById('sql-output');
      const uppercaseCheck = document.getElementById('sql-uppercase');

      document.getElementById('btn-sql-format')?.addEventListener('click', () => {
        output.value = codeFormatters.formatSql(input.value, uppercaseCheck.checked);
        showToast('SQL Query Beautified', 'success');
      });

      document.getElementById('btn-sql-sample')?.addEventListener('click', () => {
        input.value = `select u.id, u.username, u.email, count(o.id) as total_orders, sum(o.amount) as total_spent from users u left join orders o on u.id = o.user_id where u.active = 1 and o.status = 'completed' group by u.id, u.username, u.email having sum(o.amount) > 1000 order by total_spent desc limit 50;`;
        document.getElementById('btn-sql-format')?.click();
      });

      document.getElementById('btn-sql-clear')?.addEventListener('click', () => {
        input.value = '';
        output.value = '';
      });

      document.getElementById('btn-sql-copy')?.addEventListener('click', () => copyToClipboard(output.value));
      document.getElementById('btn-sql-download')?.addEventListener('click', () => downloadFile('query.sql', output.value, 'text/plain'));
    }

    // 5. CSS Beautifier
    if (toolId === 'css-beautifier') {
      const input = document.getElementById('css-input');
      const output = document.getElementById('css-output');

      document.getElementById('btn-css-format')?.addEventListener('click', () => {
        output.value = codeFormatters.formatCss(input.value);
        showToast('CSS Beautified', 'success');
      });

      document.getElementById('btn-css-minify')?.addEventListener('click', () => {
        output.value = codeFormatters.minifyCss(input.value);
        showToast('CSS Minified', 'success');
      });

      document.getElementById('btn-css-sample')?.addEventListener('click', () => {
        input.value = `.btn{display:inline-flex;align-items:center;padding:0.5rem 1rem;border-radius:8px;border:1px solid #3b82f6;background:#3b82f6;color:#fff;cursor:pointer}.btn:hover{background:#2563eb}`;
        document.getElementById('btn-css-format')?.click();
      });

      document.getElementById('btn-css-clear')?.addEventListener('click', () => {
        input.value = '';
        output.value = '';
      });

      document.getElementById('btn-css-copy')?.addEventListener('click', () => copyToClipboard(output.value));
      document.getElementById('btn-css-download')?.addEventListener('click', () => downloadFile('style.css', output.value, 'text/css'));
    }

    // 6. JavaScript Formatter
    if (toolId === 'js-beautifier') {
      const input = document.getElementById('js-input');
      const output = document.getElementById('js-output');

      document.getElementById('btn-js-format')?.addEventListener('click', () => {
        output.value = codeFormatters.formatJs(input.value);
        showToast('JavaScript Formatted', 'success');
      });

      document.getElementById('btn-js-minify')?.addEventListener('click', () => {
        output.value = codeFormatters.minifyJs(input.value);
        showToast('JavaScript Minified', 'success');
      });

      document.getElementById('btn-js-sample')?.addEventListener('click', () => {
        input.value = `function calculateHash(data){const encoder=new TextEncoder();const buffer=encoder.encode(data);console.log("Hashing bytes:",buffer.length);return crypto.subtle.digest("SHA-256",buffer);}`;
        document.getElementById('btn-js-format')?.click();
      });

      document.getElementById('btn-js-clear')?.addEventListener('click', () => {
        input.value = '';
        output.value = '';
      });

      document.getElementById('btn-js-copy')?.addEventListener('click', () => copyToClipboard(output.value));
      document.getElementById('btn-js-download')?.addEventListener('click', () => downloadFile('script.js', output.value, 'application/javascript'));
    }

    // 7. Base64 Tool
    if (toolId === 'base64-tool') {
      const input = document.getElementById('base64-input');
      const output = document.getElementById('base64-output');
      const dropzone = document.getElementById('base64-dropzone');
      const fileInput = document.getElementById('base64-file-input');
      const previewBox = document.getElementById('base64-preview-container');
      const previewImg = document.getElementById('base64-img-preview');

      const handleImagePreview = (text) => {
        if (text.startsWith('data:image/') || (text.length > 50 && /^[A-Za-z0-9+/=]+$/.test(text.substring(0, 100)))) {
          const src = text.startsWith('data:image/') ? text : `data:image/png;base64,${text}`;
          previewImg.src = src;
          previewBox.style.display = 'flex';
        } else {
          previewBox.style.display = 'none';
        }
      };

      document.getElementById('btn-base64-encode')?.addEventListener('click', () => {
        const res = encoders.base64EncodeText(input.value);
        if (res.success) {
          output.value = res.result;
          showToast('Text Encoded to Base64', 'success');
        } else {
          showToast(`Error: ${res.error}`, 'error');
        }
      });

      document.getElementById('btn-base64-decode')?.addEventListener('click', () => {
        const textToDecode = output.value.trim() || input.value.trim();
        const res = encoders.base64DecodeText(textToDecode);
        if (res.success) {
          output.value = res.result;
          handleImagePreview(textToDecode);
          showToast('Base64 Decoded', 'success');
        } else {
          showToast(res.error, 'error');
        }
      });

      // File Drag and Drop
      dropzone?.addEventListener('click', () => fileInput?.click());
      dropzone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
      dropzone?.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
      dropzone?.addEventListener('drop', async (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
          const file = e.dataTransfer.files[0];
          const res = await encoders.fileToBase64(file);
          input.value = `File: ${res.name} (${(res.size / 1024).toFixed(1)} KB)`;
          output.value = res.base64;
          handleImagePreview(res.dataUrl);
          showToast(`Converted ${file.name} to Base64`, 'success');
        }
      });

      fileInput?.addEventListener('change', async (e) => {
        if (e.target.files.length > 0) {
          const file = e.target.files[0];
          const res = await encoders.fileToBase64(file);
          input.value = `File: ${res.name} (${(res.size / 1024).toFixed(1)} KB)`;
          output.value = res.base64;
          handleImagePreview(res.dataUrl);
          showToast(`Converted ${file.name} to Base64`, 'success');
        }
      });

      document.getElementById('btn-base64-sample')?.addEventListener('click', () => {
        input.value = 'DevForge: 100% Client-Side Pure JavaScript Developer Utilities';
        document.getElementById('btn-base64-encode')?.click();
      });

      document.getElementById('btn-base64-clear')?.addEventListener('click', () => {
        input.value = '';
        output.value = '';
        previewBox.style.display = 'none';
      });

      document.getElementById('btn-base64-copy')?.addEventListener('click', () => copyToClipboard(output.value));
      document.getElementById('btn-base64-download')?.addEventListener('click', () => downloadFile('base64.txt', output.value, 'text/plain'));
    }

    // 8. URL Encoder / Decoder
    if (toolId === 'url-tool') {
      const input = document.getElementById('url-input');
      const output = document.getElementById('url-output');

      document.getElementById('btn-url-encode')?.addEventListener('click', () => {
        output.value = encoders.urlEncode(input.value);
        showToast('URL Encoded', 'success');
      });

      document.getElementById('btn-url-decode')?.addEventListener('click', () => {
        output.value = encoders.urlDecode(input.value);
        showToast('URL Decoded', 'success');
      });

      document.getElementById('btn-url-parse-params')?.addEventListener('click', () => {
        const res = encoders.parseQueryString(input.value);
        if (res.success) {
          output.value = res.result;
          showToast('Parsed Query Parameters', 'success');
        } else {
          showToast(`Error: ${res.error}`, 'error');
        }
      });

      document.getElementById('btn-url-sample')?.addEventListener('click', () => {
        input.value = 'https://devforge.local/api/v1/search?query=web developer tools&filter=client-side&tags=json,xml,crypto&page=1';
      });

      document.getElementById('btn-url-clear')?.addEventListener('click', () => {
        input.value = '';
        output.value = '';
      });

      document.getElementById('btn-url-copy')?.addEventListener('click', () => copyToClipboard(output.value));
    }

    // 9. JWT Decoder
    if (toolId === 'jwt-decoder') {
      const input = document.getElementById('jwt-input');
      const headerOut = document.getElementById('jwt-header-output');
      const payloadOut = document.getElementById('jwt-payload-output');
      const alertBox = document.getElementById('jwt-expiry-banner');

      const doDecode = () => {
        const res = encoders.decodeJwt(input.value);
        if (res.success) {
          headerOut.textContent = JSON.stringify(res.header, null, 2);
          payloadOut.textContent = JSON.stringify(res.payload, null, 2);

          alertBox.style.display = 'flex';
          if (res.expiryInfo) {
            if (res.expiryInfo.isExpired) {
              alertBox.className = 'validation-result invalid';
              alertBox.textContent = `⚠️ Token is EXPIRED (expired on ${res.expiryInfo.expDate})`;
            } else {
              alertBox.className = 'validation-result valid';
              alertBox.textContent = `✓ Token is ACTIVE (expires on ${res.expiryInfo.expDate} - in ${res.expiryInfo.diffSeconds}s)`;
            }
          } else {
            alertBox.className = 'validation-result valid';
            alertBox.textContent = '✓ Token decoded successfully (No expiration claim)';
          }
          showToast('JWT Decoded', 'success');
        } else {
          alertBox.style.display = 'flex';
          alertBox.className = 'validation-result invalid';
          alertBox.textContent = `✕ ${res.error}`;
          showToast('JWT Decode Error', 'error');
        }
      };

      document.getElementById('btn-jwt-decode')?.addEventListener('click', doDecode);
      input.addEventListener('input', () => {
        if (input.value.trim().length > 20) doDecode();
      });

      document.getElementById('btn-jwt-sample')?.addEventListener('click', () => {
        // Standard sample JWT token expiring in future
        const expFuture = Math.floor(Date.now() / 1000) + 86400; // 24h
        const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
        const payload = btoa(JSON.stringify({
          sub: "1234567890",
          name: "Alex DevForge",
          role: "admin",
          iat: Math.floor(Date.now() / 1000),
          exp: expFuture,
          iss: "devforge.local"
        }));
        const sig = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
        input.value = `${header}.${payload}.${sig}`;
        doDecode();
      });

      document.getElementById('btn-jwt-clear')?.addEventListener('click', () => {
        input.value = '';
        headerOut.textContent = '{}';
        payloadOut.textContent = '{}';
        alertBox.style.display = 'none';
      });

      document.getElementById('btn-copy-jwt-header')?.addEventListener('click', () => copyToClipboard(headerOut.textContent));
      document.getElementById('btn-copy-jwt-payload')?.addEventListener('click', () => copyToClipboard(payloadOut.textContent));
    }

    // 10. Hash Generator
    if (toolId === 'hash-generator') {
      const input = document.getElementById('hash-input');
      const inStats = document.getElementById('hash-in-stats');

      const computeHashes = async () => {
        const text = input.value;
        inStats.textContent = `${text.length} chars`;
        if (!text) {
          ['md5', 'sha1', 'sha256', 'sha384', 'sha512'].forEach(id => {
            const el = document.getElementById(`hash-${id}`);
            if (el) el.textContent = '-';
          });
          return;
        }

        const hashes = await cryptoTools.getAllHashes(text);
        document.getElementById('hash-md5').textContent = hashes.MD5 || '-';
        document.getElementById('hash-sha1').textContent = hashes['SHA-1'] || '-';
        document.getElementById('hash-sha256').textContent = hashes['SHA-256'] || '-';
        document.getElementById('hash-sha384').textContent = hashes['SHA-384'] || '-';
        document.getElementById('hash-sha512').textContent = hashes['SHA-512'] || '-';
      };

      input.addEventListener('input', computeHashes);
      document.getElementById('btn-hash-compute')?.addEventListener('click', computeHashes);

      document.getElementById('btn-hash-sample')?.addEventListener('click', () => {
        input.value = 'The quick brown fox jumps over the lazy dog';
        computeHashes();
      });

      document.getElementById('btn-hash-clear')?.addEventListener('click', () => {
        input.value = '';
        computeHashes();
      });

      window.appCopyHash = (elemId) => {
        const val = document.getElementById(elemId)?.textContent;
        if (val && val !== '-') copyToClipboard(val);
      };
    }

    // 11. HMAC Generator
    if (toolId === 'hmac-generator') {
      const algoSel = document.getElementById('hmac-algo');
      const keyInput = document.getElementById('hmac-key');
      const msgInput = document.getElementById('hmac-input');
      const output = document.getElementById('hmac-output');

      const computeHmac = async () => {
        const algo = algoSel.value;
        const key = keyInput.value;
        const msg = msgInput.value;
        if (!key) {
          showToast('Please enter a secret key', 'error');
          return;
        }
        const digest = await cryptoTools.generateHmac(algo, key, msg);
        output.value = digest;
        showToast('HMAC Computed', 'success');
      };

      document.getElementById('btn-hmac-compute')?.addEventListener('click', computeHmac);

      document.getElementById('btn-hmac-sample')?.addEventListener('click', () => {
        keyInput.value = 'devforge-super-secret-key-2026';
        msgInput.value = 'GET /api/v2/transactions?timestamp=1789234000';
        computeHmac();
      });

      document.getElementById('btn-hmac-clear')?.addEventListener('click', () => {
        keyInput.value = '';
        msgInput.value = '';
        output.value = '';
      });

      document.getElementById('btn-hmac-copy')?.addEventListener('click', () => copyToClipboard(output.value));
    }

    // 12. UUID Generator
    if (toolId === 'uuid-generator') {
      const countInput = document.getElementById('uuid-count');
      const uppercaseCheck = document.getElementById('uuid-uppercase');
      const hyphensCheck = document.getElementById('uuid-hyphens');
      const bracesCheck = document.getElementById('uuid-braces');
      const output = document.getElementById('uuid-output');
      const stats = document.getElementById('uuid-stats');

      const generate = () => {
        const count = Math.min(100, Math.max(1, parseInt(countInput.value, 10) || 1));
        const uuids = cryptoTools.generateUuid(count, {
          uppercase: uppercaseCheck.checked,
          hyphens: hyphensCheck.checked,
          braces: bracesCheck.checked
        });
        output.value = uuids.join('\n');
        stats.textContent = `${uuids.length} UUIDs generated`;
        showToast(`Generated ${uuids.length} UUID(s)`, 'success');
      };

      document.getElementById('btn-uuid-generate')?.addEventListener('click', generate);
      document.getElementById('btn-uuid-copy')?.addEventListener('click', () => copyToClipboard(output.value));
      document.getElementById('btn-uuid-clear')?.addEventListener('click', () => {
        output.value = '';
        stats.textContent = '0 UUIDs';
      });

      // Generate on initial load
      generate();
    }

    // 13. Case Converter
    if (toolId === 'case-converter') {
      const input = document.getElementById('case-input');
      const output = document.getElementById('case-output');
      const inStats = document.getElementById('case-in-stats');

      input.addEventListener('input', () => {
        const s = textTools.getTextStats(input.value);
        inStats.textContent = `${s.chars} chars • ${s.words} words`;
      });

      document.querySelectorAll('.js-case-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetCase = btn.getAttribute('data-case');
          output.value = textTools.convertCase(input.value, targetCase);
          showToast(`Converted to ${targetCase}`, 'success');
        });
      });

      document.getElementById('btn-case-sample')?.addEventListener('click', () => {
        input.value = 'User authentication token and customer billing address';
        output.value = textTools.convertCase(input.value, 'camelCase');
      });

      document.getElementById('btn-case-clear')?.addEventListener('click', () => {
        input.value = '';
        output.value = '';
      });

      document.getElementById('btn-case-copy')?.addEventListener('click', () => copyToClipboard(output.value));
    }

    // 14. Diff Checker
    if (toolId === 'diff-checker') {
      const oldInput = document.getElementById('diff-old');
      const newInput = document.getElementById('diff-new');
      const container = document.getElementById('diff-output-container');
      const stats = document.getElementById('diff-stats');

      document.getElementById('btn-diff-compare')?.addEventListener('click', () => {
        const diff = textTools.diffText(oldInput.value, newInput.value);
        let additions = 0;
        let removals = 0;

        container.innerHTML = diff.map((line, idx) => {
          let prefix = ' ';
          if (line.type === 'added') {
            prefix = '+';
            additions++;
          } else if (line.type === 'removed') {
            prefix = '-';
            removals++;
          }
          return `
            <div class="diff-line ${line.type}">
              <span class="diff-gutter">${idx + 1}</span>
              <span style="font-weight:700; width: 20px;">${prefix}</span>
              <span>${escapeHtml(line.text)}</span>
            </div>
          `;
        }).join('');

        stats.textContent = `+${additions} added, -${removals} removed`;
        showToast('Diff Comparison Generated', 'info');
      });

      document.getElementById('btn-diff-sample')?.addEventListener('click', () => {
        oldInput.value = `const PORT = 3000;\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('Hello World');\n});\nserver.listen(PORT);`;
        newInput.value = `const PORT = process.env.PORT || 8080;\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'application/json' });\n  res.end(JSON.stringify({ status: 'OK', code: 200 }));\n});\nserver.listen(PORT, () => console.log('Ready'));`;
        document.getElementById('btn-diff-compare')?.click();
      });

      document.getElementById('btn-diff-clear')?.addEventListener('click', () => {
        oldInput.value = '';
        newInput.value = '';
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No text to compare.</p>';
        stats.textContent = '0 changes';
      });
    }

    // 15. Regex Tester
    if (toolId === 'regex-tester') {
      const patternInput = document.getElementById('regex-pattern');
      const flagsInput = document.getElementById('regex-flags');
      const testInput = document.getElementById('regex-input');
      const alertBox = document.getElementById('regex-alert');
      const resultsBox = document.getElementById('regex-results-container');
      const matchStats = document.getElementById('regex-match-count');

      const runRegex = () => {
        const res = textTools.testRegex(patternInput.value, flagsInput.value, testInput.value);
        if (res.success) {
          alertBox.style.display = 'none';
          matchStats.textContent = `${res.matchCount} match(es)`;
          if (res.matches.length === 0) {
            resultsBox.innerHTML = `<p style="color: var(--text-muted); padding: 1rem;">No matches found in the test string.</p>`;
          } else {
            resultsBox.innerHTML = `
              <div class="regex-matches-list">
                ${res.matches.map((m, idx) => `
                  <div class="regex-match-pill">
                    <div>
                      <span style="color: var(--text-muted); font-size: 0.75rem; margin-right: 0.5rem;">#${idx + 1} at idx ${m.index}:</span>
                      <span class="regex-match-text">"${escapeHtml(m.text)}"</span>
                    </div>
                    ${m.groups.length > 0 ? `<span style="font-size: 0.72rem; color: var(--text-muted);">Groups: [${m.groups.map(g => `"${escapeHtml(g)}"`).join(', ')}]</span>` : ''}
                  </div>
                `).join('')}
              </div>
            `;
          }
          showToast(`Found ${res.matchCount} match(es)`, 'info');
        } else {
          alertBox.style.display = 'flex';
          alertBox.className = 'validation-result invalid';
          alertBox.textContent = `✕ Regex Error: ${res.error}`;
          showToast('Invalid Regex Pattern', 'error');
        }
      };

      document.getElementById('btn-regex-run')?.addEventListener('click', runRegex);
      patternInput.addEventListener('input', runRegex);
      flagsInput.addEventListener('input', runRegex);
      testInput.addEventListener('input', runRegex);

      document.getElementById('btn-regex-sample')?.addEventListener('click', () => {
        patternInput.value = `([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+)`;
        flagsInput.value = 'g';
        testInput.value = `Contact our engineering team at support@devforge.local or reach out to alex.developer@tech-corp.io for commercial licensing.`;
        runRegex();
      });

      document.getElementById('btn-regex-clear')?.addEventListener('click', () => {
        patternInput.value = '';
        testInput.value = '';
        resultsBox.innerHTML = '';
        alertBox.style.display = 'none';
      });
    }

    // 16. Lorem Ipsum Generator
    if (toolId === 'lorem-generator') {
      const countInput = document.getElementById('lorem-count');
      const typeSel = document.getElementById('lorem-type');
      const wrapCheck = document.getElementById('lorem-html-wrap');
      const output = document.getElementById('lorem-output');
      const stats = document.getElementById('lorem-stats');

      const generateLorem = () => {
        const count = parseInt(countInput.value, 10) || 3;
        const text = textTools.generateLorem(count, typeSel.value, wrapCheck.checked);
        output.value = text;
        const s = textTools.getTextStats(text);
        stats.textContent = `${s.words} words • ${s.chars} chars`;
        showToast('Generated Lorem Ipsum', 'success');
      };

      document.getElementById('btn-lorem-generate')?.addEventListener('click', generateLorem);
      document.getElementById('btn-lorem-copy')?.addEventListener('click', () => copyToClipboard(output.value));
      document.getElementById('btn-lorem-clear')?.addEventListener('click', () => {
        output.value = '';
        stats.textContent = '0 words';
      });

      // Generate on initial load
      generateLorem();
    }

    // 17. Markdown Previewer
    if (toolId === 'markdown-preview') {
      const input = document.getElementById('md-input');
      const preview = document.getElementById('md-preview');
      const inStats = document.getElementById('md-in-stats');

      const updatePreview = () => {
        const text = input.value;
        preview.innerHTML = markdownTool.render(text) || '<p style="color:var(--text-muted)">Preview will appear here...</p>';
        inStats.textContent = `${text.length} chars`;
      };

      input.addEventListener('input', updatePreview);

      document.getElementById('btn-md-sample')?.addEventListener('click', () => {
        input.value = markdownTool.getSample();
        updatePreview();
      });

      document.getElementById('btn-md-copy-html')?.addEventListener('click', () => {
        copyToClipboard(preview.innerHTML, 'Copied rendered HTML to clipboard!');
      });

      document.getElementById('btn-md-clear')?.addEventListener('click', () => {
        input.value = '';
        updatePreview();
      });

      // Load sample on initial open
      input.value = markdownTool.getSample();
      updatePreview();
    }
  },

  // ========================================================================
  // Contact Us Form Submission Handler
  // ========================================================================
  bindContactForm() {
    const form = document.getElementById('devforge-contact-form');
    const alert = document.getElementById('contact-alert');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (document.getElementById('contact-name')?.value || '').trim();
      const email = (document.getElementById('contact-email')?.value || '').trim();
      const subject = (document.getElementById('contact-subject')?.value || 'General Question');
      const message = (document.getElementById('contact-message')?.value || '').trim();
      const submitBtn = form.querySelector('button[type="submit"]');

      const mailSubject = encodeURIComponent(`[DevForge] ${subject}`);
      const mailBody = encodeURIComponent(
        `Nama: ${name}\nEmail: ${email}\n\n${message}`
      );

      window.location.href = `mailto:revanmuchlissetiawan@gmail.com?subject=${mailSubject}&body=${mailBody}`;

      setTimeout(() => {
        if (alert) {
          alert.style.display = 'flex';
          alert.className = 'validation-result valid';
          alert.textContent = '✓ Thank you! Your message has been recorded. Our team will review it shortly.';
        }
        showToast('Message sent successfully!', 'success');
        form.reset();
        if (submitBtn) submitBtn.disabled = false;
      }, 500);
    });
  },

  // ========================================================================
  // Global Events (Search Modal, Theme, Mobile Sidebar)
  // ========================================================================
  bindGlobalEvents() {
    // Theme Toggle Button
    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Mobile Sidebar Toggle & Backdrop
    const mobileMenuBtn = document.getElementById('btn-mobile-menu');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');
    
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sidebar = document.getElementById('app-sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
          this.closeSidebar();
        } else {
          this.openSidebar();
        }
      });
    }

    if (sidebarBackdrop) {
      sidebarBackdrop.addEventListener('click', () => {
        this.closeSidebar();
      });
    }

    // Search / Command Palette
    const modal = document.getElementById('search-modal-overlay');
    const searchInput = document.getElementById('global-search-input');
    const resultsContainer = document.getElementById('search-results-list');
    const searchCloseBtn = document.getElementById('btn-search-close');

    const openSearch = () => {
      if (modal) {
        modal.classList.add('open');
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
          renderSearchResults('');
        }
      }
    };

    const closeSearch = () => {
      if (modal) modal.classList.remove('open');
    };

    if (searchCloseBtn) {
      searchCloseBtn.addEventListener('click', () => closeSearch());
    }

    const renderSearchResults = (query) => {
      if (!resultsContainer) return;
      const clean = query.trim().toLowerCase();
      
      const matched = TOOLS.filter(t => {
        return (
          t.name.toLowerCase().includes(clean) ||
          t.desc.toLowerCase().includes(clean) ||
          t.category.toLowerCase().includes(clean) ||
          t.keywords.some(k => k.toLowerCase().includes(clean))
        );
      });

      if (matched.length === 0) {
        resultsContainer.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 2rem;">No developer tools found matching "${escapeHtml(query)}"</div>`;
        return;
      }

      resultsContainer.innerHTML = matched.map((t, idx) => `
        <a href="#/${t.id}" class="search-result-item ${idx === 0 ? 'selected' : ''}" data-route="${t.id}">
          <span style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-primary); width: 24px; text-align: center;">${t.icon}</span>
          <div>
            <div class="search-result-title">${escapeHtml(t.name)}</div>
            <div style="font-size: 0.76rem; color: var(--text-muted);">${escapeHtml(t.desc.substring(0, 75))}...</div>
          </div>
          <span class="search-result-cat">${escapeHtml(t.category)}</span>
        </a>
      `).join('');

      // Clicking any result closes search
      resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => closeSearch());
      });
    };

    // Keyboard shortcut Ctrl+K or Cmd+K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeSearch();
      }
    });

    document.querySelectorAll('.js-open-search').forEach(el => {
      el.addEventListener('click', openSearch);
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeSearch();
    });

    searchInput?.addEventListener('input', (e) => {
      renderSearchResults(e.target.value);
    });
  }
};

// Launch on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
