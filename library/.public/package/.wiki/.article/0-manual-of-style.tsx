import { $ } from '@dna-platform/chemistry';
import { Heading, Italics, Paragraph, Section } from '@dna-platform/public';
import { $Article, Manual } from '@dna-platform/public/encyclopedia';
import { Menu, Option, Search, Summary } from '@dna-platform/public/application';
import { BookLink } from '../.book';

export default class $ManualOfStyle extends $Article {
    print() {
        return (
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
        );
    }
}
