import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Ref } from '@/reference/Ref';
import { Path } from '@/reference/Path';
import { Sentence } from '@/writing/Sentence';
import { Word } from '@/writing/Word';
import { Letter } from '@/writing/Letter';

// The snappy form. Markdown in, a reference assembled — the text becomes the
// words and the target becomes the path, and the form alone decides whether it
// points inside or out.
export class $RefMarkdownSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Ref>{'[gauge theory](/physics/gauge-theory)'}</Ref>
        );
    }
}

export const RefMarkdownSpec = $($RefMarkdownSpec);

// The prop form. A typed path prop beside the written words.
export class $RefPathSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Ref path="https://en.wikipedia.org/wiki/Gauge_theory">gauge theory</Ref>
        );
    }
}

export const RefPathSpec = $($RefPathSpec);

// The element form. Writing beside a held path — the path is parenthetical, so
// the words alone are the surface and the path alone is the target.
export class $RefHeldSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Ref>gauge theory<Path>/physics/gauge-theory</Path></Ref>
        );
    }
}

export const RefHeldSpec = $($RefHeldSpec);

// A ref is a phrase: standing in a sentence it contributes the words of its
// text, and the ref itself is never a part.
export class $RefSentenceSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence>
                <Word><Letter>s</Letter><Letter>e</Letter><Letter>e</Letter></Word>
                {' '}
                <Ref>{'[gauge theory](/physics/gauge-theory)'}</Ref>
            </Sentence>
        );
    }
}

export const RefSentenceSpec = $($RefSentenceSpec);
