import { jsonTools } from './js/tools/json-tools.js';
import { codeFormatters } from './js/tools/code-formatters.js';
import { encoders } from './js/tools/encoders.js';
import { cryptoTools } from './js/tools/crypto-tools.js';
import { textTools } from './js/tools/text-tools.js';
import { markdownTool } from './js/tools/markdown-tool.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✕ FAILED: ${message}`);
    failed++;
  }
}

console.log('--- Testing 100% Client-Side Pure JavaScript Tools ---');

// 1. JSON Tools
console.log('\n[1] JSON Tools:');
const sampleJson = '{"name":"DevForge","features":["formatter","validator"],"active":true}';
const formattedJson = jsonTools.format(sampleJson, 2);
assert(formattedJson.success === true, 'JSON formats successfully');
assert(formattedJson.result.includes('\n  "name": "DevForge"'), 'Indents with 2 spaces');

const minifiedJson = jsonTools.minify(formattedJson.result);
assert(minifiedJson.success === true && minifiedJson.result === sampleJson, 'JSON minifies correctly');

const validCheck = jsonTools.validate(sampleJson);
assert(validCheck.valid === true, 'JSON validates successfully');

const invalidCheck = jsonTools.validate('{bad json}');
assert(invalidCheck.valid === false, 'Detects invalid JSON error');

// 2. Code Formatters - SQL
console.log('\n[2] SQL Formatter:');
const rawSql = 'select id, name from users where active = 1 order by id desc;';
const formattedSql = codeFormatters.formatSql(rawSql, true);
assert(formattedSql.includes('SELECT') && formattedSql.includes('FROM') && formattedSql.includes('WHERE'), 'SQL capitalizes keywords');

// 3. Code Formatters - HTML
console.log('\n[3] HTML Formatter:');
const rawHtml = '<div><p><span>Hello</span></p></div>';
const formattedHtml = codeFormatters.formatHtml(rawHtml, 2);
assert(formattedHtml.includes('<div>\n  <p>'), 'HTML formatted with tags indented');

// 4. Encoders - Base64 & URL
console.log('\n[4] Encoders (Base64 & URL):');
const testStr = 'DevForge Utility Suite 2026';
const b64 = encoders.base64EncodeText(testStr);
assert(b64.success === true, 'Base64 text encodes');
const decodedB64 = encoders.base64DecodeText(b64.result);
assert(decodedB64.success === true && decodedB64.result === testStr, 'Base64 text decodes back to original');

const urlEnc = encoders.urlEncode('https://devforge.local/search?q=developer tools&mode=fast');
assert(urlEnc.includes('%20') || urlEnc.includes('%3A'), 'URL encodes special chars');

// 5. Crypto Tools - MD5 & UUID
console.log('\n[5] Cryptography (MD5 & UUID):');
const md5Hash = cryptoTools.md5('hello world');
assert(md5Hash === '5eb63bbbe01eeed093cb22bb8f5acdc3', 'MD5 hash matches known vector');

const uuids = cryptoTools.generateUuid(5, { uppercase: true, hyphens: true });
assert(uuids.length === 5, 'Generates requested number of UUIDs');
assert(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/.test(uuids[0]), 'Valid v4 UUID format');

// 6. Text Tools - Case Converter, Diff, Regex
console.log('\n[6] Text Utilities:');
const camel = textTools.convertCase('user_first_name', 'camelCase');
assert(camel === 'userFirstName', 'Converts snake_case to camelCase');

const kebab = textTools.convertCase('UserAccountSettings', 'kebab-case');
assert(kebab === 'user-account-settings', 'Converts PascalCase to kebab-case');

const diff = textTools.diffText('Line 1\nLine 2', 'Line 1\nLine 2 modified');
assert(diff.some(d => d.type === 'added'), 'Diff identifies line changes');

const regexRes = textTools.testRegex('\\d+', 'g', 'Port 3000 and 8080');
assert(regexRes.success && regexRes.matchCount === 2, 'Regex tester extracts matches');

// 7. Markdown Preview
console.log('\n[7] Markdown Tool:');
const mdHtml = markdownTool.render('# Title\n\n**Bold Text** and `code`');
assert(mdHtml.includes('<h1>Title</h1>') && mdHtml.includes('<strong>Bold Text</strong>'), 'Markdown compiles to HTML tags');

console.log(`\n========================================`);
console.log(`Test Results: ${passed} passed, ${failed} failed`);
console.log(`========================================`);

if (failed > 0) process.exit(1);
