import { $ } from '@dna-platform/chemistry';
import { Heading, Image, Paragraph, Reference, Section, Title } from '@dna-platform/public';
import { $PortalChapter as $Chapter } from './.book';
import { Projects, Project } from './.book';

export default class $TheProjects extends $Chapter {
    print() {
        return (
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
                    <Reference>https://commons.wikimedia.org/</Reference>
                    <Image source="https://upload.wikimedia.org/wikipedia/commons/4/4a/Commons-logo.svg" width="38" height="38">Commons</Image>
                    <Title>Commons</Title>
                    <Paragraph>Free media collection</Paragraph>
                </Project>
                <Project>
                    <Reference>https://en.wikivoyage.org/</Reference>
                    <Image source="https://upload.wikimedia.org/wikipedia/commons/d/dd/Wikivoyage-Logo-v3-icon.svg" width="38" height="38">Wikivoyage</Image>
                    <Title>Wikivoyage</Title>
                    <Paragraph>Free travel guide</Paragraph>
                </Project>
                <Project>
                    <Reference>https://en.wiktionary.org/</Reference>
                    <Image source="https://upload.wikimedia.org/wikipedia/commons/e/ec/Wiktionary-logo.svg" width="38" height="38">Wiktionary</Image>
                    <Title>Wiktionary</Title>
                    <Paragraph>Free dictionary</Paragraph>
                </Project>
                <Project>
                    <Reference>https://en.wikibooks.org/</Reference>
                    <Image source="https://upload.wikimedia.org/wikipedia/commons/f/fa/Wikibooks-logo.svg" width="38" height="38">Wikibooks</Image>
                    <Title>Wikibooks</Title>
                    <Paragraph>Free textbooks</Paragraph>
                </Project>
                <Project>
                    <Reference>https://www.wikidata.org/</Reference>
                    <Image source="https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg" width="38" height="38">Wikidata</Image>
                    <Title>Wikidata</Title>
                    <Paragraph>Free knowledge base</Paragraph>
                </Project>
                <Project>
                    <Reference>https://en.wikiversity.org/</Reference>
                    <Image source="https://upload.wikimedia.org/wikipedia/commons/9/91/Wikiversity-logo.svg" width="38" height="38">Wikiversity</Image>
                    <Title>Wikiversity</Title>
                    <Paragraph>Free learning resources</Paragraph>
                </Project>
                <Project>
                    <Reference>https://en.wikiquote.org/</Reference>
                    <Image source="https://upload.wikimedia.org/wikipedia/commons/f/fa/Wikiquote-logo.svg" width="38" height="38">Wikiquote</Image>
                    <Title>Wikiquote</Title>
                    <Paragraph>Free quote compendium</Paragraph>
                </Project>
                <Project>
                    <Reference>https://www.mediawiki.org/</Reference>
                    <Image source="https://upload.wikimedia.org/wikipedia/commons/b/bb/MediaWiki-notext.svg" width="38" height="38">MediaWiki</Image>
                    <Title>MediaWiki</Title>
                    <Paragraph>Free and open wiki software</Paragraph>
                </Project>
                <Project>
                    <Reference>https://en.wikisource.org/</Reference>
                    <Image source="https://upload.wikimedia.org/wikipedia/commons/4/4c/Wikisource-logo.svg" width="38" height="38">Wikisource</Image>
                    <Title>Wikisource</Title>
                    <Paragraph>Free content library</Paragraph>
                </Project>
                <Project>
                    <Reference>https://species.wikimedia.org/</Reference>
                    <Image source="https://upload.wikimedia.org/wikipedia/commons/d/df/Wikispecies-logo.svg" width="38" height="38">Wikispecies</Image>
                    <Title>Wikispecies</Title>
                    <Paragraph>Free species directory</Paragraph>
                </Project>
                <Project>
                    <Reference>https://www.wikifunctions.org/</Reference>
                    <Image source="https://upload.wikimedia.org/wikipedia/commons/0/0c/Wikifunctions-logo.svg" width="38" height="38">Wikifunctions</Image>
                    <Title>Wikifunctions</Title>
                    <Paragraph>Free function library</Paragraph>
                </Project>
                <Project>
                    <Reference>https://meta.wikimedia.org/</Reference>
                    <Image source="https://upload.wikimedia.org/wikipedia/commons/7/75/Wikimedia_Community_Logo.svg" width="38" height="38">Meta-Wiki</Image>
                    <Title>Meta-Wiki</Title>
                    <Paragraph>Community coordination</Paragraph>
                </Project>
            </Projects>
        );
    }
}
