import { $ } from '@dna-platform/chemistry';
import { Author, Cover, Heading, Paragraph, Reference, Subject, Title } from '@dna-platform/public';
import { Header, OutwardLink, Wordmark } from '../.chapter';

export default $(
    <Cover>
        <Header>
            <Heading>Wikipedia</Heading>
            <Wordmark src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Wikipedia_wordmark.svg" width="120">Wikipedia</Wordmark>
            <Paragraph><OutwardLink>[Donate](https://donate.wikimedia.org/)</OutwardLink><OutwardLink>[Create account](https://en.wikipedia.org/w/index.php?title=Special:CreateAccount)</OutwardLink><OutwardLink>[Log in](https://en.wikipedia.org/w/index.php?title=Special:UserLogin)</OutwardLink></Paragraph>
        </Header>
        <Title>Alan Turing<Reference>https://en.wikipedia.org/wiki/Alan_Turing</Reference></Title>
        <Author>Wikipedians</Author>
        <Subject>English computer scientist (1912–1954)</Subject>
    </Cover>,
    Cover
);
