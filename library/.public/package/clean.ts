import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap(name => {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) return walk(path);
        return /\.(ts|tsx)$/.test(name) ? [path] : [];
    });

const chemistryImport = /import \{([^}]*)\} from '@dna-platform\/chemistry';/;
let touched = 0;

for (const file of walk('src')) {
    const before = readFileSync(file, 'utf8');
    let s = before;

    s = s.replace(/\$Html<'block'>/g, '$Block');
    s = s.replace(/this\.(?:_?type) = (\$\(<TypeOf[\w$]* \/>\))(?: as \$TypeOf[\w$]*)?;/g, 'this._type = $1;');

    const imported = s.match(chemistryImport);
    if (imported) {
        const names = imported[1].split(',').map(one => one.trim()).filter(one => one !== '');
        const body = s.replace(chemistryImport, '');
        if (/[^\w$]\$Block[^\w$]/.test(body) && !names.includes('$Block')) names.unshift('$Block');
        if (!/[^\w$]\$Html[^\w$]/.test(body) && names.includes('$Html')) names.splice(names.indexOf('$Html'), 1);
        s = s.replace(chemistryImport, `import { ${names.join(', ')} } from '@dna-platform/chemistry';`);
    }

    if (s !== before) {
        writeFileSync(file, s);
        touched++;
        console.log('cleaned', file);
    }
}
console.log(`${touched} files cleaned`);
