import { $Chapter, Document, Paragraph, Ref, Title } from '@dna-platform/public';

// THE SYNOPSIS OF THE ONE BOOK THE LOG CATALOGUES. The box after the title leads to the persona,
// and the row in the table of contents leads here.
export default class $APersona extends $Chapter {
    print() {
        return (
            <Document>
                <Title>A Persona $[ ]( A Persona )</Title>
                <Paragraph>A voice the log vouched for, which is what lets it write a paper of its own.</Paragraph>
            </Document>
        );
    }
}
