// THE PAPER'S REAL TITLE IS A FORMULA. Doug, 2026-09-09: "Did you get the title wrong? Isn't it
// like a Latex title? Natural! Like, did you not support the title? We build this to support.
// What's wrong with a title written in latex notation?" Nothing — and this is the demo that says
// so, because a title is a piece of writing like any other and $Math stands inside one.
import { $ } from '@dna-platform/chemistry';
import { Author, Cover, Math, Reference, Subject, Title } from '@dna-platform/public';
import { $AaronsonChapter as $Chapter } from './.book';

export default class $Cover extends $Chapter {
    print() {
        return (
            <Cover>
                <Title>
                    <Math>{String.raw`\mathsf{P} \stackrel{?}{=} \mathsf{NP}`}</Math>
                    <Reference>https://www.scottaaronson.com/papers/pnp.pdf</Reference>
                </Title>
                <Author>Scott Aaronson</Author>
                <Subject print={false}>Computational complexity</Subject>
            </Cover>
        );
    }
}
