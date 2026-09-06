import { $ } from '@dna-platform/chemistry';
import { Heading, List, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';
import { BookLink } from '../.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Standard appendices and footers</Heading>
        </Section>
        <Section>
            <Heading>Headings</Heading>
            <Paragraph>When appendix sections are used, they should appear at the bottom of an article, with ==level 2 headings==, followed by the various footers. When it is useful to sub-divide these sections (for example, to separate a list of magazine articles from a list of books), this should be done using level 3 headings (===Books===) instead of <BookLink>[definition list headings](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Lists#Description_(definition,_association)_lists)</BookLink> (;Books), as explained in the <BookLink>[accessibility guidelines](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Accessibility#Lists)</BookLink>.</Paragraph>
        </Section>
        <Section>
            <Heading>Works or publications</Heading>
            <Paragraph>Contents: A bulleted list, usually ordered chronologically, of the works created by the subject of the article.</Paragraph>
            <Paragraph>Heading names: Many different headings are used, depending on the subject matter. "Works" is preferred when the list includes items that are not written publications (e.g. music, films, paintings, choreography, or architectural designs), or if multiple types of works are included. "Publications", "Discography" or "Filmography" are occasionally used where appropriate; however, "Bibliography" is discouraged because it is not clear whether it is limited to the works of the subject of the article. "Works" or "Publications" should be plural, even if it lists only a single item.</Paragraph>
        </Section>
        <Section>
            <Heading>"See also" section</Heading>
            <Paragraph>A "See also" section is a useful way to organize <BookLink>[internal links](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Linking)</BookLink> to related or comparable articles and to encourage readers to explore related concepts that may be new to them. However, the section itself is not required; many high-quality and comprehensive articles do not have one.</Paragraph>
            <Paragraph>The section should be a bulleted list, sorted either logically (for example, by subject matter), chronologically, or alphabetically. Consider using &#123;&#123;Columns-list&#125;&#125; or &#123;&#123;Div col&#125;&#125; if the list is lengthy. List entries should begin with a capital letter.</Paragraph>
            <Paragraph>Contents: Links in this section should be relevant and limited to a reasonable number. Whether a link belongs in the "See also" section is ultimately a matter of editorial judgment and <BookLink>[common sense](https://en.wikipedia.org/wiki/Wikipedia:What_"Ignore_all_rules"_means#Use_common_sense)</BookLink>. One purpose of "See also" links is to enable readers to explore tangentially related topics; however, articles linked should be related to the topic of the article or be in the same defining category. For example, the article on <BookLink>[Jesus](https://en.wikipedia.org/wiki/Jesus)</BookLink> might include a "See also" link to <BookLink>[List of people claimed to be Jesus](https://en.wikipedia.org/wiki/List_of_people_claimed_to_be_Jesus)</BookLink> because it is related to the subject but not otherwise linked in the article. The article on <BookLink>[Tacos](https://en.wikipedia.org/wiki/Tacos)</BookLink> might include the "See also" link <BookLink>[Fajita](https://en.wikipedia.org/wiki/Fajita)</BookLink> as another example of Mexican cuisine.</Paragraph>
            <Paragraph>The "See also" section should include <BookLink>[red links](https://en.wikipedia.org/wiki/Wikipedia:Red_link)</BookLink>, links to <BookLink>[disambiguation pages](https://en.wikipedia.org/wiki/Wikipedia:Disambiguation)</BookLink> (unless used in a disambiguation page for <BookLink>[further disambiguation](https://en.wikipedia.org/wiki/MOS:DABSEEALSO)</BookLink>), or <BookLink>[external links](https://en.wikipedia.org/wiki/Wikipedia:External_links)</BookLink> (including links to pages within <BookLink>[Wikimedia sister projects](https://en.wikipedia.org/wiki/Wikipedia:Wikimedia_sister_projects)</BookLink>). As a general rule, the "See also" section should repeat links that appear in the article's body.</Paragraph>
            <Paragraph>Editors should provide a brief annotation when a link's relevance is not immediately apparent, when the meaning of the term may not be generally known, or when the term is ambiguous. For example:</Paragraph>
            <Paragraph>The "" dash can be generated using &#123;&#123;snd&#125;&#125;.</Paragraph>
            <Paragraph>If the linked article has a <BookLink>[short description](https://en.wikipedia.org/wiki/WP:Short_description)</BookLink> then the template &#123;&#123;Annotated link&#125;&#125; will automatically generate an annotation. For example, will produce:</Paragraph>
            <Paragraph>Other internal links: &#123;&#123;Portal&#125;&#125; links are usually placed in this section. As an alternative, &#123;&#123;Portal bar&#125;&#125; may be placed with the end matter navigation templates. See relevant template documentation for correct placement.</Paragraph>
        </Section>
        <Section>
            <Heading>Notes and references</Heading>
            <Paragraph>Contents: This section, or series of sections, may contain any or all of the following:</Paragraph>
            <Paragraph><BookLink>[Editors may use any citation method they choose](https://en.wikipedia.org/wiki/Wikipedia:Citing_sources#Variation_in_citation_methods)</BookLink>, but it should be consistent within an article.</Paragraph>
            <Paragraph>If there are both citation footnotes and explanatory footnotes, then they may be combined in a single section, or separated using the <BookLink>[grouped footnotes](https://en.wikipedia.org/wiki/Help:Footnotes#Grouping_footnotes)</BookLink> function. General references and other full citations may similarly be either combined or separated (e.g. "References" and "General references"). There may therefore be one, two, three or four sections in all.</Paragraph>
            <Paragraph>It is most common for only citation footnotes to be used, and therefore it is most common for only one section ("References") to be needed. Usually, if the sections are separated, then explanatory footnotes are listed first, short citations or other footnoted citations are next, and any full citations or general references are listed last. General references should be sorted logically (for example, by subject matter), chronologically, or alphabetically.</Paragraph>
            <Paragraph>Heading names: Editors may use any reasonable section and subsection names that they choose. The most frequent choice is "References". Other options, in diminishing order of popularity, are "Notes", "Footnotes" or "Works cited", although these are more often used to distinguish between multiple end-matter sections or subsections.</Paragraph>
            <Paragraph>Several alternate titles ("Sources", "Citations", "Bibliography") may also be used, although each is questionable in some contexts: "Sources" may be confused with <BookLink>[source code](https://en.wikipedia.org/wiki/source_code)</BookLink> in computer-related articles, product purchase locations, river origins, <BookLink>[journalism sourcing](https://en.wikipedia.org/wiki/journalism_sourcing)</BookLink>, etc.; "Citations" may be confused with official awards, or a summons to court; "Bibliography" may be confused with the complete list of printed works by the subject of a biography ("Works" or "Publications").</Paragraph>
            <Paragraph>If multiple sections are wanted, then some possibilities include:</Paragraph>
            <Paragraph>With the exception of "Bibliography", the heading should be plural even if it lists only a single item.</Paragraph>
            <List>
                - Explanatory footnotes that give information which is too detailed or awkward to be in the body of the article
                - Citation footnotes (either short citations or full citations) that connect specific material in the article with specific sources
                - Full citations to sources, if short citations are used in the footnotes
                - General references (full bibliographic citations to sources that were consulted in writing the article but that are not explicitly connected to any specific material in the article)
                - For a list of explanatory footnotes or shortened citation footnotes: "Notes", "Endnotes" or "Footnotes"
                - For a list of full citations or general references: "References" or "Works cited"
            </List>
        </Section>
        <Section>
            <Heading>Further reading</Heading>
            <Paragraph>Contents: An optional bulleted list, usually alphabetized, of a reasonable number of publications that would help interested readers learn more about the article subject. Editors may include brief annotations. Publications listed in <BookLink>[further reading](https://en.wikipedia.org/wiki/Wikipedia:Further_reading)</BookLink> are formatted in the same <BookLink>[citation style](https://en.wikipedia.org/wiki/WP:CITE#HOW)</BookLink> used by the rest of the article. The Further reading section should not duplicate the content of the External links section, and should normally not duplicate the content of the References section, unless the References section is too long for a reader to use as part of a general reading list. This section is not intended as a repository for <BookLink>[general references](https://en.wikipedia.org/wiki/WP:General_references)</BookLink> or full citations that were used to create the article content. Any links to external websites included under "Further reading" are subject to the guidelines described at <BookLink>[Wikipedia:External links](https://en.wikipedia.org/wiki/Wikipedia:External_links)</BookLink>.</Paragraph>
        </Section>
        <Section>
            <Heading>External links</Heading>
            <Paragraph>Contents: A bulleted list of recommended <BookLink>[relevant websites](https://en.wikipedia.org/wiki/Wikipedia:External_links#What_can_normally_be_linked)</BookLink>, each accompanied by a short description. These hyperlinks should not appear in the article's body text, nor should links used as references normally be duplicated in this section. "External links" should be plural, even if it lists only a single item. Depending on the nature of the link contents, this section may be accompanied or replaced by a <BookLink>["Further reading"](#Further_reading)</BookLink> section.</Paragraph>
        </Section>
        <Section>
            <Heading>Links to sister projects</Heading>
            <Paragraph>Links to <BookLink>[Wikimedia sister projects](https://en.wikipedia.org/wiki/Wikipedia:Wikimedia_sister_projects)</BookLink> and &#123;&#123;Spoken Wikipedia&#125;&#125; should be placed in the last section of the page, which is usually "External links". If the article does not already have an "External links" section, then you may choose whether to place larger sister link(s) (such as &#123;&#123;Sister project links&#125;&#125; or &#123;&#123;Commons category&#125;&#125;) in whatever the last section is (usually "References"), or to create an "External links" section and use the less common inline form of these templates (e.g., &#123;&#123;Commons-inline&#125;&#125;).</Paragraph>
            <List>
                - Box-type templates (such as &#123;&#123;Commons category&#125;&#125;, shown here for commons:Category:Wikipedia logos) have to be put at the beginning of the last section of the article so that boxes will appear next to, rather than below, the list items. Do make a section whose sole content is box-type templates.
                - "Inline" templates are used when box-type templates are not desirable, either because they result in a long sequence of right-aligned boxes hanging off the bottom of the article, or because there are no external links except sister project ones. "Inline" templates, such as &#123;&#123;Commons category-inline&#125;&#125;, create links to sister projects that appear as list items, like this:
            </List>
        </Section>
        <Section>
            <Heading>Navigation templates</Heading>
            <Paragraph>An article may end with <BookLink>[Navigation templates](https://en.wikipedia.org/wiki/Wikipedia:Navigation_template)</BookLink> and footer navboxes, such as <BookLink>[succession boxes](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_Succession_Box_Standardization#Overview)</BookLink> and geography boxes (for example, &#123;&#123;Geographic location&#125;&#125;). Most navboxes do not appear in printed versions of Wikipedia articles.</Paragraph>
        </Section>
    </Chapter>,
    Chapter
);
