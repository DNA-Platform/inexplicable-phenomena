import { $ } from '@dna-platform/chemistry';
import { $Chapter, Bold, Citation, Document, Heading, Illustration, Italics, Item, List, Paragraph, Quote, Section } from '@dna-platform/public';
import { Hatnote, Manual } from '@dna-platform/public/encyclopedia';
import { Menu, Option, Search, Summary } from '@dna-platform/public/application';
import { BookLink, OutwardLink } from '../.book';

export default class $WikipediaManualOfStyleLayout extends $Chapter {
    print() {
        return (
            <Document>
                <Hatnote>
                    This page is about the layout of Wikipedia articles. For the layout of Wikipedia talk pages, see <BookLink>[Wikipedia:Talk page layout](https://en.wikipedia.org/wiki/Wikipedia:Talk_page_layout)</BookLink>.
                </Hatnote>
                <Manual>
                    <Section>
                        <Heading><BookLink>[Manual of Style](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style)</BookLink></Heading>
                        <Search said="Search" where="https://en.wikipedia.org/wiki/Special:Search">Search the Manual of Style</Search>
                        <Menu>
                            <Summary>Content</Summary>
                            <Option><BookLink>[Accessibility](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Accessibility)</BookLink></Option>
                            <Option><BookLink>[Biography](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Biography)</BookLink></Option>
                            <Option><BookLink>[Disambiguation pages](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Disambiguation_pages)</BookLink></Option>
                            <Option><BookLink>[Hidden text](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Hidden_text)</BookLink></Option>
                            <Option><BookLink>[Infoboxes](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Infoboxes)</BookLink></Option>
                            <Option><BookLink>[Linking](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Linking)</BookLink></Option>
                            <Option><BookLink>[Self-references](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Self-references_to_avoid)</BookLink></Option>
                            <Option><BookLink>[Words to watch](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Words_to_watch)</BookLink></Option>
                        </Menu>
                        <Menu>
                            <Summary>Formatting</Summary>
                            <Option><BookLink>[Abbreviations](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Abbreviations)</BookLink></Option>
                            <Option><BookLink>[Capitalization](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Capital_letters)</BookLink></Option>
                            <Option><BookLink>[Dates and numbers](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Dates_and_numbers)</BookLink></Option>
                            <Option><BookLink>[Pronunciation](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Pronunciation)</BookLink></Option>
                            <Option><BookLink>[Spelling](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Spelling)</BookLink></Option>
                            <Option><BookLink>[Superscripts and subscripts](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Superscripts_and_subscripts)</BookLink></Option>
                            <Option><BookLink>[Text formatting](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Text_formatting)</BookLink></Option>
                            <Option><BookLink>[Titles of works](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Titles_of_works)</BookLink></Option>
                        </Menu>
                        <Menu>
                            <Summary>Images</Summary>
                            <Option><BookLink>[Captions](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Captions)</BookLink></Option>
                            <Option><BookLink>[Image placement](https://en.wikipedia.org/wiki/Wikipedia:Image_use_policy#Adding_images_to_articles)</BookLink></Option>
                            <Option><BookLink>[Icons](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Icons)</BookLink></Option>
                            <Option><BookLink>[Images](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Images)</BookLink></Option>
                        </Menu>
                        <Menu>
                            <Summary>Layout</Summary>
                            <Option><BookLink>[Layout](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout)</BookLink></Option>
                            <Option><BookLink>[Lead section](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Lead_section)</BookLink></Option>
                            <Option><BookLink>[Tables](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Tables)</BookLink></Option>
                            <Option><BookLink>[Trivia sections](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Trivia_sections)</BookLink></Option>
                        </Menu>
                        <Menu>
                            <Summary>Lists</Summary>
                            <Option><BookLink>[Lists](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Lists)</BookLink></Option>
                            <Option><BookLink>[Lists of works](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Lists_of_works)</BookLink></Option>
                            <Option><BookLink>[Road junctions](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Road_junction_lists)</BookLink></Option>
                            <Option><BookLink>[Stand-alone lists](https://en.wikipedia.org/wiki/Wikipedia:Stand-alone_lists)</BookLink></Option>
                        </Menu>
                        <Menu>
                            <Summary>By topic area</Summary>
                            <Menu>
                                <Summary>Arts</Summary>
                                <Option><BookLink>[Anime and manga](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Anime_and_manga)</BookLink></Option>
                                <Option><BookLink>[Comics](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Comics)</BookLink></Option>
                                <Option><BookLink>[Film](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Film)</BookLink></Option>
                                <Option><BookLink>[Music](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Music)</BookLink></Option>
                                <Option><BookLink>[Novels](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Novels)</BookLink></Option>
                                <Option><BookLink>[Television](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Television)</BookLink></Option>
                                <Option><BookLink>[Video games](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Video_games)</BookLink></Option>
                                <Option><BookLink>[Visual arts](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Visual_arts)</BookLink></Option>
                                <Option><BookLink>[Writing about fiction](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Writing_about_fiction)</BookLink></Option>
                                <Option><Italics>See also: <BookLink>[WikiProject style advice](https://en.wikipedia.org/wiki/Category:WikiProject_style_advice_%28arts%29)</BookLink></Italics></Option>
                            </Menu>
                            <Menu>
                                <Summary>Regional</Summary>
                                <Option><BookLink>[Canada](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Canada-related_articles)</BookLink></Option>
                                <Option><BookLink>[China and Chinese](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/China-_and_Chinese-related_articles)</BookLink></Option>
                                <Option><BookLink>[France and French](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/France-_and_French-related_articles)</BookLink></Option>
                                <Option><BookLink>[Hawaii](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Hawaii-related_articles)</BookLink></Option>
                                <Option><BookLink>[India](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/India-related_articles)</BookLink></Option>
                                <Option><BookLink>[Indonesia](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Indonesia-related_articles)</BookLink></Option>
                                <Option><BookLink>[Ireland](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Ireland-related_articles)</BookLink></Option>
                                <Option><BookLink>[Japan](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Japan-related_articles)</BookLink></Option>
                                <Option><BookLink>[Korea](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Korea-related_articles)</BookLink></Option>
                                <Option><BookLink>[Kurdistan](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Kurdish-related_articles)</BookLink></Option>
                                <Option><BookLink>[Pakistan](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Pakistan-related_articles)</BookLink></Option>
                                <Option><BookLink>[Philippines](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Philippines-related_articles)</BookLink></Option>
                                <Option><BookLink>[Poland](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Poland-related_articles)</BookLink></Option>
                                <Option><BookLink>[Singapore](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Singapore-related_articles)</BookLink></Option>
                                <Option><Italics>See also: <BookLink>[Naming conventions geographic names](https://en.wikipedia.org/wiki/Wikipedia:Naming_conventions_%28geographic_names%29)</BookLink></Italics></Option>
                                <Option><Italics><BookLink>[WikiProject style advice](https://en.wikipedia.org/wiki/Category:WikiProject_style_advice_%28regional%29)</BookLink></Italics></Option>
                            </Menu>
                            <Menu>
                                <Summary>Science and technology</Summary>
                                <Option><BookLink>[Chemistry](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Chemistry)</BookLink></Option>
                                <Option><BookLink>[Computer science](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Computer_science)</BookLink></Option>
                                <Option><BookLink>[Mathematics](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Mathematics)</BookLink></Option>
                                <Option><BookLink>[Medicine](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Medicine-related_articles)</BookLink></Option>
                                <Option><BookLink>[Taxonomy](https://en.wikipedia.org/wiki/Template:Taxobox/doc)</BookLink></Option>
                                <Option><Italics>See also: <BookLink>[WikiProject style advice](https://en.wikipedia.org/wiki/Category:WikiProject_style_advice_%28science_and_technology%29)</BookLink></Italics></Option>
                            </Menu>
                            <Menu>
                                <Summary>Other</Summary>
                                <Option><BookLink>[Blazons](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Blazon)</BookLink></Option>
                                <Option><BookLink>[Cue sports](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Cue_sports)</BookLink> (<BookLink>[Snooker](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Snooker)</BookLink>)</Option>
                                <Option><BookLink>[Islam](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Islam-related_articles)</BookLink></Option>
                                <Option><BookLink>[Latter Day Saints](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Latter_Day_Saints)</BookLink></Option>
                                <Option><BookLink>[Legal](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Legal)</BookLink></Option>
                                <Option><BookLink>[Military history](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Military_history)</BookLink></Option>
                                <Option><BookLink>[Trademarks](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Trademarks)</BookLink></Option>
                                <Option><Italics>See also: WikiProject style advice</Italics></Option>
                            </Menu>
                        </Menu>
                        <Menu>
                            <Summary>Related guidelines</Summary>
                            <Option><BookLink>[Article size](https://en.wikipedia.org/wiki/Wikipedia:Article_size)</BookLink></Option>
                            <Option><BookLink>[Article titles](https://en.wikipedia.org/wiki/Wikipedia:Article_titles)</BookLink></Option>
                            <Option><BookLink>[Categories, lists, and navigation templates](https://en.wikipedia.org/wiki/Wikipedia:Categories,_lists,_and_navigation_templates)</BookLink></Option>
                            <Option><BookLink>[Categorization](https://en.wikipedia.org/wiki/Wikipedia:Categorization)</BookLink></Option>
                            <Option><BookLink>[Hatnotes](https://en.wikipedia.org/wiki/Wikipedia:Hatnote)</BookLink></Option>
                            <Option><BookLink>[Subpages](https://en.wikipedia.org/wiki/Wikipedia:Subpages)</BookLink></Option>
                            <Option><BookLink>[Understandability](https://en.wikipedia.org/wiki/Wikipedia:Make_technical_articles_understandable)</BookLink></Option>
                        </Menu>
                        <Paragraph>
                            <BookLink>[Simplified](https://en.wikipedia.org/wiki/Wikipedia:Simplified_Manual_of_Style)</BookLink> · <BookLink>[Contents](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Contents)</BookLink> · <BookLink>[Tips](https://en.wikipedia.org/wiki/Wikipedia:Styletips)</BookLink>
                        </Paragraph>
                        <Paragraph>
                            <BookLink>[v](https://en.wikipedia.org/wiki/Template:Style)</BookLink> · <BookLink>[t](https://en.wikipedia.org/wiki/Template_talk:Style)</BookLink> · <BookLink>[e](https://en.wikipedia.org/wiki/Special:EditPage/Template:Style)</BookLink>
                        </Paragraph>
                    </Section>
                </Manual>

                <Illustration source="https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/Wikipedia_layout_sample_large.png/250px-Wikipedia_layout_sample_large.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail" width="200" height="196">
                    Sample article layout (click on image for larger view)
                </Illustration>
                <Paragraph>
                    This guide presents the typical <Bold>layout</Bold> of Wikipedia articles, including the sections an article usually has, ordering of sections, and formatting styles for various elements of an article. For advice on the use of wiki <BookLink>[markup](https://en.wikipedia.org/wiki/Markup_language)</BookLink>, see <BookLink>[Help:Editing](https://en.wikipedia.org/wiki/Help:Editing)</BookLink>; for guidance on writing style, see <BookLink>[Manual of Style](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style)</BookLink>.
                </Paragraph>
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
                <Section>
                    <Heading>Body sections</Heading>
                    <List>
                        <Item><OutwardLink>[MOS:BODY](https://en.wikipedia.org/w/index.php?title=MOS:BODY&redirect=no)</OutwardLink></Item>
                    </List>
                    <Hatnote>
                        Further information: <BookLink>[Help:Section](https://en.wikipedia.org/wiki/Help:Section)</BookLink> and <BookLink>[Wikipedia:Manual of Style § Article titles, headings, and sections](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style#Article_titles,_headings,_and_sections)</BookLink>
                    </Hatnote>
                    <Paragraph>
                        Articles longer than a <BookLink>[stub](https://en.wikipedia.org/wiki/Wikipedia:Stub)</BookLink> are generally divided into sections, and sections over a certain length are generally divided into paragraphs: these divisions enhance the readability of the article. Recommended names and orders of section headings may <BookLink>[vary by subject matter](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Specialized_layout)</BookLink>, although articles should still follow good organizational and writing principles regarding sections and paragraphs.
                    </Paragraph>
                    <Section>
                        <Heading>Headings and sections</Heading>
                        <List>
                            <Item><OutwardLink>[MOS:SUBSECTION](https://en.wikipedia.org/w/index.php?title=MOS:SUBSECTION&redirect=no)</OutwardLink></Item>
                            <Item><OutwardLink>[MOS:OVERSECTION](https://en.wikipedia.org/w/index.php?title=MOS:OVERSECTION&redirect=no)</OutwardLink></Item>
                        </List>
                        <Hatnote>
                            Further information: <BookLink>[Wikipedia:Manual of Style § Section headings](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style#Section_headings)</BookLink>
                        </Hatnote>
                        <Illustration source="https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Wikipedia_layout_sample_bodies.png/250px-Wikipedia_layout_sample_bodies.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail" width="200" height="250">
                            Body sections appear after the lead and table of contents (click on image for larger view).
                        </Illustration>
                        <Paragraph>
                            Headings introduce sections and subsections, clarify articles by breaking up text, organize content, and populate the <BookLink>[table of contents](https://en.wikipedia.org/wiki/Help:Section#Table_of_contents_%28TOC%29)</BookLink>. Very short sections and subsections clutter an article with headings and inhibit the flow of the prose. Short paragraphs and single sentences generally do not warrant their own subheadings.
                        </Paragraph>
                        <Paragraph>
                            Headings follow a six-level hierarchy, starting at 1 and ending at 6. The level of the heading is defined by the number of equals signs on each side of the title. Heading 1 (= Heading 1 =) is automatically generated as the title of the article, and is never appropriate within the body of an article. Sections start at the second level (== Heading 2 ==), with subsections at the third level (=== Heading 3 ===), and additional levels of subsections at the fourth level (==== Heading 4 ====), fifth level, and sixth level. Sections should be consecutive, such that they do not skip levels from sections to sub-subsections; the exact methodology is part of the <BookLink>[Accessibility](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Accessibility)</BookLink> guideline.<Citation>[h](cite_note-16)</Citation> Between sections, there should be a <Italics>single</Italics> blank line: multiple blank lines in the edit window create too much white space in the article. There is no need to include a blank line between a heading and sub-heading.
                        </Paragraph>
                        <Paragraph>
                            When changing or removing a heading, consider adding an <BookLink>[anchor template](https://en.wikipedia.org/wiki/Template:Anchor)</BookLink> (using &#123;&#123;subst:anchor&#125;&#125; <BookLink>[rather than](https://en.wikipedia.org/wiki/Wikipedia:ANCHORSUBST)</BookLink> &#123;&#123;anchor&#125;&#125; directly) with the original heading name to provide for <BookLink>[incoming external links](https://en.wikipedia.org/wiki/Wikipedia:Incoming_external_links)</BookLink> and <BookLink>[wikilinks](https://en.wikipedia.org/wiki/Wikipedia:Wikilink)</BookLink>—see <BookLink>[MOS:RENAMESECTION](https://en.wikipedia.org/wiki/MOS:RENAMESECTION)</BookLink>.
                        </Paragraph>
                    </Section>
                    <Section>
                        <Heading>Section order</Heading>
                        <List>
                            <Item><OutwardLink>[MOS:SNO](https://en.wikipedia.org/w/index.php?title=MOS:SNO&redirect=no)</OutwardLink></Item>
                        </List>
                        <Hatnote>
                            See also: <BookLink>[Help:Section](https://en.wikipedia.org/wiki/Help:Section)</BookLink>, <BookLink>[WP:Manual of Style/Accessibility § Headings](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Accessibility#Headings)</BookLink>, <BookLink>[WP:Manual of Style § Section headings](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style#Section_headings)</BookLink>, and <BookLink>[WP:Manual of Style/Capital letters § Section headings](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Capital_letters#Section_headings)</BookLink>
                        </Hatnote>
                        <Paragraph>
                            Because of the diversity of subjects it covers, Wikipedia has no general standard or guideline regarding the order of section headings within the body of an article. The usual practice is to order body sections based on the precedent of similar articles. For exceptions, see <BookLink>[Specialized layout](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Specialized_layout)</BookLink> below.
                        </Paragraph>
                        <Paragraph>
                            Section order outside of the article body should follow the standard shown above in the <BookLink>[Order of article elements section](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Order_of_article_elements)</BookLink>.
                        </Paragraph>
                    </Section>
                    <Section>
                        <Heading>Section templates and summary style</Heading>
                        <Hatnote>
                            Further information: <BookLink>[WP:SUMMARYHATNOTE](https://en.wikipedia.org/wiki/Wikipedia:SUMMARYHATNOTE)</BookLink> and <BookLink>[Wikipedia:Summary style § Templates](https://en.wikipedia.org/wiki/Wikipedia:Summary_style#Templates)</BookLink>
                        </Hatnote>
                        <Paragraph>
                            When a section is a <BookLink>[summary](https://en.wikipedia.org/wiki/Wikipedia:Summary_style)</BookLink> of another article that provides a full exposition of the section, a link to the other article should appear immediately under the section heading. You can use the &#123;&#123;<BookLink>[Main](https://en.wikipedia.org/wiki/Template:Main)</BookLink>&#125;&#125; template to generate a "Main article" link, in Wikipedia's "<BookLink>[hatnote](https://en.wikipedia.org/wiki/Wikipedia:Hatnote)</BookLink>" style.
                        </Paragraph>
                        <Paragraph>
                            If one or more articles provide further information or additional details (rather than a full exposition, see above), links to such articles may be placed immediately after the section heading for that section, provided this does not duplicate a wikilink in the text. These additional links should be grouped along with the &#123;&#123;Main&#125;&#125; template (if there is one), or at the foot of the section that introduces the material for which these templates provide additional information. You can use one of the following templates to generate these links:
                        </Paragraph>
                        <List>
                            <Item>&#123;&#123;<BookLink>[Further](https://en.wikipedia.org/wiki/Template:Further)</BookLink>&#125;&#125; – generates a "Further information" link</Item>
                            <Item>&#123;&#123;<BookLink>[See also](https://en.wikipedia.org/wiki/Template:See_also)</BookLink>&#125;&#125; – generates a "See also" link</Item>
                        </List>
                        <Paragraph>
                            For example, to generate a "See also" link to the article on <BookLink>[Help:Editing](https://en.wikipedia.org/wiki/Help:Editing)</BookLink>, type &#123;&#123;<BookLink>[See also](https://en.wikipedia.org/wiki/Template:See_also)</BookLink>|Help:Editing&#125;&#125;, which will generate:
                        </Paragraph>
                        <Hatnote>
                            See also: <BookLink>[Help:Editing](https://en.wikipedia.org/wiki/Help:Editing)</BookLink>
                        </Hatnote>
                    </Section>
                    <Section>
                        <Heading>Paragraphs</Heading>
                        <List>
                            <Item><OutwardLink>[MOS:PARA](https://en.wikipedia.org/w/index.php?title=MOS:PARA&redirect=no)</OutwardLink></Item>
                            <Item><OutwardLink>[MOS:LINEBREAKS](https://en.wikipedia.org/w/index.php?title=MOS:LINEBREAKS&redirect=no)</OutwardLink></Item>
                        </List>
                        <Hatnote>
                            "MOS:LINEBREAKS" redirects here. For preventing line breaks, see <BookLink>[Wikipedia:Manual of Style § Controlling line breaks](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style#Controlling_line_breaks)</BookLink>.
                        </Hatnote>
                        <Hatnote>
                            See also: <BookLink>[WP:Writing better articles § Paragraphs](https://en.wikipedia.org/wiki/Wikipedia:Writing_better_articles#Paragraphs)</BookLink>, <BookLink>[Help:Wikitext § Line breaks](https://en.wikipedia.org/wiki/Help:Wikitext#Line_breaks)</BookLink>, and <BookLink>[WP:Manual of Style/Accessibility § Indentation](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Accessibility#Indentation)</BookLink>
                        </Hatnote>
                        <Paragraph>
                            Sections usually consist of paragraphs of running prose, each dealing with a particular point or idea. Single-sentence paragraphs can inhibit the flow of the text; by the same token, long paragraphs become hard to read. Between paragraphs—as between sections—there should be only a <Italics>single</Italics> blank line. First lines are <Italics>not</Italics> indented.
                        </Paragraph>
                        <Paragraph>
                            <BookLink>[Bullet points](https://en.wikipedia.org/wiki/Bullet_%28typography%29#Bullet_points)</BookLink> should not be used in the lead of an article. They may be used in the body to break up a mass of text, particularly if the topic requires significant effort to comprehend. Sometimes, it may be preferable to use bullet points instead of having a series of very short paragraphs. Bulleted lists are typical in the reference, further reading, and external links sections towards the end of the article. Bullet points are usually not separated by blank lines, as that causes an accessibility issue (see <BookLink>[MOS:LISTGAP](https://en.wikipedia.org/wiki/MOS:LISTGAP)</BookLink> for ways to create multiple paragraphs within list items that do not cause this issue).
                        </Paragraph>
                    </Section>
                </Section>
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
                <Section>
                    <Heading>Specialized layout</Heading>
                    <Paragraph>
                        <BookLink>[Stand-alone lists](https://en.wikipedia.org/wiki/Wikipedia:Stand-alone_lists)</BookLink> and <BookLink>[talk pages](https://en.wikipedia.org/wiki/Wikipedia:Talk_page_layout)</BookLink> have their own layout designs.
                    </Paragraph>
                    <Paragraph>
                        Certain topics have Manual of Style pages that provide layout advice, including:
                    </Paragraph>
                    <List>
                        <Item><BookLink>[Chemistry](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Chemistry#Article_types)</BookLink></Item>
                        <Item><BookLink>[Film](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Film#Primary_content)</BookLink></Item>
                        <Item><BookLink>[Medicine](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Medicine-related_articles#Content_sections)</BookLink>, for articles on treatments, procedures, medical products, fields of medicine, and other concepts</Item>
                        <Item><BookLink>[Television](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Television)</BookLink></Item>
                        <Item><BookLink>[Video games](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Video_games#Layout)</BookLink></Item>
                    </List>
                    <Paragraph>
                        Some WikiProjects have <BookLink>[advice pages](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_Council/Guide#Advice_pages)</BookLink> that include layout recommendations: see <BookLink>[Category:WikiProject style advice](https://en.wikipedia.org/wiki/Category:WikiProject_style_advice)</BookLink>.
                    </Paragraph>
                </Section>
                <Section>
                    <Heading>Formatting</Heading>
                    <Section>
                        <Heading>Images</Heading>
                        <List>
                            <Item><OutwardLink>[MOS:LAYIM](https://en.wikipedia.org/w/index.php?title=MOS:LAYIM&redirect=no)</OutwardLink></Item>
                        </List>
                        <Hatnote>
                            Main page: <BookLink>[Wikipedia:Manual of Style/Images](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Images)</BookLink>
                        </Hatnote>
                        <Paragraph>
                            Each image should ideally be located in the section to which it is most relevant, and most should carry an explanatory <BookLink>[caption](https://en.wikipedia.org/wiki/Wikipedia:Captions)</BookLink>. An image that would otherwise overwhelm the text space available within a <BookLink>[1024×768 window](https://en.wikipedia.org/wiki/Display_resolution)</BookLink> should generally be formatted as described in relevant formatting guidelines (e.g. <BookLink>[WP:IMAGESIZE](https://en.wikipedia.org/wiki/Wikipedia:IMAGESIZE)</BookLink>, <BookLink>[MOS:IMGSIZE](https://en.wikipedia.org/wiki/MOS:IMGSIZE)</BookLink>, <BookLink>[Help:Pictures § Panoramas](https://en.wikipedia.org/wiki/Help:Pictures#Panoramas)</BookLink>). Try to harmonize the sizes of images on a given page in order to maintain visual coherence.
                        </Paragraph>
                        <Paragraph>
                            If "stacked" images in one section spill over into the next section at 1024×768 screen resolution, there may be too many images in that section. If an article overall has so many images that they lengthen the page beyond the length of the text itself, you can use a <BookLink>[gallery](https://en.wikipedia.org/wiki/Wikipedia:Picture_tutorial#Galleries)</BookLink>; or you can create a page or category combining all of them at <BookLink>[Wikimedia Commons](https://en.wikipedia.org/wiki/Wikimedia_Commons)</BookLink> and use a relevant template (&#123;&#123;<BookLink>[Commons](https://en.wikipedia.org/wiki/Template:Commons)</BookLink>&#125;&#125;, &#123;&#123;<BookLink>[Commons category](https://en.wikipedia.org/wiki/Template:Commons_category)</BookLink>&#125;&#125;, &#123;&#123;<BookLink>[Commons-inline](https://en.wikipedia.org/wiki/Template:Commons-inline)</BookLink>&#125;&#125; or &#123;&#123;<BookLink>[Commons category-inline](https://en.wikipedia.org/wiki/Template:Commons_category-inline)</BookLink>&#125;&#125;) to link to it instead, so that further images are readily available when the article is expanded. See <BookLink>[Wikipedia:Image use policy § Image galleries](https://en.wikipedia.org/wiki/Wikipedia:Image_use_policy#Image_galleries)</BookLink> for further information on galleries.
                        </Paragraph>
                        <Paragraph>
                            Use |upright=scaling factor to adjust the size of images; for example, |upright=1.3 displays an image 30% larger than the default, and |upright=0.60 displays it 40% smaller. Lead images should usually be no larger than |upright=1.2.
                        </Paragraph>
                        <Paragraph>
                            Avoid article text referring to images as being to the left, right, above or below, because image placement varies with platform (especially mobile platforms) and screen size, and is meaningless to people using screen readers; instead, use captions to identify images.
                        </Paragraph>
                    </Section>
                    <Section>
                        <Heading>Horizontal rule</Heading>
                        <List>
                            <Item><OutwardLink>[MOS:----](https://en.wikipedia.org/w/index.php?title=MOS:----&redirect=no)</OutwardLink></Item>
                            <Item><OutwardLink>[MOS:HR](https://en.wikipedia.org/w/index.php?title=MOS:HR&redirect=no)</OutwardLink></Item>
                        </List>
                        <Paragraph>
                            <BookLink>[Horizontal rules](https://en.wikipedia.org/wiki/Help:Wikitext#Horizontal_rule)</BookLink> are sometimes used in some special circumstances, such as inside &#123;&#123;<BookLink>[sidebar](https://en.wikipedia.org/wiki/Template:Sidebar)</BookLink>&#125;&#125; template derivatives, but not in regular article prose.
                        </Paragraph>
                    </Section>
                    <Section>
                        <Heading>Collapsible content</Heading>
                        <Paragraph>
                            As explained at <BookLink>[MOS:COLLAPSE](https://en.wikipedia.org/wiki/MOS:COLLAPSE)</BookLink>, limit the use of &#123;&#123;<BookLink>[Collapse top](https://en.wikipedia.org/wiki/Template:Collapse_top)</BookLink>&#125;&#125;/&#123;&#123;<BookLink>[Collapse bottom](https://en.wikipedia.org/wiki/Template:Collapse_bottom)</BookLink>&#125;&#125; and similar templates in articles. That said, they can be <BookLink>[useful in talk pages](https://en.wikipedia.org/wiki/Wikipedia:TALKOFFTOPIC)</BookLink>.
                        </Paragraph>
                    </Section>
                </Section>
                <Section>
                    <Heading>See also</Heading>
                    <List>
                        <Item><BookLink>[Help:Section](https://en.wikipedia.org/wiki/Help:Section)</BookLink></Item>
                        <Item><BookLink>[Wikipedia:Talk page guidelines](https://en.wikipedia.org/wiki/Wikipedia:Talk_page_guidelines)</BookLink> – shows how to use headings on talk pages</Item>
                        <Item><BookLink>[Wikipedia:Talk page layout](https://en.wikipedia.org/wiki/Wikipedia:Talk_page_layout)</BookLink></Item>
                    </List>
                </Section>
                <Section>
                    <Heading>Notes</Heading>
                    <Quote>
                        See also
    <BookLink>[Wikipedia:How to edit a page](https://en.wikipedia.org/wiki/Wikipedia:How_to_edit_a_page)</BookLink> · <BookLink>[Wikipedia:Manual of Style](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style)</BookLink>
                    </Quote>
                </Section>
            </Document>
        );
    }
}
