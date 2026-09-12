import { $Chapter, Footer, Heading, Paragraph } from '@dna-platform/public';
import { BookLink, OutwardLink } from '../.book';

export default class $TheFoot extends $Chapter {
    print() {
        return (
            <Footer>
                <Heading>About this page</Heading>
                <Paragraph>This page was last edited on 11 September 2026, at 08:13 (UTC).</Paragraph>
                <Paragraph>Page was rendered with Parsoid.</Paragraph>
                <Paragraph>Text is available under the Creative Commons Attribution-ShareAlike 4.0 License; additional terms may apply. By using this site, you agree to the Terms of Use and Privacy Policy. Wikipedia® is a registered trademark of the Wikimedia Foundation, Inc., a non-profit organization.</Paragraph>
                <Paragraph>
                    <OutwardLink>[Privacy policy](https://foundation.wikimedia.org/wiki/Special:MyLanguage/Policy:Privacy_policy)</OutwardLink>
                    <BookLink>[About Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:About)</BookLink>
                    <BookLink>[Disclaimers](https://en.wikipedia.org/wiki/Wikipedia:General_disclaimer)</BookLink>
                    <BookLink>[Contact Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:Contact_us)</BookLink>
                    <OutwardLink>[Legal & safety contacts](https://foundation.wikimedia.org/wiki/Special:MyLanguage/Legal:Wikimedia_Foundation_Legal_and_Safety_Contact_Information)</OutwardLink>
                    <OutwardLink>[Code of Conduct](https://foundation.wikimedia.org/wiki/Special:MyLanguage/Policy:Universal_Code_of_Conduct)</OutwardLink>
                    <OutwardLink>[Developers](https://developer.wikimedia.org/)</OutwardLink>
                    <BookLink>[Statistics](https://stats.wikimedia.org/#/en.wikipedia.org)</BookLink>
                    <OutwardLink>[Cookie statement](https://foundation.wikimedia.org/wiki/Special:MyLanguage/Policy:Cookie_statement)</OutwardLink>
                    <BookLink>[Mobile view](https://en.wikipedia.org/w/index.php?title=Alan_Turing&mobileaction=toggle_view_mobile)</BookLink>
                    <BookLink>[Edit preview settings](https://en.wikipedia.org/wiki/Alan_Turing#)</BookLink>
                </Paragraph>
            </Footer>
        );
    }
}
