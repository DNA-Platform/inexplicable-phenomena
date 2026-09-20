import { $Chapter, For, Paragraph, Synopsis, Title } from '@dna-platform/public';

export default class $Synopsis extends $Chapter {
    print() {
        return (
            <Synopsis>
                <For>Some Projects</For>
                <Title print={false}>Synopsis</Title>
                <Paragraph>An ordinary book: written by the log, shelved under the library, about the work.</Paragraph>
            </Synopsis>
        );
    }
}
