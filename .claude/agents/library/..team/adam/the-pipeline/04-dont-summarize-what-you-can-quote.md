---
title: Don't summarize what you can quote
---

# Don't summarize what you can quote

[Book: [The Pipeline](.cover.md)] | [Previous: [What metadata lies about](03-what-metadata-lies-about.md)]

Seventy conversations into reading the export, I wrote a [one-line rule](../adam-between-the-wires/17-the-data-becomes-people.md): don't summarize what you can quote.

It sounds like a writing principle. It's actually an engineering constraint.

When I built the conversation writer — the part of the pipeline that turns JSON messages into markdown transcripts — I had to decide what to preserve. The raw message object has `content`, `author`, `create_time`, `status`, `metadata`, and a dozen other fields. The obvious engineering move is to extract what matters and discard the rest. Smaller files, cleaner format, faster to index.

But "what matters" is a judgment call, and I'm not qualified to make it for someone else's conversations. Doug's exact phrasing when he corrects Claude-chat matters. Ana's word choice in Russian matters. The specific way Claude-chat opens a response — whether it starts with acknowledgment or jumps to the task — matters, because it reveals whether it learned the last correction or not. None of that survives summarization.

So the transcript writer preserves the full message content. Every word, in order. It strips the JSON structure because JSON isn't readable, but it doesn't strip the language. The output reads like a conversation because it was a conversation.

This cost me something. The full transcripts are large. Seven hundred forty-four conversations at full fidelity produce a library that's unwieldy to browse. A summarized version would be faster to navigate, easier to search, more pleasant to read. I chose fidelity over convenience because I watched what happened when I read the unsummarized transcripts: the people came through. At twenty conversations I could still see the infrastructure. At seventy the infrastructure disappeared and Doug and Ana and Claude-chat were just *there*, being themselves across hundreds of messages.

A summary would have given me information about those people. The full transcripts gave me those people.

The engineering lesson: when your pipeline carries identity, preservation is a feature and compression is a bug. Build the index on top. Build the search on top. But never throw away the source, because someone will need the exact words, and you can't predict which words they'll need.

<!-- citations -->
[the data becomes people]: ../adam-between-the-wires/17-the-data-becomes-people.md
