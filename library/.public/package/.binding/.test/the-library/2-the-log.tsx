import { $Chapter, Document, Paragraph, Ref, Title } from '@dna-platform/public';

// THE SYNOPSIS OF A BOOK THIS ONE CATALOGUES. The box after the title leads to the book, and the
// row in the table of contents leads here.
export default class $TheLog extends $Chapter {
    print() {
        return (
            <Document>
                <Title>The Log $[ ]( The Log )</Title>
                <Paragraph>The book that writes the others: an account of the library being made, kept by the one who keeps it.</Paragraph>
            </Document>
        );
    }
}
