import { styled } from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $Format } from '@dna-platform/public';
import $TheLibrary from '../the-library/.book';

// THE PAPER'S OWN BOOK, TYPEWRITTEN, as a manuscript is — the one book of the test library styled
// apart from the others, and the first drawn, so a style that leaked from one page would reach every
// page after it.
export default class $APaper extends $TheLibrary {
    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <Typewritten />
        );
    }
}

export class $Typewritten extends $Format {
    style = styled.div`
        font-family: monospace;
    `;
}

export const Typewritten = $($Typewritten);
