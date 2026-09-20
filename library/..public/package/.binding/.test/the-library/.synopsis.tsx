import { $Chapter, For, Paragraph, Synopsis, Title } from '@dna-platform/public';

export default class $Synopsis extends $Chapter {
    print() {
        return (
            <Synopsis>
                <For>The Library</For>
                <Title print={false}>Synopsis</Title>
                <Paragraph>
                    The one book here filed under its own subject, which is what makes it the top of the library
                    rather than one more book on the shelf. Everything else stands under it, directly or through
                    another book.
                </Paragraph>
            </Synopsis>
        );
    }
}
