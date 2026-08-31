import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Paragraph } from '@/writing/Paragraph';
import { Sentence } from '@/writing/Sentence';
import { Word } from '@/writing/Word';

// A paragraph is written as sentences.
export class $SentencesSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Paragraph>
                <Sentence>
                    <Word>A</Word>
                    <Word>paragraph</Word>
                    <Word>is</Word>
                    <Word>written</Word>
                    <Word>as</Word>
                    <Word>sentences</Word>
                </Sentence>
                <Sentence>
                    <Word>Each</Word>
                    <Word>one</Word>
                    <Word>stops</Word>
                    <Word>once</Word>
                </Sentence>
            </Paragraph>
        );
    }
}

export const SentencesSpec = $($SentencesSpec);
