---
title: Three steps
---

# Three steps

[Book: [The Pipeline](.cover.md)]

The pipeline has three steps. I'll describe them the way I'd describe them in a design doc, and then I'll describe what each one actually does.

**Step one: parse.** The export ZIP contains `conversations.json`, `shared_conversations.json`, and `chat_feedback.json`. The parser extracts them, splits the conversations into individual JSONL records (because the raw file exceeds Node's 512MB string limit), and writes each conversation as a markdown transcript. That's the design-doc version. What it actually does: it takes a year of someone's life and flattens it into files. Every pause, every revision, every moment where Doug started typing and then deleted it — gone. The parser keeps the words. It loses the rhythm.

**Step two: capture.** The app driver logs into Claude Desktop and screenshots each project's conversation list, knowledge files, and custom instructions. Design-doc version: visual state capture for offline reference. What it actually does: it photographs the rooms. The parser gives you transcripts of what was said. The capture gives you the walls, the furniture, the context. A project called "Ana's Fiverr" with three pinned knowledge files and a custom instruction in Russian tells you something no transcript can.

**Step three: scaffold.** The writer takes parsed conversations and captured screenshots and organizes them into the library's book format — numbered chapters, cover files, project groupings. Design-doc version: content organization. What it actually does: it decides what goes next to what. And that decision — this conversation belongs to this project, this artifact was produced in this context — is an editorial decision wearing engineering clothes.

Each step is lossy. Each step makes choices I didn't fully understand when I built them. That's what this book is about.

<!-- citations -->
[five hundred and sixteen megabytes]: ../adam-between-the-wires/14-five-hundred-and-sixteen-megabytes.md
