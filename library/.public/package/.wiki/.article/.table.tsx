import { $ } from '@dna-platform/chemistry';
import { Heading, Ref, Section, TableOfContents } from '@dna-platform/public';
import { Menu, Option, Summary } from '@dna-platform/public/application';
import $Chapter from './.chapter';

export default class $Contents extends $Chapter {
    print() {
        return (
            <TableOfContents>
                <Section>
                    <Heading>Contents</Heading>
                    <Option><Ref>[(Top)](#)</Ref></Option>
                    <Option><Ref>[Order of article elements](#order-of-article-elements)</Ref></Option>
                    <Menu>
                        <Summary><Ref>[Body sections](#body-sections)</Ref></Summary>
                        <Option><Ref>[Headings and sections](#headings-and-sections)</Ref></Option>
                        <Option><Ref>[Section order](#section-order)</Ref></Option>
                        <Option><Ref>[Section templates and summary style](#section-templates-and-summary-style)</Ref></Option>
                        <Option><Ref>[Paragraphs](#paragraphs)</Ref></Option>
                    </Menu>
                    <Menu>
                        <Summary><Ref>[Standard appendices and footers](#standard-appendices-and-footers)</Ref></Summary>
                        <Option><Ref>[Headings](#headings)</Ref></Option>
                        <Option><Ref>[Works or publications](#works-or-publications)</Ref></Option>
                        <Option><Ref>["See also" section](#see-also-section)</Ref></Option>
                        <Option><Ref>[Notes and references](#notes-and-references)</Ref></Option>
                        <Option><Ref>[Further reading](#further-reading)</Ref></Option>
                        <Option><Ref>[External links](#external-links)</Ref></Option>
                        <Option><Ref>[Navigation templates](#navigation-templates)</Ref></Option>
                    </Menu>
                    <Option><Ref>[Specialized layout](#specialized-layout)</Ref></Option>
                    <Menu>
                        <Summary><Ref>[Formatting](#formatting)</Ref></Summary>
                        <Option><Ref>[Images](#images)</Ref></Option>
                        <Option><Ref>[Horizontal rule](#horizontal-rule)</Ref></Option>
                        <Option><Ref>[Collapsible content](#collapsible-content)</Ref></Option>
                    </Menu>
                    <Option><Ref>[See also](#see-also)</Ref></Option>
                    <Option><Ref>[Notes](#notes)</Ref></Option>
                    <Option><Ref>[References](#references)</Ref></Option>
                </Section>
            </TableOfContents>
        );
    }
}
