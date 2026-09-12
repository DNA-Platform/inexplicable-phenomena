import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Type } from '@/writing/Type';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { $Section, $TypeOfSection } from '@/writing/Section';
import { $Theme, Theme as theme } from '@/writing/Theme';

export interface $Document$ extends $Composition$ {
    title(): $Writing | undefined;
}

export class $Document extends $Composition implements $Document$ {
    definition = 'article';
    _theme: $Theme | undefined = undefined;

    override get theme(): $Theme { return this._theme ?? reflection.theme(); }
    set theme(theme: $Theme) { this._theme = theme; }
    title(): $Writing | undefined { return this.searchFor<$Section>($TypeOfSection)[0]?.heading(); }

    $Document(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfDocument));
    }
}

export class $$Document extends $Catalogue { }

export class $TypeOfDocument extends $Type {
    protected override specification: Specification<$Writing> = new DocumentSpecification();

    override specifically(writing: $Writing): void {
        (writing as $Document).theme = $check(theme, '!');
        super.specifically(writing);
    }
}

export class DocumentSpecification extends WritingSpecification {
}

export const Document = $($Document);
export const doc = $($$Document);
export const TypeOfDocument = $($TypeOfDocument);
