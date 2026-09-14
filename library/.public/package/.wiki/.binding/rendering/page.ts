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

export const page = (built: string, markup: string, styles: string, title: string): string =>
    built
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${escaped(title)}</title>`)
        .replace('</head>', `${styles}\n  </head>`)
        .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
