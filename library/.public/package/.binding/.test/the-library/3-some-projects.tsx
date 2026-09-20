import { $Chapter, Document, Paragraph, Ref, Title } from '@dna-platform/public';

export default class $SomeProjects extends $Chapter {
    print() {
        return (
            <Document>
                <Title>Some Projects $[ ]( Some Projects )</Title>
                <Paragraph>An ordinary book: written by the log, shelved under the library, about the work.</Paragraph>
            </Document>
        );
    }
}
