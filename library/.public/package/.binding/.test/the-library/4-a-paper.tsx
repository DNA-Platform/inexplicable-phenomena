import { $Chapter, Document, Paragraph, Ref, Title } from '@dna-platform/public';

export default class $APaper extends $Chapter {
    print() {
        return (
            <Document>
                <Title>A Paper $[ ]( A Paper )</Title>
                <Paragraph>Written by the persona and shelved under the library, so its author and its subject are two different books.</Paragraph>
            </Document>
        );
    }
}
