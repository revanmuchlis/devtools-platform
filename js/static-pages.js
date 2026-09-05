/**
 * DevForge - Static Pages (About Us, Privacy Policy, Terms of Use, Contact Us, Cookie Policy)
 */

export const staticPages = {
  about() {
    return `
      <div class="page-container">
        <div class="page-hero">
          <div class="badge-privacy" style="margin-bottom: 0.75rem;">100% Client-Side Privacy</div>
          <h1 class="page-hero-title">About DevForge</h1>
          <p class="page-hero-subtitle">
            The high-performance, privacy-first developer utility suite designed to format, validate, encode, and debug text and code without your data ever leaving your browser.
          </p>
        </div>

        <div class="page-section">
          <h2>🛡️ The Zero-Server Privacy Guarantee</h2>
          <p>
            Unlike traditional web utility platforms that upload your JSON files, SQL queries, or private tokens to a backend server for parsing, <strong>DevForge operates 100% locally in your web browser</strong> using modern Web APIs (Web Crypto, TextEncoder, DOMParser, and pure JavaScript engines).
          </p>
          <div class="callout-box security">
            <strong>Zero Data Ingestion:</strong> We have no backend databases storing your payloads. Whether you are debugging production JSON with API keys or inspecting sensitive JWT tokens, your data never crosses the network.
          </div>
        </div>

        <div class="page-section">
          <h2>⚡ Why Developers Choose DevForge</h2>
          <div class="about-grid">
            <div class="about-card">
              <div class="about-card-icon">🚀</div>
              <h3>Blazing Fast Latency</h3>
              <p>Instant parsing and formatting without network roundtrips. Works seamlessly even on slow internet connections.</p>
            </div>
            <div class="about-card">
              <div class="about-card-icon">🔒</div>
              <h3>Enterprise Grade Privacy</h3>
              <p>Safe for formatting proprietary company schemas, environment variables, credentials, and customer records.</p>
            </div>
            <div class="about-card">
              <div class="about-card-icon">💻</div>
              <h3>16+ Specialized Utilities</h3>
              <p>From JSON and XML validators to SQL beautifiers, cryptographic hashes, Base64 converter, and live text diffs.</p>
            </div>
            <div class="about-card">
              <div class="about-card-icon">🆓</div>
              <h3>Free & Open Source Friendly</h3>
              <p>Supported by non-intrusive sponsor ads. Zero subscription paywalls, no daily limits, and completely unthrottled.</p>
            </div>
          </div>
        </div>

        <div class="page-section">
          <h2>📦 Built With Open-Source Standards</h2>
          <p>
            DevForge is built using modern ES6+ standards, semantic HTML5, and native CSS custom properties. We leverage reliable open-source algorithms for cryptographic calculations (MD5, SHA-256 via Web Crypto) and standards-compliant parsers to guarantee maximum precision.
          </p>
        </div>
      </div>
    `;
  },

  privacy() {
    return `
      <div class="page-container">
        <div class="page-hero">
          <h1 class="page-hero-title">Privacy Policy</h1>
          <p class="page-hero-subtitle">Effective Date: January 1, 2026 • Last Updated: September 2026</p>
        </div>

        <div class="page-section">
          <h2>1. Overview & Core Philosophy</h2>
          <p>
            DevForge ("we", "our", or "the Platform") is committed to absolute user privacy. Our platform is architected so that <strong>developer input, code snippets, formatted text, and uploaded files are processed strictly client-side</strong> in your browser's runtime memory.
          </p>
        </div>

        <div class="page-section">
          <h2>2. Data We DO NOT Collect</h2>
          <ul>
            <li><strong>Input Data:</strong> We never log, store, inspect, or transmit any JSON, XML, SQL, HTML, tokens, passwords, or text entered into any tool.</li>
            <li><strong>Files:</strong> Files processed via Base64 or drag-and-drop are parsed entirely via the browser's <code>FileReader</code> API and are never uploaded to any remote server.</li>
            <li><strong>Personal Identifiers:</strong> We do not require accounts, logins, credit cards, or personal credentials to use our utilities.</li>
          </ul>
        </div>

        <div class="page-section">
          <h2>3. Data We May Collect or Store Locally</h2>
          <ul>
            <li><strong>Local Browser Storage (LocalStorage):</strong> We store your UI theme preference (Dark or Light Mode), recent tool history, and your cookie consent status locally on your device. This data never leaves your browser.</li>
            <li><strong>Server Logs:</strong> Standard web server requests (e.g. static assets like CSS/JS files) record IP address, browser type, and timestamp for security monitoring and DDoS defense.</li>
          </ul>
        </div>

        <div class="page-section">
          <h2>4. Cookies & Third-Party Advertising (Google AdSense & Sponsors)</h2>
          <p>
            To keep DevForge free for developers worldwide, we display contextual advertisements from certified third-party ad networks (such as Google AdSense). These providers may use cookies and web beacons to serve ads based on your visit to this and other websites.
          </p>
          <p>
            You can customize or withdraw your advertising cookie consent at any time using our 
            <a href="javascript:void(0)" class="js-cookie-settings" style="color:var(--accent-primary); font-weight:600;">Cookie Preferences Center</a>.
          </p>
        </div>

        <div class="page-section">
          <h2>5. GDPR & CCPA / CPRA Rights</h2>
          <p>
            Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you have the right to know what personal data is processed. Because we do not collect personal identifiers or store your code inputs, we do not sell or share your personal information.
          </p>
        </div>
      </div>
    `;
  },

  terms() {
    return `
      <div class="page-container">
        <div class="page-hero">
          <h1 class="page-hero-title">Terms of Use</h1>
          <p class="page-hero-subtitle">Please read these terms carefully before using DevForge.</p>
        </div>

        <div class="page-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using DevForge, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
          </p>
        </div>

        <div class="page-section">
          <h2>2. Permitted Use & License</h2>
          <p>
            DevForge grants you a free, non-exclusive, non-transferable license to use our tools for personal, academic, or commercial software development, debugging, and text manipulation purposes.
          </p>
          <ul>
            <li>You may format, validate, and convert proprietary, open-source, or commercial code.</li>
            <li>You must not attempt to disrupt the platform infrastructure, bypass security mechanisms, or engage in automated scraping that degrades service for others.</li>
          </ul>
        </div>

        <div class="page-section">
          <h2>3. Disclaimer of Warranties</h2>
          <p>
            DevForge is provided on an "AS IS" and "AS AVAILABLE" basis. While we strive for 100% precision in all formatting, validation, and encoding utilities, we make no representations or warranties of any kind, express or implied, regarding the accuracy, completeness, or suitability of the outputs for critical production systems.
          </p>
        </div>

        <div class="page-section">
          <h2>4. Limitation of Liability</h2>
          <p>
            In no event shall DevForge, its maintainers, or contributors be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the tools, including but not limited to loss of data, corrupted code, or business interruption.
          </p>
        </div>
      </div>
    `;
  },

  contact() {
    return `
      <div class="page-container">
        <div class="page-hero">
          <h1 class="page-hero-title">Contact Us</h1>
          <p class="page-hero-subtitle">
            Have a question, feedback, or a new tool suggestion? We'd love to hear from you.
          </p>
        </div>

        <div class="contact-layout">
          <div class="page-section">
            <h2>📬 Send us a Message</h2>
            <form id="contact-form" class="contact-form">
              <div class="form-group">
                <label class="form-label" for="contact-name">Your Name</label>
                <input type="text" id="contact-name" class="form-input" placeholder="e.g. Alex Johnson" required />
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-email">Email Address</label>
                <input type="email" id="contact-email" class="form-input" placeholder="alex@example.com" required />
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-subject">Inquiry Type</label>
                <select id="contact-subject" class="form-select">
                  <option value="feature">Suggest a New Tool / Feature</option>
                  <option value="bug">Report a Bug / Parser Issue</option>
                  <option value="ad">Advertising & Sponsorship</option>
                  <option value="general">General Question</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-message">Message</label>
                <textarea id="contact-message" class="form-textarea" placeholder="Tell us more about your inquiry or suggestions..." required></textarea>
              </div>

              <button type="submit" id="btn-contact-submit" class="btn btn-primary" style="align-self: flex-start;">
                Send Message
              </button>

              <div id="contact-alert" style="display:none;" class="validation-result valid">
                Thank you! Your message has been sent successfully. We will get back to you within 24-48 hours.
              </div>
            </form>
          </div>

          <div class="contact-info-cards">
            <div class="contact-info-card">
              <h4>💬 Developer Community</h4>
              <p>For open-source discussions, feature suggestions, or pull requests, connect with fellow developers on GitHub and Discord.</p>
            </div>

            <div class="contact-info-card">
              <h4>⚡ Sponsorship & Ads</h4>
              <p>Interested in placing targeted sponsor banners or developer tools affiliate links? Select "Advertising & Sponsorship" in the form.</p>
            </div>

            <div class="contact-info-card">
              <h4>🛡️ Security Reports</h4>
              <p>Responsible disclosure of security findings can be sent directly via our contact form or to security@devforge.local.</p>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="page-section" style="margin-top: 2rem;">
          <h2>Frequently Asked Questions (FAQ)</h2>
          <div class="faq-accordion">
            <div class="faq-item">
              <button class="faq-question">
                Is my data sent to any remote server when using the tools?
                <span class="faq-icon">▼</span>
              </button>
              <div class="faq-answer">
                No. All formatting, encoding, validation, and diffing calculations occur exclusively inside your web browser's local JavaScript environment. No payloads or code files are ever sent to our servers.
              </div>
            </div>

            <div class="faq-item">
              <button class="faq-question">
                Is DevForge completely free to use?
                <span class="faq-icon">▼</span>
              </button>
              <div class="faq-answer">
                Yes! All 16+ tools are 100% free with no daily limits or paywalls. The platform is supported by non-intrusive sponsor ads.
              </div>
            </div>

            <div class="faq-item">
              <button class="faq-question">
                Can I use DevForge offline?
                <span class="faq-icon">▼</span>
              </button>
              <div class="faq-answer">
                Once the page assets are cached in your browser, all utility algorithms function completely offline without an active internet connection.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  cookiePolicy() {
    return `
      <div class="page-container">
        <div class="page-hero">
          <h1 class="page-hero-title">Cookie Policy</h1>
          <p class="page-hero-subtitle">How DevForge uses cookies and local storage.</p>
        </div>

        <div class="page-section">
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your device by websites that you visit. They are widely used to make websites work efficiently, remember user preferences, and provide analytical information to site operators.
          </p>
        </div>

        <div class="page-section">
          <h2>2. Categories of Cookies We Use</h2>
          <ul>
            <li><strong>Essential & Functional (Local Storage):</strong> Stores your UI theme preference (Dark or Light Mode) and your cookie preferences. Without these, preferences would reset upon every page reload.</li>
            <li><strong>Analytics:</strong> Aggregated, anonymized metrics to count tool usage frequency and detect browser performance bottlenecks.</li>
            <li><strong>Advertising & Sponsorship:</strong> Third-party ad networks (like Google AdSense) use cookies to personalize advertisements and measure ad campaign effectiveness.</li>
          </ul>
        </div>

        <div class="page-section">
          <h2>3. Managing Your Preferences</h2>
          <p>
            You can modify your cookie settings at any time by clicking the button below:
          </p>
          <button class="btn btn-primary js-cookie-settings" style="margin-top: 0.5rem;">
            Open Cookie Preferences Center
          </button>
        </div>
      </div>
    `;
  }
};
