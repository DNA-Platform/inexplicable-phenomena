import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Chapter, $Content, $Format, $Writing } from '@dna-platform/public';
import { $Appendix } from './7-the-explorer.appendix.tsx';
import { $Tabbed } from './7-the-explorer.paging.tsx';

export class $Branch extends $Format {
    get chapter(): $Chapter | undefined {
        const identifier = this.parent?.annotations.expressed($Content)?.identifier;
        if (identifier === undefined || identifier === '') return undefined;
        return this.$book?.text.find($Chapter).find(chapter => chapter.mention?.identifier === identifier);
    }

    $Branch(...chemicals: $Chemical[]) {
        this.$Format(...chemicals);
        this.style = (props: { className?: string; children?: ReactNode }) => {
            const chapter = this.chapter;
            const leaves = chapter === undefined ? [] : $Appendix.of(chapter);
            return (
                <div {...props}>
                    {props.children}
                    {leaves.map((leaf, index) => (
                        <a key={index} className={[...leaf.classes].includes('pa-open') ? 'pd-leaf pa-open' : 'pd-leaf'} href={leaf.mention?.identifier}>{$Appendix.named(leaf)}</a>
                    ))}
                </div>
            );
        };
    }

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-branch');
        const chapter = this.chapter;
        const open = chapter !== undefined && this.$book?.annotations.expressed($Tabbed)?.open === chapter;
        const lit = [...writing.classes].includes('pa-open');
        if (open && !lit) writing.classes.add(this, 'pa-open');
        if (!open && lit) { writing.classes.revert(this); writing.classes.add(this, 'pa-branch'); }
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }
}

export const Branch = $($Branch);
