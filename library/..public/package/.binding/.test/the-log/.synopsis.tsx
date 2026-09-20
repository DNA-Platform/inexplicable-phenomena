import { $Chapter, For, Paragraph, Synopsis, Title } from '@dna-platform/public';

export default class $Synopsis extends $Chapter {
    print() {
        return (
            <Synopsis>
                <For>The Log</For>
                <Title print={false}>Synopsis</Title>
                <Paragraph>
                    The one book here that is its own author. Every other book is written by it or by something it
                    has vouched for, so authorship in this library begins here and nowhere else.
                </Paragraph>
            </Synopsis>
        );
    }
}
