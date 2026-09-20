import { $Chapter, For, Paragraph, Synopsis, Title } from '@dna-platform/public';

export default class $Synopsis extends $Chapter {
    print() {
        return (
            <Synopsis>
                <For>A Persona</For>
                <Title print={false}>Synopsis</Title>
                <Paragraph>
                    A book that may write, because the log catalogues it and the log wrote it. It is the only
                    author here besides the log, and everything it writes is vouched for through that one fact.
                </Paragraph>
            </Synopsis>
        );
    }
}
