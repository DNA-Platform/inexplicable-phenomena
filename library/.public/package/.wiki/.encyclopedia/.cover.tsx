import { $ } from '@dna-platform/chemistry';
import { Author, Cover, Heading, Paragraph, Reference, Section, Subject, Title } from '@dna-platform/public';
import { BookLink, Search } from '../.chapter';
import { Language, Languages, Logo } from './.chapter';

export default $(
    <Cover>
        <Title>Wikipedia<Reference>https://www.wikipedia.org/</Reference></Title>
        <Author>Wikipedians</Author>
        <Subject>Knowledge</Subject>
        <Section>
            <Heading>Wikipedia</Heading>
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Wikipedia_wordmark.svg" width="176">Wikipedia</Logo>
            <Paragraph>The Free Encyclopedia</Paragraph>
        </Section>
        <Languages globe="https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg">
            <Heading>Read Wikipedia in your language</Heading>
            <Language at={1}><BookLink>[English](https://en.wikipedia.org/)</BookLink> 7,189,000+ articles</Language>
            <Language at={2}><BookLink>[日本語](https://ja.wikipedia.org/)</BookLink> 1,503,000+ 記事</Language>
            <Language at={3}><BookLink>[Deutsch](https://de.wikipedia.org/)</BookLink> 3.125.000+ Artikel</Language>
            <Language at={4}><BookLink>[Русский](https://ru.wikipedia.org/)</BookLink> 2 103 000+ статей</Language>
            <Language at={5}><BookLink>[Français](https://fr.wikipedia.org/)</BookLink> 2 761 000+ articles</Language>
            <Language at={6}><BookLink>[Español](https://es.wikipedia.org/)</BookLink> 2.116.000+ artículos</Language>
            <Language at={7}><BookLink>[中文](https://zh.wikipedia.org/)</BookLink> 1,537,000+ 条目 / 條目</Language>
            <Language at={8}><BookLink>[Italiano](https://it.wikipedia.org/)</BookLink> 1.971.000+ voci</Language>
            <Language at={9}><BookLink>[Polski](https://pl.wikipedia.org/)</BookLink> 1 696 000+ haseł</Language>
            <Language at={10}><BookLink>[Português](https://pt.wikipedia.org/)</BookLink> 1.173.000+ artigos</Language>
        </Languages>
        <Search language="en">Search Wikipedia</Search>
    </Cover>,
    Cover
);
