import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative, sep } from 'path';

// EMITS THE REGISTRATIONS INTO src/index.ts, and nothing else in that file.
//
// DI happens in one place and late: the composition root, after every module has
// resolved. A kind that needs wiring declares `static $register()`; this walks src
// for those, and writes the imports and the calls between the two markers below.
// Hand-maintaining that list is how a kind gets added and silently never wired,
// so the build emits it instead — `prebuild` runs this before every rollup.

const opening = '// <registrations>';
const closing = '// </registrations>';

const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap(name => {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) return walk(path);
        return /\.tsx?$/.test(name) ? [path] : [];
    });

const declared: { kind: string; module: string }[] = [];

for (const file of walk('src')) {
    const source = readFileSync(file, 'utf8');
    if (!source.includes('static $register')) continue;
    const module = './' + relative('src', file).split(sep).join('/').replace(/\.tsx?$/u, '');
    for (const chunk of source.split(/^export class /mu).slice(1))
        if (/^[\s\S]*?\n\s*static \$register\s*\(/u.test(chunk.split(/^export class /mu)[0]))
            declared.push({ kind: chunk.split(/[\s<{]/u)[0], module });
}

declared.sort((a, b) => (a.module + a.kind).localeCompare(b.module + b.kind));

const emitted = declared.length === 0
    ? ['// none — no kind declares static $register().']
    : [
        ...declared.map(({ kind, module }) => `import { ${kind} } from '${module}';`),
        '',
        ...declared.map(({ kind }) => `${kind}.$register();`),
    ];

const index = 'src/index.ts';
const before = readFileSync(index, 'utf8');
const at = before.indexOf(opening);
const to = before.indexOf(closing);
if (at < 0 || to < 0) throw new Error(`${index} carries no ${opening} … ${closing} pair, so there is nowhere to emit.`);

const after = before.slice(0, at + opening.length) + '\n' + emitted.join('\n') + '\n' + before.slice(to);
if (after !== before) writeFileSync(index, after, 'utf8');

console.log(`$register: ${declared.length} — ${declared.map(d => d.kind).join(', ') || 'none'}${after === before ? ' (unchanged)' : ' (written)'}`);
