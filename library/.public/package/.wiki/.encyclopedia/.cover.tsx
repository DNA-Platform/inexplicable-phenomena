import { $ } from '@dna-platform/chemistry';
import { $Chapter, Author, Cover, Heading, Paragraph, Reference, Section, Subject, Title } from '@dna-platform/public';
import { BookLink } from '../.document';
import { globe, Language, Languages, Logo, Search } from './.document';

export default class $Cover extends $Chapter {
    view() {
        return (
            <Cover>
                <Title>Wikipedia<Reference>https://www.wikipedia.org/</Reference></Title>
                <Author>Wikipedians</Author>
                <Subject>Knowledge</Subject>
                <Section>
                    <Heading>Wikipedia</Heading>
                    <Logo src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Wikipedia_wordmark.svg" width="176">Wikipedia</Logo>
                    <Paragraph>The Free Encyclopedia</Paragraph>
                </Section>
                <Languages globe={globe}>
                    <Heading>Read Wikipedia in your language</Heading>
                    <Language at={1}><BookLink>[English](https://en.wikipedia.org/)</BookLink> 7,237,000+ articles</Language>
                    <Language at={2}><BookLink>[日本語](https://ja.wikipedia.org/)</BookLink> 1,517,000+ 記事</Language>
                    <Language at={3}><BookLink>[Deutsch](https://de.wikipedia.org/)</BookLink> 3.150.000+ Artikel</Language>
                    <Language at={4}><BookLink>[Français](https://fr.wikipedia.org/)</BookLink> 2 778 000+ articles</Language>
                    <Language at={5}><BookLink>[Русский](https://ru.wikipedia.org/)</BookLink> 2 117 000+ статей</Language>
                    <Language at={6}><BookLink>[Español](https://es.wikipedia.org/)</BookLink> 2.136.000+ artículos</Language>
                    <Language at={7}><BookLink>[Italiano](https://it.wikipedia.org/)</BookLink> 1.986.000+ voci</Language>
                    <Language at={8}><BookLink>[中文](https://zh.wikipedia.org/)</BookLink> 1,554,000+ 条目 / 條目</Language>
                    <Language at={9}><BookLink>[Polski](https://pl.wikipedia.org/)</BookLink> 1 707 000+ haseł</Language>
                    <Language at={10}><BookLink>[Português](https://pt.wikipedia.org/)</BookLink> 1.181.000+ artigos</Language>
                </Languages>
                <Search language="en">Search Wikipedia</Search>
            </Cover>
        );
    }
}
