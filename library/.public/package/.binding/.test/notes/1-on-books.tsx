import { Chapter, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Title>[[ О книгах ]]</Title>
        <Section>
            <Heading>Что такое книга</Heading>
            <Paragraph>
                Книга в этой библиотеке есть папка: обложка, краткое содержание, оглавление и главы, каждая глава
                файл. Эту книгу написала <Means>$[[ Libby ]]</Means>, и она стоит в каталоге библиотеки рядом
                с <Means>$[[ её собственной ]]( Libby / Synopsis )</Means>.
            </Paragraph>
            <Paragraph>
                Её заглавие, заглавие этой главы и заголовок выше написаны кириллицей, и адреса, которые
                переплётчик пишет для них, тоже: адрес книги есть её заглавие, строчными буквами, слова через
                дефис, в каком бы алфавите оно ни было.
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
