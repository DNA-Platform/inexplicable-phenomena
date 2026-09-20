import { $Chapter, Author, Cover, Subject, Title } from '@dna-platform/public';

export default class $Cover extends $Chapter {
    print() {
        return (
            <Cover>
                <Title>[[ A Persona ]]</Title>
                <Author>*[[ The Log ]]</Author>
                <Subject>**[[ The Log ]]</Subject>
            </Cover>
        );
    }
}
