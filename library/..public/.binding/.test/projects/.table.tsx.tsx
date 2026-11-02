import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Section, $TableOfContents, $Title, Paragraph as paragraph, Reference as reference, Word as word } from '@dna-platform/public';

export class $Entries extends $Section {
    override write(): ReactNode {
        const contents = this.book?.table?.annotations.expressed($TableOfContents)?.contents ?? [];
        const Paragraph = $(paragraph);
        const Reference = $(reference);
        const Word = $(word);
        const entry = (mention: (typeof contents)[number], index: number): ReactNode => (
            <Word key={index}>
                <Reference>{mention.identifier}</Reference>
                {mention.parent instanceof $Title ? mention.parent.name : mention.identifier}
            </Word>
        );
        return (
            <>
                {super.write()}
                {contents.slice(3).map((mention, index) => <Paragraph key={index}>{entry(mention, index)}</Paragraph>)}
            </>
        );
    }
}

export const Entries = $($Entries);
