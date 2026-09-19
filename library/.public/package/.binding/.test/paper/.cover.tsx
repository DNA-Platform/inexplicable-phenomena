import { $Chapter, Author, Cover, Subject, Title } from '@dna-platform/public';

export default class $Cover extends $Chapter {
    print() {
        return (
            <Cover>
                <Title>[[ A Paper ]]</Title>
                <Author>*[[ A Persona ]]</Author>
                <Subject>**[[ The Library ]]</Subject>
            </Cover>
        );
    }
}
