import { $ } from '@dna-platform/chemistry';
import { $Chapter, Citation, Document, Heading, Item, List, Paragraph, Section } from '@dna-platform/public';
import { Hatnote } from '@dna-platform/public/encyclopedia';
import { BookLink, OutwardLink } from './.book';

export default class $OrderOfArticleElements extends $Chapter {
    print() {
        return (
            <Document>
                <Section>
                <Heading>Order of article elements</Heading>
                <List>
                    <Item><OutwardLink>[MOS:ORDER](https://en.wikipedia.org/w/index.php?title=MOS:ORDER&redirect=no)</OutwardLink></Item>
                    <Item><OutwardLink>[MOS:SECTIONORDER](https://en.wikipedia.org/w/index.php?title=MOS:SECTIONORDER&redirect=no)</OutwardLink></Item>
                </List>
                <Hatnote>
                    See also: <BookLink>[Wikipedia:Manual of Style § Section headings](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style#Section_headings)</BookLink>, <BookLink>[Wikipedia:Manual of Style/Lead section § Order](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Lead_section#Order)</BookLink>, and <BookLink>[Wikipedia:Stand-alone lists § Chronological ordering](https://en.wikipedia.org/wiki/Wikipedia:Stand-alone_lists#Chronological_ordering)</BookLink>
                </Hatnote>
                <Paragraph>
                    A <BookLink>[simple article](https://en.wikipedia.org/wiki/Wikipedia:Stub#Creating_and_improving_a_stub_article)</BookLink> should have, at least, (a) a lead section and (b) references. The following list includes additional standardized sections in an article. A complete article need not have all, or even most, of these elements.
                </Paragraph>
                <Paragraph>
                    Some elements also appear in sections. The order of elements after a section heading is the same as it would have been if the elements were placed before the lead.
                </Paragraph>
                <List>
                    <Item>
                        Before the article content
                        <List>
                            <Item><BookLink>[Short description](https://en.wikipedia.org/wiki/Wikipedia:Short_description)</BookLink><Citation>[1](cite_note-1)</Citation></Item>
                            <Item>&#123;&#123;<BookLink>[DISPLAYTITLE](https://en.wikipedia.org/wiki/Template:DISPLAYTITLE)</BookLink>&#125;&#125;, &#123;&#123;<BookLink>[Lowercase title](https://en.wikipedia.org/wiki/Template:Lowercase_title)</BookLink>&#125;&#125;, &#123;&#123;<BookLink>[Italic title](https://en.wikipedia.org/wiki/Template:Italic_title)</BookLink>&#125;&#125;,<Citation>[2](cite_note-2)</Citation> &#123;&#123;<BookLink>[Italic disambiguation](https://en.wikipedia.org/wiki/Template:Italic_disambiguation)</BookLink>&#125;&#125; (some of these may also be placed before the infobox<Citation>[3](cite_note-3)</Citation> or after the infobox<Citation>[4](cite_note-4)</Citation>). See complete list at <BookLink>[Category:Correct title templates](https://en.wikipedia.org/wiki/Category:Correct_title_templates)</BookLink>.</Item>
                            <Item><BookLink>[Hatnotes](https://en.wikipedia.org/wiki/Wikipedia:Hatnote)</BookLink></Item>
                            <Item>&#123;&#123;<BookLink>[Featured list](https://en.wikipedia.org/wiki/Template:Featured_list)</BookLink>&#125;&#125;, &#123;&#123;<BookLink>[Featured article](https://en.wikipedia.org/wiki/Template:Featured_article)</BookLink>&#125;&#125; and &#123;&#123;<BookLink>[Good article](https://en.wikipedia.org/wiki/Template:Good_article)</BookLink>&#125;&#125; (where appropriate for article status)</Item>
                            <Item>Deletion or protection tags (<BookLink>[CSD](https://en.wikipedia.org/wiki/Wikipedia:Speedy_deletion)</BookLink>, <BookLink>[PROD](https://en.wikipedia.org/wiki/Wikipedia:Proposed_deletion)</BookLink>, <BookLink>[AFD](https://en.wikipedia.org/wiki/Wikipedia:Articles_for_deletion)</BookLink>, <BookLink>[PP](https://en.wikipedia.org/wiki/Category:Protection_templates)</BookLink> notices)</Item>
                            <Item><BookLink>[Maintenance](https://en.wikipedia.org/wiki/Wikipedia:Template_index/Maintenance)</BookLink>, <BookLink>[cleanup](https://en.wikipedia.org/wiki/Wikipedia:Template_index/Cleanup)</BookLink>, and <BookLink>[dispute](https://en.wikipedia.org/wiki/Wikipedia:Template_index/Disputes)</BookLink> tags</Item>
                            <Item>Templates relating to <BookLink>[English variety](https://en.wikipedia.org/wiki/Wikipedia:ENGVAR)</BookLink> and <BookLink>[date format](https://en.wikipedia.org/wiki/Wikipedia:Overview_of_date_formatting_guidelines)</BookLink>,<Citation>[5](cite_note-5)</Citation><Citation>[a](cite_note-6)</Citation> <BookLink>[citation style](https://en.wikipedia.org/wiki/Wikipedia:Citing_sources)</BookLink> (&#123;&#123;<BookLink>[Use list-defined references](https://en.wikipedia.org/wiki/Template:Use_list-defined_references)</BookLink>&#125;&#125;, &#123;&#123;<BookLink>[Use shortened footnotes](https://en.wikipedia.org/wiki/Template:Use_shortened_footnotes)</BookLink>&#125;&#125;), &#123;&#123;<BookLink>[CS1 config](https://en.wikipedia.org/wiki/Template:CS1_config)</BookLink>&#125;&#125; and &#123;&#123;<BookLink>[Force cite load](https://en.wikipedia.org/wiki/Template:Force_cite_load)</BookLink>&#125;&#125;</Item>
                            <Item><BookLink>[Infoboxes](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Infoboxes)</BookLink><Citation>[b](cite_note-7)</Citation></Item>
                            <Item><BookLink>[Language maintenance templates](https://en.wikipedia.org/wiki/Category:Language_maintenance_templates)</BookLink><Citation>[c](cite_note-8)</Citation></Item>
                            <Item><BookLink>[Images](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Images)</BookLink></Item>
                            <Item><BookLink>[Navigation header templates](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Navigation_templates)</BookLink> (<BookLink>[sidebar templates](https://en.wikipedia.org/wiki/Wikipedia:SIDEBAR)</BookLink>)</Item>
                        </List>
                    </Item>
                    <Item>
                        Article content
                        <List>
                            <Item><BookLink>[Lead section](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Lead_section)</BookLink> (also called the introduction)</Item>
                            <Item><BookLink>[Table of contents](https://en.wikipedia.org/wiki/Help:Section#Table_of_contents_%28TOC%29)</BookLink></Item>
                            <Item><BookLink>[Body](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Body_sections)</BookLink> (see <BookLink>[below](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Specialized_layout)</BookLink> for specialized layout)</Item>
                        </List>
                    </Item>
                    <Item>
                        <BookLink>[Appendices](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Standard_appendices_and_footers)</BookLink><Citation>[6](cite_note-sequence-9)</Citation><Citation>[d](cite_note-10)</Citation>
                        <List>
                            <Item><BookLink>[Works or publications](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Works_or_publications)</BookLink> (for biographies only)</Item>
                            <Item><BookLink>[See also](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#%22See_also%22_section)</BookLink></Item>
                            <Item><BookLink>[Notes and references](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Notes_and_references)</BookLink> (this can be two sections in some citation systems)</Item>
                            <Item>&#123;&#123;<BookLink>[Duplicated citations](https://en.wikipedia.org/wiki/Template:Duplicated_citations)</BookLink>&#125;&#125;<Citation>[7](cite_note-11)</Citation></Item>
                            <Item><BookLink>[Further reading](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Further_reading)</BookLink></Item>
                            <Item><BookLink>[External links](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#External_links)</BookLink><Citation>[e](cite_note-12)</Citation></Item>
                        </List>
                    </Item>
                    <Item>
                        <BookLink>[End matter](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Standard_appendices_and_footers)</BookLink>
                        <List>
                            <Item><BookLink>[Succession boxes](https://en.wikipedia.org/wiki/Wikipedia:Succession_boxes)</BookLink> and geography boxes</Item>
                            <Item>Other <BookLink>[navigation footer templates](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Navigation_templates)</BookLink> (<BookLink>[navboxes](https://en.wikipedia.org/wiki/Wikipedia:NAVBOX)</BookLink>)<Citation>[8](cite_note-13)</Citation></Item>
                            <Item>&#123;&#123;<BookLink>[Portal bar](https://en.wikipedia.org/wiki/Template:Portal_bar)</BookLink>&#125;&#125;<Citation>[f](cite_note-14)</Citation> (or &#123;&#123;<BookLink>[Subject bar](https://en.wikipedia.org/wiki/Template:Subject_bar)</BookLink>&#125;&#125;)</Item>
                            <Item>&#123;&#123;<BookLink>[Taxonbar](https://en.wikipedia.org/wiki/Template:Taxonbar)</BookLink>&#125;&#125;</Item>
                            <Item><BookLink>[Authority control](https://en.wikipedia.org/wiki/Wikipedia:Authority_control)</BookLink> templates</Item>
                            <Item><BookLink>[Geographical coordinates](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Dates_and_numbers#Geographical_coordinates)</BookLink> (if not in the infobox) or &#123;&#123;<BookLink>[coord missing](https://en.wikipedia.org/wiki/Template:Coord_missing)</BookLink>&#125;&#125;</Item>
                            <Item><BookLink>[Defaultsort](https://en.wikipedia.org/wiki/Help:Category#Default_sort_key)</BookLink></Item>
                            <Item><BookLink>[Categories](https://en.wikipedia.org/wiki/Wikipedia:Categorization)</BookLink><Citation>[g](cite_note-15)</Citation></Item>
                            <Item>&#123;&#123;<BookLink>[Improve categories](https://en.wikipedia.org/wiki/Template:Improve_categories)</BookLink>&#125;&#125; or &#123;&#123;<BookLink>[Uncategorized](https://en.wikipedia.org/wiki/Template:Uncategorized)</BookLink>&#125;&#125; (These can alternatively be placed with other maintenance templates before the article content)</Item>
                            <Item><BookLink>[Stub templates](https://en.wikipedia.org/wiki/Wikipedia:Stub)</BookLink> (follow <BookLink>[WP:STUBSPACING](https://en.wikipedia.org/wiki/Wikipedia:STUBSPACING)</BookLink>)</Item>
                        </List>
                    </Item>
                </List>
                </Section>
            </Document>
        );
    }
}
