import { ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { binder } from '@/utilities/Binder';
import { html } from '@/utilities/Html';
import { identifier } from '@/utilities/Identifier';
import { CompositionSpecification } from './Composition';
import { $Word } from './Word';
import { $Referent, Referent as referent } from './Referent';

export class $Mention extends $Word {
    specification = new MentionSpecification();
    get name(): string { return binder.reference(html.copy(this.text))?.name ?? ''; }

    protected override $Define(): void {
        super.$Define();
        const link = binder.reference(html.copy(this.text));
        if (link === undefined) return;
        const Referent = $(referent);
        this.annotations.add(this,
            <Referent>{identifier.slug(link.name)}</Referent>
        );
    }

    override write(): ReactNode { return this.name; }
}

export class MentionSpecification extends CompositionSpecification {
    @specify('a mention says what it mentions')
    $saysWhatItMentions(mention: $Mention): void {
        $check(mention.is($Referent),
            'a mention says its words and an identifier, and this one says no identifier');
    }
}

export const Mention = $($Mention);
