import { $ } from '@dna-platform/chemistry';
import { $Chapter, Author, Cover, Heading, Paragraph, Reference, Subject, Title } from '@dna-platform/public';
import { Image } from '@dna-platform/public';
import { Header, OutwardLink } from '../.document';

export default class $Cover extends $Chapter {
    print() {
        return (
            <Cover>
                <Header>
                    <Heading>Wikipedia</Heading>
                    <Image source="https://upload.wikimedia.org/wikipedia/commons/b/bb/Wikipedia_wordmark.svg" width="120" height="20">Wikipedia</Image>
                    <Paragraph><OutwardLink>[Donate](https://donate.wikimedia.org/)</OutwardLink><OutwardLink>[Create account](https://en.wikipedia.org/w/index.php?title=Special:CreateAccount)</OutwardLink><OutwardLink>[Log in](https://en.wikipedia.org/w/index.php?title=Special:UserLogin)</OutwardLink></Paragraph>
                </Header>
                <Title>Alan Turing<Reference>https://en.wikipedia.org/wiki/Alan_Turing</Reference></Title>
                <Author>Wikipedians</Author>
                <Subject>English computer scientist (1912–1954)</Subject>
            </Cover>
        );
    }
}
