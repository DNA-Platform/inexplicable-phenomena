import React, { type ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { $Referent } from '../ref/Referent';
import { text } from '../tools/html';
import { type $Composition } from '../text/Composition';
import { $Section } from '../text/Section';
import { $Paragraph } from '../text/Paragraph';
import { $Word } from '../text/Word';

export class $Chapter extends $Referent implements $Composition<$Section> {
    sections: $Section[] = [];

    get copy(): string { return this.parts.map(s => s.copy).join('\n\n'); }
    get parts(): $Section[] { return this.sections; }
    get canonical(): $Section { return this.parts[0]; }
    get title(): string { return this.canonical ? text(this.canonical.title) : ''; }
    get paragraphs(): $Paragraph[] { return this.parts.flatMap(s => s.paragraphs); }
    get words(): $Word[] { return this.paragraphs.flatMap(p => p.words); }

    $Chapter(...sections: $Section[]) {
        this.sections = sections.map(s => $check(s, $Section));
    }

    view(): ReactNode {
        return this.parts.map((s, i) => React.createElement($(s as any) as any, { key: i }));
    }
}

export const Chapter = $($Chapter);
