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
                        <BookLink>[Create account](https://en.wikipedia.org/w/index.php?title=Special:CreateAccount&returnto=Alan+Turing)</BookLink>
                        <BookLink>[Log in](https://en.wikipedia.org/w/index.php?title=Special:UserLogin&returnto=Alan+Turing)</BookLink>
                    </Paragraph>
                </Header>
                <Title>
                    Alan Turing
                    <Reference>https://en.wikipedia.org/wiki/Alan_Turing</Reference>
                </Title>
                <Author>Wikipedians</Author>
                <Subject>English computer scientist (1912–1954)</Subject>
                <Menu>
                    <Summary>162 languages</Summary>
                    <Paragraph>
                        <BookLink>[Адыгабзэ](https://ady.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BD_%D0%A2%D1%8C%D1%8E%D1%80%D0%B8%D0%BD%D0%B3)</BookLink>
                        <BookLink>[Afrikaans](https://af.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Alemannisch](https://als.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Aragonés](https://an.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[العربية](https://ar.wikipedia.org/wiki/%D8%A2%D9%84%D8%A7%D9%86_%D8%AA%D9%88%D8%B1%D9%86%D8%BA)</BookLink>
                        <BookLink>[مصرى](https://arz.wikipedia.org/wiki/%D8%A7%D9%84%D8%A7%D9%86_%D8%AA%D9%88%D8%B1%D9%8A%D9%86%D8%AC)</BookLink>
                        <BookLink>[অসমীয়া](https://as.wikipedia.org/wiki/%E0%A6%8F%E0%A6%B2%E0%A6%BE%E0%A6%A8_%E0%A6%9F%E0%A7%8D%E0%A6%AF%E0%A7%81%E0%A7%B0%E0%A6%BF%E0%A6%82)</BookLink>
                        <BookLink>[Asturianu](https://ast.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Azərbaycanca](https://az.wikipedia.org/wiki/Alan_T%C3%BCrinq)</BookLink>
                        <BookLink>[تۆرکجه](https://azb.wikipedia.org/wiki/%D8%A2%D9%84%D9%86_%D8%AA%D9%88%D8%B1%DB%8C%D9%86%D9%82)</BookLink>
                        <BookLink>[Башҡортса](https://ba.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BD_%D0%A2%D1%8C%D1%8E%D1%80%D0%B8%D0%BD%D0%B3)</BookLink>
                        <BookLink>[Basa Bali](https://ban.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Žemaitėška](https://bat-smg.wikipedia.org/wiki/Alans_Tior%C4%97ngs)</BookLink>
                        <BookLink>[Bikol Central](https://bcl.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Беларуская тарашкевіца](https://be-tarask.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BD_%D0%A2%E2%80%99%D1%8E%D1%80%D1%8B%D0%BD%D0%B3)</BookLink>
                        <BookLink>[Беларуская](https://be.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BD_%D0%9C%D1%8D%D1%82%D1%8B%D1%81%D0%B0%D0%BD_%D0%A6%D1%8C%D1%8E%D1%80%D1%8B%D0%BD%D0%B3)</BookLink>
                        <BookLink>[Български](https://bg.wikipedia.org/wiki/%D0%90%D0%BB%D1%8A%D0%BD_%D0%A2%D1%8E%D1%80%D0%B8%D0%BD%D0%B3)</BookLink>
                        <BookLink>[भोजपुरी](https://bh.wikipedia.org/wiki/%E0%A4%8F%E0%A4%B2%E0%A4%A8_%E0%A4%9F%E0%A5%8D%E0%A4%AF%E0%A5%82%E0%A4%B0%E0%A4%BF%E0%A4%82%E0%A4%97)</BookLink>
                        <BookLink>[বাংলা](https://bn.wikipedia.org/wiki/%E0%A6%85%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%A8_%E0%A6%9F%E0%A7%81%E0%A6%B0%E0%A6%BF%E0%A6%82)</BookLink>
                        <BookLink>[Brezhoneg](https://br.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Bosanski](https://bs.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Batak Mandailing](https://btm.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Буряад](https://bxr.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BD_%D0%A2%D1%8E%D1%80%D0%B8%D0%BD%D0%B3)</BookLink>
                        <BookLink>[Català](https://ca.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Нохчийн](https://ce.wikipedia.org/wiki/%D0%A2%D1%8C%D1%8E%D1%80%D0%B8%D0%BD%D0%B3,_%D0%90%D0%BB%D0%B0%D0%BD)</BookLink>
                        <BookLink>[کوردی](https://ckb.wikipedia.org/wiki/%D8%A6%DB%95%D9%84%D9%86_%D8%AA%DB%8C%D9%88%D8%B1%DB%8C%D9%86%DA%AF)</BookLink>
                        <BookLink>[Corsu](https://co.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Qırımtatarca](https://crh.wikipedia.org/wiki/Alan_T%C3%BCring)</BookLink>
                        <BookLink>[Čeština](https://cs.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Чӑвашла](https://cv.wikipedia.org/wiki/%D0%A2%D1%8C%D1%8E%D1%80%D0%B8%D0%BD%D0%B3,_%D0%90%D0%BB%D0%B0%D0%BD)</BookLink>
                        <BookLink>[Cymraeg](https://cy.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Dansk](https://da.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Deutsch](https://de.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Zazaki](https://diq.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Ελληνικά](https://el.wikipedia.org/wiki/%CE%86%CE%BB%CE%B1%CE%BD_%CE%A4%CE%BF%CF%8D%CF%81%CE%B9%CE%BD%CE%B3%CE%BA)</BookLink>
                        <BookLink>[Esperanto](https://eo.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Español](https://es.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Eesti](https://et.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Euskara](https://eu.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[فارسی](https://fa.wikipedia.org/wiki/%D8%A2%D9%84%D9%86_%D8%AA%D9%88%D8%B1%DB%8C%D9%86%DA%AF)</BookLink>
                        <BookLink>[Suomi](https://fi.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Føroyskt](https://fo.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Français](https://fr.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Nordfriisk](https://frr.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Furlan](https://fur.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Frysk](https://fy.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Gaeilge](https://ga.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[贛語](https://gan.wikipedia.org/wiki/%E5%9C%96%E9%9D%88)</BookLink>
                        <BookLink>[Kriyòl gwiyannen](https://gcr.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Gàidhlig](https://gd.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Galego](https://gl.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Avañe'ẽ](https://gn.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[ગુજરાતી](https://gu.wikipedia.org/wiki/%E0%AA%8D%E0%AA%B2%E0%AA%A8_%E0%AA%9F%E0%AB%8D%E0%AA%AF%E0%AB%81%E0%AA%B0%E0%AA%BF%E0%AA%82%E0%AA%97)</BookLink>
                        <BookLink>[Hausa](https://ha.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[עברית](https://he.wikipedia.org/wiki/%D7%90%D7%9C%D7%9F_%D7%98%D7%99%D7%95%D7%A8%D7%99%D7%A0%D7%92)</BookLink>
                        <BookLink>[हिन्दी](https://hi.wikipedia.org/wiki/%E0%A4%8F%E0%A4%B2%E0%A5%87%E0%A4%A8_%E0%A4%9F%E0%A5%8D%E0%A4%AF%E0%A5%82%E0%A4%B0%E0%A4%BF%E0%A4%82%E0%A4%97)</BookLink>
                        <BookLink>[Fiji Hindi](https://hif.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Hrvatski](https://hr.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Kreyòl ayisyen](https://ht.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Magyar](https://hu.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Հայերեն](https://hy.wikipedia.org/wiki/%D4%B1%D5%AC%D5%A1%D5%B6_%D4%B9%D5%B5%D5%B8%D6%82%D6%80%D5%AB%D5%B6%D5%A3)</BookLink>
                        <BookLink>[Արեւմտահայերէն](https://hyw.wikipedia.org/wiki/%D4%B1%D5%AC%D5%A1%D5%B6_%D4%B9%D5%AB%D6%82%D6%80%D5%AB%D5%B6%D5%AF)</BookLink>
                        <BookLink>[Interlingua](https://ia.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Jaku Iban](https://iba.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Bahasa Indonesia](https://id.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Igbo](https://ig.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Ilokano](https://ilo.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Ido](https://io.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Íslenska](https://is.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Italiano](https://it.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[日本語](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%A9%E3%83%B3%E3%83%BB%E3%83%81%E3%83%A5%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0)</BookLink>
                        <BookLink>[Patois](https://jam.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[La .lojban.](https://jbo.wikipedia.org/wiki/.alan.turin.)</BookLink>
                        <BookLink>[Jawa](https://jv.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[ქართული](https://ka.wikipedia.org/wiki/%E1%83%90%E1%83%9A%E1%83%90%E1%83%9C_%E1%83%A2%E1%83%98%E1%83%A3%E1%83%A0%E1%83%98%E1%83%9C%E1%83%92%E1%83%98)</BookLink>
                        <BookLink>[Qaraqalpaqsha](https://kaa.wikipedia.org/wiki/Alan_Tyuring)</BookLink>
                        <BookLink>[Kabɩyɛ](https://kbp.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Қазақша](https://kk.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BD_%D0%A2%D1%8C%D1%8E%D1%80%D0%B8%D0%BD%D0%B3)</BookLink>
                        <BookLink>[ភាសាខ្មែរ](https://km.wikipedia.org/wiki/%E1%9E%A2%E1%9E%B6%E1%9E%A1%E1%9E%B6%E1%9E%93_%E1%9E%92%E1%9E%BD%E1%9E%9A%E1%9E%B8%E1%9E%84)</BookLink>
                        <BookLink>[ಕನ್ನಡ](https://kn.wikipedia.org/wiki/%E0%B2%85%E0%B2%B2%E0%B3%86%E0%B2%A8%E0%B3%8D_%E0%B2%9F%E0%B3%8D%E0%B2%AF%E0%B3%82%E0%B2%B0%E0%B2%BF%E0%B2%82%E0%B2%97%E0%B3%8D)</BookLink>
                        <BookLink>[Yerwa Kanuri](https://knc.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[한국어](https://ko.wikipedia.org/wiki/%EC%95%A8%EB%9F%B0_%ED%8A%9C%EB%A7%81)</BookLink>
                        <BookLink>[Kurdî](https://ku.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Kernowek](https://kw.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Кыргызча](https://ky.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BD_%D0%A2%D1%8C%D1%8E%D1%80%D0%B8%D0%BD%D0%B3)</BookLink>
                        <BookLink>[Latina](https://la.wikipedia.org/wiki/Alanus_Mathison_Turing)</BookLink>
                        <BookLink>[Lëtzebuergesch](https://lb.wikipedia.org/wiki/Alan_M._Turing)</BookLink>
                        <BookLink>[Limburgs](https://li.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Ligure](https://lij.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Lombard](https://lmo.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Lietuvių](https://lt.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Latviešu](https://lv.wikipedia.org/wiki/Alans_Tj%C5%ABrings)</BookLink>
                        <BookLink>[Madhurâ](https://mad.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[मैथिली](https://mai.wikipedia.org/wiki/%E0%A4%8F%E0%A4%B2%E0%A5%87%E0%A4%A8_%E0%A4%9F%E0%A5%8D%E0%A4%AF%E0%A5%81%E0%A4%B0%E0%A4%BF%E0%A4%99)</BookLink>
                        <BookLink>[Malagasy](https://mg.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Македонски](https://mk.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BD_%D0%A2%D1%98%D1%83%D1%80%D0%B8%D0%BD%D0%B3)</BookLink>
                        <BookLink>[മലയാളം](https://ml.wikipedia.org/wiki/%E0%B4%85%E0%B4%B2%E0%B5%BB_%E0%B4%9F%E0%B5%8D%E0%B4%AF%E0%B5%82%E0%B4%B1%E0%B4%BF%E0%B4%82%E0%B4%97%E0%B5%8D)</BookLink>
                        <BookLink>[Монгол](https://mn.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BD_%D0%9C%D0%B0%D1%82%D0%B8%D1%81%D0%BE%D0%BD_%D0%A2%D1%8E%D1%80%D0%B8%D0%BD%D0%B3)</BookLink>
                        <BookLink>[मराठी](https://mr.wikipedia.org/wiki/%E0%A5%B2%E0%A4%B2%E0%A4%A8_%E0%A4%9F%E0%A5%8D%E0%A4%AF%E0%A5%81%E0%A4%B0%E0%A4%BF%E0%A4%82%E0%A4%97)</BookLink>
                        <BookLink>[Bahasa Melayu](https://ms.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Malti](https://mt.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Mirandés](https://mwl.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[မြန်မာဘာသာ](https://my.wikipedia.org/wiki/%E1%80%A1%E1%80%9C%E1%80%94%E1%80%BA_%E1%80%80%E1%80%BB%E1%80%B0%E1%80%B8%E1%80%9B%E1%80%84%E1%80%BA%E1%80%B8)</BookLink>
                        <BookLink>[مازِرونی](https://mzn.wikipedia.org/wiki/%D8%A2%D9%84%D9%86_%D8%AA%D9%88%D8%B1%DB%8C%D9%86%DA%AF)</BookLink>
                        <BookLink>[Plattdüütsch](https://nds.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[नेपाल भाषा](https://new.wikipedia.org/wiki/%E0%A4%8F%E0%A4%B2%E0%A5%87%E0%A4%A8_%E0%A4%A4%E0%A5%8D%E0%A4%AF%E0%A5%81%E0%A4%B0%E0%A4%BF%E0%A4%99%E0%A5%8D%E0%A4%97)</BookLink>
                        <BookLink>[Nederlands](https://nl.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Norsk nynorsk](https://nn.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Norsk bokmål](https://no.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Occitan](https://oc.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Livvinkarjala](https://olo.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[ଓଡ଼ିଆ](https://or.wikipedia.org/wiki/%E0%AC%86%E0%AC%B2%E0%AC%BE%E0%AC%A8_%E0%AC%9F%E0%AD%8D%E0%AD%9F%E0%AD%81%E0%AC%B0%E0%AC%BF%E0%AC%99%E0%AD%8D%E0%AC%97)</BookLink>
                        <BookLink>[Ирон](https://os.wikipedia.org/wiki/%D0%A2%D1%8C%D1%8E%D1%80%D0%B8%D0%BD%D0%B3,_%D0%90%D0%BB%D0%B0%D0%BD)</BookLink>
                        <BookLink>[ਪੰਜਾਬੀ](https://pa.wikipedia.org/wiki/%E0%A8%85%E0%A8%B2%E0%A8%BE%E0%A8%A8_%E0%A8%9F%E0%A9%82%E0%A8%B0%E0%A8%BF%E0%A9%B0%E0%A8%97)</BookLink>
                        <BookLink>[Kapampangan](https://pam.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Polski](https://pl.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Piemontèis](https://pms.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[پنجابی](https://pnb.wikipedia.org/wiki/%D8%A7%D9%84%D8%A7%D9%86_%D9%B9%D9%88%D8%B1%D9%86%DA%AF)</BookLink>
                        <BookLink>[پښتو](https://ps.wikipedia.org/wiki/%D8%A2%D9%84%D9%86_%D9%BC%D9%88%D8%B1%DB%8C%D9%86%DA%AB)</BookLink>
                        <BookLink>[Português](https://pt.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Română](https://ro.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Русский](https://ru.wikipedia.org/wiki/%D0%A2%D1%8C%D1%8E%D1%80%D0%B8%D0%BD%D0%B3,_%D0%90%D0%BB%D0%B0%D0%BD)</BookLink>
                        <BookLink>[Русиньскый](https://rue.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BD_%D0%A2%D1%8E%D1%80%D1%96%D0%BD%D2%91)</BookLink>
                        <BookLink>[संस्कृतम्](https://sa.wikipedia.org/wiki/%E0%A4%8F%E0%A4%B2%E0%A5%87%E0%A4%A8_%E0%A4%9F%E0%A5%8D%E0%A4%AF%E0%A5%82%E0%A4%B0%E0%A4%BF%E0%A4%82%E0%A4%97)</BookLink>
                        <BookLink>[Саха тыла](https://sah.wikipedia.org/wiki/%D0%A2%D1%8C%D1%8E%D1%80%D0%B8%D0%BD%D0%B3_%D0%90%D0%BB%D0%B0%D0%BD_%D0%9C%D0%B0%D1%82%D0%B8%D1%81%D0%BE%D0%BD)</BookLink>
                        <BookLink>[ᱥᱟᱱᱛᱟᱲᱤ](https://sat.wikipedia.org/wiki/%E1%B1%9F%E1%B1%9E%E1%B1%9F%E1%B1%B1_%E1%B1%B4%E1%B1%AD%E1%B1%A9%E1%B1%A8%E1%B1%A4%E1%B1%9D)</BookLink>
                        <BookLink>[Sardu](https://sc.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Sicilianu](https://scn.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Scots](https://sco.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[سنڌي](https://sd.wikipedia.org/wiki/%D8%A7%D9%8A%D9%84%D9%86_%D9%BD%D9%8A%D9%88%D8%B1%D9%86%DA%AF)</BookLink>
                        <BookLink>[Srpskohrvatski / српскохрватски](https://sh.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[සිංහල](https://si.wikipedia.org/wiki/%E0%B6%87%E0%B6%BD%E0%B6%B1%E0%B7%8A_%E0%B6%A7%E0%B7%92%E0%B6%BA%E0%B7%94%E0%B6%BB%E0%B7%92%E0%B6%B1%E0%B7%8A)</BookLink>
                        <BookLink>[Simple English](https://simple.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Slovenčina](https://sk.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Slovenščina](https://sl.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Shqip](https://sq.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Српски / srpski](https://sr.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BD_%D0%A2%D1%98%D1%83%D1%80%D0%B8%D0%BD%D0%B3)</BookLink>
                        <BookLink>[Svenska](https://sv.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Kiswahili](https://sw.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[தமிழ்](https://ta.wikipedia.org/wiki/%E0%AE%85%E0%AE%B2%E0%AE%A9%E0%AF%8D_%E0%AE%9F%E0%AF%82%E0%AE%B0%E0%AE%BF%E0%AE%99%E0%AF%8D)</BookLink>
                        <BookLink>[తెలుగు](https://te.wikipedia.org/wiki/%E0%B0%85%E0%B0%B2%E0%B0%BE%E0%B0%A8%E0%B1%8D_%E0%B0%9F%E0%B1%8D%E0%B0%AF%E0%B1%82%E0%B0%B0%E0%B0%BF%E0%B0%82%E0%B0%97%E0%B1%8D)</BookLink>
                        <BookLink>[Тоҷикӣ](https://tg.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BD_%D0%A2%D1%8E%D1%80%D0%B8%D0%BD%D0%B3)</BookLink>
                        <BookLink>[ไทย](https://th.wikipedia.org/wiki/%E0%B9%81%E0%B8%AD%E0%B8%A5%E0%B8%B1%E0%B8%99_%E0%B8%97%E0%B8%B1%E0%B8%A7%E0%B8%A3%E0%B8%B4%E0%B8%87)</BookLink>
                        <BookLink>[Tagalog](https://tl.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Toki pona](https://tok.wikipedia.org/wiki/jan_Alan_Tuwin)</BookLink>
                        <BookLink>[Türkçe](https://tr.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Татарча / tatarça](https://tt.wikipedia.org/wiki/Alan_Tyuring)</BookLink>
                        <BookLink>[Українська](https://uk.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BD_%D0%A2%D1%8E%D1%80%D1%96%D0%BD%D0%B3)</BookLink>
                        <BookLink>[اردو](https://ur.wikipedia.org/wiki/%D8%A7%DB%8C%D9%84%D9%86_%D8%AA%D9%88%D8%B1%D9%86%DA%AF)</BookLink>
                        <BookLink>[Oʻzbekcha / ўзбекча](https://uz.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Vepsän kel’](https://vep.wikipedia.org/wiki/Tjuring_Alan)</BookLink>
                        <BookLink>[Tiếng Việt](https://vi.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Volapük](https://vo.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Winaray](https://war.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[吴语](https://wuu.wikipedia.org/wiki/%E5%9F%83%E4%BC%A6%C2%B7%E5%A6%A5%E7%81%B5)</BookLink>
                        <BookLink>[მარგალური](https://xmf.wikipedia.org/wiki/%E1%83%90%E1%83%9A%E1%83%90%E1%83%9C_%E1%83%A2%E1%83%98%E1%83%A3%E1%83%A0%E1%83%98%E1%83%9C%E1%83%92%E1%83%98)</BookLink>
                        <BookLink>[ייִדיש](https://yi.wikipedia.org/wiki/%D7%A2%D7%9C%D7%9F_%D7%98%D7%99%D7%95%D7%A8%D7%99%D7%A0%D7%92)</BookLink>
                        <BookLink>[Yorùbá](https://yo.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[文言](https://zh-classical.wikipedia.org/wiki/%E8%89%BE%E5%80%AB%E5%9C%96%E9%9D%88)</BookLink>
                        <BookLink>[閩南語 / Bân-lâm-gí](https://zh-min-nan.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[粵語](https://zh-yue.wikipedia.org/wiki/%E4%BA%9E%E5%80%AB%C2%B7%E5%9C%96%E9%9D%88)</BookLink>
                        <BookLink>[中文](https://zh.wikipedia.org/wiki/%E8%89%BE%E4%BC%A6%C2%B7%E5%9B%BE%E7%81%B5)</BookLink>
                    </Paragraph>
                </Menu>
                <Toolbar>
                    <Heading>Alan Turing</Heading>
                    <Paragraph>
                        <BookLink>[Article](https://en.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[Talk](https://en.wikipedia.org/wiki/Talk:Alan_Turing)</BookLink>
                    </Paragraph>
                    <Paragraph>
                        <BookLink>[Read](https://en.wikipedia.org/wiki/Alan_Turing)</BookLink>
                        <BookLink>[View source](https://en.wikipedia.org/w/index.php?title=Alan_Turing&action=edit)</BookLink>
                        <BookLink>[View history](https://en.wikipedia.org/w/index.php?title=Alan_Turing&action=history)</BookLink>
                    </Paragraph>
                    <Menu>
                        <Summary><Description>Tools</Description></Summary>
                        <Heading>Actions</Heading>
                        <Option><BookLink>[Read](https://en.wikipedia.org/wiki/Alan_Turing)</BookLink></Option>
                        <Option><BookLink>[View source](https://en.wikipedia.org/w/index.php?title=Alan_Turing&action=edit)</BookLink></Option>
                        <Option><BookLink>[View history](https://en.wikipedia.org/w/index.php?title=Alan_Turing&action=history)</BookLink></Option>
                        <Heading>General</Heading>
                        <Option><BookLink>[What links here](https://en.wikipedia.org/wiki/Special:WhatLinksHere/Alan_Turing)</BookLink></Option>
                        <Option><BookLink>[Related changes](https://en.wikipedia.org/wiki/Special:RecentChangesLinked/Alan_Turing)</BookLink></Option>
                        <Option><BookLink>[Upload file](https://en.wikipedia.org/wiki/Wikipedia:File_Upload_Wizard)</BookLink></Option>
                        <Option><BookLink>[Permanent link](https://en.wikipedia.org/w/index.php?title=Alan_Turing&oldid=1374322134)</BookLink></Option>
                        <Option><BookLink>[Page information](https://en.wikipedia.org/w/index.php?title=Alan_Turing&action=info)</BookLink></Option>
                        <Option><BookLink>[Cite this page](https://en.wikipedia.org/w/index.php?title=Special:CiteThisPage&page=Alan_Turing&id=1374322134&wpFormIdentifier=titleform)</BookLink></Option>
                        <Option><BookLink>[Get shortened URL](https://en.wikipedia.org/w/index.php?title=Special:UrlShortener&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FAlan_Turing)</BookLink></Option>
                        <Option><BookLink>[Switch to legacy parser](https://en.wikipedia.org/w/index.php?title=Alan_Turing&useparsoid=0)</BookLink></Option>
                        <Option><BookLink>[Expand all](https://en.wikipedia.org/wiki/Alan_Turing#)</BookLink></Option>
                        <Option><OutwardLink>[Edit interlanguage links](https://www.wikidata.org/wiki/Special:EntityPage/Q7251#sitelinks-wikipedia)</OutwardLink></Option>
                        <Heading>Print/export</Heading>
                        <Option><BookLink>[Download as PDF](https://en.wikipedia.org/w/index.php?title=Special:DownloadAsPdf&page=Alan_Turing&action=show-download-screen)</BookLink></Option>
                        <Option><BookLink>[Printable version](https://en.wikipedia.org/w/index.php?title=Alan_Turing&printable=yes)</BookLink></Option>
                        <Heading>In other projects</Heading>
                        <Option><BookLink>[Abstract Wikipedia](https://abstract.wikipedia.org/wiki/Q7251)</BookLink></Option>
                        <Option><OutwardLink>[Wikimedia Commons](https://commons.wikimedia.org/wiki/Alan_Turing)</OutwardLink></Option>
                        <Option><OutwardLink>[Wikinews](https://en.wikinews.org/wiki/Category:Alan_Turing)</OutwardLink></Option>
                        <Option><OutwardLink>[Wikiquote](https://en.wikiquote.org/wiki/Alan_Turing)</OutwardLink></Option>
                        <Option><OutwardLink>[Wikisource](https://en.wikisource.org/wiki/Author:Alan_Mathison_Turing)</OutwardLink></Option>
                        <Option><OutwardLink>[Wikidata item](https://www.wikidata.org/wiki/Special:EntityPage/Q7251)</OutwardLink></Option>
                    </Menu>
                </Toolbar>
            </Cover>
        );
    }
}
