import { ReactNode } from 'react';
import { $, $Block, $check, select, styled } from '@dna-platform/chemistry';
import { $Format, $Paragraph } from '@dna-platform/public';

export class $Hatnote extends $Paragraph {
    $Hatnote(block: $Block) {
        super.$Paragraph($check(block, $Block, '!').concat($check(hatnoteFormatLook, '!')));
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
const hatnoteFormatLook = HatnoteFormat;
