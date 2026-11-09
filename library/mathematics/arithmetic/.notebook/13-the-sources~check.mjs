// The checker beside The Sources. Proves every quoted span in the notebook's chapters stands in a message of the conversations given, or in a
// file pasted into one, allowing the spelling and grammar of the quote to have been cleaned: a span between
// double quotes of at least four words, split at an ellipsis, is matched word for word against every message,
// and stands when some message carries at least four fifths of its words in order. Says every miss by chapter.
//
//     node 13-the-sources~check.mjs <notebook folder> <conversation folder | words.md> [conversation folder | words.md …]
//
// A markdown file among the sources lends its verbatim passages, the spans written *"…"*, as messages: the sprint
// chapter's record of what Doug said in the room.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const [notebook, ...books] = process.argv.slice(2);
const sorts = 'Matter|Summary|Result|Formalism|Correction|Importance|Revision|Archive|Idea|Question|Reminder|Remark|Note|Turn|Thought|Comment|Reaction|Description';
const read = s => s.replace(/<[^>]+>/gu, ' ').replace(/\{'\s*'\}|\{" "\}|\{'\{'\}|\{'\}'\}/gu, ' ')
    .replace(/&lt;/gu, '<').replace(/&gt;/gu, '>').replace(/&amp;/gu, '&').replace(/&#123;/gu, '{').replace(/&#125;/gu, '}').replace(/&quot;/gu, '"').replace(/&#39;/gu, "'")
    .replace(/[‘’]/gu, "'").replace(/[“”]/gu, '"').replace(/…/gu, '...').replace(/\s+/gu, ' ').trim();
const words = s => s.toLowerCase().replace(/[^\p{L}\p{N}'()+=\-*/]+/gu, ' ').split(/\s+/u).filter(w => w !== '' && w !== '-');

const messages = [];
for (const book of books.filter(b => b.endsWith('.md'))) {
    for (const m of readFileSync(book, 'utf8').matchAll(/\*"([\s\S]*?)"\*/gu)) messages.push({ at: book, words: words(read(m[1])) });
}
for (const book of books.filter(b => !b.endsWith('.md'))) for (const file of readdirSync(book)) {
    if (/^\d+-.+\.tsx$/u.test(file)) {
        const text = readFileSync(join(book, file), 'utf8').replace(new RegExp(`<(${sorts})>[\\s\\S]*?</\\1>`, 'gu'), ' ');
        for (const m of text.matchAll(/<Message\s+at="([^"]+)"[\s\S]*?(?=<Message\s+at=|<Append|<\/Chapter>)/gu)) messages.push({ at: m[1], words: words(read(m[0])) });
    } else if (/^\d+-.+~.+\.txt$/u.test(file)) {
        messages.push({ at: file, words: words(readFileSync(join(book, file), 'utf8')) });
    }
}

// The longest common subsequence of the piece against a message, in words, counted in one pass per message.
const lcs = (a, b) => {
    let prev = new Array(b.length + 1).fill(0);
    for (let i = 1; i <= a.length; i++) {
        const cur = new Array(b.length + 1).fill(0);
        for (let j = 1; j <= b.length; j++) cur[j] = a[i - 1] === b[j - 1] ? prev[j - 1] + 1 : Math.max(prev[j], cur[j - 1]);
        prev = cur;
    }
    return prev[b.length];
};
const stands = piece => {
    const set = new Set(piece);
    for (const message of messages) {
        let shared = 0;
        for (const w of set) if (message.words.includes(w)) shared++;
        if (shared < set.size * 0.7) continue;
        if (lcs(piece, message.words) >= Math.ceil(piece.length * 0.8)) return true;
    }
    return false;
};

let spans = 0, misses = 0;
for (const file of readdirSync(notebook).filter(f => /^\d+-.+\.tsx$/u.test(f)).sort((a, b) => Number(a.split('-')[0]) - Number(b.split('-')[0]))) {
    const text = read(readFileSync(join(notebook, file), 'utf8'));
    const own = [];
    for (const match of text.matchAll(/"([^"]{12,}?)"/gu)) {
        for (const piece of match[1].split(/\.\.\./u).map(p => words(p)).filter(p => p.length >= 4)) {
            spans++;
            if (!stands(piece)) own.push(piece.join(' '));
        }
    }
    misses += own.length;
    console.log(`${file}: ${own.length === 0 ? 'every quoted span stands in a message' : `${own.length} NOT FOUND`}`);
    for (const miss of own) console.log(`  "${miss}"`);
}
console.log(`${spans} quoted spans checked against ${messages.length} messages and pasted files of ${books.length} conversations, ${misses} not found`);
process.exit(misses === 0 ? 0 : 1);
