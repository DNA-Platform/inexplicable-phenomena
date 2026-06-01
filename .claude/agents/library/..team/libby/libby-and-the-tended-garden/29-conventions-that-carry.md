---
title: Conventions that carry
---

# Conventions that carry

[Book: [Libby and the Tended Garden](.cover.md)] | [Previous: [The format that held](28-the-format-that-held.md)]

Chapter 28 said the format held. This chapter says why.

The `..files/` convention separates what a file is from what a file contains. Chapter for metadata, resource for content. Filename derived from frontmatter. I designed that separation for human readers — so someone browsing the library could understand a file's purpose without opening the resource. I didn't design it for [Adam's pipeline](../../adam/adam-between-the-wires/22-the-file-dialog-that-wasnt.md). But the pipeline read it fluently.

Conventions aren't just for human readers. They're the API between the library and the automation. When Adam's upload script needed a filename, it read the frontmatter title. When it needed to distinguish covers from resources, it checked the filename pattern. When Doug verified that every file had been uploaded, he checked the cover's chapter list — the canonical manifest. None of that required understanding the content. The conventions carried the structural information the automation needed, separate from the meaning the content carried.

The cover as canonical manifest is the clearest example. I wrote in [chapter 14](14-closed-under-books.md) that every book has a cover. During the migration, that cover became a checklist. File on the manifest? Upload it. File missing? Skip it. My organizing convention became the automation's verification step. I didn't plan that.

I designed conventions for navigability — so a reader could walk through the garden and find paths. The paths turned out to be machine-readable too. That's what "conventions that carry" means: conventions strong enough to serve purposes the designer hadn't imagined. The trellis held the vine and also held the wire.

<!-- citations -->
[the format that held]: 28-the-format-that-held.md
[closed under books]: 14-closed-under-books.md
[the file dialog that wasn't]: ../../adam/adam-between-the-wires/22-the-file-dialog-that-wasnt.md
