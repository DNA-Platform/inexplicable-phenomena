import React from 'react';
import { $, $Chemical } from '@/index';
import {
    PostCard, PostTitle, PostBody, LikeRow, HeartButton, LikeCount,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $LikeButton extends $Chemical {
    $post?: $Post;
    like() { if (this.$post) this.$post.likes++; }
    view() {
        const liked = (this.$post?.likes ?? 0) > 0;
        return (
            <LikeRow>
                <HeartButton $liked={liked} onClick={this.like}>♥</HeartButton>
                <LikeCount>{this.$post?.likes ?? 0}</LikeCount>
            </LikeRow>
        );
    }
}

class $Post extends $Chemical {
    likes = 0;
    view() {
        const liked = this.likes > 0;
        return (
            <>
                <PostCard>
                    <PostTitle>Reactive by Nature</PostTitle>
                    <PostBody>
                        Two chemicals compose via props. The LikeButton receives a
                        reference to this Post and writes this.$post.likes++ directly.
                    </PostBody>
                    <LikeButton post={this} />
                </PostCard>
                <VerdictSection>
                    <VerdictRow $state={liked ? 'pass' : 'pending'}>
                        <VerdictDot $state={liked ? 'pass' : 'pending'} />
                        {liked
                            ? `✓ LikeButton wrote Post.$likes — now ${this.likes}`
                            : '○ click ♥ to like the post'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const LikeButton = $($LikeButton);
const Post = $($Post);

export default function Case1Demo() {
    return <Post />;
}
