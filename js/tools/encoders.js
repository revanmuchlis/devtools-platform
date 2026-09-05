/**
 * DevForge - Encoders & Decoders (Base64, URL, JWT) - 100% Client-Side Pure JS
 */

export const encoders = {
  // ==========================================
  // Base64 Text & File Encoders
  // ==========================================
  base64EncodeText(text) {
    try {
      const bytes = new TextEncoder().encode(text);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return { success: true, result: btoa(binary) };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  base64DecodeText(base64Str) {
    try {
      const clean = base64Str.trim().replace(/\s+/g, '');
      const binary = atob(clean);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const text = new TextDecoder().decode(bytes);
      return { success: true, result: text };
    } catch (err) {
      return { success: false, error: 'Invalid Base64 string: ' + err.message };
    }
  },

  async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl: reader.result,
          base64: reader.result.split(',')[1] || ''
        });
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  },

  // ==========================================
  // URL Encoder & Decoder
  // ==========================================
  urlEncode(str, componentOnly = true) {
    try {
      return componentOnly ? encodeURIComponent(str) : encodeURI(str);
    } catch (err) {
      return str;
    }
  },

  urlDecode(str) {
    try {
      return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (err) {
      return 'Error decoding URL: ' + err.message;
    }
  },

  parseQueryString(urlOrQuery) {
    try {
      let queryString = urlOrQuery;
      if (urlOrQuery.includes('?')) {
        queryString = urlOrQuery.split('?')[1];
      }
      const params = new URLSearchParams(queryString);
      const result = {};
      for (const [key, value] of params.entries()) {
        result[key] = value;
      }
      return { success: true, result: JSON.stringify(result, null, 2) };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // ==========================================
  // JWT (JSON Web Token) Decoder
  // ==========================================
  decodeJwt(tokenStr) {
    if (!tokenStr || !tokenStr.trim()) {
      return { success: false, error: 'Please enter a JWT token' };
    }

    const parts = tokenStr.trim().split('.');
    if (parts.length < 2) {
      return { success: false, error: 'Invalid JWT format. Expected 3 segments separated by dots.' };
    }

    try {
      const headerJson = this.base64UrlDecode(parts[0]);
      const payloadJson = this.base64UrlDecode(parts[1]);
      const signature = parts[2] || '';

      const header = JSON.parse(headerJson);
      const payload = JSON.parse(payloadJson);

      let expiryInfo = null;
      if (payload.exp) {
        const expDate = new Date(payload.exp * 1000);
        const now = new Date();
        const isExpired = now > expDate;
        expiryInfo = {
          expDate: expDate.toLocaleString(),
          isExpired,
          diffSeconds: Math.round((expDate.getTime() - now.getTime()) / 1000)
        };
      }

      let issuedInfo = null;
      if (payload.iat) {
        const iatDate = new Date(payload.iat * 1000);
        issuedInfo = iatDate.toLocaleString();
      }

      return {
        success: true,
        header,
        payload,
        signature,
        expiryInfo,
        issuedInfo
      };
    } catch (err) {
      return { success: false, error: 'Failed to decode JWT segments: ' + err.message };
    }
  },

  base64UrlDecode(str) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: break;
      case 2: output += '=='; break;
      case 3: output += '='; break;
      default: throw new Error('Illegal base64url string!');
    }
    return decodeURIComponent(escape(atob(output)));
  }
};
