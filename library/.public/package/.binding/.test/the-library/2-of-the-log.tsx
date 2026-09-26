import { Chapter, Synopsis, Title } from '@dna-platform/public';
import LogSynopsis from '../the-log/.synopsis';

// A CATALOGUE'S CHAPTER IS A SYNOPSIS OF ANOTHER BOOK — the Genesis, E33: "A catalogue entry is a chapter
// that is a synopsis; the catalogue may print or import it." This one imports the log's own synopsis
// chapter and renders it inside itself, and its Synopsis reaches in and means what that one means.
// Doug, 2026-09-26: "Maybe it is a chapter that renders it, and then decorates it. Chapters can be in
// chapters"; "someone can just write a synopsis by hand. It doesn't need to be borrowed."
export default () => (
    <Chapter>
        <Title>[[ Of the Log ]]</Title>
        {LogSynopsis()}
        <Synopsis />
    </Chapter>
);
