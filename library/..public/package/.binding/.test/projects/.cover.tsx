import { $Chapter, Author, Cover, Subject, Title } from '@dna-platform/public';

export default class $Cover extends $Chapter {
    print() {
        return (
            <Cover>
                <Title>[[ Some Projects ]]</Title>
                <Author>*[[ The Log ]]</Author>
                <Subject>**[[ shelved under the library ]]( The Library )</Subject>
            </Cover>
        );
    }
}
