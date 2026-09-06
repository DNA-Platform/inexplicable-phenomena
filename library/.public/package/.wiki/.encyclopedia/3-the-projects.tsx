import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter, { Logo, Project } from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Other projects</Heading>
            <Paragraph>
                Twelve libraries stand beside the encyclopedia on the same page.
                Each is written by the same people under the same licence, and each is a different kind of book.
                Three of them land on words this library already holds: a gazetteer, a florilegium, and an anthology of the documents themselves.
            </Paragraph>
        </Section>
        <Project url="https://commons.wikimedia.org/">
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Commons-logo.svg" width="38">Commons</Logo>
            <Heading>Commons</Heading>
            <Paragraph>Free media collection</Paragraph>
        </Project>
        <Project url="https://en.wikivoyage.org/">
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Wikivoyage-Logo-v3-icon.svg" width="38">Wikivoyage</Logo>
            <Heading>Wikivoyage</Heading>
            <Paragraph>Free travel guide</Paragraph>
        </Project>
        <Project url="https://en.wiktionary.org/">
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Wiktionary-logo.svg" width="38">Wiktionary</Logo>
            <Heading>Wiktionary</Heading>
            <Paragraph>Free dictionary</Paragraph>
        </Project>
        <Project url="https://en.wikibooks.org/">
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Wikibooks-logo.svg" width="38">Wikibooks</Logo>
            <Heading>Wikibooks</Heading>
            <Paragraph>Free textbooks</Paragraph>
        </Project>
        <Project url="https://www.wikidata.org/">
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg" width="38">Wikidata</Logo>
            <Heading>Wikidata</Heading>
            <Paragraph>Free knowledge base</Paragraph>
        </Project>
        <Project url="https://en.wikiversity.org/">
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/9/91/Wikiversity-logo.svg" width="38">Wikiversity</Logo>
            <Heading>Wikiversity</Heading>
            <Paragraph>Free learning resources</Paragraph>
        </Project>
        <Project url="https://en.wikiquote.org/">
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Wikiquote-logo.svg" width="38">Wikiquote</Logo>
            <Heading>Wikiquote</Heading>
            <Paragraph>Free quote compendium</Paragraph>
        </Project>
        <Project url="https://www.mediawiki.org/">
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/b/bb/MediaWiki-notext.svg" width="38">MediaWiki</Logo>
            <Heading>MediaWiki</Heading>
            <Paragraph>Free and open wiki software</Paragraph>
        </Project>
        <Project url="https://en.wikisource.org/">
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Wikisource-logo.svg" width="38">Wikisource</Logo>
            <Heading>Wikisource</Heading>
            <Paragraph>Free content library</Paragraph>
        </Project>
        <Project url="https://species.wikimedia.org/">
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/d/df/Wikispecies-logo.svg" width="38">Wikispecies</Logo>
            <Heading>Wikispecies</Heading>
            <Paragraph>Free species directory</Paragraph>
        </Project>
        <Project url="https://www.wikifunctions.org/">
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Wikifunctions-logo.svg" width="38">Wikifunctions</Logo>
            <Heading>Wikifunctions</Heading>
            <Paragraph>Free function library</Paragraph>
        </Project>
        <Project url="https://meta.wikimedia.org/">
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/7/75/Wikimedia_Community_Logo.svg" width="38">Meta-Wiki</Logo>
            <Heading>Meta-Wiki</Heading>
            <Paragraph>Community coordination</Paragraph>
        </Project>
    </Chapter>,
    Chapter
);
