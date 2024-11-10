import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

export const md = new MarkdownIt({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code><button class="copy-btn">Copy to clipboard</button></pre>`;
            } catch (_) { }
        }
        return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code><button class="copy-btn">Copy to clipboard</button></pre>`;
    },
});

export const formatResponse = (responseText) => {
    return md.render(responseText);
};
