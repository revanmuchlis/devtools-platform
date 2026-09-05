/**
 * DevForge - GDPR/CCPA Cookie Compliance & Consent Manager
 */

export const compliance = {
  STORAGE_KEY: 'devforge_cookie_consent_v1',

  init() {
    this.renderBanner();
    this.bindEvents();
    this.checkConsent();
  },

  getConsent() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  },

  setConsent(consentObj) {
    try {
      const data = {
        timestamp: new Date().toISOString(),
        ...consentObj
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      this.hideBanner();
      this.closeModal();
      this.applyConsent(data);
    } catch (e) {
      console.warn('Unable to persist cookie consent', e);
    }
  },

  checkConsent() {
    const consent = this.getConsent();
    if (!consent) {
      setTimeout(() => {
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.style.display = 'flex';
      }, 600);
    } else {
      this.applyConsent(consent);
    }
  },

  applyConsent(consent) {
    // Notify or enable ad scripts / analytics based on user selection
    if (consent.advertising) {
      window.__adConsentGiven = true;
      document.querySelectorAll('.ad-slot').forEach(el => el.classList.remove('ads-disabled'));
    } else {
      window.__adConsentGiven = false;
      document.querySelectorAll('.ad-slot').forEach(el => el.classList.add('ads-disabled'));
    }
  },

  hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'none';
  },

  openModal() {
    const modal = document.getElementById('cookie-modal-overlay');
    if (modal) {
      modal.classList.add('open');
      const consent = this.getConsent() || { necessary: true, analytics: true, advertising: true };
      const analyticsEl = document.getElementById('cookie-opt-analytics');
      const adsEl = document.getElementById('cookie-opt-ads');
      if (analyticsEl) analyticsEl.checked = !!consent.analytics;
      if (adsEl) adsEl.checked = !!consent.advertising;
    }
  },

  closeModal() {
    const modal = document.getElementById('cookie-modal-overlay');
    if (modal) modal.classList.remove('open');
  },

  renderBanner() {
    if (document.getElementById('cookie-banner')) return;

    const bannerHtml = `
      <div id="cookie-banner" class="cookie-banner" style="display: none;">
        <div class="cookie-content">
          <div class="cookie-icon">🍪</div>
          <div class="cookie-text">
            <h4>We Value Your Privacy</h4>
            <p>
              DevForge processes all code and developer inputs <strong>strictly on your local device</strong> (Zero Server Uploads). 
              We use essential cookies and sponsor ad cookies to keep these utility tools 100% free and open. Read our 
              <a href="#/privacy">Privacy Policy</a> and <a href="#/cookie-policy">Cookie Policy</a>.
            </p>
          </div>
        </div>
        <div class="cookie-actions">
          <button id="btn-cookie-decline" class="btn btn-outline btn-sm">Essential Only</button>
          <button id="btn-cookie-custom" class="btn btn-secondary btn-sm">Customize Preferences</button>
          <button id="btn-cookie-accept" class="btn btn-primary btn-sm">Accept All</button>
        </div>
      </div>

      <!-- Cookie Preferences Modal -->
      <div id="cookie-modal-overlay" class="modal-overlay">
        <div class="cookie-modal">
          <div class="search-modal-header" style="justify-content: space-between;">
            <h3 style="font-size: 1.15rem; font-weight: 700;">Cookie & Consent Preferences</h3>
            <button id="btn-close-cookie-modal" class="btn-icon" style="border:none; background:transparent;">✕</button>
          </div>
          
          <div class="cookie-category">
            <div class="cookie-cat-header">
              <span class="cookie-cat-title">Strictly Necessary Cookies</span>
              <label class="switch">
                <input type="checkbox" checked disabled>
                <span class="slider"></span>
              </label>
            </div>
            <p class="cookie-cat-desc">Required for core website functionality, dark/light theme persistence, and tool state saving.</p>
          </div>

          <div class="cookie-category">
            <div class="cookie-cat-header">
              <span class="cookie-cat-title">Analytics & Performance</span>
              <label class="switch">
                <input type="checkbox" id="cookie-opt-analytics" checked>
                <span class="slider"></span>
              </label>
            </div>
            <p class="cookie-cat-desc">Helps us understand which developer tools are most popular and optimize rendering speeds.</p>
          </div>

          <div class="cookie-category">
            <div class="cookie-cat-header">
              <span class="cookie-cat-title">Personalized Ads & Sponsors</span>
              <label class="switch">
                <input type="checkbox" id="cookie-opt-ads" checked>
                <span class="slider"></span>
              </label>
            </div>
            <p class="cookie-cat-desc">Permits partner advertising networks (such as Google AdSense) to display relevant developer tools and server offers.</p>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.5rem;">
            <button id="btn-save-cookie-prefs" class="btn btn-primary">Save Preferences</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', bannerHtml);
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target && e.target.id === 'btn-cookie-accept') {
        this.setConsent({ necessary: true, analytics: true, advertising: true });
      } else if (e.target && e.target.id === 'btn-cookie-decline') {
        this.setConsent({ necessary: true, analytics: false, advertising: false });
      } else if (e.target && (e.target.id === 'btn-cookie-custom' || e.target.classList.contains('js-cookie-settings'))) {
        this.openModal();
      } else if (e.target && e.target.id === 'btn-close-cookie-modal') {
        this.closeModal();
      } else if (e.target && e.target.id === 'btn-save-cookie-prefs') {
        const analytics = document.getElementById('cookie-opt-analytics')?.checked || false;
        const advertising = document.getElementById('cookie-opt-ads')?.checked || false;
        this.setConsent({ necessary: true, analytics, advertising });
      } else if (e.target && e.target.id === 'cookie-modal-overlay') {
        this.closeModal();
      }
    });
  }
};
