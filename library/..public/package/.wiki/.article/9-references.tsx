import { Entry, Heading, References, Section } from '@dna-platform/public';
import { $Article } from '@dna-platform/public/encyclopedia';
import { BookLink } from '../.book';

export default class $References extends $Article {
    print() {
        return (
            <References>
                <Section>
                    <Heading>References</Heading>
                    <Entry>
                        cite_note-1: Discussed in <BookLink>[2018](https://en.wikipedia.org/wiki/Wikipedia_talk:Manual_of_Style/Layout/Archive_12#Short_descriptions)</BookLink> and <BookLink>[2019](https://en.wikipedia.org/wiki/Wikipedia_talk:Manual_of_Style/Layout/Archive_13#Where_to_put_&#123;&#123;short_description&#125;&#125;)</BookLink>.
                    </Entry>
                    <Entry>
                        cite_note-2: Per the template documentation at <BookLink>[Template:Italic title/doc § Location on page](https://en.wikipedia.org/wiki/Template:Italic_title/doc#Location_on_page)</BookLink>
                    </Entry>
                    <Entry>
                        cite_note-3: Per the RFC at <BookLink>[Wikipedia talk:Manual of Style/Layout/Archive 14 § DISPLAYTITLE](https://en.wikipedia.org/wiki/Wikipedia_talk:Manual_of_Style/Layout/Archive_14#DISPLAYTITLE)</BookLink>
                    </Entry>
                    <Entry>
                        cite_note-4: Per the template documentation at <BookLink>[Template:DISPLAYTITLE § Instructions](https://en.wikipedia.org/wiki/Template:DISPLAYTITLE#Instructions)</BookLink>
                    </Entry>
                    <Entry>
                        cite_note-5: The matter was discussed in <BookLink>[2012](https://en.wikipedia.org/wiki/Template_talk:Use_dmy_dates/Archive_1#Changing_placement)</BookLink>, <BookLink>[2014](https://en.wikipedia.org/wiki/Wikipedia_talk:Manual_of_Style/Layout/Archive_11#Order_of_article_elements:_what_about_Italic_title,_Use_DMY_dates,_etc_?)</BookLink>, and <BookLink>[2015](https://en.wikipedia.org/wiki/Template_talk:Use_dmy_dates/Archive_1#Placement)</BookLink>.
                    </Entry>
                    <Entry>
                        cite_note-sequence-9: This sequence has been in place since at least <BookLink>[December 2003](https://en.wikipedia.org/wiki/Special:PermanentLink/2166480)</BookLink> (when "See also" was called "Related topics"). See, for example, <BookLink>[Wikipedia:Perennial proposals § Changes to standard appendices](https://en.wikipedia.org/wiki/Wikipedia:Perennial_proposals#Changes_to_standard_appendices)</BookLink>.
                    </Entry>
                    <Entry>
                        cite_note-11: Per <BookLink>[Wikipedia:Templates for discussion/Log/2026 March 1#Template:Duplicated citations](https://en.wikipedia.org/wiki/Wikipedia:Templates_for_discussion/Log/2026_March_1#Template:Duplicated_citations)</BookLink>
                    </Entry>
                    <Entry>
                        cite_note-13: <BookLink>[Rationale for placing navboxes at the end of the article.](https://en.wikipedia.org/wiki/Wikipedia_talk:Manual_of_Style/Layout/Archive_5#What_is_the_rationale_of_putting_navboxes_at_the_very_bottom?)</BookLink>
                    </Entry>
                    <Entry>
                        cite_note-18: <BookLink>[Rationale for discouraging the use of "Bibliography."](https://en.wikipedia.org/wiki/Wikipedia_talk:Manual_of_Style/Layout/Archive_7#Bibliography)</BookLink>
                    </Entry>
                    <Entry>
                        cite_note-21: The community has rejected past proposals to do away with this guidance. See, for example, <BookLink>[this RfC](https://en.wikipedia.org/wiki/Wikipedia_talk:Manual_of_Style/Layout/Archive_12#RfC:_remove_the_proscription_against_previously-linked_terms_in_the_%22See_also%22_section?)</BookLink>.
                    </Entry>
                </Section>
            </References>
        );
    }
}
