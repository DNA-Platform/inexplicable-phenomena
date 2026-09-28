import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Paragraph, $Next, $Previous } from '@dna-platform/public';

// THE CATCHWORD, at the foot of every chapter of every book: a Previous that shows the previous
// chapter's title and a Next that shows the next's, each linking to that chapter's route — and at the
// ends, to its own chapter, drawn as a self-reference. The words are this file's business and not the
// component's: a Next draws what is written in it, and these two draw the neighbour's title instead.
export class $PreviousTitle extends $Previous {
    override write(): ReactNode { return this.chapter?.previous.title?.name; }
}

export class $NextTitle extends $Next {
    override write(): ReactNode { return this.chapter?.next.title?.name; }
}

export class $Catchword extends $Paragraph {
    $Catchword(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.text.add(this, <PreviousTitle />, <NextTitle />);
    }

    override write(): ReactNode {
        const [Previous, Next] = [...this.text].map(chemical => $(chemical));
        return (
            <>
                <Previous /> · <Next />
            </>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-catchword');
    }
}

export const PreviousTitle = $($PreviousTitle);
export const NextTitle = $($NextTitle);
export const Catchword = $($Catchword);
