import { $ } from '@dna-platform/chemistry';
import { Document, Heading, Item, List, Paragraph, Section } from '@dna-platform/public';
import { Hatnote } from '@dna-platform/public/encyclopedia';
import { BookLink, OutwardLink } from '../.chapter';
import $Chapter from './.chapter';

export default class $Formatting extends $Chapter {
    print() {
        return (
            <Document>
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
            </Document>
        );
    }
}
