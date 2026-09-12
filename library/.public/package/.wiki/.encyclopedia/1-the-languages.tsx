import { $ } from '@dna-platform/chemistry';
import { $Chapter, Heading, Paragraph, Section } from '@dna-platform/public';
import { BookLink, SubjectLink } from '../.document';
import { editions, EditionList, Editions } from './.document';

export default class $TheLanguages extends $Chapter {
    view() {
        return (
            <Editions>
                <Section>
                    <Heading>Read Wikipedia in your language</Heading>
                    <Paragraph>
                        The encyclopedia is written once for every language it is written in, and there are four hundred and thirty-three.
                        Ten are named on the page and the rest are gathered by how many articles each holds.
                        A band points at a grouping rather than at a book, which is what makes it a subject.
                    </Paragraph>
                    <Paragraph>
                        <SubjectLink>[1,000,000+ articles](https://meta.wikimedia.org/wiki/List_of_Wikipedias)</SubjectLink>
                        <SubjectLink>[100,000+ articles](https://meta.wikimedia.org/wiki/List_of_Wikipedias)</SubjectLink>
                        <SubjectLink>[10,000+ articles](https://meta.wikimedia.org/wiki/List_of_Wikipedias)</SubjectLink>
                        <SubjectLink>[1,000+ articles](https://meta.wikimedia.org/wiki/List_of_Wikipedias)</SubjectLink>
                        <SubjectLink>[100+ articles](https://meta.wikimedia.org/wiki/List_of_Wikipedias)</SubjectLink>
                    </Paragraph>
                </Section>
                <EditionList>
                    <Heading>The editions</Heading>
                    <Paragraph>
                    {editions.map(edition => <BookLink key={edition.url}>{`[${edition.name}](${edition.url})`}</BookLink>)}
                    </Paragraph>
                </EditionList>
            </Editions>
        );
    }
}
