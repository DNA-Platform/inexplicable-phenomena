import { $ } from '@dna-platform/chemistry';
import { $Chapter, chapter as Chapter, Heading, Ref, Section, TableOfContents, Title } from '@dna-platform/public';
import { Menu, Option, Summary } from '@dna-platform/public/application';

export default class $Contents extends $Chapter {
    print() {
        return (
            <TableOfContents>
                <Title print={false}>Table of Contents</Title>
                <Section>
                    <Heading>Contents</Heading>
                    <Option><Ref>[(Top)](#)</Ref></Option>
                    <Option><Chapter>Order of article elements</Chapter></Option>
                    <Menu>
                        <Summary><Chapter>Body sections</Chapter></Summary>
                        <Option><Ref>[Headings and sections](#headings-and-sections)</Ref></Option>
                        <Option><Ref>[Section order](#section-order)</Ref></Option>
                        <Option><Ref>[Section templates and summary style](#section-templates-and-summary-style)</Ref></Option>
                        <Option><Ref>[Paragraphs](#paragraphs)</Ref></Option>
                    </Menu>
                    <Menu>
                        <Summary><Chapter>Standard appendices and footers</Chapter></Summary>
                        <Option><Ref>[Headings](#headings)</Ref></Option>
                        <Option><Ref>[Works or publications](#works-or-publications)</Ref></Option>
                        <Option><Ref>["See also" section](#see-also-section)</Ref></Option>
                        <Option><Ref>[Notes and references](#notes-and-references)</Ref></Option>
                        <Option><Ref>[Further reading](#further-reading)</Ref></Option>
                        <Option><Ref>[External links](#external-links)</Ref></Option>
                        <Option><Ref>[Navigation templates](#navigation-templates)</Ref></Option>
                    </Menu>
                    <Option><Chapter>Specialized layout</Chapter></Option>
                    <Menu>
                        <Summary><Chapter>Formatting</Chapter></Summary>
                        <Option><Ref>[Images](#images)</Ref></Option>
                        <Option><Ref>[Horizontal rule](#horizontal-rule)</Ref></Option>
                        <Option><Ref>[Collapsible content](#collapsible-content)</Ref></Option>
                    </Menu>
                    <Option><Chapter>See also</Chapter></Option>
                    <Option><Chapter>Notes</Chapter></Option>
                    <Option><Chapter>References</Chapter></Option>
                    <Chapter print={false}>[Wikipedia:Manual of Style/Layout](wikipedia-manual-of-style-layout)</Chapter>
                    <Chapter print={false}>From Wikipedia</Chapter>
                    <Chapter print={false}>Table of Contents</Chapter>
                    <Chapter print={false}>Lead</Chapter>
                    <Chapter print={false}>Manual of Style</Chapter>
                    <Chapter print={false}>About this page</Chapter>
                </Section>
            </TableOfContents>
        );
    }
}
