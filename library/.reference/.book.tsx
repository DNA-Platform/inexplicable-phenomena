import { $TheLibrary } from './1-the-book~code.tsx';
import { EditorMode } from './7-the-reference-manual~code.tsx';

// A REFERENCE MANUAL OPENS IN THE EDITOR, Sprint 131, Doug, 2026-11-17: "Reference manuals should default to full but
// maybe appendix authors can choose?" — said after the library's own define, so it stands before the page the library
// says and suppresses it; a press on the bar still chooses.
export default class $TheManual extends $TheLibrary {
    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <EditorMode />
        );
    }
}
