import { $Chapter, Author, Cover, Subject, Title } from '@dna-platform/public';

export default class $Cover extends $Chapter {
    print() {
        return (
            <Cover>
                <Title>[[ The Library ]]</Title>
                <Author>*[[ Written by the Log ]]( The Log )</Author>
                <Subject>**[[ The Library ]]</Subject>
            </Cover>
        );
    }
}
