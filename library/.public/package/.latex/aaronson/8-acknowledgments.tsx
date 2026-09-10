import { $ } from '@dna-platform/chemistry';
import { $Chapter, Heading, Paragraph, Section } from '@dna-platform/public';
import Document from './.document';

export default class $Acknowledgments extends $Chapter {
    view() {
        return (
            <Document>
                <Section>
                    <Heading>Acknowledgments</Heading>
                    <Paragraph>I thank Andy Drucker, Ron Fagin, Harvey Friedman, William Gasarch, Bruno Grenet, Daniel Grier, Josh Grochow, Christian Ikenmeyer, Adam Klivans, Pascal Koiran, Greg Kuperberg, JM Lands- berg, Ashley Montanaro, Mateus Oliveira, Bruce Smith, David Speyer, Noah Stephens-Davidowitz, Iddo Tzameret, Leslie Valiant, Avi Wigderson, Ryan Williams, and Jon Yard for helpful observa- tions and for answering questions; as well as Daniel Seita for help with Figure 9. I especially thank Michail Rassias for his exponential patience with my delays completing this article. References</Paragraph>
                </Section>
            </Document>
        );
    }
}
