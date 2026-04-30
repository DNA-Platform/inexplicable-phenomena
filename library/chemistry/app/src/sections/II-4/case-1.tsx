import React from 'react';
import { $, $Chemical } from '@/index';
import { LoaderFrame, LoadingText, DataList, DataItem, PhaseTag } from './case.styled';

class $AsyncLoader extends $Chemical {
    $phase = 'setup';
    $items: string[] = [];

    async effect() {
        this.$phase = 'waiting for mount';
        await this.next('mount');
        this.$phase = 'mounted — fetching';
        await new Promise(r => setTimeout(r, 1200));
        this.$items = ['Hydrogen', 'Helium', 'Lithium', 'Beryllium', 'Boron'];
        this.$phase = 'loaded';
    }

    view() {
        return (
            <LoaderFrame>
                <PhaseTag>{this.$phase}</PhaseTag>
                {this.$items.length === 0 ? (
                    <LoadingText>loading elements...</LoadingText>
                ) : (
                    <DataList>
                        {this.$items.map((el, i) => (
                            <DataItem key={i}>{el}</DataItem>
                        ))}
                    </DataList>
                )}
            </LoaderFrame>
        );
    }
}

const AsyncLoader = $($AsyncLoader);

export default function Case1Demo() {
    return <AsyncLoader />;
}
