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
        <Title>Wikipedia:Manual of Style/Layout<Reference>https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout</Reference></Title>
        <Author>Wikipedians</Author>
        <Subject>Wikipedia how-to</Subject>
    </Cover>,
    Cover
);
