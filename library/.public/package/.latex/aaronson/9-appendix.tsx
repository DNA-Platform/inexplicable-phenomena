import { $ } from '@dna-platform/chemistry';
import { Figure, Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Appendix: Glossary of Complexity Classes</Heading>
            <Paragraph>To help you remember all the supporting characters in the ongoing soap opera of which P and NP are the stars, this appendix contains short definitions of the complexity classes that appear in this survey, with references to the sections where the classes are discussed in more detail. For a fuller list, containing over 500 classes, see for example my Complexity Zoo [8]. All the classes below are classes of decision problems—that is, languages L ⊆ &#123;0,1&#125; . The known inclusion relations among the classes are also depicted in Figure 3.</Paragraph>
            <Figure source="/figure-3.png">Known inclusion relations among 22 of the complexity classes that appear in this survey</Figure>
        </Section>
    </Chapter>,
    Chapter
);
