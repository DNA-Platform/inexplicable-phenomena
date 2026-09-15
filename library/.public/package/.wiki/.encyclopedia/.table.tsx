import { $ } from '@dna-platform/chemistry';
import { chapter as Chapter, TableOfContents, Title } from '@dna-platform/public';
import { $PortalChapter as $Chapter } from './.book';

export default class $Contents extends $Chapter {
    print() {
        return (
            <TableOfContents print={false}>
                <Title>Contents</Title>
                <Chapter>Wikipedia</Chapter>
                <Chapter>The Free Encyclopedia</Chapter>
                <Chapter>Contents</Chapter>
                <Chapter>Read Wikipedia in your language</Chapter>
                <Chapter>The Foundation</Chapter>
                <Chapter>Other projects</Chapter>
                <Chapter>The Licence</Chapter>
            </TableOfContents>
        );
    }
}
