import { $Chapter, Citation, Entry, Heading, Notes, Section } from '@dna-platform/public';
import { BookLink } from '../.article/.book';

export default class $Notes extends $Chapter {
    print() {
        return (
            <Notes>
                <Section>
                    <Heading>Notes</Heading>
                    <Entry>
                        cite_note-2: Turing's death was officially determined as a suicide by an <BookLink>[inquest](https://en.wikipedia.org/wiki/Inquest)</BookLink>, but this has been disputed.<Citation>[1](cite_note-Copeland-1)</Citation>
                    </Entry>
                    <Entry>
                        cite_note-172: This was likely not Turing's first meeting: there was a sizeable backlog of introductory member talks after the first meeting. He likely attended some or all of the intervening six meetings from 18 October 1949.<Citation>[170](cite_note-Hol_Husb_Ratio_2008-171)</Citation>
                    </Entry>
                </Section>
            </Notes>
        );
    }
}
