import { $ } from '@dna-platform/chemistry';
import { $Chapter, Chapter, Heading, TableOfContents } from '@dna-platform/public';

export default class $Table extends $Chapter {
    view() {
        return (
            <TableOfContents>
                <Heading>Contents</Heading>
                <Chapter>Early life and education</Chapter>
                <Chapter>Career and research</Chapter>
                <Chapter>Personal life</Chapter>
                <Chapter>Death</Chapter>
                <Chapter>Government apology and pardon</Chapter>
                <Chapter>Further reading</Chapter>
                <Chapter>See also</Chapter>
                <Chapter>Notes</Chapter>
                <Chapter>References</Chapter>
                <Chapter>External links</Chapter>
            </TableOfContents>
        );
    }
}
