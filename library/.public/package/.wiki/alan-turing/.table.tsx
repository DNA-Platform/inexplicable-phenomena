// The contents, written as the chapters themselves. Each <Chapter> means the document that wears
// its title, and wears that document's own classes — which is how the appendices are told apart
// from the body without this file saying so.
import { $ } from '@dna-platform/chemistry';
import { Chapter, TableOfContents } from '@dna-platform/public';

export default $(
    <TableOfContents>
        <Chapter title="Early life and education" />
        <Chapter title="Career and research" />
        <Chapter title="Personal life" />
        <Chapter title="Death" />
        <Chapter title="Government apology and pardon" />
        <Chapter title="Further reading" />
        <Chapter title="See also" />
        <Chapter title="Notes" />
        <Chapter title="References" />
        <Chapter title="External links" />
    </TableOfContents>,
    TableOfContents
);
