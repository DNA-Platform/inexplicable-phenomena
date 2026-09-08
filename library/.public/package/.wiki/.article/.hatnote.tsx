import { ReactNode } from 'react';
import { $, select, styled } from '@dna-platform/chemistry';
import { $Format, $Paragraph } from '@dna-platform/public';

export class $Hatnote extends $Paragraph {
    override frame(drawn: ReactNode): ReactNode {
        const Note = $(HatnoteFormat);

        return <Note>{super.frame(drawn)}</Note>;
    }
}

export class $HatnoteFormat extends $Format {
    selector = styled.div;
    fontStyle = 'italic';
    paddingLeft = '1.6em';
    margin = '0 0 0.7em';

    @select('p')
    line_margin = '0';
}

export const Hatnote = $($Hatnote);
export const HatnoteFormat = $($HatnoteFormat);
