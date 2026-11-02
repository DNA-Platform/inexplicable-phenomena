import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Paragraph, $Next, $Previous } from '@dna-platform/public';

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
