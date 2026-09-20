import type { Configuration } from '../configuration/configuration';

const escaped = (text: string): string =>
    text.replace(/[&<>"]/g, one => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[one] ?? one));

export const template = (html: string, chosen: Configuration): string => {
    const { title, icon, fonts } = chosen.rendering;
    const head = [
        icon ? `<link rel="icon" href="${icon}" />` : '',
        ...(fonts.length ? ['<link rel="preconnect" href="https://fonts.googleapis.com" />', '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />'] : []),
        ...fonts.map(url => `<link href="${url}" rel="stylesheet" />`),
    ].filter(Boolean).map(line => '    ' + line).join('\n');
    return html.replace('<title></title>', `<title>${escaped(title)}</title>${head ? '\n' + head : ''}`);
};

// A CLICK BEFORE REACT LISTENS IS KEPT AND REPLAYED. The prerender shows its controls the
// moment it is parsed; the script that makes them answer arrives seconds later, and React
// does not replay a click on a boundary it had not hydrated (measured 2026-09-14, React 19.2).
// So the page itself listens from its first byte: clicks under #root are kept, and the entry
// re-dispatches them once the book has mounted. Inline, so nothing is awaited before it runs.
const kept = `<script>(function(){var k=[];function on(e){var r=document.getElementById('root');if(!r||!r.contains(e.target)||e.__replayed)return;k.push({t:e.target,type:e.type});}document.addEventListener('click',on,true);window.__replayKept=function(){document.removeEventListener('click',on,true);var q=k;k=[];q.forEach(function(one){if(!document.contains(one.t))return;var ev=new MouseEvent(one.type,{bubbles:true,cancelable:true});ev.__replayed=true;one.t.dispatchEvent(ev);});};})();</script>`;

export const page = (built: string, markup: string, styles: string, title: string): string =>
    built
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${escaped(title)}</title>`)
        .replace('</head>', `${styles}
  ${kept}
  </head>`)
        .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
