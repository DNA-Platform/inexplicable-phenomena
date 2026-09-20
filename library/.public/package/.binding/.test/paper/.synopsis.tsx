import { $Chapter, For, Paragraph, Synopsis, Title } from '@dna-platform/public';

export default class $Synopsis extends $Chapter {
    print() {
        return (
            <Synopsis>
                <For>A Paper</For>
                <Title print={false}>Synopsis</Title>
                <Paragraph>
                    Written by the persona and shelved under the library, so its author and its subject are two
                    different books. It is the book the others point at, and the one with the most references in it.
                </Paragraph>
            </Synopsis>
        );
    }
}
