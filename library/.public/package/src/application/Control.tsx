import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Paragraph$, $Paragraph, $TypeOfParagraph, ParagraphSpecification } from '@/writing/Paragraph';
import { TypeOfSentence } from '@/writing/Sentence';
import { TypeOfDescription } from '@/writing/Description';

export interface $Control$ extends $Paragraph$ { }

// A CONTROL IS A PIECE OF WRITING A READER OPERATES, and it is the root of what an application
// writes. What it holds is its description — for a control, a sentence is a description — so it
// says what it is for without drawing that as prose, and a text reading of the page carries
// [what it is for] where the control stands.
export class $Control extends $Paragraph implements $Control$ {
    $Control(block: $Block) {
        super.$Paragraph(this.addType(block, $TypeOfControl));
    }
}

export class $TypeOfControl extends $TypeOfParagraph {
    protected override specification: Specification<$Writing> = new ControlSpecification();
}

export class ControlSpecification extends ParagraphSpecification {
}

export const Control = $($Control);
export const TypeOfControl = $($TypeOfControl);

$(Control, TypeOfSentence)(TypeOfDescription);
