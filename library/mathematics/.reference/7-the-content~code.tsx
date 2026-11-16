import { $ } from '@dna-platform/chemistry';
import { $Paragraph } from '@dna-platform/public';

// THE FAMILY LIFTED TO THE LIBRARY LEVEL, Doug, 2026-11-17: "Make sure this is in components that can be
// reused and at the right level reference manual. We will need this everywhere there is content with a
// project, which will be in a lot of places" — the general components live in Our Reference beside their own
// chapter, The Content, and mathematics re-exports them so this manual and the textbook keep their one door.
// Mathematics keeps only its deliverable's dress below.
export {
    $Content, $Project, $Specification, $Progress, $Markdown, $Cite, $Interpolated,
    Content, Project, Specification, Progress, Markdown, Cite, Interpolated,
} from '../../.reference/9-the-content~code.tsx';

// THE DELIVERABLE'S DRESS, Doug, 2026-11-16: components divide in two families — those that express the
// subject of the project and those that present the deliverable. Mathematics presents with a theorem counted
// within the chapter and a proof labelled — the familiar dress of a math textbook. Their rules ride inert in
// the lifted Content's style until a subclass can extend a format's style; the seam is named there.
export class $Theorem extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-theorem');
    }
}

export class $Proof extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-proof');
    }
}

export const Theorem = $($Theorem);
export const Proof = $($Proof);
