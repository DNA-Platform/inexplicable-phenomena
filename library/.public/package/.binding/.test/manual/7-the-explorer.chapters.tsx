import { $, selection } from '@dna-platform/chemistry';
import { $Cover, $Synopsis, $TableOfContents } from '@dna-platform/public';

export class $ManualCover extends $Cover {
    override style = selection.header`
        .pa-cover { margin-block: 0; }
        .pa-cover .pd-title { font-size: calc(1.6 * ${({ theme }) => theme.size}); line-height: 1.3; margin-block: 0; }
        .pa-cover .pd-catchword { display: none; }
    `;
}

export class $ManualSynopsis extends $Synopsis {
    override style = selection.div`
        .pa-synopsis .pd-catchword { display: none; }
    `;
}

export class $ManualTableOfContents extends $TableOfContents {
    override style = selection.nav`
        .pa-table-of-contents { counter-reset: entry; font-size: calc(0.9 * ${({ theme }) => theme.size}); }
        .pa-table-of-contents .pd-heading { font-size: calc(0.7 * ${({ theme }) => theme.size}); font-weight: normal; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.65; margin-block: 0 calc(${({ theme }) => theme.space} / 2); }
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({ theme }) => theme.space} / 3); }
        .pa-table-of-contents .pd-paragraph:not(.pa-parenthetical) { counter-increment: entry; }
        .pa-table-of-contents .pd-paragraph:not(.pa-parenthetical)::before { content: counter(entry); display: inline-block; width: 1.5em; font-size: calc(0.7 * ${({ theme }) => theme.size}); opacity: 0.65; }
        .pa-table-of-contents .pa-branch.pa-open { font-weight: bold; }
        .pa-table-of-contents .pd-catchword { display: none; }
    `;
}

export const Cover = $($ManualCover);
export const Synopsis = $($ManualSynopsis);
export const TableOfContents = $($ManualTableOfContents);
