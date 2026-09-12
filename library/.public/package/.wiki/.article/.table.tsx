import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Ref, Section, TableOfContents } from '@dna-platform/public';
import { Menu, Summary } from '@dna-platform/public/application';
import $Chapter from './.chapter';

export default class $Contents extends $Chapter {
    print() {
        return (
            <TableOfContents>
                <Section>
                    <Heading>Contents</Heading>
                    <Paragraph><Ref>[(Top)](#)</Ref></Paragraph>
                    <Paragraph><Ref>[Order of article elements](#order-of-article-elements)</Ref></Paragraph>
                    <Menu>
                        <Summary><Ref>[Body sections](#body-sections)</Ref></Summary>
                        <Paragraph><Ref>[Headings and sections](#headings-and-sections)</Ref></Paragraph>
                        <Paragraph><Ref>[Section order](#section-order)</Ref></Paragraph>
                        <Paragraph><Ref>[Section templates and summary style](#section-templates-and-summary-style)</Ref></Paragraph>
                        <Paragraph><Ref>[Paragraphs](#paragraphs)</Ref></Paragraph>
                    </Menu>
                    <Menu>
                        <Summary><Ref>[Standard appendices and footers](#standard-appendices-and-footers)</Ref></Summary>
                        <Paragraph><Ref>[Headings](#headings)</Ref></Paragraph>
                        <Paragraph><Ref>[Works or publications](#works-or-publications)</Ref></Paragraph>
                        <Paragraph><Ref>["See also" section](#see-also-section)</Ref></Paragraph>
                        <Paragraph><Ref>[Notes and references](#notes-and-references)</Ref></Paragraph>
                        <Paragraph><Ref>[Further reading](#further-reading)</Ref></Paragraph>
                        <Paragraph><Ref>[External links](#external-links)</Ref></Paragraph>
                        <Paragraph><Ref>[Navigation templates](#navigation-templates)</Ref></Paragraph>
                    </Menu>
                    <Paragraph><Ref>[Specialized layout](#specialized-layout)</Ref></Paragraph>
                    <Menu>
                        <Summary><Ref>[Formatting](#formatting)</Ref></Summary>
                        <Paragraph><Ref>[Images](#images)</Ref></Paragraph>
                        <Paragraph><Ref>[Horizontal rule](#horizontal-rule)</Ref></Paragraph>
                        <Paragraph><Ref>[Collapsible content](#collapsible-content)</Ref></Paragraph>
                    </Menu>
                    <Paragraph><Ref>[See also](#see-also)</Ref></Paragraph>
                    <Paragraph><Ref>[Notes](#notes)</Ref></Paragraph>
                    <Paragraph><Ref>[References](#references)</Ref></Paragraph>
                </Section>
            </TableOfContents>
        );
    }
}
