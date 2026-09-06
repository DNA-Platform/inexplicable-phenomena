import { $ } from '@dna-platform/chemistry';
import { Heading, List, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';
import { BookLink } from '../.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Formatting</Heading>
        </Section>
        <Section>
            <Heading>Images</Heading>
            <Paragraph>Each image should ideally be located in the section to which it is most relevant, and most should carry an explanatory <BookLink>[caption](https://en.wikipedia.org/wiki/Wikipedia:Captions)</BookLink>. An image that would otherwise overwhelm the text space available within a <BookLink>[1024×768 window](https://en.wikipedia.org/wiki/Display_resolution)</BookLink> should generally be formatted as described in relevant formatting guidelines (e.g. <BookLink>[WP:IMAGESIZE](https://en.wikipedia.org/wiki/WP:IMAGESIZE)</BookLink>, <BookLink>[MOS:IMGSIZE](https://en.wikipedia.org/wiki/MOS:IMGSIZE)</BookLink>, <BookLink>[Help:Pictures#Panoramas](https://en.wikipedia.org/wiki/Help:Pictures#Panoramas)</BookLink>). Try to harmonize the sizes of images on a given page in order to maintain visual coherence.</Paragraph>
            <Paragraph>If "stacked" images in one section spill over into the next section at 1024×768 screen resolution, there may be too many images in that section. If an article overall has so many images that they lengthen the page beyond the length of the text itself, you can use a <BookLink>[gallery](https://en.wikipedia.org/wiki/Wikipedia:Picture_tutorial#Galleries)</BookLink>; or you can create a page or category combining all of them at <BookLink>[Wikimedia Commons](https://en.wikipedia.org/wiki/Wikimedia_Commons)</BookLink> and use a relevant template (&#123;&#123;Commons&#125;&#125;, &#123;&#123;Commons category&#125;&#125;, &#123;&#123;Commons-inline&#125;&#125; or &#123;&#123;Commons category-inline&#125;&#125;) to link to it instead, so that further images are readily available when the article is expanded. See for further information on galleries.</Paragraph>
            <Paragraph>Use to adjust the size of images; for example, displays an image 30% larger than the default, and displays it 40% smaller. Lead images should usually be no larger than.</Paragraph>
            <Paragraph>Avoid article text referring to images as being to the left, right, above or below, because image placement varies with platform (especially mobile platforms) and screen size, and is meaningless to people using screen readers; instead, use captions to identify images.</Paragraph>
        </Section>
        <Section>
            <Heading>Horizontal rule</Heading>
            <Paragraph><BookLink>[Horizontal rules](https://en.wikipedia.org/wiki/Help:Wikitext#Horizontal_rule)</BookLink> are sometimes used in some special circumstances, such as inside &#123;&#123;sidebar&#125;&#125; template derivatives, but not in regular article prose.</Paragraph>
        </Section>
        <Section>
            <Heading>Collapsible content</Heading>
            <Paragraph>As explained at <BookLink>[MOS:COLLAPSE](https://en.wikipedia.org/wiki/MOS:COLLAPSE)</BookLink>, limit the use of &#123;&#123;Collapse top&#125;&#125;/&#123;&#123;Collapse bottom&#125;&#125; and similar templates in articles. That said, they can be <BookLink>[useful in talk pages](https://en.wikipedia.org/wiki/WP:TALKOFFTOPIC)</BookLink>.</Paragraph>
        </Section>
    </Chapter>,
    Chapter
);
