import { Chapter, Synopsis, Title } from '@dna-platform/public';
import LogSynopsis from '../the-log/.synopsis';

// A CATALOGUE'S CHAPTER IS A SYNOPSIS OF ANOTHER BOOK — the Genesis, E33: "A catalogue entry is a chapter
// that is a synopsis; the catalogue may print or import it." This one imports the log's own synopsis
// chapter and hands it to its Synopsis, which keeps that chapter off the page, gives this chapter its
// parts under this chapter's title, and sends this title to the log — as a synopsis's title goes to the
// book it is a synopsis of. Doug, 2026-09-26: "the synopsis attribute can take another synopsis
// component and populate everything under the title"; "the chapter is kept out of the Synopsis
// annotation's text, so that even in theory, it is not on the page."
export default () => (
    <Chapter>
        <Title>[[ Of the Log ]]</Title>
        <Synopsis>{LogSynopsis()}</Synopsis>
    </Chapter>
);
