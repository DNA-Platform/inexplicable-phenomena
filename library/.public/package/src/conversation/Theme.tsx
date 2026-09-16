// CREATED 2026-09-16 · rating 1 · IN PROGRESS. THE CHAT DRESS — Doug: "we also need a theme that we
// will use if one installs the conversation theme… We need more than one theme I think for multiple
// use cases." This is the first of those: a conversation drawn the way Claude's own chat draws one.
//
// IT HOLDS RULES AND NOT VALUES, which is the trick $BoxFormat already uses — `get border() { return
// `1px solid ${this.theme.shade}` }` — and it is what lets one dialogue survive two dresses.
//
// ═══ IT CANNOT BE INSTALLED YET, AND THE REASON IS ONE LINE ═══════════════════════════════════
//
// A theme is drawn by `$Book.view()`, which fetches the sheet and wraps the subtree; nothing at
// DOCUMENT grade does that, so a theme registered for a dialogue would never be drawn. That half is
// cheap — the two lines move to the base and any kind that registers a theme draws one.
//
// The other half is not. `$Theme` declares `override get [theme]() { return this; }`, so a theme's
// own theme is ITSELF. Nested inside a library's theme, this one would ask for `paper` and be handed
// its own — and the rules below would have no values to read. A THEME MUST BE ABLE TO REACH THE
// THEME IT STANDS INSIDE, and until it can, this file is a scaffold rather than a dress.
//
// So there is deliberately NO `static $register` here. Registering it would draw nothing and look
// like it had been built. `$ConversationTheme` IS A PROXY NAME, flagged for Doug.
import { $, select } from '@dna-platform/chemistry';
import { $Theme } from '@/writing/Theme';

export class $ConversationTheme extends $Theme {
    // ─── WHAT IS DECIDED, because it does not depend on who spoke ────────────────────────────────

    // A CONVERSATION READS NARROWER THAN A PAGE. Measured off the screenshot Doug sent: the column
    // is roughly half the window, centred, with the exchanges stacked down it.
    override measure = '46em';

    // AN EXCHANGE IS A BLOCK OF SPACE, NOT A BOX. The gap between messages is what separates them;
    // only one of the two speakers gets a background at all.
    @select('.pd-exchange') exchange_display = 'block';
    exchange_margin = '1.5rem 0';
    exchange_padding = '0';
    exchange_border = 'none';
    exchange_background = 'transparent';

    // THE HEADING AN EXCHANGE NEVER WROTE. A section is supplied one recovered from its opening
    // sentence, so every message carries a heading nobody asked for. It is NOT deleted — it is what
    // a chat list previews and what a search result shows — it simply does not draw here.
    @select('.pd-exchange > .pd-heading') opened_display = 'none';

    // THE THINKING, CLOSED. `$Menu` is a section drawn as details and `$Summary` is its heading, so
    // the disclosure is the framework's own and nothing here builds one.
    @select('.pd-exchange > .pd-menu') thinking_margin = '0 0 1rem';
    thinking_fontSize = '0.9375em';
    get thinking_color() { return this.pale; }
    @select('.pd-exchange > .pd-menu > .pd-summary') thought_fontWeight = '400';
    thought_cursor = 'pointer';

    // ─── WHAT IS NOT DECIDED ─────────────────────────────────────────────────────────────────────
    //
    // THE BUBBLE, AND IT IS THE WHOLE DRESS. One participant's exchanges sit right, in a rounded
    // grey box at two thirds width; the other's run full width with no box and no name. That is how
    // the page says who spoke, and it is the reason a participant can be parenthetical.
    //
    // NOTHING HERE CAN SELECT IT YET. A rule needs to tell one speaker's exchanges from another's,
    // and an exchange wears `pd-exchange` whoever spoke it. It waits on `$Dialogue.said`, which
    // waits on Doug's ruling — and on how the answer reaches the markup, since a class per
    // participant would put DATA in a class name. `$Line` sets `data-label` in its own `view()`,
    // which is the nearest thing the library has to a precedent.
    //
    //   @select('.pd-exchange[data-said="0"]')  mine_marginLeft = 'auto';
    //   mine_maxWidth = '66%';
    //   mine_padding = '0.75rem 1rem';
    //   mine_borderRadius = '0.75rem';
    //   get mine_background() { return this.quiet; }
    //
    //   @select('.pd-exchange[data-said="1"]')  theirs_maxWidth = 'none';
    //
    // AND THE SECOND USE CASE HE ASKED FOR — the transcript, where every speaker IS named and the
    // parenthetical participants are turned on — is a second theme over this one, not a branch in
    // it. Doug: "a specialized kind can have specialized style without being the only admitted
    // thing." It is not written until this one draws.
}

export const ConversationTheme = $($ConversationTheme);
