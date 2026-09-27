import { Chapter, Synopsis, Title } from '@dna-platform/public';
import LibbySynopsis from '../libby/.synopsis';

// A CATALOGUE'S CHAPTER IS A SYNOPSIS OF ANOTHER BOOK — the Genesis, E33: "A catalogue entry is a chapter
// that is a synopsis; the catalogue may print or import it." This one imports Libby's own synopsis chapter
// and hands it to its Synopsis, which keeps that chapter off the page, gives this chapter its parts under
// this chapter's title, and sends this title to her book — as a synopsis's title goes to the book it is a
// synopsis of.
export default () => (
    <Chapter>
        <Title>[[ Of Libby ]]</Title>
        <Synopsis>{LibbySynopsis()}</Synopsis>
    </Chapter>
);
