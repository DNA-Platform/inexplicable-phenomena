import fs from 'node:fs';
import path from 'node:path';
const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/u, '$1'));
const { notes } = JSON.parse(fs.readFileSync(path.join(here, 'pnp-notes.json'), 'utf8'));
const escaped = text => text.replace(/\\/gu, '\\\\').replace(/"/gu, '\\"').replace(/\s+/gu, ' ').trim();
const says = note => note.text.replace(/[^\p{L}\p{N}]/gu, '').length >= 3;
const silent = notes.filter(note => !says(note)).map(note => note.number);
const entries = notes.filter(says).map(note => `                    <Entry>{"note${note.number}: ${escaped(note.text)}"}</Entry>`).join('\n');
console.log(`notes ${notes.length} · saying something ${notes.length - silent.length} · left out for saying nothing: ${silent.join(', ')}`);
const file = `import { $ } from '@dna-platform/chemistry';
import { $Chapter, Entry, Heading, Notes, Section } from '@dna-platform/public';

export default class $NotesChapter extends $Chapter {
    print() {
        return (
            <Notes>
                <Section>
                    <Heading>Notes</Heading>
${entries}
                </Section>
            </Notes>
        );
    }
}
`;
for (const tree of process.argv.slice(2)) {
    fs.writeFileSync(path.join(tree, 'notes.tsx'), file);
    let book = fs.readFileSync(path.join(tree, 'book.tsx'), 'utf8');
    if (!book.includes('./notes')) {
        book = book
            .replace("import $References from './references';", "import $References from './references';\nimport $Notes from './notes';")
            .replace('const References = $($References);', 'const References = $($References);\nconst Notes = $($Notes);')
            .replace(/(\s*)<References \/>/u, '$1<References />$1<Notes />');
        fs.writeFileSync(path.join(tree, 'book.tsx'), book);
    }
    let table = fs.readFileSync(path.join(tree, '.table.tsx'), 'utf8');
    if (!table.includes('pd-notes')) {
        table = table.replace(/(<Row className="pd-references"><Chapter>References<\/Chapter><\/Row>)/u, '$1\n                <Row className="pd-notes"><Chapter>Notes</Chapter></Row>');
        fs.writeFileSync(path.join(tree, '.table.tsx'), table);
    }
    console.log(`${tree}: notes.tsx with ${notes.length} entries · book lists Notes: ${fs.readFileSync(path.join(tree, 'book.tsx'), 'utf8').includes('<Notes />')} · contents row: ${fs.readFileSync(path.join(tree, '.table.tsx'), 'utf8').includes('pd-notes')}`);
}
