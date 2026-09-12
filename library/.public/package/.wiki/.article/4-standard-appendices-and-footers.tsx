import { $ } from '@dna-platform/chemistry';
import { Bold, Citation, Document, Heading, Illustration, Italics, Item, List, Paragraph, Section } from '@dna-platform/public';
import { Hatnote } from '@dna-platform/public/encyclopedia';
import { BookLink, OutwardLink } from '../.chapter';
import $Chapter from './.chapter';

export default class $StandardAppendicesAndFooters extends $Chapter {
    print() {
        return (
            <Document>
                <Section>
                <Heading>Standard appendices and footers</Heading>
                <List>
                    <Item><OutwardLink>[MOS:APPENDIX](https://en.wikipedia.org/w/index.php?title=MOS:APPENDIX&redirect=no)</OutwardLink></Item>
                    <Item><OutwardLink>[MOS:FOOTERS](https://en.wikipedia.org/w/index.php?title=MOS:FOOTERS&redirect=no)</OutwardLink></Item>
                </List>
                <Hatnote>
                    For the list and order of common appendices and footers, see <BookLink>[§ Order of article elements](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Order_of_article_elements)</BookLink>.
                </Hatnote>
                <Section>
                    <Heading>Headings</Heading>
                    <Paragraph>
                        When appendix sections are used, they should appear at the bottom of an article, with ==level 2 headings==,<Citation>[i](cite_note-17)</Citation> followed by the various footers. When it is useful to sub-divide these sections (for example, to separate a list of magazine articles from a list of books), this should be done using level 3 headings (===Books===) instead of <BookLink>[definition list headings](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Lists#Description_%28definition,_association%29_lists)</BookLink> (;Books), as explained in the <BookLink>[accessibility guidelines](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Accessibility#Lists)</BookLink>.
                    </Paragraph>
                </Section>
                <Section>
                    <Heading>Works or publications</Heading>
                    <List>
                        <Item><OutwardLink>[MOS:LAYOUTWORKS](https://en.wikipedia.org/w/index.php?title=MOS:LAYOUTWORKS&redirect=no)</OutwardLink></Item>
                        <Item><OutwardLink>[MOS:BIB](https://en.wikipedia.org/w/index.php?title=MOS:BIB&redirect=no)</OutwardLink></Item>
                    </List>
                    <Hatnote>
                        Further information: <BookLink>[Wikipedia:Manual of Style/Lists of works](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Lists_of_works)</BookLink>
                    </Hatnote>
                    <Paragraph>
                        <Bold>Contents:</Bold> A bulleted list, usually ordered chronologically, of the works created by the subject of the article.
                    </Paragraph>
                    <Paragraph>
                        <Bold>Heading names:</Bold> Many different headings are used, depending on the subject matter. "Works" is preferred when the list includes items that are not written publications (e.g. music, films, paintings, choreography, or architectural designs), or if multiple types of works are included. "Publications", "Discography" or "Filmography" are occasionally used where appropriate; however, "Bibliography" is discouraged because it is not clear whether it is limited to the works of the subject of the article.<Citation>[9](cite_note-18)</Citation><Citation>[j](cite_note-19)</Citation> "Works" or "Publications" should be plural, even if it lists only a single item.<Citation>[k](cite_note-pluralHeading-20)</Citation>
                    </Paragraph>
                </Section>
                <Section>
                    <Heading>"See also" section</Heading>
                    <List>
                        <Item><OutwardLink>[MOS:ALSO](https://en.wikipedia.org/w/index.php?title=MOS:ALSO&redirect=no)</OutwardLink></Item>
                        <Item><OutwardLink>[MOS:SEEALSO](https://en.wikipedia.org/w/index.php?title=MOS:SEEALSO&redirect=no)</OutwardLink></Item>
                    </List>
                    <Hatnote>
                        For the placement of "see also" notes at the top of an article, see <BookLink>[WP:RELATED](https://en.wikipedia.org/wiki/Wikipedia:RELATED)</BookLink>.
                    </Hatnote>
                    <Hatnote>
                        See also: <BookLink>[Wikipedia:Manual of Style/Lists § Related topics navigational lists](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Lists#Related_topics_%28navigational_lists%29)</BookLink>
                    </Hatnote>
                    <Paragraph>
                        A "See also" section is a useful way to organize <BookLink>[internal links](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Linking)</BookLink> to related or comparable articles and to encourage readers to explore related concepts that may be new to them. However, the section itself is not required; many high-quality and comprehensive articles do not have one.
                    </Paragraph>
                    <Paragraph>
                        The section should be a bulleted list, sorted either logically (for example, by subject matter), chronologically, or alphabetically. Consider using &#123;&#123;<BookLink>[Columns-list](https://en.wikipedia.org/wiki/Template:Columns-list)</BookLink>&#125;&#125; or &#123;&#123;<BookLink>[Div col](https://en.wikipedia.org/wiki/Template:Div_col)</BookLink>&#125;&#125; if the list is lengthy. List entries should begin with a capital letter.
                    </Paragraph>
                    <Paragraph>
                        <Bold>Contents:</Bold> Links in this section should be relevant and limited to a reasonable number. Whether a link belongs in the "See also" section is ultimately a matter of editorial judgment and <BookLink>[common sense](https://en.wikipedia.org/wiki/Wikipedia:What_%22Ignore_all_rules%22_means#Use_common_sense)</BookLink>. One purpose of "See also" links is to enable readers to explore tangentially related topics; however, articles linked should be related to the topic of the article or be in the same defining category. For example, the article on <BookLink>[Jesus](https://en.wikipedia.org/wiki/Jesus)</BookLink> might include a "See also" link to <BookLink>[List of people claimed to be Jesus](https://en.wikipedia.org/wiki/List_of_people_claimed_to_be_Jesus)</BookLink> because it is related to the subject but not otherwise linked in the article. The article on <BookLink>[Tacos](https://en.wikipedia.org/wiki/Tacos)</BookLink> might include the "See also" link <BookLink>[Fajita](https://en.wikipedia.org/wiki/Fajita)</BookLink> as another example of Mexican cuisine.
                    </Paragraph>
                    <List>
                        <Item><OutwardLink>[MOS:NOTSEEALSO](https://en.wikipedia.org/w/index.php?title=MOS:NOTSEEALSO&redirect=no)</OutwardLink></Item>
                    </List>
                    <Paragraph>
                        The "See also" section should <Italics>not</Italics> include <BookLink>[red links](https://en.wikipedia.org/wiki/Wikipedia:Red_link)</BookLink>, links to <BookLink>[disambiguation pages](https://en.wikipedia.org/wiki/Wikipedia:Disambiguation)</BookLink> (unless used in a disambiguation page for <BookLink>[further disambiguation](https://en.wikipedia.org/wiki/MOS:DABSEEALSO)</BookLink>), or <BookLink>[external links](https://en.wikipedia.org/wiki/Wikipedia:External_links)</BookLink> (including links to pages within <BookLink>[Wikimedia sister projects](https://en.wikipedia.org/wiki/Wikipedia:Wikimedia_sister_projects)</BookLink>). As a general rule, the "See also" section should <Italics>not</Italics> repeat links that appear in the article's body.<Citation>[10](cite_note-21)</Citation>
                    </Paragraph>
                    <Paragraph>
                        Editors should provide a brief annotation when a link's relevance is not immediately apparent, when the meaning of the term may not be generally known, or when the term is ambiguous. For example:
                    </Paragraph>
                    <List>
                        <Item><BookLink>[Joe Shmoe](https://en.wikipedia.org/wiki/Joe_Shmoe)</BookLink> – made a similar achievement on April 4, 2005</Item>
                        <Item><BookLink>[Ischemia](https://en.wikipedia.org/wiki/Ischemia)</BookLink> – restriction in blood supply</Item>
                    </List>
                    <Paragraph>
                        The " – " dash can be generated using &#123;&#123;<BookLink>[snd](https://en.wikipedia.org/wiki/Template:Snd)</BookLink>&#125;&#125;.
                    </Paragraph>
                    <Paragraph>
                        If the linked article has a <BookLink>[short description](https://en.wikipedia.org/wiki/Wikipedia:Short_description)</BookLink> then the template &#123;&#123;<BookLink>[Annotated link](https://en.wikipedia.org/wiki/Template:Annotated_link)</BookLink>&#125;&#125; will automatically generate an annotation. For example, &#123;&#123;<BookLink>[Annotated link](https://en.wikipedia.org/wiki/Template:Annotated_link)</BookLink>|Winston Churchill&#125;&#125; will produce:
                    </Paragraph>
                    <List>
                        <Item><BookLink>[Winston Churchill](https://en.wikipedia.org/wiki/Winston_Churchill)</BookLink> – British statesman and writer (1874–1965)</Item>
                    </List>
                    <Paragraph>
                        <Bold>Other internal links:</Bold> &#123;&#123;<BookLink>[Portal](https://en.wikipedia.org/wiki/Template:Portal)</BookLink>&#125;&#125; links are usually placed in this section. As an alternative, &#123;&#123;<BookLink>[Portal bar](https://en.wikipedia.org/wiki/Template:Portal_bar)</BookLink>&#125;&#125; may be placed with the end matter navigation templates. See relevant template documentation for correct placement.
                    </Paragraph>
                </Section>
                <Section>
                    <Heading>Notes and references</Heading>
                    <List>
                        <Item><OutwardLink>[MOS:FNNR](https://en.wikipedia.org/w/index.php?title=MOS:FNNR&redirect=no)</OutwardLink></Item>
                        <Item><OutwardLink>[MOS:NOTES](https://en.wikipedia.org/w/index.php?title=MOS:NOTES&redirect=no)</OutwardLink></Item>
                        <Item><OutwardLink>[MOS:REFS](https://en.wikipedia.org/w/index.php?title=MOS:REFS&redirect=no)</OutwardLink></Item>
                        <Item><OutwardLink>[MOS:REF](https://en.wikipedia.org/w/index.php?title=MOS:REF&redirect=no)</OutwardLink></Item>
                    </List>
                    <Hatnote>
                        For how to generate and format these sections, see <BookLink>[Help:Footnotes](https://en.wikipedia.org/wiki/Help:Footnotes)</BookLink>, <BookLink>[Help:Shortened footnotes](https://en.wikipedia.org/wiki/Help:Shortened_footnotes)</BookLink>, and <BookLink>[Wikipedia:Citing sources](https://en.wikipedia.org/wiki/Wikipedia:Citing_sources)</BookLink> (particularly <BookLink>[§ How to create the list of citations](https://en.wikipedia.org/wiki/Wikipedia:Citing_sources#How_to_create_the_list_of_citations)</BookLink>).
                    </Hatnote>
                    <Hatnote>
                        "MOS:NOTES" redirects here. For hatnotes, see <BookLink>[Wikipedia:Hatnote](https://en.wikipedia.org/wiki/Wikipedia:Hatnote)</BookLink>. For Musical notes, see <BookLink>[Wikipedia:Manual of Style/Music § Images and notation](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Music#Images_and_notation)</BookLink>.
                    </Hatnote>
                    <Hatnote>
                        See also: <BookLink>[Wikipedia:Manual of Style/Text formatting § Citations](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Text_formatting#Citations)</BookLink>
                    </Hatnote>
                    <Illustration source="https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/Wikipedia_layout_sample_Notes_References.png/250px-Wikipedia_layout_sample_Notes_References.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail" width="200" height="250">
                        Notes and References appear after See also (click on image for larger view).
                    </Illustration>
                    <Paragraph>
                        <Bold>Contents:</Bold> This section, or series of sections, may contain any or all of the following:
                    </Paragraph>
                    <List>
                        <Item><BookLink>[Explanatory footnotes](https://en.wikipedia.org/wiki/Help:Footnotes#Footnotes:_predefined_groups)</BookLink> that give information which is too detailed or awkward to be in the body of the article</Item>
                        <Item><BookLink>[Citation footnotes](https://en.wikipedia.org/wiki/Wikipedia:Citing_sources#Inline_citations)</BookLink> (either short citations or full citations) that connect specific material in the article with specific sources</Item>
                        <Item>Full citations to sources, if <BookLink>[short citations](https://en.wikipedia.org/wiki/Wikipedia:Citing_sources#Short_citations)</BookLink> are used in the footnotes</Item>
                        <Item><BookLink>[General references](https://en.wikipedia.org/wiki/Wikipedia:Citing_sources#General_references)</BookLink> (full bibliographic citations to sources that were consulted in writing the article but that are not explicitly connected to any specific material in the article)</Item>
                    </List>
                    <Paragraph>
                        <BookLink>[Editors may use any citation method they choose](https://en.wikipedia.org/wiki/Wikipedia:Citing_sources#Variation_in_citation_methods)</BookLink>, but it should be consistent within an article.
                    </Paragraph>
                    <Paragraph>
                        If there are both citation footnotes and explanatory footnotes, then they may be combined in a single section, or separated using the <BookLink>[grouped footnotes](https://en.wikipedia.org/wiki/Help:Footnotes#Grouping_footnotes)</BookLink> function. General references and other full citations may similarly be either combined or separated (e.g. "References" and "General references"). There may therefore be one, two, three or four sections in all.
                    </Paragraph>
                    <Paragraph>
                        It is most common for only citation footnotes to be used, and therefore it is most common for only one section ("References") to be needed. Usually, if the sections are separated, then explanatory footnotes are listed first, short citations or other footnoted citations are next, and any full citations or general references are listed last. General references should be sorted logically (for example, by subject matter), chronologically, or alphabetically.
                    </Paragraph>
                    <Paragraph>
                        <Bold>Heading names:</Bold> Editors may use any reasonable section and subsection names that they choose.<Citation>[l](cite_note-22)</Citation> The most frequent choice is "References". Other options, in diminishing order of popularity, are "Notes", "Footnotes" or "Works cited", although these are more often used to distinguish between multiple end-matter sections or subsections.
                    </Paragraph>
                    <Paragraph>
                        Several alternate titles ("Sources", "Citations", "Bibliography") may also be used, although each is questionable in some contexts: "Sources" may be confused with <BookLink>[source code](https://en.wikipedia.org/wiki/Source_code)</BookLink> in computer-related articles, product purchase locations, river origins, <BookLink>[journalism sourcing](https://en.wikipedia.org/wiki/Journalism_sourcing)</BookLink>, etc.; "Citations" may be confused with official awards, or a summons to court; "Bibliography" may be confused with the complete list of printed works by the subject of a biography ("Works" or "Publications").
                    </Paragraph>
                    <Paragraph>
                        If multiple sections are wanted, then some possibilities include:
                    </Paragraph>
                    <List>
                        <Item>For a list of explanatory footnotes or shortened citation footnotes: "Notes", "Endnotes" or "Footnotes"</Item>
                        <Item>For a list of full citations or general references: "References" or "Works cited"</Item>
                    </List>
                    <Paragraph>
                        With the exception of "Bibliography", the heading should be plural even if it lists only a single item.<Citation>[k](cite_note-pluralHeading-20)</Citation>
                    </Paragraph>
                </Section>
                <Section>
                    <Heading>Further reading</Heading>
                    <List>
                        <Item><OutwardLink>[MOS:FURTHER](https://en.wikipedia.org/w/index.php?title=MOS:FURTHER&redirect=no)</OutwardLink></Item>
                    </List>
                    <Hatnote>
                        See also: <BookLink>[Wikipedia:Further reading](https://en.wikipedia.org/wiki/Wikipedia:Further_reading)</BookLink>
                    </Hatnote>
                    <Paragraph>
                        <Bold>Contents:</Bold> An optional bulleted list, usually alphabetized, of a reasonable number of publications that would help interested readers learn more about the article subject. Editors may include brief annotations. Publications listed in <BookLink>[further reading](https://en.wikipedia.org/wiki/Wikipedia:Further_reading)</BookLink> are formatted in the same <BookLink>[citation style](https://en.wikipedia.org/wiki/Wikipedia:CITE#HOW)</BookLink> used by the rest of the article. The Further reading section should not duplicate the content of the External links section, and should normally not duplicate the content of the References section, unless the References section is too long for a reader to use as part of a general reading list. This section is not intended as a repository for <BookLink>[general references](https://en.wikipedia.org/wiki/Wikipedia:General_references)</BookLink> or full citations that were used to create the article content. Any links to external websites included under "Further reading" are subject to the guidelines described at <BookLink>[Wikipedia:External links](https://en.wikipedia.org/wiki/Wikipedia:External_links)</BookLink>.
                    </Paragraph>
                </Section>
                <Section>
                    <Heading>External links</Heading>
                    <List>
                        <Item><OutwardLink>[MOS:LAYOUTEL](https://en.wikipedia.org/w/index.php?title=MOS:LAYOUTEL&redirect=no)</OutwardLink></Item>
                        <Item><OutwardLink>[MOS:ELLAYOUT](https://en.wikipedia.org/w/index.php?title=MOS:ELLAYOUT&redirect=no)</OutwardLink></Item>
                    </List>
                    <Hatnote>
                        Main pages: <BookLink>[Wikipedia:Manual of Style/Linking § External links section](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Linking#External_links_section)</BookLink>, and <BookLink>[Wikipedia:External links](https://en.wikipedia.org/wiki/Wikipedia:External_links)</BookLink>
                    </Hatnote>
                    <Paragraph>
                        <Bold>Contents:</Bold> A bulleted list of recommended <BookLink>[relevant websites](https://en.wikipedia.org/wiki/Wikipedia:External_links#What_can_normally_be_linked)</BookLink>, each accompanied by a short description. These hyperlinks should not appear in the article's body text, nor should links used as references normally be duplicated in this section. "External links" should be plural, even if it lists only a single item.<Citation>[k](cite_note-pluralHeading-20)</Citation> Depending on the nature of the link contents, this section may be accompanied or replaced by a <BookLink>["Further reading"](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Further_reading)</BookLink> section.
                    </Paragraph>
                    <Section>
                        <Heading>Links to sister projects</Heading>
                        <Hatnote>
                            Main page: <BookLink>[Wikipedia:Wikimedia sister projects](https://en.wikipedia.org/wiki/Wikipedia:Wikimedia_sister_projects)</BookLink>
                        </Hatnote>
                        <Paragraph>
                            Links to <BookLink>[Wikimedia sister projects](https://en.wikipedia.org/wiki/Wikipedia:Wikimedia_sister_projects)</BookLink> and &#123;&#123;<BookLink>[Spoken Wikipedia](https://en.wikipedia.org/wiki/Template:Spoken_Wikipedia)</BookLink>&#125;&#125; should be placed in the last section of the page, which is usually "External links". If the article does not already have an "External links" section, then you may choose whether to place larger sister link(s) (such as &#123;&#123;<BookLink>[Sister project links](https://en.wikipedia.org/wiki/Template:Sister_project_links)</BookLink>&#125;&#125; or &#123;&#123;<BookLink>[Commons category](https://en.wikipedia.org/wiki/Template:Commons_category)</BookLink>&#125;&#125;) in whatever the last section is (usually "References"), or to create an "External links" section and use the less common <Italics>inline</Italics> form of these templates (e.g., &#123;&#123;<BookLink>[Commons-inline](https://en.wikipedia.org/wiki/Template:Commons-inline)</BookLink>&#125;&#125;).
                        </Paragraph>
                        <List>
                            <Item>Box-type templates (such as &#123;&#123;<BookLink>[Commons category](https://en.wikipedia.org/wiki/Template:Commons_category)</BookLink>&#125;&#125;, shown here for <BookLink>[commons:Category:Wikipedia logos](https://commons.wikimedia.org/wiki/Category:Wikipedia%20logos)</BookLink>) have to be put at the beginning of the last section of the article so that boxes will appear next to, rather than below, the list items. Do <Italics>not</Italics> make a section whose sole content is box-type templates.</Item>
                            <Item>
                                "Inline" templates are used when box-type templates are not desirable, either because they result in a long sequence of right-aligned boxes hanging off the bottom of the article, or because there are no external links except sister project ones. "Inline" templates, such as &#123;&#123;<BookLink>[Commons category-inline](https://en.wikipedia.org/wiki/Template:Commons_category-inline)</BookLink>&#125;&#125;, create links to sister projects that appear as list items, like this:
                                <List>
                                    <Item>Media related to <BookLink>[Wikimedia Foundation](https://commons.wikimedia.org/wiki/Category:Wikimedia%20Foundation)</BookLink> at Wikimedia Commons</Item>
                                </List>
                            </Item>
                        </List>
                    </Section>
                </Section>
                <Section>
                    <Heading>Navigation templates</Heading>
                    <List>
                        <Item><OutwardLink>[MOS:LAYOUTNAV](https://en.wikipedia.org/w/index.php?title=MOS:LAYOUTNAV&redirect=no)</OutwardLink></Item>
                        <Item><OutwardLink>[MOS:NAVLAYOUT](https://en.wikipedia.org/w/index.php?title=MOS:NAVLAYOUT&redirect=no)</OutwardLink></Item>
                    </List>
                    <Hatnote>
                        Main page: <BookLink>[Wikipedia:Categories, lists, and navigation templates § Navigation templates](https://en.wikipedia.org/wiki/Wikipedia:Categories,_lists,_and_navigation_templates#Navigation_templates)</BookLink>
                    </Hatnote>
                    <Paragraph>
                        An article may end with <BookLink>[Navigation templates](https://en.wikipedia.org/wiki/Wikipedia:Navigation_template)</BookLink> and footer navboxes, such as <BookLink>[succession boxes](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_Succession_Box_Standardization#Overview)</BookLink> and geography boxes (for example, &#123;&#123;<BookLink>[Geographic location](https://en.wikipedia.org/wiki/Template:Geographic_location)</BookLink>&#125;&#125;). Most navboxes do not appear in printed versions of Wikipedia articles.<Citation>[m](cite_note-23)</Citation>
                    </Paragraph>
                    <Paragraph>
                        For navigation templates in the lead, see <BookLink>[Wikipedia:Manual of Style/Lead section § Sidebars](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Lead_section#Sidebars)</BookLink>.
                    </Paragraph>
                    <Hatnote>
                        For navigation templates in the lead, see <BookLink>[Wikipedia:Manual of Style/Lead section § Sidebars](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Lead_section#Sidebars)</BookLink>.
                    </Hatnote>
                </Section>
                </Section>
            </Document>
        );
    }
}
