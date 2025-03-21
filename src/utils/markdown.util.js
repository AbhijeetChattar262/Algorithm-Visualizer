import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Change to a dark theme for better contrast

export const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        }</code><button class="copy-btn" title="Copy">Copy</button></pre>`;
      } catch (_) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(
      str
    )}</code><button class="copy-btn" title="Copy">Copy</button></pre>`;
  },
  linkify: true,
  breaks: true,
  typographer: true,
});

export const formatResponse = (responseText) => {
  return md.render(responseText);
};
