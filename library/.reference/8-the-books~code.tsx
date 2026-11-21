import { ReactNode } from 'react';
import { $, $check, selection } from '@dna-platform/chemistry';
import { $Annotation, $Chapter, $Writing, AnnotationSpecification, specify } from '@dna-platform/public';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const written = (at: string): string => {
    const [year, month, day] = at.split('-');
    const name = months[Number(month) - 1];
    return name === undefined || day === undefined ? at : `${Number(day)} ${name} ${year}`;
};

// A POST IS A BLOG POST. Doug, 2026-11-21, when this was hedged at him as a styling question: "But literally it
// will be on the web, with a link, writing my thoughts about a topic. It is MORE real as a blog post than anything
// else." He is right and the hedge was the error. A book in this library is a metaphor for a thing made of paper
// and a conversation is a transcript of something that already happened; a post is the thing itself, published at
// an address, read by whoever follows the link. So it is built as what it is rather than as a chapter pretending.
//
// It is still said of a chapter, because that is how every special chapter here works — a base chapter wearing a
// word, The Book's 1.4, as a cover and a table of contents are. What being a post changes:
//   - the chapter is not counted. A book numbers its chapters because a reader wants to know where they are in it;
//     a reader arriving at a post from a link is not anywhere in anything, and "Chapter 1" over a post was wrong.
//   - the post carries its date, which is what a post has and a chapter does not. It draws where it is written,
//     under the title, in a time element the machine can read, so the page says when the thought was had.
// PROXY name.
export class $Post extends $Annotation {
    specification = new PostSpecification();
    $at = '';
    time = selection.time.attrs({ className: 'pa-dateline' })``;

    override note(): ReactNode {
        if (this.$at === '') return null;
        const Time = this.time;
        return <Time dateTime={this.$at}>{written(this.$at)}</Time>;
    }

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-post'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class PostSpecification extends AnnotationSpecification {
    @specify('a post is said of a chapter')
    $saidOfAChapter(writing: $Writing): void {
        $check(writing instanceof $Chapter, 'a post is said of a chapter, and this is not one');
    }

    @specify('a post carries the day it was published')
    $carriesItsDay(writing: $Writing): void {
        $check(writing.annotations.find($Post).every(post => !Number.isNaN(Date.parse(post.$at))),
            'a post carries the day it was published, and this one carries no day a machine can read');
    }
}

export const Post = $($Post);
