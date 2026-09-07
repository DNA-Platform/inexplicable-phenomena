import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Reference, Section, Title } from '@dna-platform/public';
import { Projects, Logo, Project } from './.chapter';

export default $(
    <Projects>
        <Section>
            <Heading>Other projects</Heading>
            <Paragraph>
                Twelve libraries stand beside the encyclopedia on the same page.
                Each is written by the same people under the same licence, and each is a different kind of book.
                Three of them land on words this library already holds: a gazetteer, a florilegium, and an anthology of the documents themselves.
            </Paragraph>
        </Section>
        <Project>
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Commons-logo.svg" width="38">Commons</Logo>
            <Title>Commons<Reference>https://commons.wikimedia.org/</Reference></Title>
            <Paragraph>Free media collection</Paragraph>
        </Project>
        <Project>
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Wikivoyage-Logo-v3-icon.svg" width="38">Wikivoyage</Logo>
            <Title>Wikivoyage<Reference>https://en.wikivoyage.org/</Reference></Title>
            <Paragraph>Free travel guide</Paragraph>
        </Project>
        <Project>
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Wiktionary-logo.svg" width="38">Wiktionary</Logo>
            <Title>Wiktionary<Reference>https://en.wiktionary.org/</Reference></Title>
            <Paragraph>Free dictionary</Paragraph>
        </Project>
        <Project>
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Wikibooks-logo.svg" width="38">Wikibooks</Logo>
            <Title>Wikibooks<Reference>https://en.wikibooks.org/</Reference></Title>
            <Paragraph>Free textbooks</Paragraph>
        </Project>
        <Project>
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg" width="38">Wikidata</Logo>
            <Title>Wikidata<Reference>https://www.wikidata.org/</Reference></Title>
            <Paragraph>Free knowledge base</Paragraph>
        </Project>
        <Project>
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/9/91/Wikiversity-logo.svg" width="38">Wikiversity</Logo>
            <Title>Wikiversity<Reference>https://en.wikiversity.org/</Reference></Title>
            <Paragraph>Free learning resources</Paragraph>
        </Project>
        <Project>
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Wikiquote-logo.svg" width="38">Wikiquote</Logo>
            <Title>Wikiquote<Reference>https://en.wikiquote.org/</Reference></Title>
            <Paragraph>Free quote compendium</Paragraph>
        </Project>
        <Project>
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/b/bb/MediaWiki-notext.svg" width="38">MediaWiki</Logo>
            <Title>MediaWiki<Reference>https://www.mediawiki.org/</Reference></Title>
            <Paragraph>Free and open wiki software</Paragraph>
        </Project>
        <Project>
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Wikisource-logo.svg" width="38">Wikisource</Logo>
            <Title>Wikisource<Reference>https://en.wikisource.org/</Reference></Title>
            <Paragraph>Free content library</Paragraph>
        </Project>
        <Project>
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/d/df/Wikispecies-logo.svg" width="38">Wikispecies</Logo>
            <Title>Wikispecies<Reference>https://species.wikimedia.org/</Reference></Title>
            <Paragraph>Free species directory</Paragraph>
        </Project>
        <Project>
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Wikifunctions-logo.svg" width="38">Wikifunctions</Logo>
            <Title>Wikifunctions<Reference>https://www.wikifunctions.org/</Reference></Title>
            <Paragraph>Free function library</Paragraph>
        </Project>
        <Project>
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/7/75/Wikimedia_Community_Logo.svg" width="38">Meta-Wiki</Logo>
            <Title>Meta-Wiki<Reference>https://meta.wikimedia.org/</Reference></Title>
            <Paragraph>Community coordination</Paragraph>
        </Project>
    </Projects>,
    Projects
);
