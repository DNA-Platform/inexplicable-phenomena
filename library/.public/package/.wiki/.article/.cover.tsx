import { $Chapter, Author, Cover, Description, Heading, Image, Paragraph, Reference, Section, Subject, Title } from '@dna-platform/public';
import { Header, Menu, Option, Search, Summary, Toolbar } from '@dna-platform/public/application';
import { BookLink, OutwardLink } from '../.book';

export default class $Cover extends $Chapter {
    print() {
        return (
            <Cover>
                <Header>
                    <Heading>Wikipedia</Heading>
                    <Menu>
                        <Summary><Description>Main menu</Description></Summary>
                        <Heading>Navigation</Heading>
                        <Option><BookLink>[Main page](https://en.wikipedia.org/wiki/Main_Page)</BookLink></Option>
                        <Option><BookLink>[Contents](https://en.wikipedia.org/wiki/Wikipedia:Contents)</BookLink></Option>
                        <Option><BookLink>[Current events](https://en.wikipedia.org/wiki/Portal:Current_events)</BookLink></Option>
                        <Option><BookLink>[Random article](https://en.wikipedia.org/wiki/Special:Random)</BookLink></Option>
                        <Option><BookLink>[About Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:About)</BookLink></Option>
                        <Option><BookLink>[Contact us](https://en.wikipedia.org/wiki/Wikipedia:Contact_us)</BookLink></Option>
                        <Option><BookLink>[Help](https://en.wikipedia.org/wiki/Help:Contents)</BookLink></Option>
                        <Option><BookLink>[Learn to edit](https://en.wikipedia.org/wiki/Help:Introduction)</BookLink></Option>
                        <Option><BookLink>[Community portal](https://en.wikipedia.org/wiki/Wikipedia:Community_portal)</BookLink></Option>
                        <Option><BookLink>[Recent changes](https://en.wikipedia.org/wiki/Special:RecentChanges)</BookLink></Option>
                        <Option><BookLink>[Upload file](https://en.wikipedia.org/wiki/Wikipedia:File_upload_wizard)</BookLink></Option>
                        <Option><BookLink>[Special pages](https://en.wikipedia.org/wiki/Special:SpecialPages)</BookLink></Option>
                    </Menu>
                    <Section>
                        <Heading>The Free Encyclopedia</Heading>
                        <Image source="https://en.wikipedia.org/static/images/mobile/copyright/wikipedia-wordmark-en-25.svg" width="140" height="22">Wikipedia</Image>
                        <Image source="https://en.wikipedia.org/static/images/mobile/copyright/wikipedia-tagline-en-25.svg" width="140" height="11">The Free Encyclopedia</Image>
                    </Section>
                    <Search said="Search" where="https://en.wikipedia.org/w/index.php">Search Wikipedia</Search>
                    <Paragraph>
                        <BookLink>[Donate](https://donate.wikimedia.org/?wmf_source=donate&wmf_medium=sidebar&wmf_campaign=en.wikipedia.org&uselang=en)</BookLink>
                        <BookLink>[Create account](https://en.wikipedia.org/w/index.php?title=Special:CreateAccount&returnto=Wikipedia%3AManual+of+Style%2FLayout)</BookLink>
                        <BookLink>[Log in](https://en.wikipedia.org/w/index.php?title=Special:UserLogin&returnto=Wikipedia%3AManual+of+Style%2FLayout)</BookLink>
                    </Paragraph>
                </Header>
                <Title>
                    Wikipedia:Manual of Style/Layout
                    <Reference>https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout</Reference>
                </Title>
                <Author>Wikipedians</Author>
                <Subject>Style guide which presents the typical layout of Wikipedia articles</Subject>
                <Menu>
                    <Summary>45 languages</Summary>
                    <Paragraph>
                        <BookLink>[العربية](https://ar.wikipedia.org/wiki/%D9%88%D9%8A%D9%83%D9%8A%D8%A8%D9%8A%D8%AF%D9%8A%D8%A7:%D8%AF%D9%84%D9%8A%D9%84_%D8%A7%D9%84%D8%A3%D8%B3%D9%84%D9%88%D8%A8/%D8%AA%D9%86%D8%B8%D9%8A%D9%85_%D8%A7%D9%84%D9%85%D9%82%D8%A7%D9%84%D8%A9)</BookLink>
                        <BookLink>[مصرى](https://arz.wikipedia.org/wiki/%D9%88%D9%8A%D9%83%D9%8A%D8%A8%D9%8A%D8%AF%D9%8A%D8%A7:%D8%B7%D8%B1%D9%8A%D9%82%D8%A9_%D8%A7%D9%84%D9%83%D8%AA%D8%A7%D8%A8%D9%87/%D8%AA%D9%86%D8%B8%D9%8A%D9%85_%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D9%87)</BookLink>
                        <BookLink>[অসমীয়া](https://as.wikipedia.org/wiki/%E0%A7%B1%E0%A6%BF%E0%A6%95%E0%A6%BF%E0%A6%AA%E0%A6%BF%E0%A6%A1%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE:%E0%A7%B0%E0%A6%9A%E0%A6%A8%E0%A6%BE%E0%A6%B6%E0%A7%88%E0%A6%B2%E0%A7%80%E0%A7%B0_%E0%A6%B9%E0%A6%BE%E0%A6%A4%E0%A6%AA%E0%A7%81%E0%A6%A5%E0%A6%BF_%28%E0%A6%B8%E0%A6%9C%E0%A7%8D%E0%A6%9C%E0%A6%BE%29)</BookLink>
                        <BookLink>[বাংলা](https://bn.wikipedia.org/wiki/%E0%A6%89%E0%A6%87%E0%A6%95%E0%A6%BF%E0%A6%AA%E0%A6%BF%E0%A6%A1%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE:%E0%A6%B0%E0%A6%9A%E0%A6%A8%E0%A6%BE%E0%A6%B6%E0%A7%88%E0%A6%B2%E0%A7%80_%E0%A6%A8%E0%A6%BF%E0%A6%B0%E0%A7%8D%E0%A6%A6%E0%A7%87%E0%A6%B6%E0%A6%A8%E0%A6%BE/%E0%A6%AC%E0%A6%BF%E0%A6%A8%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B8)</BookLink>
                        <BookLink>[Català](https://ca.wikipedia.org/wiki/Viquip%C3%A8dia:Estructura_d%27un_article)</BookLink>
                        <BookLink>[کوردی](https://ckb.wikipedia.org/wiki/%D9%88%DB%8C%DA%A9%DB%8C%D9%BE%DB%8C%D8%AF%DB%8C%D8%A7:%D8%B4%DB%8E%D9%88%D8%A7%D8%B2/%DA%95%DB%8E%DA%A9%D8%AE%D8%B3%D8%AA%D9%86%DB%8C_%D9%88%D8%AA%D8%A7%D8%B1)</BookLink>
                        <BookLink>[Deutsch](https://de.wikipedia.org/wiki/Wikipedia:Formatvorlage/Musterartikel)</BookLink>
                        <BookLink>[Ελληνικά](https://el.wikipedia.org/wiki/%CE%92%CE%B9%CE%BA%CE%B9%CF%80%CE%B1%CE%AF%CE%B4%CE%B5%CE%B9%CE%B1:%CE%95%CE%B3%CF%87%CE%B5%CE%B9%CF%81%CE%AF%CE%B4%CE%B9%CE%BF_%CE%BC%CE%BF%CF%81%CF%86%CE%AE%CF%82/%CE%94%CE%BF%CE%BC%CE%AE)</BookLink>
                        <BookLink>[Esperanto](https://eo.wikipedia.org/wiki/Vikipedio:Strukturo_de_artikolo)</BookLink>
                        <BookLink>[Español](https://es.wikipedia.org/wiki/Wikipedia:Estructura_de_un_art%C3%ADculo)</BookLink>
                        <BookLink>[Euskara](https://eu.wikipedia.org/wiki/Wikipedia:Artikuluen_formatua)</BookLink>
                        <BookLink>[فارسی](https://fa.wikipedia.org/wiki/%D9%88%DB%8C%DA%A9%DB%8C%E2%80%8C%D9%BE%D8%AF%DB%8C%D8%A7:%D8%B4%DB%8C%D9%88%D9%87%E2%80%8C%D9%86%D8%A7%D9%85%D9%87/%D8%B5%D9%81%D8%AD%D9%87%E2%80%8C%D8%A2%D8%B1%D8%A7%DB%8C%DB%8C)</BookLink>
                        <BookLink>[Suomi](https://fi.wikipedia.org/wiki/Ohje:Artikkelin_rakenne)</BookLink>
                        <BookLink>[Français](https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Conventions_de_plan)</BookLink>
                        <BookLink>[Galego](https://gl.wikipedia.org/wiki/Wikipedia:Modelo_b%C3%A1sico_de_artigo)</BookLink>
                        <BookLink>[עברית](https://he.wikipedia.org/wiki/%D7%95%D7%99%D7%A7%D7%99%D7%A4%D7%93%D7%99%D7%94:%D7%A2%D7%A8%D7%99%D7%9B%D7%94_%D7%98%D7%9B%D7%A0%D7%99%D7%AA)</BookLink>
                        <BookLink>[Hrvatski](https://hr.wikipedia.org/wiki/Wikipedija:Shema_%C4%8Dlanka)</BookLink>
                        <BookLink>[Magyar](https://hu.wikipedia.org/wiki/Wikip%C3%A9dia:Sz%C3%B3cikkek_fel%C3%A9p%C3%ADt%C3%A9se)</BookLink>
                        <BookLink>[Bahasa Indonesia](https://id.wikipedia.org/wiki/Wikipedia:Pedoman_gaya/Tata_letak)</BookLink>
                        <BookLink>[Italiano](https://it.wikipedia.org/wiki/Wikipedia:Modello_di_voce)</BookLink>
                        <BookLink>[日本語](https://ja.wikipedia.org/wiki/Wikipedia:%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E3%83%9E%E3%83%8B%E3%83%A5%E3%82%A2%E3%83%AB/%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88)</BookLink>
                        <BookLink>[한국어](https://ko.wikipedia.org/wiki/%EC%9C%84%ED%82%A4%EB%B0%B1%EA%B3%BC:%ED%8E%B8%EC%A7%91_%EC%A7%80%EC%B9%A8/%EB%AC%B8%EB%8B%A8_%EA%B5%AC%EC%84%B1)</BookLink>
                        <BookLink>[Latina](https://la.wikipedia.org/wiki/Vicipaedia:Structura_paginae)</BookLink>
                        <BookLink>[Lietuvių](https://lt.wikipedia.org/wiki/Vikipedija:Bendrasis_straipsnio_planas)</BookLink>
                        <BookLink>[Minangkabau](https://min.wikipedia.org/wiki/Wikipedia:Padoman_tata_latak)</BookLink>
                        <BookLink>[മലയാളം](https://ml.wikipedia.org/wiki/%E0%B4%B5%E0%B4%BF%E0%B4%95%E0%B5%8D%E0%B4%95%E0%B4%BF%E0%B4%AA%E0%B5%80%E0%B4%A1%E0%B4%BF%E0%B4%AF:%E0%B4%B5%E0%B4%BF%E0%B4%A8%E0%B5%8D%E0%B4%AF%E0%B4%BE%E0%B4%B8%E0%B4%82)</BookLink>
                        <BookLink>[Bahasa Melayu](https://ms.wikipedia.org/wiki/Wikipedia:Manual_gaya_penulisan/Reka_letak)</BookLink>
                        <BookLink>[မြန်မာဘာသာ](https://my.wikipedia.org/wiki/%E1%80%9D%E1%80%AE%E1%80%80%E1%80%AE%E1%80%95%E1%80%AE%E1%80%B8%E1%80%92%E1%80%AE%E1%80%B8%E1%80%9A%E1%80%AC%E1%80%B8:%E1%80%85%E1%80%90%E1%80%AD%E1%80%AF%E1%80%84%E1%80%BA%E1%80%9C%E1%80%BA%E1%80%9C%E1%80%80%E1%80%BA%E1%80%85%E1%80%BD%E1%80%B2/Layout)</BookLink>
                        <BookLink>[नेपाली](https://ne.wikipedia.org/wiki/%E0%A4%B5%E0%A4%BF%E0%A4%95%E0%A4%BF%E0%A4%AA%E0%A4%BF%E0%A4%A1%E0%A4%BF%E0%A4%AF%E0%A4%BE:%E0%A4%B2%E0%A5%87%E0%A4%96%E0%A4%A8_%E0%A4%B6%E0%A5%88%E0%A4%B2%E0%A5%80/%E0%A4%B2%E0%A5%87%E0%A4%86%E0%A4%89%E0%A4%9F)</BookLink>
                        <BookLink>[Nederlands](https://nl.wikipedia.org/wiki/Help:Tekstopmaak)</BookLink>
                        <BookLink>[Norsk bokmål](https://no.wikipedia.org/wiki/Wikipedia:Oppsettsveiledning)</BookLink>
                        <BookLink>[Polski](https://pl.wikipedia.org/wiki/Wikipedia:Standardy_artyku%C5%82%C3%B3w/standard_og%C3%B3lny)</BookLink>
                        <BookLink>[Русиньскый](https://rue.wikipedia.org/wiki/%D0%92%D1%96%D0%BA%D1%96%D0%BF%D0%B5%D0%B4%D1%96%D1%8F:%D0%92%D0%B7%D0%B3%D0%BB%D1%8F%D0%B4_%D1%96_%D1%88%D1%82%D1%96%D0%BB)</BookLink>
                        <BookLink>[سنڌي](https://sd.wikipedia.org/wiki/%D9%88%DA%AA%D9%8A%D9%BE%D9%8A%DA%8A%D9%8A%D8%A7:%D9%86%D9%85%D9%88%D9%86%D9%88_%D8%AC%D9%88_%DA%AA%D8%AA%D8%A7%D8%A8%DA%99%D9%88/_%D9%84%D9%8A_%D8%A2%D8%A6%D9%88%D9%BD)</BookLink>
                        <BookLink>[Simple English](https://simple.wikipedia.org/wiki/Wikipedia:Guide_to_layout)</BookLink>
                        <BookLink>[Slovenščina](https://sl.wikipedia.org/wiki/Wikipedija:Slogovni_priro%C4%8Dnik/Postavitev)</BookLink>
                        <BookLink>[Svenska](https://sv.wikipedia.org/wiki/Wikipedia:Disposition)</BookLink>
                        <BookLink>[ꠍꠤꠟꠐꠤ](https://syl.wikipedia.org/wiki/%EA%A0%83%EA%A0%81%EA%A0%87%EA%A0%A4%EA%A0%99%EA%A0%A4%EA%A0%92%EA%A0%A4%EA%A0%80:%EA%A0%99%EA%A0%A3%EA%A0%94%EA%A0%A3%EA%A0%9E_%EA%A0%81%EA%A0%A1%EA%A0%86%EA%A0%90%EA%A0%A3%EA%A0%81%EA%A0%9F)</BookLink>
                        <BookLink>[தமிழ்](https://ta.wikipedia.org/wiki/%E0%AE%B5%E0%AE%BF%E0%AE%95%E0%AF%8D%E0%AE%95%E0%AE%BF%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AF%80%E0%AE%9F%E0%AE%BF%E0%AE%AF%E0%AE%BE:%E0%AE%AA%E0%AE%95%E0%AF%8D%E0%AE%95_%E0%AE%B5%E0%AE%9F%E0%AE%BF%E0%AE%B5%E0%AE%AE%E0%AF%88%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AF%81_%E0%AE%95%E0%AF%88%E0%AE%AF%E0%AF%87%E0%AE%9F%E0%AF%81)</BookLink>
                        <BookLink>[తెలుగు](https://te.wikipedia.org/wiki/%E0%B0%B5%E0%B0%BF%E0%B0%95%E0%B1%80%E0%B0%AA%E0%B1%80%E0%B0%A1%E0%B0%BF%E0%B0%AF%E0%B0%BE:%E0%B0%B2%E0%B1%87%E0%B0%85%E0%B0%B5%E0%B1%81%E0%B0%9F%E0%B1%8D)</BookLink>
                        <BookLink>[ไทย](https://th.wikipedia.org/wiki/%E0%B8%A7%E0%B8%B4%E0%B8%81%E0%B8%B4%E0%B8%9E%E0%B8%B5%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2:%E0%B8%84%E0%B8%B9%E0%B9%88%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%99/%E0%B8%9C%E0%B8%B1%E0%B8%87)</BookLink>
                        <BookLink>[Türkçe](https://tr.wikipedia.org/wiki/Vikipedi:Bi%C3%A7em_el_kitab%C4%B1/D%C3%BCzen)</BookLink>
                        <BookLink>[Українська](https://uk.wikipedia.org/wiki/%D0%92%D1%96%D0%BA%D1%96%D0%BF%D0%B5%D0%B4%D1%96%D1%8F:%D0%A1%D1%82%D0%B8%D0%BB%D1%8C/%D0%A1%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0_%D1%81%D1%82%D0%B0%D1%82%D1%82%D1%96)</BookLink>
                        <BookLink>[Tiếng Việt](https://vi.wikipedia.org/wiki/Wikipedia:C%E1%BA%A9m_nang_bi%C3%AAn_so%E1%BA%A1n/B%E1%BB%91_c%E1%BB%A5c)</BookLink>
                        <BookLink>[中文](https://zh.wikipedia.org/wiki/Wikipedia:%E6%A0%BC%E5%BC%8F%E6%89%8B%E5%86%8A/%E7%89%88%E9%9D%A2%E4%BD%88%E5%B1%80)</BookLink>
                    </Paragraph>
                </Menu>
                <Toolbar>
                    <Heading>Wikipedia:Manual of Style/Layout</Heading>
                    <Paragraph>
                        <BookLink>[Project page](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout)</BookLink>
                        <BookLink>[Talk](https://en.wikipedia.org/wiki/Wikipedia_talk:Manual_of_Style/Layout)</BookLink>
                    </Paragraph>
                    <Paragraph>
                        <BookLink>[Read](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout)</BookLink>
                        <BookLink>[View source](https://en.wikipedia.org/w/index.php?title=Wikipedia:Manual_of_Style/Layout&action=edit)</BookLink>
                        <BookLink>[View history](https://en.wikipedia.org/w/index.php?title=Wikipedia:Manual_of_Style/Layout&action=history)</BookLink>
                    </Paragraph>
                    <Menu>
                        <Summary><Description>Tools</Description></Summary>
                        <Heading>Actions</Heading>
                        <Option><BookLink>[Read](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout)</BookLink></Option>
                        <Option><BookLink>[View source](https://en.wikipedia.org/w/index.php?title=Wikipedia:Manual_of_Style/Layout&action=edit)</BookLink></Option>
                        <Option><BookLink>[View history](https://en.wikipedia.org/w/index.php?title=Wikipedia:Manual_of_Style/Layout&action=history)</BookLink></Option>
                        <Heading>General</Heading>
                        <Option><BookLink>[What links here](https://en.wikipedia.org/wiki/Special:WhatLinksHere/Wikipedia:Manual_of_Style/Layout)</BookLink></Option>
                        <Option><BookLink>[Related changes](https://en.wikipedia.org/wiki/Special:RecentChangesLinked/Wikipedia:Manual_of_Style/Layout)</BookLink></Option>
                        <Option><BookLink>[Upload file](https://en.wikipedia.org/wiki/Wikipedia:File_Upload_Wizard)</BookLink></Option>
                        <Option><BookLink>[Permanent link](https://en.wikipedia.org/w/index.php?title=Wikipedia:Manual_of_Style/Layout&oldid=1373392655)</BookLink></Option>
                        <Option><BookLink>[Page information](https://en.wikipedia.org/w/index.php?title=Wikipedia:Manual_of_Style/Layout&action=info)</BookLink></Option>
                        <Option><BookLink>[Get shortened URL](https://en.wikipedia.org/w/index.php?title=Special:UrlShortener&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FWikipedia%3AManual_of_Style%2FLayout)</BookLink></Option>
                        <Option><BookLink>[Switch to legacy parser](https://en.wikipedia.org/w/index.php?title=Wikipedia:Manual_of_Style/Layout&useparsoid=0)</BookLink></Option>
                        <Option><BookLink>[Expand all](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#)</BookLink></Option>
                        <Option><OutwardLink>[Edit interlanguage links](https://www.wikidata.org/wiki/Special:EntityPage/Q4663958#sitelinks-wikipedia)</OutwardLink></Option>
                        <Heading>Print/export</Heading>
                        <Option><BookLink>[Download as PDF](https://en.wikipedia.org/w/index.php?title=Special:DownloadAsPdf&page=Wikipedia%3AManual_of_Style%2FLayout&action=show-download-screen)</BookLink></Option>
                        <Option><BookLink>[Printable version](https://en.wikipedia.org/w/index.php?title=Wikipedia:Manual_of_Style/Layout&printable=yes)</BookLink></Option>
                        <Heading>In other projects</Heading>
                        <Option><OutwardLink>[Wikimedia Commons](https://commons.wikimedia.org/wiki/Commons:Guide_to_layout)</OutwardLink></Option>
                        <Option><OutwardLink>[Wikiquote](https://en.wikiquote.org/wiki/Wikiquote:Guide_to_layout)</OutwardLink></Option>
                        <Option><OutwardLink>[Wikidata item](https://www.wikidata.org/wiki/Special:EntityPage/Q4663958)</OutwardLink></Option>
                    </Menu>
                </Toolbar>
            </Cover>
        );
    }
}
